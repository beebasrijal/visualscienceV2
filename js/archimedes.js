// DOM manipulation
const spring = document.querySelector(".spring");
const liquid = document.querySelector(".liquid");
const weightsvg = document.querySelector(".weightsvg");
const cup = document.querySelector(".cup");
var liquidRect = liquid.getBoundingClientRect();
const finalWeight = document.getElementById("final-weight");
const selectLiquid = document.getElementById("select-liquid");
const density = document.getElementById("density");
const weightDisplaced = document.getElementById("weight-displaced");
var BotoomYCoordinate;
var TopYCoordinate = 2;
// var LeftXCoordinate = cup.getBoundingClientRect().x;
const springHeight = spring.offsetHeight;
const resetButton = document.getElementById("reset");
const liquidinitialHeight = 100; // height of the liquid in pixels

// reset
document.querySelector("body").onload = reset;
resetButton.onclick = reset;

// Calculations
const densityOfWater = 1000; // kg/m^3
const densityOfOil = 910;
const densityOfHoney = 1260;
const weightOfBlock = 15; //kg
const g = 9.8;
var densityArray = [densityOfWater, densityOfOil, densityOfHoney];
var colorArray = ["aqua", "#dbcf5c", "#eba937"];

spring.onmousedown = function (event) {
    liquidRect = liquid.getBoundingClientRect();
    BotoomYCoordinate = liquidRect.y + liquid.offsetHeight - 10;
    moveSpring(event);
    spring.ondragstart = function () {
        return false;
    };
};

// Touch event
spring.ontouchmove = function (event) {
    liquidRect = liquid.getBoundingClientRect();
    BotoomYCoordinate = liquidRect.y + liquid.offsetHeight - 10;
    moveSpring(event);
    spring.ondragstart = function () {
        return false;
    };
};

//

const moveSpring = (event) => {
    spring.style.position = "absolute";
    spring.style.zIndex = 1000;

    // move it out of any current parents directly into body
    // to make it positioned relative to the body
    // document.body.append(spring);

    function moveAt(pageY) {
        var Height = spring.offsetHeight;
        let topValue = pageY - spring.offsetHeight / 2;
        spring.style.top =
            topValue > TopYCoordinate && topValue + Height < BotoomYCoordinate
                ? topValue + "px"
                : topValue > TopYCoordinate
                ? BotoomYCoordinate - Height + "px"
                : TopYCoordinate + "px";
        weightsvg.style.top =
            topValue > TopYCoordinate && topValue + Height < BotoomYCoordinate
                ? topValue + 50 + "px"
                : topValue > TopYCoordinate
                ? BotoomYCoordinate - Height + 50 + "px"
                : TopYCoordinate + 50 + "px";
        var densityOfLiquid = densityArray[parseInt(selectLiquid.value)];

        volumeDisplaced(densityOfLiquid);
    }
    function onMouseMove(event) {
        moveAt(event.pageY);
    }

    // (2) move the spring on mousemove
    document.addEventListener("mousemove", onMouseMove);

    document.addEventListener("touchmove", (event) => {
        moveAt(event.touches[0].pageY);
    });

    // (3) drop the spring, remove unneeded handlers
    document.onmouseup = function () {
        document.removeEventListener("mousemove", onMouseMove);
        spring.onmouseup = null;
    };
    document.ontouchend = function () {
        document.addEventListener("touchmove", (event) => {
            moveAt(event.touches[0].pageY);
        });
        spring.ontouchend = null;
    };
};

selectLiquid.oninput = function () {
    liquid.style.backgroundColor = colorArray[parseInt(selectLiquid.value)];
    density.innerHTML =
        `Density: ${densityArray[parseInt(selectLiquid.value)]} kg/m` +
        "3".sup();
};
function reset() {
    spring.style.top = TopYCoordinate + "px";
    weightsvg.style.top = TopYCoordinate + 50 + "px";
    if (window.innerWidth > 768) {
        spring.style.left = "50%";
    } else {
        spring.style.left = "50%";
    }
    selectLiquid.value = 0;
    liquid.style.backgroundColor = colorArray[0];
    density.innerHTML = `Density: ${densityArray[0]} kg/m` + "3".sup();
    weightDisplaced.innerHTML = `Weight of liqiud displaced: 0 N`;
    finalWeight.innerHTML = `Weight of block: ${weightOfBlock} N`;
    weightsvg.textContent = `${weightOfBlock} N`;
}

function volumeDisplaced(densityOfLiquid) {
    let BlockYCoordinate =
        spring.getBoundingClientRect().y + spring.offsetHeight;

    let LiquidYCoordinate = parseInt(liquidRect.y); //to be changed later
    if (BlockYCoordinate > LiquidYCoordinate) {
        waterDisplacedVolume =
            parseInt(BlockYCoordinate - LiquidYCoordinate) / 100000;
        waterDisplacedWeight =
            Math.floor(waterDisplacedVolume * densityOfLiquid * 9.8 * 100) /
            100;

        finalWeightBlock =
            Math.floor((weightOfBlock - waterDisplacedWeight) * 100) / 100;
        liquid.style.height =
            liquidinitialHeight + waterDisplacedVolume * Math.pow(10, 4) + "px";
        finalWeight.innerHTML = `Weight of block: ${finalWeightBlock} N`;
        weightsvg.textContent = `${finalWeightBlock} N`;

        weightDisplaced.innerHTML = `Weight of liqiud displaced:${waterDisplacedWeight} N`;
    } else {
        finalWeight.innerHTML = `Weight of block: 15 N`;
        weightsvg.textContent = `15 N`;

        weightDisplaced.innerHTML = `Weight of liqiud displaced: 0 N`;
    }
}

// // spring movement with mouse
// spring.onmousedown = function (event) {
//   liquidRect = liquid.getBoundingClientRect();
//   BotoomYCoordinate = liquidRect.y + liquid.offsetHeight - 10;
//   spring.style.position = "absolute";
//   spring.style.zIndex = 1000;

//   // move it out of any current parents directly into body
//   // to make it positioned relative to the body
//   document.body.append(spring);

//   function moveAt(pageY) {
//     var Height = spring.offsetHeight;
//     let topValue = pageY - spring.offsetHeight / 2;
//     spring.style.top =
//       topValue > TopYCoordinate && topValue + Height < BotoomYCoordinate
//         ? topValue + "px"
//         : topValue > TopYCoordinate
//         ? BotoomYCoordinate - Height + "px"
//         : TopYCoordinate + "px";
//     var densityOfLiquid = densityArray[parseInt(selectLiquid.value)];

//     volumeDisplaced(densityOfLiquid);
//   }
//   function onMouseMove(event) {
//     moveAt(event.pageY);
//   }

//   // (2) move the spring on mousemove
//   document.addEventListener("mousemove", onMouseMove);

//   // (3) drop the spring, remove unneeded handlers
//   document.onmouseup = function () {
//     document.removeEventListener("mousemove", onMouseMove);
//     spring.onmouseup = null;
//   };
// };
// spring.ondragstart = function () {
//   return false;
// };
