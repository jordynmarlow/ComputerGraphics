// Jordyn Marlow
// 4/14/2021

var context;

// constants
const TIME_INTERVAL = 50; // screen refresh interval in milliseconds
const PLANET_TYPES = ["earth.png", "jupiter.png", "mars.png", "mercury.png", "saturn.png", "uranus.png", "venus.png", "neptune.png"];
const PLANET_X = [300, 1200, 700, 1500, 100, 600, 300, 1500];
const PLANET_Y = [200, 500, 150, 100, 500, 700, 400, 500];
const PLANET_R = [50, 50, 75, 100, 100, 150, 200, 300];
const ROCKET_URL = "rocket.png";

var w; // width of the canvas
var h; // height of the canvas

function init()
{
    context = document.getElementById("space").getContext("2d");

    context.canvas.width = 1890;
    context.canvas.height = 950;

    w = context.canvas.width;
    h = context.canvas.height;

    generateNewStars(); // randomly draws 50 new stars

    // draw planets
    for (var i = 0; i < PLANET_TYPES.length; i++)
    {
        drawPlanet(PLANET_X[i], PLANET_Y[i], PLANET_R[i], i);
    }

    generateNewStars(); // randomly draws 50 new stars

    // draw rocket
    rocket_img = new Image();
    rocket_img.src = ROCKET_URL;
    rocket_img.onload = function()
    {
        context.drawImage(rocket_img, 900, 300, 150, 450);
    };
}

function generateNewStars()
{
    var newStar;
    for (var i = 0; i < 50; i++)
    {
        newStar = new Object();
        newStar.x = Math.floor(Math.random() * w);
        newStar.y = Math.floor(Math.random() * h);
        newStar.r = Math.floor(Math.random() * 15);
        drawStar(newStar.x, newStar.y, newStar.r);
    }
}

function drawPlanet(x, y, r, type)
{
    var image = new Image();
    image.src = PLANET_TYPES[type];
    var w = r;
    if (type == 4) // change width if the planet is Saturn
    {
        w = r * (3 / 5);
    }
    image.onload = function()
    {
        context.drawImage(image, x, y, r, w);
    };
}

function drawStar(x, y, r)
{
    var gradient = context.createRadialGradient(x, y, 0, x, y, r);
    gradient.addColorStop(0, "white");
    gradient.addColorStop(1, "transparent");
    context.beginPath();
    context.arc(x, y, r, 0, Math.PI * 2);
    context.fillStyle = gradient;
    context.fill();
}

window.addEventListener("load", init, false);