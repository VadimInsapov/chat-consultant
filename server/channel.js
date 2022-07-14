function loadScript(url) {
    return new Promise(function (resolve, reject) {
        const script = document.createElement("script");
        script.onload = resolve;
        script.onerror = reject;
        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
    });
}

function loadCss(href) {
    const head = document.getElementsByTagName('head')[0];
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = href;
    link.media = 'all';
    head.appendChild(link);
}


function createMessageBlock(author, body, time, isMy) {
    const messageDiv = document.createElement("div");
    if (isMy) messageDiv.classList.add("my");
    messageDiv.classList.add("message", "d-flex", "flex-column", "mb-3");
    const authorDiv = document.createElement("div");
    const author2Div = document.createElement("div");
    author2Div.classList.add("author", "d-inline", "p-1", "rounded");
    author2Div.innerText = author;
    const bodyDiv = document.createElement("div");
    bodyDiv.classList.add("body", "fs-6", "border", "border-dark", "p-1", "rounded", "mt-2");
    bodyDiv.innerText = body;
    const timeDiv = document.createElement("div");
    timeDiv.classList.add("time", "fw-bold");
    timeDiv.innerText = time;

    messageDiv.appendChild(authorDiv);
    authorDiv.appendChild(author2Div);
    messageDiv.appendChild(bodyDiv);
    messageDiv.appendChild(timeDiv);
    return messageDiv;
}

async function doThis(channelId) {
    await loadCss("http://localhost:5000/channelStyle.css");
    await loadCss("https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css");
    await loadScript("http://localhost:5000/socket.io/socket.io.js");
    const socket = io('http://localhost:5000');
    socket.on("message", function (msg) {
        console.log(msg);
    });


    let open_modal = document.querySelectorAll('.open_modal');
    let close_modal = document.getElementById('close_modal');
    let buttonChat = document.getElementById('button-chat');
    let block = document.getElementById('block2');
    let greet = document.getElementById('greet');
    let modal_new_message = document.getElementById('modal_new-message');
    let modal = document.getElementById('modal2');
    let modal_messages = document.getElementById('modal_messages');
    let messages = document.getElementById('messages');
    let body = document.getElementsByTagName('body')[0];
    for (let i = 0; i < open_modal.length; i++) {
        open_modal[i].onclick = function () { // клик на открытие
            modal.classList.add('modal_vis'); // добавляем видимость окна
            modal.classList.remove('bounceOutDown'); // удаляем эффект закрытия
        };
    }
    close_modal.onclick = function () { // клик на закрытие
        modal.classList.add('bounceOutDown'); // добавляем эффект закрытия
        modal.classList.remove('modal_vis');
        body.classList.remove('body_block'); // возвращаем прокрутку
    };
    let questExists = false;
    if (!questExists) {
        modal_messages.appendChild(greet);
        modal_new_message.parentNode.removeChild(modal_new_message);
        messages.parentNode.removeChild(messages);
    } else {
        modal_messages.removeChild(greet);
        modal.insertBefore(modal_new_message, buttonChat);
        modal_messages.appendChild(messages);
    }
    buttonChat.onclick = () => {
        if (!questExists) {
            let name = document.getElementById('name').value;
            let lastName = document.getElementById('lastName').value;
            let city = document.getElementById('city').value;
            let body = document.getElementById('body').value;
            if (!(name && lastName && city)) return;
            socket.emit('message', {name, lastName, city, body, channelId});
            //отравка данных
            questExists = true;
            modal_messages.removeChild(greet);
            modal.insertBefore(modal_new_message, buttonChat);
            modal_messages.appendChild(messages);
        } else {
            //получение и отображение сообщений
            console.log(messages.scrollHeight)
            modal_messages.scrollTop = 9999;
            console.log(messages.scrollTop)

            const messageBlock = createMessageBlock("Вадим Инсапов", "Это я", "23.06.2000", true);
            messages.appendChild(messageBlock)
            console.log(messages)


            const message = modal_new_message.value;
            modal_new_message.value = "";
            //отправка
            console.log(message)
        }

    }
}

const channelId = document.currentScript.src.split('=')[1];
doThis(channelId);