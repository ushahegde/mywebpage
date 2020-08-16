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
 }var questions = [new Question("Which of the following exceptions may be thrown by read() method of Reader class?<br><br><div class='codetext'><br></div>",["IOException","SystemInputException","InterruptedException ","None of the above"],1),
new Question("Which of the following statements regarding the keyword 'finally' is true?<br> <br><br><div class='codetext'><br></div>",["A finally block is executed before the catch block but after the try block.","A finally block is executed, only after the catch block is executed.","A finally block is executed whether an exception is thrown or not.","A finally block is executed, only if an exception occurs."],3),
new Question("All exception types are subclasses of the built-in class  -----<br><br><div class='codetext'><br></div>",["Exception","Throwable","RuntimeException","None of the above"],2),
new Question("Which keyword is used if a method does not want to handle the exception?<br><br><div class='codetext'><br></div>",["throws","try","catch","final"],1),
new Question("Which of the following is a checked exception in Java<br><br><div class='codetext'><br></div>",["ArithmeticException","ArrayIndexOutOfBoundException","NullPointerException","IOException"],4),
new Question("Which of the following statements are true regarding exceptions?<br><br><div class='codetext'><br></div>",["Checked exceptions must be caught or specified","The code which may throw an exception is wrapped in a try block","try block is followed by one or more catch blocks.","All of the above"],4),
new Question("Which of the following statemetns regarding exceptions are true?<br><br><div class='codetext'><br></div>",["Each try block should be followed by one or more catch blocks. ","Each try block can have an optional finally block","Finally block is executed irrespective of exception being thrown or not","All of the above"],4),
new Question("Which of the following statemetns regarding exceptions are true?<br><br><div class='codetext'><br></div>",["Checked exceptions must be either handled or specified","ArrayIndexOutOfBounds is an unchecked exception","IOException is a checked exception","All of the above"],4),
new Question("What is the output of the following code?<br><br><div class='codetext'>public class A{<br>   public static void main(String args[]){<br>        try{<br>           int n = 10;<br>           int m= 20;<br>           if(m/n>0){<br>              throw 5;<br>           System.out.println(m/n);<br>      }<br>      catch(Exception e){<br>         System.out.println('Caught an exception');<br>    }<br>    }<br>}<br></div>",["2","Caught an exception","Compiler error","None of the above"],3),
new Question("Can a try block be written without any catch blocks but only finally block?<br><br><div class='codetext'><br></div>",["Yes","No","",""],1),
new Question("When writing multiple catch blocks,------<br><br><div class='codetext'><br></div>",["Catch block with specific exceptions must be written first","catch block with generic exceptions must be written first","Order of catch blocks does not matter","It is not possible to write multiple catch blocks"],1),
new Question("What is the output of the following code?<br><br><div class='codetext'>class NumberException extends Exception{<br>    NumberException(String description){<br>        super(description);<br>    }<br>}<br>public class Exc1 {<br>    void findQuotient(int n1,int n2)   {<br>        try {<br>               if(n2==0)<br>                   throw new NumberException('Denom zero');<br>               int ans = n1/n2;<br>               System.out.println('The quotient is '+ans);<br>        }<br>        catch (Exception e){<br>            e.printStackTrace();<br>        }<br>        catch (NumberException e) {<br>          <br>            System.out.println('The exeption is '+e.getMessage());<br>        }<br>    }<br> <br>    public static void main(String args[]){<br>        int arr[]=new int[]{1,2,3,4,5};<br>        Exc1 obj = new Exc1(); <br>        obj.findQuotient(10,0);<br>    }<br><br>}<br><br></div>",["The quotient is 0","The exception is Denom is zero","Compiler error","Run time error"],3),
new Question("Which of the following exceptions is thrown when there is division by zero?<br><br><div class='codetext'><br></div>",["IllegalArgumentException","ArithmeticException","MathException","None of the above"],2),
new Question("What is the output of the following program?<br><br><div class='codetext'>public class ExceptFinally {<br>    public static void main(String args[]){<br>        int m = 10;<br>        int arr[] = new int[]{1,2,3,4,5};<br>        int n = 0;<br>        try{<br>            int ans1 = m/n;<br>            int ans2 = arr[n];<br>            System.out.println(ans1+' '+ans2);<br>        }<br>        catch(ArithmeticException e){<br>            System.out.println('Arithmetic exception');<br>        }<br>        catch(ArrayIndexOutOfBoundsException e){<br>            System.out.println('ArrayIndexOutOfBounds exception');<br>        }<br>        finally{<br>            System.out.println('finally.....');<br>        }<br><br>    }<br>}<br><br></div>",["Arithmetic Exception","Arithmetic exception<br>finally ....","Arithmetic exception<br>ArrayIndexOutofBounds exception<br>finally...","None of the above"],2),
new Question("Why does the following code  does not compile?	<br><br><div class='codetext'> try {<br>          ................<br>        } catch (IOException e) {<br>            e.printStackTrace();<br>        } catch (FileNotFoundException e) {<br>            e.printStackTrace();<br>        } <br></div>",["FileNotFoundException must come earlier than IO Exception","try block can't be followed by multiple catch blocks","try block should always be followed by a catch and a finally blocks","Faulty compiler"],1),
new Question("In which package does the class Exception exist?<br><br><div class='codetext'><br></div>",["java.util","java.lang","java.io","None of the above"],2),
new Question("Which keyword is used to specify exceptions which may be thrown by a method?<br><br><div class='codetext'><br></div>",["throw","throws","catch","None of the above"],2),
new Question("If there are multiple catch blocks, then -----<br><br><div class='codetext'><br></div>",["super class exception must be caught first","subclass exception must be caught first","order of super and subclass exceptions does not matter","There can not be multiple catch blocks for a try block. "],2),
new Question("Given the following classes, which of the following is a valid subclass of A?<br><br><div class='codetext'>class A{<br>    public void doSomething() throws IOException{<br>       ....<br>   }<br>}<br></div>",["class B extends A{<br>    public void doSomething() throws FileNotFoundException{<br>       ....<br>   }<br>}","class C extends A{<br>    public void doSomething() throws ArithmeticException  {<br>       ....<br>   }<br>}","class D extends A{<br>    public void doSomething() throws Exception{<br>       ....<br>   }<br>}","All of the above	"],1),
new Question("What type of exception is caught by the following handler?<br><br><div class='codetext'>try{<br><br>   ....<br>}catch (Exception e){<br>      .....<br>}<br></div>",["Exception ","IOException","All exceptions","No exceptions"],3),
new Question("Consider the following code.<br><br>Which statements are executed if exception occurs in statement2?<br><br><div class='codetext'>try{<br>   statemen1;<br>   statement2;<br>   statement3;<br> }catch (Exception1 ex1){<br>      statement4;<br>  }<br><br></div>",["statement1 statement2 statement3 statement4","statement1 statement2 statement3","statement1 statement2 statement4	","None of the above"],3),
];
var quiz = new Quiz(questions);populate();