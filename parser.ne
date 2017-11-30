# From https://github.com/Hardmath123/nearley/
# blob/master/examples/calculator/arithmetic.ne

main -> _ AS _ {% function(d) {return ['main', d[1]]} %}

# PEMDAS!
# We define each level of precedence as a nonterminal.

# Parentheses
P -> "(" _ AS _ ")" {% function(d) {return ['parens', d[2]]} %}
    | N             {% id %}
    | ident         {% id %}

# Exponents
E -> P _ "^" _ E    {% function(d) {return ['pow', d[0], d[4]]} %}
    | P             {% id %}

# Multiplication and division
MD -> MD _ "*" _ E  {% function(d) {return ['mul', d[0], d[4]]} %}
    | MD _ "/" _ E  {% function(d) {return ['div', d[0], d[4]]} %}
    | E             {% id %}

# Addition and subtraction
AS -> AS _ "+" _ MD {% function(d) {return ['add', d[0], d[4]]} %}
    | AS _ "-" _ MD {% function(d) {return ['sub', d[0], d[4]]} %}
    | MD            {% id %}

# A number or a function of a number
N -> complex          {% id %}
    | "asin" _ P    {% function(d) {return ['asin', d[2]]} %}
    | "acos" _ P    {% function(d) {return ['acos', d[2]]} %}
    | "atan" _ P    {% function(d) {return ['atan', d[2]]} %}
    | "acot" _ P    {% function(d) {return ['acot', d[2]]} %}
    | "asec" _ P    {% function(d) {return ['asec', d[2]]} %}
    | "acsc" _ P    {% function(d) {return ['acsc', d[2]]} %}

    | "sinh" _ P     {% function(d) {return ['sinh', d[2]]} %}
    | "cosh" _ P     {% function(d) {return ['cosh', d[2]]} %}
    | "tanh" _ P     {% function(d) {return ['tanh', d[2]]} %}

    | "sin" _ P     {% function(d) {return ['sin', d[2]]} %}
    | "cos" _ P     {% function(d) {return ['cos', d[2]]} %}
    | "tan" _ P     {% function(d) {return ['tan', d[2]]} %}
    | "cot" _ P     {% function(d) {return ['cot', d[2]]} %}
    | "sec" _ P     {% function(d) {return ['sec', d[2]]} %}
    | "csc" _ P     {% function(d) {return ['csc', d[2]]} %}
    | "cis" _ P     {% function(d) {return ['cis', d[2]]} %}

    | "sqrt" _ P    {% function(d) {return ['sqrt', d[2]]} %}
    | "ln" _ P      {% function(d) {return ['ln', d[2]]}  %}
    | "exp" _ P      {% function(d) {return ['exp', d[2]]}  %}

#    | "pi"          {% function(d) {return ['real', ['float', Math.PI]]} %}
#    | "e"           {% function(d) {return ['real', ['float', Math.E]]} %}

complex -> float "i"  {% function(d) {return ['imag', d[0]]} %}
    | float           {% function(d) {return ['real', d[0]]} %}

float ->
      ("-"|"+"):? int "." int   {% function(d) {var sign = d[0] || ''; return ['float', parseFloat(sign + d[1][1] + d[2] + d[3][1])]} %}
    | ("-"|"+"):? int           {% function(d) {var sign = d[0] || ''; return ['int', parseInt(sign + d[1][1])]} %}

int -> [0-9]:+        {% function(d) {return ['int_str', d[0].join("")]} %}
ident -> [a-z]:+      {% function(d) {return ['ident', d[0].join("")]} %}


# Whitespace. The important thing here is that the postprocessor
# is a null-returning function. This is a memory efficiency trick.
_ -> [\s]:*     {% function(d) {return null } %}