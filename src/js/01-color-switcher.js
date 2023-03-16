const startBtnEl = document.querySelector('button[data-start]');
const stopBtnEl = document.querySelector('button[data-stop]');

let intervalId = null;

stopBtnEl.setAttribute("disabled", "true");

startBtnEl.addEventListener('click', handleStartBtnClick);
stopBtnEl.addEventListener('click', handleStopBtnClick);

function handleStartBtnClick() {   
    intervalId = setInterval(() => {
        changeBgColor();
    }, 1000);  

    startBtnEl.setAttribute("disabled", "true");
    stopBtnEl.removeAttribute("disabled");
}

function handleStopBtnClick() {
    clearInterval(intervalId);
    startBtnEl.removeAttribute("disabled");
    stopBtnEl.setAttribute("disabled", "true");
}

function changeBgColor() {
    const randomColor = getRandomHexColor();
    document.body.style.backgroundColor = randomColor;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

