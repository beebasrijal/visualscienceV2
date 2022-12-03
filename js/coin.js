const coin = document.querySelector(".coindiv");
const feather = document.querySelector(".featherdiv");
const runbtn = document.querySelector(".runbtn");
const container = document.querySelector(".container");
const medium = document.querySelector(".medium");
const switch1 = document.querySelector(".switch");
const featherg = document.querySelector(".featherg");

let state = "Air";

document.getElementsByTagName("body").onload = function () {
    coin.style.animation = "none";
    feather.style.animation = "none";
};

const restart = () => {
    if (state === "Air") {
        anim(1.2, 4);
    } else {
        anim(1.2, 1.2);
    }
};

const anim = (a, b) => {
    coin.style.animation = "none";
    coin.offsetHeight;
    coin.style.animation = `motino ${a}s ease-in-out`;

    feather.style.animation = "none";
    feather.offsetHeight;
    feather.style.animation = `motino ${b}s ease-in-out`;
};

const changeColor = (elem) => {
    if (state === "Air") {
        state = "Vacuum";
        container.style.backgroundColor = "#fff";
        medium.textContent = `Current Medium Inside Chamber: ${state}`;
        console.log(elem);
        switch1.textContent = "Vacuum";
        featherg.innerHTML = "9.8 m/s<sup>2</sup>";
    } else {
        state = "Air";
        container.style.backgroundColor = "rgb(151, 206, 255)";
        medium.textContent = `Current Medium Inside Chamber: ${state}`;
        switch1.textContent = "Air";
        featherg.innerHTML = "2.5 m/s<sup>2</sup>";
    }
};
