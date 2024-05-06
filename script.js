import { preguntas_faciles } from './preguntas_faciles.js';
const initialCount = 61;
let count = initialCount;
// let timerPause = false;
let timerInterval;

document.addEventListener("DOMContentLoaded", function() {
    const startButton = document.getElementById('startButton');
    const questionElement = document.getElementById('question');
    const collapseElement = document.getElementById('collapseWidthExample');
    const answerButtons = document.querySelectorAll('.answer-btn');

    // Ocultar la pregunta inicial al cargar la página
    questionElement.style.display = 'none';

    // Manejador de eventos para el botón "Jugar"
    startButton.addEventListener('click', startGame);

    function startGame() {
        // Ocultar la sección de introducción y mostrar la sección del juego y la pregunta
        document.getElementById('introduction').style.display = 'none';
        document.getElementById('game').style.display = 'block';
        questionElement.style.display = 'block';
        // Iniciar el juego
        collapseElement.classList.add('show');
        // Iniciar el temporizador después de que comience el juego
        initGame();
    }

    function initGame() {
        stopTimer()
        count = initialCount;
        // Eliminar esta línea de inicio del temporizador aquí
        // timerInterval = setInterval(updateTimer, 1000);
        startTimer();
        resetTimerAnimation();
    }

    // Función para iniciar el temporizador
    function startTimer() {
        // Iniciar el temporizador solo cuando se inicie el juego
        timerInterval = setInterval(updateTimer, 1000);
        updateTimer();
    }

    function updateTimer() {
        count--;

        // Actualizar el elemento HTML del temporizador
        const timerCount = document.querySelector('.timer .count');
        timerCount.textContent = count;

        // Reiniciar la animación del temporizador
        document.querySelectorAll('.timer-lt, .timer-rt').forEach(timer => timer.classList.remove('timer-paused'));

        // Verificar si el contador es menor o igual a 30
        if (count <= 30) {
            // Agregar la clase de advertencia para el parpadeo en rojo
            document.querySelectorAll('.timer-lt, .timer-rt').forEach(timer => timer.classList.add('timer-lt-warning', 'timer-rt-warning'));
        } else {
            // Quitar la clase de advertencia para detener el parpadeo en rojo
            document.querySelectorAll('.timer-lt, .timer-rt').forEach(timer => timer.classList.remove('timer-lt-warning', 'timer-rt-warning'));
        }

        // Verificar si el contador llega a 0
        if (count <= 0) {
            gameOver(); // Llamar a la función gameOver
        }
    }


    function stopTimer() {
        clearInterval(timerInterval);
        document.querySelectorAll('.timer-lt, .timer-rt').forEach(timer => timer.classList.add('timer-paused'));
    }



    // Función para manejar el final del juego
    function gameOver() {
        document.querySelectorAll('.answer-btn').forEach(button => button.style.pointerEvents = "none");
        document.getElementById('game').style.display = 'none';
        document.getElementById('gameOver').style.display = 'block';
        stopTimer();
        // Aquí puedes agregar cualquier lógica adicional para el final del juego
    }

    function resetTimerAnimation() {
    const timerContainer = document.querySelector('.circle-timer');
    timerContainer.innerHTML = timerContainer.innerHTML;
}
    // Comodin público
// // Función para generar un porcentaje aleatorio entre 0 y 100
const comodinPublico = document.getElementById('comodin-publico-btn')
const comodinPublicoChart = document.getElementById('comodin-publico-chart')

function getRandomPercentage() {
    return Math.floor(Math.random() * 101);
}

comodinPublico.addEventListener('click', () => {
    comodinPublicoChart.style.display = 'block'
    // comodinPublico.disabled = true
});

    const porcentajes = []

// Obtener todas las barras
const bars = document.querySelectorAll('.bar');

// Aplicar porcentajes aleatorios a cada barra y agregar una clase para iniciar la animación
bars.forEach((bar, index) => {
    const randomPercentage = getRandomPercentage();
    porcentajes.push(randomPercentage)
    bar.style.height = `${randomPercentage}%`;

    // Agregar una clase con un retraso diferente para cada barra
    setTimeout(() => {
        bar.classList.add('animate');
        
        // Remover la clase 'animate' después de 5 segundos (5000 milisegundos)
        setTimeout(() => {
            bar.style.animation = 'none';
        }, 5000);
    }, index * 100); // El retraso aumenta con el índice para que las animaciones comiencen en momentos diferentes
});

console.log(porcentajes)
// Función para mostrar la respuesta correcta en el gráfico de barras
// Función para mostrar la respuesta correcta en el gráfico de barras
function mostrarRespuestaCorrecta() {
    const preguntaActual = preguntasMostradas[preguntasMostradas.length - 1];
    const respuestaCorrecta = preguntaActual.respuestaCorrecta;

    // Definir el porcentaje para la respuesta correcta (por ejemplo, 70%)
    const porcentajeCorrecto = 70;

    // Generar porcentajes aleatorios para las respuestas incorrectas
    const porcentajesIncorrectos = generarPorcentajesIncorrectos();

    // Asignar el porcentaje más alto a la respuesta correcta
    bars[respuestaCorrecta.charCodeAt(0) - 65].style.height = `${porcentajeCorrecto}%`;

    // Asignar porcentajes aleatorios a las respuestas incorrectas
    bars.forEach((bar, index) => {
        if (index !== respuestaCorrecta.charCodeAt(0) - 65) {
            const porcentajeIncorrecto = porcentajesIncorrectos.pop();
            bar.style.height = `${porcentajeIncorrecto}%`;
        }
    });
}


// Función para generar porcentajes aleatorios para las respuestas incorrectas
function generarPorcentajesIncorrectos() {
    const porcentajes = [];
    const cantidadIncorrectas = bars.length - 1; // Excluyendo la respuesta correcta
    let porcentajeRestante = 100; // Iniciar con el 100% disponible

    // Generar porcentajes aleatorios para cada respuesta incorrecta
    for (let i = 0; i < cantidadIncorrectas; i++) {
        // Generar un porcentaje aleatorio entre 0 y el porcentaje restante
        const porcentaje = Math.floor(Math.random() * porcentajeRestante);

        // Añadir el porcentaje generado al arreglo
        porcentajes.push(porcentaje);

        // Restar el porcentaje generado al porcentaje restante
        porcentajeRestante -= porcentaje;
    }

    // Agregar el porcentaje restante al último elemento del arreglo
    porcentajes.push(porcentajeRestante);

    // Mezclar aleatoriamente los porcentajes en el arreglo
    porcentajes.sort(() => Math.random() - 0.5);

    return porcentajes;
}
    // Función para mostrar una pregunta aleatoria
    let preguntaActual ;
    let preguntasMostradas = []
    function displayQuestion() {
        

        // Filtrar las preguntas que aún no se han mostrado
        const preguntasDisponibles = preguntas_faciles.filter(pregunta => !preguntasMostradas.includes(pregunta));

        if (preguntasDisponibles.length === 0) {
            // Si todas las preguntas se han mostrado, puedes mostrar un mensaje o realizar alguna acción aquí
            return;
        }

        // Seleccionar una pregunta aleatoria de las disponibles
        const randomIndex = Math.floor(Math.random() * preguntasDisponibles.length);
        preguntaActual = preguntasDisponibles[randomIndex]
        const question = preguntaActual;

        // Mostrar la pregunta
        document.getElementById("question").textContent = question.pregunta;

        // Mostrar las respuestas
        const answerButtons = document.querySelectorAll(".answer-btn");
        answerButtons.forEach(button => button.style.display = 'inline-block');
        question.respuestas.forEach((respuesta, index) => {
            const button = answerButtons[index];
            button.textContent = respuesta;
            button.style.pointerEvents = "auto";
            button.classList.remove("correct-answer", "incorrect-answer");

            button.addEventListener("click", () => checkAnswer(respuesta, question.respuestaCorrecta));
        });
        // Agregar la pregunta mostrada al registro
        preguntasMostradas.push(question);
        initGame()
        mostrarRespuestaCorrecta();
    }
    let respuestasCorrectas = 0;
    // Función para verificar la respuesta seleccionada
    function checkAnswer(selectedAnswer, respuestaCorrecta) {

        stopTimer();
        const answerButtons = document.querySelectorAll(".answer-btn");

        answerButtons.forEach(button => {
            if (button.textContent.trim() === respuestaCorrecta) {
                if (selectedAnswer === respuestaCorrecta) {
                    button.classList.add("correct-answer");
                    respuestasCorrectas++
                    actualizarPremios(respuestasCorrectas);
                    setTimeout(() => {
                        displayQuestion(); // Mostrar la siguiente pregunta después de 1 segundo
                    }, 2000);
                } else {
                    button.classList.add("correct-answer");
                }
            } else {
                if (button.textContent.trim() === selectedAnswer) {
                    button.classList.add("incorrect-answer");
                    gameOver()
                }
            }
            button.style.pointerEvents = "none";

        });

        if (selectedAnswer === respuestaCorrecta) {
            // Lógica adicional para respuesta correcta
        } else {
            // Lógica adicional para respuesta incorrecta
        }
    }
    // Llamar a la función displayQuestion para mostrar la pregunta inicial

    displayQuestion();

    function actualizarPremios(preguntasCorrectas) {
        const listaPremios = document.querySelectorAll('.list-group-item');
        const numPremios = listaPremios.length;

        // Invierte el orden de los elementos de la lista
        const reversedPremios = Array.from(listaPremios).reverse();

        // Recorre todos los elementos de la lista de premios
        reversedPremios.forEach((premio, index) => {
            // Si el índice es menor que el número de preguntas correctas, se cambia el color a verde
            if (index < preguntasCorrectas) {
                premio.classList.remove('bg-warning-subtle');
                premio.classList.add('bg-success');
            } else {
                // Si no, se cambia el color a rojo
                premio.classList.remove('bg-success');
                premio.classList.add('bg-warning-subtle');
            }
        });
    }

    // Agregar un event listener al botón del comodín del 50%
document.querySelector('.comodin-50').addEventListener('click', usarComodin50);

// Encuentra la respuesta correcta en el array de preguntas_faciles
const respuestaCorrecta = preguntas_faciles.map(pregunta => pregunta.respuestaCorrecta);

console.log(respuestaCorrecta)
// Función para manejar el uso del comodín del 50%

function usarComodin50() {
    const answerButtons = document.querySelectorAll('.answer-btn');
    const preguntaActual = preguntasMostradas[preguntasMostradas.length - 1]
    const incorrectAnswers = preguntaActual.respuestas.filter(respuesta => respuesta !== preguntaActual.respuestaCorrecta); // Filtrar las respuestas incorrectas

    let respuestasEliminadas = 0;

    if (incorrectAnswers.length < 2) {
        return;
    }

    
    console.log('Respuesta correcta:', preguntaActual.respuestaCorrecta);
    console.log('Respuestas incorrectas:', incorrectAnswers);

    const correctIndex = preguntaActual.respuestas.findIndex(respuesta => respuesta === preguntaActual.respuestaCorrecta)
    const randomIndexes = getRandomIndexes(incorrectAnswers.length, 2, correctIndex);
    randomIndexes.forEach(index => {
        answerButtons[index].style.display = 'none';
        respuestasEliminadas++;
    });  
    const comodinButton = document.getElementById('btn-comodin')
    comodinButton.disabled = true
}

// Función para obtener índices aleatorios
// Función para obtener índices aleatorios excluyendo un índice específico
function getRandomIndexes(maxRange, count, excludeIndex) {
    const indexes = [];
    while (indexes.length < count) {
        const randomIndex = Math.floor(Math.random() * maxRange);
        if (randomIndex !== excludeIndex && !indexes.includes(randomIndex)) {
            indexes.push(randomIndex);
        }
    }
    return indexes;
}


// SmartPhone comodin llamadas

const canvasContainer = document.getElementById('canvas-container');
const llamarBtn = document.getElementById('llamar-btn')
const buttonCloseCanvas = document.getElementById('close-btn');

llamarBtn.addEventListener('click', () => {
    canvasContainer.style.display = 'flex';
    stopTimer()
});

buttonCloseCanvas.addEventListener('click', () => {
    canvasContainer.style.display = 'none';
    startTimer()
});

const llamarBtns = document.querySelectorAll('.btn-llamar');
const speechBubble = document.getElementById('speech-bubble');
const respuestaCorrectaSpan = document.getElementById('respuesta-correcta');

llamarBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Obtener la respuesta correcta asociada al botón
    const preguntaActual = preguntasMostradas[preguntasMostradas.length - 1]
    const respuestaCorrecta = preguntaActual.respuestaCorrecta; // Implementa esta función según tu lógica
    
    // Mostrar el bocadillo con la respuesta correcta
    mostrarBocadillo(respuestaCorrecta);
    
    // sintetizar voz para leer la respuesta correcta 
    hablar("La respuesta correcta creo que es ." + respuestaCorrecta +". y sino me comes toda la polla jajaja")

    canvasContainer.style.display = 'none'
    
    const comodinLlamada = document.getElementById('llamar-btn')
    comodinLlamada.disabled = true
    startTimer()
  });
});
// Mostrar texto comodin llamada
function mostrarBocadillo(respuestaCorrecta) {
  // Mostrar el bocadillo con la respuesta correcta
  respuestaCorrectaSpan.textContent = respuestaCorrecta;
  speechBubble.classList.add('show');

  // Ocultar el bocadillo después de 3 segundos
  setTimeout(() => {
    speechBubble.classList.remove('show');
  }, 10000); // 3 segundos (3000 milisegundos)
}

function hablar(texto) {
    const synth = window.speechSynthesis
    const mensaje = new SpeechSynthesisUtterance(texto)
    synth.speak(mensaje)
}











// Llamar a la función para mostrar la respuesta correcta en el gráfico


});
