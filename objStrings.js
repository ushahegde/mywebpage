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
 }var questions = [new Question("What is the output of the following code?<br><br><div class='codetext'>public class StringTest {<br>    public static void main(String args[]){<br>        String str = 'Hello';<br>        System.out.println(str.length());//line 1<br>        System.out.format('The length of %s is %d',str,str.length());//line 2<br><br>    }<br>}<br><br></div>",["Error in line 1. should be str.length","Error in line 2. Should be System.out.println","5<br>The length of Hello is 5","None of the above"],3),
new Question("How do you combine two strings?<br><br><div class='codetext'><br></div>",["Using + operator","Using concat method","Either 1 or 2","It is not possibe"],3),
new Question("Fill the code used to find the length of the string.<br><br><div class='codetext'>String str = 'hello world';<br>int len = --------;<br></div>",["str.length","str.length()","str.len()","None of the above"],2),
new Question("What is the output of the following program?<br><br><div class='codetext'>public class StringTest {<br>    public static void main(String args[]){<br>        String str = 'Hello, Welcome to Java World';<br>        int ind = str.indexOf('el');     <br>        System.out.println(ind ); <br><br>    }<br>}<br></div>",["1","8","1 8","None of the above"],1),
new Question("What is the output of the following program?<br><br><div class='codetext'>public class StringTest {<br>    public static void main(String args[]){<br>        String str = '  Hello,   User  ';<br>        String str2 = str.trim(); <br>        System.out.println('|'+str2+'|' ); <br>    }<br>}<br><br></div>",["|  Hello,   User|","|Hello,   User  |","|Hello,User|","|Hello,   User|"],4),
new Question("What will be the value of str2 after the code given below?<br><br><div class='codetext'>String str = 'hello user';<br>String str2 = str.replace('e','E');<br></div>",["hEllo user","hEllo usEr","Hello User","None of the above"],2),
new Question("How do you convert a string to an integer?<br><br><div class='codetext'><br></div>",["Using Integer.parseInt() method","Using Integer.valueOf followed by intValue() method","Both 1 and 2","Not possible"],3),
new Question("How do you convert a floating point number to a string?<br><br><div class='codetext'><br></div>",["Using Float.valueOf() method","By concatting number with an empty string","Using Float.toString() method","All of the above"],4),
new Question("Which method converts all the letters of a string to upper case?<br><br><div class='codetext'><br></div>",["upperCase()","toUpperCase()","write your functions","None of the above"],2),
new Question("What is the output of the following code?<br><br><div class='codetext'>public class Abc {<br>    public static void main(String args[]){<br>        String s1 = 'Hello';<br>        String s3 = new String('Hello');<br>        if(s1==s3)<br>            System.out.println('s1 = s3');<br>        else<br>            System.out.println('s1 Not equal to s3');<br>    }<br>}<br><br></div>",["s1 = s3 ","s1 not equal to s3","compiler error",""],2),
new Question("What will be the value of s1 after the following code is executed?<br><br><div class='codetext'>String s1 = 'hello';<br>String s2 = s1.concat('world');<br></div>",["hello","helloworld","worldhello","None of the above"],1),
new Question("What does trim() method do?<br><br><div class='codetext'><br></div>",["Removes both leading and trailing spaces","Removes leading spaces","Removes trailing spaces","None of the above"],1),
new Question("What is the output of the following code?<br><br><div class='codetext'>public class StringFunctions {<br>    public static void main(String args[]){<br>        String s1 = 'Java Programming';<br>        s1 = s1.replace('a','A');<br>        System.out.println(s1);<br><br>    }<br>}<br><br></div>",["JAva programming","JAvA progrAmming","Java programming","None of the above"],2),
new Question("Which of the following statements creates a String object with value Hello?<br><br><div class='codetext'><br></div>",["String str = 'Hello'","String str = new String('Hello');","Both 1 and 2","None of the above"],3),
new Question("What is the output of the following code?<br><br><div class='codetext'>String s1 = 'Hello';<br>String s2 =new String('Hello');<br>if(s1==s2){<br>    System.out.println('they are ==');<br> }<br>if(s1.equals(s2)){<br>    System.out.println('they are equal');<br> }<br></div>",["they are ==<br>they are eqaul","they are ==","they are eqaul","None of the above"],3),
new Question("Which of the following statements splits the string str into words?<br><br><div class='codetext'><br></div>",["String arr[] = String.split(str)","String arr[] = str.split(' ');","String arr[] = split(str,' ');","All of the above"],2),
new Question("Which of the following statements is true?<br><br><div class='codetext'><br></div>",["Integer.valueOf(str) converts string to integer","Integer.toString(num) converts number to string","Integer.parseInt(Str) converts string to integer.","All of the above"],4),
new Question("What is the output of the following code?<br><br><div class='codetext'>String str = 'Hello'<br>char[]arr = str.toCharArray();<br>        for(char ch:arr){<br>            if(Character.isAlphabetic(ch)){<br>                System.out.print((char)(ch+1));<br>            }else{<br>                System.out.print(ch);<br>            }<br><br>        }<br></div>",["hello","HELLO","compiler error","ifmmp"],4),
new Question("What is the output of the following program?<br><br><div class='codetext'>import java.util.List;<br>import java.util.ArrayList;<br>public class TestClass {<br>public static void main(String[] args) {<br>List<String> items = new ArrayList<>();<br>items.add('Pen');<br>items.add('Pencil');<br>items.add('Box');<br>for (String i : items) {<br>if (i.indexOf('P') == 0) {<br>continue;<br>} else {<br>System.out.print(i+' ');<br>}<br>}<br>}<br>}<br><br></div>",["Pen Pencil Box","Pen Pencil","Box","None of the above"],3),
];
var quiz = new Quiz(questions);populate();