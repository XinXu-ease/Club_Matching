# ClubMatch LLM 后端 - 使用指南

## 📋 概述

这是ClubMatch应用的Python Flask后端，负责调用LLM进行社团匹配。支持多种LLM服务：
- **OpenAI** (GPT-3.5/GPT-4)
- **Claude** (Anthropic)
- **本地模型** (ollama, vLLM等)

## 🚀 快速开始

### 1. 安装依赖
```bash
cd backend
pip install -r requirements.txt
```

### 2. 配置环境变量

复制 `.env.example` 为 `.env` 并填入你的API Key：

```bash
cp .env.example .env
```

**选项A: 使用OpenAI**
```bash
LLM_TYPE=openai
OPENAI_API_KEY=sk-xxx...  # 替换为你的API Key
OPENAI_MODEL=gpt-3.5-turbo
```

**选项B: 使用Claude**
```bash
LLM_TYPE=claude
ANTHROPIC_API_KEY=sk-ant-xxx...  # 替换为你的API Key
ANTHROPIC_MODEL=claude-3-sonnet-20240229
```

**选项C: 使用本地模型**
```bash
LLM_TYPE=local
LOCAL_MODEL_URL=http://localhost:8000/v1
LOCAL_MODEL_NAME=neural-chat
```

### 3. 启动后端服务

```bash
python app.py
```

你会看到：
```
╔═══════════════════════════════════════════════════════╗
║       ClubMatch LLM Backend 启动                      ║
╠═══════════════════════════════════════════════════════╣
║ LLM类型: openai
║ 服务器: http://localhost:5000                    
║ 调试模式: 启用
║ 
║ 可用端点:
║   GET  /health              - 健康检查
║   GET  /api/test            - 测试LLM连接
║   POST /api/match           - 社团匹配
╚═══════════════════════════════════════════════════════╝
```

## 🧪 测试API

### 1. 健康检查
```bash
curl http://localhost:5000/health
```

### 2. 测试LLM连接
```bash
curl http://localhost:5000/api/test
```

### 3. 测试匹配功能
```bash
curl -X POST http://localhost:5000/api/match \
  -H "Content-Type: application/json" \
  -d '{
    "q1": "艺术与创意",
    "q2": ["朋友交流", "参加比赛"],
    "q3": "灵活参加",
    "q4": "零基础新手",
    "customAnswers": {}
  }'
```

## 📡 API文档

### POST /api/match

**请求格式：**
```json
{
  "q1": "兴趣方向",
  "q2": ["目标1", "目标2"],  // 可多选
  "q3": "时间投入",
  "q4": "参加经验",
  "customAnswers": {}
}
```

**响应格式（成功）：**
```json
{
  "success": true,
  "data": {
    "clubs": [
      {
        "clubId": "drama",
        "score": 85,
        "reason": "你喜欢艺术创意，戏剧社提供了完美的表演平台"
      },
      {
        "clubId": "photo",
        "score": 72,
        "reason": "摄影的灵活性适合你的时间安排"
      }
    ],
    "summary": "根据你的兴趣和目标，戏剧社是最佳匹配。"
  }
}
```

**响应格式（错误）：**
```json
{
  "success": false,
  "error": "错误描述"
}
```

## 🔑 获取API Key

### OpenAI
1. 访问 https://platform.openai.com
2. 注册或登录
3. 进入 API Keys 页面
4. 创建新的API Key
5. 复制到 `.env` 文件

### Claude (Anthropic)
1. 访问 https://console.anthropic.com
2. 注册或登录
3. 进入 API Keys 页面
4. 创建新的API Key
5. 复制到 `.env` 文件

### 本地模型 (ollama)
```bash
# 安装ollama: https://ollama.ai
# 拉取模型
ollama pull neural-chat

# 启动ollama服务
ollama serve

# ollama默认在 http://localhost:11434
# 如果需要OpenAI兼容端口，运行
# ollama serve --api http://0.0.0.0:8000
```

## 📦 生产部署

### 使用 Gunicorn

```bash
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

### Docker 部署

```dockerfile
FROM python:3.10-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY app.py .
COPY .env .

CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:5000", "app:app"]
```

构建和运行：
```bash
docker build -t clubmatch-backend .
docker run -p 5000:5000 clubmatch-backend
```

## 🔧 配置说明

### 环境变量

| 变量名 | 说明 | 默认值 |
|-------|------|-------|
| `LLM_TYPE` | LLM类型 (openai/claude/local) | openai |
| `OPENAI_API_KEY` | OpenAI API Key | - |
| `OPENAI_MODEL` | OpenAI使用的模型 | gpt-3.5-turbo |
| `OPENAI_BASE_URL` | OpenAI API端点 | https://api.openai.com/v1 |
| `ANTHROPIC_API_KEY` | Claude API Key | - |
| `ANTHROPIC_MODEL` | Claude使用的模型 | claude-3-sonnet-20240229 |
| `LOCAL_MODEL_URL` | 本地模型API端点 | http://localhost:8000/v1 |
| `LOCAL_MODEL_NAME` | 本地模型名称 | your-local-model |
| `FLASK_ENV` | Flask环境 | development |
| `FLASK_PORT` | 服务器端口 | 5000 |
| `DEBUG` | 调试模式 | True |
| `ALLOWED_ORIGIN` | CORS允许的源 | * |

## 🐛 故障排除

### 问题1: OpenAI API Key 无效
```
OPENAI_API_KEY 未配置
```
**解决方案：**
1. 确保安装了 `openai` 包
2. 检查 `.env` 中的API Key是否正确
3. 确认API Key有效且未过期

### 问题2: Connection refused
```
无法连接到服务器
```
**解决方案：**
1. 确保后端已启动：`python app.py`
2. 检查端口5000是否被占用
3. 修改`FLASK_PORT`环境变量

### 问题3: Claude API返回超时
```
timeout error
```
**解决方案：**
1. 检查网络连接
2. 增加超时时间
3. 使用OpenAI或本地模型作为备选

### 问题4: 本地模型不可用
```
本地模型错误
```
**解决方案：**
1. 确保ollama在运行：`ollama serve`
2. 检查`LOCAL_MODEL_URL`配置
3. 确保模型已拉取：`ollama pull neural-chat`

## 📊 日志

日志会输出到控制台，格式：
```
INFO:__main__:调用OpenAI API，模型: gpt-3.5-turbo
INFO:__main__:OpenAI响应: {...}
INFO:__main__:匹配结果: {...}
```

要保存到文件，在 `app.py` 中添加：
```python
logging.basicConfig(
    level=logging.INFO,
    filename='app.log',
    filemode='a'
)
```

## 🎯 前端集成

前端已自动配置调用该后端API。在 `clubmatch-full.html` 中：

```javascript
// 自动调用后端
async function matchClubsWithLLM(answers) {
  try {
    const response = await fetch('http://localhost:5000/api/match', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(answers)
    });
    
    if (!response.ok) throw new Error('API请求失败');
    const result = await response.json();
    
    if (result.success) {
      USER_DATA.saveMatchResult(result.data);
    }
  } catch(e) {
    console.error('匹配失败:', e);
    // 使用备用算法
    const fallback = calculateMatchScore(answers);
    USER_DATA.saveMatchResult(fallback);
  }
}
```

## 📚 更多资源

- OpenAI文档: https://platform.openai.com/docs
- Claude文档: https://docs.anthropic.com
- Ollama文档: https://github.com/ollama/ollama
- Flask文档: https://flask.palletsprojects.com

## 🤝 支持

如有问题，请检查：
1. `.env` 配置文件
2. 服务器日志输出
3. API Key的有效性
4. 网络连接

---

**版本**: 1.0.0  
**最后更新**: 2024年  
**状态**: ✅ 生产就绪
