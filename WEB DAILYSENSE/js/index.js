//custom cursor
gsap.set(".ball", { xPercent: -50, yPercent: -50 });

let xTo = gsap.quickTo(".ball", "x", { duration: 0.6, ease: "power3" }),
    yTo = gsap.quickTo(".ball", "y", { duration: 0.6, ease: "power3" });

window.addEventListener("mousemove", e => {
    xTo(e.clientX);
    yTo(e.clientY);
});
// cambia el circulo dependiendo de la velocidad
function raton() {
    var prevEvent, currentEvent;
    document.documentElement.onmousemove = function(event) {
        currentEvent = event;
    }

    var maxSpeed = 0,
        prevSpeed = 0,
        maxPositiveAcc = 0,
        maxNegativeAcc = 0;
    setInterval(function() {
        if (prevEvent && currentEvent) {
            var movementX = Math.abs(currentEvent.screenX - prevEvent.screenX);
            var movementY = Math.abs(currentEvent.screenY - prevEvent.screenY);
            var movement = Math.sqrt(movementX * movementX + movementY * movementY);

            //speed=movement/100ms= movement/0.1s= 10*movement/s
            var speed = 10 * movement; //current speed
            var acceleration = 10 * (speed - prevSpeed);
            /*
            if (acceleration > 0) {
                gsap.to('.ball', {
                    duration: 1,
                    rotationX: 45,
                    scale: acceleration / 2000,
                });
            } else {
                gsap.to('.ball', {
                    duration: 1,
                    rotationX: 45,
                    scale: 1,
                });
            }
            */
        }
        prevEvent = currentEvent;
        prevSpeed = speed;
    }, 100);

}
raton();



//Text change ( NO FUNCIONA EL ARRAY )
/*
function words() {
    let ok = 0;
    gsap.registerPlugin(TextPlugin);
    let palabras = ['Simplicity', 'Elegance', 'Innovation'];

    gsap.to('#text', {
        delay: 1,
        duration: 3,
        text: {
            value: palabras[0],
            newClass: "class2",
        }, //power 4 back
        ease: "power2"
    });
}
words();
*/



// magnetic button
var mWrap = document.querySelectorAll(".magnetic-wrap");

function parallaxIt(e, wrap, movement = 1) {
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    var boundingRect = wrap.mArea.getBoundingClientRect();
    var halfDiff = Math.abs(boundingRect.width - boundingRect.height) / 2;
    var relX = e.pageX - boundingRect.left - halfDiff;
    var relY = e.pageY - boundingRect.top;

    gsap.to(wrap.mContent, {
        x: (relX - boundingRect.width / 2) * movement,
        y: (relY - boundingRect.height / 2 - scrollTop) * movement,
        ease: "power1",
        duration: 0.8
    });
}

mWrap.forEach(function(wrap) {
    wrap.mContent = wrap.querySelector(".js-magnetic-content");
    wrap.mArea = wrap.querySelector(".js-magnetic-area");

    wrap.mArea.addEventListener("mousemove", function(e) {
        parallaxIt(e, wrap);
    });

    wrap.mArea.addEventListener("mouseleave", function(e) {
        gsap.to(wrap.mContent, {
            scale: 1,
            x: 0,
            y: 0,
            ease: "power3",
            duration: 0.8
        });
    });
});


