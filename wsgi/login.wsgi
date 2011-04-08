import gdata
import atom
from gdata import service
from urllib import unquote_plus
import commands
import time
def application(environ, start_response):
    status = '200 OK'
    response_headers = [('Content-type', 'text/plain')]
    start_response(status, response_headers)
    recieved = environ['wsgi.input'].read(int(environ['CONTENT_LENGTH']))
    parameter_pairs = recieved.split('&') 
    parameter = dict()
    for parameter_pair in parameter_pairs:        #Converting to dictionary, would easy to traverse.
        parameter_pair = parameter_pair.split('=',1) 
        parameter[unquote_plus(parameter_pair[0])] = unquote_plus(parameter_pair[1])
    blogger_service = service.GDataService(parameter['Email'], parameter['Passwd'])
    blogger_service.source = 'Servelots-alipi-1.0'
    blogger_service.service = 'blogger'
    blogger_service.account_type = 'GOOGLE'
    blogger_service.server = 'www.blogger.com'
    blogger_service.ProgrammaticLogin()
    query = service.Query()
    query.feed = '/feeds/default/blogs'
    feed = blogger_service.Get(query.ToUri())
    blog_id = " "
    for entry in feed.entry:
        if parameter['href'] == entry.GetHtmlLink().href:
            blog_id = entry.GetSelfLink().href.split("/")[-1]
    blogEntry = CreatePublicPost(blogger_service, blog_id, title=parameter['title'], content=parameter['content'])
    time.sleep(10)
    cmd = 'cd /home/arvind/Projects/alipi-crawler/a11ypi;scrapy crawl --spider a11y.in ' + parameter['href']
    commands.getoutput(cmd)
    return ["Blog successfuly posted!!"]

def CreatePublicPost(blogger_service, blog_id, title, content):
  entry = gdata.GDataEntry()
  entry.title = atom.Title('xhtml', title)
  entry.content = atom.Content(content_type='html', text=content)
  return blogger_service.Post(entry, '/feeds/%s/posts/default' % blog_id)


