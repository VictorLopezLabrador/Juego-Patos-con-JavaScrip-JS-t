
// Declaramos las constantes que queremos utilizar del html
const app = document.querySelector('body');
const canvas = document.querySelector('#canvas');
// sonido tiro
const sound1 = document.querySelector("#sonido1");
const sound2 = document.querySelector("#sonido2");
const sound3 = document.querySelector("#sonido3");
const sound4 = document.querySelector("#sonido4");
// Sonido musica
const musica = document.querySelector("#musica");
const pararMusica = document.querySelector("#sound");

// Sonido muerte pato
const ouch1 = document.querySelector("#ouch1");
const ouch2 = document.querySelector("#ouch2");
const ouch3 = document.querySelector("#ouch3");
const ouch4 = document.querySelector("#ouch4");
// Puntuación y boton de empezar
const score = document.querySelector("#score");
const start = document.querySelector("#start");
// Tiempo del reloj, ronda en la que estamos y final cuando pierdes
const tiempo = document.querySelector('#tempo');
const Ronda1 = document.querySelector('#Ronda1');
const Final = document.querySelector('#gameOver');

// Dividimos el marcador en un array, para separar 'Score: ' de los puntos '10'
let myScore = score.textContent.split(" ");


let my_time = 0;
let my_time2 = 0;
const step = 6;
const step2 = 4;
let numPatosEnJuego = 4;


let jugando = false;
let puntos = 4;
let valor = 5;
let nivel = 1;

// Esconder estos estilos para que no sean visibles
Ronda1.style.visibility = 'hidden';
Final.style.visibility = 'hidden';

// Cuando haces click en ronda, vamos a la funcion
Ronda1.addEventListener('click', ComenzarRonda);

// Generamos un numero random entre un maximo que le pasemos por teclado y lo redondeamos
function getRandomInt(max, min = 0) {
    return Math.floor(Math.random() * (max - min) + min);
}


app.addEventListener('click', (e) => {

    if (sound1.paused)
        sound1.play();
    else if (sound2.paused)
        sound2.play();
    else if (sound3.paused)
        sound3.play();
    else
        sound4.play();

    const explosion = document.createElement('div');
    explosion.className = 'explosion';

    document.body.appendChild(explosion);
    explosion.style.left = `${e.clientX - 5}px`;
    explosion.style.top = `${e.clientY - 5}px`;

    // Cuando la funcion haya finalizao borrar lo que haya quedado
    explosion.onanimationend = () => document.body.removeChild(explosion);

});


function crearPato() {
    // Si no estamos jugando, la funcion no se ejecuta
    if (!jugando)
        return;

    // Obtener todos los elementos que haya en el documento que tengan la clase duck
    let patos = document.getElementsByClassName("duck").length;
    patos += document.getElementsByClassName("duck2").length;

    // Cuando hay mas patos en la pantalla que numPatosEnJuego, dejar de realizar la funcion
    if (patos > numPatosEnJuego) {
        return;
    }

    // Creamos un elemento div
    const pato = document.createElement('div');
    // Hacemos generar un numero aleatorio y si es par nos da una clase al elemento creado 'pato',
    // sino le da la otra clase
    if (getRandomInt(10) % 2 == 0)
        pato.className = 'duck';
    else
        pato.className = 'duck2';

    // Se muestra el nuevo elemento generado
    document.body.appendChild(pato);


    pato.style.left = `${getRandomInt(canvas.offsetWidth - 250)}px`;
    pato.style.top = `${canvas.offsetHeight - 220}px`;


    setTimeout((p) => {
        for (const child of document.body.children)
            if (child == p)
                document.body.removeChild(p);
    }, 2500, pato);

    // Cuando acabe la funcion de pato, eliminarlo
    pato.onanimationend = () => document.body.removeChild(pato);

    pato.onclick = () => {
        if (ouch1.paused) ouch1.play();
        else if (ouch2.paused) ouch2.play();
        else if (ouch1.paused) ouch3.play();
        else ouch4.play();

        myScore = score.textContent.split(" ");
        score.textContent = "Score: " + (myScore[1] * 1 + 1);
        document.body.removeChild(pato);


        if (myScore[1] == puntos) {
            valor += 5;
            puntos += 5;
            nivel += 1;
            jugando = false;

            tiempo.textContent = '60:00';
            clearInterval(reloj);
            score.textContent = "Score: 0";

            Ronda1.style.visibility = 'visible';
            Ronda1.classList.add('Ronda1');
            Ronda1.textContent = 'Ronda ' + nivel + ' - Mata ' + valor + ' patos.';

        }

    }
}


function matarPatos() {

    let patos = document.getElementsByClassName("duck");
    for (let pato of patos)
        document.body.removeChild(pato);

    patos = document.getElementsByClassName("duck2");
    for (let pato of patos)
        document.body.removeChild(pato);

}


function disp() {
    if (!jugando) {
        matarPatos();
        return;
    }


    const patos = document.getElementsByClassName("duck");

    for (let pato of patos) {
        let y = pato.offsetTop;
        let x = pato.offsetLeft;

        if (y > canvas.offsetTop + 10) {
            y = y - step;
            pato.style.top = y + "px"; // vertical movment

            if (x < canvas.offsetWidth - 250) {
                x = x + getRandomInt(step2, 1);
                pato.style.left = x + "px"; // horizontal movment
            }
            else
                document.body.removeChild(pato);
        }
        else {
            if (x < canvas.offsetWidth - 250) {
                x = x + step;
                pato.style.left = x + "px"; // horizontal movment
            }
            else
                document.body.removeChild(pato);
        }
    }

    const patosIz = document.getElementsByClassName("duck2");

    for (let pato of patosIz) {
        let y = pato.offsetTop;
        let x = pato.offsetLeft;

        if (y > canvas.offsetTop + 10) {
            y = y - step;
            pato.style.top = y + "px"; // vertical movment

            if (x > canvas.offsetLeft + 250) {
                x = x - step2;
                pato.style.left = x + "px"; // horizontal movment
            }
            else
                document.body.removeChild(pato);
        }
        else {
            if (x > canvas.offsetLeft + 250) {
                x = x - step;
                pato.style.left = x + "px"; // horizontal movment
            }
            else
                document.body.removeChild(pato);
        }
    }
}


function timer() {
    disp();
    if (jugando)
        my_time = setTimeout('timer()', 10);
    else
        matarPatos();

    my_time2 = setTimeout('crearPato()', getRandomInt(1500, 500));
}

function inicio() {
    puntos = 4;
    valor = 5;
    nivel = 1;
    Final.style.visibility = 'hidden';
    Final.classList.remove('gameOver');
    Final.textContent = '';
    matarPatos();
    tiempo.textContent = '60:00';
    Ronda();
}

function Empezar() {
    pararMusica.addEventListener("click", pausaMusica);
    jugando = true;
    start.style.display = "none";
    musica.loop = true;
    musica.play();
    Ronda();

}

function ComenzarRonda() {
    Ronda1.style.visibility = 'hidden';
    Ronda1.classList.remove('Ronda1');
    score.textContent = "Score: 0";

    matarPatos();

    jugando = true;
    setTimeout(() => {
        timer();
    }, 500);
    setTimeout(() => {
        iniciarReloj();
    }, 1000);

}


function Ronda() {
    Ronda1.classList.add('Ronda1');
    Ronda1.style.visibility = 'visible';
    Ronda1.textContent = 'Ronda ' + nivel + ' - Mata ' + valor + ' patos.';


}


function iniciarReloj() {

    console.log("Iniciada!");
    reloj = setInterval(() => {
        const array = tiempo.textContent.split(":");

        if (array[1] == 0 && array[0] == 0) {
            jugando = false;
            matarPatos();
            Final.style.visibility = 'visible';
            Final.classList.add('gameOver');
            Final.textContent = 'PERDISTE!!';
            tiempo.textContent = '60:00';
            setTimeout(() => {
                clearInterval(reloj);
                inicio();
            }, 2000);
        } else
            if ((array[1] * 1) - 1 < 0) {
                array[1] = "59";
                if ((array[0] * 1) - 1 < 0) {
                    array[0] = "59";
                }
                else ((array[0] * 1) - 1) < 10 ? array[0] = "0" + ((array[0] * 1) - 1) : array[0] = ((array[0] * 1) - 1);
            }
            else ((array[1] * 1) - 1) < 10 ? array[1] = "0" + ((array[1] * 1) - 1) : array[1] = ((array[1] * 1) - 1);
        tiempo.textContent = array.join(":");
    }, 15);
}

function pausaMusica(){
    if(musica.loop==true){
        musica.loop = false;
        musica.pause();
        pararMusica.src = 'img/soundNO.png';
    }else {
        musica.loop = true;
        musica.play();
        pararMusica.src = 'img/sound.png';

    }
    
}


sound1.volume = 0.2;
sound2.volume = 0.2;
sound3.volume = 0.2;
sound4.volume = 0.2;
musica.volume = 0.35;
start.addEventListener("click", Empezar);



