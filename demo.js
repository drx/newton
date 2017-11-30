var lastTransition = null;
var transitionTime = 5000;  // 5 seconds
var demoPaused = false;
var demoEnabled = true;
var demoEquations = null;
var currentDemoIndex = 0;

function stopDemo() {
    demoEnabled = false;

    var $progressBarBg = $("div.transition-progress-bg");
    $progressBarBg.hide();
}

function pauseDemo() {
    demoPaused = true;

    var $progressBar = $("div.transition-progress");
    $progressBar.css("width", "0");
}

function unpauseDemo() {
    lastTransition = null;
    demoPaused = false;
}

function initDemoEquations() {
    demoEquations = equations;

    for (var i=0; i<demoEquations.length; i++) {
        if (typeof demoEquations[i].demoOrder === "undefined") {
            demoEquations[i].demoOrder = 1000+i;
        }
        if (typeof demoEquations[i].demoSkip === "undefined") {
            demoEquations[i].demoSkip = false;
        }
    }

    demoEquations.sort(function(a, b) {return a.demoOrder - b.demoOrder;});
    demoEquations = demoEquations.filter(function(eq) {return !eq.demoSkip;});
}

function updateDemo(gl) {
    if (!demoEnabled || demoPaused) {
        return;
    }

    var curTime = (performance || Date).now();

    if (demoEquations === null) {
        initDemoEquations();
    }

    if (lastTransition === null) {
        lastTransition = curTime;

        return;
    }

    var $progressBar = $("div.transition-progress");

    var progress = (curTime - lastTransition)/transitionTime*100;
    progress = Math.min(Math.max(progress, 0), 100);

    if (progress >= 100) {
        lastTransition = curTime;
        progress = 0;

        currentDemoIndex += 1;
        if (currentDemoIndex >= demoEquations.length) {
            currentDemoIndex = 0;
        }
        console.log(currentDemoIndex, demoEquations.length)
        var equation = demoEquations[currentDemoIndex].value;

        var selectize = $('select#equation')[0].selectize;

        selectize.setValueSilent(equation);
    }

    $progressBar.css("width", progress+"%");

}
