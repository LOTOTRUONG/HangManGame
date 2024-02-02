const gridContainer = document.getElementById("gridContainer");
const gameContainer = document.getElementById("gameContainer");
const startButton =   document.getElementById("idStartBtn");
const titleChoose = document.getElementById("titleChoose");
const titleGame = document.getElementById("titleGame");
const resultText = document.getElementById("result-text");
const resultImage = document.getElementById("result-image");
const resetButtons = document.querySelectorAll(".js-reset-btn");

//function start game
function startGame(){
  startButton.hidden = "true";
  titleGame.hidden="true";
  titleChoose.style.display = "flex";
  gridContainer.style.display = "grid";
  makeGrid(3,3);

}


//show card
const images = ["/assets/img/icon/animal.png", "/assets/img/icon/clothe.png", "/assets/img/icon/color.png", "/assets/img/icon/country.png", "/assets/img/icon/food.png", "/assets/img/icon/home.png", "/assets/img/icon/job.png", "/assets/img/icon/music.png", "/assets/img/icon/transport.png"];
const texts = ["Animals","Clothes", "Colors", "Countries", "Foods", "Home", "Jobs", "Music", "Transports"];

let currentIndex = 0;

function makeGrid(rows, cols){
    // Clear existing grid
    gridContainer.innerHTML = '';

  gridContainer.style.setProperty('--grid-rows', rows);
  gridContainer.style.setProperty('--grid-cols', cols);
  for(let valueCell = 0; valueCell <(rows*cols); valueCell++){
    //create grid item
    let gridItem = document.createElement("div");
    gridItem.className = "grid__item flexCenter";

    //Create image element
    let image = document.createElement("img");
    image.src = images[currentIndex %images.length];
    image.alt = "Image ";
    gridItem.appendChild(image);

     // Create text element
     let text = document.createElement("h2");
     text.innerText = texts[currentIndex % texts.length];
      gridItem.appendChild(text);

     currentIndex++;

     //open the HangMan game when click on the gridItem
      gridItem.addEventListener("click", function(){
          handleCategoryClick(text.innerText)

      })
     // Append the grid item to the background container
     gridContainer.appendChild(gridItem);
  }
}


let options= {
  Animals: ['Dog', 'Cow', 'Cat', 'Horse', 'Donkey', 'Tiger', 'Lion', 'Panther', 'Leopard', 'Cheetah', 'Bear', 'Elephant', 'Polarbear', 'Turtle', 'Tortoise', 'Crocodile', 'Rabbit', 'Porcupine', 'Hare', 'Hen', 'Pigeon', 'Albatross', 'Crow', 'Fish', 'Dolphin', 'Frog', 'Whale', 'Alligator', 'Eagle', 'squirrel', 'Ostrich', 'Fox', 'Goat', 'Jackal', 'Emu', 'Armadillo', 'Eel', 'Goose'],
  Clothes: ['Shirt','Hat','Dress', 'Tank top','Jumper'],
  Colors: ['Red', 'Violet', 'Blue', 'Green', 'Indigo', 'Orange', 'Yellow', 'white', 'Violet', 'Brown', 'Aqua', 'Black', 'Cyan', 'Purple'],
  Countries: ['India', 'Hungary', 'Kyrgyzstan', 'Switzerland', 'Zimbabwe', 'Dominica', 'Chad', 'France', 'Greece', 'Spain'],
  Foods: ['Apple', 'Cheese','Eggs', 'Butter', 'Sandwich','Sausage','Bread', 'Hot dog', 'Hamburger', 'Steak', 'Bacon'],
  Home: ['Bedroom', 'Door', 'Kitchen', 'Bathroom', 'Ceiling', 'Cottage', 'Villa', 'Wall', 'Window', 'Chimney','Closet'],
  Jobs: ['Nurse','Scientist','Artist', 'Bookkeeper','Cashier','Dentist','Doctor','Manager', 'Application Developer', 'Auditor'],
  Music: ['Drums', 'Flute','Accordion','Guitar','Clarinet','Saxophone','Harp'],
  Transports: ['Aeroplane', 'Bicycle','Bus','Boat','Motorcycle','Scooter', 'Train', 'Tram', 'Truc'],
}
let chosenWord = "";
function handleCategoryClick(category){
    chosenWord = options[category][Math.floor(Math.random() * options[category].length)];
    chosenWord = chosenWord.toUpperCase();
    gridContainer.style.display = 'none';
    gameContainer.style.display = 'flex';
    titleChoose.style.display ='none';
    openHangmanGame(category,chosenWord);
}


function openHangmanGame(category, word) {
        let winCount = 0;
        let count = 0

        gameContainer.innerHTML = '';

        const hangmanContainer = document.createElement('div');
        hangmanContainer.className = 'hangman-container flexCenter';

        const hangmanImage = document.createElement('img');
            hangmanImage.className = 'hangman-image';
            hangmanImage.src = '/assets/img/game/0.jpg';

        const hangmanTitle = document.createElement('h2');
        hangmanTitle.style.color = 'rgb(201 188 188)'
        hangmanTitle.innerText = `Hangman - ${category}`;

        const hangmanWord = document.createElement('div');
        hangmanWord.className = 'hangman-word';
        hangmanWord.innerHTML = createHiddenWord(word);

    //Create letter buttons
        const letterButtonContainer = document.createElement('div');
        letterButtonContainer.className = 'letter-button-container';
        for (let i = 65; i <= 90; i++) {
            let letterButton = document.createElement("button");
            letterButton.classList.add("letters");
            //number to ASCII[A-Z]
            letterButton.innerText = String.fromCharCode(i);
            //character button click
            letterButton.addEventListener('click', () => {
                let charArray = word.split("");
                let dashes = hangmanWord.querySelectorAll(".dashes");
                //if array contains clicked value replace the matched dash with letter
                if (charArray.includes(letterButton.innerText)) {
                    charArray.forEach((char, index) => {
                        //if the character in the array is same as clicked button
                        if (char === letterButton.innerText) {
                            dashes[index].innerText = char;
                            //increment counter
                            winCount += 1;
                            if (winCount === charArray.length){
                                showMessage();
                                resultImage.src ='/assets/img/icon/win.png';
                                resultText.innerHTML = `<h2>You Win! The word was <span>${word}</span></h2>`;
                                //block all the button
                                disableLetterButtons();
                            }
                        }
                    });
                } else {
                    count += 1;
                    //for drawing man
                    drawMan(count);
                    //count = 6 ==> lose
                    if (count === 6) {
                        disableLetterButtons();
                        showMessage();
                        resultImage.src ='/assets/img/icon/lose.png';
                        resultText.innerHTML = `<h2>You lose! The word was <span>${word}</span></h2>`;
                    }
                }
                letterButton.disabled = true;
            });
            letterButtonContainer.appendChild(letterButton);
        }
        hangmanContainer.appendChild(hangmanTitle);
        hangmanContainer.appendChild(hangmanWord);
        hangmanContainer.appendChild(letterButtonContainer);
        hangmanContainer.appendChild(hangmanImage);

        gameContainer.appendChild(hangmanContainer);

    function disableLetterButtons() {
        const letterButtons = document.querySelectorAll(".letters");
        letterButtons.forEach(button => {
            button.disabled = true;
        });
    }

    const drawMan = (count) => {
        switch (count) {
            case 1:
                hangmanImage.src = '/assets/img/game/1.jpg';
                break;
            case 2:
                hangmanImage.src = '/assets/img/game/2.jpg';
                break;
            case 3:
                hangmanImage.src = '/assets/img/game/3.jpg';
                break;
            case 4:
                hangmanImage.src = '/assets/img/game/4.jpg';
                break;
            case 5:
                hangmanImage.src = '/assets/img/game/5.jpg';
                break;
            case 6:
                hangmanImage.src = '/assets/img/game/6.jpg';
                break;
            default:
                break;
        }
    }
}
function createHiddenWord(word) {
    return word
        .split('')
        .map(char => (char !== ' ' ? `<span class="dashes">_</span>` : ' '))
        .join(' ')
        .trim();
}

//show message when losing or wining
const modal = document.querySelector('.js-modal');
const modalClose = document.querySelector('.js-modal-close');
const modalContainer = document.querySelector('.js-modal-container');
function showMessage() {
    modal.classList.add('open');
}

function hideMessage() {
    modal.classList.remove('open');
}

modalClose.addEventListener('click', hideMessage);
modalContainer.addEventListener('click', function (event) {
    event.stopPropagation();
});

//reset Game
for (const resetBtn of resetButtons) {
    resetBtn.addEventListener('click', function (event) {
        event.preventDefault();
        resetGame();
    });
}

    function resetGame(){
        hideMessage();
        gameContainer.innerHTML = '';
        titleChoose.style.display = 'flex';
        gridContainer.style.display = 'grid';

        makeGrid(3, 3);
    }