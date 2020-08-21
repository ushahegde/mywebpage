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
 }var questions = [new Question("What should replace the blank line in the below code for it to work properly?<br><br><div class='codetext'>FILE *fptr;<br>fptr = fopen('a.c','r');<br>if(---------------)<br>    printf('File does not exist');<br></div>",["fptr==ERR","fptr==NULL","!exists(fptr)",""],2),
new Question("Complete the line to open the file a.txt for reading.<br><br><div class='codetext'>FILE *fptr;<br>fptr = --------<br></div>",["fopen('a.txt','rd')","fopen('a.txt','r')","fread('a.txt');","None of the above"],2),
new Question("What is the meant by ‘a’ in the following operation?<br><br><br><div class='codetext'>fp = fopen(“Random.txt”, “a”);<br></div>",["add","attach","append","aprehend"],3),
new Question("Fill in the blank, so that the file 'notes.txt' is opened for both reading and writing?<br><br><div class='codetext'>FILE *fp;fp = fopen(------------);<br></div>",["'notes.txt','a'","'notes.txt','rw'","'notes.txt','r+'","A file can not be opened for both reading and writing simultaneosly"],3),
new Question("If the file 'source.txt' contains a line 'Be my friend' which of the following will be the output of below program?<br><br><div class='codetext'>int main()<br>{<br> FILE *fs;char c[10];<br> fs = fopen('source.txt', 'r');<br> c[0] = getc(fs);<br> fseek(fs, 0, SEEK_END);<br> fseek(fs, -3L, SEEK_CUR);<br> fgets(c, 5, fs);    puts(c);<br> return 0;<br>}<br></div>",["Run time error","Be my friend","end",""],3),
new Question("What will be the output of the program if the file abc contains  'Hello beautiful world ' ?<br><br><br><div class='codetext'>#include<stdio.h><br>#include<stdlib.h><br>int main()<br>{<br>    FILE *fp;<br>    unsigned char ch;<br>    fp=fopen('abc.c', 'r');<br>    if(fp == NULL)<br>   {        printf('Unable to open file');<br>            exit(1);<br>    }<br>    while((ch=getc(fp)) != EOF)<br>           printf('%c', ch);<br>    fclose(fp);<br>    printf('\n', ch);<br>    return 0;<br>}<br></div>",["Hello beautiful world","Hello<br>beautiful<br>world","Infinite loop",""],3),
new Question("What does the program do?<br><br><br><div class='codetext'>int main()<br>{<br>    FILE *fp;    signed char ch;<br>    int i=1;<br>    fp = fopen('myfile.c', 'r');<br>    while((ch=getc(fp))!=EOF)<br>         { if(ch == '\n')<br>                 i++; }<br>    fclose(fp);<br>    return 0;<br>}<br></div>",["Prints the contents of the file","Counts all the characters in the file and prints it. ","Counts the number of lines in the file but does not print it","None of the above"],3),
new Question("fprintf function is used to ------<br><br><div class='codetext'><br></div>",["Display a value on screen","Store a value in a file","There is no fprintf() function in C","None of the above"],2),
new Question("What does the following code do?<br><br><div class='codetext'>fprintf(stdout,'hello world');<br></div>",["writes Hello world to the file with name stdout","Displays hello world on screen","produces syntax error","None of the above"],2),
new Question("fread() is used for -------<br><br><div class='codetext'><br></div>",["Read a string from a text file","Read a string from console","Read a value from binary file","Any of the above"],3),
new Question("fputs() is used for-------<br><br><div class='codetext'><br></div>",["Display a value on console","Write a string to a file with new line","Write a string to console with new line","None of the above"],2),
new Question("What does fseek() function do?<br><br><div class='codetext'><br></div>",["Searches for a value in a file","Moves the file pointer to a given location","Searches for a character in a string","None of the above"],2),
new Question("What does the following statement do?<br><br><div class='codetext'>fseek(fptr,0,SEEK_SET)<br></div>",["Sets the file pointer to 0","Moves the file pointer to begining of file","Searches for a string in the file","None of the above"],2),
new Question("What does the following function do?<br><br><div class='codetext'>rewind(fptr)<br></div>",["Moves the file pointer to begining of file","There is no rewind in C","rewind rewinds the DVD","None of the above"],1),
];
var quiz = new Quiz(questions);populate();