function derivative(expr)
{
    var expr_type = expr[0];
    var f = expr[1];
    var g = expr[2];
    var d = derivative;

    var zero = ['real', ['int', 0]];
    var one = ['real', ['int', 1]];
    var two = ['real', ['int', 2]];

    //console.log(expr);

    switch (expr_type) {
        case "main": return ['main', d(f)];
        case "add": return ['add', d(f), d(g)];
        case "sub": return ['sub', d(f), d(g)];
        case "mul": return ['add',
            ['mul', f, d(g)],
            ['mul', d(f), g]
        ];
        case "div": return ['div',
            ['sub',
                ['mul', d(f), g],
                ['mul', f, d(g)]
            ],
            ['mul', g, g]
        ];

        case "pow":
            if (g[0] === 'real') {
                return ['mul',
                    ['mul', d(f), g],
                    ['pow',
                        f,
                        ['sub', g, one]
                    ]
                ];
            }
            else {
                /* (f^g)' = f^g * (f'g/f + g'ln(f)) */
                return ['mul',
                    ['pow', f, g],
                    ['add',
                        ['div', ['mul', d(f), g], f],
                        ['mul', d(g), ['ln', f]]
                    ]
                ];
            }
        case "real":
        case "imag":
            return zero;

        case "ident":
            if (f === "z") return one;
            else return zero;

        case "sin":
            return ['mul', ['cos', f], d(f)];

        case "cos":
            return ['mul',
                ['sub', zero, ['sin', f]],
                d(f)
            ];

        case "tan":
            return ['mul',
                ['add', one, ['pow', ['tan', f], two]],
                d(f)
            ];

        case "cot":
            return ['mul',
                ['sub', zero, ['add', one, ['pow', ['cot', f], two]]],
                d(f)
            ];

        case "sec":
            /* sec(f)' = (1/cos(f))' */
            return d(['div', one, ['cos', f]]);

        case "csc":
            /* csc(f)' = (1/sin(f))' */
            return d(['div', one, ['sin', f]]);

        case "cis":
            return ['mul', ['mul', ['imag', ['int', 1]], ['cis', f]], d(f)];

        case "sinh":
            return ['mul', ['cosh', f], d(f)];

        case "cosh":
            return ['mul', ['sinh', f], d(f)];

        case "tanh":
            return ['mul',
                ['sub', one, ['pow', ['tanh', f], two]],
                d(f)
            ];

        case "asin":
            /* asin(f)' = f' / sqrt(1 - f^2) */
            return ['div', d(f), ['sqrt', ['sub', one, ['pow', f, two]]]];

        case "acos":
            /* acos(f)' = -asin(f)' */
            return ['sub', zero, d(['asin', f])];

        case "atan":
            /* atan(f)' = f' / (1 + f^2) */
            return ['div', d(f), ['add', one, ['pow', f, two]]];

        case "acot":
            /* acot(f)' = -f' / (1 + f^2) */
            return ['div', ['sub', zero, d(f)], ['add', one, ['pow', f, two]]];

        case "asec":
            /* asec(f)' = arccos(1/f)'  */
            return d(['acos', ['div', one, f]]);

        case "acsc":
            /* acsc(f)' = arcsin(1/f)'  */
            return d(['asin', ['div', one, f]]);

        case "sqrt":
            return ['div', d(f), ['mul', two, ['sqrt', f]]];

        case "ln":
            return ['div', d(f), f];

        case "exp":
            return ['mul', d(f), expr];

        case "parens":
            return ['parens', d(f)];

        default:
            throw "Could not find derivative";

    }
}

function expr_is_const(expr) {
    var expr_type = expr[0];
    return (expr_type === "real" || expr_type === "imag");
}

function expr_is_zero(expr) {
    if (expr_is_const(expr))
    {
        var const_type = expr[1][0];
        var const_value = expr[1][1];
        if (const_type === "int" && const_value === 0) return true;
        if (const_type === "float" && const_value === 0.0) return true;
    }
    return false;
}

function expr_is_one(expr) {
    if (expr_is_const(expr))
    {
        var const_type = expr[1][0];
        var const_value = expr[1][1];
        if (const_type === "int" && const_value === 1) return true;
        if (const_type === "float" && const_value === 1.0) return true;
    }
    return false;
}

function simplify_const_op(expr_type, f, g)
{
    var f_type = f[0];
    var g_type = g[0];

    if (f_type === g_type)  // matching types (real or imag)
    {
        var f_ctype = f[1][0];
        var g_ctype = g[1][0];

        if (["int", "float"].indexOf(f_ctype) === -1 || ["int", "float"].indexOf(g_ctype) === -1) console.error("type mismatch");

        var r_ctype = "int";

        if (f_ctype === "float" || g_ctype === "float") r_ctype = "float";

        if (expr_type === "add")
            return [f_type, [r_ctype, f[1][1] + g[1][1]]];

        else if (expr_type === "sub")
            return [f_type, [r_ctype, f[1][1] - g[1][1]]];

        else if (expr_type === "mul")
            return [f_type, [r_ctype, f[1][1] * g[1][1]]];

        else if (expr_type === "div")
            return [f_type, ["float", f[1][1] / g[1][1]]];
    }

    return [expr_type, f, g];
}

function simplify_expr(expr) {
    //console.log("expr", expr)
    var expr_type = expr[0];

    if (expr_type === "real" || expr_type === "imag" || expr_type === "ident")
        return expr;

    var simplified_args = expr.slice(1).map(simplify_expr);

    var f = simplified_args[0];
    var g = simplified_args[1];

    var const_zero = ["real", ["int", 0]];
    var const_one = ["real", ["int", 1]];
    switch (expr_type) {
        case "add":
        case "sub":
            if (expr_is_zero(f) && expr_type === "add") return g;  // 0 + g = g  (but not 0 - g = g)
            else if (expr_is_zero(g)) return f;  // f + 0 = f

            break;

        case "mul":
            if (expr_is_zero(f)) return const_zero;  // 0 * g = 0
            else if (expr_is_zero(g)) return const_zero;  // f * 0 = 0

            if (expr_is_one(f)) return g;  // 1 * g = g
            else if (expr_is_one(g)) return f;  // f * 1 = f

            break;

        case "div":
            if (expr_is_zero(f)) return const_zero;  // 0 / g = 0
            else if (expr_is_one(g)) return f;  // f / 1 = f

            break;

        case "pow":
            if (expr_is_zero(g)) return const_one;  // f ^ 0 = 1

            if (expr_is_one(f)) return const_one;  // 1 ^ g = 1
            else if (expr_is_one(g)) return f;  // f ^ 1 = f

            break;

        case "parens":
            if (f.length === 2) return f;  // (f) = f
    }
    if (["add", "sub", "mul", "div"].indexOf(expr_type) !== -1) {
        if (expr_is_const(f) && expr_is_const(g)) {  // const(a) + const(b) = const(a+b)
            return simplify_const_op(expr_type, f, g);
        }
    }
    if (["add", "mul"].indexOf(expr_type) !== -1) {
        if (!expr_is_const(f) && expr_is_const(g)) {  // put constants first
            var temp = f;
            f = g;
            g = temp;
        }
        if (expr_is_const(f) && g[0] === expr_type && expr_is_const(g[1])) {  // const(a) + (const(b) + c) = const(a+b) + c
            var left = simplify_const_op(expr_type, f, g[1]);
            if (expr_is_const(left))
                return [expr_type, left, g[2]];
        }

        if (expr_is_const(g) && f[0] === expr_type && expr_is_const(f[2])) {  // (a + const(b)) + const(c) = a + const(b+c)
            var right = simplify_const_op(expr_type, g, f[2]);
            if (expr_is_const(right))
                return [expr_type, f[1], right];
        }

        return [expr_type, f, g];
    }

    return [expr[0]].concat(simplified_args);
}

function convert_expr(ast, conv_type) {
    var type_map = {
        "parens": ["(%a)", "(%a)", 0],
        "pow": ["c_pow(%a, %b)", "%a%b", 2],
        "div": ["c_div(%a, %b)", "%a/%b", 3],
        "mul": ["c_mul(%a, %b)", "%a·%b", 4],
        "sub": ["(%a)-(%b)", "%a-%b", 5],
        "add": ["(%a)+(%b)", "%a+%b", 6],

        "sin": ["c_sin(%a)", "sin(%a)", 1],
        "cos": ["c_cos(%a)", "cos(%a)", 1],
        "tan": ["c_tan(%a)", "tan(%a)", 1],
        "cot": ["c_cot(%a)", "cot(%a)", 1],
        "sec": ["c_sec(%a)", "sec(%a)", 1],
        "csc": ["c_csc(%a)", "csc(%a)", 1],
        "cis": ["c_cis(%a)", "cis(%a)", 1],
        "sinh": ["c_sinh(%a)", "sinh(%a)", 1],
        "cosh": ["c_cosh(%a)", "cosh(%a)", 1],
        "tanh": ["c_tanh(%a)", "tanh(%a)", 1],
        "asin": ["c_asin(%a)", "asin(%a)", 1],
        "acos": ["c_acos(%a)", "acos(%a)", 1],
        "atan": ["c_atan(%a)", "atan(%a)", 1],
        "acot": ["c_acot(%a)", "acot(%a)", 1],
        "asec": ["c_asec(%a)", "asec(%a)", 1],
        "acsc": ["c_acsc(%a)", "acsc(%a)", 1],
        "sqrt": ["c_sqrt(%a)", "sqrt(%a)", 1],
        "ln": ["c_log(%a)", "ln(%a)", 1],
        "exp": ["c_exp(%a)", "exp(%a)", 1],

        "pi": ["pi", "pi", 1],
        "e": ["e", "e", 1],
        "int": ["%a.0", "%a", 1],
        "float": ["%a", "%a", 1],
        "real": ["complex(%a, 0.0)", "%a", 1],
        "imag": ["complex(0.0, %a)", "%ai", 1]
    };
    var expr_type = ast[0];
    var conv_type_i = ['glsl', 'symbolic'].indexOf(conv_type);
    var expr;

    if (typeof type_map[expr_type] !== 'undefined') {
        expr = type_map[expr_type][conv_type_i];
        //console.log(type_map[expr_type], conv_type_i, conv_type);

        for (var i=0; i<2; i++) {
            if (i >= ast.length-1) break;

            var variable = ["%a", "%b"][i];
            var sub_expr = convert_expr(ast[i+1], conv_type);

            if (conv_type === "symbolic" && typeof type_map[ast[i+1][0]] !== 'undefined') {
                var expr_order = type_map[expr_type][2];
                var sub_expr_order = type_map[ast[i + 1][0]][2];

                if (sub_expr_order > expr_order) {
                    /* Add parentheses around subexpressions, but don't add two (or more) pairs */
                    if (sub_expr[0] !== '(' && sub_expr.substr(-1) !== ')' && expr.indexOf('('+variable+')') === -1) {
                        sub_expr = '(' + sub_expr + ')';
                    }
                }
            }

            if (conv_type === "symbolic" && expr_type === "pow" && i === 1) {
                if (sub_expr.indexOf("<sup>") === -1) {
                    sub_expr = '<sup>' + sub_expr + '</sup>';
                }
                else {
                    sub_expr = '^' + sub_expr;
                }
            }

            if (conv_type === "symbolic" && expr_type === "sqrt")
            {
                if (sub_expr.indexOf("class='sqrt'") === -1) {
                    expr = "<span class='sqrt-symbol'>√</span><span class='sqrt'>%a</span>";
                }
            }


            expr = expr.replace(variable, sub_expr);
        }

        return expr;
    }

    else if (expr_type === "main") {
        expr = convert_expr(ast[1], conv_type);

        if (conv_type === "symbolic") {
            expr = expr.replace(/([0-9])·([a-z√])/g, '$1$2');  // 3·z -> 3z
        }

        return expr;
    }

    else if (expr_type === "ident") {
        return ast[1];
    }
    else return ast;
}

function parse(equation)
{
    var parser = new nearley.Parser(grammar.ParserRules, grammar.ParserStart);

    parser.feed(equation);

    if (parser.results.length === 0) {
        throw "Incomplete equation\n" + equation;
    }
    return parser.results[0];
}

function generateGlsl(equation) {
    var f_eq = equation;
    var f_ast = parse(f_eq);
    console.log("f_ast", f_ast);
    var f_glsl = convert_expr(f_ast, "glsl");
    console.log("f_glsl", f_glsl);

    var df_ast = derivative(f_ast);
    //console.log("df_ast", df_ast);
    df_ast = simplify_expr(df_ast);
    console.log("df_ast", df_ast);

    var df_glsl = convert_expr(df_ast, "glsl");
    var df_symbolic = convert_expr(df_ast, "symbolic");

    console.log("df_glsl", df_glsl);
    console.log("df_symbolic", df_symbolic);

    var ddf_glsl = null, ddf_symbolic = null;
    if (settings.method !== "newton") {
        var ddf_ast = derivative(df_ast);
        ddf_ast = simplify_expr(ddf_ast);
        ddf_glsl = convert_expr(ddf_ast, "glsl");
        ddf_symbolic = convert_expr(ddf_ast, "symbolic");

        console.log("ddf_glsl", ddf_glsl);
        console.log("ddf_symbolic", ddf_symbolic);
    }

    updateDerivatives(df_symbolic, ddf_symbolic);

    return {f: f_glsl, df: df_glsl, ddf: ddf_glsl};
}