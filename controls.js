var settings = {
    method: "newton",
    zoomFactor: 4.0,
    idleFunction: "cis(t)",
    debug: false
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
            settings.zoomFactor *= 0.98;
        }
        else if (key === "-") {
            settings.zoomFactor *= 1.02;
        }
        else if (key === ";" && (event.metaKey || event.ctrlKey)) {
            /* Ctrl + ; - Take a screenshot */

            var data = $canvas[0].toDataURL("image/png");

            var win = window.open('about:blank', 'Screenshot');
            win.document.write("<title>Newton's method screenshot</title>"
                + "<a download='screenshot.png' href='"+data+"'><img src='"+data+"' alt='Screenshot'></a>");

        }
        else if (settings.debug && key === "." && (event.metaKey || event.ctrlKey)) {
            recordMovie(gl);
        }
        else if (settings.debug && key === "," && (event.metaKey || event.ctrlKey)) {
            take4xScreenshot(gl, 288, 162);
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
        var method = $(this).data("method");
        var restartDemo = $(this).data("restart-demo");

        if (equation) {
            $('select#equation')[0].selectize.setValue(equation);
        }
        else if (method) {
            settings.method = method;
            $("select#method").val(method);
        }
        else if (restartDemo) {
            startDemo();
        }
        setEquation(gl, true);
    });

    $("select#method").change(function() {
        settings.method = $(this).val();
        setEquation(gl, true);
    });
}

function take4xScreenshot(gl, width, height) {
    var $canvas = $("canvas#newton");
    var $output = $("<div>").appendTo("body").hide();

    var $a = $("<a href='' download='' class='frame' title='' alt=''>link</a>");
    $a.appendTo($output);

    for (var zoom=1; zoom<5; zoom++) {
        $canvas.css({"width": (zoom*width)+"px", "height": (zoom*height)+"px"});
        render(gl);

        $a.attr("href", $canvas[0].toDataURL("image/png"));
        $a.attr("download", "screenshot-" + zoom + "x.png");

        $("a.frame").each(function (i, el) {
            el.click();
        });
    }
    $a.remove();
}

function recordMovie(gl) {
    var equation, frame, index;
    var $canvas = $("canvas#newton");
    var $output = $("<div>").appendTo("body").hide();

    $canvas.css({"width": "1920px", "height": "1080px"});
    stopDemo();

    var $a = $("<a href='' download='' class='frame' title='' alt=''>link</a>");
    $a.appendTo($output);

    for (equation=0; equation<demoEquations.length; equation++) {
        for (frame = 0; frame < 5 * 60; frame++) {
            index = equation * 5 * 60 + frame;

            console.log("Frame " + index + "/" + (5*60*demoEquations.length));
            var t = frame / 60;
            setTime(t);
            render(gl);

            $a.attr("href", $canvas[0].toDataURL("image/png"));
            $a.attr("download", "frame_" + index + ".png");

            $("a.frame").each(function (i, el) {
                el.click();
            });
        }

        selectNextDemo();
    }
}