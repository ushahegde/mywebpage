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
 }var questions = [new Question("jar stands for -----<br><br><div class='codetext'><br></div>",["java archieve","java archieve runner","java application runner","None of the above"],1),
new Question("Java system deletes objects automatically when they are no longer in use. This is called -----<br><br><div class='codetext'><br></div>",["Exception Handling","System Cleaning","Garbage collection","None of the above"],3),
new Question("When is the finalize() method called?<br><br><div class='codetext'><br></div>",["Just before an object or a variable goes out of scope","Just before the program execution ends","Just before garbage collector destroys the object","There is no finalize() method"],3),
new Question("In Java, garbage collection is a manual process. True or false?<br><br><div class='codetext'><br></div>",["true","false","",""],2),
new Question("Which is the base class for all other classes in Java?<br><br><div class='codetext'><br></div>",["Integer","Object","Program","None of the above"],2),
new Question("Which collection class in Java orders the keys according their natural order?<br><br><div class='codetext'><br></div>",["HashSet","LinkedList","TreeMap","SortedSet"],3),
new Question("What is the output of the following program?<br><br><div class='codetext'>public class Test {<br> public static void main(String[] args) {<br>   List<String> items = new ArrayList<>();<br>   items.add('Book');<br>   items.add('Large Book');<br>   items.add('Text Book');<br>   for (String i : items) {<br>       if (i.indexOf('B') == 0) {<br>          continue;<br>       } else {<br>            System.out.print(i+' ');<br>   }<br>  }<br>}<br>}<br></div>",["Book","Book<br>Large Book<br>Text Book<br>","Large Book<br>Text Book","No output"],3),
new Question("What is the output of the folllowing program?<br><br><div class='codetext'>import java.util.ArrayList;<br>import java.util.List;<br>public class Demo {<br>public static void main(String[] args) {<br>List<Integer> elements = new ArrayList<>();<br>elements.add(10);<br>int firstElmnt = elements.get(1);<br>System.out.println(firstElmnt);<br>}<br>}<br><br></div>",["10","0","null","IndexOutOfBounds exception"],4),
new Question("Which collection interface does not allow duplicate elements?<br><br><div class='codetext'><br></div>",["List","Set","Queue","All of the above"],2),
new Question("Which of the following statements is true?<br><br><div class='codetext'><br></div>",["A package statement if present must be the first statement of a java source file","Every file must have a package statement","import statement is used to import a type or entire package","Both 1 and 3"],4),
new Question("Which of the following statements is true?<br><br><div class='codetext'><br></div>",["A java source file can contain only one public class or interface","The name of public class/interface must be the name of file","A file can contain multiple non-public classes","All of the above"],4),
new Question("According to naming convention, the package name created by a developer in a company dev.com is <br><br><div class='codetext'><br></div>",["dev.com.mathoperations","com.dev.mathoperations","Either 1 or 2","mathoperations"],2),
new Question("To find the square root of a number in a Java program, you should do the following.<br><br><div class='codetext'><br></div>",["use<br>import static java.lang.Math.sqrt;","use Math.sqrt() function","Use <br>import static java.lang.Math.*","Any of the above"],4),
new Question("What access specifier should be used to allow the class to be accessed by methods in other package?<br><br><div class='codetext'><br></div>",["default","public ","protected","No access specifier"],2),
new Question("How do you import all the classes from a package?<br><br><div class='codetext'><br></div>",["import pkg;","import pkg.*;","Either 1 or 2",""],2),
new Question("Which of the following statements is true?<br><br><div class='codetext'><br></div>",["If package name is not specified, the classes to unnamed package","If package is not specified, classes go to java.lang package. ","If package is not specified,  there will be compiler error",""],1),
];
var quiz = new Quiz(questions);populate();