/**
 * @author Jonas.Fournel
 * @fileOverview
 */

const urlParams = new URLSearchParams(window.location.search);
const typeParam = urlParams.get('type');
const bookingTypeParam = urlParams.get('bookingType');

const supportType = document.getElementById("support-type");
const bookingType = document.getElementById("booking-type");
const stageType = document.getElementById("stage-type");

supportType.querySelectorAll("input").forEach((element) => {
    element.addEventListener("click", (event) => {
        supportType.querySelectorAll("input").forEach((otherElement) => {
            otherElement.classList.add("disabled");
        })
        element.classList.remove("disabled");
        bookingType.classList.remove("hidden");
    })
});

bookingType.querySelectorAll("input").forEach((element) => {
    element.addEventListener("click", (event) => {
        bookingType.querySelectorAll("input").forEach((otherElement) => {
            otherElement.classList.add("disabled");
        })
        element.classList.remove("disabled");
        stageType.classList.remove("hidden");
    })
});

stageType.querySelectorAll("input").forEach((element) => {
    element.addEventListener("click", (event) => {
        stageType.querySelectorAll("input").forEach((otherElement) => {
            otherElement.classList.add("disabled");
        })
        element.classList.remove("disabled");
        stageType.classList.remove("hidden");
    })
});

if(typeParam) {
    document.getElementById("support-type").querySelectorAll("input")[parseInt(typeParam)].dispatchEvent(new Event("click"));

    if(bookingType) {
        document.getElementById("booking-type").querySelectorAll("input")[parseInt(bookingTypeParam)].dispatchEvent(new Event("click"));
    }
}
