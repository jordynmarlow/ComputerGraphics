var canvas;
var gl;

var maxNumTriangles = 200;  
var maxNumVertices  = 3 * maxNumTriangles;
var index = 0;
var first = true;

var t1, t2, t3, t4;

var cIndex = 0;

var colors = [
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
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }
    
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.8, 0.8, 0.8, 1.0 );
    gl.clear( gl.COLOR_BUFFER_BIT );
    
    var m = document.getElementById("mymenu");
    
    m.addEventListener("click", function()
    {
       cIndex = m.selectedIndex;
       drawRectangles();
    });
    
    drawRectangles();

    render();
}

function drawRectangles()
{
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    var vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, 8*maxNumVertices, gl.STATIC_DRAW);
    
    var vPosition = gl.getAttribLocation( program, "vPosition");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);
    
    var cBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, 16*maxNumVertices, gl.STATIC_DRAW );
    
    var vColor = gl.getAttribLocation( program, "vColor");
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor);

    // create first rectangle
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer);

    // first vertex
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer)
    t1 = vec2(2*200/canvas.width-1, 
        2*(canvas.height-250)/canvas.height-1);
    
    // second vertex
    t2 = vec2(2*400/canvas.width-1, 
    2*(canvas.height-400)/canvas.height-1);
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

    // create second rectangle
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer);

    // first vertex
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer)
    t1 = vec2(2*100/canvas.width-1, 
        2*(canvas.height-100)/canvas.height-1);
    
    // second vertex
    t2 = vec2(2*150/canvas.width-1, 
        2*(canvas.height-300)/canvas.height-1);
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
