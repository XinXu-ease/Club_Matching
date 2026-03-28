# 🔑 LLM后端 - 配置指南

## 快速配置 (仅需3步)

### 第1步: 准备配置文件

在 `backend/` 目录中，复制 `.env.example` 为 `.env`:

```bash
# Windows
copy .env.example .env

# Mac/Linux
cp .env.example .env
```

### 第2步: 选择并配置LLM

#### 🔹 选项A: OpenAI (推荐，功能最强)

1. **获取API Key:**
   - 访问 https://platform.openai.com/account/api-keys
   - 创建新API Key
   - 复制Key

2. **编辑 `.env` 文件:**
   ```
   LLM_TYPE=openai
   OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   OPENAI_MODEL=gpt-3.5-turbo
   ```

3. **保存文件**

#### 🔹 选项B: Claude (高智能，推荐)

1. **获取API Key:**
   - 访问 https://console.anthropic.com/account/keys
   - 创建新API Key
   - 复制Key

2. **编辑 `.env` 文件:**
   ```
   LLM_TYPE=claude
   ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ANTHROPIC_MODEL=claude-3-sonnet-20240229
   ```

3. **保存文件**

#### 🔹 选项C: 本地模型 (免费，需自己部署)

**前置条件:** 安装 Ollama (https://ollama.ai)

1. **拉取模型:**
   ```bash
   ollama pull neural-chat
   ```

2. **启动 Ollama:**
   ```bash
   ollama serve
   ```

3. **编辑 `.env` 文件:**
   ```
   LLM_TYPE=local
   LOCAL_MODEL_URL=http://localhost:11434/v1
   LOCAL_MODEL_NAME=neural-chat
   ```

### 第3步: 启动后端

#### Windows

```bash
cd backend
run.bat
```

或直接运行:
```bash
python app.py
```

#### Mac/Linux

```bash
cd backend
chmod +x run.sh
./run.sh
```

或直接运行:
```bash
python3 app.py
```

## ✅ 验证配置

启动后你应该看到:

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

然后在**另一个终端**测试:

```bash
# 健康检查
curl http://localhost:5000/health

# 测试LLM连接 (这个会真实调用LLM)
curl http://localhost:5000/api/test

# 测试匹配
curl -X POST http://localhost:5000/api/match \
  -H "Content-Type: application/json" \
  -d '{"q1":"艺术","q2":["朋友"],"q3":"灵活","q4":"零基础"}'
```

## 🐛 常见问题

### Q: 怎样获取OpenAI的API Key？

A: 
1. 进入 https://platform.openai.com
2. 点击 "Sign in" 登录（或注册）
3. 在左侧菜单选择 "API keys"
4. 点击 "Create new secret key"
5. 复制显示的Key（只显示一次！）
6. 粘贴到 `.env` 中

**重要**: 不要在GitHub或公开地方分享你的API Key！

### Q: API Key需要充值吗？

A: 
- **OpenAI**: 需要绑定信用卡，按使用量付费（通常$0.0005/1000 token）
- **Claude**: 同样需要绑定卡，费用类似
- **本地模型**: 完全免费，但需要本地GPU/CPU资源

### Q: 什么时候会出现"后端连接失败"？

A: 
1. 后端没有启动 → 运行 `python app.py`
2. 后端运行在不同端口 → 检查 `FLASK_PORT` 配置
3. 防火墙阻止 → 允许5000端口访问
4. API Key错误 → 检查 `.env` 文件配置

### Q: 可以使用其他LLM吗？

A: 
当前支持OpenAI、Claude、本地模型。要添加其他服务（如Cohere、Replicate等）：
1. 在 `app.py` 中创建新的Client类
2. 实现 `match()` 方法
3. 在 `get_llm_client()` 中添加选项
4. 在 `.env` 中配置

### Q: 可以同时运行多个后端实例吗？

A: 
可以，但需要修改 `FLASK_PORT`:

```bash
# 终端1
FLASK_PORT=5000 python app.py

# 终端2
FLASK_PORT=5001 python app.py

# 前端同时连接
const API_URL = 'http://localhost:5000/api/match'
```

### Q: 后端返回 timeout 错误怎么办？

A: 
1. 网络连接问题 → 检查网络
2. LLM服务响应慢 → 增加超时时间
3. API配额用尽 → 检查账户余额
4. 切换到其他LLM服务

### Q: 我没有API Key，想先测试？

A: 
1. 使用本地模型（Ollama）
2. 或者临时使用备用算法：
   ```
   # 在 clubmatch-full.html 中注释掉:
   // USER_DATA.saveMatchResult(result.data);
   
   # 改成:
   const result = calculateMatchScore(answers);
   USER_DATA.saveMatchResult(result);
   ```

## 📊 配置文件参考

### 完整的 `.env` 模板

```ini
# LLM配置
LLM_TYPE=openai                              # openai | claude | local

# OpenAI
OPENAI_API_KEY=sk-...                        # 你的API Key
OPENAI_MODEL=gpt-3.5-turbo                   # 模型选项: gpt-3.5-turbo, gpt-4
OPENAI_BASE_URL=https://api.openai.com/v1   # 可选: 自定义端点

# Claude
ANTHROPIC_API_KEY=sk-ant-...                 # 你的API Key
ANTHROPIC_MODEL=claude-3-sonnet-20240229    # 可选模型: claude-3-opus, claude-3-sonnet

# 本地模型
LOCAL_MODEL_URL=http://localhost:11434/v1   # Ollama地址
LOCAL_MODEL_NAME=neural-chat                # 模型名称

# 服务器
FLASK_ENV=development                        # development | production
FLASK_PORT=5000                              # 服务器端口
DEBUG=True                                   # True | False

# CORS
ALLOWED_ORIGIN=http://localhost:3000         # 允许的前端地址
```

## 🚀 生产部署

### 使用Gunicorn (推荐)

```bash
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

### 使用Docker

```dockerfile
FROM python:3.10-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY app.py .env ./
CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:5000", "app:app"]
```

构建:
```bash
docker build -t clubmatch-backend .
docker run -p 5000:5000 -e OPENAI_API_KEY=sk-... clubmatch-backend
```

### 使用云服务

#### Heroku
```bash
git push heroku main
```

#### AWS Lambda
```bash
pip install zappa
zappa init
zappa deploy production
```

## 📞 获取帮助

1. 查看 `backend/README.md`
2. 检查服务器日志
3. 测试 `http://localhost:5000/health`
4. 查看 API 过程中的错误信息

---

**版本**: 1.0.0  
**更新**: 2024年  
**状态**: ✅ 完整配置指南
