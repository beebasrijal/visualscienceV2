const bladeLength = 52;
const airDensity = 1.23;
const maxCoefficientOfPower = 0.4;
const pi = 3.14;
const tipSpeedRatio = 6; // tipSpeedRatio = Blade tip speed/wind speed = 6 (for 3 blades (assumption))

function calculateRPM(windSpeed) {
  return (60 * windSpeed * tipSpeedRatio) / (pi * bladeLength);
}

function calculatePower(windSpeed) {
  var area = pi * bladeLength * bladeLength;
  console.log(area);
  var power = 0.5 * airDensity * windSpeed^3 * maxCoefficientOfPower;
  return power;
}


