import pandas as pd 
from tqdm import tqdm

from pandas.core.frame import DataFrame
from IPython.core.display import display, HTML


import spacy
from spacy.matcher import Matcher 
from spacy.tokens import Span 
from spacy import displacy 

HTML_WRAPPER = """<div style="overflow-x: auto; border: 1px solid #e6e9ef; border-radius: 0.25rem; padding: 1rem">{}</div>"""
nlp = spacy.load("en_core_web_sm")



def extract_named_ents(text):
    #y= [(ent.text, ent.label_) for ent in nlp(text).ents]
    y = nlp(text)
    html = displacy.render(y, style="ent")
    html = html.replace("\n\n", "\n")
    #result = HTML_WRAPPER.format(html)
    #return result
    return html