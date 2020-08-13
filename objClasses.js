 function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
 
}
 
 function showNextQuestion() {
 	console.log("in next question");
   quiz.questionIndex++;
   populate();
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
    return this.questions.length==this.questionIndex;
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
        element.innerHTML = quiz.getQuestionIndex().text;
 
        var nextButton = document.getElementById('nextbutton');
        nextButton.innerHTML = "Skip";
        
       
        var choices = quiz.getQuestionIndex().choices;
        for(var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            var bt = document.getElementById("btn"+i);
            element.checked = false;
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
   
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
   
};
 
function showScores() {
    var gameOverHTML = "<h1>Result</h1>";
    gameOverHTML += "<h2 > Your scores: " + quiz.score + "/"+(quiz.questionIndex)+ "</h2>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
};

var questions = [new Question("What is the output of the following program?<br><br><div class='codetext'>public&nbsp;class&nbsp;Test&nbsp;{	<br>	int&nbsp;FLOAT&nbsp;=&nbsp;3;<br>	public&nbsp;static&nbsp;void&nbsp;main(String&nbsp;args[])&nbsp;{<br>		Test&nbsp;t&nbsp;=&nbsp;new&nbsp;Test();<br>	&nbsp;&nbsp;&nbsp;&nbsp;System.out.println('the&nbsp;variable&nbsp;is&nbsp;'+t.FLOAT);	&nbsp;<br>	<br>	}<br>}<br></div>",["Compiler error","Runtime error","variable is 3","None of the above"],3),
new Question("Write the output of the following program. <br><br><div class='codetext'>public&nbsp;class&nbsp;Test&nbsp;{	<br>	int&nbsp;m&nbsp;=&nbsp;3;<br>	public&nbsp;static&nbsp;void&nbsp;main(String&nbsp;args[])&nbsp;{		<br>	&nbsp;&nbsp;&nbsp;&nbsp;System.out.println(m);&nbsp;<br>	<br>	}<br>}<br></div>",["3","0","Error","None of the above"],3),
new Question("Write the output of the following program. <br><br><div class='codetext'>public&nbsp;class&nbsp;Test&nbsp;{	<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;static&nbsp;int&nbsp;m=0;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;static&nbsp;void&nbsp;print()&nbsp;{	&nbsp;&nbsp;&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.println(String.valueOf(m));<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;m++;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;public&nbsp;static&nbsp;void&nbsp;main(String&nbsp;args[])&nbsp;{	<br>	&nbsp;&nbsp;&nbsp;Test&nbsp;t1&nbsp;=&nbsp;new&nbsp;Test();<br>	&nbsp;&nbsp;&nbsp;t1.print();<br>	&nbsp;&nbsp;&nbsp;Test&nbsp;t2&nbsp;=&nbsp;new&nbsp;Test();<br>	&nbsp;&nbsp;&nbsp;t2.print();&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>}<br></div>",["0 0","0 1","Syntax error","None of the above"],2),
new Question("The default value of a static integer variable of a class in Java is,<br><br><div class='codetext'><br></div>",["0","1","Garbage","-1"],1),
new Question("Which statement is not true in java language?<br><br><div class='codetext'><br></div>",["A public member of a class can be accessed in all the packages.","A private member of a class can be accessed by all classes in the same package. ","A private member of a class can not be accessed from its derived class.","A protected member of a class can be accessed from its derived class."],2),
new Question("A method is declared as ---- to stop derived classes from overriding this method.<br><br><div class='codetext'><br></div>",["public","static","final","void"],3),
new Question("Which of the following is not true?<br><br><div class='codetext'><br></div>",["An interface can extend another interface."," A class which is implementing an interface must implement all the methods of the interface.","An interface can implement another interface.","An interface is a solution for multiple inheritance in Java."],3),
new Question("What is the output of the following program?<br><br><div class='codetext'>class&nbsp;Test{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;private&nbsp;Test(){//line&nbsp;2<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.println('Hello');<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;public&nbsp;static&nbsp;Test(int&nbsp;a){//line&nbsp;5<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.println('constructor');<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;public&nbsp;static&nbsp;void&nbsp;main(String&nbsp;args[]){<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Test&nbsp;t&nbsp;=&nbsp;new&nbsp;Test(1);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>}<br></div>",["Hello","Constructor","Error in line 2","Error in line 5"],4),
new Question("Which of the following are not valid constructors of the class Bar?<br><br><div class='codetext'><br></div>",["public Bar(int a)","private Bar()","public void Bar()","Bar(int a, int b);"],3),
new Question("Which of the following statements about constructor are true?<br><br><div class='codetext'><br></div>",["A constructor can be private","Constructor is used to create an object","Constructor has the same name as class","All of the above"],4),
new Question("Which method is automatically called by Java system before an object is garbage collected?<br><br><div class='codetext'><br></div>",["finally()","finalize()","finalizer()","None of the above"],2),
new Question("Which package includes all the standard classes of java?<br><br><div class='codetext'><br></div>",["java.lang","java.util","java.math","java.ref"],1),
new Question("If there is no constructor for a class, Java system implicitly generates a constructor which is called as -------<br><br><div class='codetext'><br></div>",["Empty constructor","Default constructor","Null constructor","None of the above"],2),
new Question("What are the properties of a constructor?<br><br><div class='codetext'><br></div>",["Has no return type","Has same name as class","Both 1 and 2","None of the above"],3),
new Question("Which of the following statements are true about constructors?<br><br><div class='codetext'><br></div>",["Constructors can be overloaded ","For a class with no constructors, system provides a default constructor","Constructor is called automatically when an object is created.","All of the above"],4),
new Question("Which of the following statements about static inner classes is true?<br><br><div class='codetext'><br></div>",[" A static inner class does not require an instance of the enclosing class."," A static inner class cannot be a static member of outer class. "," It must extend enclosing class. ","Its variables and methods must be static"],1),
new Question("Which of the following statements are false about objects?<br><br><div class='codetext'><br></div>",["Object is an instance of a class","An object can access only instance members of a class","new keyword will create an object","None of the above"],2),
new Question("Why must the main method be static?<br><br><div class='codetext'><br></div>",["It can be accessed easily by class loader","It can be accessed without creating an object","It can be accessed by every method in the class","None of the above"],2),
new Question("A final class is a class which can not be -------<br><br><div class='codetext'><br></div>",["Instantiated","Subclassed","Accessed","None of the above"],2),
new Question("What is the output of the following program?<br><br><div class='codetext'>public&nbsp;class&nbsp;Test{<br>&nbsp;&nbsp;&nbsp;&nbsp;public&nbsp;Test(){<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.println('10');<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;private&nbsp;Test(int&nbsp;n){<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.println(n);<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;public&nbsp;static&nbsp;void&nbsp;main(String&nbsp;args[]){<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Test&nbsp;t&nbsp;=&nbsp;new&nbsp;Test(-9);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>}<br></div>",["10","-9","Compiler error because constructor is private","Compiler error because n is negative"],2),
new Question("What is the output of the following program?<br><br><div class='codetext'>public&nbsp;class&nbsp;Test{<br>&nbsp;&nbsp;&nbsp;&nbsp;public&nbsp;Test(){<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.println('Constructor');<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;static&nbsp;Test(int&nbsp;n){<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;this();<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.println('the&nbsp;parameter&nbsp;is&nbsp;'+n);<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;public&nbsp;static&nbsp;void&nbsp;main(String&nbsp;args[])<br>&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Test&nbsp;obj&nbsp;=&nbsp;new&nbsp;Test(10);<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>}<br></div>",["Error because constructor can not be static","Error because of the call this()","Constructor<br>The parameter is 10","No output"],1),
new Question("What is the output of the following program?<br><br><div class='codetext'>public&nbsp;class&nbsp;Test{<br>&nbsp;&nbsp;&nbsp;&nbsp;Test(){<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.println('Constructor');<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;void&nbsp;method(int&nbsp;n){<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;this();<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.println('method');<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;public&nbsp;static&nbsp;void&nbsp;main(String&nbsp;args[]){<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Test&nbsp;obj&nbsp;=&nbsp;new&nbsp;Test();<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;obj.method(10);<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>}<br></div>",["Constructor<br>Constructor<br>method","Constructor<br>method","Compiler error","Run time error"],3),
new Question("What is the implicit return type of a constructor?<br><br><div class='codetext'><br></div>",["Object of that class","void","int ","None of the above"],1),
new Question("Which of the following is the deault constructor for the given class?<br><br><div class='codetext'>class&nbsp;MyClass{}<br></div>",["public MyClass(int n){}","public void  MyClass(){}","public MyClass(){}","All of the above"],3),
new Question("Which of the following statements are true about the code given below. <br><br><div class='codetext'>public&nbsp;class&nbsp;Test{<br>&nbsp;&nbsp;&nbsp;&nbsp;Test(int&nbsp;a,&nbsp;int&nbsp;b){<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.println('Constructor');<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;void&nbsp;method(int&nbsp;n){&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.println('method');<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;public&nbsp;static&nbsp;void&nbsp;main(String&nbsp;args[]){<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Test&nbsp;obj&nbsp;=&nbsp;new&nbsp;Test();//line&nbsp;1<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;obj.method(10);//line&nbsp;2<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>}<br></div>",["There is an error in line 1","There is an error in line2","There are no errors in the program.",""],1),
new Question("Write the output of the following program.<br><br><div class='codetext'>public&nbsp;class&nbsp;Test{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;int&nbsp;n;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Test(int&nbsp;n){<br>	this.n&nbsp;=&nbsp;n;//line&nbsp;1<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;public&nbsp;static&nbsp;void&nbsp;main(String&nbsp;args[])<br>&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Test&nbsp;obj&nbsp;=&nbsp;new&nbsp;Test(10);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.println('Hello&nbsp;world&nbsp;');<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>}<br><br></div>",["Compiler error in line 1","Run time error","Hello world","None of the above"],3),
new Question("What is the output of the  program given below.<br><br><div class='codetext'>class&nbsp;A{<br>&nbsp;&nbsp;&nbsp;&nbsp;A(String&nbsp;s){&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.println('A&nbsp;constructor&nbsp;1&nbsp;');<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>}<br>class&nbsp;B&nbsp;extends&nbsp;A{<br>&nbsp;&nbsp;&nbsp;&nbsp;B(){&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.println('B&nbsp;constructor&nbsp;1&nbsp;');<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;B(String&nbsp;s){&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;super(s);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.println('B&nbsp;constructor&nbsp;2&nbsp;&nbsp;');<br>&nbsp;&nbsp;&nbsp;}<br>}<br>class&nbsp;Inhr{<br>&nbsp;&nbsp;&nbsp;public&nbsp;static&nbsp;void&nbsp;main(String&nbsp;args[]){<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;B&nbsp;obj2&nbsp;=&nbsp;new&nbsp;B('Hello');<br>&nbsp;&nbsp;&nbsp;}<br>}<br><br></div>",["Compiler error","A constructor 1<br>B constructor2 ","B constructor 2","None of the above"],1),
new Question("Which of the following statements about constructors are false?<br><br><div class='codetext'><br></div>",["A constructor has no return typ","Its name must be the same as the class name","There can be only one constructor per class","All of the above"],3),
new Question("In an instance method, keyword ---- refers to the current object.<br><br><div class='codetext'><br></div>",["this","super","object","None of the above"],1),
new Question("Which of these statements about constructors is true?<br><br><div class='codetext'><br></div>",["A constructor can be overloaded","A constructor can call another constructor using this()","A constructor can not be static","All of the above"],4),
new Question("What is the output of the following program?<br><br><div class='codetext'>class&nbsp;MultiConst{<br>&nbsp;&nbsp;&nbsp;&nbsp;public&nbsp;MultiConst(){<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.println('Constructor&nbsp;1');<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;public&nbsp;MultiConst(int&nbsp;n){<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;this();<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.println('Constructor&nbsp;2');<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;public&nbsp;MultiConst(int&nbsp;a,&nbsp;int&nbsp;b){<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;this(a);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.println('Constructor&nbsp;3');<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;public&nbsp;static&nbsp;void&nbsp;main(String&nbsp;args[]){<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;MultiConst&nbsp;obj&nbsp;=&nbsp;new&nbsp;MultiConst(1,2);<br>&nbsp;&nbsp;&nbsp;}<br>}<br><br></div>",["Constructor 3","Constructor 1","Syntax error","Constructor 1<br>Constructor 2<br>Constructor 3<br>"],4),
new Question("Can a constructor call another constructor of the same class in Java?<br><br><div class='codetext'><br></div>",["Yes","No","",""],1),
new Question("What is the output of the following program?<br><br><div class='codetext'>class&nbsp;Number{<br>&nbsp;&nbsp;&nbsp;int&nbsp;n;<br>&nbsp;&nbsp;&nbsp;Number(int&nbsp;n){<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;this.n&nbsp;=&nbsp;n;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.println('value&nbsp;of&nbsp;n&nbsp;is&nbsp;'+n);<br>&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;public&nbsp;static&nbsp;void&nbsp;main(String&nbsp;args[]){<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Number&nbsp;obj&nbsp;=&nbsp;new&nbsp;Number();<br>&nbsp;&nbsp;&nbsp;}<br>}<br></div>",["value of n is 0","value of n is -1","Syntax error","Run time error"],3),
new Question("The process of defining a method with the same name and different parameter types in a class is called ----<br><br><div class='codetext'><br></div>",["Overloading","Overriding","Name Hiding","None of the above"],1),
new Question("What is the output of the following program?<br><br><div class='codetext'>class&nbsp;MyClass{<br>&nbsp;&nbsp;&nbsp;&nbsp;int&nbsp;num;<br>&nbsp;&nbsp;&nbsp;&nbsp;public&nbsp;static&nbsp;void&nbsp;main(String&nbsp;args[]){<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;MyClass&nbsp;obj&nbsp;=&nbsp;new&nbsp;MyClass;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;num=10;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.println(obj.num);<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>}<br></div>",["10","Compiler error","0","None of the above"],2),
new Question("Which access modifier can be used with a class to make its members available only in the package or sub-classes?<br><br><div class='codetext'><br></div>",["public","private","protected","None of the above"],3),
];
var quiz = new Quiz(questions);populate();