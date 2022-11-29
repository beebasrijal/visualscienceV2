const pslider = document.querySelector("#pcoil");
const sslider = document.querySelector("#scoil");
const vslider = document.querySelector("#pvoltage-value");
const pvoltageV = document.querySelector(".pvoltageNum");
const pcurrent = document.querySelector(".pcurrent");
const ppower = document.querySelector(".ppower");
const svoltage = document.querySelector(".svoltage");
const scurrent = document.querySelector(".scurrent");
const spower = document.querySelector(".spower");
const testdiv = document.querySelector(".type");

const power = 100;
let secvolt = 100;

document.querySelector("body").onload = () => {
  voltageSliderFun(1);
  testdiv.innerHTML = test(pslider.value, sslider.value);
};

const voltageSliderFun = (value) => {
  pvoltageV.innerHTML = "Voltage Value: " + value + " V";
  pcurrent.innerHTML =
    "P. Current: " + calculatePrimaryCurrent(parseInt(value), power) + " A";
  svoltage.innerHTML =
    "S. Voltage: " +
    calculateSecondaryVoltage(
      parseInt(pslider.value),
      parseInt(sslider.value),
      parseInt(value)
    ).toFixed(2) +
    " V";
  secvolt = calculateSecondaryVoltage(
    parseInt(pslider.value),
    parseInt(sslider.value),
    parseInt(value)
  );
  scurrent.innerHTML =
    "S. Current: " +
    calculateSecondaryCurrent(
      parseInt(value),
      calculatePrimaryCurrent(parseInt(value), power)
    ).toFixed(2) +
    " A";
  testdiv.innerHTML = test(pslider.value, sslider.value);
};

const calculatePrimaryCurrent = (voltage, power) => {
  return (power / voltage).toFixed(2);
};

const calculateSecondaryVoltage = (
  coilPrimary,
  coilSecondary,
  voltagePrimary
) => {
  return (voltagePrimary * coilSecondary) / coilPrimary;
};

const calculateSecondaryCurrent = (voltagePrimary, currentPrimary) => {
  return (voltagePrimary * currentPrimary) / secvolt;
};

const test = (pcoil, scoil) => {
  if (parseInt(pcoil) > parseInt(scoil)) {
    return "Transformer Type: Step-Down Transformer";
  } else if (parseInt(pcoil) < parseInt(scoil)) {
    return "Transformer Type: Step-Up Transformer";
  } else {
    return "Voltage is neither increased nor decreased.";
  }
};
