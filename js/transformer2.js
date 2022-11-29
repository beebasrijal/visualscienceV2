const sliders = document.querySelectorAll(".slider");
const P = document.querySelectorAll(".P");
const S = document.querySelectorAll(".S");

const nPW = document.querySelector(".pcoilNum");
const nSW = document.querySelector(".scoilNum");
const PV = document.querySelector(".pvoltageNum");
const PC = document.querySelector(".pcurrent");
const PP = document.querySelector(".ppower");
const SV = document.querySelector(".svoltage");
const SC = document.querySelector(".scurrent");
const SP = document.querySelector(".spower");

let scoilnum = 1;
let pcoilnum = 1;
let pvoltage = 1;

window.onload = () => {
    sliders.forEach((element) => {
        element.value = 0;
    });
    UPDATE();
};

const pcoilchange = (num) => {
    let NUM = parseInt(num);
    pcoilnum = NUM;
    reset();
    for (let i = 0; i < NUM - 1; i++) {
        P[i].style.opacity = 1;
    }
    UPDATE();
};

const scoilchange = (num) => {
    let NUM = parseInt(num);
    scoilnum = NUM;
    reset();
    for (let i = 0; i < NUM - 1; i++) {
        S[i].style.opacity = 1;
    }
    UPDATE();
};

const pvoltagechange = (num) => {
    pvoltage = parseInt(num);
    UPDATE();
};

const reset = () => {
    P.forEach((element) => {
        element.style.opacity = 0;
    });
    S.forEach((element) => {
        element.style.opacity = 0;
    });
};

const UPDATE = () => {
    nPW.innerHTML = "Number of Primary Windings: " + pcoilnum;
    nSW.innerHTML = "Number of Secondary Windings: " + scoilnum;
    PV.innerHTML = "Primary Voltage: " + pvoltage;
    PC.innerHTML = "P. Current: " + calculatePrimaryCurrent(pvoltage, power);
    SV.innerHTML =
        "S. Voltage: " +
        calculateSecondaryVoltage(pcoilnum, scoilnum, pvoltage);
    SC.innerHTML =
        "S. Current: " +
        calculateSecondaryCurrent(
            pvoltage,
            calculatePrimaryCurrent(pvoltage, power)
        );
};

UPDATE();
