const Power = 100;

const sliders = document.querySelectorAll(".slider");
const P = document.querySelectorAll(".P");
const S = document.querySelectorAll(".S");

// Data containers
const nPW = document.querySelector(".pcoilNum");
const nSW = document.querySelector(".scoilNum");
const PV = document.querySelector(".pvoltageNum");
const PC = document.querySelector(".pcurrent");
const PP = document.querySelector(".ppower");
const SV = document.querySelector(".svoltage");
const SC = document.querySelector(".scurrent");
const SP = document.querySelector(".spower");

// Added lines
// --------------------------------------------------------------------------
const textHighlighted = document.querySelector(".type");
const textOnTransformer = document.querySelector(".transformer_type_svg");

// Sliders
let pVolatageSlider = document.getElementById("pvoltage-value");
let pCoilSlider = document.getElementById("pcoil");
let sCoilSlider = document.getElementById("scoil");

// Input Data Values
let pvoltageValue, pCoilValue, sCoilValue;

// Variables to be updated
let pCurrent, sVolatage, sCurrent;

// --------------------------------------------------------------------------

// Data containers' default value
let scoilnum = 1;
let pcoilnum = 1;
let pvoltage = 1;

window.onload = () => {
  sliders.forEach((element) => {
    element.value = 0;
  });
  UPDATE();
};

// Added lines
// --------------------------------------------------------------------------
const calcuations = () => {
  pvoltageValue = parseInt(pVolatageSlider.value);
  pCoilValue = parseInt(pCoilSlider.value);
  sCoilValue = parseInt(sCoilSlider.value);

  pCurrent = calculatePrimaryCurrent(pvoltageValue, Power);
  sVolatage = calculateSecondaryVoltage(pCoilValue, sCoilValue, pvoltageValue);
  sCurrent = calculateSecondaryCurrent(pvoltageValue, pCurrent, sVolatage);
};

const calculatePrimaryCurrent = (voltage, power) => {
  return (power / voltage).toFixed(2);
};

const calculateSecondaryVoltage = (
  coilPrimary,
  coilSecondary,
  voltagePrimary
) => {
  return ((voltagePrimary * coilSecondary) / coilPrimary).toFixed(2);
};

const calculateSecondaryCurrent = (voltagePrimary, currentPrimary, secvolt) => {
  return ((voltagePrimary * currentPrimary) / secvolt).toFixed(2);
};

const test1 = (pcoil, scoil) => {
  if (parseInt(pcoil) > parseInt(scoil)) {
    return "Transformer Type: Step-Down Transformer";
  } else if (parseInt(pcoil) < parseInt(scoil)) {
    return "Transformer Type: Step-Up Transformer";
  } else {
    return "Voltage is neither increased nor decreased.";
  }
};

const test2 = (pcoil, scoil) => {
  if (parseInt(pcoil) > parseInt(scoil)) {
    return "Step-Down Transformer";
  } else if (parseInt(pcoil) < parseInt(scoil)) {
    return "Step-Up Transformer";
  }
};
// --------------------------------------------------------------------------

const pcoilchange = (num) => {
  let NUM = parseInt(num);
  //   pcoilnum = NUM;
  //   reset();
  resetPrimary();

  for (let i = 0; i < NUM - 1; i++) {
    P[i].style.opacity = 1;
  }
  UPDATE();
};

const scoilchange = (num) => {
  let NUM = parseInt(num);
  //   scoilnum = NUM;
  //   reset();
  resetSecondary();

  for (let i = 0; i < NUM - 1; i++) {
    S[i].style.opacity = 1;
  }
  UPDATE();
};

const pvoltagechange = (num) => {
  pvoltage = parseInt(num);
  UPDATE();
};

// const reset = () => {
//   P.forEach((element) => {
//     element.style.opacity = 0;
//   });
//   S.forEach((element) => {
//     element.style.opacity = 0;
//   });
// };

const resetPrimary = () => {
  P.forEach((element) => {
    element.style.opacity = 0;
  });
};
const resetSecondary = () => {
  S.forEach((element) => {
    element.style.opacity = 0;
  });
};
// const UPDATE = () => {
//   nPW.innerHTML = "Number of Primary Windings: " + pcoilnum;
//   nSW.innerHTML = "Number of Secondary Windings: " + scoilnum;
//   PV.innerHTML = "Primary Voltage: " + pvoltage;
//   PC.innerHTML = "P. Current: " + calculatePrimaryCurrent(pvoltage, power);
//   SV.innerHTML =
//     "S. Voltage: " + calculateSecondaryVoltage(pcoilnum, scoilnum, pvoltage);
//   SC.innerHTML =
//     "S. Current: " +
//     calculateSecondaryCurrent(
//       pvoltage,
//       calculatePrimaryCurrent(pvoltage, power)
//     );
// };

const UPDATE = () => {
  calcuations();
  nPW.innerHTML = "Number of Primary Windings: " + pCoilValue;
  nSW.innerHTML = "Number of Secondary Windings: " + sCoilValue;
  PV.innerHTML = "Primary Voltage: " + pvoltageValue;
  PC.innerHTML = "P. Current: " + pCurrent;
  SV.innerHTML = "S. Voltage: " + sVolatage;
  SC.innerHTML = "S. Current: " + sCurrent;

  // --------------------------------------------------------------------------
  textHighlighted.innerHTML = test1(pCoilValue, sCoilValue);
  textOnTransformer.textContent = test2(pCoilValue, sCoilValue);
};

UPDATE();
