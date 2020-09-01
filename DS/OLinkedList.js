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
var questions = [new Question("Which of the following statements is true?<br><br>i) With singly linked lists and circular lists, you can not traverse backwards.<br><br>ii) There is no NULL pointer in a circular linked list.",["a only","b only ","Both a and b","Neither"],3),
new Question("A doubly linked list uses ----- and ----- pointers to move forward and backward in the list",["head, tail","next, prev","pointer, data","None of the above"],2),
new Question("In a singly linked list, the ----- node has a NULL pointer",["head","middle","last","None of the above"],3),
new Question("A singly linked list is empty if----",["head is NULL","head is not NULL","head is pointing to itself","None of the above"],1),
new Question("Which of the following functions has the time complexity of O(1)?",["Adding a new node before head","Adding a new node after last node","Adding a new node after ith node","All of the above"],1),
new Question("Which of the following lists does not have a NULL pointer when it is non-empty?",["Singly linked list","Doubly linked list","Circular list","All of the above"],3),
new Question("In a singly linked list, what is the minimum number of fields a node should contain?",["1","2","3","0"],2),
new Question("When compared to array, which operation is slower in linked list?",["Appending an element","Deleting the last element","Deleting the first element","Accessing ith element"],4),
new Question("Which of the following is a linear data structure?",["Tree","Graph","Linked list","All of the above"],3),
new Question("A sparse matrix has -----",["Many non-zero entries","higher dimension","many zero entries","None of the above"],3),
new Question("Linked lists are suitable for which of the following applications",["Insertion sort","Radix sort","Binary search","Polynomial manipulation"],4),
new Question("The concatenation of two lists is to be performed in O(1) time. Which of the following implementations of a list should be used?",["singly linked list","doubly linked list","circular doubly linked list","array implementation of list"],3),
new Question("Let Q be the pointer to an intermediate node x in a singly linked list. What is the worst case time complexity of the best-known algorithm to delete the node x from the list?",["O(n)","O(log 2 n)","O(log n)","O(1)"],4),
new Question("Which operation in a singly linked lis has time complexity of O(n)?",["Inserting an element at begining of list","Appending an element","Deleting an element from begining of list","All of the above"],2),
new Question("What does the following code do?<br><br>void foo(struct node * nd)<br>{<br>   if(foo!=NULL)<br>   {<br>       foo(nd->next);<br>       printf('%d  ',nd->value);<br>    }<br>}",["Prints the value of last node","Prints the list ","Gives segmentation fault","Prints the list in reverse order"],4),
new Question("What does the following function return?<br><br>struct node *bar(struct node *nd)<br>{ <br>      while(nd)<br>      {<br>          struct node *temp =  nd->next;<br>          free(nd);<br>          nd = temp;<br>       }<br>       return nd;<br>}<br> ",["First node of the list","Last node of the list","NULL","The function crashes with segmentation fault"],3),
new Question("A code is written to delete a node from doubly linked list<br><br>if(nd!=NULL)<br>{<br>    nd->prev-next = nd->next;<br>    nd->next->prev = nd->prev;<br>    free(nd);<br>}<br><br>When does this code crash?",["When deleting the first node","When deleting the last node","Both 1 and 2","Never"],3),
new Question("What does the following function do?<br><br>void foo(NODEPTR nd)<br>{<br>     for(;nd->next!=NULL;nd = nd->next);<br>     return nd;<br>}",["Returns the first node","Produces syntax error","Runs infinitely","Returns last node"],4),
new Question("Code is written to find the last node of linked list. What happens when this code is run with an empty list?<br><br>     nd = head;<br>     while( nd->next!=NULL)<br>          nd = nd->next;<br>     return nd;",["It returns NULL","It returns first node","Produces syntax error","Program crashes"],4),
new Question("To add a node x after a node p, which statements must be used?",["x->next = p->next;<br>p->next = x;","p->next=x;","p->next = x; <br>x->next = p;","We need another pointer to next node of p"],1),
new Question("To traverse a circular list a loop is written. Correct it if necessary.<br>    while(nd!=NULL)<br>       {  printf('%d',nd->val);<br>           nd = nd->next;<br>       }",["while(nd->next!=head)","do{   printf('%d',nd->val);  nd =nd->next; }<br>while(nd!=head);","It is not possible to traverse the circular list using a loop","None of the above"],2),
new Question("In a circular linked list  --------",["Nodes are all linked together in some sequential manner.","there is no beginning and no end.","Nodes are arranged hierarchically.","forward and backward traversal within the list is permitted."],2),
new Question("The time complexity of delete operation in a doubly linked list is ",["O(n)","O(logn)","O(1)","O(n2)"],3),
new Question("What does the following function do?<br>void foo(NODEPTR nd)<br>{     if(nd)<br>       {      <br>          printf('%d   ',nd->val);<br>          foo(nd->next); <br>      }<br>}",["Display first node of linked list","Displays all nodes of linked list in reverse order","Reverses the linked list","Display all nodes of linked list in correct order"],4),
new Question("Which of the following statements is false for the following function? The parameter to function is head of a circular list.<br>   void foo(NODEPTR head)<br>   {<br>    NODEPTR node = head;<br>    do<br>    {<br>       printf('%d  ',node->val);<br>       node = node->next;<br>    }while(node!=head)<br>   }",["It prints all the nodes of the list","The function crashes when the list is empty","It prints all the nodes except first node.","Both 1 and 2"],3),
new Question("To add a node at the begining of the list, a code is written<br>void add_node(struct node **head,struct node*newnode)<br>{<br>newnode->next = *head;<br>-----<br>}<br>What must be the next line/s?<br>",["head->next = newnode","head =newnode;","*head = newnode;","None of the above"],3),
new Question("A function is written for a singly linked list. What does it return?<br>int foo(sturct node *head)<br>{<br>    int m=0<br>    while(head!=NULL)<br>    {<br>        m += head->value;<br>        head = head ->next;<br>    }<br>    return m;<br>}<br>    ",["Number of nodes in the list","Sum of all values in the list","The number of nodes which are non-zero","None of the above"],2),
new Question("What does the following code do?<br><br>struct node *t = find_node(val);<br>t->prev->next = t->next;<br>t->next->prev = t->prev;<br>free(t);<br>",["Deletes a node from singly linked list","Deletes a node from doubly linked list","Deletes a node from Binary Tree","None of the above"],2),
new Question("Each node in  a singly linked list will be of the form<br>",["int node;","struct node<br>{ int n;};","struct node<br>{ int n;<br>   struct node *next; }","None of the above"],3),
new Question("Elements of a linked list are stored in ----- memory.",["Stack","Heap","Program","None of the above"],2),
];
var quiz = new Quiz(questions);populate();