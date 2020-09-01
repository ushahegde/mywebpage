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
var questions = [new Question("State whether true or false<br>  i) Queue is a data structure to which values are added to one end and removed from the other end<br>  ii) In a queue, element added first is removed last.",["true true","true false","false true","false false"],2),
new Question("A queue data structure supports ---- and --- operations",["Push, pop","Insert, delete","enqueue, dequeue","None of the above"],3),
new Question("State whether true or false<br>a) In a queue, insertion is done at front end<br>b) In an input restricted queue, data can be removed from both ends",["false, true","false, false","true,true","true,false"],1),
new Question("Fill in the blank. Assume that rear is initialized to -1.<br><br>struct queue<br>{<br>    int arr[MAX];<br>    int front,rear;<br> };<br>void enqueue(struct queue *q1,int num)<br>{  <br>    if(!is_full(q1))<br>       -------------<br>}",["arr[++rear]=num","arr[rear+1] = num","arr[rear] = num","None of the above"],4),
new Question("In a circular queue, insertion of an element is done using this statement.",["arr[++rear]=num","arr[++rear%MAX]=num","arr[rear]=num","None of the above"],2),
new Question("Circularly linked list is used to represent a Queue. A single pointer p is used to access the Queue. To which node should p point such that both the operations enQueue and deQueue can be performed in constant time?",["Rear node","Front node","Not possible with a single pointer","Node next to front"],1),
new Question("What is the minimum number of stacks of size n required to implement a queue of size n?",["1","2","3","4"],2),
new Question("What is the content of an integer queue, which was initially empty, after the following operations<br>enqueue(11) enqueue(12) enqueue(13)<br>dequeue() dequeue ()<br>enqueue(100)",["13 100","11 12","11 100","100 11"],1),
new Question("A data structure to which elements can be added and removed to both ends but not in the middle is called -------",["Stack","Queue","Linked List","Deque"],4),
new Question("For array implementation of a queue, the initial indices  front and rear must be ------",["0 and 1","-1 and -1","-1 and 0","1 and 0"],2),
new Question("The following operations are performed on a queue with size of 5.<br>enque(1) enque(2) enque(3) enque(4) enque(5)<br>deque() deque()<br>enque(100)<br>Last operation will -----",["Add 100 to the rear of the queue","Add 100 to front of the queue","Throws queue full error","None of the above"],3),
new Question("arr[++rear]=newvalue;<br>is a statement to be used in ------ function",["push()","pop()","enqueue","dequeue"],3),
new Question("For a linked list implementation of a queue, in order to have O(1) complexity for both enqueue and dequeue operations, we will need ---------",["A doubly linked list","A circular doubly linked list","A singly linked list with both head and tail pointers","None of the above"],3),
new Question("For a queue, which of the following operations has constant time complexity(O(1))?",["enqueue","dequeue","Neither","Both"],4),
new Question("The following code is used for ------<br>    r->next = newnode;<br>    r = newnode;",["push","pop","enqueue","dequeue"],3),
];
var quiz = new Quiz(questions);populate();