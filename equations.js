var optgroups = [
    {value: "user", label: "Your functions"},
    {value: "polynomials", label: "Polynomials"},
    {value: "trigonometric", label: "Trigonometric functions"},
    {value: "demos", label: "Demos"},
    {value: "article", label: "From the article"},
    {value: "other", label: "Other"}
];

var equations = [
    /* Polynomials */
    {
        value: "z^3 + m",
        text: "z<sup>3</sup> + m",
        optgroup: "polynomials",
        demoOrder: 0
    },
    {
        value: "z^5 - 3i*z^3 - (5+2i)*z^2 + 3*z - 10+t",
        text: "z<sup>5</sup> - 3iz<sup>3</sup> - (5+2i)z<sup>2</sup> + 3z - 10 + t",
        optgroup: "polynomials"
    },
    {
        value: "35*z^9 - 180*z^7 + 378*z^5 - 420*z^3 + 315*z",
        text: "35z<sup>9</sup> - 180z<sup>7</sup> + 378z<sup>5</sup> - 420z<sup>3</sup> + 315z",
        optgroup: "polynomials"
    },
    {
        value: "(z-1) * (z-2) * (z-3i) * (z-2i) * (z-m)",
        text: "(z-1) · (z-2) · (z-3i) · (z-2i) · (z-m)",
        optgroup: "polynomials"
    },
    {
        value: "z^(m+sin(t)*sin(t)*0.9) - z + m + 1",
        text: "z<sup>m+sin(t)·sin(t)·0.9</sup> - z + m + 1",
        optgroup: "polynomials"
    },

    /* Trigonometric */
    {
        value: "sin(z) + t",
        text: "sin(z) + t",
        optgroup: "trigonometric"
    },
    {
        value: "sin(z) + sin(t)*6i",
        text: "sin(z) + sin(t)·6i",
        optgroup: "trigonometric"
    },
    {
        value: "sin(z+t) / (z^3-z+m)",
        text: "sin(z+t) / (z<sup>3</sup>-z+m)",
        optgroup: "trigonometric"
    },
    {
        value: "sec(z) + csc(z) + z^2 + m",
        text: "sec(z) + csc(z) + z<sup>2</sup> + m",
        optgroup: "trigonometric"
    },
    {
        value: "acsc(z)^3 + sin(z) + acos(z) + m + z^0.3",
        text: "acsc(z)<sup>3</sup> + sin(z) + acos(z) + m + z<sup>0.3</sup>",
        optgroup: "trigonometric",
        demoSkip: true
    },

    /* Demos */
    {
        value: "sqrt(z*(1-z)) - sin(t*0.13+0.75)*i - 0.0014*t - 0.0085",
        text: "<span class='sqrt-symbol'>√</span><span class='sqrt'>z·(1-z)</span> - sin(t·0.11+0.75)·i - 0.0014·t - 0.0085",
        optgroup: "demos",
        demoOrder: 1
    },

    /* From the article */
    {
        value: "z^3 + 1",
        text: "z<sup>3</sup> + 1",
        optgroup: "article",
        demoSkip: true
    },

    /* Other */
    {
        value: "ln(z^7) + z^2 + m^3",
        text: "ln(z<sup>7</sup>) + z<sup>2</sup> + m<sup>3</sup>",
        optgroup: "other"
    },
    {
        value: "z^2 + 1i/z + m",
        text: "z<sup>2</sup> + 1i/z + m",
        optgroup: "other"
    },
    {
        value: "sqrt(z*(1-z)) + m",
        text: "<span class='sqrt-symbol'>√</span><span class='sqrt'>z·(1-z)</span> + m",
        optgroup: "other",
        demoSkip: true
    },
    {
        value: "z^2 + z^(-7) + 4*m",
        text: "z<sup>2</sup> + z<sup>-7</sup> + 4m",
        optgroup: "other",
        demoOrder: 2
    }

];
