from lxml.html import *
from cgi import parse_qs
import json
def application(environ, start_response):
    status = '200 OK'
    response_headers = [('Content-type', 'text/html')]
    start_response(status, response_headers)
    recieved = parse_qs(environ['QUERY_STRING'])   #Fetching the values sent using POST
    f = open('/var/www/wsgi/a11ypi_dict.json','r')
    temp = f.read()
    f.close()
    myJSONObject = json.loads(temp, object_hook=dict)
    # myJSONObject = {'http://a11y.in/a11ypi/idea/firesafety.html': {'lang.hi': {'div1': 'http://a11y.in/a11ypi/idea/fire-hi.html:hi'},
    #                                                'lang.kn': {'div1': 'http://a11y.in/a11ypi/idea/fire-kn.html:kn',
    #                                                            'image1': 'http://a11y.in/a11ypi/idea/fire-kn.html:img1'}
    #                                                }
    #                 }
    parameter = dict()
    for i in recieved:
        parameter[i] = recieved[i][0]
    url = parameter['url']
    url2 =" "
    lang = parameter['lang']
    root = parse(url).getroot()
    if myJSONObject.has_key(url):
       if myJSONObject[url].has_key(lang):
       	  for key in myJSONObject[url][lang].keys():
 	        url2 = myJSONObject[url][lang][key].rsplit(":",1)[0]
 	  	root2 = parse(url2).getroot()
 	  	element = myJSONObject[url][lang][key].rsplit(":",1)[1]
 	      	if root.get_element_by_id(key).tag == 'img':
 	      	    root.get_element_by_id(key).attrib['src'] = root2.get_element_by_id(element).attrib['src']
 	      	else:
		    root.get_element_by_id(key).text = root2.get_element_by_id(element).text
       else:
           return ['<b>No replacement available for the prefered language</b>']
    else:
        return ['<b>No replacement available for '+url+'</b>']
    root.make_links_absolute(url,resolve_base_href=True)              #For getting the CSS and Images.
    output = tostring(root)
    return [output]
