var canvas;
var gl;

var maxNumTriangles = 200;  
var maxNumVertices  = 3 * maxNumTriangles;
var index = 0;
var first = true;

var t1, t2, t3, t4;

var cIndex = 0;

var program;
var vBuffer;
var vPosition;
var cBuffer;
var vColor;

var colors = [
    vec4( 1.0, 1.0, 1.0, 1.0 ),  // white
    vec4( 0.0, 0.0, 0.0, 1.0 ),  // black
    vec4( 1.0, 0.0, 0.0, 1.0 ),  // red
    vec4( 1.0, 1.0, 0.0, 1.0 ),  // yellow
    vec4( 0.0, 1.0, 0.0, 1.0 ),  // green
    vec4( 0.0, 0.0, 1.0, 1.0 ),  // blue
    vec4( 1.0, 0.0, 1.0, 1.0 ),  // magenta
    vec4( 0.0, 1.0, 1.0, 1.0 )   // cyan
];

window.onload = function init()
{
    canvas = document.getElementById( "gl-canvas" );
    //var ctx = canvas.getContext("2d");

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }
    
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.0, 0.0, 0.0, 1.0 );
    gl.clear( gl.COLOR_BUFFER_BIT );


    // create shaders for squares
    program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, 8*maxNumVertices, gl.STATIC_DRAW);
    
    vPosition = gl.getAttribLocation( program, "vPosition");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);
    
    cBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, 16*maxNumVertices, gl.STATIC_DRAW );
    
    vColor = gl.getAttribLocation( program, "vColor");
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor);


    // ellipse
    var a = 50;
    var b = 30;

    var center_x = 100;
    var center_y = 100;
    addPoint(center_x, center_y, colors[2]);

    for (i = 0; i <= 90; i++)
    {
        addPoint(center_x + a*Math.cos(i * Math.PI / 45),
                center_y + b*Math.sin(i * Math.PI / 45),
                colors[2]);
        addPoint(center_x, center_y, colors[2]);
    }

    // "invisible" points
    addPoint(center_x + a*Math.cos(4 * Math.PI),
            center_y + b*Math.sin(4 * Math.PI),
            colors[0]);
    addPoint(center_x + a*Math.cos(4 * Math.PI),
            center_y + b*Math.sin(4 * Math.PI),
            colors[0]);


    // triangle
    addPoint(195, 150, colors[1]);
    addPoint(195, 150, colors[4]);
    addPoint(305, 150, colors[5]);
    addPoint(250, 50, colors[2]);
    addPoint(250, 50, colors[1]);
    

    // circle
    var r = 50;

    center_x = 400;
    center_y = 100;

    // "invisible" point
    addPoint(center_x, center_y, colors[0]);

    addPoint(center_x, center_y, colors[4]);

    for (i = 0; i <= 90; i++)
    {
        addPoint(center_x + r*Math.cos((i + 90) * Math.PI / 45),
                center_y + r*Math.sin((i + 90) * Math.PI / 45),
                colors[2]);
        addPoint(center_x, center_y, colors[2]);
    }

    addPoint(center_x + r*Math.cos(2.5 * Math.PI),
            center_y + r*Math.sin(2.5 * Math.PI),
            colors[2]);
    addPoint(center_x + r*Math.cos(2.5 * Math.PI),
            center_y + r*Math.sin(2.5 * Math.PI),
            colors[2]);


    addPoint(center_x + r*Math.cos(2.5 * Math.PI),
            center_y + r*Math.sin(2.5 * Math.PI),
            colors[1]);
    addPoint(center_x + r*Math.cos(2.5 * Math.PI),
            center_y + r*Math.sin(2.5 * Math.PI),
            colors[1]);


    // squares
    var x = 250;
    var y = 350;
    var nextColor = 0;
    var color = 1;
    var temp;
    for (i = 120; i > 0; i -= 20)
    {
        temp = nextColor;
        nextColor = color;
        color = temp;
        addSquare(x - i, y - i, x + i, y + i, colors[color], colors[nextColor]);
    }


    render();
}

function addPoint(x, y, color)
{
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer);
    var t = vec2(2*x/canvas.width-1, 
            2*(canvas.height-y)/canvas.height-1);
    gl.bufferSubData(gl.ARRAY_BUFFER, 8*index, flatten(t));

    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer);
    t = vec4(color);
    gl.bufferSubData(gl.ARRAY_BUFFER, 16*index, flatten(t));
    index++;
}

function addSquare(x1, y1, x2, y2, color, nextColor)
{
    // "invisible" first points
    addPoint(x1, y1, nextColor);
    addPoint(x1, y1, nextColor);

    // top left point
    addPoint(x1, y1, color);
    // top right point
    addPoint(x2, y1, color);
    // bottom right point
    addPoint(x2, y2, color);
    // bottom left point
    addPoint(x1, y2, color);
    // top left point
    addPoint(x1, y1, color);
}


function render()
{
    
    gl.clear( gl.COLOR_BUFFER_BIT );

    gl.drawArrays( gl.TRIANGLE_STRIP, 0, index);

    window.requestAnimFrame(render);

}
