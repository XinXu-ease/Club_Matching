@echo off
REM ClubMatch LLM Backend 启动脚本 (Windows)

echo.
echo ╔════════════════════════════════════════════════════╗
echo ║     ClubMatch LLM Backend 启动                      ║
echo ╚════════════════════════════════════════════════════╝
echo.

REM 检查Python是否安装
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ 错误: 未检测到Python安装
    echo 请从 https://www.python.org 下载安装Python
    pause
    exit /b 1
)

REM 检查是否在backend目录
if not exist requirements.txt (
    echo ❌ 错误: 请在backend目录下运行此脚本
    pause
    exit /b 1
)

REM 检查虚拟环境
if not exist venv (
    echo 📦 创建虚拟环境...
    python -m venv venv
)

REM 激活虚拟环境
echo 🔧 激活虚拟环境...
call venv\Scripts\activate.bat

REM 检查依赖
echo 📥 检查依赖...
pip list >nul 2>&1
if errorlevel 1 (
    echo 📦 安装依赖...
    pip install -r requirements.txt
)

REM 检查.env文件
if not exist .env (
    echo ⚠️  警告: 未找到 .env 配置文件
    echo 📋 复制 .env.example 为 .env...
    copy .env.example .env
    echo.
    echo ⚠️  请编辑 .env 文件，配置你的API Key:
    echo.
    echo   1. 打开 .env 文件
    echo   2. 填入你的 OPENAI_API_KEY 或 ANTHROPIC_API_KEY
    echo   3. 保存文件后重新运行此脚本
    echo.
    pause
    exit /b 1
)

REM 检查API Key配置
findstr /M "OPENAI_API_KEY\|ANTHROPIC_API_KEY" .env >nul
if errorlevel 1 (
    echo ❌ 错误: 未找到有效的API Key配置
    echo 请在 .env 文件中配置:
    echo   OPENAI_API_KEY=sk-xxx...
    echo 或
    echo   ANTHROPIC_API_KEY=sk-ant-xxx...
    pause
    exit /b 1
)

REM 启动Flask应用
echo.
echo ✅ 所有检查完成！
echo 🚀 启动后端服务...
echo.
python app.py
