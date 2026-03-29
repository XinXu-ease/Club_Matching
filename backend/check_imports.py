#!/usr/bin/env python3
"""检查所有依赖导入是否正常"""

import sys
print("Python version:", sys.version)

try:
    print("✓ Importing os...")
    import os
except Exception as e:
    print(f"✗ Failed to import os: {e}")

try:
    print("✓ Importing json...")
    import json
except Exception as e:
    print(f"✗ Failed to import json: {e}")

try:
    print("✓ Importing logging...")
    import logging
except Exception as e:
    print(f"✗ Failed to import logging: {e}")

try:
    print("✓ Importing dotenv...")
    from dotenv import load_dotenv
except Exception as e:
    print(f"✗ Failed to import dotenv: {e}")

try:
    print("✓ Importing flask...")
    from flask import Flask, request, jsonify, make_response, Response
except Exception as e:
    print(f"✗ Failed to import flask: {e}")

try:
    print("✓ Importing requests...")
    import requests
except Exception as e:
    print(f"✗ Failed to import requests: {e}")

try:
    print("✓ Importing openai...")
    from openai import OpenAI
except Exception as e:
    print(f"✗ Failed to import openai: {e}")

try:
    print("✓ Importing anthropic...")
    import anthropic
except Exception as e:
    print(f"✗ Failed to import anthropic: {e}")

try:
    print("✓ Importing litellm...")
    import litellm
except Exception as e:
    print(f"✗ Failed to import litellm: {e}")

print("\nAll imports checked!")
