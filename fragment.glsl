#ifdef GL_FRAGMENT_PRECISION_HIGH
  precision highp float;
#else
  precision mediump float;
#endif

#define NUM_STEPS   40
#define X_OFFSET    0.5

#define NEWTON      0
#define HALLEY      1
#define HOUSEHOLDER 2
#define METHOD      %%method%%

const float PI = 3.1415926535897932384626433832795;
const float E = 2.7182818284590452353602874713527;

#define complex vec2

const complex pi = complex(PI, 0.0);
const complex e = complex(E, 0.0);
const complex i = complex(0.0, 1.0);
const complex c_nan = complex(10000.0, 20000.0);

#define c_abs(a) length(a)

complex c_mul(complex a, complex b)
{
    return complex(a.x*b.x-a.y*b.y, a.x*b.y+a.y*b.x);
}

complex c_div(complex a, complex b)
{
    if (dot(b,b) == 0.0) return c_nan;
    return complex(dot(a,b)/dot(b,b), (a.y*b.x-a.x*b.y)/dot(b,b));
}

float c_arg(complex a)
{
    return atan(a.y, a.x);
}

complex c_exp(complex z)
{
    return complex(exp(z.x)*cos(z.y), exp(z.x)*sin(z.y));
}

complex c_pow(complex z, complex w)
{
    /*
    z = r*e^(i*t)
    w = c+di

    z^w = r^c * e^(-d*t) * e^(i*c*t + i*d*log(r))
    */

    float r = c_abs(z);
    float theta = c_arg(z);

    float r_ = pow(r, w.x);
    float theta_ = theta * w.x;

    if (w.y != 0.0)
    {
        r_ *= exp(-w.y*theta);
        theta_ += w.y*log(r);
    }

    return complex(r_*cos(theta_), r_*sin(theta_));
}

complex c_sqrt(complex z)
{
    float r = c_abs(z);

    float a = sqrt((r + z.x)/2.0);
    float b = sqrt((r - z.x)/2.0);

    if (z.y < 0.0) b = -b;

    return complex(a, b);
}

complex c_inv(complex z)
{
    return c_div(complex(1.0, 0), z);
}

complex c_log(complex z)
{
    return complex(log(c_abs(z)), c_arg(z));
}

float cosh(float x)
{
    float e = exp(x);
    return 0.5 * (e + 1.0/e);
}

float sinh(float x)
{
    float e = exp(x);
    return 0.5 * (e - 1.0/e);
}

complex c_sin(complex z)
{
    return complex(sin(z.x) * cosh(z.y), cos(z.x) * sinh(z.y));
}

complex c_cos(complex z)
{
    return complex(cos(z.x) * cosh(z.y), -sin(z.x) * sinh(z.y));
}

complex c_sinh(complex z)
{
    return complex(cos(z.y) * sinh(z.x), sin(z.y) * cosh(z.x));
}

complex c_cosh(complex z)
{
    return complex(cos(z.y) * cosh(z.x), sin(z.y) * sinh(z.x));
}

complex c_tanh(complex z)
{
    return c_div(
        c_exp(z) - c_exp(-z),
        c_exp(z) + c_exp(-z)
    );
}

complex c_tan(complex z)
{
    return c_mul(complex(0, -1), c_tanh(c_mul(complex(0, 1), z)));
}

complex c_cot(complex z)
{
    return c_inv(c_tan(z));
}

complex c_sec(complex z)
{
    return c_inv(c_cos(z));
}

complex c_csc(complex z)
{
    return c_inv(c_sin(z));
}

complex c_cis(complex z)
{
    return c_cos(z) + c_mul(i, c_sin(z));
}

complex c_asin(complex z)
{
    return c_mul(
        complex(0, -1.0),
        c_log(
            c_mul(complex(0, 1.0), z) + c_sqrt(complex(1.0, 0) - c_mul(z, z))
        ));
}

complex c_acos(complex z)
{
    return complex(PI/2.0, 0) - z;
}

complex c_atan(complex z)
{
    return c_mul(
        complex(0, 0.5),
              c_log(complex(1.0, 0) - c_mul(complex(0, 1.0), z))
            - c_log(complex(1.0, 0) + c_mul(complex(0, 1.0), z))
        );
}

complex c_acot(complex z)
{
    return c_atan(c_inv(z));
}


complex c_asec(complex z)
{
    return c_acos(c_inv(z));
}

complex c_acsc(complex z)
{
    return c_asin(c_inv(z));
}


uniform float width;
uniform float height;
uniform float zoom_factor;

uniform int mouse_idle;

complex m;
uniform complex mouse;
uniform complex t;
uniform complex f;

vec3 hsv2rgb(vec3 c)
{
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

bool isbad(float v) {
    if (!(v == 0.0 || v < 0.0 || 0.0 < v)) return true;
    if (v >= 100000.0) return true;

    return false;
}

bool isbad(complex z) {
    return isbad(z.x) || isbad(z.y) || z == c_nan;
}

void main()
{
    complex z, z_;
    int steps;
    float normalizedX = (gl_FragCoord.x - width/2.0) / width * (width / height);
    float normalizedY = (gl_FragCoord.y - height/2.0) / height;


    z.x = normalizedX*zoom_factor;
    z.y = normalizedY*zoom_factor;

    /*float radius = 0.01;

    complex in_z = z;
    if (distance(z, complex(0, 1)) < radius
        || distance(z, complex(0.333333, 0.666666)) < radius
        || distance(z, complex(0.582222, 0.924444)) < radius
        || distance(z, complex(0.508791, 0.868166)) < radius
        //|| distance(z, complex(0.500069, 0.865982)) < radius
        //|| distance(z, complex(0.500000, 0.866025)) < radius
    ) {
        gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
        return;
    }*/

    if (mouse_idle == 0) {
        m = mouse;
    }
    else {
        m = (%%idle_function%%);
    }

    for (int step=0; step<NUM_STEPS; step++)
    {
        steps = step;

#if METHOD == NEWTON
        complex delta = c_div((%%f%%), (%%df%%));

#elif METHOD == HALLEY
        complex f_ = (%%f%%);
        complex df_ = (%%df%%);
        complex ddf_ = (%%ddf%%);

        complex delta = c_div(
            c_mul(complex(2.0, 0.0), c_mul(f_, df_)),
            c_mul(complex(2.0, 0.0), c_mul(df_, df_)) - c_mul(f_, ddf_)
        );

#else
        complex f_ = (%%f%%);
        complex df_ = (%%df%%);
        complex ddf_ = (%%ddf%%);

        complex delta = c_mul(
            c_div(f_, df_),
            complex(1.0, 0.0) + c_div(
                c_mul(f_, ddf_),
                c_mul(complex(2.0, 0.0), c_mul(df_, df_))
            )
        );

#endif
        z_ = z - delta;

        if (isbad(delta)) {
            gl_FragColor = vec4(0.0,0.0,0.0,1.0);
            return;
        }

        if (distance(z, z_) < 0.001)
            break;

        z = z_;
    }

    float hue, saturation, v;

    /* Choose a hue with the same angle as the argument */
    hue = 0.5 + c_arg(z)/(PI*2.0);

    /* Saturate roots the closer to 0 they are */
    saturation = 0.59/(sqrt(c_abs(z)));

    /* Make roots close to 0 white */
    if (c_abs(z) < 0.1)
        saturation = 0.0;

    /* Darken based on the number of steps taken */
    v = 0.95 * max(1.0-float(steps)*0.025, 0.05);

    /* Make huge roots black */
    if (c_abs(z) > 100.0)
        v = 0.0;

    vec3 c = hsv2rgb(vec3(hue, saturation, v));
    gl_FragColor = vec4(c.rgb, 1.0);

    /*if (z.x < 0.4999955 || z.x > 0.5 || z.y < 0.866 || z.y > 0.867) {
        gl_FragColor = vec4(0.0,0.0,0.0,0.0);
    }*/
}