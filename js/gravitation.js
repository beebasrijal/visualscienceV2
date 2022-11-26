const circle1 = document.getElementById("circle-1");
const circle2 = document.getElementById("circle-2");
const mass1 = document.getElementById("mass1");
const mass2 = document.getElementById("mass2");
const massvalue1 = document.querySelector(".mass1value");
const massvalue2 = document.querySelector(".mass2value");
const controls = document.querySelector(".controls");
const height = 200;
const forceValueContainer = document.getElementById("force-value-container");
const distanceValueContainer = document.getElementById(
  "distance-value-container"
);
const LeftXCoordinate = 0;
const BotoomYCoordinate = window.innerHeight;
const TopYCoordinate = 0;
const RightXCoordinate = controls.getBoundingClientRect().x;
var mouseMovement1 = true;
var mouseMovement2 = true;
var maxDistance = 50; // distance between two masses initally

window.onload = resetWindow;
calculateForce();
circle1.addEventListener("mousedown", function (e) {
  moveCircle(e, circle1, circle2);
  calculateForce();
});
circle2.addEventListener("mousedown", function (e) {
  moveCircle(e, circle2, circle1);
});

mass1.oninput = function () {
  calculateForce();
  scaling(circle1, this.value);
  massvalue1.innerHTML = `${this.value} billion kg`;
};

mass2.oninput = function () {
  calculateForce();
  scaling(circle2, this.value);
  massvalue2.innerHTML = `${this.value} billion kg`;
};

function calculateDistance() {
  var rect1 = circle1.getBoundingClientRect();
  var rect2 = circle2.getBoundingClientRect();
  var x1 = rect1.x + rect1.width / 2;
  var y1 = rect1.y + rect1.height / 2;
  var x2 = rect2.x + rect2.width / 2;
  var y2 = rect2.y + rect2.height / 2;
  var distance = Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);

  return distance / 100;
}
function calculateForce() {
  var distance = parseInt(calculateDistance());
  var G = 6.67 * Math.pow(10, -11);
  var force =
    (G * mass1.value * mass2.value * Math.pow(10, 18)) /
    (distance * distance * 1000 * 1000);
  var Force = Math.floor(force);
  forceValueContainer.innerHTML = `<span class="fd">Force =</span> ${Force}N`;
  distanceValueContainer.innerHTML = `<span class="fd">Distance =</span> ${distance}km`;
  return Force;
}

function scaling(circleElem, sliderValue, scaleValue) {
  const maxHeight = 350;
  const coefficient = (maxHeight - height) / 10;

  let Height = coefficient * sliderValue + height;
  circleElem.style.height = Height + "px";
  circleElem.style.width = Height + "px";
}

function moveCircle(event, circleElem, notMovingCircle) {
  // (1) prepare to moving: make absolute and on top by z-index
  circleElem.style.position = "absolute";
  circleElem.style.zIndex = 1000;

  // move it out of any current parents directly into body
  // to make it positioned relative to the body
  document.body.append(circleElem);

  // centers the circleElem at (pageX, pageY) coordinates
  function moveAt(pageX, pageY) {
    var Height = circleElem.clientHeight;
    let leftValue = pageX - circleElem.offsetWidth / 2;
    let topValue = pageY - circleElem.offsetHeight / 2;
    if (!collideCircle()) {
      circleElem.style.left =
        leftValue > 0 && leftValue + Height < RightXCoordinate
          ? leftValue + "px"
          : leftValue > 0
          ? RightXCoordinate - Height + "px"
          : LeftXCoordinate + "px";
      circleElem.style.top =
        topValue > 0 && topValue + Height < BotoomYCoordinate
          ? topValue + "px"
          : topValue > 0
          ? BotoomYCoordinate - Height + "px"
          : TopYCoordinate + "px";
    } else {
      document.removeEventListener("mousemove", onMouseMove);
      resolveCircle(circleElem, notMovingCircle);
    }
    calculateForce();
  }

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }

  // (2) move the circleElem on mousemove
  document.addEventListener("mousemove", onMouseMove);

  // (3) drop the circleElem, remove unneeded handlers
  document.onmouseup = function () {
    document.removeEventListener("mousemove", onMouseMove);
    circleElem.onmouseup = null;
  };
}
circle1.ondragstart = function () {
  return false;
};
circle2.ondragstart = function () {
  return false;
};

const reset = document.querySelector(".reset");
const circle1Pos = [
  circle1.getBoundingClientRect().x,
  circle1.getBoundingClientRect().y,
];
const circle2Pos = [
  circle2.getBoundingClientRect().x,
  circle2.getBoundingClientRect().y,
];
function resetWindow() {
  mass1.value = 1;
  mass2.value = 1;
  massvalue1.innerHTML = "1 Billion Kg";
  massvalue2.innerHTML = "1 Billion Kg";
  circle1.style.height = 200 + "px";
  circle1.style.width = 200 + "px";
  circle2.style.height = 200 + "px";
  circle2.style.width = 200 + "px";
  circle1.style.left = circle1Pos[0] + "px";
  circle1.style.top = circle1Pos[1] + "px";
  circle2.style.left = circle2Pos[0] + "px";
  circle2.style.top = circle2Pos[1] + "px";
  forceValueContainer.innerHTML = '<span class="fd">Force</span> = 4N';
  distanceValueContainer.innerHTML = '<span class="fd">Distance</span> = 4km';
}
reset.onclick = resetWindow;

/* To test if two circles are overlapping, you simply test to see if the distance
      between their two center points is less than their combined radii. The formula
      for distance between two points is sqrt((p1.x - p2.x)^2 + (p1.y - p2.y)^2), but
      since sqrt is an expensive operation, we can simply stop after we square the two
      differences and test against the square of the sum of the radii. */
function collideCircle() {
  /* first we get the x and y distance between the two circles. */
  let distance = calculateDistance() * 100;
  /* Then we get the sum of their radii. */
  let radii_sum =
    parseInt(circle1.style.height.substring(0, 3)) / 2 +
    parseInt(circle2.style.height.substring(0, 3)) / 2;

  /* Then we test to see if the square of their distance is greater than the
        square of their radii. If it is, then there is no collision. If it isn't,
        then we have a collision. */
  if (distance <= radii_sum) return true;
  return false;
}
function resolveCircle(movingCircle, notMovingCircle) {
  let rect1 = movingCircle.getBoundingClientRect();
  let rect2 = notMovingCircle.getBoundingClientRect();
  let x1 = rect1.x + rect1.width / 2;
  let y1 = rect1.y + rect1.height / 2;
  let x2 = rect2.x + rect2.width / 2;
  let y2 = rect2.y + rect2.height / 2;
  let distanceX = Math.abs(x2 - x1);
  let distanceY = Math.abs(y2 - y1);
  let totalDistance = Math.sqrt(distanceX ** 2 + distanceY ** 2);
  // let unit_x = distanceX / totalDistance;
  // let unit_y = distanceY / totalDistance;
  if (x2 > x1) {
    movingCircle.style.left = rect1.x - Math.abs(x2 - x1) / 3 + "px";
  } else {
    movingCircle.style.left = rect1.x + Math.abs(x2 - x1) / 3 + "px";
  }
  if (y2 > y1) {
    movingCircle.style.top = rect1.y - Math.abs(y2 - y1) / 3 + "px";
  } else {
    movingCircle.style.top = rect1.y + Math.abs(y2 - y1) / 3 + "px";
  }
  // c1.x = c2.x + (radii_sum + 1) * unit_x;
  // c1.y = c2.y + (radii_sum + 1) * unit_y;
}
