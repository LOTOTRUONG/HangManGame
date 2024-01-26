
let playing = false;
const gridContainer = document.getElementById("gridContainer");
const startButton =   document.getElementById("idStartBtn");
const titleChoose = document.getElementById("titleChoose");

//function start game 
function startGame(){
  startButton.hidden = "true";
  titleChoose.style.display = "flex";
  gridContainer.style.display = "grid";
  makeGrid(3,3);

}


//show card
const images = ["/assets/img/icon/animal.png", "/assets/img/icon/clothe.png", "/assets/img/icon/color.png", "/assets/img/icon/country.png", "/assets/img/icon/food.png", "/assets/img/icon/home.png", "/assets/img/icon/job.png", "/assets/img/icon/music.png", "/assets/img/icon/transport.png"];
const texts = ["Animals","Clothes", "Colors", "Countries", "Foods", "Home", "Jobs", "Music", "Transports"];

let currentIndex = 0;

function makeGrid(rows, cols){
  gridContainer.style.setProperty('--grid-rows', rows);
  gridContainer.style.setProperty('--grid-cols', cols);
  for(let valueCell = 0; valueCell <(rows*cols); valueCell++){
    //create grid item
    let gridItem = document.createElement("div");
    gridItem.className = "grid__item";

    gridItem.addEventListener("click", function(){
      gridContainer.style.display = "none";
      titleChoose.style.display = "none";

    })

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
     // Append the grid item to the background container
     gridContainer.appendChild(gridItem);
  }
};


let option = {
  Animals: ['Dog', 'Cow', 'Cat', 'Horse', 'Donkey', 'Tiger', 'Lion', 'Panther', 'Leopard', 'Cheetah', 'Bear', 'Elephant', 'Polarbear', 'Turtle', 'Tortoise', 'Crocodile', 'Rabbit', 'Porcupine', 'Hare', 'Hen', 'Pigeon', 'Albatross', 'Crow', 'Fish', 'Dolphin', 'Frog', 'Whale', 'Alligator', 'Eagle', 'squirrel', 'Ostrich', 'Fox', 'Goat', 'Jackal', 'Emu', 'Armadillo', 'Eel', 'Goose'], 
  Clothes: ['Shirt','Hat','Dress', 'Tank top','Jumper'],
  Colors: ['Red', 'Violet', 'Blue', 'Green', 'Indigo', 'Orange', 'Yellow', 'white', 'Violet', 'Brown', 'Aqua', 'Black', 'Cyan', 'Purple'],
  Countries: ['India', 'Hungary', 'Kyrgyzstan', 'Switzerland', 'Zimbabwe', 'Dominica', 'Chad', 'France', 'Greece', 'Spain'],
  Foods: [],
  Home: [],
  Jobs: [],
  Music: [],
  Transports: [],
}

//count 
let winCount = 0; 
let count = 0;
let chosenWord = "";

//Display option buttons
const displayOption = () => {
  
}