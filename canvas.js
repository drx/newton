var current_equation = null;

function getFile(url) {
    var contents = "";

    $.ajax({method: 'GET', async: false, url: url, success: function(data) {
        contents = data;
    }});

    return contents;
}


function setEquation(gl, force) {
    force = force || false;

    try {
        var equation = $('select#equation').val();
        if (!equation) {
            equation = "z^3 + m";
        }
        if (equation !== current_equation || force) {
            setProgram(gl, equation);
            clearNewtonError();

            current_equation = equation;
        }
    } catch (error) {
        newtonError(error);
    }
}

function calculateCanvasWidth() {
    var $canvas = $("canvas#newton");
    var $canvasContainer = $("div#newton-container");

    var parentWidth = $canvasContainer.parent().width();
    var containerWidth = parentWidth;
    $canvasContainer.css('width', containerWidth);

    var width = containerWidth;

    width = Math.floor(width);

    $canvas.css('width', width);
    $canvas.parent().css('width', width);  /* set the inner container width as well */
}


function newtonError(error) {
    console.error(error);

    var $errorDiv = $("div#newton-error");

    if (typeof error.message !== "undefined") {
        error = error.message;
    }
    error = error.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

    error = error.replace(/i(nvalid syntax.*?)\n([\s\S]*)\n(Unexpected)/, 'I$1<pre>$2</pre>$3');

    error = error.replace(/\n/g, "<br>");

    $errorDiv.html(error).show();
}

function clearNewtonError() {
    var $errorDiv = $("div#newton-error");
    $errorDiv.hide();
}
function setViewportScale() {
    var $viewport = $("meta[name=viewport]");
    $viewport.attr("content", function(i, value) {return value + ', maximum-scale=1,viewport-fit=cover';});
}

function affixCanvas() {
    var $canvasContainer = $("div#newton-container");

    $canvasContainer.affix({
        offset: {
            top: $canvasContainer.offset().top
        }
    });

    $canvasContainer.on('affix.bs.affix', function () {
        // TODO do this on window resize
        $('#newton-margin').css('margin-top', $canvasContainer.outerHeight(true) + 'px');
    });

    $canvasContainer.on('affix-top.bs.affix', function () {
        $('#newton-margin').css('margin-top', '0');
    });

    $(window).resize(function() {
        calculateCanvasWidth();
        $canvasContainer.affix('checkPosition');
    });
}

function initCanvas() {
    try {
        calculateCanvasWidth();

        var gl = initWebGL();
        if (!gl) {
            throw "Could not initialize WebGL";
        }

        setViewportScale();
        initControls(gl);
        initSelectize(gl);
        affixCanvas();

        $("canvas#newton").show();
        $("div.container").addClass("webgl-works");

    } catch (error) {
        newtonError(error);
        $("div.container").addClass("webgl-error");
    }
}

$(initCanvas);
