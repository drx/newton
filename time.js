var startTime = 0.0;

function resetTime() {
    startTime = (performance || Date).now() / 1000.0;
}

function getTimeValue() {
    var now = (performance || Date).now() / 1000.0;
    var t = now - startTime;

    updateTime(t);

    return t;
}


