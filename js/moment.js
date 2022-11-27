var ruler = document.querySelector(".rulerbox");
// ruler.style.transform = "rotate(5deg)";
var leftMass = document.getElementById("leftMass");
var rightMass = document.getElementById("rightMass");

const rotation = (mass1, mass2) => {
  console.log(mass1.value, mass2.value);

  var leftForce = parseInt(mass1.value) / 100;
  var rightForce = parseInt(mass2.value) / 100;
  var netForce = rightForce - leftForce;
  ruler.style.transform = `rotate(${netForce * 10}deg)`;
};
leftMass.addEventListener("input", () => {
  rotation(leftMass, rightMass);
});
rightMass.addEventListener("input", () => {
  rotation(leftMass, rightMass);
});
