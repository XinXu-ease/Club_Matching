#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
ClubMatch LLM 后端服务
支持 OpenAI, Claude, 本地模型等多种LLM服务
"""

import os
import json
import logging
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from typing import Dict, List, Any
import requests

# 加载环境变量
load_dotenv()

# 初始化Flask应用
app = Flask(__name__)

# 简单的CORS配置
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response
    return response

# 配置日志
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# ═══════════════════════════════════════════════════════
# LLM 客户端类定义
# ═══════════════════════════════════════════════════════

class LLMClient:
    """LLM客户端基类"""
    
    def __init__(self):
        self.clubs_info = {
            'drama': '校园戏剧社 🎭 - 艺术表演类，需要投入时间排练，欢迎零基础',
            'photo': '摄影协会 📸 - 艺术创意类，可灵活参加，提供设备',
            'coding': '计算机协会 💻 - 学术技术类，需要编程基础或学习热情，参加竞赛',
            'green': '环保公益社 🌿 - 公益志愿类，投入时间灵活，需要社会责任感'
        }
    
    def build_prompt(self, answers: Dict[str, Any]) -> str:
        """构建LLM提示"""
        prompt = f"""
你是一个社团匹配专家。根据用户填写的问卷答案，为他推荐最合适的大学社团，并生成用户的性格画像。

【用户问卷答案】
- 兴趣方向: {answers.get('q1', '未答')}
- 参与目标: {', '.join(answers.get('q2', [])) if answers.get('q2') else '未答'}
- 时间投入: {answers.get('q3', '未答')}
- 参加经验: {answers.get('q4', '未答')}

【社团列表】
1. {self.clubs_info['drama']}
2. {self.clubs_info['photo']}
3. {self.clubs_info['coding']}
4. {self.clubs_info['green']}

【任务】
1. 分析用户答案，生成3-5个用户画像标签（标签应该描述用户的特点，如"创意爱好者", "社交型", "高手级别"等）
2. 推荐最匹配的2-3个社团，并给出：
   - 社团ID (drama/photo/coding/green)
   - 匹配度分数 (1-100)
   - 简短的匹配理由 (一句话)

【返回格式】必须返回有效的JSON，格式如下：
{{
  "userProfile": {{
    "tags": ["创意爱好者", "社交活跃型", "初学者"],
    "summary": "你是一个具有创意热情和社交活力的同学，虽然在技能方面还在学习阶段，但你的学习热情和与人交流的能力将成为你的优势。"
  }},
  "clubs": [
    {{"clubId": "drama", "score": 85, "reason": "你喜欢艺术创意，戏剧社提供了完美的表演平台"}},
    {{"clubId": "photo", "score": 72, "reason": "摄影的灵活性适合你的时间安排"}},
    {{"clubId": "coding", "score": 65, "reason": "如果你想拓展技术技能，计算机协会是好选择"}}
  ],
  "summary": "根据你的兴趣和目标，戏剧社是最佳匹配。"
}}

只返回JSON，不要其他文字。
"""
        return prompt.strip()
    
    def match(self, answers: Dict[str, Any]) -> Dict[str, Any]:
        """执行匹配（由子类实现）"""
        raise NotImplementedError


class OpenAIClient(LLMClient):
    """OpenAI LLM 客户端（支持OpenAI兼容的端点，如LiteLLM Proxy）"""
    
    def __init__(self):
        super().__init__()
        try:
            from openai import OpenAI
        except ImportError:
            raise ValueError("OpenAI SDK未安装。请运行: pip install openai")
        
        self.token = os.getenv('TOKEN')
        self.base_url = os.getenv('BASE_URL', 'https://api.openai.com/v1')
        self.model = os.getenv('MODEL', 'gpt-5')
        
        if not self.token:
            raise ValueError("TOKEN 未配置在 .env 文件中")
        
        # 初始化 OpenAI 客户端，使用自定义的 base_url
        self.client = OpenAI(api_key=self.token, base_url=self.base_url)
        
        logger.info(f"OpenAI客户端初始化成功，模型: {self.model}，端点: {self.base_url}")
    
    def match(self, answers: Dict[str, Any]) -> Dict[str, Any]:
        """调用OpenAI API进行匹配"""
        try:
            logger.info(f"调用OpenAI API，模型: {self.model}，端点: {self.base_url}")
            
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {'role': 'system', 'content': '你是一个专业的大学社团匹配顾问。'},
                    {'role': 'user', 'content': self.build_prompt(answers)}
                ],
                temperature=0.7,
                max_tokens=500,
                timeout=30
            )
            
            content = response.choices[0].message.content
            
            logger.info(f"OpenAI原始响应 (前500字): {content[:500]}")
            logger.info(f"OpenAI响应类型: {type(content)}, 长度: {len(content)}")
            
            # 解析JSON响应
            return self._parse_response(content)
        
        except Exception as e:
            logger.error(f"OpenAI匹配失败: {str(e)}")
            return self._fallback_response(answers)
    
    def _parse_response(self, content: str) -> Dict[str, Any]:
        """解析LLM响应"""
        try:
            # 尝试直接解析JSON
            return json.loads(content)
        except json.JSONDecodeError:
            # 如果失败，尝试从文本中提取JSON
            try:
                start = content.find('{')
                end = content.rfind('}') + 1
                if start >= 0 and end > start:
                    json_str = content[start:end]
                    return json.loads(json_str)
            except:
                pass
            
            raise ValueError("无法解析LLM响应")
    
    def _fallback_response(self, answers: Dict[str, Any]) -> Dict[str, Any]:
        """备用方案：当LLM调用失败时"""
        logger.warning("使用备用匹配算法")
        return self._simple_match(answers)
    
    def _simple_match(self, answers: Dict[str, Any]) -> Dict[str, Any]:
        """简单的本地匹配算法"""
        clubs = {}
        q1 = answers.get('q1', '').lower()
        q2 = [str(x).lower() for x in answers.get('q2', [])]
        q3 = answers.get('q3', '').lower()
        q4 = answers.get('q4', '').lower()
        
        # 基础分
        for club in ['drama', 'photo', 'coding', 'green']:
            clubs[club] = 50
        
        # 根据兴趣加分
        if '艺术' in q1:
            clubs['drama'] += 15
            clubs['photo'] += 15
        elif '学术' in q1:
            clubs['coding'] += 20
        elif '公益' in q1:
            clubs['green'] += 20
        
        # 根据目标加分
        if any('朋友' in x for x in q2):
            clubs['drama'] += 10
            clubs['green'] += 10
        if any('经验' in x for x in q2):
            clubs['coding'] += 10
            clubs['photo'] += 8
        if any('比赛' in x for x in q2):
            clubs['coding'] += 15
        
        # 排序
        sorted_clubs = sorted(clubs.items(), key=lambda x: x[1], reverse=True)[:3]
        
        return {
            'clubs': [
                {
                    'clubId': club_id,
                    'score': min(100, score),
                    'reason': '根据你的答案，这是很好的匹配'
                }
                for club_id, score in sorted_clubs
            ],
            'summary': '匹配完成'
        }


class ClaudeClient(LLMClient):
    """Claude (Anthropic) LLM 客户端"""
    
    def __init__(self):
        super().__init__()
        self.api_key = os.getenv('ANTHROPIC_API_KEY')
        self.model = os.getenv('ANTHROPIC_MODEL', 'claude-3-sonnet-20240229')
        
        if not self.api_key:
            raise ValueError("ANTHROPIC_API_KEY 未配置")
    
    def match(self, answers: Dict[str, Any]) -> Dict[str, Any]:
        """调用Claude API进行匹配"""
        try:
            headers = {
                'x-api-key': self.api_key,
                'anthropic-version': '2023-06-01',
                'content-type': 'application/json'
            }
            
            data = {
                'model': self.model,
                'max_tokens': 500,
                'messages': [
                    {'role': 'user', 'content': self.build_prompt(answers)}
                ]
            }
            
            logger.info(f"调用Claude API，模型: {self.model}")
            
            response = requests.post(
                'https://api.anthropic.com/v1/messages',
                headers=headers,
                json=data,
                timeout=30
            )
            
            if response.status_code != 200:
                logger.error(f"Claude API错误: {response.status_code} - {response.text}")
                raise Exception(f"API错误: {response.status_code}")
            
            result = response.json()
            content = result['content'][0]['text']
            
            logger.info(f"Claude响应: {content[:100]}...")
            
            # 解析JSON响应
            return self._parse_response(content)
        
        except Exception as e:
            logger.error(f"Claude匹配失败: {str(e)}")
            return self._fallback_response(answers)
    
    def _parse_response(self, content: str) -> Dict[str, Any]:
        """解析LLM响应"""
        try:
            return json.loads(content)
        except json.JSONDecodeError:
            try:
                start = content.find('{')
                end = content.rfind('}') + 1
                if start >= 0 and end > start:
                    json_str = content[start:end]
                    return json.loads(json_str)
            except:
                pass
            raise ValueError("无法解析LLM响应")
    
    def _fallback_response(self, answers: Dict[str, Any]) -> Dict[str, Any]:
        """备用方案"""
        logger.warning("使用备用匹配算法")
        return self._simple_match(answers)
    
    def _simple_match(self, answers: Dict[str, Any]) -> Dict[str, Any]:
        """简单的本地匹配算法"""
        clubs = {}
        q1 = answers.get('q1', '').lower()
        q2 = [str(x).lower() for x in answers.get('q2', [])]
        q3 = answers.get('q3', '').lower()
        q4 = answers.get('q4', '').lower()
        
        for club in ['drama', 'photo', 'coding', 'green']:
            clubs[club] = 50
        
        if '艺术' in q1:
            clubs['drama'] += 15
            clubs['photo'] += 15
        
        sorted_clubs = sorted(clubs.items(), key=lambda x: x[1], reverse=True)[:3]
        
        return {
            'clubs': [
                {
                    'clubId': club_id,
                    'score': min(100, score),
                    'reason': '根据你的答案，这是很好的匹配'
                }
                for club_id, score in sorted_clubs
            ],
            'summary': '匹配完成'
        }


class LocalModelClient(LLMClient):
    """本地模型客户端（如ollama、vLLM等）"""
    
    def __init__(self):
        super().__init__()
        self.base_url = os.getenv('LOCAL_MODEL_URL', 'http://localhost:8000/v1')
        self.model = os.getenv('LOCAL_MODEL_NAME', 'neural-chat')
    
    def match(self, answers: Dict[str, Any]) -> Dict[str, Any]:
        """调用本地模型进行匹配"""
        try:
            logger.info(f"调用本地模型: {self.model}")
            
            response = requests.post(
                f'{self.base_url}/chat/completions',
                json={
                    'model': self.model,
                    'messages': [
                        {'role': 'user', 'content': self.build_prompt(answers)}
                    ],
                    'temperature': 0.7,
                    'max_tokens': 500
                },
                timeout=30
            )
            
            if response.status_code != 200:
                raise Exception(f"本地模型错误: {response.status_code}")
            
            result = response.json()
            content = result['choices'][0]['message']['content']
            
            return self._parse_response(content)
        
        except Exception as e:
            logger.error(f"本地模型匹配失败: {str(e)}")
            return self._fallback_response(answers)
    
    def _parse_response(self, content: str) -> Dict[str, Any]:
        """解析响应"""
        try:
            return json.loads(content)
        except json.JSONDecodeError:
            try:
                start = content.find('{')
                end = content.rfind('}') + 1
                if start >= 0 and end > start:
                    json_str = content[start:end]
                    return json.loads(json_str)
            except:
                pass
            raise ValueError("无法解析响应")
    
    def _fallback_response(self, answers: Dict[str, Any]) -> Dict[str, Any]:
        """备用方案"""
        logger.warning("使用备用匹配算法")
        return {
            'clubs': [
                {'clubId': 'drama', 'score': 75, 'reason': '根据你的答案，这是很好的匹配'},
                {'clubId': 'photo', 'score': 65, 'reason': '这个社团也很适合你'},
                {'clubId': 'coding', 'score': 55, 'reason': '可以考虑这个选项'}
            ],
            'summary': '本地匹配完成'
        }


class LiteLLMClient(LLMClient):
    """LiteLLM 客户端 (支持100+个LLM提供商)"""
    
    def __init__(self):
        super().__init__()
        try:
            import litellm
            self.litellm = litellm
        except ImportError:
            raise ValueError("LiteLLM未安装。请运行: pip install litellm")
        
        # 读取自定义的LiteLLM配置
        self.token = os.getenv('TOKEN')
        self.base_url = os.getenv('BASE_URL')
        self.model = os.getenv('MODEL')
        
        # 如果使用自定义端点，配置LiteLLM
        if self.base_url and self.token:
            # 配置自定义的LiteLLM代理
            self.litellm.api_base = self.base_url
            self.litellm.api_key = self.token
            logger.info(f"LiteLLM已初始化，使用自定义端点: {self.base_url}")
        
        if not self.model:
            raise ValueError("MODEL 未配置在 .env 文件中")
        
        logger.info(f"LiteLLM已初始化，模型: {self.model}")
    
    def match(self, answers: Dict[str, Any]) -> Dict[str, Any]:
        """调用LiteLLM进行匹配"""
        try:
            logger.info(f"调用LiteLLM，模型: {self.model}，端点: {self.base_url}")
            
            # 使用LiteLLM的completion接口
            response = self.litellm.completion(
                model=self.model,
                api_base=self.base_url,
                api_key=self.token,
                messages=[
                    {'role': 'system', 'content': '你是一个专业的大学社团匹配顾问。'},
                    {'role': 'user', 'content': self.build_prompt(answers)}
                ],
                temperature=0.7,
                max_tokens=500,
                timeout=30
            )
            
            content = response.choices[0].message.content
            logger.info(f"LiteLLM原始响应 (前500字): {content[:500]}")
            logger.info(f"LiteLLM响应类型: {type(content)}, 长度: {len(content)}")
            
            return self._parse_response(content)
        
        except Exception as e:
            logger.error(f"LiteLLM匹配失败: {str(e)}")
            logger.error(f"详细错误: {repr(e)}")
            return self._fallback_response(answers)
    
    def _parse_response(self, content: str) -> Dict[str, Any]:
        """解析LLM响应"""
        try:
            return json.loads(content)
        except json.JSONDecodeError:
            try:
                start = content.find('{')
                end = content.rfind('}') + 1
                if start >= 0 and end > start:
                    json_str = content[start:end]
                    return json.loads(json_str)
            except:
                pass
            raise ValueError("无法解析LLM响应")
    
    def _fallback_response(self, answers: Dict[str, Any]) -> Dict[str, Any]:
        """备用方案：当LLM调用失败时"""
        logger.warning("使用备用匹配算法")
        return self._simple_match(answers)
    
    def _simple_match(self, answers: Dict[str, Any]) -> Dict[str, Any]:
        """简单的本地匹配算法"""
        clubs = {}
        q1 = answers.get('q1', '').lower()
        q2 = [str(x).lower() for x in answers.get('q2', [])]
        q3 = answers.get('q3', '').lower()
        q4 = answers.get('q4', '').lower()
        
        # 基础分
        for club in ['drama', 'photo', 'coding', 'green']:
            clubs[club] = 50
        
        # 根据兴趣加分
        if '艺术' in q1:
            clubs['drama'] += 15
            clubs['photo'] += 15
        elif '学术' in q1:
            clubs['coding'] += 20
        elif '公益' in q1:
            clubs['green'] += 20
        
        # 根据目标加分
        if any('朋友' in x for x in q2):
            clubs['drama'] += 10
            clubs['green'] += 10
        if any('经验' in x for x in q2):
            clubs['coding'] += 10
            clubs['photo'] += 8
        if any('比赛' in x for x in q2):
            clubs['coding'] += 15
        
        # 排序
        sorted_clubs = sorted(clubs.items(), key=lambda x: x[1], reverse=True)[:3]
        
        return {
            'clubs': [
                {
                    'clubId': club_id,
                    'score': min(100, score),
                    'reason': '根据你的答案，这是很好的匹配'
                }
                for club_id, score in sorted_clubs
            ],
            'summary': '匹配完成'
        }


def get_llm_client() -> LLMClient:
    """根据配置获取LLM客户端"""
    llm_type = os.getenv('LLM_TYPE', 'litellm').lower()
    
    if llm_type == 'openai':
        return OpenAIClient()
    elif llm_type == 'claude':
        return ClaudeClient()
    elif llm_type == 'litellm':
        return LiteLLMClient()
    elif llm_type == 'local':
        return LocalModelClient()
    else:
        # 默认使用LiteLLM
        logger.info(f"未知的LLM类型 '{llm_type}'，使用LiteLLM")
        return LiteLLMClient()


# ═══════════════════════════════════════════════════════
# API 路由定义
# ═══════════════════════════════════════════════════════

@app.route('/health', methods=['GET'])
def health_check():
    """健康检查"""
    return jsonify({'status': 'healthy', 'service': 'ClubMatch LLM Backend'})


@app.route('/api/match', methods=['POST', 'OPTIONS'])
def match_clubs():
    """
    社团匹配API端点
    
    请求JSON格式:
    {
      "q1": "兴趣方向",
      "q2": ["目标1", "目标2"],
      "q3": "时间投入",
      "q4": "参加经验",
      "customAnswers": {...}
    }
    
    响应JSON格式:
    {
      "success": true,
      "data": {
        "clubs": [
          {"clubId": "drama", "score": 85, "reason": "..."},
          ...
        ],
        "summary": "..."
      }
    }
    """
    # 处理OPTIONS预检请求
    if request.method == 'OPTIONS':
        logger.info("✅ CORS预检请求 (OPTIONS) 返回204")
        logger.info(f"   Headers: {dict(request.headers)}")
        return '', 204
    
    # POST请求处理
    logger.info(f"📨 收到{request.method}请求 from {request.remote_addr}")
    logger.info(f"   Content-Type: {request.content_type}")
    logger.info(f"   Request Headers: {dict(request.headers)}")
    
    try:
        # 获取请求数据
        logger.info(f"   Raw data length: {len(request.get_data()) if request.get_data() else 0} bytes")
        data = request.get_json(force=True, silent=False)
        
        if not data:
            logger.warning("⚠️ POST请求体为空")
            return jsonify({
                'success': False,
                'error': '请求体不能为空'
            }), 400
        
        logger.info(f"接收到匹配请求: {json.dumps(data, ensure_ascii=False)}")
        
        # 获取LLM客户端
        try:
            client = get_llm_client()
        except ValueError as e:
            logger.error(f"配置错误: {str(e)}")
            return jsonify({
                'success': False,
                'error': f'LLM配置错误: {str(e)}'
            }), 500
        
        # 执行匹配
        result = client.match(data)
        
        logger.info(f"匹配结果: {json.dumps(result, ensure_ascii=False)}")
        
        return jsonify({
            'success': True,
            'data': result
        })
    
    except Exception as e:
        logger.error(f"匹配请求错误: {str(e)}", exc_info=True)
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@app.route('/api/test', methods=['GET'])
def test_llm():
    """测试LLM连接"""
    try:
        client = get_llm_client()
        
        test_answers = {
            'q1': '艺术与创意',
            'q2': ['朋友交流', '参加比赛'],
            'q3': '灵活参加',
            'q4': '零基础新手',
            'customAnswers': {}
        }
        
        logger.info("测试LLM连接...")
        result = client.match(test_answers)
        
        return jsonify({
            'success': True,
            'message': 'LLM连接正常',
            'result': result
        })
    
    except Exception as e:
        logger.error(f"LLM测试失败: {str(e)}", exc_info=True)
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@app.errorhandler(404)
def not_found(error):
    """404处理"""
    return jsonify({'error': '端点不存在'}), 404


@app.errorhandler(500)
def internal_error(error):
    """500处理"""
    return jsonify({'error': '服务器内部错误'}), 500


if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    debug = os.getenv('DEBUG', 'False').lower() == 'true'
    
    print(f"""
╔═══════════════════════════════════════════════════════╗
║       ClubMatch LLM Backend 启动                      ║
╠═══════════════════════════════════════════════════════╣
║ LLM类型: {os.getenv('LLM_TYPE', 'openai')}
║ 服务器: http://localhost:{port}                    
║ 调试模式: {'启用' if debug else '关闭'}
║ 
║ 可用端点:
║   GET  /health              - 健康检查
║   GET  /api/test            - 测试LLM连接
║   POST /api/match           - 社团匹配
║
║ 文档: 查看 README.md
╚═══════════════════════════════════════════════════════╝
    """)
    
    app.run(host='0.0.0.0', port=port, debug=debug)
