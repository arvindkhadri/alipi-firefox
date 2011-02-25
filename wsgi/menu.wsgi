import json
def application(environ, start_response):
    status = '200 OK'
    response_headers = [('Content-type', 'text/plain')]
    start_response(status, response_headers)
    received = environ['wsgi.input'].read(int(environ['CONTENT_LENGTH']))
    myJSONObject = {'http://localhost/a11y.html': ['lang.hi' ,'lang.kn']}
    #return [received]
    if myJSONObject.has_key(received):
        return [json.dumps(myJSONObject[received])]
    else:
        return ["None"]
