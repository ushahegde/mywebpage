//const numImages = imageArray.length;
 numItems=4;
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

showquiz(numItems);

 function showquiz(numItems)
{
     imageArray = ["images/cat.png","images/dog.png","images/elephant.png","images/bird.png","images/crocodile.png", "images/lion.png","images/tiger.png","images/flemingo.png","images/cow.png","images/octopus.png","images/giraffe.png","images/bee.png","images/penguin.png","images/camel.png"];
     const container = document.getElementById("img-grid");
     const divArray=[]; 
      n = 0;
     shuffleArray(imageArray);
     
     
     
     for(i=0;i<numItems/2;i++)
     {
        
        const image = imageArray.pop();
     	  
     	 
     	      	 div1 = createImageCard(image);
     	 div2 = createImageCard(image);
             divArray[n++]=div1;
        divArray[n++]=div2;
     //   container.appendChild(div1);
       // container.appendChild(div2);
      }
      shuffleArray(divArray);
      divArray.forEach(d=>container.appendChild(d));
      
       /*to adjust grid len and width*/
     const count = container.children.length;
    // const cols = Math.ceil(Math.sqrt(count));
    // container.style.gridTemplateColumns = `repeat(${cols}, minmax(150px,1fr))`;
     startTimer();
      
 }
 
 function createImageCard(pict){
       div=document.createElement("div");
      div.classList.add("card");
      divInner = document.createElement("div");
      divInner.classList.add("card-inner");
       divFront = document.createElement("div");
      divFront.classList.add("card-front");
      divBack = document.createElement("div");
       
     divBack.classList.add("card-back");
      image = document.createElement("img"); 
     	 image.setAttribute("src",pict);//"images/cat.png");
     	 image.setAttribute("height", "100");
        image.setAttribute("width", "100");
        
        imageName = pict.replace("images/","");
       // console.log("imageNme is"+imageName);
        image.setAttribute("alt", imageName); 
        
        
        image.classList.add('card-img');
        divBack.appendChild(image);
        
        divInner.appendChild(divFront);
        divInner.appendChild(divBack);
        div.appendChild(divInner);
        div.addEventListener("click",function(){
          //  this.parentElement.classList.toggle("whiteBg");
            if(lockBoard)
               return;
            if(this.classList.contains("flipped"))
               return;   
            this.classList.add("flipped");
            
            openCards.push(this);
            if(openCards.length==2){
                lockBoard = true;
                if(matchCards())
                   // console.log("cards match");
                    clearOpenCards();
                else
                 //console.log("cards dont match");
                 hideOpenCards();    
            }  
        	//this.classList.toggle('reveal');*/
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
     state.moves+=2;
     movesEl.textContent = `Moves : ${state.moves}`;
     const t1 = openCards[0].getElementsByClassName("card-back")[0].childNodes[0].src;
     const t2  = openCards[1].getElementsByClassName("card-back")[0].childNodes[0].src;; 
     return t1==t2;
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
    if(clearedCards.length==numItems){
        /*alert("You have won");
        numItems+=2;*/
        //showResults("Level Completed!!!");
          const timeLeft = state.timeLeft;
          state.score +=50;
          clearInterval(state.timer);
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
    container = document.getElementById("img-grid");
    container.replaceChildren();
    clearedCards.length=0;
    openCards.length=0;
    state.moves=0;
    movesEl.textContent = "Moves : 0";
    resetTimer();
}

 function startTimer() {
    resetTimer();
    state.timeLeft = totalTime;
    state.timer = setInterval(() => {
    state.timeLeft--;

      // Update text
      document.getElementById("timer").textContent = `Time : ${state.timeLeft}`;

    

      if (state.timeLeft <= 0) {
        clearInterval(timer);
        showStars(0);
       // showResults("Time is up. Try again.");
         showDialog(
      "Time's Up!",
      "Try again to beat the level.",
      false
    );
      }
    }, 1000);
  }
  
  function resetTimer() {
    if(timer!=null)
        clearInterval(timer);
    timeLeft = totalTime;
    document.getElementById("timer").textContent = totalTime;
   /* document.getElementById("progress").style.width = "100%";
    document.getElementById("progress").style.background = "#4caf50";*/
  }

  function endRound() {
    alert("Time's up! Flip cards back or end game.");
    // Hook your memory game logic here
  }
/*function showResults(mesg){
    resultBox.classList.remove("hidden");
    const msgEl = document.getElementById("message");
    msgEl.textContent=mesg;
    const restartButton = document.getElementById("restartButton");
    restartButton.addEventListener("click",()=>{
        if(timeLeft>0){
        numItems+=2;
        }
    //    console.log("Here in restart event listener");
        resetGame();
        showquiz(numItems);
    });
 
} */

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
     showquiz(numItems);
 } 
 function startNextLevel(){
      closeDialog();
     resetGame();
     numItems+=2;
     totalTime+=10;
     showquiz(numItems);
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
   if(state.moves==numItems){
      showStars(3);
      state.score+=20;
  } else if(state.moves<=(numItems+4)){
      showStars(2);
      state.score+=10;
  } else if(state.timeLeft>=0){
      showStars(1);
 } }
 }
