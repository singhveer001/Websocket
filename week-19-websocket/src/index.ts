import http from "http"
import WebSocket, {WebSocketServer} from "ws"
const server = http.createServer((request :any, response :any) => {
    
    response.end("Hiiii there")
})

//create new ws server
const wss = new WebSocketServer({server});

let userCount = 0;
wss.on("connection", function connection(ws){
    ws.on("error",console.error);

    ws.on('message', function message(data, isBinary){
        wss.clients.forEach(function each(client){
            if(client.readyState === WebSocket.OPEN){
                client.send(data, {binary : isBinary})
            }
        })
    })
    console.log("Useer ",  ++userCount, " Connected")
    ws.send("Hello, message from ws server")
})

server.listen(8080, ()=> {
    console.log("Server started")
})