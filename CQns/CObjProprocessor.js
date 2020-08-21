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
 }var questions = [new Question("With the below  statements, what are the types of p1,p2,p3,p4?<br><br><div class='codetext'>#define INTPTR int *<br>typedef int * INTPTR2;<br>INTPTR p1,p2;<br>INTPTR2 p3,p4;<br></div>",["int ptr,int ptr, int ptr,int ptr","int, int, int, int","int ptr,int, int ptr,int ptr","None of the above"],3),
new Question("What is the output of this code?<br><br><div class='codetext'>#define PI 22/7<br>int main()<br>{<br>    printf('The value of pi is %.2f\n',PI);<br>    return 0;<br>}<br></div>",["The value of pi is 3.14","The value of pi is 3.1417","The value of pi is 3.00","None of the above"],3),
new Question("With the following macro for square, what will be the value of y in the expression?<br><br><div class='codetext'>#define SQUARE(x) x*x<br><br>x=3;<br>y=SQUARE(x+2)<br></div>",["11","13","25","Error as a macro can't use operators"],1),
new Question("Why does this code produce error?<br><br><div class='codetext'>#define MAX 12;<br>int main()<br>{<br>    int arr[MAX];<br>   .......<br>}<br></div>",["No Error","As there is semicolon in macro, array will be int arr[12;];","You should use const for array size instead of macro",""],2),
new Question("What is the output of this code?<br><br><div class='codetext'>#define STRINGIZE(x) #x<br> int a = 2;<br> printf('%s is %d\n',STRINGIZE(a),a);<br></div>",["Syntax error in line 2","Preprocessor error","a is 2",""],3),
new Question("Write the output of this program.<br><br><div class='codetext'>#define int char<br>main()<br>{<br>int i=65; printf('sizeof(i)=%d',sizeof(i));<br>}<br><br></div>",["Syntax error. You can not redefine data types using macro","sizeof(i)=4","sizeof(i)=1","Run time error"],3),
new Question("Which of the following are correctly formed #define statements in C?<br><br><div class='codetext'><br></div>",["#define CUBE(x) (x*x*x)","#define CUBE(x) ((x)*(x)*(x))","#define CUBE(x)(x*x*x)","#define CUBE(X) {x*x*x}"],2),
new Question("What will be the values of b and c after this code is executed?<br><br><div class='codetext'>int square(int n)<br>{<br>return n*n;<br>}<br>#define SQUARE(n) ((n)*(n))<br>int main()<br>{<br>float a=2.1;<br>float b,c;<br>b=square(a);<br>c=SQUARE(a);<br>}<br></div>",["4.41 4.41","Syntax error in b = square(a)","4.0 4.41",""],3),
new Question("What is the output of this  program?<br><br><div class='codetext'>#define DEBUG 1<br>int main(){<br>int arr[]={1,2,3,4,5};<br>int i;int s=0;<br>for(i=0;i<5;i++){<br>s+=arr[i];<br>#ifdef DEBUG<br>printf('s is %d',s);<br>#endif<br>}<br>printf('sum is %d\n',s);<br>}<br></div>",["Syntax error in line 6","Sum is 15","s is 1s is 3s is 6s is 10s is 15sum is 15","Run time error"],3),
new Question("What does stdio.h file contain?<br><br><div class='codetext'><br></div>",["Definition of i/o library functions like printf and scanf","Declaration of library functions","Neither",""],2),
new Question("What does the following code print?<br><br><div class='codetext'>#include<stdio.h><br>#define num 5<br>int main()<br>{<br>int num= 17;<br>printf('a = %d\n', num);<br>}<br><br></div>",["a is 5","a is 17","Syntax error ","Run time error"],3),
new Question("What is the output of the following program?<br><br><div class='codetext'>#include<stdio.h><br>#define n=10<br>int main()<br>{<br>    int arr[n]={1,2,3,4};<br>    printf('%d',arr[4]);<br>}<br></div>",["4","0","Garbage value","Syntax error"],4),
new Question("What is the difference between angle brackets and double quotes for include file names?<br><br><div class='codetext'><br></div>",["Angle brackets are used only for stdio.h","Angle brackets are used for library  files","Angle brackets indicates header file is in standard include directory","None of the above"],3),
];
var quiz = new Quiz(questions);populate();