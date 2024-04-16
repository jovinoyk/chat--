//chat elements
const chat = document.querySelector(".chat")
const chatForm = chat.querySelector(".chat-form")
const chatInput = chat.querySelector(".chat-input")
const chatMessages = chat.querySelector(".chat-messages")



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

const createMessageOtherElement = (content, sender, senderColor) => {
    const div = document.createElement("div")
    const span = document.createElement("span")

    div.classList.add("message-self")
    div.classList.add("message-other")
    span.classList.add("message-sender")
    span.style.color = senderColor

    div.appendChild(span)

    span.innerHTML = sender
    div.innerHTML += content

    return div
}

const createMessageSelfElement = (content) => {

    const div = document.createElement("div")
    div.classList.add("message-self")
    div.innerHTML = content

    return div
}


const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length)
    return colors[randomIndex]
}


const scrollScreen = () => {
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth"
    })
}


const processMessage = ({ data }) => { // event.data - porem {data} pega a mensagem direto
    //console.log("Mensagem: "+ data) 
    //console.log(JSON.parse(data)) - do arquivo JSON
    
    const { userId, userName, userColor, content } = JSON.parse(data)

    const message = userId == user.id
        ? createMessageSelfElement(content)
        : createMessageOtherElement(content, userName, userColor)
    
    // const element = createMessageOtherElement(content, userName, userColor) // chama função para criar a mensagem com o conteudo

    chatMessages.appendChild(message) // para mostrar na tela - adicioanr o message(conteudo) como filho da div

    scrollScreen()
}


const handleLogin    = (event) => {
    event.preventDefault()
    
    user.id = crypto.randomUUID()
    user.name = loginInput.value
    user.color = getRandomColor()

    login.style.display = "none";
    chat.style.display = "flex";
    
    websocket = new WebSocket("wss://chat-estudo.onrender.com") // ws://localhost:8080 (teste local)
    websocket.onmessage = processMessage    // ======== DUVIDA

    //websocket.onopen = () => websocket.send(`Usuario: ${user.name} entrou no chat!`) // envia a mensagem ao server
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

    websocket.send(JSON.stringify(message))  // envia a mensagem com os dados do cliente
    //websocket.send(chatInput.value)  // Envia a mensagem do input para o server 
    chatInput.value = " "  /// reseta o campo de texto

    
    //websocket.onmessage = processMessage  // ======== DUVIDA 
    
}

loginForm.addEventListener("submit", handleLogin)
chatForm.addEventListener("submit", sendMessage)