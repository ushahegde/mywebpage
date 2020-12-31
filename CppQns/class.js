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
    this.choices = [ans1,ans2,ans3,ans4]
  //  this.choices =new string[] {ans1,ans2,ans3,ans4};
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
        
      //  console.log(str)
        
     //   str = str.replace(/'/g,'"');
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
            element.innerHTML = choices[i];
            var str2 = choices[i];
            str2 = str2.trim();
            
          
            var bt = document.getElementById("choice"+i);
            bt.checked = false;
            if(str2.length ==0){
					bt.style.display = "none";            
            }else{
					bt.style.display = "inline";            
            }
            guess("choice" + i, choices[i]);
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
new Question('Complete the line to assign value 23 to data member a of obj1.','#include&lt;iostream&gt;<br>using namespace std;<br>class A<br>{<br>public:<br>  int a;<br>  void print_a()<br>  {     cout&lt;&lt;a;  }<br>}; <br>int main()<br>{<br>     A obj1;<br>     ------- = 23;<br>     obj1.print_a();<br>}',
'obj1.a = 23;','obj1::a = 23;','Not possible','   ',1),
new Question('What is the output of the following program?','#include&lt;iostream&gt;<br>using namespace std;<br>class A<br>{<br>  int a;<br>  void print_a()<br>  {<br>     a = 23;<br>     cout&lt;&lt;a;<br>  }<br>}; <br>int main()<br>{<br>     A obj1;<br>     obj1.print_a();<br>}','23','Garbage value','Compiler error','   ',3),
new Question('What is the output of the following program?','#include&lt;iostream&gt;<br>using namespace std;<br>class  A<br>{<br>  int a=88;<br>public:<br>  void print_a()<br>  {     cout&lt;&lt;a;  }<br>}; <br>int main()<br>{<br>     A obj1;<br>     obj1.print_a();<br>}','Compiler Error','Garbage value','88','   ',1),
new Question('What is the output of the following program?','#include&lt;iostream&gt;<br>using namespace std;<br>class  A<br>{<br>   int a;<br>public:<br>  void seta(int m){ a = m;}<br>  void print_a()<br>  {     cout&lt;&lt;a;  }<br>}; <br>int main()<br>{<br>     A obj1;<br>     obj1.print_a();<br>}','0','Garbage value','Run time error',' ',2),
new Question('Which of the following statements is true about classes in C++?','   ','By default members of a class are public','By default members of a class are private','Data members of a class are private by default and function members are public by default','None of the above',2),
new Question('How do you assign one object to another object of same class?','   ','Not possible','Using  =','copying individual members','By overloading =',2),
new Question('What is the output of the following program?','#include&lt;iostream&gt;<br>using std::cout;<br>class A<br>{<br>   int n;<br> public:<br>   void setn(int m)<br>   { n = m; }<br>   int getn()<br>   {   return n; }<br>};<br>int main()<br>{<br>   A obj1; <br>   A obj2;<br>   obj1.setn(10);<br>   cout&lt;&lt;obj2.getn();<br>}','10','0','Some garbage value','None of the above',3),
new Question('With the following declaration of the class Num, how do you define two objects and one pointer of class Num?','class Num<br>{<br>     int n;<br>public:<br>    int getn() { return n;}<br>    void setn(int m)  { n=m;}<br>};','Num(obj1); Num(obj2);<br>Num *ptr;','Num obj1, obj2;<br>Num *ptr;','Num obj1, obj2;<br>Num *ptr = new Num;','   ',3),
new Question('What is the output of the following program?','class B<br>{<br>}<br>int main()<br>{<br>    B obj1;<br>    cout&lt;&lt;"Hello from classes";<br>}','Error. Class B does not have any data members. ','Error. No objects can be  created from class B because it is empty class.','Error. No semicolon at the end of class declaration.','   ',3),
new Question('What is the output of the following program?','class B<br>{<br>    int m;<br>};<br>int main()<br>{<br>    B obj1;<br>    obj1.m = 10;<br>    cout&lt;&lt;obj1.m;<br>}','10','Garbage value','Error. m is private','   ',3),
new Question('Data hiding is achieved in C++ by','   ','Making data members as private and methods as public','Making member functions as private and data members as public.','Making all members private','   ',1),
new Question('What is the output of the program?','class A<br>{<br>    public:<br>     void print_hello(){ cout&lt;&lt;"Hello world";}<br>};<br>int main()<br>{<br>    A * ptr = new A;<br>   ptr.print_hello();<br>}','Hello world','No output','Compiler error','   ',3),
new Question('What is the output of this program?','class  A <br> { <br>   int a; <br> public:   <br>   void print_a();  <br> }; <br> void A::print_a()  <br>  { <br>      this-&gt;a = 88; <br>      cout&lt;&lt;a; <br>   } <br> int main() <br> { <br>      A obj1;      <br>      obj1.print_a(); <br> }','Error in void A::print_a() <br> ','Error in line <br> this-&gt;a = 88;','88','   ',3),
new Question('Can we define a member function outside the body of class? If yes, how?','   ','No','Yes. Using :: operator','Yes, using . operator','Depends on the compiler',2),
new Question('What is the output of the following program?','#include&lt;iostream&gt; <br> using std::cout; <br> class A <br> { <br>     public: <br> A() <br> { <br>     cout&lt;&lt;"Constructor "; <br> } <br> ~A() <br> { <br>    cout&lt;&lt;"Destructor "; <br> } <br> }; <br> int main() <br> { <br>      A *ptr = new A[3]; <br>      delete [] ptr; <br> }','No output','Constructor Destructor','Constructor Constructor Constructor Destructor Destructor Destructor','None of the above',3),
new Question('What is <i>this</i> pointer in C++?','   ','A pointer pointing to the class','A pointer pointing to the object which invoked the function','Most recently used object pointer.','   ',2),
new Question('Which statement should be used  in setval function so that parameter is assignged to  num.','class A <br> { <br>    int num; <br> public: <br>   void  setval(int num); <br> }; <br> void A::setval(int num) <br> { <br> ---------------- <br> }','num =num;','::num = num;','this.num = num;','this-&gt;num = num;',4),
new Question('What is the output of the program given below?','class A <br> { <br>    int num; <br> public: <br>    void print(); <br> }; <br> void print() <br> { <br>     num=19; <br>     cout&lt;&lt;num; <br> } <br> int main() <br> { <br>     A obj; <br>     obj.print(); <br> }','19','Garbage value','Compiler Error','   ',3),
new Question('In the following declaration of a class, which line is invalid?','class A <br> { <br>    private:/*line 1*/ <br>         int n; <br>    public: <br>       int  getn();/*line 2*/ <br>      void setn(int m) <br>      { <br>          n = m;/*line 3*/ <br>      } <br> }; <br>      ','line 1','line 2','line 3','No error',4),
new Question('Complete the blank in the code below.','class A <br> { <br>    int n; <br> public: <br>    int getn();  <br> }; <br> int _______/*getn function*/ <br> { <br>     return n; <br> }','getn()','getn(int n)','A::getn()','   ',3),
new Question('Which of the following functions are inline?','class A <br> { <br>    int n; <br> public: <br>    int getn(){ return n;} <br>    void setn(int m); <br>    void print(); <br> } <br> inline void A::setn(int m) <br> { <br>     n = m; <br> } <br> void A::print() <br> { <br>    cout&lt;&lt;n; <br> }','getn()','setn()','Both getn() and setn()','   ',3),
new Question('What is the correct way to create a dynamic object of A class?','class A <br> { <br> };','A *ptr;','A *ptr = new A();','A *ptr();','A *ptr = new A;',4),
new Question('What is the output of the following code?','class A <br> { <br> public: <br>    A(); <br> }; <br> A::A() { cout&lt;&lt;"Constructor";} <br> int main() <br> { <br>      A *ptr = new A; <br>      delete ptr; <br> }','No output','Constructor','Compiler error','   ',2)];
var quiz = new Quiz(questions);populate();
