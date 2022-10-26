import pandas as pd 
import numpy as np 
import spacy
import json
from . import components as wc


from spacy.matcher import Matcher 
 





nlp = spacy.load("en_core_web_sm")



def subtree_matcher(doc):
    subjpass = 0

    for i,tok in enumerate(doc):
        
    # find dependency tag that contains the text "subjpass"    
       if tok.dep_.find("subjpass") == True:
            subjpass = 1

    x = ''
    y = ''
    z = ''

  # if subjpass == 1 then sentence is passive
    if subjpass == 1:
        for i,tok in enumerate(doc):
            if tok.dep_.find("subj") == True:
                if(doc[i-1].dep_ in['amod','compound']):
                    y = doc[i-1].text + ' '+tok.text
                else:
                    y=tok.text
                                   
            if(tok.dep_.find('ROOT')==0):
                z=tok.text
                
            if tok.dep_.endswith("obj") == True:
                if(doc[i-1].dep_ in['amod','compound']):
                    x = doc[i-1].text + ' '+tok.text  
                else:
                    x = tok.text
  
  # if subjpass == 0 then sentence is not passive
    else:
        for i,tok in enumerate(doc):
            if tok.dep_.endswith("subj") == True:
                if(doc[i-1].dep_ in['amod','compound']):
                    x = doc[i-1].text + ' '+tok.text 
                else:
                    x = tok.text
                    
            if(tok.dep_.find('ROOT')==0):
                z=tok.text

            if tok.dep_.endswith("obj") == True:
                if(doc[i-1].dep_ in['amod','compound']):
                    y = doc[i-1].text + ' '+tok.text
                else:
                    y = tok.text

    return x,y,z

def extract_re_subtree(text):
    
    return[subtree_matcher(nlp(sentence)) for sentence in text]



  



def appendChunk(original, chunk):
    return original + ' ' + chunk

def printToken(token):
    print(token.text, "->", token.dep_)

def isRelationCandidate(token):
    deps = ["ROOT", "adj", "attr", "agent", "amod"]
    return any(subs in token.dep_ for subs in deps)


def isConstructionCandidate(token):
    deps = ["compound", "prep", "conj", "mod"]
    return any(subs in token.dep_ for subs in deps)

def processSubjectObjectPairs(tokens):
    subject = ''
    object = ''
    relation = ''
    subjectConstruction = ''
    objectConstruction = ''
    for token in tokens:
        #printToken(token)
        if "punct" in token.dep_:
            continue
        if isRelationCandidate(token):
            relation = appendChunk(relation, token.lemma_)
        if isConstructionCandidate(token):
            if subjectConstruction:
                subjectConstruction = appendChunk(subjectConstruction, token.text)
            if objectConstruction:
                objectConstruction = appendChunk(objectConstruction, token.text)
        if "subj" in token.dep_:
            subject = appendChunk(subject, token.text)
            subject = appendChunk(subjectConstruction, subject)
            subjectConstruction = ''
        if "obj" in token.dep_:
            object = appendChunk(object, token.text)
            object = appendChunk(objectConstruction, object)
            objectConstruction = ''

    #print (subject.strip(), ",", relation.strip(), ",", object.strip())
    return (subject.strip(), relation.strip(), object.strip())




def extract_re_pairs(text):
    return [processSubjectObjectPairs(nlp(s)) for s in text]

