const chatWindowUser1 = document.getElementById('chat-window-user1');
const messageInputUser1 = document.getElementById('message-input-user1');
const sendBtnUser1 = document.getElementById('send-btn-user1');

const chatWindowUser2 = document.getElementById('chat-window-user2');
const messageInputUser2 = document.getElementById('message-input-user2');
const sendBtnUser2 = document.getElementById('send-btn-user2');

sendBtnUser1.addEventListener('click', () => {
    sendMessage('user1', messageInputUser1, chatWindowUser1, chatWindowUser2, 'user1-own', 'user2-received');
});

sendBtnUser2.addEventListener('click', () => {
    sendMessage('user2', messageInputUser2, chatWindowUser2, chatWindowUser1, 'user2-own', 'user1-received');
});

messageInputUser1.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendBtnUser1.click();
    }
});

messageInputUser2.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendBtnUser2.click();
    }
});

function sendMessage(user, inputElement, ownChatWindow, otherChatWindow, ownClass, receivedClass) {
    const messageText = inputElement.value.trim();
    if (messageText !== '') {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', ownClass);
        messageElement.textContent = messageText;

        const timestampElement = document.createElement('div');
        timestampElement.classList.add('timestamp');
        timestampElement.textContent = getCurrentTime();
        messageElement.appendChild(timestampElement);

        ownChatWindow.prepend(messageElement);

        const messageElementCopy = messageElement.cloneNode(true);
        messageElementCopy.classList.remove(ownClass);
        messageElementCopy.classList.add(receivedClass);
        otherChatWindow.prepend(messageElementCopy);

        ownChatWindow.scrollTop = ownChatWindow.scrollHeight;
        otherChatWindow.scrollTop = otherChatWindow.scrollHeight;
        inputElement.value = '';
    }
}

function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
}
