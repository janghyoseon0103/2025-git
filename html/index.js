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

//3. sendMessage 함수 정의하기
function sendMessage() {
		//userInput에 있는 값을 message 변수에 저장하기
    const message = userInput.value.trim(); //trim: 앞뒤에 있는 공백 제거하는 함수

    if (message === '') {
        return
    }
    else { //message가 비어있지 않다면
        //user의 message를 받아 appendMessage 함수 실행
        appendMessage('user', message);
        //1초 후 bot에서 appendMessage 실행
        setTimeout(() => {
            //api에서 연결 후 수정할거에용
            appendMessage('bot', 'Made By Hyoseon\n')
            butttonIcon.classList.add('fa-solid', 'fa-paper-plane');
            butttonIcon.classList.remove('fas', 'fa-spinner', 'fa-pulse');
        }, 1000);
        return
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