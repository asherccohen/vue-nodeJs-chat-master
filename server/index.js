"use strict";
// Optional. You will see this name in eg. 'ps' or 'top' command
process.title = 'node-chat';
// Port where we'll run the websocket server
var webSocketsServerPort = 1337;
// websocket and http servers
var webSocketServer = require('websocket').server;
var http = require('http');
/**
 * Global variables
 */
// latest 100 messages
var history = [{
        time: new Date(),
        author: 'Mike',
        id: '6650735c-77a1-461b-9f79-b2f0b92bb621',
        avatar: 'https://ui-avatars.com/api/?name=Elon+Musk',
        text: 'lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor',
    },
    {
        time: new Date(),
        id: 'cd3e0243-28fb-4409-9c7a-9ba5554ef1db',
        author: 'Betty',
        avatar: 'https://ui-avatars.com/api/?name=Elon+Musk',
        text: 'Hi guys!',
    },
    {
        time: new Date(),
        id: Math.floor((Math.random() * 3000) + 1) + '-' + Math.floor((Math.random() * 2500) + 1) + '-' + Math.floor((Math.random() * 4788) + 1) + '-' +
            Math.floor((Math.random() * 54678) + 1),
        author: 'George',
        avatar: 'https://ui-avatars.com/api/?name=Elon+Musk',
        text: 'This app looks great',
    },
    {
        time: new Date(),
        id: Math.floor((Math.random() * 3000) + 1) + '-' + Math.floor((Math.random() * 2500) + 1) + '-' + Math.floor((Math.random() * 4788) + 1) + '-' +
            Math.floor((Math.random() * 54678) + 1),
        author: 'Phil',
        avatar: 'User' + Math.floor((Math.random() * 5) + 1),
        text: 'Nice animations, cool features',
    },
    {
        time: new Date(),
        id: Math.floor((Math.random() * 3000) + 1) + '-' + Math.floor((Math.random() * 2500) + 1) + '-' + Math.floor((Math.random() * 4788) + 1) + '-' +
            Math.floor((Math.random() * 54678) + 1),
        author: 'Diana',
        avatar: 'User' + Math.floor((Math.random() * 5) + 1),
        text: 'Have you seen how fast this app is?',
    },
];
// list of currently connected clients (users)
var clients = [];
/**
 * Helper function for escaping input strings
 */
function htmlEntities(str) {
    return String(str)
        .replace(/&/g, '&amp;').replace(/</g, '&lt;')
        .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
/**
 * HTTP server
 */
var server = http.createServer(function(request, response) {
    // Not important for us. We're writing WebSocket server,
    // not HTTP server
});
server.listen(webSocketsServerPort, function() {
    console.log((new Date()) + " Server is listening on port " +
        webSocketsServerPort);
});
/**
 * WebSocket server
 */
var wsServer = new webSocketServer({
    // WebSocket server is tied to a HTTP server. WebSocket
    // request is just an enhanced HTTP request. For more info 
    // http://tools.ietf.org/html/rfc6455#page-6
    httpServer: server
});
// This callback function is called every time someone
// tries to connect to the WebSocket server
wsServer.on('request', function(request) {
    console.log((new Date()) + ' Connection from origin ' +
        request.origin + '.');
    // accept connection - you should check 'request.origin' to
    // make sure that client is connecting from your website
    var connection = request.accept(null, request.origin);
    // we need to know client index to remove them on 'close' event
    var index = clients.push(connection) - 1;
    var userName = false;
    console.log((new Date()) + ' Connection accepted.');
    // send back chat history
    if (history.length > 0) {
        connection.sendUTF(
            JSON.stringify({
                type: 'history',
                data: history
            }));
    }
    // user sent some message
    connection.on('message', function(message) {
        if (message.type === 'utf8') { // accept only text
            // first message sent by user is their name
            if (userName === false) {
                // remember user name
                userName = htmlEntities(message.utf8Data);
                connection.sendUTF(
                    JSON.stringify({
                        type: 'name',
                        data: message
                    }));
                console.log((new Date()) + ' User is known as: ' + userName);
            } else { // log and broadcast the message
                console.log((new Date()) + ' Received Message from ' +
                    userName + ': ' + message.utf8Data);

                // we want to keep history of all sent messages
                var obj = {
                    id: Math.floor((Math.random() * 3000) + 1) + '-' + Math.floor((Math.random() * 2500) + 1) + '-' + Math.floor((Math.random() * 4788) + 1) + '-' +
                        Math.floor((Math.random() * 54678) + 1),
                    time: (new Date()).getTime(),
                    text: htmlEntities(message.utf8Data),
                    author: userName,
                    avatar: '',
                };
                history.push(obj);
                history = history.slice(-100);
                // broadcast message to all connected clients
                var json = JSON.stringify({
                    type: 'message',
                    data: obj
                });
                for (var i = 0; i < clients.length; i++) {
                    clients[i].sendUTF(json);
                }
            }
        }
    });
    // user disconnected
    connection.on('close', function(connection) {
        if (userName !== false) {
            console.log((new Date()) + " Peer " +
                connection.remoteAddress + " disconnected.");
            // remove user from the list of connected clients
            clients.splice(index, 1);
        }
    });

    //random realtime messages
    setInterval(function() {
        // DO SOMETHING WITH timer
        var randomMessage = history[Math.floor(Math.random() * history.length)];
        var obj = {
            id: Math.floor((Math.random() * 3000) + 1) + '-' + Math.floor((Math.random() * 2500) + 1) + '-' + Math.floor((Math.random() * 4788) + 1) + '-' +
                Math.floor((Math.random() * 54678) + 1),
            time: (new Date()).getTime(),
            text: randomMessage.text,
            author: randomMessage.author,
            avatar: '',
        };
        var json = JSON.stringify({
            type: 'message',
            data: obj
        });
        //console.log("Sending random message: " + json.data);

        for (var i = 0; i < clients.length; i++) {
            clients[i].sendUTF(json);
        }
    }, Math.floor((Math.random() * 10) + 1) * 1000);
});