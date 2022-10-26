import spacy
from spacy import tokens
from pandas.core.frame import DataFrame

from spacy.matcher import Matcher 
from spacy.tokens import Span 
from spacy import displacy 

HTML_WRAPPER = """<div style="overflow-x: auto; border: 1px solid #e6e9ef; border-radius: 0.25rem; padding: 1rem">{}</div>"""



nlp = spacy.load("en_core_web_sm")

def getSentences(text):
    document = nlp(text)
    t= [sent.text for sent in document.sents]
    return t

def extract_noun(text):
    return [(chunk.text) for chunk in nlp(text).noun_chunks]

def add_noun(df):
    df['noun'] = df['text'].apply(extract_noun) 
    return df
  

def extract_verb(text):
    #return [token.text for token in nlp(text)if token.pos_=='VERB']
    #res = [{'text':t.text,'label':None if t.pos_!='VERB' else 'verb'}for t in nlp(text)]
    doc = nlp(text)
    t = [ ]
    for i in doc:
        if i.pos_ == 'VERB':
                t.append('<mark>'+ i.text +'</mark>')
        else:
                t.append(i.text)
    res = ' '.join(t)

    return res



def extract_compounds(text):
    comp_idx = 0
    compound = []
    compound_nps = []
    tok_idx = 0
    for idx, tok in enumerate(nlp(text)):
        if tok.dep_ == 'compound':

            # capture hyphenated compounds
            children = ''.join([c.text for c in tok.children])
            if '-' in children:
                compound.append(''.join([children, tok.text]))
            else:
                compound.append(tok.text)

            # remember starting index of first child in compound or word
            try:
                tok_idx = [c for c in tok.children][0].idx
            except IndexError:
                if len(compound) == 1:
                    tok_idx = tok.idx
            comp_idx = tok.i

        # append the last word in a compound phrase
        if tok.i - comp_idx == 1:
            compound.append(tok.text)
            if len(compound) > 1: 
                compound = ' '.join(compound)
                compound_nps.append((compound))

            # reset parameters
            tok_idx = 0 
            compound = []

    return compound_nps

def add_compounds(df):
    df['compounds'] = df['text'].apply(extract_compounds)
    return df
    

def extract_adj_noun(text):
    
    doc = nlp(text)

    pat = []
    
    # iterate over tokens
    for token in doc:
        phrase = ''
        # if the word is a subject noun or an object noun
        if (token.pos_ == 'NOUN')\
            and (token.dep_ in ['dobj','pobj','nsubj','nsubjpass']):
            
            # iterate over the children nodes
            for subtoken in token.children:
                # if word is an adjective or has a compound dependency
                if (subtoken.pos_ == 'ADJ') or (subtoken.dep_ == 'compound'):
                    phrase += subtoken.text + ' '
                    
            if len(phrase)!=0:
                phrase += token.text
             
        if  len(phrase)!=0:
            pat.append(phrase)
        
    
    return pat


