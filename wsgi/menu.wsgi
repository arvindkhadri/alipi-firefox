import json
def application(environ, start_response):
    status = '200 OK'
    response_headers = [('Content-type', 'text/plain')]
    start_response(status, response_headers)
    received = environ['wsgi.input'].read(int(environ['CONTENT_LENGTH']))
    f = open('/var/www/wsgi/a11ypi_dict.json','r')
    temp = f.read()
    f.close()
    temp_json = json.loads(temp, object_hook=dict)
    myJSONObject = {}
    for i in temp_json.keys():
        myJSONObject[i] = temp_json[i].keys()
    #myJSONObject = {'http://a11y.in/a11ypi/idea/firesafety.html': ['lang.hi' ,'lang.kn']}
    if myJSONObject.has_key(received):
        return [json.dumps(myJSONObject[received])]
    else:
        return ["None"]
