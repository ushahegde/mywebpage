 
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
        strcode = strcode.trim();
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
new Question('What does the following statement print?','cout&lt;&lt;endl;','endl','Compilation error','newline char','None of the above',3),
new Question('What is the size of bool data type in C++?','  ','There is no built in data type bool','1 bit','1 byte','Same as size of int',3),
new Question('What is the output of the following code?','bool b = 10 &gt;0;<BR>cout&lt;&lt;b;','compilation error','true','false',1,4),
new Question('What is the output of the following code?','int main()<BR>{<BR>    string s1="Hello world";<BR>    string s2("Hello world");<BR>    if(s1==s2)<BR>       cout&lt;&lt;"equal";<BR>    else<BR>      cout&lt;&lt;"not equal";<BR>}','Compiler error','Not equal','equal','Run time error',3),
new Question('With the code given below, which statement when added to code will produce compilation error?','string str = "Hello world";','str = "bye world";','str[0]=h;','*str=h;','All of the above',3),
new Question('What is/are the errors in this program?','#include &lt;iostream &gt;<BR> int main()<BR>{<BR>    std::cout&lt;&lt;"Hello world" &lt;&lt;std::endl;<BR>}','The code should have <BR>using namespace std;','std::coutis syntactically wrong','std::endl is wrong','No error',4),
new Question('What is/are the errors in this program?','#include &lt;iostream &gt;<BR> using std::cout;<BR>int main()<BR>{<BR>     cout&lt;&lt;"Hello world";<BR>}','using namespace std;<BR>should be used','using namespace cout;<BR>should be used','No error','  ',3),
new Question('How do you read variables a and b after the following code?','int a;<BR>char b[30];','cin &gt;&gt;&a;<BR>for(int i=0;i &lt;30;i++)<BR>  cin &gt;&gt;&b[i];','cin &gt;&gt;a,b;','cin &gt;&gt;a &gt;&gt;b;','Any of the above',3),
new Question('What is the output of the following program?','#include &lt;iostream &gt;<BR>using std::cout; <BR> int main()<BR>{<BR>    bool b= -1; <BR>    if(b){<BR>     cout&lt;&lt;"b is true";<BR>    }else{<BR>       cout&lt;&lt;"b is false";<BR>    } <BR>    return 0;<BR>}','b is true','b is false','compiler error','  ',1),
new Question('What is the output of the following program?','#include &lt;iostream &gt;<BR> int main()<BR>{<BR>   int m=10;<BR>   float x =9.88f<BR>   cout&lt;&lt;m;<BR>}','109.88','10 9.88','Compiler error','   ',3),
new Question('What is the output of this program if "a"  is entered instead of a number?','#include &lt;iostream &gt;<BR> using namespace std;<BR>int main()<BR>{<BR> int m;<BR> while(cin &gt;&gt;m)<BR> {<BR>     if(m==-1)<BR>          break;<BR>      cout&lt;&lt;endl &lt;&lt;m*m;<BR> }<BR> return 0;<BR>}','0','65','Random value','Infinite loop',4),
new Question('What will be the output of the program, if "Hello world" is entered as input?','#include &lt;iostream &gt;<BR> using std::cin;<BR>using std::cout;<BR>int main()<BR>{<BR>   char str[30];<BR>   cin &gt;&gt;str;<BR>   cout&lt;&lt;"You typed " &lt;&lt;str;<BR>   return 0;<BR>}','You typed H','You typed Hello world','You typed Hello','None of the above',3),
new Question('What is the output of the program?','#include &lt;iostream &gt;<BR> using namespace std;<BR>int main()<BR>{<BR>     int a = 10;int c=2;<BR>     bool b =a &gt;c?true:false;<BR>     cout&lt;&lt;b;<BR>     return 0;<BR>}','true','false',1,'None of the above',3),
new Question('Which of these is the correct code to read an integer from keyboard?','int m;','cin &gt;&gt;&m;','cin(m);','cin &gt;&gt;m;','   ',3),
new Question('How do you read a string from the keyboard?','char str[30];','cin &gt;&gt;str[30];','cin &gt;&gt;str[];','cin &gt;&gt;str;','   ',3),
new Question('Write the output of the code shown below. ','int a=10;<BR>cout&lt;&lt;"a is",a;','a is 10','compiler error','a is<BR>10','   ',2),
new Question('How do you ensure that the code below does not go into infinite loop if a letter is entered.','while(num &gt;0)<BR>{<BR>     cin &gt;&gt;num;<BR>    -------------------?<BR>    cout&lt;&lt;num*num;<BR>}','if(cin.fail())   break;','if(cin.error()) break;','if(isalpha(num)) break;','   ',1),
new Question('Write the output of this code if input is Hello World?','char s[50];<BR>cin.getline(s,50);<BR>cout&lt;&lt;s;','Hello','Hello World','Compiler error','   ',2),
new Question('What is the output of this program?','#include &lt;iostream &gt;<BR> int main()<BR>{<BR>     cout&lt;&lt;"Hello world";<BR>}','Hello world','Hello','Compiler error','   ',3),
new Question('What is the error in this program?','#include &lt;iostream &gt;<BR> using std::cin;<BR>int main()<BR>{<BR>     float n;<BR>     cin &gt;&gt;n;<BR>}','using namespace std;<BR>is missing','No error.','We should include  &lt;cin &gt;in the program','   ',2),
new Question('What are the errors in this code?','int a = 10;<BR>bool b = a;<BR>if(a &gt;5)<BR>   b = true;','b = a  is wrong','use b= TRUE instead of b=true;','No error','  ',3),
new Question('What is the output of the program if the number 5 is entered?','bool isOdd(int n)<BR>{<BR>    if(n%2) return 1; return 0;<BR>}<BR>int main()<BR>{<BR>    int m;<BR>    cin &gt;&gt;m;<BR>    if(isOdd(m))<BR>        cout&lt;&lt;"Odd number";<BR>}','Odd number','No output','Error. A function can not return bool value','Error. There can not to be 2 return statements in a function. ',1),
new Question('What is string in C++?','a','Basic data type like int, char etc.','Library function','Standard library class','An array',3),
new Question('Which of these lines contain error in the code below?','string str[5];<BR>cin &gt;&gt;str;<BR>cout&lt;&lt;"you entered" &lt;&lt;str;','string str[5];','cin &gt;&gt;str;','No error','   ',1),
new Question('How do you concat two strings str1 and str2 and store it back in str1?','string str1 = "Hello";<BR>string str2 = "World;','strcat(str1,str2);','str1.concat(str2);','str1 = str1+str2;','   ',3),
new Question('What is the output of the following code?','string str1="Hello world";<BR>cout&lt;&lt;str1[0];','H','Compiler error','Hello','   ',1),
new Question('Write the output of the following program.','#include &lt;iostream &gt;<BR> int main()<BR>{<BR>   string str1 = "Hello world";<BR>   cout&lt;&lt;str1;<BR>}','Hello world','Hello','Compiler error','   ',3),
];
var quiz = new Quiz(questions);populate();
