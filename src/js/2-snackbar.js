import "izitoast/dist/css/iziToast.min.css";
import "../css/iziToast.css";

import iziToast from "izitoast";

const refs = {
    form: document.querySelector(".form")
}

document.addEventListener("DOMContentLoaded", () => {
    refs.form.addEventListener("submit", (event) => {
        event.preventDefault();
        const formData = new FormData(refs.form);
        const delay = Number(formData.get("delay"));
        const state = formData.get("state");

        createPromise(delay, state)
            .then((title) => {
                iziToast.success({
                    title: "OK",
                    message: title,
                    position: "topRight",
                    timeout: 2000
                });
            })
            .catch((title) => {
                iziToast.error({
                    title: "Error",
                    message: title,
                    position: "topRight",
                    timeout: 2000
                });
            });
    });
});

function createPromise(delay, state) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (state === "fulfilled") {
                resolve(`Fulfilled promise in ${delay}ms`);
            } else {
                reject(`Rejected promise in ${delay}ms`);
            }
        }, delay);
    });
}