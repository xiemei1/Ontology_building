#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os
import logging
from fastapi import FastAPI
from . import main #  your code is loaded from here


logging.info("Starting up...")

app = FastAPI(
    title="Mei Xie",
    description="Mei Xie master's project",
    version=main.VERSION,
    docs_url="/api/docs",
    redoc_url="/api/redoc",
    openapi_url="/api/openapi.json"
)

# add api router
app.include_router(
    main.router,
    prefix="/api",
    #tags=["items"],
    #dependencies=[Depends(get_token_header)],
    responses={404: {"description": "Not found"}},
)

@app.get('/health')
def health():
    """K8 health (internal network) endpoint"""
    return {'status' : 'OK'}
