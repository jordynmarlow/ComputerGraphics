// Jordyn Marlow
// 4/14/2021

var canvas;
var context;

// constants
var TIME_INTERVAL = 25; // screen refresh interval in milliseconds

// variables
var intervalTimer; // holds interval timer
var timerCount; // number of times the timer fired since the last second
var timeLeft; // the amount of time left in seconds
var timeElapsed; // the number of seconds elapsed

var stars; // array of star objects
var planets; // array of planet objects
var starVel; // star speed multiplier
var planetsVel; // planet speed multiplier

var rocket; // coordinate of rocket
var rocketAngVel; // rocket angular speed multiplier

var w; // width of the canvas
var h; // height of the canvas

function init()
{
    canvas = document.getElementById("space");
    context = canvas.getContext("2d");

    w = canvas.width;
    h = canvas.height;

    star = new Array();
    planets = new Array();
    rocket = new Object();

    intervalTimer = window.setInterval(update, TIME_INTERVAL);

    x = 100;
    y = 100;
    r = 100;

    for( i = 0; i < colorsLength; i++ ) {
        var color = colors[ i ];
        gradient.addColorStop( i / colorsLength, color );
        gradient.addColorStop( ( i + 1 ) / colorsLength, color );
      }
}

function update()
{
    var backgroundUpdate = TIME_INTERVAL / 1000.0 * backgroundVel;
    for (var i = 0; i < background.length; i++)
    {
        background[i].y += backgroundUpdate;
    }

    var foregroundUpdate = TIME_INTERVAL / 1000.0 * foregroundVel;
    for (var i = 0; i < foreground.length; i++)
    {
        foreground[i].y += foregroundUpdate;
    }

    var planetsUpdate = TIME_INTERVAL / 1000.0 * planetsVel;
    for (var i = 0; i < planets.length; i++)
    {
        planets[i].y += planetsUpdate;
    }

    var rocketUpdate = TIME_INTERVAL / 1000.0 * rocketAngVel;
    rocket.ang += rocketUpdate;

    timerCount++;

    draw();
}

function draw()
{
    canvas.width = canvas.width; // clear canvas

    // if any foreground or background objects are out of screen bounds, remove them
    // draw background, foreground, and planet objects
    for (var i = 0; i < stars.length; i++)
    {
        if (stars[i].y >= h + 50)
        {
            stars.splice(i, 1);
            i--;
        }
        drawStar();
    }
    for (var i = 0; i < planets.length; i++)
    {
        if (planets[i].y >= h + 50)
        {
            planets.splice(i, 1);
            i--;
        }
        drawPlanet(planets[i]);
    }

    // possibly add stars and/or planets to arrays for next time step
    var newStar = newObject();
    newStar.y = 0;
    stars += newStar;

    // draw the rocket
    drawRocket();
}

function drawPlanet(x, y, r, type)
{
    // draw one of nine random planets or the sun
    
    // mars
    base = "#e01f36"
    spots = "#c20a20"
    drawCircle(x, y, r, base)
    drawCircle(x - (r * 0.5), y - (r * 0.3), r * 0.125, spots)
    drawCircle(x + (r * 0.5), y - (r * 0.6), r * 0.15, spots)
    drawCircle(x - (r * 0.7), y + (r * 0.2), r * 0.25, spots)
    drawCircle(x + (r * 0.3), y + (r * 0.7), r * 0.1, spots)
    drawCircle(x + (r * 0.4), y + (r * 0.5), r * 0.2, spots)
    drawCircle(x - (r * 0.3), y + (r * 0.15), r * 0.115, spots)
    drawCircle(x + (r * 0.6), y - (r * 0.35), r * 0.115, spots)

    // mercury
    base = "#94918d"
    spots = "#b8b6b4"
    drawCircle(x, y, r, base)
    drawCircle(x - (r * 0.3), y - (r * 0.6), r * 0.15, spots)
    drawCircle(x + (r * 0.2), y - (r * 0.3), r * 0.18, spots)
    drawCircle(x - (r * 0.6), y + (r * 0.5), r * 0.125, spots)
    drawCircle(x + (r * 0.4), y - (r * 0.4), r * 0.16, spots)
    drawCircle(x + (r * 0.5), y + (r * 0.2), r * 0.23, spots)
    drawCircle(x - (r * 0.2), y + (r * 0.5), r * 0.15, spots)
    drawCircle(x + (r * 0.7), y - (r * 0.4), r * 0.115, spots)

    // uranus
    base = "#99d7e8"
    drawCircle(x, y, r, base)


}

function drawStar(x, y, r)
{
    var gradient = context.createRadialGradient(x, y, 0, x, y, 10);
    gradient.addColorStop(0, "white");
    gradient.addColorStop(1, "transparent");
    drawCircle(x, y, r, gradient)
}

function drawCircle(x, y, r, color)
{
    context.beginPath();
    context.arc(x, y, r, 0, Math.PI * 2);
    context.fillStyle = color;
    context.fill();
}

function drawRocket()
{
    // draw rocket rotated to rocket.ang
}

window.addEventListener("load", init, false);