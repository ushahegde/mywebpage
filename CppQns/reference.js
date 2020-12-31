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
new Question("What is the type of b in the code?","int main(){<br>    int a = 44; <br>    int &b = a; <br>    cout&lt;&lt;a&lt;&lt;endl; <br>    cout&lt;&lt;b&lt;&lt;endl; <br> }","An address","A  pointer","A reference","None of the above",3),
new Question("What is the output of the program?","#include&lt;iostream&gt;<br>using namespace std;<br>int main()<br>{<br>    int a = 44; <br>    int &b ; b =a;<br>    cout&lt;&lt;a&lt;&lt;endl; <br>    cout&lt;&lt;b&lt;&lt;endl; <br> }",'4444','440',"Compiler error","",3),
new Question("Which of the following functions cubes the value of a  in main function?"," int main()<br>{<br>    int a=10;<br>    cube_num(a);<br>    cout&lt;&lt;a;<br>}","void cube_num(int n)<br>{        n = n*n*n;   }","void cube_num(int &n)<br>{       n = n*n*n;    }","void cube_num(int *n)<br>{       *n = *n* *n* *n;   }","2 and 3",2),
new Question("What is the output of the program?","void fn1(int a)<br>{        a /=2;     }<br>void fn2(int &a)<br>{        a/=2;    } <br>int main()<br>{<br>    int a=10;<br>    fn1(a);        cout&lt;&lt;'a is '&lt;&lt;a&lt;&lt;endl;<br>    fn2(a);         cout&lt;&lt;'a is '&lt;&lt;a&lt;&lt;endl;<br>    return 0;<br>}","a is 5 <br>a is 2","a is 5<br>a is 2.5","a is 10<br>a is 5","None of the above",3),
new Question("A program given below is not compiling. Why?","class  A<br>{<br>  int m1;<br>  const int m2;<br>public:<br>  A(int n1,int n2);  <br>};<br>A::A(int n1,int n2) <br>{<br>    m1 = n1;<br>    m2 = n2;<br>}   <br>int main()<br>{<br>     A obj1(1,5); <br>}","Class can not have const data.","const data should be initialized in class definition ","const data should be initialized with member initializer list","",3),
new Question("Write output of the following program","class  A<br>{<br>  int m1;<br>  const int m2;<br>public:<br>  A(int n1,int n2); <br>  void print_m();<br>  void set_values(int x,int y);<br>};<br>A::A(int n1,int n2) :m1(n1),m2(n2)<br>{     }<br>void A::print_m()<br>{<br>   cout&lt;&lt;m1&lt;&lt;''&lt;&lt;m2;<br>}  <br>void A::set_values(int x,int y)<br>{<br>   m1 = x;    m2 = y;<br>}  <br>int main()<br>{<br>     A obj1(1,5);<br>     obj1.set_values(11,22);<br>     obj1.print_m();<br>}","15","1122","Compiler error because const member is being modified","",3),
new Question("What is the output of the program?","class  A<br>{<br>  int m1;<br>  int m2;<br>public:<br>  A(int n1,int n2); <br>  void print_m() const;<br>  void set_values(int x,int y) const;<br>};<br>A::A(int n1,int n2) :m1(n1),m2(n2)<br>{     <br>}<br>void A::print_m() const<br>{<br>   cout&lt;&lt;m1;<br>   cout&lt;&lt;m2;<br>}  <br>void A::set_values(int x,int y) const<br>{<br>   m1 = x; <br>   m2 = y;<br>}<br>  <br>int main()<br>{<br>     A obj1(1,5);<br>     obj1.set_values(11,22);<br>     obj1.print_m();<br>}","15","1122","Compiler error because const member function set_values is modifying the object","",3),
new Question("What is the error in this program?","class  A<br>{<br>  int m1;<br>  int m2;<br>public:<br>  A(int n1,int n2); <br>  void print_m() const;<br>  void set_values(int x,int y) ;<br>};<br>A::A(int n1,int n2) :m1(n1),m2(n2)<br>{     <br>}<br>void A::print_m() const<br>{<br>   cout&lt;&lt;m1;<br>   cout&lt;&lt;m2;<br>}  <br>void A::set_values(int x,int y) <br>{<br>   m1 = x; <br>   m2 = y;<br>}<br>  <br>int main()<br>{<br>     A obj1(1,5);<br>     const A obj2(3,4);<br>     obj1.set_values(11,22);<br>     obj1.print_m();<br>     obj2.set_values(33,44);<br>     obj2.print_m();<br>}","You can not have a const member function","You can not define a constant object","A const object can call only const function.","",3),
new Question("How do you assign a value 12 to the const data member m1 in class A?","class  A<br>{<br>  const int m1;<br>  int m2;<br>public:<br>  A(int n1,int n2); <br>  void set_values(int x,int y) ;<br>}; ","const int m1 = 12;   in class declaration","A::A(int n1,int n2):m1(12),m2(n2)<br>{/*code*/}","m1 = 12;    In the constructor assign","",2),
new Question("Which of the following statements is true regarding const member functions?","","A const object can call only const function","A const function can not modify state of an object","A non-constant object can call a const function","All of the above",4),
new Question("Which of the following statements about references is false?","","A references should always be initialized while defining it.","A function can have a reference parameter","A class can have a reference data member","We can define an array of references.",4),
new Question("Which of the following statements involving reference variables, is invalid?","","int &r;","int &r = m1;","int foo(int &n1);","int&bar(int n1);",1),
new Question("What are the errors if any,  in this code?","class A<br>{<br>int num;<br>public:<br>A(int n):num(n){}<br>void print() const;<br>};<br>void A::print() const<br>{<br>   cout&lt;&lt;num++;<br>}","A class can not have const functions","A const function should be private function","A const function can not modify data members","None of the above",3),
new Question("What is the output of the following program, if input is 10 and  20?","int & larger(int &a,int &b)<br>{<br>    return a&gt;b?a:b;<br>}<br>int main()<br>{<br>    int a,b;<br>    cin&gt;&gt;a&gt;&gt;b; /*line 2*/<br>    larger(a,b)=0;  /*line 3*/<br>    cout&lt;&lt;'a is '&lt;&lt;a&lt;&lt;' b is'&lt;&lt;b&lt;&lt;endl;<br>    return 0;<br>}","Compiler error in line 1","Compiler error in line 2","a is 10b is 0","None of the above",3),
new Question("What is a mutable member of a class?","","A mutable member is a  non-const member","A mutable member can change its value at any time","A mutable member can be modified even in a const function","All of the above",3),
new Question("What is the output of the following program?","int main()<br>{<br>    int a =10;<br>    const int b;<br>    cout&lt;&lt;b;<br>}","0","Some random value","Compiler error","None of the above",3),
new Question("What is the output of the following program?","class A<br>{<br> public:<br>   int x;<br>   mutable int y;<br>   A()<br>   {<br>       x = y  = 10;<br>   }<br>};<br><br>int main(int argc, char **argv)<br>{<br>   const A obj;<br>   obj.y = 12;<br>   cout&lt;&lt;obj.x&lt;&lt;' '&lt;&lt;obj.y;<br>   return 0;<br>}","10 12","Compiler error, because constant object is modified","10 10","None of the above",1),
new Question("What is the output of the following program?","int main()<br>{<br>     int a=100; <br>     int c = 200;<br>     int &b=a;<br>     b = c;<br>     cout&lt;&lt;a&lt;&lt;' '&lt;&lt;b&lt;&lt;' '&lt;&lt;c;<br>     return 0;<br>}","100 200 200","200 200 200","Compiler error","None of the above",2),
new Question("Can a function call be placed in LHS of an assignment statement? Is the following statement valid?","fun(a,b)=100;","Yes","No"," "," ",1),
new Question("What is the output of the following program?","int &fn(int a)<br>{<br>   int m=5;int n=3;<br>   if(a&gt;0)       return m;  <br>    else     return n;<br>}<br>int main()<br>{<br>     int a=10;<br>    cout&lt;&lt;fn(a);<br>}","5","3","Compiler error","",3),
new Question("What does the following program print?","int main()<br>{<br>    int a = 10;<br>    const  int b = 10;<br>    a += b++;<br>    cout&lt;&lt;'a = '&lt;&lt;a&lt;&lt;'b='&lt;&lt;b;<br>}","20 11","21 11","Compiler error","",3),
new Question("Write the output of this code.","void print(const int &n)<br>{<br>    cout&lt;&lt;n++&lt;&lt;\" \";<br>}<br>int main()<br>{<br>    int num = 12;<br>    print(num);print(num);<br>}","12 13","13 14","Compiler error","",3)]
 var quiz = new Quiz(questions);populate();
