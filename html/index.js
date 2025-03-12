//1. 사용할 DOM 선택하기
//getElementById, querySelector
const chatLog = document.getElementById('chat-log'),
    userInput = document.getElementById('user-input'),
    sendButton = document.getElementById('send-button'),
    butttonIcon = document.getElementById('button-icon'),
    info = document.querySelector('.info');

//2. 버튼 클릭시 이벤트 추가하기
//addEventListener
sendButton.addEventListener('click', sendMessage);

userInput.addEventListener('keydown', (event) => {
    if(event.key === 'Enter') {
        sendMessage();
    }
});
async function sendMessage() {
    const message = userInput.value.trim();

    if (message === '') {
        return
    }
    appendMessage('user', message);
    userInput.value = '';

    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: message }],
            max_tokens: 100,
        }),
    };

    try {
        await fetch(API_URL, options)
            .then((response) => response.json())
            .then((response) => {
                console.log(response);
                appendMessage('bot', response);
                butttonIcon.classList.add('fa-solid', 'fa-paper-plane');
                butttonIcon.classList.remove('fas', 'fa-spinner', 'fa-pulse');
            })
    } catch(error) {
        console.error("Error: ", error);
        appendMessage('bot', `Error: ${error}`);
    }
}

//4.appendMessage 함수 정의하기
function appendMessage(sender, message) { //sender는 user나 bot
    //현재 화면에 보여지고있는 Info 안보이게하기
    info.style.display = 'none';
    //버튼의 아이콘 바꿔주기
    butttonIcon.classList.remove('fa-solid', 'fa-paper-plane');
    butttonIcon.classList.add('fas', 'fa-spinner', 'fa-pulse');

    //메세지를 담을 Node 생성하기
    const chatElement = document.createElement('div');
    const messageElement = document.createElement('div');
    const iconElement = document.createElement('div');
    const icon = document.createElement('i');

    //class 추가하기
    chatElement.classList.add('chat-box');
    iconElement.classList.add('icon');
    messageElement.classList.add(sender);
    //text 추가하기
    messageElement.innerText = message;

    //sender에 따라 icon 추가하기
    if(sender === 'user') {
        icon.classList.add('fa-regular', 'fa-user');
        iconElement.setAttribute('id', 'user-icon');
    } else {
        icon.classList.add('fa-solid', 'fa-robot');
        iconElement.setAttribute('id', 'bot-icon');
    }

    //정의한 Node를 트리에 연결하기
    iconElement.appendChild(icon);
    chatElement.appendChild(iconElement);
    chatElement.appendChild(messageElement);
    chatLog.appendChild(chatElement);
}
