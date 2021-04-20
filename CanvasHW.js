// Jordyn Marlow
// 4/14/2021

var canvas;
var context;

// constants
const TIME_INTERVAL = 25; // screen refresh interval in milliseconds
const PLANET_TYPES = ["earth.png", "jupiter.png", "mars.png", "mercury.png", "saturn.png", "uranus.png", "venus.png"];

// variables
var intervalTimer;
var timeElapsed;

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
    rocket.img = new Image();
    rocket.img.src = "rocket.png";
    rocket.x = 50;
    rocket.y = 50;

    rocket.img.onload = function()
    {
        context.drawImage(rocket.img, rocket.x, rocket.y);
    };

    image = new Image();
    image.src = PLANET_TYPES[type];
    image.onload = function() { context.drawImage(image, x, y, r, r); };

    //drawPlanet(300, 300, 300, 2);
    drawStar(10, 10, 10);

    //intervalTimer = window.setInterval(update, TIME_INTERVAL);
}

/*function update()
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

    //timeElapsed++;

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
    }*/

    // possibly add stars and/or planets to arrays for next time step
    /*var newStar = newObject();
    newStar.y = 0;
    stars += newStar;

    // draw the rocket

    drawRocket();
}

function drawPlanet(x, y, r, type)
{
    // draw one of nine random planets
    image = new Image();
    image.src = PLANET_TYPES[type];
    image.onload = function()
    {
        context.drawImage(image, x, y, r, r);
    };
}*/

function drawStar(x, y, r)
{
    var gradient = context.createRadialGradient(x, y, 0, x, y, 10);
    gradient.addColorStop(0, "white");
    gradient.addColorStop(1, "transparent");
    context.beginPath();
    context.arc(x, y, r, 0, Math.PI * 2);
    context.fillStyle = gradient;
    context.fill();
}

/*function drawRocket()
{
    // draw rocket rotated to rocket.ang
    rocket.img.onload = function()
    {
        context.drawImage(rocket.img, rocket.x, rocket.y);
    };
}*/

window.addEventListener("load", init, false);