//chat elements
const chat = document.querySelector(".chat")
const chatForm = chat.querySelector(".chat-form")
const chatInput = chat.querySelector(".chat-input")



// login elements

const login = document.querySelector(".login")
const loginForm = login.querySelector(".login-form")
const loginInput = login.querySelector(".login-input")

const colors = [
    "cadetblue",
    "darkgoldenrod",
    "cornflowerblue",
    "darkkhaki",
    "hotpink",
    "gold"
]

const user = { id: "", name: "", color: "" }

let websocket

const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length)
    return colors[randomIndex]
}


const processMessage = ({ data }) => { // event.data - porem {data} pega a mensagem direto
    console.log("Alert: "+ data)
}


const handleLogin    = (event) => {
    event.preventDefault()
    
    user.id = crypto.randomUUID()
    user.name = loginInput.value
    user.color = getRandomColor()

    login.style.display = "none";
    chat.style.display = "flex";
    
    websocket = new WebSocket("ws://localhost:8080")
    websocket.onmessage = processMessage    // ======== DUVIDA

   // websocket.onopen = () => websocket.send(`Usuario: ${user.name} entrou no chat!`) // envia a mensagem ao server
   //console.log(user)
 }

 
const sendMessage = (event) => {
    event.preventDefault()

    const message = {
        userId: user.id,
        userName: user.name,
        userColor: user.color,
        content: chatInput.value
    }

    websocket.send(chatInput.value)
    // websocket.onmessage = processMessage  // ======== DUVIDA
    
}

loginForm.addEventListener("submit", handleLogin)
chatForm.addEventListener("submit", sendMessage)