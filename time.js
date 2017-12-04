var startTime = 0.0;
var fixedTime = null;

function resetTime() {
    startTime = (performance || Date).now() / 1000.0;
}

function getTime() {
    var t, now;

    if (fixedTime !== null) {
        t = fixedTime;
    }
    else {
        now = (performance || Date).now() / 1000.0;
        t = now - startTime;
    }

    updateTime(t);

    return t;
}

function setTime(t) {
    fixedTime = t;
}


