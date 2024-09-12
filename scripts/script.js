const words=['camion','laptop','futbol','sillon','camisa']

let selectedWord=''
let hiddenWordArray=[];
let remainingAttemps=5;
let guessedLetters=[];
let wrongGuesses=0;

const hangmanImage=document.getElementById('hangman-image');
const hiddenWordElement=document.getElementById('hidden-word');
const letterInput=document.getElementById('letter-input');
const guessButton=document.getElementById('guess-button');
const remainingAttempsElement=document.getElementById('remaining-attemps');
const messageElement=document.getElementById('message');
const restartButton=document.getElementById('restart-button');

function startGame() {
    selectedWord=words[Math.floor(Math.random()*words.length)];
    console.log(`Palabra seleccionada: `,selectedWord)
//Inicializando la palabra oculta con guiones
    hiddenWordArray= Array(selectedWord.length).fill('_');
    hiddenWordElement.textContent=hiddenWordArray.join('');
    remainingAttemps=5;
    wordsGuesses=0;
    guessedLetters=[];
    hangmanImage.src='/Módulo 02/Juego_Ahorcado/media/hangman0.jpeg'
    remainingAttempsElement.textContent=`Errores restantes: ${remainingAttemps}`;
    messageElement.textContent='';
    letterInput.value='';
    letterInput.focus();
    restartButton.style.display='none'
}

//Funcion para manejar el intento de adivinar la palabra


function guessLetter() {
    const guessedLetter=letterInput.value.toLowerCase();

    if(!guessedLetter || guessedLetter.length !==1 || guessedLetters.includes(guessedLetter)){
        messageElement.textContent='Por favor Ingresa una letra válida';
        letterInput.value='';
        return;
    }
    guessedLetters.push(guessedLetter);
    letterInput.value='';


    //Verificar si la letra está en la palabra
    if (selectedWord.includes(guessedLetter)){
        
        //Actualizamos la palabra oculta

        for (let i = 0; i < selectedWord.length; i++) {
            if(selectedWord[i]===guessedLetter){
                hiddenWordArray[i]=guessedLetter;

            }
            
        }

        hiddenWordElement.textContent=hiddenWordArray.join('');

        //Verificar si se ganó

        if(!hiddenWordArray.includes('_')){
            messageElement.textContent="Felicidades, has ganado";
            restartButton.style.display='inline'
        }
    }else{
        wrongGuesses++;
        remainingAttemps--;
        hangmanImage.src=`/Módulo 02/Juego_Ahorcado/media/hangman${wrongGuesses}.jpeg`;

        remainingAttempsElement.textContent=`Errores restantes: ${remainingAttemps}`;

        //Verificar si he perdido
        if (remainingAttemps===0){
            messageElement.textContent=`Lo siento, has perdido. La palabra correcta era ${selectedWord}`;
        }

    }


}

restartButton.addEventListener("click", startGame);

guessButton.addEventListener("click",guessLetter)

startGame()