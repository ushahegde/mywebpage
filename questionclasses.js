   function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}
 
Quiz.prototype.getQuestionIndex = function() {
    return this.questions[this.questionIndex];
}
 
Quiz.prototype.guess = function(answer,button) {
   var element = document.getElementById("answerIndicator");
    if(this.getQuestionIndex().isCorrectAnswer(answer)) {
        this.score++;
        button.style="color:green;";
   
         element.style="color:green;";
        element.innerHTML="CORRECT";
     
        
    }else{
    	 button.style="color:red";
        //console.log("wrong"+answer);
     //   console.log(answer); 
       element.style="color:red;";
     element.innerHTML="WRONG";  
      
    }
 
    this.questionIndex++;
}
 
Quiz.prototype.isEnded = function() {
    return this.questionIndex ==  this.questions.length;
}
 
 
function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = choices[answer-1];
    console.log("Setting asnwer to "+this.answer);
}
 
Question.prototype.isCorrectAnswer = function(choice) {
	console.log("choice is"+choice);
	console.log("this.choices  is"+this.choices );
    return this.answer === choice;
}
 
 
function populate() {
    if(quiz.isEnded()) {
        showScores();
    }
    else {
        // show question
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;
 
        // show options
        var choices = quiz.getQuestionIndex().choices;
        for(var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }
 
        showProgress();
    }
};
 
function guess(id, guess) {
    var button = document.getElementById(id);
    button.style="color:white;";
    button.onclick = function() {
        quiz.guess(guess,this);
        setTimeout(function(){
        	populate();
        },2000);
    }
};
 /*
 
 function btninit(){
 	var b1 = document.getElementById("next");
 	b1.onclick=function(){
 		populate();
 	};
 };
 */
function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
 //   quiz.questionIndex++;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
};
 
function showScores() {
    var gameOverHTML = "<h1>Result</h1>";
    gameOverHTML += "<h2 id='score'> Your scores: " + quiz.score + "</h2>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
};
 
// create questions here
var questions = [
new Question("Which of these access specifiers can be used in an interface?<br><div class='codetext'><br></div>",["public","private","protected","All of these"],1),
new Question("The default value of a static integer variable of a class in Java is,<br><div class='codetext'><br></div>",["0","1","Garbage","-1"],3),
new Question("Which statement is not true in java language?<br><div class='codetext'><br></div>",["A public member of a class can be accessed in all the packages.","A private member of a class cannot be accessed by the methods of the same class.","A private member of a class cannot be accessed from its derived class.","A protected member of a class can be accessed from its derived class."],2),
new Question("Which of the following is not true?<br><div class='codetext'><br></div>",["An interface can extend another interface."," A class which is implementing an interface must implement all the methods of the interface.","An interface can implement another interface.","An interface is a solution for multiple inheritance in java."],3),
new Question("What is the output of the following program?<br><div class='codetext'>&nbsp;&nbsp;&nbsp;&nbsp;class&nbsp;Test<br>&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;public&nbsp;void&nbsp;m1&nbsp;(int&nbsp;i,float&nbsp;f)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.println('&nbsp;Method&nbsp;m1&nbsp;with&nbsp;int&nbsp;float');<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;public&nbsp;void&nbsp;m1(float&nbsp;f,int&nbsp;i)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.println('Method&nbsp;m1&nbsp;with&nbsp;float&nbsp;int');<br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;&nbsp;<br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;public&nbsp;static&nbsp;void&nbsp;main(String[]args)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Test&nbsp;t=new&nbsp;Test();<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;t.m1(20,20);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br></div>",["Method m1 with int float","Method m1 with float int","Compiler error","Run time error"],3),
new Question("What is the output of the following program?<br><div class='codetext'>class&nbsp;Test{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;private&nbsp;Test(){//line&nbsp;2<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.println('Hello');<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;public&nbsp;static&nbsp;Test(int&nbsp;a){//line&nbsp;5<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.println('constructor');<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;public&nbsp;static&nbsp;void&nbsp;main(String&nbsp;args[]){<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Test&nbsp;t&nbsp;=&nbsp;new&nbsp;Test(1);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>}<br></div>",["Hello","Constructor","Error in line 2","Error in line 5"],4),
new Question("Which of the following are valid constructors of the class Bar?<br><div class='codetext'><br></div>",["public Bar(int a)","private Bar()","public void Bar()","None of the above"],3),
new Question("Which of the following statements about constructor are true?<br><div class='codetext'><br></div>",["A constructor can be private","Constructor is used to create an object","Constructor has the same name as class","All of the above"],4),
new Question("If there is no constructor for a class, Java system generates a constructor which is called<br><div class='codetext'><br></div>",["Empty constructor","Default constructor","Null constructor","None of the above"],2),
new Question("What are the properties of a constructor?<br><div class='codetext'><br></div>",["Has no return type","Has same name as class","Both 1 and 2","None of the above"],3),
new Question("Which of the following statements are true about constructors?<br><div class='codetext'><br></div>",["Constructors can be overloaded ","For a class with no constructors, system provides a default constructor","Constructor is called automatically when an object is created.","All of the above"],4),
new Question("Which of the following statements are true about objects?<br><div class='codetext'><br></div>",["Object is an instance of a class","An object can access only instance members of a class","new will create an object","None of the above"],2),
new Question("A final class is a class which can not be -------<br><div class='codetext'><br></div>",["Instantiated","Subclassed","Accessed","None of the above"],2),
new Question("Which of the following statements is false about an object?<br><div class='codetext'><br></div>",["Object is an instance of a class","Object is created using new keyword","Each object has its own copy of instance variables","Fields of an object should always be public"],4),
new Question("What is the output of the following program?<br><div class='codetext'>public&nbsp;class&nbsp;Test{<br>&nbsp;&nbsp;&nbsp;&nbsp;public&nbsp;Test(){<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.println('10');<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;private&nbsp;Test(int&nbsp;n){<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.println(n);<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;public&nbsp;static&nbsp;void&nbsp;main(String&nbsp;args[]){<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Test&nbsp;t&nbsp;=&nbsp;new&nbsp;Test(-9);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>}<br></div>",["10","-9","Compiler error because constructor is private","Compiler error because n is negative"],2),
new Question("What is the output of the following program?<br><div class='codetext'>public&nbsp;class&nbsp;Test{<br>&nbsp;&nbsp;&nbsp;&nbsp;public&nbsp;Test(){<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.println('Constructor');<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;static&nbsp;Test(int&nbsp;n){<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;this();<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.println('the&nbsp;parameter&nbsp;is&nbsp;'+n);<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;public&nbsp;static&nbsp;void&nbsp;main(String&nbsp;args[])<br>&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Test&nbsp;obj&nbsp;=&nbsp;new&nbsp;Test(10);<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>}<br></div>",["Error because constructor can not be static","Error because of the call this()","Constructor<br>The parameter is 10","No output"],1),
new Question("What is the output of the following program?<br><div class='codetext'>public&nbsp;class&nbsp;Test{<br>&nbsp;&nbsp;&nbsp;&nbsp;Test(){<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.println('Constructor');<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;void&nbsp;method(int&nbsp;n){<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;this();<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.println('method');<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;public&nbsp;static&nbsp;void&nbsp;main(String&nbsp;args[]){<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Test&nbsp;obj&nbsp;=&nbsp;new&nbsp;Test();<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;obj.method(10);<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>}<br></div>",["Constructor<br>Constructor<br>method","Constructor<br>method","Compiler error","Run time error"],3),
new Question("What is the implicit return type of a constructor?<br><div class='codetext'><br></div>",["Object of that class","void","int ","None of the above"],1),
new Question("Which of the following is the deault constructor for the given class?<br><div class='codetext'>class&nbsp;MyClass{}<br></div>",["public MyClass(int n){}","public void  MyClass(){}","public MyClass(){}","All of the above"],3),
new Question("Which of the following statements are true about the code given below. <br><div class='codetext'>public&nbsp;class&nbsp;Test{<br>&nbsp;&nbsp;&nbsp;&nbsp;Test(int&nbsp;a,&nbsp;int&nbsp;b){<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.println('Constructor');<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;void&nbsp;method(int&nbsp;n){&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.println('method');<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;public&nbsp;static&nbsp;void&nbsp;main(String&nbsp;args[]){<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Test&nbsp;obj&nbsp;=&nbsp;new&nbsp;Test();//line&nbsp;1<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;obj.method(10);//line&nbsp;2<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>}<br></div>",["There is an error in line 1","There is an error in line2","There are no errors in the program.",""],1),
new Question("Which of the following statements about constructors are false?<br><div class='codetext'><br></div>",["A constructor has no return typ","Its name must be the same as the class in which it is defined","There can be only one constructor per class","All of the above"],3),
new Question("In an instance method, ---- refers to the current object.<br><div class='codetext'><br></div>",["this","super","obj","None of the above"],1),
new Question("Which of these statements about constructors is true?<br><div class='codetext'><br></div>",["A constructor can be overloaded","A constructor can call another constructor using this()","A constructor can not be static","All of the above"],4),
new Question("What is the output of the following program?<br><div class='codetext'>class&nbsp;MultiConst{<br>&nbsp;&nbsp;&nbsp;&nbsp;public&nbsp;MultiConst(){<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.println('Constructor&nbsp;1');<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;public&nbsp;MultiConst(int&nbsp;n){<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;this();<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.println('Constructor&nbsp;2');<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;public&nbsp;MultiConst(int&nbsp;a,&nbsp;int&nbsp;b){<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;this(a);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.println('Constructor&nbsp;3');<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;public&nbsp;static&nbsp;void&nbsp;main(String&nbsp;args[]){<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;MultiConst&nbsp;obj&nbsp;=&nbsp;new&nbsp;MultiConst(1,2);<br>&nbsp;&nbsp;&nbsp;}<br>}<br><br></div>",["Constructor 3","Constructor 1","Syntax error","Constructor 1<br>Constructor 2<br>Constructor 3<br>"],4),
new Question("Can a constructor call another constructor of the same class in Java?<br><div class='codetext'><br></div>",["Yes","No","",""],1),
new Question("What is the output of the following program?<br><div class='codetext'>class&nbsp;Number{<br>&nbsp;&nbsp;&nbsp;int&nbsp;n;<br>&nbsp;&nbsp;&nbsp;Number(int&nbsp;n){<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;this.n&nbsp;=&nbsp;n;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.println('value&nbsp;of&nbsp;n&nbsp;is&nbsp;'+n);<br>&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;public&nbsp;static&nbsp;void&nbsp;main(String&nbsp;args[]){<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number&nbsp;obj&nbsp;=&nbsp;new&nbsp;Number();<br>&nbsp;&nbsp;&nbsp;}<br>}<br></div>",["value of n is 0","value of n is -1","Syntax error","Run time error"],3),
new Question("The process of defining a method with the same name and different parameter types in a class is called ----<br><div class='codetext'><br></div>",["Overloading","Overriding","Name Hiding","None of the above"],1)];
    // create quiz()
var quiz = new Quiz(questions);
 
// display quiz
populate();
 
     