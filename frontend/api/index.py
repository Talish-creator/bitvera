import sys
import os

# Add the backend directory to sys.path so we can import 'server'
backend_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'backend'))
if backend_path not in sys.path:
    sys.path.insert(0, backend_path)

from server import app
