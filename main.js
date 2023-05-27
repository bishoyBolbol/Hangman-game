//letters
const letters= "abcdefghijklmnopqrstuvwxyz";

//get array from letters
let lettersArray = Array.from(letters);

//select letters container
let lettersContainer= document.querySelector(".letters");

//generate letters
lettersArray.forEach(letter=>{
    //create span
    let span = document.createElement("span")

    //create letter text node
    let theLetter = document.createTextNode(letter)

    //append the letter to span
    span.appendChild(theLetter)
    
    //add class on span
    span.className='letter-box'

    //append span to the letters container
    lettersContainer.appendChild(span);
});

//object of words + category
const words = {
    Programming:["php", "javascript", "go", "scala", "fortran", "r", "mysql", "python"],
    movies: ["prestige", "Inception", "parasite", "Interstellar", "Whiplash", "Memento", "Coco", "Up"],
    people: ["Albert Einstein", "Hitchcock", "Alexander", "Cleopatra", "Mahatma Ghandi"],
    countries: ["Syria", "Palestine", "Yemen", "Egypt" , "Bahrain" ,"Qatar"]
}

//get random property
let allKeys = Object.keys(words);

//random number depend on keys length
let randomPropNumber= Math.floor(Math.random() * allKeys.length);

//category
let randomPropName = allKeys[randomPropNumber];

//category words
let randomPropValue = words[randomPropName];

//random number depend on words
let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);

//the choosen word
let randomValueValue = randomPropValue[randomValueNumber];

//set category info 
document.querySelector(".game-info .category span").innerHTML= randomPropName;

//select letters guess container 
let lettersGuessContainer = document.querySelector(".letters-guess");

//convert choosen word to array
let lettersAndSpace= Array.from(randomValueValue);

//create spans depend on word
lettersAndSpace.forEach(letter=>{
    //create empty span
    let emptySpan = document.createElement("span");

    //if letter is space
    if(letter === " "){
        
        //add class to span
        emptySpan.className = "has-space"
    }

    //append span to letterGuesscontainer
    lettersGuessContainer.appendChild(emptySpan)
});

//select guess spans
let guessSpans =document.querySelectorAll(".letters-guess span")


//set wrong attemts
let wrongAttempts = 0;

//select the draw element
let theDraw = document.querySelector(".hangman-draw")

//handle clicing on letters

document.addEventListener("click",(e)=>{

    //set status
    let theStatus = false;

    if(e.target.className === "letter-box"){

        e.target.classList.add("clicked")

        //get clicked letter
        let theClickedLetter = e.target.innerHTML.toLowerCase();
        
        //the Chosen Word
        let theChoosenWord = Array.from(randomValueValue.toLowerCase())

        theChoosenWord.forEach((wordLetter, wordIndex)=>{
            //if the clickedLetter equal one of the choosen letter
            if(theClickedLetter === wordLetter){

                //set status to correct
                theStatus = true;

                //loop on all guessspans
                guessSpans.forEach((span,spanIndex)=>{

                    if(wordIndex === spanIndex) {

                        span.innerHTML = theClickedLetter

                    }
                })
            }
        })

        //outside loop
        //if letter is wrong
        if(theStatus !== true){

            //increase wrong attemts
            wrongAttempts++;

            //add class wrong on the draw element
            theDraw.classList.add(`wrong-${wrongAttempts}`)

            //play fail sound
            document.getElementById("fail").play();

            if(wrongAttempts === 8){

                endGame();

                lettersContainer.classList.add("finished")
            }

        }else{

                //play sucsess sound
            document.getElementById("sucsess").play();

        }
    }
})

//end game function

function endGame(){

//create popup div
let div = document.createElement("div");

//create text
let divText = document.createTextNode(`Game over , the word is ${randomValueValue}`);

//append text to div
div.appendChild(divText);

//add class on div
div.className = 'popup'

//append to body
document.body.appendChild(div);
}