var mouseX = 0.0, mouseY = 0.0;
var mouseUsed = false;
var touchForce = 0.0;

function resetMouse() {
    mouseX = 0.0;
    mouseY = 0.0;
    touchForce = 0.0;
    mouseUsed = false;
}

function setMouseCoords(x, y, width, height) {
    mouseX = (x - width/2.0) / width * (width/height);
    mouseY = -((y - height/2.0) / height);
    mouseUsed = true;

    if (showFPS) {
        var mX = mouseX * settings.zoom_factor;
        var mY = mouseY * settings.zoom_factor;
        var sign = (mY >= 0) ? "+" : "-";
        var value = round(mX) + " " + sign + " " + round(Math.abs(mY)) + "i";
        $("#mouse-coords").text("m = " + value);
    }
}

function setTouchForce(force) {
    touchForce = force;

    if (showFPS) {
        $("#touch-force").text("f = " + round(touchForce));
    }
}

$(function() {
    var $innerContainer = $("div#newton-inner-container");

    $innerContainer.mousemove(function(event) {
        var x = event.pageX - $innerContainer.offset().left;
        var y = event.pageY - $innerContainer.offset().top;

        var width = $innerContainer[0].clientWidth;
        var height = $innerContainer[0].clientHeight;

        setMouseCoords(x, y, width, height);

    });

    $innerContainer.on('touchmove', function(event) {
        if (event.originalEvent.touches.length !== 1) {
            return;
        }
        var touch = event.originalEvent.touches[0];
        //console.log(touch);

        var x = touch.pageX - $innerContainer.offset().left;
        var y = touch.pageY - $innerContainer.offset().top;

        var width = $innerContainer[0].clientWidth;
        var height = $innerContainer[0].clientHeight;

        setMouseCoords(x, y, width, height);

        event.preventDefault();
    });

    $innerContainer.on('touchforcechange', function(event) {
        if (event.originalEvent.touches.length !== 1) {
            return;
        }
        var touch = event.originalEvent.touches[0];

        setTouchForce(touch.force);
    });

    $innerContainer.on('touchend', function() {
        setTouchForce(0.0);
    });
});