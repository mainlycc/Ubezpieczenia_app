import os

bind = "0.0.0.0:" + str(os.environ.get("PORT", 5000))
workers = 4
threads = 4
timeout = 120
