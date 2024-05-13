
class Quiz {
constructor(questions){
    this.score = 0;
    this.questions =  questions;// TODO change it back to shuffle(questions);
     //  this.totalQuestions = 10;
   
 //   if(this.questions.length<10)
       this.totalQuestions =  questions.length;//10; 
    this.questionIndex = 0;
    this.answeredThisQuestion=false;
 }
isEnded = function() {
    return this.totalQuestions==this.questionIndex;
}
getQuestionIndex = function() {
    return this.questions[this.questionIndex];
}
 guess = function(answer,button) {
	var nextbutton = document.getElementById('nextbutton');
	nextbutton.innerHTML = 'Next';
   var element = document.getElementById("answerIndicator");
    
    if(this.getQuestionIndex().isCorrectAnswer(answer)) {
         if(this.answeredThisQuestion==false)
           {
           	this.score++;
           //	this.answeredThisQuestion=true;
           }
        
         element.style="color:green;";
        element.innerHTML="CORRECT";       
    }else{       
       element.style="color:red;";
     element.innerHTML="WRONG";  
      
    }
     var element2 = document.getElementById('score');
      element2.innerHTML = 'Your Score :'+quiz.score;
}
 
}
 
  

 
 
function populate() {
	
    if(quiz.isEnded()) {
        showScores();
    }
    else { 
        var correctIndicator = document.getElementById('answerIndicator');
       
        correctIndicator.innerHTML= "                       ";     
        var element = document.getElementById("question");
        var str = quiz.getQuestionIndex().text;
       str = str.replace(/'/g,'"');
        element.innerHTML = str;
        
        explainButton = document.getElementById("explain");
        console.log("explanation is"+quiz.getQuestionIndex().explanation);
        if(explainButton!=null){
           
          if(quiz.getQuestionIndex().explanation==null)
            explainButton.style.display="none";
          else
            explainButton.style.display= "inline";   
              
        }
        var choices = quiz.getQuestionIndex().choices;
        for(var i = 0; i < choices.length; i++) {
            //var element = document.getElementById("choice" + i);
          //  element.innerHTML = choices[i];
            var str2 = choices[i];
            str2 = str2.trim();
            
          
            var bt = document.getElementById("btn"+i);
          //  bt.checked = false;
            if(str2.length ==0){
					bt.style.display = "none";            
            }else{
					bt.style.display = "inline";            
            }
            bt.innerHTML = str2;
            guess("btn" + i, choices[i]);
        }
        
        quiz.answeredThisQuestion=false;
        showProgress();
    }
};
 
function guess(id, guess) {
    var button = document.getElementById(id);   
    button.onclick = function() {
        quiz.guess(guess,this); 
        quiz.answeredThisQuestion=true;
    }
};
 
function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;  
    var element = document.getElementById("progress");
   
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.totalQuestions;
   
};
 
function showScores() {
    var gameOverHTML = "<h1 align='center'>Result</h1>";
    gameOverHTML += "<h1>Your score: " + quiz.score + "/"+(quiz.questionIndex)+ "</h1>";
    var element = document.getElementById("msg");
    element.style.display ="block";
    element.innerHTML = gameOverHTML;
    var quizThings = document.getElementById("quiz");
    quizThings.style.display = "none"
    
}

function showPrevQuestion() { 	
   if(quiz.questionIndex>0){
       quiz.questionIndex--;
       populate();
   }
 }
function showNextQuestion() { 	
   if(quiz.questionIndex<quiz.totalQuestions){
      quiz.questionIndex++;
      populate();
   }
 }
  function shuffle(arra1) {
    var ctr = arra1.length, temp, index; 
    while (ctr > 0) { 
        index = Math.floor(Math.random() * ctr); 
        ctr--; 
        temp = arra1[ctr];
        arra1[ctr] = arra1[index];
        arra1[index] = temp;
    }
    return arra1;
}
function showExplanation()
{
    exp = quiz.getQuestionIndex().explanation;
    if(exp!=null){
       // alert(exp);
         
   // explain = quiz.questionIndex.explanation ;
    
    dialog = document.getElementById("dialog");
    message = document.getElementById("msg2")
    message.innerHTML = exp;
   closebutton = document.querySelector("dialog button")  
   closebutton.addEventListener("click",()=> {
       dialog.close()
      });
    dialog.showModal();
    }  
}
/**********************/
function gotoQn(event)
{
    console.log("me mere"+event.keyCode);
    if(event.keyCode == 13){
        console.log("in if");
    qnNum = document.getElementById("number");
    qnNum = qnNum.value;
    console.log(qnNum)
    quiz.questionIndex = qnNum - 1;
    console.log("index is "+quiz.questionIndex);
    populate();
    }
}