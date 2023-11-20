const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');
let start = document.getElementById('start-screen');
let game = document.getElementById('game')

let players = [];
let count = 10;

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
            score: 0,
            guess: 0
        });
        
        //reset the text field
        inputBox.value="";
    }
}

// this event listener is so that the user can just press enter 
// instead of having to press add to add a player everytime
inputBox.addEventListener("keydown", function validate(e) {
    if (e.key === "Enter") {
        addPlayer();
    }
});


listContainer.addEventListener("click", function(e) {
    if(e.target.tagName === "SPAN") {
        //need to find which name to remove from the list, then use splice to remove it from the list
        let playerName = e.target.parentElement.querySelector('p').innerHTML;
        
        for (let i = 0; i < players.length; i++) {

            if (players[i].name === playerName) {                
                //for some reason if index is 0, splice doesnt remove the first object from the array
                if (i==0) {
                    players.shift();
                } else {
                    players.splice(i, i);
                }
            }
        }
        //remove the elment from the list
        e.target.parentElement.remove();

        console.log(players);
    }
})

function startGame() {
    start.style = "display: none";
    game.style = "display: show"
}

