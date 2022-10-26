import spacy

from spacy.matcher import Matcher 
from spacy.tokens import Span 
from spacy import displacy 





nlp = spacy.load("en_core_web_sm")

def rule(text, index):
    
    doc = nlp(text)
        
    token = doc[index]
    
    entity = ''
    
    for sub_tok in token.children:
        if (sub_tok.dep_ in ['compound','amod']):
            entity += sub_tok.text+' '
    
    entity += token.text

    return entity

def rule_mod(text):
    
    doc = nlp(text)
    
    sent = []
    
    for token in doc:

        if token.pos_=='ADP':

            phrase = ''
            if token.head.pos_=='NOUN':
                
                # appended rule
                append = rule(text, token.head.i)
                if len(append)!=0:
                    phrase += append
                else:  
                    phrase += token.head.text
                phrase += ' '+token.text

                for right_tok in token.rights:
                    if (right_tok.pos_ in ['NOUN','PROPN']):
                        
                        right_phrase = ''
                        # appended rule
                        append = rule(text, right_tok.i)
                        if len(append)!=0:
                            right_phrase += ' '+append
                        else:
                            right_phrase += ' '+right_tok.text
                            
                        phrase += right_phrase
                
                if len(phrase)>2:
                    sent.append(phrase)
                

    return sent


def extract_nprep(text):
    re3 = []
    for sen in text:
        r = rule_mod(sen)
        re3.append(r)
    return re3

    #return[rule_mod([sen for sen in nlp(text)])]