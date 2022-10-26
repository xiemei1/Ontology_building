
import pandas as pd 
import numpy as np 
import json

from pandas.core.frame import DataFrame
from IPython.core.display import display, HTML


import spacy
from spacy.matcher import Matcher 
from spacy.tokens import Span 
from spacy import displacy 

nlp = spacy.load("en_core_web_sm")



def getText():
    f = open('data/texts.json',)
    data = json.load(f)
    content_debates = data['debates']
    text= content_debates.replace("\n"," ")
    return text


def sw_removal(text):
    sw_spacy = nlp.Defaults.stop_words
    words = [word for word in text.split() if word.lower() not in sw_spacy]
    new_text = " ".join(words)
    return new_text