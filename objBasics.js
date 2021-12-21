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
 }var questions = [new Question("In Java, the data types byte, short, long, int all these data types are  ",["signed","unsigned","both","None of the above"],1),
new Question("Size of int in Java language is  --",["16 bit","32 bit","64 bit","None of the above"],2),
new Question("What is the output of the following program?<br><br><div class='codetext'>public class Test {	<br>		public static void main(String args[]) {<br>			int x = 10;<br>			if (x>10) {<br>				int y=5;<br>			}<br>			System.out.println('The values of x and y are '+x+'and '+y);<br>		}<br>}<br></div>",["10 5","10 0","10 10","Compilation error"],4),
new Question("What is the output of the following program?<br><br><div class='codetext'>public class Test {	<br>	public Test(float x) {<br>		System.out.println('Float');<br>	}<br>	public Test(double x) {<br>		System.out.println('Double');<br>	}<br>	public static void main(String args[]) {<br>		Test t = new Test(10.2);	<br>	}<br><br>}<br></div>",["float","double","float double","None of the above"],2),
new Question("What is the package in which System class is defined in Java? ",["java.util","java.io","java.lang","None of the above"],3),
new Question("Exposing only the necessary information to the clients is called as -----   ",["Encapsulation","Abstraction","Inheritance","Polymorphism"],2),
new Question("The process of defining a methods in terms of itself is called -----   ",["Encapsulation","Inheritance","Recursion","None of the above"],3),
new Question("What is the output of the following program?<br><br><div class='codetext'>    class Test<br>    {<br>     public void m1 (int i,float f)<br>     {<br>           System.out.println(' Method m1 with int float');<br>     }<br>     public void m1(float f,int i)<br>      {<br>      System.out.println('Method m1 with float int');<br><br>      }  <br><br>      public static void main(String[]args)<br>      {<br>           Test t=new Test();<br>            t.m1(20,20);<br>      }<br>    }<br></div>",["Method m1 with int float","Method m1 with float int","Compiler error","Run time error"],3),
new Question("Where in the memory are method parameters and local variables stored?   ",["Heap","Stack","Code area","None of the above"],2),
new Question("What is Java byte code?   ",["A code generated by Java compiler","A code generated by JVM","Another name for java source file","None of the above"],1),
new Question("What is the correct order in a Java program?   ",["Import statement, <br>package declaration, <br>class declaration","Package declaration,<br> import statement, <br>class declaration","Class declaration,<br> import statement, <br>package declaration","None of the above"],2),
new Question("An overloaded method is a method with -----   ",["Same name and different return type","Same name with different number of parameters","Same name with different types of parameters","Either 2 or 3"],4),
new Question("What is the range of short data type in Java?   ",["-128 to 127","-32768 to 32767","0 to 255","None of the above"],2),
new Question("An expression involving byte, int and short numbers is promoted to ------   ",["int","long","float","None of the above"],1),
new Question("Which of the following is Long literal?   ",["1234","ABCDE","34L","All of the above"],3),
new Question("Which of the following statements is correct way of initialising an integer array.   ",["int arr[] = {1,2,3,45};","int arr[] = new int[]{1,2,3,4,5};","int arr = new int {1,2,3,4,5};","Both 1 and 2"],4),
new Question("When is method overloading determined?   ",["At compile time","At run time","At coding time","None of the above"],1),
new Question("Which of the following is not overloaded method of the function given below.  <div class='codetext'>int add(int a,int b);<br></div>",["float add(float a, float b);","float add(int a, int b);","int add(int a,int b,int c);","float add(float a, float b, float c);"],2),
new Question("What is the name for combining methods and attributes into classes?   ",["abstraction","encapsulation","inheritance","polymorphism"],2),
new Question("What is the name for the mechanism in Object oriented languages, where one object acquires all the properties and behaviors of the another object?   ",["Encapsulation","Inheritance","Abstraction","None of the above"],2),
new Question("Java Virtual Machine is machine independant. True or false?   ",["True","False","",""],2),
new Question("How do you make classes and interfaces of one package available to another package?   ",["Using import statement","Using implements statement","Using package statement","None of the above"],1),
new Question("The inventor of Java language is -------   ",["Dennis Ritchie","James Gosling","Steve Jobs","None of the above"],2),
new Question("Which of the following is not a comment  in Java?   ",["/* comment*/","//comment","/**comment*/","/*comment"],4),
new Question("Which of the following statements are correct. Select the four correct answers. <br>a.	A Java program must have a package statement. <br>b.	A package statement if present must be the first statement of the program (barring any comments).<br>c.	If a Java program defines both a package and import statement, then the import statement must come before the package statement. <br>d.	An empty file is a valid source file. <br>e.	A Java file without any class or interface definitions can also be compiled. <br>f.	If an import statement is present, it must appear before any class or interface definitions. <br><br> ",["b, d, e, f ","a, b, d, f ","d, e, a, c"," c, d, b, a "],1),
new Question("What is the correct signature of main() method in a standalone Java program?   ",["public static void main(char args[])","public static void main(String arg)","public static void main(String args[])","public static void Main(String args[])"],3),
new Question("What does a void function return?   ",["null","0","Nothing","There can not be void functions"],3),
new Question("Why does the following code does not compile?  <div class='codetext'>int a = 10;<br>byte b = a;<br><br></div>",["There is no byte data type in Java","Implicit conversion to low precision is not allowed","The code will compile","None of the above"],2),
new Question("Which of the following is not a primitive data type in Java?   ",["int ","float ","bool","long"],3),
new Question("What is the output of the following program if it is run as <br>java test 10 20<br><br><div class='codetext'>public class test {<br>   public static void main(String args[]) { <br>      String str = args[1];//line 3<br>      int num = Integer.valueOf(str);//line 4<br>      System.out.println(num);<br>   }<br>}<br><br></div>",["Syntas error in line 3","Run time error in line 4","20","10"],3),
new Question("Java compiler converts Java source code  to ----   ",["Object code","Machine code","Byte code","None of the above"],3),
new Question("What is the output of the following code?  <div class='codetext'>String s = 'Java';<br>s.concat('coders');<br>System.out.println(s);<br></div>",["Javacoders","Java coders","Java","None of the above"],3),
new Question("What is the output of the following code?<br><br><div class='codetext'>float m=2.9f;<br>System.out.println('m is '+Math.floor(m));<br><br></div>",["2.9","2","3","None of the above"],2),
new Question("A lower precision value can be assigned to a higher precision value in Java. <br><br>True or false?<br><br> ",["True","False","",""],1),
new Question("Which of the following is a keyword in Java?   ",["NULL","synchronized","implement","All of the above"],2),
new Question("The operands of arithmetic operators must be   ",["Numeric","Boolean","Character","Either numeric or boolean"],4),
new Question("Which of the following statements about modulus operators is true?   ",["Modulus operator gives remainder when first number is divided by second","Modulus operator can not be applied to non-integers","Symbol of modulus operator is ^","None of the above"],1),
new Question("Which of the following statements make the value of m to 10  <div class='codetext'>int m = 9;<br></div>",["m+=1;","m++;","++m;","All of the above"],4),
new Question("What is the output of the following program?  <div class='codetext'>class Test {<br>public static void main(String args[]) <br>{    <br>  int x , y;<br>  x = 25;<br>  x++;<br>  --x;<br>  y = x++;<br>  System.out.println(x + ' ' + y);<br>} <br>}<br></div>",["26 26","25 25","26 25","25 26"],3),
new Question("Which of the following operators is used to complement a number - i.e. invert all the bits of a number?<br><br> ",["^","~","!","None of the above"],2),
new Question("Which type of operators returns a boolean answer?   ",["Arithmetic","Bitwise","Relational","None of the above"],3),
new Question("What is the output of the following code?<br><br><div class='codetext'>int a = 10;<br>a = a<<2;<br>System.out.println(String.valueOf(a));<br><br></div>",["2","40","10","None of the above"],2),
new Question("Which of these operators can be used on boolean operands?   ",["==","&&","?:","All of the above"],2),
new Question("What is the output of the following code?<br><br><div class='codetext'>int a = 10;<br>int b = 2;<br>if ( a++>30 && b++>0)<br>    System.out.println('true');<br>else<br>    System.out.println('false);<br>System.out.println(a+' '+b);<br><br></div>",["false<br>11 3","true<br>10 2","false<br>11 2","None of the above"],3),
new Question("What is the output of the following program?<br><br><div class='codetext'>public class Ran{<br>    public static void main(String args[]){<br>        System.out.println(Math.floor(Math.random()));<br>    }<br>}<br></div>",["1.0","0.0","Can not predict","10.0"],2),
new Question("Write the output of the following program. <br><br><div class='codetext'>public class Test{<br>    void method(int n){<br>         System.out.println('method1');<br>    }<br>   void method(String n){<br>         System.out.println('method2');<br>    }<br>    public static void main(String args[]){<br>         Test obj = new Test();<br>         obj.method(10);<br>    }<br>}<br></div>",["method1","method2","Compiler error","None of the above"],1),
new Question("What is the output of the following program?<br><br><div class='codetext'>public class Numbers{<br>    <br>    int add(int n,int m){<br>         return n+m;<br>    }<br>    <br>    public static void main(String args[]){<br>         Numbers obj = new Numbers();<br>         short s = 9;//line 1<br>       <br>         int m =  obj.add(10,s);//line 2<br>         System.out.println('sum  is '+m);<br>    }<br>}<br></div>",["Error in line 1","Error in line 2","19",""],3),
new Question("What is the output of the following program?<br><br><div class='codetext'>public class Test{<br>    void changeString(String s){<br>       s = 'xyz';<br>    }<br>     <br>    public static void main(String args[])<br>    {<br>      Test obj = new Test();<br>      String s = 'abc';<br>      obj.changeString(s);<br>      System.out.println('String is '+s);<br>    }<br>}<br><br></div>",["abc","xyz","Compilation error",""],1),
new Question("Write the output of the following program.<br><br><div class='codetext'>public class Test{<br>     int n;<br>     Test(int n){<br>	this.n = n;//line 1<br>    }<br>    void printNumbers(byte ...b){<br>       for(int i=0;i<b.length;i++)<br>          System.out.println('The number is '+b[i]);<br>    }<br>    public static void main(String args[])<br>    {<br>      Test obj = new Test(10);<br>      byte b1 = 10,b2=20,b3=40;<br>      obj.printNumbers(b1,b2,b3);<br>    }<br>}<br><br></div>",["Compiler error","The number is 10 20 40","The number is 10<br>The number is 20<br>The number is 40","None of the above"],3),
new Question("What type of file does a Java compiler produce?	   ",[".obj",".class",".exe","None of the above"],2),
new Question("Which method can be used to copy an array?   ",["arrayCopy","copyArray","copy","None of the above"],1),
new Question("How do you represent the number 13 in binary in Java?   ",["0b1101","b1101","01101B","None of the above"],1),
new Question("What is the output of the following program?<br><br><div class='codetext'>class Equal{<br>  public static void main(String args[]){<br>     String s1 = 'abc';<br>     String s2 = 'abc';<br>     boolean b = s1==s2;<br>     System.out.println('s1 == s2 is  '+s1==s2);<br>  }<br>}<br><br></div>",["s1 == s2 is true","s1 == s2 is false","false","None of the above"],3),
new Question("In the following code, what can be the type of n?<br><br><div class='codetext'>switch(n){/*code*/}<br></div>",["int","char","float","both 1 and 2"],4),
new Question("Which of the following statements will print all elements of arrray myarr?   ",["for(int i=0;i<n;i++) System.out.println(arr[i]);","for(int i:arr)System.out.println(i);","Both 1 and 2","None of the above"],3),
new Question("How do you convert an integer to binary?   ",["Write your own function","By adding 0b as prefix","Integer.toBinaryString() method","None of the above"],3),
new Question("Which of the following is a binary literal in Java?   ",["110011","b110011","0b110011","All of the above"],3),
new Question("Given the following code, what will be the output?  <div class='codetext'>int [][]array2D = {{0,1,1},{1,0},{5,1,0};<br>System.out.println(array2D[0].length);<br><br></div>",["8","3","Compiler error","10"],2),
new Question("What is the output of the following code.  <div class='codetext'>int [] arr;<br>arr[0] =0;<br>System.out.println(arr[0]);<br></div>",["0","Garbage value","Compile error","None of the above"],3),
new Question("Which statement can be inserted in place of line n1, so that the output is Stand?<br><br><div class='codetext'>// Line n1<br>switch (cardVal) {<br>case 4: case 5: case 6:<br>case 7: case 8:<br>System.out.println('Hit');<br>break;<br>case 9: case 10: case 11:<br>System.out.println('Double');<br>break;<br>case 15: case 16:<br>System.out.println('Surrender');<br>break;<br>default:<br>System.out.println('Stand');<br>}<br></div>",["cardVal=6","cardVal=14","cardVal=8	","Any of the above"],2),
new Question("What is the output of the following program?  <div class='codetext'>public class sw{<br>   public static void main(String args[]){<br>      float n=1.2f;<br>      switch((int)n){<br>           case 1.2:System.out.println('true');<br>                    break;<br>           case 1.0:System.out.println('false');<br>                   break;<br>      }<br>   }<br>}<br></div>",["true","false","compiler error","run time error"],3),
new Question("What is the output of the following program?  <div class='codetext'>class demo{<br>   public static void main(String args[]){<br>        for(int i=1;i<=10;i++){<br>           if(i%3==0)<br>              continue;<br>           System.out.print(i);<br>                   break;<br>      }<br>   }<br>}<br><br></div>",["12345678910","1","12457810","None of the above"],2),
];
var quiz = new Quiz(questions);populate();
