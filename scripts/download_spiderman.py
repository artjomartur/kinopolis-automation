import urllib.request
import json
import os
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

# We'll just use a known Wikimedia Commons or similar free image if possible.
# Actually, let's use a specific direct link that is likely to work, or use a python package like duckduckgo_search.
