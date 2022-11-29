const coin = document.querySelector(".coin");
const feather = document.querySelector(".feather");
const runbtn = document.querySelector(".runbtn");
const container = document.querySelector(".container");
const pipe = document.querySelector(".pipe1");
const medium = document.querySelector(".medium");

let state = "Air";

document.getElementsByTagName("body").onload = function() {
    coin.style.animation = "none";
    feather.style.animation = "none";
}

const restart = () => {
    if (state === "Air") {
        anim(1.2,1.6);
    } else {
        anim(1.2, 1.2);
    }
}

const anim = (a,b) => {
    coin.style.animation = "none";
    coin.offsetHeight;
    coin.style.animation = `motino ${a}s ease-in-out`;

    feather.style.animation = "none";
    feather.offsetHeight;
    feather.style.animation = `motino ${b}s ease-in-out`;
}

const changeColor = () => {
    if (state === "Air") {
        state = "Vacuum"
        container.style.backgroundColor = "#fff";
        pipe.style.backgroundColor = "#fff";
        medium.textContent = `Current Medium Inside Chamber: ${state}`;
    } else {
        state = "Air";
        container.style.backgroundColor = "aliceblue";
        pipe.style.backgroundColor = "aliceblue";
        medium.textContent = `Current Medium Inside Chamber: ${state}`;
    }
}

