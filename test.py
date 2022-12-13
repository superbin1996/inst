from icecream import ic
from pathlib import Path
import os
import environ
# 2 Following lines is required to getenv() 

# Build paths inside the project like this: BASE_DIR / 'subdir'.
# BASE_DIR = Path(__file__).resolve().parent.parent
BASE_DIR = os.path.dirname(os.path.realpath(__file__))
ic(BASE_DIR)

# For Render deployment
env = environ.Env()
# # environ.Env() will connect with .env in root folder
env.read_env(os.path.join(BASE_DIR, '.env'))

y = os.environ.get("RENDER_EXTERNAL_URL", "Nothing")
# y = env("RENDER_EXTERNAL_URL")
ic(y)