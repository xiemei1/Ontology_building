import os
import multiprocessing
import logging

port = os.environ.get('BACKEND_PORT', None)
if port is None:
    logging.error("No port was specified for the backend service.")
    exit(1)
bind = f"0.0.0.0:{port}"
threads = 4
workers = 1 #multiprocessing.cpu_count() * 2 + 1
reload = True

accesslog = '-'

loglevel = 'debug'

# 4 minute timeout for worker because of long query times
timeout = 60*4
