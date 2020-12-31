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
    var gameOverHTML = "<h2 class='heading'>Result</h2>";
    gameOverHTML += "<h1 class='heading'> Your score: " + quiz.score + "/"+(quiz.questionIndex)+ "</h1>";
    var element = document.getElementById("quiz");
 
    element.innerHTML = gameOverHTML;
};

function showNextQuestion() { 	
   quiz.questionIndex++;
   populate();
 }
 var questions = [ 
new Question('What does the following catch handler do?','try<br>{<br>/******/<br>}<br>catch(...)<br>{<br>/******/<br>}','Catches default exception','Catches all exceptions','Syntax error','',2),
new Question('throw keyword can be used to --------','    ','throw an exception','Terminate the program','there is no such keyword.','',1),
new Question('What is the output of the program?','int divide(int n1,int n2)<br>{<br>  try{<br>     if(n2==0) throw 8;<br>     return  n1/n2;<br>    }<br>    catch( unsigned int  e)<br>    {<br>        cout&lt;&lt;"there was an error in divide";	             	 <br>     } <br>}<br>int main()<br>{<br>    int n1,n2;n1=11;n2=0;<br>    cout&lt;&lt;divide(n1,n2);	 <br>    return 0;<br>}','Program crashes','there was an error in divide','no output','',1),
new Question('What is the error in this code?','int divide(int n1,int n2)<br>{<br> try{<br>          if(n2==0) <br>               throw 1.8;		 <br>        return  n1/n2;<br>  } 	 <br>}<br>int main()<br>{<br>      int n1,n2;<br>      cout&lt;&lt;divide(n1,n2);	 <br>      return 0;<br>}','Throw can throw only an integer value.','try block can be used only in main function.','try is not followed by any catch block','All of the above',3),
new Question('What is the output of the program?','int divide(int n1,int n2)<br>{<br>   try{<br>      if(n2==0) throw 8;<br>      return  n1/n2;<br>   }catch(  int  e)<br>   {<br>       cout&lt;&lt;"there was an error in divide";		 <br>    }<br>   cout&lt;&lt;" still in divide function";<br>   return -1;	 <br>}<br>int main()<br>{<br>     int n1,n2;n1=11;n2=0;<br>     cout&lt;&lt;divide(n1,n2);	 <br>     return 0;<br>}','there was an error in divide','there was an error in divide still in divide function-1','Program crashes','None of the above',2),
new Question('Which of the following statements are true regarding exception handling?','','Code  which may throw exception should be enclosed in try block.','A try block should be followed by one or more catch blocks which will handle the exceptions','If an exception is not caught, current scope is exited and the block higher in calling chain is entered into scope.','All of the above',4),
new Question('Which of the following statements is true regarding throw; statement?','','It causes the exception to be rethrown','It throws a void exception','It throws an exception of type std::exception','None of the above',1),
new Question('What is the output of the following code if input is 0 10?','int divide(int n1,int n2) throw (int)<br>{ <br>     if(n2==0) throw 8;<br>         else if(n1==0)<br>            throw 11.4;<br>    return  n1/n2; <br>} <br>  <br>int main(int argc, char **argv)<br>{<br>   int n1,n2;<br>   cin&gt;&gt;n1&gt;&gt;n2;<br>   try{<br>       cout&lt;&lt;divide(n1,n2); <br>     }<br>    catch(int error)<br>   {<br>      cout&lt;&lt;"There was an int exception";<br>    }<br>   catch(...)<br>  {<br>       cout&lt;&lt;"this is catch all";<br>   } <br>return 0;<br>}','There was an int exception','There was a double exception','this is catch all','Program crashes',4),
new Question('What is the output of the following code if input is 10 0?','class base<br>{<br>};<br>class derived:public base<br>{<br>};<br><br>int divide(int n1,int n2)<br>{<br> try{<br>     if(n2==0) throw  derived();                 <br>          return  n1/n2;<br>   }catch(  base e)<br>  {<br>      cout&lt;&lt;" Caught base class error";<br>  }<br> catch(derived e)<br> {<br>    cout&lt;&lt;"Caught derived class error";<br> }<br> return -1;<br>}<br> <br> int main(int argc, char **argv)<br>{<br>   int n1,n2;<br>   cin&gt;&gt;n1&gt;&gt;n2;<br>   cout&lt;&lt;divide(n1,n2);	  <br>   return 0;<br>}','Caught base class error-1','Caught derived class error-1','-1','Program crashes',1),
new Question('What is the output of the following program if input is 0 11?','int divide(int n1,int n2) throw (int,double)<br>{  <br> if(n2==0) throw 8;<br>  else if(n1==0)<br>     throw 11.4;<br> return  n1/n2; <br>} <br>  <br>int main(int argc, char **argv)<br>{<br>   int n1,n2;<br>   cin&gt;&gt;n1&gt;&gt;n2;<br> try{<br>       cout&lt;&lt;divide(n1,n2); <br>     }<br>    catch(int error)<br>   {<br>        cout&lt;&lt;"There was an int error";<br>     }<br>    catch(...)<br>    {<br>           cout&lt;&lt;"this is catch all";<br>     }<br> return 0;<br>}','There was an int error','this is catch all','Program crash','',2),
new Question('How do you declare a function int foo(int) which can not throw any exceptions?','','int foo(int) throw (void);','int foo(int) throw();','int foo(int);','None of the above','2<br>What is the output of the following code for input 10 0?','int divide(int n1,int n2) throw ()<br>{ <br>   try{<br>        if(n2==0) throw 8;<br>         return  n1/n2; <br>     }<br>   catch (int e)<br>     {<br>        cout&lt;&lt;"There was an int error";<br>     }<br>    catch(...)<br>   {<br>       cout&lt;&lt;"this is catch all";<br>    }  <br>   return -1;<br>} <br>  <br>int main()<br>{<br>  int n1,n2;<br>  cin&gt;&gt;n1&gt;&gt;n2;	<br>  cout&lt;&lt;divide(n1,n2); 	 <br>  return 0;<br>}','Program crashes','Compilation error','There was an int error -1','',3),
new Question('What does stack unwinding do?','','If an exception is not handled in current function, the scope is changed to next function in the stack and this continues until a matching handler is found','Properly cleans up all the local objects in the path by calling destructors','Both 1 and 2','Neither',3),
new Question('What is the output of the following program if input is 10 0?','class A<br>{<br>  int n;<br>public:<br> A(int m):n(m)<br> {<br>    cout&lt;&lt;"A ctor "&lt;&lt;n&lt;&lt;"\n";<br>  }<br> ~A()<br>  {<br>      cout&lt;&lt;"A dtor "&lt;&lt;n&lt;&lt;"\n"; <br> }<br>};<br>int divide(int n1,int n2)  <br>{ <br>  A obj1(10);<br>  if(n2==0) throw 8;  else if(n1==0)<br>    throw 11.4;<br>     return  n1/n2; <br>} <br>int div2(int n1,int n2)<br>{<br>   A obj2(2);<br>   divide(n1,n2);<br>}  <br>int main()<br>{<br>   int n1,n2;<br>   A obj3(8);<br>    cin&gt;&gt;n1&gt;&gt;n2;<br>    try{ <br>          div2(n1,n2); <br>      }<br>    catch(int error)<br>    {<br>            cout&lt;&lt;"There was an int error";<br>     }<br>    catch(...)<br>   {<br>      cout&lt;&lt;"this is catch all";<br>    } 	<br>   return 0;<br>}','A constructor 2<br>A constructor 10<br>There was an int error','A constructor 2<br>A constructor 10<br>A destructor 10<br>There was an int error','A constructor 2<br>A constructor 10<br>A destructor 10<br>A destructor 2<br>There was an int error','None of the above',3),
new Question('What is the output of the following program if input is 10 0?','class A<br>{<br>    int n;<br>public:<br>    A(int m):n(m)<br>    {<br>        cout&lt;&lt;"A ctor "&lt;&lt;n&lt;&lt;"\n";<br>     }<br>     ~A()<br>     {<br>         cout&lt;&lt;"A dtor "&lt;&lt;n&lt;&lt;"\n";<br>      }<br>};<br>int divide(int n1,int n2)  <br>{ <br>   A obj1(10);<br>   if(n2==0) throw 8;<br>        else if(n1==0)<br>             throw 11.4;<br>    return  n1/n2; <br>} <br><br>int div2(int n1,int n2)<br>{<br>   A obj2(2);<br>   divide(n1,n2);<br>}<br>  <br>int main(int argc, char **argv)<br>{<br>    int n1,n2;<br>    A obj3(8);<br>    cin&gt;&gt;n1&gt;&gt;n2;<br>    try{ <br>        div2(n1,n2); <br>    }<br>    catch(double error)<br>    {<br>         cout&lt;&lt;"There was an exception of type double";<br>     }<br>     return 0;<br>}','A constructor 2<br>A constructor 10<br>Program crashes','A constructor 2<br>A constructor 10<br>A destructor 10<br>A destructor 2','A constructor 10<br>A constructor 2<br>There was an exception of type double','None of the above',1),
new Question('What is the output of the following program if input is 10 0?','int divide(int n1,int n2)  <br>{ <br>    try{<br>         if(n2==0) throw 8;<br>          return  n1/n2; <br>         }catch(int e){<br>               cout&lt;&lt;"caught exception in divide function";<br>               throw;<br>           } <br>} <br>int div2(int n1,int n2)<br>{<br>    try{ <br>         divide(n1,n2);<br>     }catch(int e)<br>    {<br>            cout&lt;&lt;"caught exception in div2 function";<br>    }<br> }  <br>int main(int argc, char **argv)<br>{<br>    int n1,n2;<br>    cin&gt;&gt;n1&gt;&gt;n2;<br>    div2(n1,n2);  <br>    return 0;<br>}','Compilation error','caught exception in divide function','caught exception in div2 function','caught exception in divide function caught exception in div2 function',4),
new Question('What is the output of the following program?','int main()<br>{<br>     int m=0;<br>     throw 10;<br>     cout&lt;&lt;m;<br>     return 0;<br>}','10','No output','Abnormal termination of the program','0','3<br>How do you declare a function which can throw any type of exception?','','int fun(int a) throw(...);','int fun(int a);','int fun(int a) throw();','None of the above',2),
new Question('What is the output of the following program?','int fun()<br>{<br>   int a;<br>   cin&gt;&gt;a;<br>    try<br>    {<br>        if(a==0)<br>        {<br>           throw 12.0; <br>        }<br>     }<br>    catch(int ex)<br>    {<br>       cout&lt;&lt;"int exception";<br>     }<br>    catch(float ex){<br>        cout&lt;&lt;"float exception";<br>    }	<br>}<br>int main()<br>{<br>     fun();<br>     return 0;<br>}','int exception','float exception','no output','Abnormal termination of program',4)];
var quiz = new Quiz(questions);populate();
