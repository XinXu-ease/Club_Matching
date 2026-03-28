#!/bin/bash
# ClubMatch LLM Backend 启动脚本 (Linux/Mac)

echo ""
echo "╔════════════════════════════════════════════════════╗"
echo "║     ClubMatch LLM Backend 启动                      ║"
echo "╚════════════════════════════════════════════════════╝"
echo ""

# 检查Python是否安装
if ! command -v python3 &> /dev/null; then
    echo "❌ 错误: 未检测到Python 3 安装"
    echo "请从 https://www.python.org 下载安装Python"
    exit 1
fi

# 检查是否在backend目录
if [ ! -f requirements.txt ]; then
    echo "❌ 错误: 请在backend目录下运行此脚本"
    exit 1
fi

# 检查虚拟环境
if [ ! -d venv ]; then
    echo "📦 创建虚拟环境..."
    python3 -m venv venv
fi

# 激活虚拟环境
echo "🔧 激活虚拟环境..."
source venv/bin/activate

# 检查依赖
echo "📥 检查依赖..."
if ! pip list > /dev/null 2>&1; then
    echo "📦 安装依赖..."
    pip install -r requirements.txt
fi

# 检查.env文件
if [ ! -f .env ]; then
    echo "⚠️  警告: 未找到 .env 配置文件"
    echo "📋 复制 .env.example 为 .env..."
    cp .env.example .env
    echo ""
    echo "⚠️  请编辑 .env 文件，配置你的API Key:"
    echo ""
    echo "  1. 打开 .env 文件"
    echo "  2. 填入你的 OPENAI_API_KEY 或 ANTHROPIC_API_KEY"
    echo "  3. 保存文件后重新运行此脚本"
    echo ""
    exit 1
fi

# 检查API Key配置
if ! grep -q "OPENAI_API_KEY\|ANTHROPIC_API_KEY" .env; then
    echo "❌ 错误: 未找到有效的API Key配置"
    echo "请在 .env 文件中配置:"
    echo "  OPENAI_API_KEY=sk-xxx..."
    echo "或"
    echo "  ANTHROPIC_API_KEY=sk-ant-xxx..."
    exit 1
fi

# 启动Flask应用
echo ""
echo "✅ 所有检查完成！"
echo "🚀 启动后端服务..."
echo ""
python3 app.py
