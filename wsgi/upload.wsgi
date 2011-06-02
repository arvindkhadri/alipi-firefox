import os
from urllib import unquote_plus
import pymongo
def application(environ, start_response):
    status = '200 OK'
    response_headers = [('Content-type', 'text/plain')]
    start_response(status, response_headers)
    #environ['wsgi.input'].seek(0)
    received = environ['wsgi.input'].read(int(environ['CONTENT_LENGTH']))
    typ = environ.get('CONTENT_TYPE')
    # parameter_pairs = received.split('&') 
    # parameter = dict()
    # for parameter_pair in parameter_pairs:        #Converting to dictionary, would easy to traverse.
    #     parameter_pair = parameter_pair.split('=') 
    #     parameter[unquote_plus(parameter_pair[0])] = unquote_plus(parameter_pair[1])
    conn = pymongo.Connection('localhost')
    db = conn['alipi']
    coll = db['alipi_counter']
    coll.update({'type':'cntr'},{'$inc':{'counter':1}})
    if typ == 'audio/ogg':
        f = open(os.path.join(os.path.dirname(__file__),'upload' + str(coll.find_one({'type':'cntr'})['counter']) + '.ogg'), 'w')
        f.write(received)
        f.close()
    #return ['upload' + str(coll.find_one({'type':'cntr'})['counter']) +'.' + typ.split('/')[1]]
    elif 'image' in typ.split('/'):
        f = open(os.path.join(os.path.dirname(__file__),'upload'+str(coll.find_one({'type':'cntr'})['counter'])+'.'+typ.split('/')[1] ),'w')
        f.write(received)
        f.close()
    return ['upload' + str(coll.find_one({'type':'cntr'})['counter']) +'.' + typ.split('/')[1]]


    
