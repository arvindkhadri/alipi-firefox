from urllib import unquote_plus
import sqlite3
def application(environ, start_response):
    status = '200 OK'
    response_headers = [('Content-type', 'text/plain')]
    start_response(status, response_headers)
    recieved = environ['wsgi.input'].read(int(environ.get('CONTENT_LENGTH')))
    # parameter_pairs = recieved.split('&') 
    # parameter = dict()
    # for parameter_pair in parameter_pairs:        #Converting to dictionary, would easy to traverse.
    #     parameter_pair = parameter_pair.split('=',1) 
    #     parameter[unquote_plus(parameter_pair[0])] = unquote_plus(parameter_pair[1]) 
    # db = sqlite3.connect('/home/arvind/blog/blog.db')
    # data = "insert into entries(title, content, posted_on) values('" + parameter["title"] +"','"+ parameter["content"]+"'" + ',datetime("now"));'

    # #data = "insert into entries(title, content, posted_on) values("+'"' + parameter["title"]+'"' +','+'"' + parameter["content"]+'"' + ',datetime("now"));)'
    # db.execute(data)
    return [repr(environ.get('CONTENT_LENGTH'))]
