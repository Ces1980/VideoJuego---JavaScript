

let canvas = document.createElement('canvas');
let context = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 400;
// Creando un objeto de tipo Image
let mainImage = new Image();
// Declara falso la carga de la imagen
mainImage.ready = false;
// Cargar el objeto usando la función checkReady
mainImage.onload = checkReady;
// El recurso que va a usar el objeto cuando se cargue
mainImage.src = '../img/pac.png';

// Cuando se mande llamar la función va cambiar el valor de ready y al mismo tiempo va a mandar llamar la función de playgame
function checkReady() {
    this.ready = true;
    playGame();
}

// playgame de momento solo va a mandar llmar al metodo render
function playGame() {
    render();
}

// El metodo render va a cambiar el lienzo de color y le va a dar dimenciones
function render() {
    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);
    // drawImage proporciona diferentes formas para dibujar una imagen (en nuestro caso pac.png) dentro de canvas
    // Se ha extraido la localicación de la imagen que se va a usar dando parametros https://developer.mozilla.org/es/docs/Web/API/CanvasRenderingContext2D/drawImage
    context.drawImage(mainImage, 320, 0, 32, 32, 50, 50, 32, 32);
}
// Se incrusta canvas al documento
document.body.appendChild(canvas);
ctx.fillText('HelloWorld', 10, 150);
