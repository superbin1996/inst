import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

a = BASE_DIR/'../frontend/build/static/'
print(a)