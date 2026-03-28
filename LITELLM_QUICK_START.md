# 🚀 LiteLLM 快速配置

## 📍 文件位置

```
backend/.env
```

## ⚡ 最快配置 (3步)

### 1️⃣ 打开 `.env` 文件

```bash
cd backend
# Windows
notepad .env

# Mac
open .env

# Linux
nano .env
```

### 2️⃣ 配置你的 LLM

LiteLLM支持100+个LLM，选一个配置：

**选项A：OpenAI (推荐)**
```ini
LLM_TYPE=litellm
LITELLM_MODEL=gpt-3.5-turbo
OPENAI_API_KEY=sk-xxxxxxx...
```

**选项B：Claude**
```ini
LLM_TYPE=litellm
LITELLM_MODEL=claude-3-sonnet
ANTHROPIC_API_KEY=sk-ant-xxxxxxx...
```

**选项C：Ollama (本地免费)**
```ini
LLM_TYPE=litellm
LITELLM_MODEL=ollama/neural-chat
# 需要先启动: ollama serve
```

**选项D：Azure**
```ini
LLM_TYPE=litellm
LITELLM_MODEL=azure/my-deployment
AZURE_API_KEY=...
```

**选项E：Cohere**
```ini
LLM_TYPE=litellm
LITELLM_MODEL=cohere/command
COHERE_API_KEY=...
```

**选项F：Replicate**
```ini
LLM_TYPE=litellm
LITELLM_MODEL=replicate/llama-2
REPLICATE_API_TOKEN=...
```

**选项G：AWS Bedrock**
```ini
LLM_TYPE=litellm
LITELLM_MODEL=bedrock/anthropic.claude-3-sonnet
# AWS_ACCESS_KEY_ID 和 AWS_SECRET_ACCESS_KEY 需要配置
```

### 3️⃣ 启动后端

```bash
python app.py
```

## 📋 LiteLLM 模型列表

### OpenAI
```
gpt-4
gpt-3.5-turbo
text-davinci-003
```

### Claude (Anthropic)
```
claude-3-opus
claude-3-sonnet
claude-3-haiku
claude-instant-1
```

### Ollama (本地)
```
ollama/neural-chat
ollama/llama2
ollama/mistral
ollama/zephyr
ollama/starling-lm
```

### Cohere
```
cohere/command
cohere/command-nightly
cohere/command-light
```

### Azure
```
azure/my-deployment
```

### AWS Bedrock
```
bedrock/anthropic.claude-3-opus
bedrock/anthropic.claude-3-sonnet
bedrock/anthropic.claude-3-haiku
bedrock/meta.llama2-13b
```

### Replicate
```
replicate/llama-2-7b
replicate/llama-2-13b
replicate/mistral-7b
```

### Together AI
```
together_ai/meta-llama/Llama-2-7b-chat-hf
```

### Aleph Alpha
```
aleph_alpha/luminous-base
```

更多模型: https://docs.litellm.ai/docs/providers

## 🔑 获取 API Keys

### OpenAI
```
https://platform.openai.com/account/api-keys
```

### Claude
```
https://console.anthropic.com/account/keys
```

### Cohere
```
https://dashboard.cohere.ai/api-keys
```

### AWS Bedrock
```
需要AWS账户和IAM权限
```

### Replicate
```
https://replicate.com/account/api-tokens
```

## 🧪 测试配置

启动后在**另一个终端**运行：

```bash
# 健康检查
curl http://localhost:5000/health

# 测试LLM连接
curl http://localhost:5000/api/test

# 测试匹配
curl -X POST http://localhost:5000/api/match \
  -H "Content-Type: application/json" \
  -d '{
    "q1": "艺术与创意",
    "q2": ["朋友交流"],
    "q3": "灵活参加",
    "q4": "零基础新手"
  }'
```

## 💡 常见问题

**Q: 我不确定用哪个模型？**
A: 推荐 OpenAI 的 `gpt-3.5-turbo` 或 Claude 的 `claude-3-sonnet`

**Q: 怎样本地运行免费的LLM？**
A: 使用 Ollama：
```bash
ollama pull neural-chat
ollama serve
# 配置: LITELLM_MODEL=ollama/neural-chat
```

**Q: 支持本地部署的模型吗？**
A: 支持！使用 `ollama/`、`vllm/` 等前缀

**Q: 如何切换LLM？**
A: 只需改 `.env` 中的 `LITELLM_MODEL` 和 API Key，重启后端即可

**Q: 一个`.env`可以配置多个LLM吗？**
A: 可以，但同一时间只能用一个（通过 `LiteLLM_MODEL` 指定）

## 📚 更多资源

- LiteLLM官网: https://litellm.ai
- LiteLLM文档: https://docs.litellm.ai
- 支持的模型列表: https://docs.litellm.ai/docs/providers

---

**提示**: LiteLLM会自动从`.env`读取所有API Keys，不需要额外配置！ ✨
