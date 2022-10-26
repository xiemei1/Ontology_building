#!/usr/bin/env python
# -*- coding: utf-8 -*-
import sys
import os
from typing import Optional, List
from IPython.core.display import display, HTML

from fastapi import APIRouter
from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from starlette.responses import Response


from . import get_data as gd
from . import name_entities as ne
from . import RE_npren as re1
from . import RE_nvn as re2
from . import components as wc

import spacy
from spacy import displacy
import markdown



VERSION = "0.0.1"



router = APIRouter()

#
# add all your code here (and in subclasses, from where you can import)
#
class TextRequestIn(BaseModel):
    text: str


class EntityOut(BaseModel):
    text: str
   # nouns : str
    #sentences :str
    #verbs : str
    #components: str
    #re1 : list
    #re2: list
    #re3 :list


@router.get('/llll')
async def index():
    nlp = spacy.load("en_core_web_sm")
    t = 'When Sebastian Thrun started working on self-driving cars at Google in 2007, few people outside of the company took him seriously.'
    d = nlp(t)
    html = displacy.render(d, style="ent")
    html = html.replace("\n\n", "\n")
    return html

@router.get("/")
async def root():
    return ("Welcome to our wonderful API!")
    
@router.get('/version')
def version():
    """version page"""
    return {"version": VERSION}

@router.get("/get-text")
async def grab_text():

    article_text = gd.getText()
    return {'article_text': article_text}

@router.get('/remove-stopwords')
async def removal():
    new_text = gd.sw_removal(gd.getText())
    return new_text


@router.get("/get-sentences")
async def grab_sentence():

    sentences = wc.getSentences(gd.getText())
    return {'sentences': sentences}


@router.get("/get-nameentities")
async def name_entities():

    name_entities = ne.extract_named_ents(gd.getText())
    return name_entities


@router.get("/noun")
async def grab_noun():

    nouns = wc.extract_noun(gd.getText())
    return {'Nouns': nouns}


@router.get("/verbs")
async def grab_verbs():

    verbs = wc.extract_verb(gd.getText())
    return verbs

@router.get("/components")
async def grab_components():

    #components = wc.extract_compounds(gd.getText())
    df = wc.add_compounds(wc.getSentences(gd.getText()))
    return df

@router.get("/subtree_matcher")
async def analyze_rule_method1():
    article_text =gd.getText()
    sentences=wc.getSentences(article_text)
    RE1 = re2.extract_re_subtree(sentences)
    return {'RE1': RE1}

@router.get("/chunk_matcher")
async def analyze_rule_method2():
    article_text =gd.getText()
    sentences=wc.getSentences(article_text)
    RE2 = re2.extract_re_pairs(sentences)
    return {"RE2": RE2}

@router.get("/noun_pre_noun")
async def analyze_rule1_method():
    article_text =wc.getSentences(gd.getText())
    RE3 = re1.extract_nprep(article_text)
    return {"RE3": RE3}

@router.get('/test')
async def  test_display():
    t = "When Sebastian Thrun started working on self-driving cars at Google in 2007, few people outside of the company took him seriously."
    nlp = spacy.load("en_core_web_sm")
    doc = nlp(t)
    ents = list(doc.ents)
    simple_list = [{'label': e.label_, 'text': e.text } for e in ents]
    return simple_list
    
@router.get('/te/') 
async def te():
    t='When Sebastian Thrun started working on self-driving cars at Google in 2007, few people outside of the company took him seriously.'
    nlp = spacy.load("en_core_web_sm")
    doc =  nlp(t)
    simple_list = [{'text':t.text,'label':None if t.ent_type_=='' else t.ent_type_,'POS':t.pos_,'TAG':t.tag,'DEP':t.dep_}for t in doc]
    ents_list = [{'text':e.text,'label':e.label_,"star":e.start,'end':e.end-1}for e in doc.ents]
    return{'simple':simple_list,'ents':ents_list}


