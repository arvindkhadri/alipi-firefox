from lxml.html import *
from urllib import unquote_plus
def application(environ, start_response):
    status = '200 OK'
    recieved = environ['wsgi.input'].read(int(environ['CONTENT_LENGTH']))	#Fetching the values sent using POST
    parameter_pairs = recieved.split('&') 
    parameter = dict()
    for parameter_pair in parameter_pairs:				#Converting to dictionary, would easy to traverse.
    	parameter_pair = parameter_pair.split('=') 
	parameter[unquote_plus(parameter_pair[0])] = unquote_plus(parameter_pair[1]) 
    #test = repr(parameter) #Used to convert the dictionary to a list.
    myJSONObject = {'http://localhost/a11y.html': {'lang.hi': {'div1': 'http://localhost/fire-hi.html:hi'},
                                'lang.kn': {'div1': 'http://localhost/fire-kn.html:kn',
                                            'image1': 'http://localhost/fire-kn.html:img0'}}}
    url = parameter['url']
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
    root.make_links_absolute(url,resolve_base_href=True) 
    output = tostring(root)
    # str = root.get_element_by_id('main_content').text_content()
    #output = fragment_fromstring(str,create_parent ='div')
    response_headers = [('Content-type', 'text/html')]
    start_response(status, response_headers)
    return [output]
