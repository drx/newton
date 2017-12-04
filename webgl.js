function compileShader(gl, source, type) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, source);

    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        var error = gl.getShaderInfoLog(shader);
        gl.deleteShader(shader);
        throw "Shader compile error\n" + error;
    }

    return shader;
}

function setProgram(gl, equation) {
    var prevProgram = gl.getParameter(gl.CURRENT_PROGRAM);

    var vertexShaderSource = getFile("/static/newton/src/vertex.glsl");
    var vertexShader = compileShader(gl, vertexShaderSource, gl.VERTEX_SHADER);

    var glsl = generateGlsl(equation, settings.idleFunction);

    var fragmentShaderSource = getFile("/static/newton/src/fragment.glsl");
    fragmentShaderSource = fragmentShaderSource.replace(/%%method%%/g, settings.method.toUpperCase());
    fragmentShaderSource = fragmentShaderSource.replace(/%%idle_function%%/g, glsl.idle);

    fragmentShaderSource = fragmentShaderSource.replace(/%%f%%/g, glsl.f);
    fragmentShaderSource = fragmentShaderSource.replace(/%%df%%/g, glsl.df);

    if (settings.method !== "newton") {
        fragmentShaderSource = fragmentShaderSource.replace(/%%ddf%%/g, glsl.ddf);
    }

    /* replace here */
    var fragmentShader = compileShader(gl, fragmentShaderSource, gl.FRAGMENT_SHADER);

    var program = gl.createProgram();

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        var error = gl.getProgramInfoLog(program);
        gl.deleteProgram(program);
        throw "Program link error\n" + error;
    }

    resetTime();
    resetMouse();
    settings.zoomFactor = 4.0;

    gl.useProgram(program);

    if (prevProgram) {
        gl.deleteProgram(prevProgram);
    }

    return program;
}

function setGeometry(gl) {
    var buffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([
            -1.0, -1.0,
            1.0, -1.0,
            -1.0, 1.0,
            -1.0, 1.0,
            1.0, -1.0,
            1.0, 1.0]),
        gl.STATIC_DRAW
    );

    var program = gl.getParameter(gl.CURRENT_PROGRAM);
    var positionLocation = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
}

function initWebGL() {
    var canvas = document.getElementById("newton");
    var gl = canvas.getContext("webgl", {preserveDrawingBuffer: true});
    if (!gl) {
        gl = canvas.getContext("experimental-webgl", {preserveDrawingBuffer: true});
    }

    resizeCanvas(gl);
    setEquation(gl);
    requestRender(gl);

    return gl;
}

function requestRender(gl) {
    var render_callback = function (now) {
        render(gl, now);

        setTimeout(function () {
            window.requestAnimationFrame(render_callback);
        }, 2);
    };
    window.requestAnimationFrame(render_callback);
}

function resizeCanvas(gl) {
    var devicePixelRatio = window.devicePixelRatio || 1;

    var width = gl.canvas.clientWidth * devicePixelRatio;
    var height = gl.canvas.clientHeight * devicePixelRatio;

    if (width !== gl.canvas.width || height !== gl.canvas.height) {
        gl.canvas.width = width;
        gl.canvas.height = height;

        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    }
}

function setUniform(gl, program, type, name, value) {
    var location = gl.getUniformLocation(program, name);

    if (type === "1f") {
        gl.uniform1f(location, value);
    }
    else if (type === "2f") {
        gl.uniform2f(location, value[0], value[1]);
    }
    else if (type === "1i") {
        gl.uniform1i(location, value);
    }
}
function setUniforms(gl) {
    var t = getTime();

    var program = gl.getParameter(gl.CURRENT_PROGRAM);

    setUniform(gl, program, "1f", "width", gl.canvas.width);
    setUniform(gl, program, "1f", "height", gl.canvas.height);
    setUniform(gl, program, "1f", "zoom_factor", settings.zoomFactor);
    setUniform(gl, program, "1i", "mouse_idle", (mouseIdle) ? 1 : 0);
    setUniform(gl, program, "2f", "t", [t, 0.0]);
    setUniform(gl, program, "2f", "mouse", [mouseX * settings.zoomFactor, mouseY * settings.zoomFactor]);
    setUniform(gl, program, "2f", "f", [touchForce, 0.0]);

}
function render(gl) {
    gl.clearColor(1.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    resizeCanvas(gl);
    setGeometry(gl);
    setUniforms(gl);

    gl.drawArrays(gl.TRIANGLES, 0, 6);
    gl.finish();

    updateFPS();
    updateDemo(gl);
}
