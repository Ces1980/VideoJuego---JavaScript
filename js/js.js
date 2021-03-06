// Variables para el marcador
let score = 0,
    gscore = 0,
    countblink = 10,
    ghost = false,
    ghost2 = false;

let player = {
    x: 50,
    y: 100,
    pacmouth: 320,
    pacdir: 0,
    psize: 32,
    speed: 5
}

let enemy = {
    x: 150,
    y: 200,
    speed: 5,
    moving: 0,
    dirx: 0,
    diry: 0,
    flash: 0,
    ghosteat: false
}

let enemy2 = {
    x: 150,
    y: 200,
    speed: 5,
    moving: 0,
    dirx: 0,
    diry: 0,
    flash: 0,
    ghosteat: false
}

let powerdot = {
    x: 10,
    y: 10,
    powerUp: false,
    pcountdown: 0,
    ghostNum: 0,
    ghostNum2: 0
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

// Guardar los clicks
var keyclick = {};

// evento que esta a la escucha cuando se oprimen las teclas para generar movimiento
document.addEventListener("keydown", function (event) {
    keyclick[event.keyCode] = true;
    move(keyclick);
}, false);

// Borrar los click previos para no hacer grande el arreglo, se borra al soltar el botòn
document.addEventListener("keyup", function (event) {
    delete keyclick[event.keyCode];
}, false);


// Al renderizar cargar los movimientos del jugador
function move(keyclick) {
    // (código del teclado al hacer click) { indicar movimiento en el plano -> avanzar  -- para donde avanzar}
    if (37 in keyclick) { player.x -= player.speed; player.pacdir = 64; }
    if (38 in keyclick) { player.y -= player.speed; player.pacdir = 96; }
    if (39 in keyclick) { player.x += player.speed; player.pacdir = 0; }
    if (40 in keyclick) { player.y += player.speed; player.pacdir = 32; }

    // Indicar que cuando el persona salga del plano entre inmediatamente en la parte contraria salga adelante entre atrás salga arriba entre abajo y viseversa
    if (player.x >= (canvas.width - 32)) {
        player.x = 0;
    }
    if (player.y >= (canvas.height - 32)) {
        player.y = 0;
    }
    if (player.x < 0) {
        player.x = (canvas.width - 32);
    }
    if (player.y < 0) {
        player.y = (canvas.height - 32);
    }

    // Indicar el movimiento de la apertura del personaje
    if (player.pacmouth == 320) {
        player.pacmouth = 352;
    } else {
        player.pacmouth = 320;
    }
    render();
}

// Cuando se mande llamar la función va cambiar el valor de ready y al mismo tiempo va a mandar llamar la función de playgame
function checkReady() {
    this.ready = true;
    playGame();
}

// playgame de momento solo va a mandar llmar al metodo render
function playGame() {
    render();
    requestAnimationFrame(playGame);
}

// Generar un número random para crear un lugar de aparación del fantasma al asar
function myNum(n) {
    return Math.floor(Math.random() * n);
}

// El metodo render va a cambiar el lienzo de color y le va a dar dimenciones
function render() {
    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);

    if (!powerdot.powerUp && powerdot.pcountdown < 5) {
        powerdot.x = myNum(420) + 30;
        powerdot.y = myNum(250) + 30;
        powerdot.powerUp = true;
    }

    // Ghost se inicializo en false. Con esta condición se indica que si no hay un fantasma lo cree en las coordenadas declaradas
    if (!ghost) {
        enemy.ghostNum = myNum(5) * 64;
        enemy.x = myNum(450);
        enemy.y = myNum(250) + 30;
        ghost = true;
    }

    if (!ghost2) {
        enemy2.ghostNum = myNum(5) * 64;
        enemy2.x = myNum(450);
        enemy2.y = myNum(250) + 30;
        ghost2 = true;
    }

    // Movimientos del enemigo 1
    if (enemy.moving < 0) {
        enemy.moving = (myNum(20) * 3) + myNum(1);
        enemy.speed = myNum(2) + 1;
        enemy.dirx = 0;
        enemy.diry = 0;

        if (powerdot.ghosteat) {
            enemy.speed = enemy.speed * -1;
        }

        if (enemy.moving % 2) {
            if (player.x < enemy.x) {
                enemy.dirx = -enemy.speed;
            } else {
                enemy.dirx = enemy.speed
            }
        } else {
            if (player.y < enemy.y) {
                enemy.diry = -enemy.speed;
            } else {
                enemy.diry = enemy.speed
            }
        }
    }
    enemy.moving--;
    enemy.x = enemy.x + enemy.dirx;
    enemy.y = enemy.y + enemy.diry;

    if (enemy.x >= (canvas.width - 32)) {
        enemy.x = 0;
    }
    if (enemy.y >= (canvas.height - 32)) {
        enemy.y = 0;
    }
    if (enemy.x < 0) {
        enemy.x = (canvas.width - 32);
    }
    if (enemy.y < 0) {
        enemy.y = (canvas.height - 32);
    }


    // Movimientos del enemigo 2
    if (enemy2.moving < 0) {
        enemy2.moving = (myNum(20) * 3) + myNum(1);
        enemy2.speed = myNum(3) + 1;
        enemy2.dirx = 0;
        enemy2.diry = 0;

        if (powerdot.ghosteat) {
            enemy2.speed = enemy2.speed * -1;
        }

        if (enemy2.moving % 2) {
            if (player.x < enemy2.x) {
                enemy.dirx = -enemy.speed;
            } else {
                enemy2.dirx = enemy2.speed;
            }
        } else {
            if (player.y < enemy2.y) {
                enemy2.diry = -enemy2.speed;
            } else {
                enemy2.diry = enemy2.speed;
            }
        }
    }
    enemy2.moving--;
    enemy2.x = enemy2.x + enemy2.dirx;
    enemy2.y = enemy2.y + enemy2.diry;

    if (enemy2.x >= (canvas.width - 32)) {
        enemy2.x = 0;
    }
    if (enemy2.y >= (canvas.height - 32)) {
        enemy.y = 0;
    }
    if (enemy2.x < 0) {
        enemy2.x = (canvas.width - 32);
    }
    if (enemy2.y < 0) {
        enemy2.y = (canvas.height - 32);
    }

    // Collision detection ghost
    if (player.x <= (enemy.x + 26) && enemy.x <= (player.x + 26) && player.y <= (enemy.y + 26) && enemy.y <= (player.y + 32)) {
        console.log('ghost');
        if (powerdot.ghosteat) {
            score++;
        } else {
            gscore++;
        }
        // Al ser tocado por el ghost
        player.x = 10;
        player.y = 100;
        enemy.x = 300;
        enemy.y = 200;
        powerdot.pcountdown = 0;
    }

    // Collision detection ghost 2
    if (player.x <= (enemy2.x + 26) && enemy2.x <= (player.x + 26) && player.y <= (enemy2.y + 26) && enemy2.y <= (player.y + 32)) {
        console.log('ghost');
        if (powerdot.ghosteat) {
            score++;
        } else {
            gscore++;
        }
        // Al ser tocado por el ghost
        player.x = 10;
        player.y = 100;
        enemy2.x = 300;
        enemy2.y = 200;
        powerdot.pcountdown = 0;
    }


    // Collision detection powerup
    if (player.x <= powerdot.x && powerdot.x <= (player.x + 32) && player.y <= powerdot.y && powerdot.y <= (player.y + 32)) {
        console.log('hit');
        powerdot.powerUp = false;
        powerdot.pcountdown = 500;
        powerdot.ghostNum2 = enemy2.ghostNum;
        enemy.ghostNum = 384;
        enemy2.ghostNum = 384;
        powerdot.x = 0;
        powerdot.y = 0;
        powerdot.ghosteat = true;
        player.speed = 10;
    }


    if (powerdot.ghosteat) {
        powerdot.pcountdown--;
        if (powerdot.pcountdown <= 0) {
            powerdot.ghostNum = false;
            enemy.ghostNum = powerdot.ghostNum;
            enemy2.ghostNum = powerdot.ghostNum;
            player.speed = 5;
        }
    }
    //draw power up dot
    if (powerdot.powerUp) {
        context.fillStyle = "#ffff";
        context.beginPath();
        context.arc(powerdot.x, powerdot.y, 10, 0, Math.PI * 2, true);
        context.closePath();
        context.fill();
    }

    //enemy blinking
    if (countblink > 0) {
        countblink--;
    } else {
        countblink = 20;
    }

    if (enemy.flash == 0) {
        enemy.flash = 32;
        enemy2.flash = 32;
    } else {
        enemy.flash = 0;
        enemy2.flash = 0;
    }

    // Tamaño y tipo de fuente
    context.font = '20px Verdana';
    // Color de la fuente
    context.fillStyle = 'white';
    //Mensaje y posicionamiento del marcador
    context.fillText(`Pacman: ${score} vs Ghost: ${gscore}`, 2, 18);
    // context.fillText('Pacman: ' + score + ' vs Ghost: ' + gscore, 2, 18);


    //Creando el enemigo con una aparición alejada de pac
    context.drawImage(mainImage, enemy2.ghostNum, enemy2.flash, 32, 32, enemy2.x, enemy2.y, 32, 32);
    context.drawImage(mainImage, enemy.ghostNum, enemy.flash, 32, 32, enemy.x, enemy.y, 32, 32);
    context.drawImage(mainImage, player.pacmouth, player.pacdir, 32, 32, player.x, player.y, 32, 32);

}
// Se incrusta canvas al documento
document.body.appendChild(canvas);

