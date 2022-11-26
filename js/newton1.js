const dragElement = (element, dragzone) => {
    let pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;

    //MouseUp occurs when the user releases the mouse button
    const dragMouseUp = () => {
        document.onmouseup = null;
        //onmousemove attribute fires when the pointer is moving while it is over an element.
        document.onmousemove = null;

        element.classList.remove("drag");
    };

    const dragMouseMove = (event) => {
        event.preventDefault();
        //clientX property returns the horizontal coordinate of the mouse pointer
        pos1 = pos3 - event.clientX;
        //clientY property returns the vertical coordinate of the mouse pointer
        pos2 = pos4 - event.clientY;
        pos3 = event.clientX;
        pos4 = event.clientY;
        //offsetTop property returns the top position relative to the parent
        //   element.style.top = `${element.offsetTop - pos2}px`;
        element.style.left = `${element.offsetLeft - pos1}px`;
    };

    const dragMouseDown = (event) => {
        event.preventDefault();

        pos3 = event.clientX;
        pos4 = event.clientY;

        element.classList.add("drag");

        document.onmouseup = dragMouseUp;
        document.onmousemove = dragMouseMove;
    };

    dragzone.onmousedown = dragMouseDown;
};

const dragable = document.getElementById("dragable"),
    dragzone = document.getElementById("dragzone");

dragElement(dragable, dragzone);

var prevEvent, currentEvent;
document.onmousemove = function (event) {
    currentEvent = event;
};

var maxSpeed = 0,
    prevSpeed = 0,
    maxPositiveAcc = 0,
    maxNegativeAcc = 0;

function thisand() {
    setInterval(function () {
        if (prevEvent && currentEvent) {
            var movementX = Math.abs(currentEvent.screenX - prevEvent.screenX);
            var movementY = Math.abs(currentEvent.screenY - prevEvent.screenY);
            var movement = Math.sqrt(
                movementX * movementX + movementY * movementY
            );

            document.getElementById("movementX").innerText = movementX;
            document.getElementById("movementY").innerText = movementY;
            document.getElementById("movement").innerText =
                Math.round(movement);

            //speed=movement/100ms= movement/0.1s= 10*movement/s
            var speed = 10 * movement; //current speed

            document.getElementById("speed").innerText = Math.round(speed);
            // document.getElementById("maxSpeed").innerText = Math.round(
            //   speed > maxSpeed ? (maxSpeed = speed) : maxSpeed
            // );

            var acceleration = 10 * (speed - prevSpeed);

            document.getElementById("acceleration").innerText =
                Math.round(acceleration);

            if (acceleration > 0) {
                document.getElementById("maxPositiveAcceleration").innerText =
                    Math.round(
                        acceleration > maxPositiveAcc
                            ? (maxPositiveAcc = acceleration)
                            : maxPositiveAcc
                    );
            } else {
                document.getElementById("maxNegativeAcceleration").innerText =
                    Math.round(
                        acceleration < maxNegativeAcc
                            ? (maxNegativeAcc = acceleration)
                            : maxNegativeAcc
                    );
            }
        }

        prevEvent = currentEvent;
        prevSpeed = speed;
    }, 100);
}

thisand();
