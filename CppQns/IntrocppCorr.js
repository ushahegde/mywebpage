 
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
        
        console.log(str)
        
     //   str = str.replace(/'/g,'"');
        element.innerHTML = str;
        
        var strcode = quiz.getQuestionIndex().textcode;
        var elcode = document.getElementById("questioncode");
        strcode = strcode.replaceAll(" NLL ","<br>")
        strcode = strcode.replaceAll(" ","&nbsp;");
        if(strcode!='a'&& strcode!="")
          elcode.innerHTML = strcode;
        
        var nextButton = document.getElementById('nextbutton');
        nextButton.innerHTML = "Skip";
        
       
        var choices = quiz.getQuestionIndex().choices;
        console.log(choices[1]);
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
 }
 var questions = [ 
new Question('What does the following statement print?','cout &lt; &lt;endl;','endl','Compilation error','newline char','None of the above',3),
new Question('What is the size of bool data type in C++?','a','There is no built in data type bool','1 bit','1 byte','Same as size of int',3),
new Question('What is the output of the following code?','bool b = 10 &gt;0; NLL cout &lt; &lt;b;','compilation error','true','false',1,4),
new Question('What is the output of the following code?','int main() NLL { NLL     string s1="Hello world"; NLL     string s2("Hello world"); NLL     if(s1==s2) NLL        cout &lt; &lt;"equal"; NLL     else NLL       cout &lt; &lt;"not equal"; NLL }','Compiler error','Not equal','equal','Run time error',3),
new Question('With the code given below, which statement when added to code will produce compilation error?','string str = "Hello world";','str = "bye world";','str[0]=h;','*str=h;','All of the above',3),
new Question('What is/are the errors in this program?','#include &lt;iostream &gt;NLL int main() NLL { NLL     std::cout &lt; &lt;"Hello world" &lt; &lt;std::endl; NLL }','The code should have  NLL using namespace std;','std::cout is syntactically wrong','std::endl is wrong','No error',4),
new Question('What is/are the errors in this program?','#include &lt;iostream &gt;NLL using std::cout; NLL int main() NLL { NLL      cout &lt; &lt;"Hello world"; NLL }','using namespace std; NLL should be used','using namespace cout; NLL should be used','No error','m',3),
new Question('How do you read variables a and b after the following code?','int a; NLL char b[30];','cin &gt;&gt;&a; NLL for(int i=0;i &lt;30;i++) NLL   cin &gt;&gt;&b[i];','cin &gt;&gt;a,b;','cin &gt;&gt;a &gt;&gt;b;','Any of the above',3),
new Question('What is the output of the following program?','#include &lt;iostream &gt; NLL using std::cout;  NLL  int main() NLL { NLL     bool b= -1;  NLL     if(b){ NLL      cout &lt; &lt;"b is true"; NLL     }else{ NLL        cout &lt; &lt;"b is false"; NLL     }  NLL     return 0; NLL }','b is true','b is false','compiler error','k',1),
new Question('What is the output of the following program?','#include &lt;iostream &gt;NLL int main() NLL { NLL    int m=10; NLL    float x =9.88f NLL    cout &lt; &lt;m; NLL }','109.88','10 9.88','Compiler error','p',3),
new Question('What is the output of this program if "a"  is entered instead of a number?','#include &lt;iostream &gt;NLL using namespace std; NLL int main() NLL { NLL  int m; NLL  while(cin &gt;&gt;m) NLL  { NLL      if(m==-1) NLL           break; NLL       cout &lt; &lt;endl &lt; &lt;m*m; NLL  } NLL  return 0; NLL }','0','65','Random value','Infinite loop',4),
new Question('What will be the output of the program, if "Hello world" is entered as input?','#include &lt;iostream &gt;NLL using std::cin; NLL using std::cout; NLL int main() NLL { NLL    char str[30]; NLL    cin &gt;&gt;str; NLL    cout &lt; &lt;"You typed " &lt; &lt;str; NLL    return 0; NLL }','You typed H','You typed Hello world','You typed Hello','None of the above',3),
new Question('What is the output of the program?','#include &lt;iostream &gt;NLL using namespace std; NLL int main() NLL { NLL      int a = 10;int c=2; NLL      bool b =a &gt;c?true:false; NLL      cout &lt; &lt;b; NLL      return 0; NLL }','true','false',1,'None of the above',3),
new Question('Which of these is the correct code to read an integer from keyboard?','int m;','cin &gt;&gt;&m;','cin(m);','cin &gt;&gt;m;','p',3),
new Question('How do you read a string from the keyboard?','char str[30];','cin &gt;&gt;str[30];','cin &gt;&gt;str[];','cin &gt;&gt;str;','p',3),
new Question('Write the output of the code shown below. ','int a=10; NLL cout &lt; &lt;"a is",a;','a is 10','compiler error','a is NLL 10','p',2),
new Question('How do you ensure that the code below does not go into infinite loop if a letter is entered.','while(num &gt;0) NLL { NLL      cin &gt;&gt;num; NLL     -------------------? NLL     cout &lt; &lt;num*num; NLL }','if(cin.fail())   break;','if(cin.error()) break;','if(isalpha(num)) break;','k',1),
new Question('Write the output of this code if input is Hello World?','char s[50]; NLL cin.getline(s,50); NLL cout &lt; &lt;s;','Hello','Hello World','Compiler error','p',2),
new Question('What is the output of this program?','#include &lt;iostream &gt;NLL int main() NLL { NLL      cout &lt; &lt;"Hello world"; NLL }','Hello world','Hello','Compiler error','p',3),
new Question('What is the error in this program?','#include &lt;iostream &gt;NLL using std::cin; NLL int main() NLL { NLL      float n; NLL      cin &gt;&gt;n; NLL }','using namespace std; NLL is missing','No error.','We should include  &lt;cin &gt;in the program','l',2),
new Question('What are the errors in this code?','int a = 10; NLL bool b = a; NLL if(a &gt;5) NLL    b = true;','b = a  is wrong','use b= TRUE instead of b=true;','No error','l',3),
new Question('What is the output of the program if the number 5 is entered?','bool isOdd(int n) NLL { NLL     if(n%2) return 1; return 0; NLL } NLL int main() NLL { NLL     int m; NLL     cin &gt;&gt;m; NLL     if(isOdd(m)) NLL         cout &lt; &lt;"Odd number"; NLL }','Odd number','No output','Error. A function can not return bool value','Error. There can not to be 2 return statements in a function. ',1),
new Question('What is string in C++?','a','Basic data type like int, char etc.','Library function','Standard library class','An array',3),
new Question('Which of these lines contain error in the code below?','string str[5]; NLL cin &gt;&gt;str; NLL cout &lt; &lt;"you entered" &lt; &lt;str;','string str[5];','cin &gt;&gt;str;','No error','p',1),
new Question('How do you concat two strings str1 and str2 and store it back in str1?','string str1 = "Hello"; NLL string str2 = "World;','strcat(str1,str2);','str1.concat(str2);','str1 = str1+str2;','p',3),
new Question('What is the output of the following code?','string str1="Hello world"; NLL cout &lt; &lt;str1[0];','H','Compiler error','Hello','p',1),
new Question('Write the output of the following program.','#include &lt;iostream &gt;NLL int main() NLL { NLL    string str1 = "Hello world"; NLL    cout &lt; &lt;str1; NLL }','Hello world','Hello','Compiler error','p',3),
];
var quiz = new Quiz(questions);populate();
