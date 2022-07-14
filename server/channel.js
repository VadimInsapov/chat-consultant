function loadScript(url) {
    return new Promise(function (resolve, reject) {
        const script = document.createElement("script");
        script.onload = resolve;
        script.onerror = reject;
        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
    });
}

loadScript("http://localhost:5000/socket.io/socket.io.js").then(() => {
    const socket = io('http://localhost:5000');
    let open_modal = document.querySelectorAll('.open_modal');
    let close_modal = document.getElementById('close_modal');
    let buttonChat = document.getElementById('button-chat');
    let block = document.getElementById('block');
    let modal = document.getElementById('modal');
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
});
