import "flatpickr/dist/flatpickr.min.css";
import "izitoast/dist/css/iziToast.min.css";
import "../css/iziToast.css";

import flatpickr from "flatpickr";
import iziToast from "izitoast";

let CHOSEN_DATE = null;

const refs = {
    datePicker: document.querySelector("#datetime-picker"),
    startBtn: document.querySelector("button[data-start]"),
    days: document.querySelector("span[data-days]"),
    hours: document.querySelector("span[data-hours]"),
    minutes: document.querySelector("span[data-minutes]"),
    seconds: document.querySelector("span[data-seconds]"),
}

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] < new Date()) {
            iziToast.error({
                title: "Error",
                message: "Please choose a date in the future",
                position: "topRight",
                timeout: 2000
            });
            refs.startBtn.disabled = true;
            return;
        }
        refs.startBtn.disabled = false;
        CHOSEN_DATE = selectedDates[0];
    },
};

document.addEventListener("DOMContentLoaded", () => {
    flatpickr("#datetime-picker", options);
});

refs.startBtn.addEventListener("click", () => {
    refs.startBtn.disabled = true;
    refs.datePicker.disabled = true;

    const timerId = setInterval(() => {
        const currentTime = new Date();
        const deltaTime = CHOSEN_DATE - currentTime;
        const timeComponents = convertMs(deltaTime);

        if (deltaTime <= 0) {
            clearInterval(timerId);
            return;
        }

        updateClockFace(timeComponents);
    }, 1000);
});

function updateClockFace({ days, hours, minutes, seconds }) {
    refs.days.textContent = addLeadingZero(days);
    refs.hours.textContent = addLeadingZero(hours);
    refs.minutes.textContent = addLeadingZero(minutes);
    refs.seconds.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
    return String(value).padStart(2, "0");
}

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}