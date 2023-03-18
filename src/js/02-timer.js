import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio'; 

const btnStartEl = document.querySelector("button[data-start]");
const dateTimePicker = document.querySelector("#datetime-picker");
const dataDaysEl = document.querySelector("span[data-days]");
const dataHoursEl = document.querySelector("span[data-hours]");
const dataMinutesEl = document.querySelector("span[data-minutes]");
const dataSecondsEl = document.querySelector("span[data-seconds]");

btnStartEl.setAttribute("disabled", true);

const TIMER_INTERVAL = 1000;

let currentDate = new Date();
let selectedDate = null;
let remainingTime = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    remainingTime = selectedDate - currentDate;
      
      if (remainingTime > 0) {
        btnStartEl.removeAttribute("disabled");
      } 
      else { 
        Notify.failure('Please choose a date in the future', {timeout: 2000});
        btnStartEl.setAttribute("disabled", true);
      }
  },
};

flatpickr("#datetime-picker", options);

btnStartEl.addEventListener('click', habdleBtnStartClick);

function habdleBtnStartClick() {
    updateInterface(addLeadingZero(convertMs(remainingTime)));
    runTimer();
    btnStartEl.setAttribute("disabled", true);
    dateTimePicker.setAttribute("disabled", true);
}

let intervalId = null;

function runTimer() {
    intervalId = setInterval(() => {
        remainingTime -= TIMER_INTERVAL;

        updateInterface(addLeadingZero(convertMs(remainingTime)));

        if (remainingTime < 1000) {
            stopTimer();
        }

    }, TIMER_INTERVAL);
}

function stopTimer() {
    clearInterval(intervalId);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero({ days, hours, minutes, seconds }) { 
    const formatedDays = days.toString().padStart(2, "0");
    const formatedHours = hours.toString().padStart(2, "0");
    const formatedMinutes = minutes.toString().padStart(2, "0");
    const formatedSeconds = seconds.toString().padStart(2, "0");

    return {formatedDays, formatedHours, formatedMinutes, formatedSeconds};
};

function updateInterface({ formatedDays, formatedHours, formatedMinutes, formatedSeconds }) {
    dataDaysEl.textContent = formatedDays;
    dataHoursEl.textContent = formatedHours;
    dataMinutesEl.textContent = formatedMinutes;
    dataSecondsEl.textContent = formatedSeconds;
}







