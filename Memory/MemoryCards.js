const suits = ['♠', '♥', '♦', '♣'];
const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

const cards = [];

var numCards=6;
// Generate deck
/*for (const suit of suits) {
  for (const rank of ranks) {
    cards.push({
      suit,
      rank,
      color: (suit === '♥' || suit === '♦') ? 'red' : 'black'
    });
  }
}*/
// numItems=4;
  let totalTime = 30; // seconds for memory round
  let timeLeft = totalTime;
  let timer = null;
//const resultBox = document.getElementById("result-box");
  const dialog = document.getElementById("gameDialog");
  const movesEl = document.getElementById("moves");
  openCards=[];
  clearedCards=[];
  const state = {
         moves: 0,
         totalPairs: 8,
         timeLeft: 0,
         timer: null,
         score:0
  };
  var lockBoard = false;
  const containerGrid = document.getElementById("cardGrid");

 const board = document.getElementById('game-board');
 var numSeconds = 30;
 const timeEl = document.getElementById("time");
 const moveEl = document.getElementById("moves");

generateRandomCards(numCards);
/*cards.forEach(card => {

  const cardEl = createCard(card);
  board.appendChild(cardEl);
  /*const cardEl = document.createElement('div');
  cardEl.classList.add('card', card.color);

  cardEl.innerHTML = `
    <div class="top">${card.rank} ${card.suit}</div>
    <div class="center">${card.suit}</div>
    <div class="bottom">${card.rank} ${card.suit}</div>
  `;

  board.appendChild(cardEl);
});*/

function createCard(card) {
  const div = document.createElement('div');

  const color =
    card.suit === '♥' || card.suit === '♦'
      ? 'red'
      : 'black';

  console.log('color is'+color);
  div.className = `card-back`;// ${color}`;

  // Corner labels
  const top = `
    <div class="corner top">
      ${card.rank}<br>${card.suit}
    </div>
  `;

  const bottom = `
    <div class="corner bottom">
      ${card.rank}<br>${card.suit}
    </div>
  `;

  // Middle symbols
  let center = `<div class="center"`;
  let num = card.rank;
  if(!isNaN(num)){
      var style1="";
      if(num==2||num==3)
          style1 = "style='grid-template-columns:1fr;'";
      else if(num==4||num==6)
           style1 = "style='grid-template-columns:repeat(2,1fr);'";
      else
          style1 = "style='grid-template-columns:repeat(3,1fr);'";    
  }
    
  if (!isNaN(card.rank)) { 
    center+=style1+">";
    for (let i = 0; i < card.rank; i++) {
      center += `<span>${card.suit}</span>`;
    }
   
  } else {
    
    center += `><div class="face">${card.rank}</div>`;
  }

  center += `</div>`;

  div.innerHTML = top + center + bottom;

  return div;
}

function generateRandomCards(numCards){
  var n = numCards/2;
  var rankCopy = Array.from(ranks); 
  var cardArray=[];
  shuffle(rankCopy);
  for(i=0;i<n;i++){
       var cardRank = rankCopy.pop();
       const r = randomNumber(4);
       console.log('r is'+r);
       var suitIndex = suits[r];
       var c1  = createMemoryCard(suitIndex, cardRank);
       var c2 =  createMemoryCard(suitIndex, cardRank);
       cardArray.push(c1);
       cardArray.push(c2);
  }
  shuffleArray(cardArray);
  cardArray.forEach(d=>containerGrid.appendChild(d));
  startTimer(numSeconds);
      
  }

 

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    // Generate a random index from 0 to i
    const j = Math.floor(Math.random() * (i + 1));
    // Swap elements at indices i and j
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function createMemoryCard(suit,rank){
      console.log('suit is'+suit);
      div=document.createElement("div");
      div.classList.add("card");
      div.style.perspective ="1000px";
      divInner = document.createElement("div");
      divInner.classList.add("card-inner");
       divFront = document.createElement("div");
      divFront.classList.add("card-front");
     // divBack = document.createElement("div");
       
     var c={suit,rank,color: (suit === '♥' || suit === '♦') ? 'red' : 'black' };
   /*  var c  =  card({
      suit,
      rank,
      color: (suit === '♥' || suit === '♦') ? 'red' : 'black'
     });*/
     divBack = createCard(c);
      divBack.classList.add("card-back");
       divInner.appendChild(divFront);
        divInner.appendChild(divBack);
        div.appendChild(divInner);
        div.addEventListener("click",function(){ 
            if(lockBoard)
               return;
            if(this.classList.contains("flipped"))
               return;   
            state.moves++;   
            movesEl.textContent = `Moves: ${state.moves}`;
            this.classList.add("flipped");
            
            openCards.push(this);
            if(openCards.length==2){
                lockBoard = true;
                if(matchCards()) {
                    state.score+=50;
                    clearOpenCards();
                    if(state.timer!=null){
                        clearTimeout(state.timer);
                    }
                }
                else 
                 hideOpenCards();    
            }   
        	        });
       return div;  
 }
 
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i

    let t = array[i]; array[i] = array[j]; array[j] = t
    //[array[i], array[j]] = [array[j], array[i]];
  }
}
function randomNumber(num){
     return Math.floor(Math.random()*num);
}

function matchCards(){
   //  state.moves+=2;
    // movesEl.textContent = `Moves : ${state.moves}`;
     const t1 = openCards[0].getElementsByClassName("card-back")[0];
     const t2  = openCards[1].getElementsByClassName("card-back")[0];
     if(t1.innerHTML===t2.innerHTML)
     return true;
     else
     return false; 
     //return t1==t2;
}
function hideOpenCards(){
    setTimeout(()=>
   { 
    card1 = openCards.pop()
    card1.classList.remove('flipped');
    card2 = openCards.pop();
    card2.classList.remove('flipped');
    lockBoard = false;
  },500
    );
 
}
function clearOpenCards(){
    setTimeout(()=>
   { card1 = openCards.pop();
    card1.classList.add('clearCard');
    card2 = openCards.pop();
    clearedCards.push(card1);
    card2.classList.add('clearCard');
    clearedCards.push(card2);
    lockBoard = false;
    if(clearedCards.length==numCards){
        /*alert("You have won");
        numItems+=2;*/
        //showResults("Level Completed!!!");
          const timeLeft = state.timeLeft;
          state.score +=50;
          clearTimeout(state.timer);
          addStarsToDialog();
          showDialog(
      "Level Complete!",
      `Your score: ${state.score}`,
      true);
    }
    
  },500
    );
}
function resetGame()
{
    container = document.getElementById("cardGrid");
    container.replaceChildren();
    clearedCards.length=0;
    openCards.length=0;
     state.moves=0;
    movesEl.textContent = "Moves : 0";
    resetTimer();
}

 function startTimer(numSeconds) {
    resetTimer();
    state.timeLeft = totalTime;
    state.timer = setInterval(() => {
    state.timeLeft--;

      // Update text
      timeEl.textContent = `Time : ${state.timeLeft}`;

    

      if (state.timeLeft <= 0) {
        clearTimeout(state.timer);
        showStars(0);
       // showResults("Time is up. Try again.");
         showDialog(
      "Time's Up!",
      "Try again to beat the level.",
      false
    );
      }
    },1000);
  }
  
  function resetTimer() {
    if(timer!=null)
        clearInterval(timer);
    timeLeft = totalTime;
    document.getElementById("time").textContent = "Time:"+totalTime;
   /* document.getElementById("progress").style.width = "100%";
    document.getElementById("progress").style.background = "#4caf50";*/
  }

  function endRound() {
    alert("Time's up! Flip cards back or end game.");
    // Hook your memory game logic here
  }
 

function showDialog(title, message, showNext = false) {
 
  console.log("score is"+state.score);
  document.getElementById("dialogTitle").textContent = title;
  document.getElementById("dialogMessage").textContent = message;

  document.getElementById("dialogNext").style.display =
    showNext ? "inline-block" : "none";

  dialog.showModal();
}

function closeDialog() {
  dialog.close();
}
 
 function restartGame(){
     closeDialog();
     resetGame();
     generateRandomCards(numCards);
  } 
 function startNextLevel(){
      closeDialog();
     resetGame();
     numCards+=2;
     totalTime+=10;
     generateRandomCards(numCards);
 }
 
 function showStars(numStars){
     const imageSource = "images/star.png";
     const imageSourceGray = "images/starGray.png";
     imageEl1 = document.getElementById("image1");
     imageEl2 = document.getElementById("image2");
     imageEl3 = document.getElementById("image3");
     
     imageEl1.src = imageSourceGray;
         imageEl2.src = imageSourceGray;
         imageEl3.src = imageSourceGray;
     
     if(numStars>=1)
            imageEl1.src= imageSource;
          
     if(numStars>=2)
         imageEl2.src = imageSource;
                
     if(numStars==3)
         imageEl3.src = imageSource;        
     
 }
 
 function addStarsToDialog(){
     if(timeLeft<=0)
      showStars(0);
else{
   if(state.moves==numCards){
      showStars(3);
      state.score+=20;
  } else if(state.moves<=(numCards+4)){
      showStars(2);
      state.score+=10;
  } else if(state.timeLeft>=0){
      showStars(1);
 } }
 }




