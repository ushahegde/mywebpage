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
      element2.innerHTML = 'Score :'+quiz.score; 
}
 
Quiz.prototype.isEnded = function() {
    return this.totalQuestions==this.questionIndex;
}
 
 
function Question(text,textcode, ans1,ans2,ans3,ans4, answer) {
    this.text = text;
    this.textcode=textcode;
    this.choices = [ans1,ans2,ans3,ans4] ;
    this.answer = this.choices[answer-1]; 
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
        element.innerHTML = str;
        
        var strcode = quiz.getQuestionIndex().textcode;
        var elcode = document.getElementById("questioncode"); 
          strcode= strcode.trim();
        if(strcode!=""){
          elcode.style.display='block';
          elcode.innerHTML = "<pre>"+strcode+"</pre>";  
        }
        else{  
          elcode.style.display='none'; 	       
        }
        var nextButton = document.getElementById('nextbutton');
        nextButton.innerHTML = "Skip"; 
        var choices = quiz.getQuestionIndex().choices; 
        for(var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i); 
            var str2 = choices[i];
            str2 = str2.trim();
            if(str2.length!=0){
 		str2= str2.replaceAll("NLL","<br>"); 
           }
           element.innerHTML = str2;
            var bt = document.getElementById("choice"+i);
            bt.checked = false;
            if(str2.length ==0){
					bt.style.display = "none";            
            }else{
					bt.style.display = "inline";            
            }
            guess("choice" + i, str2);
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
    gameOverHTML += "<h2 > Your score: " + quiz.score + "/"+(quiz.questionIndex)+ "</h2>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
};

function showNextQuestion() { 	
   quiz.questionIndex++;
   populate();
 }
 var questions = [ 
new Question('What is the output of this program?','class  A<br>{<br>  int m;<br>public:<br>  void print_m();<br>  static void print_message();<br>};<br> void A::print_m()<br>{<br>   cout&lt;&lt;m;<br>}  <br>void A::print_message()<br>{<br>   cout&lt;&lt;"Hello, you are using class A";<br>   m = 200;<br>}   <br>int main()<br>{<br>     A obj1(8);  <br>     obj1.print_message();<br>     A::print_message(); <br>   }','Error. Class can not have static member','Error. The function definition is not using keyword static','Hello, you are using class AHello, you are using class A','Error. A static function can not access  non-static members of a class',4),
new Question('The output of program is ?','class  A<br>{<br>  int m;<br>  static int count;<br>public: <br>  A()<br>  {  count++;<br>   }<br>  void print_num_objects();<br>};<br> <br>void A::print_num_objects()<br>{<br>   cout&lt;&lt;"Hello, Total number of objects created is"&lt;&lt;count;<br>   }<br>int main()<br>{<br>     A obj1;<br>     A obj2;<br>     obj1.print_num_objects();   <br>  }','Hello, Total number of objects created is 2','No output','Linker error. Static data  count is declared, but not defined.','   ',3),
new Question('How do you allocate memory to store 10 integers in C++?','  ','int *ptr = malloc(10*sizeof(int));','int *ptr = new int;','int ptr[] = new int[10];','int *ptr = new int[10];',4),
new Question('To release memory allocated dynamically, you should use','  ','release ptr;','delete ptr;','dealloc ptr;','None of the above',2),
new Question('Which of the following statements is true about static functions of a class?','  ','Static functions can not  be virtual','Static functions do not have this pointer','Static function can be called without any object','All of the above',4),
new Question('Which of the following operators is used with free store?','  ','free','malloc','new','None of the above',3),
new Question('What is the eror if any, in the following code segment?','int *arr = new int;<br>for(i=0;i<10;i++)<br>cin>>arr[i];','No errors','arr is a pointer. You can not use [] operator with a pointer variable','new operator can not be used with builtin data types','the allocation should be  int *arr = new int[10];',4),
new Question('Which statement with new operator is syntactically correct?','  ','int *ptr = new int;','int *ptr = new int[10];','A *objptr = new A;','All of the above',4),
new Question('What is the difference between new and malloc?','  ','new is used in C++. malloc in C','new has type safety where as malloc just returns void *','new allocates memory and  calls constructor. malloc does not call constructor  ','2 and 3',4),
new Question('Which of the following statements is false for a class in C++?','  ','Data members of a class are shared by all objects of the class','Only static data are shared by all objects of the class','A static data member should be defined outside the class.','None of the above',1),
new Question('What is the output of the following program?','class A<br>{	<br>  static int n;<br>public:<br>  void setn(int a);<br>  int getn(); <br>};<br>int A::n=0;<br>void A::setn(int a)<br>{<br>  n = a;<br>}<br>int A::getn()<br>{<br>  return n;<br>} <br>int main()<br>{<br>  A obj1,obj2;<br>  obj2.setn(15);<br>  cout&lt;&lt;obj1.getn();<br>  return 0;<br>}','15','0','Compiler error as class A has no constructors','None of the above',1),
new Question('How should we release the memory allocated to 10 objects of class A using  new[]','A*ptr = new A[10];','delete ptr;','delete ptr[10];','delete []ptr;','None of the above',3),
new Question('Which of the following statements regarding memory allocation are true?','  ','Memory allocated using new can be released using free()','Memory allocated using malloc() can be released using delete','Memory allocated using new can be resized using realloc()','None of the above',4)];
var quiz = new Quiz(questions);populate();
