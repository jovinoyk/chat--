const { WebSocketServer } = require("ws")
const dotenv = require("dotenv")

dotenv.config()

const wss = new WebSocketServer({ port: process.env.PORT || 8080 })

wss.on("connection", (ws) => {
    ws.on("error", console.error)

    // ws.send("Mensagem enviada pelo servidor") // -- ENVIADA QUANDO CONECTA

    ws.on("message", (data) => {
        
        //console.log(data.toString()) //enviando mensagem para o console 

        wss.clients.forEach((client) => client.send(data.toString())) // enviando a mensagem pra todos
    })

    console.log("client connected")
})