const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');
let start = document.getElementById('start-screen');
let game = document.getElementById('game');
let backToTen = document.getElementById('back-to-ten');

let players = [];
let round = 0;

//This function dynamically adds the player to the list, and stores the player name into the array
function addPlayer() {
    if(inputBox.value === '') {
        alert("Please enter a player");
    } else {
        //creates a new list item
        let li = document.createElement("li");
        listContainer.appendChild(li);

        //add the p tag into the list item to store their name
        let p = document.createElement("p");
        p.innerHTML=inputBox.value;
        li.appendChild(p);

        //adds the delete button as a span
        let span=document.createElement("span");
        span.innerHTML="\u00d7";
        li.appendChild(span);

        //add the player to the array
        players.push({
            name: inputBox.value,
            score: 0
        });
        
        //reset the text field
        inputBox.value="";
    }
}

// this event listener is so that the user can just press enter 
// instead of having to press the add button to add a player everytime
inputBox.addEventListener("keydown", function validate(e) {
    if (e.key === "Enter") {
        addPlayer();
    }
});


//This function is used to delete a player from the list. Has to delete the HTML element and remove them from the array
listContainer.addEventListener("click", function(e) {
    if(e.target.tagName === "SPAN") {
        //need to find which name to remove from the list, then use splice to remove it from the list
        let playerName = e.target.parentElement.querySelector('p').innerHTML;
        
        for (let i = 0; i < players.length; i++) {
            if (players[i].name === playerName) {                
                //for some reason if index is 0, splice doesnt remove the first object from the array
                //I could be dumb, but this is a work around I found
                if (i==0) {
                    players.shift();
                } else {
                    players.splice(i, i);
                }
            }//end inner if
        }//end for

        //remove the elment from the list
        e.target.parentElement.remove();
    }
})


//This function will 'start' the game, Checks to see if the player count is at least 2 or more.
//If not, itll prompt saying to enter at least 2 players
//To start the game, it sets the starting box where the user adds players to hidden, and sets the game element
//to show. It then calls generateGame(), which will generate the first round.
function startGame() {
    if (players.length > -1) {
        start.style = "display: none";
        game.style="display: show"
        generateGame();
    } else {
        alert("Enter at least 2 players");
    } 
}


//This will set the general framework for the rest of the game to take place. dynamically creates player cards based on the entered players, and creats elements with respective names to the players for manipulation later.
//
//Im sure this isnt a propper way of doing this, as when you scale it can become pretty demanding, but for the game and the size of players that you will generally have its fine and not very worrysome.
function generateGame() {
    round++;
    //creates the title menu that will display the round count, card count, and next round button.
     const title = document.createElement("div");
     title.innerHTML='<div class="title"><h2>Oh Hell</h2><h3 id="roundCount">Round ' +  round + '</h3><h3 id="cardCount">Card Count: ' + (1 + Math.abs((10 - round ))) + '</h3><button class="next-round" onclick="nextRound()">Next Round</button></div>'
     game.appendChild(title)

     //creates the player cards
    for (let i = 0; i <players.length; i++) {
        const playerCard = document.createElement("div");
        playerCard.innerHTML='<div class="player"><p>' + players[i].name+ '</p><div class="line-wrapper"><p>Score- </p><p id="score' + players[i].name + '">' + players[i].score + '</p></div><div class="line-wrapper"><p>Bet- </p><div class="guess"><input value="0" type="number" id="bet' + players[i].name + '"></div></div><div class="line-wrapper"><p>Won- </p><div class="guess"><input value="0" type="number" id="won' + players[i].name + '"></div></div></div>'

        game.appendChild(playerCard);
    }
}

//This function reads the data entered into the input fields for what the players bet and what they won, then dictates what to do from there.
//This was kinda tricky to implement, as it is dynamic and largely depends on the 'players' name property.
function nextRound() {

    if (round == 19 ) {
        alert("Game Over");
        return;
    }
    round++;

    //changes the round count 
    let roundCount = document.getElementById("roundCount");
    roundCount.innerHTML = "Round " + (round);

    //changes the card count
    let cardCount = document.getElementById("cardCount");
    cardCount.innerHTML = "Card Count: " + (1 + Math.abs((10 - round)));

    //This changes the score for each player
    for (let i=0; i<players.length; i++) {
        let bet = parseInt(document.getElementById("bet" + players[i].name).value, 10);
        let won = parseInt(document.getElementById("won" + players[i].name).value, 10);
        let score = document.getElementById("score" + players[i].name);
 
        if (bet - won == 0) {
            players[i].score = players[i].score + 10 + bet;
            score.innerHTML = players[i].score;
        } else if (bet - won > 0) {
            players[i].score = players[i].score - (bet - won)
            score.innerHTML = players[i].score;
        } else if (bet - won < 0) {
            players[i].score = players[i].score + (bet - won)
            score.innerHTML = players[i].score;
            
        } else {
            console.log("computation error");
        }        
    }//end for loop
}

