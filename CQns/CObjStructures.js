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
 }var questions = [new Question("What is type of s in the following definition?<br><br><div class='codetext'>struct node<br>{<br>     int i;   float j;<br> };<br>struct node *s[10] ; <br></div>",["Array of structures","Pointer to array of structures","Array of 10 structuer pointers","Pointer to structure"],3),
new Question("What is type of s1 in the following definition?<br><br><div class='codetext'>struct node<br>{<br>     int i;   float j;<br> };<br>struct node *s1  ; <br></div>",["Structure","Pointer to  structure","None of the above",""],2),
new Question("Which statement about the structure is correct?<br><br><div class='codetext'><br></div>",["A structure can store multiple variables of similar type","A structure can store multiple variables of different types","A function can return a structure","All are correct"],4),
new Question("To access n1 of the structure s1, you should use<br><br><div class='codetext'>struct aa<br>{<br>  int n1;  float m1;<br>};<br>struct aa s1;<br></div>",["s1[n1]","s1.n1","s1->n1","None of these"],2),
new Question("Which of these is the difference between array and structure?<br><br><div class='codetext'><br></div>",["Array can contain same type data but structure can contain dissimilar type of data","A function can return a structure but a function can not return an array","One structure can be assigned to another structure of same type. An array can not be assigned to another","All of these"],4),
new Question("A function is written to read a structure. What are the errors in this function?<br><br><div class='codetext'>struct emp<br>{    int id;<br>      char name[30];<br>     double salary;<br>};<br>void read_emp(struct emp s1)<br>{<br>  scanf('%s %d %lf',s1.name,&s1.id,&s1.salary);<br> }<br></div>",["A structure is sent as value parameter","A function can not have a structure parameter","Both 1 and 2","None of these"],1),
new Question("What are sizes of a and b in bytes? Assume size of int is 4 bytes. <br><br><div class='codetext'>union un1<br>{<br>   int a;   float b;<br>};<br>struct st1<br>{<br>   int a;   float b<br>;};<br>union un1 a;<br> struct st1 b;<br></div>",["8 8","4 4 ","4 8","None of these"],3),
new Question("Which of the following statements are true?<br><br><div class='codetext'><br></div>",["An array is sent to function as call by value parameter","An structure is sent to function as call by value parameter","An array is sent to function as call by reference parameter","Both 2 and 3"],4),
new Question("Find out errors if any.<br><br><div class='codetext'>struct foo{   int a; float b;};<br>struct foo function1(){<br>    struct foo temp;<br>    scanf('%d %f',&temp.a,&temp.b);<br>   return temp;<br>}<br></div>",["A function can not return a structure","function1 should have a structure parameter","No errors","scanf statement should be<br>scanf('%d %f',&temp->a,&temp->b);"],3),
new Question("How do we access 'a' from using structure pointer 'ptr'  in the code below?<br><br><div class='codetext'>struct foo<br>{<br>int a,b;<br>} st1;<br>struct foo *ptr;<br>ptr = (struct foo*)malloc(sizeof(struct foo));<br></div>",["(*ptr).a","ptr->a","1 or 2","None of these"],3),
new Question("What is a self referntial structure?<br><br><div class='codetext'><br></div>",["A structure which points to itself","A strucuter which has an element of type pointer to same structure","A structure pointer pointing to itself","None of the above"],2),
new Question("What does this  statement print?  <br><br><div class='codetext'>struct abcd<br>{<br> int no;<br> char name[25];<br>}<br>struct abcd n1[]=<br>{{12,'Fred'},{15,'Martin'},{8,'Peter'},{11,Nicholas'}};<br>printf('%d%d',n1[2].no,(*(n1 + 2).no) + 1); <br></div>",["8 9","9 9","8 8","8 Unpredictable value"],1),
new Question("Which of the following comments about the usage of structures in true?<br><br><div class='codetext'><br></div>",["Storage class can be assigned to individual member","Individual members can be initialized within a structure type declaration"," The scope of the member name is confined to the particular structure, within which it is defined","None of the above"],3),
new Question("Which properly declares a variable of type structure foo if foo is defined as <br><br><div class='codetext'>struct foo<br>{<br>   int n1;<br>};<br></div>",["struct foo.var;","struct  var;","foo var;","struct foo var;"],4),
new Question("What is the correct syntax to declare a function foo() which receives an array of structure as parameter?<br><br><div class='codetext'><br></div>",[" void foo(struct *abc);","void foo(struct *abc[]);","void foo(struct abc);","None of the above"],1),
new Question("In C, structure values can be passed as arguments to function by----------?<br><br><div class='codetext'><br></div>",["passing each member of the structure as an argument of function call","passing the entire structure to the called function","passing address of the structure","All of these"],4),
new Question("a->b  is syntactically correct if?<br><br><div class='codetext'><br></div>",["a and b are structures"," a is a structure and b is a pointer to structure","a is a pointer to structure and b is a structure","a is a pointer to structure in which b is a field"],4),
new Question("Which of the following operations is illegal in structures?<br><br><div class='codetext'><br></div>",[" Typecasting of one structure to another structure of different type","Pointer to a variable of same structure","Dynamic allocation of memory for structure","All of the above"],1),
new Question("Presence of code like  s.t.b = 10 indicates<br><br><div class='codetext'><br></div>",["Syntax error","Nested structures","double data ","an ordinary value"],2),
new Question("The correct syntax to access the field b of the ith structure in the array of structures s  is -----<br><br><div class='codetext'> struct temp<br> {<br> int b;<br> } s[50];<br></div>",[" s.b.[i]","s.[i].b"," s.b[i]","s[i].b"],4),
new Question("Size of a union is determined by size of the ---------?<br><br><div class='codetext'><br></div>",["First member of union","Largest member of union","Smallest member of union"," Sum of the sizes of all members"],2),
new Question("What is xyz in this code?<br><br><div class='codetext'>struct foo<br>{<br>int a,b,c;float d;<br>};<br>struct foo xyz();<br></div>",["A structure variable of type foo","A pointer to structure foo","A function which returns a structure foo","None of the above"],3),
new Question("What are the errors in this code?<br><br><div class='codetext'>struct foo<br>{<br>int a;float b;<br>};<br>struct foo s1={2,3};<br>struct foo s2 = s1;<br></div>",["Line 2 is wrong. You can not initialize a structure","Line 3 is wrong. A structure can not be assigned to another","No error",""],3),
new Question("What does function fn do in the above code?<br><br><div class='codetext'>struct foo<br>{<br>int a;float b;<br>}<br>void fn(struct foo*ptr)<br>{<br>   scanf('%d %f',&ptr->m,&ptr->b);<br>}<br></div>",["Takes a structure pointer argument, reads structure and modifies it","Produces error as -> is a wrong operator","Produces run time error because pointer is not allocated memory",""],1),
new Question("What is the output of the following code?<br><br><div class='codetext'>#include<stdio.h><br>enum colors {red,blue,green=5,yellow};<br>int main()<br>{<br>   enum colors c=blue;<br>   enum colors c1 = yellow; <br>   printf('blue is %d and yellow is %d',c,c1);<br>}<br><br></div>",["blue is 4 and yellow is 6","blue is 2 and yellow is 4","blue is 1 and yellow is 6","None of the above"],3),
new Question("An array element is accessed using [] operator and index. A structure element is accessed using -----<br><br><div class='codetext'><br></div>",["[] operator and member name",". operator","-> operator","None of the above"],2),
];
var quiz = new Quiz(questions);populate();