 function Quiz(questions) {
    this.score = 0;
    this.questions = shuffle(questions);
    this.totalQuestions = 10;
    this.questionIndex = 0;
 
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
Quiz.prototype.getQuestionIndex = function() {
    return this.questions[this.questionIndex];
}
 
Quiz.prototype.guess = function(answer,button) {
	var nextbutton = document.getElementById('nextbutton');
	nextbutton.innerHTML = 'Next Question';
   var element = document.getElementById("answerIndicator");
    
    if(this.getQuestionIndex().isCorrectAnswer(answer)) {
        this.score++;
        
         element.style="color:green;";
        element.innerHTML="CORRECT";
     
        
    }else{
    	 
       
       element.style="color:red;";
     element.innerHTML="WRONG";  
      
    }
     var element2 = document.getElementById('score');
      element2.innerHTML = 'Your Score :'+quiz.score;
  
}
 
Quiz.prototype.isEnded = function() {
    return this.totalQuestions==this.questionIndex;
}
 
 
function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = choices[answer-1]; 
}
 
Question.prototype.isCorrectAnswer = function(choice) {
	 
    return this.answer === choice;
};
 


 
 
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
        
        var nextButton = document.getElementById('nextbutton');
        nextButton.innerHTML = "Skip";
        
       
        var choices = quiz.getQuestionIndex().choices;
        for(var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            var str2 = choices[i];
            str2 = str2.trim();
            
          
            var bt = document.getElementById("btn"+i);
            bt.checked = false;
            if(str2.length ==0){
					bt.style.display = "none";            
            }else{
					bt.style.display = "inline";            
            }
            guess("btn" + i, choices[i]);
        }
 
        showProgress();
    }
};
 
function guess(id, guess) {
    var button = document.getElementById(id);   
    button.onclick = function() {
        quiz.guess(guess,this); 
    }
};
 
function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;  
    var element = document.getElementById("progress");
   
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.totalQuestions;
   
};
 
function showScores() {
    var gameOverHTML = "<h1>Result</h1>";
    gameOverHTML += "<h2 > Your scores: " + quiz.score + "/"+(quiz.questionIndex)+ "</h2>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
};

function showNextQuestion() { 	
   quiz.questionIndex++;
   populate();
 }var questions = [new Question("In command line arguments, argv is a/an….......<br><br><div class='codetext'><br></div>",["pointer to an array of character pointers","array of strings","array of character pointers","none of these"],3),
new Question("In command line arguments, agrc is a/an….......<br><br><div class='codetext'><br></div>",["String","Array of char pointers","Integer","none of these"],3),
new Question("What do c and v mean in argc and argv of command line arguments?<br><br><div class='codetext'><br></div>",["c is configuration v is visibility","c is control and v is vertex","c is count and v is vector",""],3),
new Question("What is the correct syntax for command line arguments?<br><br><div class='codetext'><br></div>",["int main(int argc, char *argv[])","int main(char *argc,int argv)","int main(int argc,char **argv)","Both 1 and 3"],4),
new Question("What is argv[0] in command line arguments?<br><br><div class='codetext'><br></div>",["The first argument","Executable command","Total number of arguments","None of the above"],2),
new Question("What does the following program display if it is called as <br>./a.out hello<br><br><div class='codetext'>#include<stdio.h><br>int main(int argc,char *argv[])<br>{<br>     printf('The string sent is %s',argv[1]);<br>     return 0;<br>}<br>    <br></div>",["The string sent is hello","The string sent is ./a.out hello","The string sent is ./a.out","None of the above"],1),
new Question("What does the following program do?<br><br><div class='codetext'>#include<stdio.h><br>int main(int a,char *v[])<br>{<br>   if(a<2)<br>      printf('Hello, unknown user!\n');<br>   else<br>      printf('Hello %s\n',v[1]);<br>   return 0;<br>}<br></div>",["Displays Hello with the user name given as command line argument","Displays Hello unknown user if command line argument is not given","Produces syntax error","Both 1 and 2"],4),
new Question("What does the following program display?<br><br><div class='codetext'>#include<stdio.h><br>int main(int a,char *v[], char *e[])<br>{<br>   int i;  <br>   for(i=0;e[i]!=NULL;i++)<br>     printf('%s\n',e[i]);<br>   return 0;<br>}<br></div>",["Command line arguments","File names in CWD","Produces syntax error","Environment variables"],4),
];
var quiz = new Quiz(questions);populate();