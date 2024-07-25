const textarea = document.querySelector('textarea')

async function createBotReply (content){
  const API_URL = 'https://api.openai.com/v1/chat/completions'
  const API_KEY = 'sua chave api chatgpt'

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type' : 'application/json',
      'Authorization' :`Bearer ${API_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [{
        role: 'user',
        content
      }]
    })
  })
  

  const data = await response.json()

  return data.choices[0].message.content;
}

function createChatMessage(message, type) {
  const li = document.createElement('li')
  li.classList.add('message', type)
  const p = document.createElement('p')

  if (type=== 'bot'){
    const i = document.createElement('i')
    i.classList.add('fa-solid', 'fa-robot', 'fa-xl')
    li.appendChild(i)
  }

  p.textContent = message
  li.appendChild(p)

  return li
}

async function handleChat() {
  const textareaValue = textarea.value.trim()
  
  if(!textareaValue) {
    return
  }
  const messageHistory = document.querySelector('ul')

  const userMessage = createChatMessage(textareaValue, 'user');

  messageHistory.appendChild(userMessage)
  messageHistory.scrollTo(0, messageHistory.scrollHeight);

  textarea.value = ''

  const botMessage = createChatMessage('Digitando...', 'bot');

  setTimeout(() => {
    messageHistory.appendChild(botMessage)
    messageHistory.scrollTo(0, messageHistory.scrollHeight)


  }, 500)

  try {
   const botReplay= await createBotReply(textareaValue)

   botMessage.querySelector('p').textContent = botReplay
   messageHistory.scrollTo(0, messageHistory.scrollHeight)
  } catch (error) {

  }
  
}

