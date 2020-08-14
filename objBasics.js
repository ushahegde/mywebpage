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
            bt.checked = false;
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

var questions = [new Question("In Java, the data types byte, short, long, int all these data types are <br><br><div class='codetext'><br></div>",["signed","unsigned","both","None of the above"],1),
new Question("Size of int in Java language is <br><br><div class='codetext'><br></div>",["16 bit","32 bit","64 bit","None of the above"],2),
new Question("What is the output of the following program?<br><br><div class='codetext'>public&nbsp;class&nbsp;Test&nbsp;{	<br>		public&nbsp;static&nbsp;void&nbsp;main(String&nbsp;args[])&nbsp;{<br>			int&nbsp;x&nbsp;=&nbsp;10;<br>			if&nbsp;(x>10)&nbsp;{<br>				int&nbsp;y=5;<br>			}<br>			System.out.println('The&nbsp;values&nbsp;of&nbsp;x&nbsp;and&nbsp;y&nbsp;are&nbsp;'+x+'and&nbsp;'+y);<br>		}<br>}<br></div>",["10 5","10 0","10 10","Compilation error"],4),
new Question("What is the output of the following program?<br><br><div class='codetext'>public&nbsp;class&nbsp;Test&nbsp;{	<br>	public&nbsp;Test(float&nbsp;x)&nbsp;{<br>		System.out.println('Float');<br>	}<br>	public&nbsp;Test(double&nbsp;x)&nbsp;{<br>		System.out.println('Double');<br>	}<br>	public&nbsp;static&nbsp;void&nbsp;main(String&nbsp;args[])&nbsp;{<br>		Test&nbsp;t&nbsp;=&nbsp;new&nbsp;Test(10.2);	<br>	}<br><br>}<br></div>",["float","double","float double","None of the above"],2),
new Question("What is the package in which System class is defined in Java?<br><br><div class='codetext'><br></div>",["java.util","java.io","java.lang","None of the above"],3),
new Question("Exposing only the necessary information to the clients is called as -----<br><br><div class='codetext'><br></div>",["Encapsulation","Abstraction","Inheritance","Polymorphism"],2),
new Question("The process of defining a methods in terms of itself is called -----<br><br><div class='codetext'><br></div>",["Encapsulation","Inheritance","Recursion","None of the above"],3),
new Question("What is the output of the following program?<br><br><div class='codetext'>&nbsp;&nbsp;&nbsp;&nbsp;class&nbsp;Test<br>&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;public&nbsp;void&nbsp;m1&nbsp;(int&nbsp;i,float&nbsp;f)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.println('&nbsp;Method&nbsp;m1&nbsp;with&nbsp;int&nbsp;float');<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;public&nbsp;void&nbsp;m1(float&nbsp;f,int&nbsp;i)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.println('Method&nbsp;m1&nbsp;with&nbsp;float&nbsp;int');<br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;&nbsp;<br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;public&nbsp;static&nbsp;void&nbsp;main(String[]args)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Test&nbsp;t=new&nbsp;Test();<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;t.m1(20,20);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br></div>",["Method m1 with int float","Method m1 with float int","Compiler error","Run time error"],3),
new Question("Where in the memory are method parameters and local variables stored?<br><br><div class='codetext'><br></div>",["Heap","Stack","Code area","None of the above"],2),
new Question("What is Java byte code?<br><br><div class='codetext'><br></div>",["A code generated by Java compiler","A code generated by JVM","Another name for java source file","None of the above"],1),
new Question("What is the correct order in a Java program?<br><br><div class='codetext'><br></div>",["Import statement, <br>package declaration, <br>class declaration","Package declaration,<br> import statement, <br>class declaration","Class declaration,<br> import statement, <br>package declaration","None of the above"],2),
new Question("An overloaded method is a method with -----<br><br><div class='codetext'><br></div>",["Same name and different return type","Same name with different number of parameters","Same name with different types of parameters","Either 2 or 3"],4),
new Question("What is the range of short data type in Java?<br><br><div class='codetext'><br></div>",["-128 to 127","-32768 to 32767","0 to 255","None of the above"],2),
new Question("An expression involving byte, int and short numbers is promoted to ------<br><br><div class='codetext'><br></div>",["int","long","float","None of the above"],1),
new Question("Which of the following is Long literal?<br><br><div class='codetext'><br></div>",["1234","ABCDE","34L","All of the above"],3),
new Question("Which of the following statements is correct way of initialising an integer array.<br><br><div class='codetext'><br></div>",["int arr[] = {1,2,3,45};","int arr[] = new int[]{1,2,3,4,5};","int arr = new int {1,2,3,4,5};","Both 1 and 2"],4),
new Question("When is method overloading determined?<br><br><div class='codetext'><br></div>",["At compile time","At run time","At coding time","None of the above"],1),
new Question("Which of the following is not overloaded method of the function given below.<br><br><div class='codetext'>int&nbsp;add(int&nbsp;a,int&nbsp;b);<br></div>",["float add(float a, float b);","float add(int a, int b);","int add(int a,int b,int c);","float add(float a, float b, float c);"],2),
new Question("What is the name for combining methods and attributes into classes?<br><br><div class='codetext'><br></div>",["abstraction","encapsulation","inheritance","polymorphism"],2),
new Question("What is the name for the mechanism in Object oriented languages, where one object acquires all the properties and behaviors of the another object?<br><br><div class='codetext'><br></div>",["Encapsulation","Inheritance","Abstraction","None of the above"],2),
new Question("Java Virtual Machine is machine independant. True or false?<br><br><div class='codetext'><br></div>",["True","False","",""],2),
new Question("How do you make classes and interfaces of one package available to another package?<br><br><div class='codetext'><br></div>",["Using import statement","Using implements statement","Using package statement","None of the above"],1),
new Question("The inventor of Java language is -------<br><br><div class='codetext'><br></div>",["Dennis Ritchie","James Gosling","Steve Jobs","None of the above"],2),
new Question("Which of the following is not a comment  in Java?<br><br><div class='codetext'><br></div>",["/* comment*/","//comment","/**comment*/","/*comment"],4),
new Question("Which of the following statements are correct. Select the four correct answers. <br>a.	A Java program must have a package statement. <br>b.	A package statement if present must be the first statement of the program (barring any comments).<br>c.	If a Java program defines both a package and import statement, then the import statement must come before the package statement. <br>d.	An empty file is a valid source file. <br>e.	A Java file without any class or interface definitions can also be compiled. <br>f.	If an import statement is present, it must appear before any class or interface definitions. <br><br><div class='codetext'><br></div>",["b, d, e, f ","a, b, d, f ","d, e, a, c"," c, d, b, a "],1),
new Question("What is the correct signature of main() method in a standalone Java program?<br><br><div class='codetext'><br></div>",["public static void main(char args[])","public static void main(String arg)","public static void main(String args[])","public static void Main(String args[])"],3),
new Question("What does a void function return?<br><br><div class='codetext'><br></div>",["null","0","Nothing","There can not be void functions"],3),
new Question("Why does the following code does not compile?<br><br><div class='codetext'>int&nbsp;a&nbsp;=&nbsp;10;<br>byte&nbsp;b&nbsp;=&nbsp;a;<br><br></div>",["There is no byte data type in Java","Implicit conversion to low precision is not allowed","The code will compile","None of the above"],2),
new Question("Which of the following is not a primitive data type in Java?<br><br><div class='codetext'><br></div>",["int ","float ","bool","long"],3),
new Question("What is the output of the following program if it is run as <br>java test 10 20<br><br><div class='codetext'>public&nbsp;class&nbsp;test&nbsp;{<br>&nbsp;&nbsp;&nbsp;public&nbsp;static&nbsp;void&nbsp;main(String&nbsp;args[])&nbsp;{&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;String&nbsp;str&nbsp;=&nbsp;args[1];//line&nbsp;3<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;int&nbsp;num&nbsp;=&nbsp;Integer.valueOf(str);//line&nbsp;4<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.println(num);<br>&nbsp;&nbsp;&nbsp;}<br>}<br><br></div>",["Syntas error in line 3","Run time error in line 4","20","10"],3),
new Question("Java compiler converts Java source code  to ----<br><br><div class='codetext'><br></div>",["Object code","Machine code","Byte code","None of the above"],3),
new Question("What is the output of the following code?<br><br><div class='codetext'>String&nbsp;s&nbsp;=&nbsp;'Java';<br>s.concat('coders');<br>System.out.println(s);<br></div>",["Javacoders","Java coders","Java","None of the above"],3),
new Question("What is the output of the following code?<br><br><div class='codetext'>float&nbsp;m=2.9f;<br>System.out.println('m&nbsp;is&nbsp;'+Math.floor(m));<br><br></div>",["2.9","2","3","None of the above"],2),
new Question("A lower precision value can be assigned to a higher precision value in Java. <br><br>True or false?<br><br><div class='codetext'><br></div>",["True","False","",""],1),
new Question("Which of the following is a keyword in Java?<br><br><div class='codetext'><br></div>",["NULL","synchronized","implement","All of the above"],2),
new Question("The operands of arithmetic operators must be<br><br><div class='codetext'><br></div>",["Numeric","Boolean","Character","Either numeric or boolean"],4),
new Question("Which of the following statements about modulus operators is true?<br><br><div class='codetext'><br></div>",["Modulus operator gives remainder when first number is divided by second","Modulus operator can not be applied to non-integers","Symbol of modulus operator is ^","None of the above"],1),
new Question("Which of the following statements make the value of m to 10<br><br><div class='codetext'>int&nbsp;m&nbsp;=&nbsp;9;<br></div>",["m+=1;","m++;","++m;","All of the above"],4),
new Question("What is the output of the following program?<br><br><div class='codetext'>class&nbsp;Test&nbsp;{<br>public&nbsp;static&nbsp;void&nbsp;main(String&nbsp;args[])&nbsp;<br>{&nbsp;&nbsp;&nbsp;&nbsp;<br>&nbsp;&nbsp;int&nbsp;x&nbsp;,&nbsp;y;<br>&nbsp;&nbsp;x&nbsp;=&nbsp;25;<br>&nbsp;&nbsp;x++;<br>&nbsp;&nbsp;--x;<br>&nbsp;&nbsp;y&nbsp;=&nbsp;x++;<br>&nbsp;&nbsp;System.out.println(x&nbsp;+&nbsp;'&nbsp;'&nbsp;+&nbsp;y);<br>}&nbsp;<br>}<br></div>",["26 26","25 25","26 25","25 26"],3),
new Question("Which of the following operators is used to complement a number - i.e. invert all the bits of a number?<br><br><div class='codetext'><br></div>",["^","~","!","None of the above"],2),
new Question("Which type of operators returns a boolean answer?<br><br><div class='codetext'><br></div>",["Arithmetic","Bitwise","Relational","None of the above"],3),
new Question("What is the output of the following code?<br><br><div class='codetext'>int&nbsp;a&nbsp;=&nbsp;10;<br>a&nbsp;=&nbsp;a<<2;<br>System.out.println(String.valueOf(a));<br><br></div>",["2","40","10","None of the above"],2),
new Question("Which of these operators can be used on boolean operands?<br><br><div class='codetext'><br></div>",["==","&&","?:","All of the above"],2),
new Question("What is the output of the following code?<br><br><div class='codetext'>int&nbsp;a&nbsp;=&nbsp;10;<br>int&nbsp;b&nbsp;=&nbsp;2;<br>if&nbsp;(&nbsp;a++>30&nbsp;&&&nbsp;b++>0)<br>&nbsp;&nbsp;&nbsp;&nbsp;System.out.println('true');<br>else<br>&nbsp;&nbsp;&nbsp;&nbsp;System.out.println('false);<br>System.out.println(a+'&nbsp;'+b);<br><br></div>",["false<br>11 3","true<br>10 2","false<br>11 2","None of the above"],3),
new Question("What is the output of the following program?<br><br><div class='codetext'>public&nbsp;class&nbsp;Ran{<br>&nbsp;&nbsp;&nbsp;&nbsp;public&nbsp;static&nbsp;void&nbsp;main(String&nbsp;args[]){<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.println(Math.floor(Math.random()));<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>}<br></div>",["1.0","0.0","Can not predict","10.0"],2),
new Question("Write the output of the following program. <br><br><div class='codetext'>public&nbsp;class&nbsp;Test{<br>&nbsp;&nbsp;&nbsp;&nbsp;void&nbsp;method(int&nbsp;n){<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.println('method1');<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;void&nbsp;method(String&nbsp;n){<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.println('method2');<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;public&nbsp;static&nbsp;void&nbsp;main(String&nbsp;args[]){<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Test&nbsp;obj&nbsp;=&nbsp;new&nbsp;Test();<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;obj.method(10);<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>}<br></div>",["method1","method2","Compiler error","None of the above"],1),
new Question("What is the output of the following program?<br><br><div class='codetext'>public&nbsp;class&nbsp;Numbers{<br>&nbsp;&nbsp;&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;int&nbsp;add(int&nbsp;n,int&nbsp;m){<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return&nbsp;n+m;<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;public&nbsp;static&nbsp;void&nbsp;main(String&nbsp;args[]){<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Numbers&nbsp;obj&nbsp;=&nbsp;new&nbsp;Numbers();<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;short&nbsp;s&nbsp;=&nbsp;9;//line&nbsp;1<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;int&nbsp;m&nbsp;=&nbsp;&nbsp;obj.add(10,s);//line&nbsp;2<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.println('sum&nbsp;&nbsp;is&nbsp;'+m);<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>}<br></div>",["Error in line 1","Error in line 2","19",""],3),
new Question("What is the output of the following program?<br><br><div class='codetext'>public&nbsp;class&nbsp;Test{<br>&nbsp;&nbsp;&nbsp;&nbsp;void&nbsp;changeString(String&nbsp;s){<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;s&nbsp;=&nbsp;'xyz';<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;public&nbsp;static&nbsp;void&nbsp;main(String&nbsp;args[])<br>&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Test&nbsp;obj&nbsp;=&nbsp;new&nbsp;Test();<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;String&nbsp;s&nbsp;=&nbsp;'abc';<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;obj.changeString(s);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.println('String&nbsp;is&nbsp;'+s);<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>}<br><br></div>",["abc","xyz","Compilation error",""],1),
new Question("Write the output of the following program.<br><br><div class='codetext'>public&nbsp;class&nbsp;Test{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;int&nbsp;n;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Test(int&nbsp;n){<br>	this.n&nbsp;=&nbsp;n;//line&nbsp;1<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;void&nbsp;printNumbers(byte&nbsp;...b){<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;for(int&nbsp;i=0;i<b.length;i++)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.println('The&nbsp;number&nbsp;is&nbsp;'+b[i]);<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;public&nbsp;static&nbsp;void&nbsp;main(String&nbsp;args[])<br>&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Test&nbsp;obj&nbsp;=&nbsp;new&nbsp;Test(10);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;byte&nbsp;b1&nbsp;=&nbsp;10,b2=20,b3=40;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;obj.printNumbers(b1,b2,b3);<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>}<br><br></div>",["Compiler error","The number is 10 20 40","The number is 10<br>The number is 20<br>The number is 40","None of the above"],3),
new Question("What type of file does a Java compiler produce?	<br><br><div class='codetext'><br></div>",[".obj",".class",".exe","None of the above"],2),
new Question("Which method can be used to copy an array?<br><br><div class='codetext'><br></div>",["arrayCopy","copyArray","copy","None of the above"],1),
new Question("How do you represent the number 13 in binary in Java?<br><br><div class='codetext'><br></div>",["0b1101","b1101","01101B","None of the above"],1),
new Question("What is the output of the following program?<br><br><div class='codetext'>class&nbsp;Equal{<br>&nbsp;&nbsp;public&nbsp;static&nbsp;void&nbsp;main(String&nbsp;args[]){<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;String&nbsp;s1&nbsp;=&nbsp;'abc';<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;String&nbsp;s2&nbsp;=&nbsp;'abc';<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;boolean&nbsp;b&nbsp;=&nbsp;s1==s2;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.println('s1&nbsp;==&nbsp;s2&nbsp;is&nbsp;&nbsp;'+s1==s2);<br>&nbsp;&nbsp;}<br>}<br><br></div>",["s1 == s2 is true","s1 == s2 is false","false","None of the above"],3),
new Question("In the following code, what can be the type of n?<br><br><div class='codetext'>switch(n){/*code*/}<br></div>",["int","char","float","both 1 and 2"],4),
new Question("Which of the following statements will print all elements of arrray myarr?<br><br><div class='codetext'><br></div>",["for(int i=0;i<n;i++) System.out.println(arr[i]);","for(int i:arr)System.out.println(i);","Both 1 and 2","None of the above"],3),
new Question("How do you convert an integer to binary?<br><br><div class='codetext'><br></div>",["Write your own function","By adding 0b as prefix","Integer.toBinaryString() method","None of the above"],3),
new Question("Which of the following is a binary literal in Java?<br><br><div class='codetext'><br></div>",["110011","b110011","0b110011","All of the above"],3),
new Question("Given the following code, what will be the output?<br><br><div class='codetext'>int&nbsp;[][]array2D&nbsp;=&nbsp;{{0,1,1},{1,0},{5,1,0};<br>System.out.println(array2D[0].length);<br><br></div>",["8","3","Compiler error","10"],2),
new Question("What is the output of the following code.<br><br><div class='codetext'>int&nbsp;[]&nbsp;arr;<br>arr[0]&nbsp;=0;<br>System.out.println(arr[0]);<br></div>",["0","Garbage value","Compile error","None of the above"],3),
new Question("Which statement can be inserted in place of line n1, so that the output is Stand?<br><br><div class='codetext'>//&nbsp;Line&nbsp;n1<br>switch&nbsp;(cardVal)&nbsp;{<br>case&nbsp;4:&nbsp;case&nbsp;5:&nbsp;case&nbsp;6:<br>case&nbsp;7:&nbsp;case&nbsp;8:<br>System.out.println('Hit');<br>break;<br>case&nbsp;9:&nbsp;case&nbsp;10:&nbsp;case&nbsp;11:<br>System.out.println('Double');<br>break;<br>case&nbsp;15:&nbsp;case&nbsp;16:<br>System.out.println('Surrender');<br>break;<br>default:<br>System.out.println('Stand');<br>}<br></div>",["cardVal=6","cardVal=14","cardVal=8	","Any of the above"],2),
new Question("What is the output of the following program?<br><br><div class='codetext'>public&nbsp;class&nbsp;sw{<br>&nbsp;&nbsp;&nbsp;public&nbsp;static&nbsp;void&nbsp;main(String&nbsp;args[]){<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;float&nbsp;n=1.2f;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;switch((int)n){<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;case&nbsp;1.2:System.out.println('true');<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;break;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;case&nbsp;1.0:System.out.println('false');<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;break;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;}<br>}<br></div>",["true","false","compiler error","run time error"],3),
new Question("What is the output of the following program?<br><br><div class='codetext'>class&nbsp;demo{<br>&nbsp;&nbsp;&nbsp;public&nbsp;static&nbsp;void&nbsp;main(String&nbsp;args[]){<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;for(int&nbsp;i=1;i<=10;i++){<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if(i%3==0)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;continue;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.print(i);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;break;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;}<br>}<br><br></div>",["12345678910","1","12457810","None of the above"],2),
];
var quiz = new Quiz(questions);populate();