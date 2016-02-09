var http = require('http');
var fs = require('fs');
var path = require('path');
var mime = require('mime');
var chatServer = require('./lib/chat_server');

var cache= {};

function send404(response){
	response.writeHead(404,{'Content-Type': 'text/plain'});
	response.write('Error 404: resource not found.');
	response.end();
}

function sendFile(response, filePath, fileContents){
	response.writeHead(
			200, 
			{'Content-Type': mime.lookup(path.basename(filePath))}
	);
	response.end(fileContents);
}

function serveStatic(response, cache, absPath){
	if(cache[absPath]){
		sendFile(response, absPath, cache[absPath]);
	}
	else{
		fs.exists(absPath, function(exists){
			
			if(exists){
				fs.readFile(absPath, function(err,data){
					if(err){
						send404(response);
					}
					else{
						cache[absPath] = data;
						sendFile(response, absPath, data);
					}
				});
			}
			else{
				send404(response);
				}
			}
		);
	}
}


var server = http.createServer(function handler(request, response) {
//    response.writeHead(200, {'Content-Type': 'text/plain'});
//    respoonse.end('I R HERE\n');
	var filePath = false;
	
	if(request.url === '/'){
		filePath='public/index.html';
	}
	else{
		filePath= 'public' + request.url;
	}
	var absPath='./' + filePath;
	serveStatic(response, cache, absPath);
	
});

server.listen(1338, '127.0.0.1', function(){
	console.log('Server running at http://127.0.0.1:1338/');	
});

chatServer.listen(server);


