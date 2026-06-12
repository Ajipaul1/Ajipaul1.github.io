from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
server = ThreadingHTTPServer(('localhost', 8000), SimpleHTTPRequestHandler)
server.serve_forever()
