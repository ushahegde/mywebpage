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
 }var questions = [new Question("Which of these classes in Java are abstract?<br><br><div class='codetext'><br></div>",["InputStream","PrintStream","Reader","Both 1 and 3"],4),
new Question("Which of the following classes uses character streams?<br><br><div class='codetext'><br></div>",["FileInputStream","InputStream","FileReader","All of the above"],3),
new Question("Which of these class is used to read from byte array?<br><br><div class='codetext'><br></div>",[" InputStream","BufferedInputStream","ByteArrayInputStream","None of the above"],3),
new Question("Which of these IO classes can be used to handling bytes ?<br><br><div class='codetext'><br></div>",["InputStream","Writer","Reader","None of the above"],1),
new Question("Which method is used to read a byte from a byte stream?<br><br><div class='codetext'><br></div>",["read()","readLine()","readByte()","Any of the above"],1),
new Question("What does the following code do?<br><br><div class='codetext'>public static void main(String args[]) throws IOException {<br>        InputStream stream = new FileInputStream('a.txt');<br>        while(stream.read()!=-1){<br>            int b =  stream.read();<br>            System.out.print(b);<br>        }<br>        if(stream!=null){<br>            stream.close();<br>        }<br>    }<br></div>",["Displays the contents of a file.","Displays the bytes in a file","Gives syntax error","None of the above"],2),
new Question("What is the output of the following program? Assume that the input provided at console are 10 and 20<br><br><div class='codetext'>public class ConTest<br>{<br>    int readNumber(){<br>        Console console = System.console();<br>        if(console==null){<br>            System.out.println('no console');<br>            return -1;<br>        }<br>        String s = console.readLine();<br>        return Integer.valueOf(s);<br>    }<br>    void printNumber(int a){<br>        Console c = System.console();<br>        c.printf('======%d======',a);<br>    }<br>    public static void main(String args[]){<br>        ConTest obj = new ConTest();<br>        int n1 = obj.readNumber();<br>        int n2 = obj.readNumber();<br>        if(n1!=-1 &&n2!=-1)<br>            obj.printNumber(n1*n2);<br>    }<br>}<br></div>",["Compiler error","=====200=====","None of the above",""],2),
new Question("Which of the following lines in the code below read a number from console correctly?<br><br><div class='codetext'>import java.io.BufferedReader;<br>import java.io.Console;<br>import java.io.IOException;<br>import java.io.InputStreamReader;<br>import java.nio.CharBuffer;<br>import java.util.Scanner;<br><br>public class ReadNumbers {<br>    public static void main(String args[]) throws IOException {<br>        Console console = System.console();<br>        int n = 0;<br>        n = Integer.parseInt(console.readLine());//line 1<br>        System.out.println(' n is '+n);<br>        Scanner scanner = new Scanner(System.in);<br>        n=scanner.nextInt();//line 2<br>        System.out.println(' n is '+n);<br>        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));<br>        n = Integer.valueOf(reader.readLine());//line 3<br>        System.out.println(' n is '+n);<br><br>    }<br>}<br><br></div>",["line 1","line 2","line 3","All of the above"],4),
new Question("What does the method readAllBytes() do?<br><br><div class='codetext'><br></div>",["Reads the bytes from console","Reads the entire file to a byte array","There is no such method",""],2),
new Question("What does the following function do?<br><br><div class='codetext'>      void readFileToArray(String abc) throws IOException {        <br>        byte arr[] = new byte[500];<br>        Path path = Paths.get(srcFileName);<br>        arr = Files.readAllBytes(path);       <br>    }<br></div>",["Converts string abc to byte array","Converts string abc to Path","Reads the content of the file abc into byte array","None of the above"],3),
new Question("Which of these is a type of stream in Java? <br><br><div class='codetext'><br></div>",[" Integer stream","Byte Stream","Short Stream","Long Stream"],2),
new Question("Which of these classes contains the methods print() & println()? <br><br><div class='codetext'><br></div>",["System","System.out","PrintStream","BufferedOutputStream"],3),
new Question("System.out is a ------<br><br><div class='codetext'><br></div>",["PrintStream","OutputStream","InputStream","FileOutputStream"],1),
new Question("The PrintStream is flushed automatically when --------<br><br><div class='codetext'><br></div>",["println() method is used","\n is written","when a bytearray is written","Any of the above"],4),
];
var quiz = new Quiz(questions);populate();