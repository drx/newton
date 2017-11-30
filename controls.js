var settings = {
    method: "newton",
    zoom_factor: 4.0
};

var prevTime;
var lag;
var showFPS = false;

function round(number) {
    return Math.round(number*100)/100;
}

function toggleFPS() {
    showFPS = !showFPS;

    if (showFPS) {
        prevTime = (performance || Date).now();
        lag = 0;
    }
}
function updateFPS() {
    if (showFPS) {
        var curTime = (performance || Date).now();

        var diff = curTime - prevTime;
        prevTime = curTime;

        lag = lag * 0.9 + diff * 0.1;

        var fps = 1000.0/(lag);
        $("#fps").text(round(fps) + " fps");
    }
}

function updateTime(t) {
    if (showFPS) {
        $("#time").text("t = " + round(t));
    }
}

function updateDerivatives(df, ddf) {
    if (df)
        $("#df").html("f′ = " + df);
    else
        $("#df").html("");

    if (ddf)
        $("#ddf").html("f″ = " + ddf);
    else
        $("#ddf").html("");
}

function initControls(gl) {
    var $canvas = $("canvas#newton");
    var $canvasContainer = $("div#newton-container");

    $(document).keypress(function (event) {
        var key = String.fromCharCode(event.which);
        console.log(key, event);
        if (key === "=") {
            settings.zoom_factor *= 0.98;
        }
        else if (key === "-") {
            settings.zoom_factor *= 1.02;
        }
        else if (key === ";" && (event.metaKey || event.ctrlKey)) {
            /* Ctrl + ; - Take a screenshot */

            var data = $canvas[0].toDataURL("image/png");

            var win = window.open('about:blank', 'Screenshot');
            win.document.write("<title>Newton's method screenshot</title>"
                + "<a download='screenshot.png' href='"+data+"'><img src='"+data+"' alt='Screenshot'></a>");

        }
    });

    $("#expand").click(function() {
        var fullScreen = $canvasContainer.hasClass("fullscreen");
        var $icon = $(this).children("i.fa");

        fullScreen = !fullScreen;
        $canvasContainer.toggleClass("fullscreen", fullScreen);
        $icon.toggleClass("fa-expand", !fullScreen);
        $icon.toggleClass("fa-compress", fullScreen);

    });

    $("button#prefs").click(function() {
        $("#newton-prefs").toggleClass("hide");
        toggleFPS();
    });

    $("button#prev-eq").click(function() {
        var selectize = $('select#equation')[0].selectize;
        selectize.selectAdjacent(-1);

        stopDemo();
    });

    $("button#next-eq").click(function() {
        var selectize = $('select#equation')[0].selectize;
        selectize.selectAdjacent(1);

        stopDemo();
    });

    $(".clickable").click(function(){
        var equation = $(this).data("equation");
        $('select#equation')[0].selectize.setValue(equation);
        setEquation(gl);
    });

    $("select#method").change(function() {
        settings.method = $(this).val();
        setEquation(gl, true);
    });
}