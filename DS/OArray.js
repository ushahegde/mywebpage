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
    if(currentQuestionNumber==quiz.totalQuestions){
        var el = documennt.getElementById("nextbutton");
        el.innerHTML="Show Result";
    }
   
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
 }
var questions = [new Question("An array arr[5][10] will have ----- number of elements.",["15","14","50","49"],3),
new Question("The starting index of an array in C and C++ is",["1","0","-1","Depends on array definition"],2),
new Question("State if these are true or false<br>a) An array a[10] can store 11 elements<br>b) When we define an array in C, all elements are automatically initialized to 0",["True True","False False","True False","False True"],2),
new Question("Which of the following is correct array initialization?",["int arr[3] ={123};","int arr[3]={1,2,3};","int arr[3]='123';","Both 1 and 2"],4),
new Question("Which of the following statements about array is false?",["Once defined an array can be expanded or shrunk","In an array, accessing any element can be done without traversing","An array is the most compact data structure to store a set of values.","Searching an ordered array  has time complexity of O(logn)."],1),
new Question("What is the value of a[3] after the following lines are executed?<br>      int a[5];<br>      a[]={1,2,3,4,5};",["3","4","2","The code does not compile"],4),
new Question("If the address of A[1][1] and A[2][1] are 1000 and 1010 respectively and each element occupies 2 bytes then the array has ----- columns",["5","4","10","None of the above"],1),
new Question("Which of the following is an advantage of an array?	",["Insertion and deletion take constant time","Searching a value takes constant time","Accessing any intermediate element takes constant time","All of the above"],3),
new Question("Which of the following data structures is the most compact one?",["Linked List","Stack","Queue","Array"],4),
new Question("An array is defined as<br>     float arr[200];<br>How do we increase the size of the array to 300 elements?",["float arr = new arr[300];","arr = arr+float[100];","delete arr; float arr[300];","Not possible"],4),
new Question("What is the error in the following code?<br>    char str[30]='Hello world';<br>    str[0]='h';",["Line 2 should be str[0]='H';","Line 1 should be<br>   char str[30]={'H','e','l','l','o'};","A char array can not be modified after its definition. ","No error"],4),
new Question("Which of the following is the correct declaration of function sum() which finds sum of elements of array?",["int sum(int arr[10]);","int sum(int *arr,int n)","int sum(int arr,int n)","Both 2 and 3"],2),
new Question("What is the error in this code?<br>int arr[3]={1,2,3};<br>*arr= 10;<br>",["arr can not be used as a pointer","An array must be initialized using []","An array element can not be modified","No error"],4),
];
var quiz = new Quiz(questions);populate();