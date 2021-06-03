var canvas;
var gl;

var maxNumVertices = 6000;
var index = 0;
var first = true;

var t1, t2;

var cIndex = 0;
var isPreview = false;

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

    //  Load shaders and initialize attribute buffers
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
    
    var m = document.getElementById("colormenu");
    
    m.addEventListener("click", function() { cIndex = m.selectedIndex; });

    canvas.addEventListener("mousedown", function()
    {
        // left click
        if(event.button == 0)
        {
            console.log('add point to polygon');
            gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer);
            if(first)
            {
                first = false;
                gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer)
                t1 = vec2(2*event.clientX/canvas.width-1, 
                    2*(canvas.height-event.clientY)/canvas.height-1);
            }
            else
            {
                index -= 2;
                isPreview = false;
                gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer)
                t2 = vec2(2*event.clientX/canvas.width-1, 
                    2*(canvas.height-event.clientY)/canvas.height-1);

                gl.bufferSubData(gl.ARRAY_BUFFER, 8*index, flatten(t1));
                gl.bufferSubData(gl.ARRAY_BUFFER, 8*(index+1), flatten(t2));
                gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer);
                
                t = vec4(colors[cIndex]);

                gl.bufferSubData(gl.ARRAY_BUFFER, 16*(index), flatten(t));
                gl.bufferSubData(gl.ARRAY_BUFFER, 16*(index+1), flatten(t));
                t1 = t2;
            }
            index += 4;
        }
        // right click
        else if(event.button == 2)
        {
            stopPoly();
        }
    } );
  
    //if a line is being drawn draw the preview
    canvas.addEventListener("mousemove", function()
    {
        if(!isPreview)
        {
            isPreview = true;
            index +=2;
        }  

        if(!first)
        {
            index -=2;
            gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer);
            t2 = vec2(2*event.clientX/canvas.width-1, 
            2*(canvas.height-event.clientY)/canvas.height-1);

            gl.bufferSubData(gl.ARRAY_BUFFER, 8*index, flatten(t1));
            gl.bufferSubData(gl.ARRAY_BUFFER, 8*(index+1), flatten(t2));
            gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer);
            
            t = vec4(colors[cIndex]);

            gl.bufferSubData(gl.ARRAY_BUFFER, 16*(index), flatten(t));
            gl.bufferSubData(gl.ARRAY_BUFFER, 16*(index+1), flatten(t));
            index += 2;
        }
    } );
    render();
}

function stopPoly()
{
    first = true;
    index += 4;
    console.log('end polygon');
}

function render()
{
    gl.clear(gl.COLOR_BUFFER_BIT);
    for(var i = 0; i < index; i += 4)
    {
        gl.drawArrays(gl.LINE_STRIP, i, 2);
    }
    window.requestAnimFrame(render);

}