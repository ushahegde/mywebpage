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
    this.choices = [ans1,ans2,ans3,ans4]; 
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
        console.log(choices[1]);
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
new Question('If a template class Array is defined, then the following statement is --------','Array&lt;int&gt; myarray;','Template specialization','Template instantiation','Template definition','None of the above',2),
 new Question('What is the correct way to use the generic function max given below to find maximum of two integers n1 and n2?','template &lt;class t&gt;<br>t max(t num1,t num2)<br>{<br>    if(num1&gt;num2)<br>        return num1;<br>    else<br>       return num2;<br>}','int ans = max&lt;int&gt;(n1,n2);','int ans = max(n1,n2);','Both 1 and 2','Neither',3),
 new Question('Can member functions of a template class be defined outside the class body?','','No, they can not.','Yes, like any other member function','Yes, but they have to be preceded by template header.','',3),
 new Question('For the given template class declaration Number, how do you instantiate the class for "double" data type?','template &lt;class T&gt;<br>class Number<br>{<br>   T n;<br> <br> public:<br>    Number(T val);<br>    T getn();<br>    void setn(T val);	 <br>};','Number&lt;double&gt; obj1(5.2);','Number obj(double);','template &lt;Number,double&gt; obj;','None of the above',1),
 new Question('What happens, if you replace class T with typename T  as shown  below in template header,','template &lt;typename T&gt;<br>class Array<br>{<br>    T * element;<br>    int size;<br>public:<br> ---------<br>}','Run time error','Throws a compliation error','No error. Program works fine','',3),
 new Question('With the following declaraction of template class, which of these statements is incorrect?','template&lt;class T,int size&gt;<br>class Vector1<br>{<br>------<br>};','Vector1&lt;int,10&gt; obj1;','int n=4;<br>Vector1&lt;double,n&gt; obj2;','const int m=10;<br>Vector1&lt;float,m&gt; obj3;','All of theabove',2),
new Question('Can we provide a default type argument to the template class below? If yes, how is it done?','template &lt;class T&gt;<br>class Array<br>{<br>    T * element;<br>    int size;<br>public:<br> ---------<br>}','No, it is not possible','Yes. By writing specialization of template','Yes, by writing template header as<br>template &lt;class T=datatype&gt;','2 and 3',3),
 new Question('What is/are the error/s in this code?','template &lt;class T&gt;<br>class A<br>{<br>   T num1;<br>   T num2;<br> public:<br>   A(T n);<br>   T getnum();<br>};<br>A::(T n)<br>{<br>   num1=num2 =n;<br>}<br>T A::getnum()<br>{<br>   return num1;<br>}','The class does not have destructor','Constructor and getnum function definitions do not have template header','A template class should have one non-template data member','No errors',2),
 new Question('What are the errors if any, in the following code?','template&lt;class T&gt;<br>T add(T num1,T num2)<br>{<br>    return num1+num2;<br>} <br>template &lt;&gt;<br> char* add( char *s1,char *s2)<br>{<br>    return strcat(s1,s2);<br>}','We can not overload a template function','second template function must start with<br> template&lt;class char*&gt;','No errors as second function is template specialization','',3),
 new Question('What is the output of the following program?','template &lt;class  T&gt;<br>T max(T x, T y)<br>{<br>    return (x &gt; y)? x : y;<br>}<br>int main()<br>{<br>    cout &lt;&lt; max(3, 7) &lt;&lt; endl;         return 0;<br>}','7','7.0','Compiler error. Template can be used only for classes','Compiler error. Template function should use<br>max&lt;int&gt;(3,7)',1)];
var quiz = new Quiz(questions);populate();
