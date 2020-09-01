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
var questions = [new Question("Which of the following data structures is useful in storing elements and retrieving them in reverse order?",["Stack","Linked List","Queue","Tree"],1),
new Question("What can be the maximum value of 'top',  if size of array used for stack is 5?",["5","4","6","0"],2),
new Question("Which of the following is  an application of stack?",["Function Calls","Large number arithmetic","Evaluation of arithmetic expressions","All of the above"],4),
new Question("When does the value of 'top' change in a stack?",["When a value is pushed","When a value is popped","Both 1 and 2","Neither"],3),
new Question("After popping an element of a stack implemented using linked list, which element of list is deleted?",["First","Last","Middle","None of the above"],1),
new Question("A*B (C+D+E) is an example of ____________ expression.",["Infix","Prefix","Postfix","Input"],1),
new Question("Which of the following is a postfix expression?",["A+B+C","++ABC","ABC++","None of the above"],3),
new Question("To check if a stack which is implemented using an array  is empty, you should use the condition -----",["top==0","top==-1","top==MAX","None of the above"],2),
new Question("What is the error in this push function?<br><br>void push(int arr[],int *top,int num)<br>{<br>    (*top)++;<br>    arr[*top]=num;<br>}<br>    <br>",["top should be a global variable","top should not be a pointer","There are no errors","Before adding value, you should check if *top>=MAX"],4),
new Question("To check whether the stack is empty, what condition  should be used? The stack is implemented using a linked list.",["top==-1","top==0","top==NULL","top==MAX"],3),
new Question("The prefix expression for the following expression :<br>(a+b)*(c+d) is ------",["*+ab+cd","*++abcd","*ab+c+d","None of the above"],1),
new Question("Time complexity of push operation in stack is ----",["O(n)","O(logn)","O(1)","None of the above"],3),
new Question("The postfix equivalent of the prefix * + ab - cd is ?",["ab + cd - *","abcd + - *","ab + cd * -","ab + - cd *"],1),
new Question("Given an empty stack, after performing push (1), push (2), Pop, push (3), push (4), Pop, Pop, push(5), Pop, what is the value of the top of the stack ?",["4","3","2","1"],4),
new Question("The following sequence of operations is performed on a stack :<br><br>PUSH (10), PUSH (20), POP, PUSH (10), PUSH (20), POP, POP, POP, PUSH (20), POP.<br>The sequence of values popped out is:",["20, 10, 20, 10, 20","20, 20, 10, 10, 20","10, 20,20,10,20","20,20,10,10,20"],4),
new Question("Which of the following is essential for converting an infix expression to the postfix form efficiently?",[" An operator stack","An operand stack","An operand stack and an operator stack","A parse tree"],1),
new Question("Which of the following statements about stack data structure is false?",["push operation of a stack implemented using an array has time complextiy of O(1)","pop operation of a stack implemented using a linked list has time complextiy of O(1)","A stack always reverses a sequence","isempty() function of a stack implemented using a linked list should test if top == -1"],4),
new Question("The postfix expression for * + a b - c d is?",["ab + cd - *","ab cd + - *"," ab + cd * -","ab + - cd *"],1),
new Question("In a stack implemented using linked list, push operation adds a value to --------",["Begining of list","End of list","Middle of list","None of the above"],1),
new Question("In linked implementation of stack, which node is considered as top of stack?",["First node","Last node","Any node","Middle node"],1),
new Question("Which of the following is not an application of stack",["Recursive functions","Reversing a string","Evaluation of postfix expression","Job scheduling"],4),
new Question("Which of the following operations of a stack has linear complexity?",["push","pop","isempty","none"],4),
new Question("The condition for stack overflow in array implementation where array size is MAX is -------",["top==-1","top>MAX","top>=MAX","None of the above"],3),
new Question("Which data structure can be used to check if an expression has balanced brackets?",["Linked List","Stack","Array","Queue"],2),
];
var quiz = new Quiz(questions);populate();