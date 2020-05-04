// let canvas = document.getElementById('canvasSpace');
// let ctx = canvas.getContext('2d');
// ctx.fillText("HelloWorld", 10, 150);

var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');
canvas.height = 400;
canvas.width = 600;
document.body.appendChild(canvas);
ctx.fillText('HelloWorld', 10, 150);
