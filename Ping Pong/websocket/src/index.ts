import http from "http"
import WebSocket, {WebSocketServer} from "ws"
const server = http.createServer((request :any, response :any) => {   
    response.end("Hiiii there")
})

//create new ws server
const wss = new WebSocketServer({server});

wss.on("connection", function connection(ws){
    ws.on("error",console.error);
    ws.on('message', function (e){
        if(e.toString() === "ping" ){
            ws.send("pong")
        }
    })
    ws.send("Hello, message from ws server")
})

server.listen(8080, ()=> {
    console.log("Server started")
})