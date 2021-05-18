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
    
    var m = document.getElementById("mymenu");

    // draw ellipse
    var pi = 3.14159;
    var x = 2*pi/100;
    var y = 2*pi/100;
    var r = 0.05;

    points = [];
    
    var center = vec2(0.4, 0.8); 
   
    points.push(center);
    for (i = 0; i <= 100; i++){
        points.push(center + vec2(
            r*Math.cos(i * 2 * Math.PI / 200),
            r*Math.sin(i * 2 * Math.PI / 200) 
        ));
    }

    gl.drawArrays(gl.TRIANGLE_FAN, points, vertexCount);

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

    var x = 250;
    var y = 350;
    for (i = 120; i > 0; i -= 20)
    {
        cIndex = (i / 20) % 2;
        drawRectangle(x - i, y - i, x + i, y + i);
    }

    

    render();
}

function drawRectangle(x1, y1, x2, y2)
{
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer);

    // first vertex
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer)
    t1 = vec2(2*x1/canvas.width-1, 
        2*(canvas.height-y1)/canvas.height-1);
    
    // second vertex
    t2 = vec2(2*x2/canvas.width-1, 
    2*(canvas.height-y2)/canvas.height-1);
    t3 = vec2(t1[0], t2[1]);
    t4 = vec2(t2[0], t1[1]);

    gl.bufferSubData(gl.ARRAY_BUFFER, 8*index, flatten(t1));
    gl.bufferSubData(gl.ARRAY_BUFFER, 8*(index+1), flatten(t3));
    gl.bufferSubData(gl.ARRAY_BUFFER, 8*(index+2), flatten(t2));
    gl.bufferSubData(gl.ARRAY_BUFFER, 8*(index+3), flatten(t4));
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer);
    
    t = vec4(colors[cIndex]);

    gl.bufferSubData(gl.ARRAY_BUFFER, 16*(index), flatten(t));
    gl.bufferSubData(gl.ARRAY_BUFFER, 16*(index+1), flatten(t));
    gl.bufferSubData(gl.ARRAY_BUFFER, 16*(index+2), flatten(t));
    gl.bufferSubData(gl.ARRAY_BUFFER, 16*(index+3), flatten(t));
    
    index += 4;
}

function render()
{
    
    gl.clear( gl.COLOR_BUFFER_BIT );

    for(var i = 0; i<index; i+=4)
        gl.drawArrays( gl.TRIANGLE_FAN, i, 4 );

    window.requestAnimFrame(render);

}
