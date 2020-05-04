// Variables para el marcador
let score = 0;
let gscore = 0;

let player = {
    x: 50,
    y: 100,
    pacmouth: 320,
    pacdir: 0,
    psize: 32
}

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
    context.fillStyle = 'blue';
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.drawImage(mainImage, player.pacmouth, player.pacdir, 32, 32, player.x, player.y, 32, 32);
    // Tamaño y tipo de fuente
    context.font = '20px Verdana';
    // Color de la fuente
    context.fillStyle = 'white';
    //Mensaje y posicionamiento del marcador
    context.fillText(`Pacman: ${score} vs Ghost: ${gscore}`, 2, 18);
    // context.fillText('Pacman: ' + score + ' vs Ghost: ' + gscore, 2, 18);
}
// Se incrusta canvas al documento
document.body.appendChild(canvas);
ctx.fillText('HelloWorld', 10, 150);
