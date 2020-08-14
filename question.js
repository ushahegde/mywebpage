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
new Question("In Java, the data types byte, short, long, int all these data types are <br><div class='codetext'><br></div>",["signed","unsigned","both","None of the above"],1),
new Question("Size of int in Java language is <br><div class='codetext'><br></div>",["16 bit","32 bit","64 bit","None of the above"],2),
new Question("What is the output of the following program?<br><div class='codetext'>public&nbsp;class&nbsp;Test&nbsp;{	<br>		public&nbsp;static&nbsp;void&nbsp;main(String&nbsp;args[])&nbsp;{<br>			int&nbsp;x&nbsp;=&nbsp;10;<br>			if&nbsp;(x>10)&nbsp;{<br>				int&nbsp;y=5;<br>			}<br>			System.out.println('The&nbsp;values&nbsp;of&nbsp;x&nbsp;and&nbsp;y&nbsp;are&nbsp;'+x+'and&nbsp;'+y);<br>		}<br>}<br></div>",["10 5","10 0","10 10","Compilation error"],4),
new Question("What is the output of the following program?<br><div class='codetext'>public&nbsp;class&nbsp;Test&nbsp;{	<br>	int&nbsp;FLOAT&nbsp;=&nbsp;3;<br>	public&nbsp;static&nbsp;void&nbsp;main(String&nbsp;args[])&nbsp;{<br>		Test&nbsp;t&nbsp;=&nbsp;new&nbsp;Test();<br>	&nbsp;&nbsp;&nbsp;&nbsp;System.out.println('the&nbsp;variable&nbsp;is&nbsp;'+t.FLOAT);	&nbsp;<br>	<br>	}<br>}<br></div>",["Compiler error","Runtime error","variable is 3","None of the above"],3),
new Question("What is the package in which System class is defined in Java?<br><div class='codetext'><br></div>",["java.util","java.io","java.lang","None of the above"],3),
new Question("Exposing only the necessary information to the clients is called as -----<br><div class='codetext'><br></div>",["Encapsulation","Abstraction","Inheritance","Polymorphism"],2),
new Question("Where in the memory are method parameters and local variables stored?<br><div class='codetext'><br></div>",["Heap","Stack","Code area","None of the above"],2),
new Question("What is the correct order in a Java program?<br><div class='codetext'><br></div>",["Import statement, package declaration, class declaration","Package declaration, import statement, class declaration","Class declaration, import statement, package declaration","Class declaration, package declaration, import statement."],2),
new Question("An overloaded method is a method with -----<br><div class='codetext'><br></div>",["Same name and different return type","Same name with different number of parameters","Same name with different type of parameters","Either 2 or 3"],4),
new Question("What is the range of short data type in Java?<br><div class='codetext'><br></div>",["-128 to 127","-32768 to 32767","0 to 255","None of the above"],2),
new Question("An expression involving byte, int and short numbers is promoted to ------<br><div class='codetext'><br></div>",["int","long","float","None of the above"],1),
new Question("Which of the following is Long literal?<br><div class='codetext'><br></div>",["1234","ABCDE","34L","All of the above"],3),
new Question("What is the output of the following Java program?<br><div class='codetext'>&nbsp;&nbsp;class&nbsp;Test<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;public&nbsp;static&nbsp;void&nbsp;main(String&nbsp;args[])<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;int&nbsp;x;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;x&nbsp;=&nbsp;5;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;int&nbsp;y&nbsp;=&nbsp;6;<br>&nbsp;&nbsp;&nbsp;&nbsp;	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.print(x&nbsp;+&nbsp;'&nbsp;'&nbsp;+&nbsp;y);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.println(x&nbsp;+&nbsp;'&nbsp;'&nbsp;+&nbsp;y);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br></div>",["5 6<br>5 6","5 6<br>5 0","Compiler error","Run time error"],3),
new Question("Which of the following statements is correct way of initialising an int array.<br><div class='codetext'><br></div>",["int arr[] = {1,2,3,45};","int arr[] = new int[]{1,2,3,4,5};","int arr = new int {1,2,3,4,5};","None of the above"],2),
new Question("When is method overloading determined?<br><div class='codetext'><br></div>",["At compile time","At run time","At coding time","None of the above"],1),
new Question("Which of the following is not overloaded method of the function given below.<br><div class='codetext'>int&nbsp;add(int&nbsp;a,int&nbsp;b);<br></div>",["float add(float a, float b);","float add(int a, int b);","int add(int a,int b,int c);","float add(float a, float b, float c);"],2),
new Question("Which of the following is not a comment line in Java?<br><div class='codetext'><br></div>",["/* comment*/","//comment","/**comment*/","/*comment"],4),
new Question("Which of the following statements are correct. Select the four correct answers. <br>a.	A Java program must have a package statement. <br>b.	A package statement if present must be the first statement of the program (barring any comments).<br>c.	If a Java program defines both a package and import statement, then the import statement must come before the package statement. <br>d.	An empty file is a valid source file. <br>e.	A Java file without any class or interface definitions can also be compiled. <br>f.	If an import statement is present, it must appear before any class or interface definitions. <br><div class='codetext'><br></div>",["b, d, e, f ","a, b, d, f ","d, e, a, c"," c, d, b, a "],1),
new Question("What is the correct signature of main() method in a standalone Java program?<br><div class='codetext'><br></div>",["public static void main(char args[])","public static void main(String arg)","public static void main(String args[])","public static void Main(String args[])"],3),
new Question("What does a void function return?<br><div class='codetext'><br></div>",["null","0","Nothing","There can not be void function"],3),
new Question("Why does the following code does not compile?<br><div class='codetext'>int&nbsp;a&nbsp;=&nbsp;10;<br>byte&nbsp;b&nbsp;=&nbsp;a;<br><br></div>",["There is not byte data type","Conversion to low precision","The code will compile",""],2),
new Question("Which of the following is not a primitive data type in Java?<br><div class='codetext'><br></div>",["int ","float ","bool","long"],3),
new Question("What is the output of the following program if it is run as <br>java test 10 20<br><div class='codetext'>public&nbsp;class&nbsp;test&nbsp;{<br>&nbsp;&nbsp;&nbsp;public&nbsp;static&nbsp;void&nbsp;main(String&nbsp;args[])&nbsp;{&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;String&nbsp;str&nbsp;=&nbsp;args[1];//line&nbsp;3<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;int&nbsp;num&nbsp;=&nbsp;Integer.valueOf(str);//line&nbsp;4<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.println(num);<br>&nbsp;&nbsp;&nbsp;}<br>}<br><br></div>",["Synta error in line 3","Run time error in line 4","20","10"],3),
new Question("Which of the following is not a keyword in Java?<br><div class='codetext'><br></div>",["assert","boolean","abstract","finalize"],1),
new Question("What is the output of the following code?<br><div class='codetext'>String&nbsp;s&nbsp;=&nbsp;'Java';<br>s.concat('coders');<br>System.out.println(s);<br></div>",["Javacoders","Java coders","Java","None of the above"],4),
new Question("What is the output of the following code?<br><div class='codetext'>float&nbsp;m=2.9f;<br>System.out.println('m&nbsp;is&nbsp;'+Math.floor(m));<br><br></div>",["2.9","2","3","None of the above"],2),
new Question("A lower precision value can be assigned to a higher precision value in Java. True or false?<br><div class='codetext'><br></div>",["True","False","",""],1),
new Question("Which of the following is a keyword in Java?<br><div class='codetext'><br></div>",["NULL","synchronized","implement","All of the above"],2),
new Question("The operands of arithmetic operators must be<br><div class='codetext'><br></div>",["Numeric","Boolean","Character","Either numeric or boolean"],4),
new Question("Which of the following statements about modulus operators is true?<br><div class='codetext'><br></div>",["Modulus operator gives remainder when first number is divided by second","Modulus operator can not be applied to non-integers","Symbol of modulus operator is ^","None of the above"],1),
new Question("Which of the following statements make the value of m to 10<br><div class='codetext'>int&nbsp;m&nbsp;=&nbsp;9;<br></div>",["m+=1;","m++;","++m;","All of the above"],4),
new Question("What is the output of the following program?<br><div class='codetext'>class&nbsp;Output&nbsp;{<br>public&nbsp;static&nbsp;void&nbsp;main(String&nbsp;args[])&nbsp;<br>{&nbsp;&nbsp;&nbsp;&nbsp;<br>int&nbsp;x&nbsp;,&nbsp;y;<br>x&nbsp;=&nbsp;25;<br>x++;<br>--x;<br>y&nbsp;=&nbsp;x++;<br>System.out.println(x&nbsp;+&nbsp;'&nbsp;'&nbsp;+&nbsp;y);<br>}&nbsp;<br>}<br></div>",["26 26","25 25","26 25","25 26"],3),
new Question("Which of the following operators is used to complement a number - i.e. invert all the bits of a number?<br><div class='codetext'><br></div>",["^","~","!","None of the above"],2),
new Question("Which type of operators returns a boolean answer?<br><div class='codetext'><br></div>",["Arithmetic","Bitwise","Relational","None of the above"],3),
new Question("What is the output of the following code?<br><div class='codetext'>int&nbsp;a&nbsp;=&nbsp;10;<br>a&nbsp;=&nbsp;a<<2;<br>System.out.println(String.valueOf(a));<br><br></div>",["2","40","10","None of the above"],2),
new Question("Which of these operators can be used on boolean operands?<br><div class='codetext'><br></div>",["==","&&","?:","All of the above"],2),
new Question("What is the output of the following code?<br><div class='codetext'>int&nbsp;a&nbsp;=&nbsp;10;<br>int&nbsp;b&nbsp;=&nbsp;2;<br>if&nbsp;(&nbsp;a++>30&nbsp;&&&nbsp;b++>0)<br>&nbsp;&nbsp;&nbsp;&nbsp;System.out.println('true');<br>else<br>&nbsp;&nbsp;&nbsp;&nbsp;System.out.println('false);<br>System.out.println(a+'&nbsp;'+b);<br><br></div>",["false<br>11 3","true<br>10 2","false<br>11 2","None of the above"],3),
new Question("What is the output of the following program?<br><div class='codetext'>public&nbsp;class&nbsp;Ran{<br>&nbsp;&nbsp;&nbsp;&nbsp;public&nbsp;static&nbsp;void&nbsp;main(String&nbsp;args[]){<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.println(Math.floor(Math.random()));<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>}<br></div>",["1.0","0.0","Can not predict","10.0"],2),
new Question("What is the output of the following program?<br><div class='codetext'>public&nbsp;class&nbsp;Numbers{<br>&nbsp;&nbsp;&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;int&nbsp;add(int&nbsp;n,int&nbsp;m){<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return&nbsp;n+m;<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;public&nbsp;static&nbsp;void&nbsp;main(String&nbsp;args[]){<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Numbers&nbsp;obj&nbsp;=&nbsp;new&nbsp;Numbers();<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;short&nbsp;s&nbsp;=&nbsp;9;//line&nbsp;1<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;int&nbsp;m&nbsp;=&nbsp;&nbsp;obj.add(10,s);//line&nbsp;2<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.println('sum&nbsp;&nbsp;is&nbsp;'+m);<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>}<br></div>",["Error in line 1","Error in line 2","19",""],3),
new Question("What method can be used to copy an array?<br><div class='codetext'><br></div>",["arrayCopy","copyArray","copy","None of the above"],1),
new Question("How do you represent the number 13 in binary in Java?<br><div class='codetext'><br></div>",["0b1101","b1101","01101","None of the above"],1),
new Question("Which of the following is the correct declaration of main() method?<br><div class='codetext'><br></div>",["public static main(String arg[])","public static void main(String args)","public static void main(String args[])","None of the above"],3),
new Question("What is the output of the following program?<br><div class='codetext'>class&nbsp;Equal{<br>&nbsp;&nbsp;public&nbsp;static&nbsp;void&nbsp;main(String&nbsp;args[]){<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;String&nbsp;s1&nbsp;=&nbsp;'abc';<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;String&nbsp;s2&nbsp;=&nbsp;'abc';<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;boolean&nbsp;b&nbsp;=&nbsp;s1==s2;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.println('s1&nbsp;==&nbsp;s2&nbsp;is&nbsp;&nbsp;'+s1==s2);<br>&nbsp;&nbsp;}<br>}<br><br></div>",["s1 == s2 is true","s1 == s2 is false","false","None of the above"],3),
new Question("In the following code, what can be the type of n?<br><div class='codetext'>switch(n){/*code*/}<br></div>",["int","char","float","both 1 and 2"],4),
new Question("Which of the following statements will print all elements of arrray myarr?<br><div class='codetext'><br></div>",["for(int i=0;i<n;i++) System.out.println(String.valueOf(arr[i]));","for(int i:arr)System.out.println(String.valueOf(i));","Both 1 and 2","None of the above"],3),
new Question("How do you convert an integer to binary?<br><div class='codetext'><br></div>",["Write your own function","By adding 0b as prefix","Integer.toBinaryString() method","None of the above"],3),
new Question("Which of the following is a binary literal in Java?<br><div class='codetext'><br></div>",["110011","b110011","0b110011","All of the above"],3),
new Question("Given the following code, what will be the output?<br><div class='codetext'>int&nbsp;[][]array2D&nbsp;=&nbsp;{{0,1,1},{1,0},{5,1,0};<br>System.out.println(array2D[0].length);<br><br></div>",["8","3","Compiler error","10"],2),
new Question("What is the output of the following code.<br><div class='codetext'>int&nbsp;[]&nbsp;arr;<br>arr[0]&nbsp;=0;<br>System.out.println(arr[0]);<br></div>",["0","Garbage value","Compile error","None of the above"],3),
new Question("Which statement can be inserted in place of line n1, so that the output is Stand?<br><div class='codetext'>//&nbsp;Line&nbsp;n1<br>switch&nbsp;(cardVal)&nbsp;{<br>case&nbsp;4:&nbsp;case&nbsp;5:&nbsp;case&nbsp;6:<br>case&nbsp;7:&nbsp;case&nbsp;8:<br>System.out.println('Hit');<br>break;<br>case&nbsp;9:&nbsp;case&nbsp;10:&nbsp;case&nbsp;11:<br>System.out.println('Double');<br>break;<br>case&nbsp;15:&nbsp;case&nbsp;16:<br>System.out.println('Surrender');<br>break;<br>default:<br>System.out.println('Stand');<br>}<br></div>",["cardVal=6","cardVal=14","cardVal=8	","Any of the above"],2),
new Question("What is the output of the following program?<br><div class='codetext'>public&nbsp;class&nbsp;sw{<br>&nbsp;&nbsp;&nbsp;public&nbsp;static&nbsp;void&nbsp;main(String&nbsp;args[]){<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;float&nbsp;n=1.2f;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;switch((int)n){<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;case&nbsp;1.2:System.out.println('true');<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;break;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;case&nbsp;1.0:System.out.println('false');<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;break;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;}<br>}<br></div>",["true","false","compiler error","run time error"],3),
new Question("What is the output of the following program?<br><div class='codetext'>class&nbsp;demo{<br>&nbsp;&nbsp;&nbsp;public&nbsp;static&nbsp;void&nbsp;main(String&nbsp;args[]){<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;for(int&nbsp;i=1;i<=10;i++){<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if(i%3==0)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;continue;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.print(i);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;break;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;}<br>}<br><br></div>",["12345678910","1","12457810","None of the above"],2)];
 // create quiz()
var quiz = new Quiz(questions);
 
// display quiz
populate();
 
     