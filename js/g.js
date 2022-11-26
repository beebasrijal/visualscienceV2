var circle2 = document.getElementById("circle-2");
var sliderHeight = document.getElementById("slider-height");
var sliderHeightValue = document.querySelector(".height");
var sliderDepthValue = document.querySelector(".depth");
var sliderDepth = document.getElementById("slider-depth");
var circle1 = document.getElementById("circle-1");
var minValue = -12;
var mass = 6 * Math.pow(10, 24);
const resetbtn = document.querySelector(".reset");
const G = 6.67 * Math.pow(10, -11);
const R = 6400 * 1000;
const Density = 5464.15;
const pi = 3.14;

document.querySelector("body").addEventListener("onload", (e) => {
  resetWindow();
});
var height = document.querySelector(".height");
var depth = document.querySelector(".depth");
var accelerationElem = document.getElementById("acceleration");
function DisplayAccelerationHeight(h) {
  var finalHeight = R + h * 1000;
  var accelerationValue = (G * mass) / Math.pow(finalHeight, 2);
  accelerationElem.innerHTML = `<span class="fd">Acceleration</span> = ${accelerationValue.toFixed(
    2
  )} ms<sup>-2</sup>`;
  sliderDepth.value = 0;
}
function DisplayAccelerationDepth(d) {
  var finalDepth = R - d * 1000;
  var accelerationValue = (4 / 3) * G * Density * finalDepth * pi;
  accelerationElem.innerHTML = `<span class="fd">Acceleration</span> = ${accelerationValue.toFixed(
    2
  )} ms<sup>-2</sup>`;
  sliderHeight.value = 0;
}

sliderHeight.oninput = function () {
  heightValue = parseInt(this.value);
  height.innerHTML = heightValue + " km";
  DisplayAccelerationHeight(heightValue);
  circle2.style.top = minValue - heightValue / 100 + "%";
  depth.innerHTML = 0 + " km";
};

sliderDepth.oninput = function () {
  depthValue = parseInt(this.value) * 100;
  depth.innerHTML = depthValue + " km";
  DisplayAccelerationDepth(depthValue);
  circle2.style.top = minValue + 0.00893 * depthValue + "%";
  height.innerHTML = 0 + " km";
};

const reset = document.getElementById("reset");
reset.addEventListener("click", (e) => {
  resetWindow();
});

function resetWindow() {
  sliderHeight.value = 0;
  sliderDepth.value = 0;
  circle2.style.top = minValue + "%";
  accelerationElem.innerHTML = `<span class="fd">Acceleration</span> = 9.8 ms<sup>-2</sup>`;
  sliderHeightValue.innerHTML = 0 + "km";
  sliderDepthValue.innerHTML = 0 + "km";
}
