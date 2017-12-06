var optgroups = [
    {value: "user", label: "Your functions"},
    {value: "polynomials", label: "Polynomials"},
    {value: "demos", label: "Demos"},
    {value: "trigonometric", label: "Trigonometric functions"},
    {value: "logarithmic", label: "Logarithmic functions"},
    {value: "exponential", label: "Exponential functions"},
    {value: "sqrt", label: "Functions with square roots"},
    {value: "laurent", label: "Laurent polynomials"},
    {value: "other", label: "Other"},
    {value: "article", label: "From the article"}
];

var equations = [
    /* Polynomials */
    {
        value: "z^3 + m",
        text: "z<sup>3</sup> + m",
        optgroup: "polynomials",
        demoOrder: 0
    },
    /*{
        value: "z^(1/f) + 1",
        text: "l",
        optgroup: "polynomials",
        demoOrder: 0.1
    },*/
    {
        value: "z^5 - 3i*z^3 - (5+2i)*z^2 + 3*z - t - 5",
        text: "z<sup>5</sup> - 3iz<sup>3</sup> - (5+2i)z<sup>2</sup> + 3z - t - 5",
        optgroup: "polynomials",
        demoOrder: 3.5
    },
    {
        value: "z^6 + z*m + 0.01",
        text: "z<sup>6</sup> + z·m + 0.01",
        optgroup: "polynomials",
        demoOrder: 4.5
    },
    {
        value: "(z-1) * (z-2) * (z-3i) * (z-2i) * (z-m)",
        text: "(z-1) · (z-2) · (z-3i) · (z-2i) · (z-m)",
        optgroup: "polynomials",
        idleFunction: "cos(t)*2 - sin(2*t)*0.5i",
        demoOrder: 6.5
    },
    {
        value: "z^m - z + m + 1",
        text: "z<sup>m</sup> - z + m + 1",
        optgroup: "polynomials",
        idleFunction: "3*t - 5",
        demoOrder: 51
    },
    {
        value: "z^3 * (1-z^3) + m",
        text: "z<sup>3</sup> · (1-z<sup>3</sup>) + m",
        optgroup: "polynomials",
        demoOrder: 8.5
    },

    /* Trigonometric */
    {
        value: "sin(z) + t + 0.2",
        text: "sin(z) + t + 0.2",
        optgroup: "trigonometric",
        demoOrder: 10.5
    },
    {
        value: "sin(z) + sin(t)*6i",
        text: "sin(z) + sin(t)·6i",
        optgroup: "trigonometric",
        demoOrder: 12.5
    },
    {
        value: "sin(z+t) / (z^3-z+m)",
        text: "sin(z+t) / (z<sup>3</sup>-z+m)",
        optgroup: "trigonometric"
    },
    {
        value: "sec(z) + csc(z) + z^2 + m",
        text: "sec(z) + csc(z) + z<sup>2</sup> + m",
        optgroup: "trigonometric",
        demoOrder: 1999
    },
    {
        value: "acsc(z)^3 + sin(z) + acos(z) + m + z^0.3",
        text: "acsc(z)<sup>3</sup> + sin(z) + acos(z) + m + z<sup>0.3</sup>",
        optgroup: "trigonometric",
        demoSkip: true
    },
    {
        value: "sinh(z)/(cosh(z)-cos(z)) + m",
        text: "sinh(z)/(cosh(z)-cos(z)) + m",
        optgroup: "trigonometric"
    },
    {
        value: "asin(1-sin(z)^2) + m",
        text: "asin(1-sin(z)<sup>2</sup>) + m",
        optgroup: "trigonometric"
    },
    {
        value: "z^2 * acos(z^2) + m",
        text: "z<sup>2</sup> · acos(z<sup>2</sup>) + m",
        optgroup: "trigonometric"
    },
    {
        value: "z * atan(z^3) + (0.24+0.36i)*(t+2)",   // great for demo
        text: "z · atan(z<sup>3</sup>) + (0.24+0.36i)·(t+2)",
        optgroup: "trigonometric",
        demoOrder: 5
    },
    {
        value: "0.2*z^3 * acot(0.2*z^3) - (0.018 + 0.063i)*t",
        text: "0.2z<sup>3</sup> · acot(0.2z<sup>3</sup>) - (0.018 + 0.063i)·t",
        optgroup: "trigonometric",
        demoSkip: true
    },
    {
        value: "z * asec(z^2) + 0.5*m",
        text: "z · asec(z<sup>2</sup>) + 0.5*m",
        optgroup: "trigonometric"
    },
    {
        value: "z^3 * asec(z^3) + m",
        text: "z<sup>3</sup> · asec(z<sup>3</sup>) + m",
        optgroup: "trigonometric",
        demoOrder: 2000
    },
    {
        value: "z * cosh(1/z) + 0.25*m",
        text: "z · cosh(1/z) + 0.25*m",
        optgroup: "trigonometric"
    },
    {
        value: "z - z^3/6 + z^5/120 - z^7/5040 + z^9/362880 + z^11/39916800",  // skip
        text: "z - z<sup>3</sup>/3! + z<sup>5</sup>/5! - z<sup>7</sup>/7! + z<sup>9</sup>/9! + z<sup>11</sup>/11!",
        optgroup: "trigonometric",
        demoSkip: true
    },
    {
        value: "tan(z) - z - z^3/3 + m",
        text: "tan(z) - z - z<sup>3</sup>/3 + m",
        optgroup: "trigonometric",
        demoOrder: 2001
    },
    {
        value: "sin(z^2) + sin(z) + m",
        text: "sin(z<sup>2</sup>) + sin(z) + m",
        optgroup: "trigonometric",
        demoOrder: 2002
    },
    {
        value: "cos(cot(z)) + m",
        text: "cos(cot(z)) + m",
        optgroup: "trigonometric",
        demoSkip: true
    },
    {
        value: "sin(sqrt(z)) + 0.5*t - 1 + 0.001i",
        text: "sin(<span class='sqrt-symbol'>√</span><span class='sqrt'>z</span>) + 0.5t - 1 + 0.001i",
        optgroup: "trigonometric",
        demoOrder: 3
    },
    {
        value: "z * asin(tanh(z)) + 0.2*m",
        text: "z · asin(tanh(z)) + 0.2m",
        optgroup: "trigonometric",
        demoOrder: 2003
    },
    {
        value: "2*z * ln(tan(2*z) + sec(2*z)) + m", // skip
        text: "2z · ln(tan(2z) + sec(2z)) + m",
        optgroup: "trigonometric",
        idleFunction: "3 - t - 0.10i",
        demoOrder: 2004
    },
    {
        value: "sin(0.1*z) / (0.1*z)^2 + m",
        text: "sin(0.1z) / (0.1z)<sup>2</sup> + m",
        optgroup: "trigonometric"
    },
    {
        value: "z * asec(z) + m",  // very nice fractal
        text: "z · asec(z) + m",
        optgroup: "trigonometric",
        idleFunction: "1 - 0.15*t",
        demoOrder: 6
    },
    {
        value: "z * atan(z) + m",  // some nice fractals here
        text: "z · atan(z) + m",
        optgroup: "trigonometric",
        idleFunction: "0.3*t*(1-i)",
        demoOrder: 7
    },
    {
        value: "z * asin(1-z) + m",  // weird tree things
        text: "z · asin(1-z) + m",
        optgroup: "trigonometric",
        idleFunction: "0.88 - 1.27i + 0.12*t",
        demoOrder: 8
    },
    {
        value: "z + acos(sqrt(z)) + m - 1",  // nice ribbons again
        text: "z + acos(<span class='sqrt-symbol'>√</span><span class='sqrt'>z</span>) + m - 1",
        optgroup: "trigonometric",
        demoSkip: true
    },
    {
        value: "cos(0.5*z)^0.7i + 1.4*cis(t)",  // nice demo
        text: "cos(0.5z)<sup>0.7i</sup> + 1.4·cis(t)",
        optgroup: "trigonometric"
    },
    {
        value: "cos(z)^(0.1i*(t+1)) + 1",  // nice demo
        text: "cos(z)<sup>0.1i·m</sup> + 1",
        optgroup: "trigonometric",
        idleFuntion: "t + 1",
        demoOrder: 9
    },
    {
        value: "z * atan(z) - ln(z^2+1)/2 + 1.41 + 0.1i*t + 1i", // demo for skip?
        text: "z · atan(z) - ln(z<sup>2</sup>+1)/2 + 1.41 + 0.1i·t + 1i",
        optgroup: "trigonometric",
        demoOrder: 10
    },
    {
        value: "z * acot(z) + ln(z^2+1)/2 - 0.3 + 0.22i*t", // demo
        text: "z · acot(z) + ln(1+z<sup>2</sup>)/2 - 0.3 + 0.22i·t",
        optgroup: "trigonometric"
    },
    {
        value: "asec(z)^3 + sin(t) + 1", //skip
        text: "asec(z)<sup>3</sup> + sin(t) + 1",
        optgroup: "trigonometric"
    },

    /* Logarithmic functions */
    {
        value: "ln(cos(z)) + m",
        text: "ln(cos(z)) + m",
        optgroup: "logarithmic"
    },
    {
        value: "z^3 + ln(z) + 1 + 2*m",
        text: "z<sup>3</sup> + ln(z) + 1 + 2*m",
        optgroup: "logarithmic"
    },
    {
        value: "z^2 * ln((z+1)/(z-1)) + m",  // nice for a demo
        text: "z<sup>2</sup> · ln((1+z)/(z-1)) + m",
        optgroup: "logarithmic",
        idleFunction: "t - 2.5",
        demoOrder: 11
    },
    {
        value: "ln(z^2+1)^5 + m",
        text: "ln(z^2+1)<sup>5</sup> + m",
        optgroup: "logarithmic"
    },
    {
        value: "z * ln(ln(z)) + m",  // some trees
        text: "z · ln(ln(z)) + m",
        optgroup: "logarithmic",
        idleFunction: "1 - 0.4*t"
    },
    {
        value: "z + 1/(1-z) - (-2*z - z^2 - 2*ln(z))/z^3 + m",  //skip
        text: "z + 1/(1-z) - (-2z - z<sup>2</sup> - 2ln(z))/z<sup>3</sup> + m",
        optgroup: "logarithmic",
        demoSkip: true
    },
    {
        value: "ln(z^7) + z^2 + m^2",
        text: "ln(z<sup>7</sup>) + z<sup>2</sup> + m<sup>2</sup>",
        optgroup: "logarithmic",
        idleFunction: "0.8*t",
        demoOrder: 4
    },
    {
        value: "ln(cosh(z)) + m",
        text: "ln(cosh(z)) + m",
        optgroup: "logarithmic"
    },
    {
        value: "z + z * ln(tanh(z)) + m",  // skip
        text: "z + z · ln(tanh(z)) + m",
        optgroup: "logarithmic",
        demoSkip: true
    },
    {
        value: "0.5*z * (sin(ln(z)) + cos(ln(z))) + m - 2", //skip
        text: "0.5z · (sin(ln(z)) + cos(ln(z))) + m - 2",
        optgroup: "logarithmic",
        demoSkip: true
    },


    /* Exponential functions */
    {
        value: "exp(1/(0.5*z)) + m",
        text: "e<sup>1/(0.5z)</sup> + m",
        optgroup: "exponential",
        demoOrder: 12
    },
    {
        value: "exp(cos(z)) + m",
        text: "e<sup>cos(z)</sup> + m",
        optgroup: "exponential",
        demoOrder: 13
    },
    {
        value: "exp(tan(z)+ln(z)) + m",
        text: "e<sup>tan(z)+ln(z)</sup> + m",
        optgroup: "exponential",
        demoOrder: 2005
    },
    {
        value: "z^3 * exp(tan(z)) + m",
        text: "z<sup>3</sup> · e<sup>tan(z)</sup> + m",
        optgroup: "exponential"
    },
    {
        value: "exp(cosh(2*z) * z^(-2)) + m",
        text: "e<sup>cosh(2z) · z<sup>-2</sup></sup> + m",
        optgroup: "exponential"
    },
    {
        value: "exp(z^(-2)) * cosh(2*z) + m",
        text: "e<sup>z<sup>-2</sup></sup> · cosh(2z) + m",
        optgroup: "exponential"
    },
    {
        value: "exp(0-exp(0-z^2)) + m",
        text: "e<sup>-e<sup>-z<sup>2</sup></sup></sup> + m",
        optgroup: "exponential"
    },
    {
        value: "exp(z)/z^z + m",
        text: "e<sup>z</sup>/z<sup>z</sup> + m",
        optgroup: "exponential",
        demoSkip: true
    },
    {
        value: "z^(0.5i*z) + m",
        text: "z<sup>0.5i·z</sup> + m",
        optgroup: "exponential"
    },
    {
        value: "z^(1-z) + m", // there was a similar one
        text: "z<sup>1-z</sup> + m",
        optgroup: "exponential"
    },
    {
        value: "z + (z/(1-z))^z + m",  // skipped
        text: "z + (z/(1-z))<sup>z</sup> + m",
        optgroup: "exponential",
        demoSkip: true
    },
    {
        value: "z * exp(2*atan((2*z-1)/m)/m)",  // fractal
        text: "z · e<sup>2·atan(((2z-1)/m))/m)</sup>",
        optgroup: "exponential",
        idleFunction: "0.9 + 1.1i + 0.1*t"
    },

    /* Functions with square roots */
    {
        value: "sqrt(z*(1-z)) - sin(t*0.13+0.75)*i - 0.0014*t - 0.0085",
        text: "<span class='sqrt-symbol'>√</span><span class='sqrt'>z·(1-z)</span> - sin(t·0.11+0.75)·i - 0.0014·t - 0.0085",
        optgroup: "sqrt",
        demoOrder: 1
    },
    {
        value: "sqrt(z*(1-z)) - sin(t*0.1)*i - 0.001*t - 0.001",
        text: "<span class='sqrt-symbol'>√</span><span class='sqrt'>z·(1-z)</span> - sin(t·0.1)·i - 0.001·t - 0.001",
        optgroup: "sqrt",
        demoSkip: true
    },
    {
        value: "(sqrt(z)-1) * (sqrt(z-m))",  // mandelbrot?
        text: "(<span class='sqrt-symbol'>√</span><span class='sqrt'>z</span> - 1) · <span class='sqrt-symbol'>√</span><span class='sqrt'>z-m </span>",
        optgroup: "sqrt"
    },
    {
        value: "z * ln(1/z + sqrt((1/z)^2-1)) - 0.02 - 0.1i*t - 0.4i", // skip
        text: "z · ln(1/z + <span class='sqrt-symbol'>√</span><span class='sqrt'>(1/z)<sup>2</sup>-1</span>) - 0.02 - 0.1i·t - 0.4i",
        optgroup: "sqrt",
        demoOrder: 50
    },
    {
        value: "z^2 * ln(1/z + sqrt((1/z)^2-1)) + m - 4",  // skip
        text: "z<sup>2</sup> · ln(1/z + <span class='sqrt-symbol'>√</span><span class='sqrt'>(1/z)<sup>2</sup>-1</span>) + m - 4",
        optgroup: "sqrt"
    },
    {
        value: "sqrt(1+z^2)^4 + m",
        text: "(<span class='sqrt-symbol'>√</span><span class='sqrt'>1+z<sup>2</sup></span>)<sup>4</sup> + m",
        optgroup: "sqrt"
    },
    {
        value: "sqrt(1+z^4) - 0.3*t + 0.01i", // demo
        text: "<span class='sqrt-symbol'>√</span><span class='sqrt'>1+z<sup>4</sup></span> - 0.3t + 0.01i",
        optgroup: "sqrt",
        demoOrder: 14
    },
    {
        value: "sqrt(z*(1-z)) + m",
        text: "<span class='sqrt-symbol'>√</span><span class='sqrt'>z·(1-z)</span> + m",
        optgroup: "sqrt",
        demoSkip: true
    },

    /* Laurent polynomials */
    {
        value: "z^2 + z^-2 + t",
        text: "z<sup>2</sup> + z<sup>-2</sup> + t",
        optgroup: "laurent",
        demoOrder: 15
    },
    {
        value: "z^2 + z^(-7) + 4*m",
        text: "z<sup>2</sup> + z<sup>-7</sup> + 4m",
        optgroup: "laurent",
        demoOrder: 2,
        idleFunction: "0.5*t*cis(t)"
    },
    {
        value: "z^3 * (1+z)^(-2) + m",
        text: "z<sup>3</sup> · (1+z)<sup>-2</sup> + m",
        optgroup: "laurent"
    },
    {
        value: "z^(m-4) + (1-z)^(7-m)",
        text: "z<sup>m-4</sup> + (1-z)<sup>7-m</sup>",
        optgroup: "laurent"
    },

    /* From the article */
    {
        value: "z^3 + 1",
        text: "z<sup>3</sup> + 1",
        optgroup: "article",
        demoSkip: true
    },
    {
        value: "(z-1) * (z-2) * (z-3)",
        text: "(z-1) · (z-2) · (z-3)",
        optgroup: "article",
        demoSkip: true
    },
    {
        value: "z^4 + 3*z^2 + 2i*z - t - 1",
        text: "z<sup>4</sup> + 3·z<sup>2</sup> + 2i·z - t - 1",
        optgroup: "article"
    },
    {
        value: "z^6 + 3*t*z^4 - 10",
        text: "z<sup>6</sup> + 3·t·z<sup>4</sup> - 10",
        optgroup: "article",
        demoSkip: true
    },
    {
        value: "sec(z) + cis(t)",
        text: "sec(z) + cis(t)",
        optgroup: "article",
        demoOrder: 16
    },
    {
        value: "cos(z) + m",
        text: "cos(z) + m",
        optgroup: "article",
        demoSkip: true
    },
    {
        value: "z^(2*m) + 1",
        text: "z<sup>2m</sup> + 1",
        optgroup: "article"
    },
    {
        value: "(z-1) * (z+2i) * (z-m)",
        text: "(z-1) · (z+2i) · (z-m)",
        optgroup: "article",
        demoSkip: true
    },
    {
        value: "(z-1) * (z+2i) * (z-m)^(1+f)",
        text: "(z-1) · (z+2i) · (z-m)<sup>1+f</sup>",
        optgroup: "article",
        demoSkip: true
    },

];
