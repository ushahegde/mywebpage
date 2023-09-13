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
 }var questions = [new Question("What does sizeof operator do?<br><br><div class='codetext'><br></div>",["Gives size of the program","Gives size of the variable in bits","Gives size of variable in bytes","None of the above"],3),
new Question("What is the size of an 'int' type in C?<br><br><div class='codetext'><br></div>",["2 bytes","4 bytes","Depends on compiler","Same as wordlength of processor"],4),
new Question("Which of the following statements is incorrect?<br><br><div class='codetext'><br></div>",["float m;switch(m){...}","for(;;) <br>&ensp;printf('Hello');","printf(a<10?'hi':'Hello');","All of the above"],1),
new Question("The following code produces 0 as output. Why?<br><br><div class='codetext'> double m ;<br> scanf('%f',&m);<br> printf('You typed %f\n',m);<br></div>",["Format specifier for double is %d","Format specifier of double is %lf","m is not initialized. ","None of these"],2),
new Question("What does this code print?<br><br><div class='codetext'>printf(“%d”,10?0?5:1:12);<br></div>",["0","1","5","12"],2),
new Question("What is the output of this code?<br><br><div class='codetext'>char ch=66;int m='A';<br>printf('%d %c',m,ch);<br></div>",["Syntax error in line 1","A 66","65 B","None of the above"],3),
new Question("What is the output of the following program?<br><br><div class='codetext'>int a,b,c;<br>a = 12;b=012;<br>c = 0x12;<br>printf('%d %d %d',a,b,c);<br></div>",["12 12 12","Syntax error","12 10 18","None of the above"],3),
new Question("What are the values of a,b,c after this statement?<br><br><div class='codetext'>int a=3,b=3,c;<br>if (a<3 && b++>3)<br>&ensp;c = 15;<br>else<br>&ensp;c = 10;<br></div>",["3 4 10","3 4 15","3 3 10","None of the above"],3),
new Question("What is the output of this code?<br><br><div class='codetext'>float a = 13 ;<br>int b = a%4;<br>printf('%d',b);<br></div>",["1","1.0","Syntax error - 'Invalid operands to binary %' in line 2","None of the above"],3),
new Question("What is the output of the following program?<br><br><div class='codetext'>int a = 10;<br>for(;a;a-=2)<br>&ensp;printf('%d  ',a);<br></div>",["1 2 3 4 5 6 7 8 9 10","10 9 8 7 6 5 4 3 2 1 0","10 8 6 4 2 ","Syntax error in for statement"],3),
new Question("Write output of the code<br><br><div class='codetext'>int a=6;<br>switch(a){<br>&nbsp;case 6:printf('Six');<br>&nbsp;case 5:printf('Five');<br>  &nbsp;default: printf('Less than five');<br>}<br></div>",["Six","SixFiveLess than Five","Less than five","None of the above"],2),
new Question("Do these 3 loops produce same output?<br><br><div class='codetext'>int a=10;<br>while(a<0)&ensp;printf('%d',a++);<br>---------------------------<br>int a;<br>for(a=10;a<0;a++)<br>&ensp;printf('%d',a);<br>----------------------------<br>int a=10;<br>do   <br>&ensp;printf('%d',a++);while(a<0);<br></div>",["Yes","No","",""],2),
new Question("Which of the following declarations are correct?<br><br><div class='codetext'><br></div>",["void fn1(); ","void *ptr1;","int fn2(void);","All the three"],4),
new Question("What is the value of b and c at the end of this code?<br><br><div class='codetext'>int a =10,b=3,c;<br>if(a>b++)<br>&emsp;    c=3;<br>if(++b==4)<br>         c=2;<br></div>",["5 2","5 3","4 3","4 2"],2),
new Question("What is the value of b at the end of this code?<br><br><div class='codetext'>int a=10;<br>a==10?b=4:b=5;<br></div>",["4","5","Syntax error","2"],3),
new Question("In C programming language x-=y+1; means…...<br><br><div class='codetext'><br></div>",["x=x-y+1","x=-x+y+1","x = x-y-1","x = -x-y-1"],3),
new Question("What does the following code print?<br><br><div class='codetext'>int a;<br>int main()<br>{<br>&nbsp;int b;<br>&nbsp;printf('%d %d',a,b);<br>}<br></div>",["0 0 ","garbage garbage","0 garbage","garbage 0"],3),
new Question("Which of the folllowing codes will assign 1 to s  if 'i'th bit of n is set?<br><br><div class='codetext'><br></div>",["int s  = n& (1<<i);","int s=i&n;","int s = (1<<i)|n;","None of these"],1),
new Question("What is the output of this?<br><br><div class='codetext'>int a=4,b=2,c=1;<br>if(a>b>c)<br>&ensp;printf('a');<br>else<br>  &ensp;printf('not a');<br></div>",["a","not a","Syntax error",""],2),
new Question("What are the numerical values of c1 and c2 after the following code?<br><br><div class='codetext'>enum color {black,blue=7,white,red,green};<br>enum color c1=black,c2 = red;<br><br></div>",["1 9","1 4","0 9 ","0 4"],3),
new Question("The following code produces 0 as output. Why?<br><br><div class='codetext'> double m ;<br> scanf('%f',&m);<br> printf('You typed %f\n',m);<br></div>",["Format specifier for double is %d","Format specifier of double is %lf","You can not read double from console","None of these"],2),
new Question("How do you modify the code below so that the m is printed in octal<br><br><div class='codetext'>int m=15;<br>printf('%d',m);<br></div>",["printf('%0d',m);","printf('%o',m);","You should write your own function to print the number in octal",""],2),
new Question("What will be the output of the following code?<br><br><div class='codetext'>int main()<br>{<br>     int a = 10;<br>     if(a>4)     {   int j=2;  }<br>     printf('%d',j);<br>}<br></div>",["2","Garbage value","Compilation error",""],3),
new Question("What is/are the error/s in the following code?<br><br>float m=.23f;<br><br><div class='codetext'><br></div>",["Should be<br>float m=0.23f","Should be<br>float m=.23;","No errors",""],3),
new Question("What is the output of this code?<br><br><div class='codetext'>int a=3;<br>float b=12.4;<br>char c=97;<br>printf('%d %e %c',a,b,c);<br></div>",["Syntax error in printf format specifier","3 1.240000e+01 a<br>","3 12.4 a","Syntax error in c=97"],2),
new Question("What is the output of this code?<br><br><div class='codetext'>int a;int b=33,c=12,d=4;<br>printf('%d %d %d %n',b,c,d,&a);<br>printf('a is %d',a);<br></div>",["Syntax error in printf","33 12 4a is 7","33 12 4a is .....(some garbage value here)",""],2),
new Question("Write the output of this code.<br><br><div class='codetext'>int a=33;<br>char arr[30]='Hello';<br>sprintf(arr,'%d',a);<br></div>",["Hello33","Hello 33","No output",""],3),
new Question("How do you find the numerical value of a character entered through keyboard?<br><br><div class='codetext'><br></div>",["ctoi(ch)","(int)ch","No conversion is needed. Chars are integers.",""],3),
new Question("Write the string in the printf   given below, such that output is<br><br> 80% usually means excellent<br><br><br><div class='codetext'>int n=80;<br>printf (' _____ ', n);<br></div>",["80% usually means excellant","%d% usually means excellent","%d%% usually means excellent",""],3),
new Question("What is the output of this code if 2 is typed on console?<br><br><div class='codetext'>int k;<br>k = getchar ( );<br>printf ('%d', k);<br></div>",["2","Syntax error in line 2","50",""],3),
new Question("What is the output of this code?<br><br><br><div class='codetext'>printf('%d',printf('Hello world'));<br></div>",["Syntax error","Run time error","Hello World11",""],3),
new Question("What is the value of x after this code is executed and two values are entered through console?<br><br><div class='codetext'>int m,n;int x;<br>x = scanf('%d %d',&m,&n);<br><br></div>",["Syntax error","0","Garbage","2"],4),
new Question("How do you print  'Hello world' printing even the quotes?<br><br><div class='codetext'><br></div>",["Not possible","Depends on compiler","printf('\'Hello world\'');",""],3),
new Question("What is the output of the following program?<br><br><div class='codetext'>int main()<br>{<br>   int i = 0xff ;<br>.  printf('%d', i<<2);<br>}<br></div>",["1020","0xff0","512",""],1),
new Question("What is the output?<br><br><div class='codetext'>int main()<br>{<br>&nbsp;int x=10,y=12,z=5;<br>&nbsp;int a=x<y?x<z?x:z:y<z?y:z;<br>&nbsp;&nbsp;printf('%d',a);&nbsp;return 0;<br>}<br></div>",["5","10","12","Syntax error"],1),
new Question("What is the output?<br><br><div class='codetext'>int main()<br>{<br>&nbsp;int a=011|0x10;<br>&nbsp;printf('%d',a);<br>&nbsp;return 0;<br>}<br></div>",["Syntax error","10","25","None of these"],3),
new Question("In the code below, what is the value of c printed  if function f() is called ?<br><br><div class='codetext'>void f()<br>{<br>&nbsp;int a=2; &nbsp; f1(a++);<br>}<br>void f1(int c)<br>{<br>&nbsp;&nbsp;    printf('%d', c);<br>}<br></div>",["3","2","Garbage value",""],2),
new Question("What is returned by function f(),  if main calls f('B')?<br><br><div class='codetext'>int foo(int ch)<br>{<br>   &nbsp;if(ch>=65&&ch<=91)<br>  &nbsp;&nbsp;&nbsp;      ch+=32;<br>  &nbsp; else<br> &nbsp;&nbsp;&nbsp;       if(ch>=97 && ch<=123)<br>     &nbsp;&nbsp;&nbsp;       ch-=32;<br>   &nbsp;return ch;<br>}<br></div>",["Syntax error","98","66","None of these"],2),
new Question("What does this code print?<br><br><div class='codetext'>int i;<br>for(i = 0; i < 3; i = i + 1)<br>        printf('a\n');<br>        printf('b\n');<br> printf('c\n');<br></div>",["abababc","aaabc","aaabbbc",""],2),
new Question("Optimize this code,  given that variable  i can take only two values -  (1,0)<br><br><div class='codetext'>int i;<br>if i=0 then i:=1;<br>if i=1 then i:=0;<br></div>",["j = i^1;","j = !i;","j = i+1;","Both 1 and 2"],4),
new Question("What is the output of the code below?<br><br><div class='codetext'>int i;<br>for(i=0; ;i+=2)<br>{<br> &nbsp;&nbsp;  if(i=10)<br>  &nbsp;&nbsp;&nbsp;    break;<br> &nbsp;&nbsp;  printf('Hi\n');<br>}<br></div>",["HiHiHiHiHi","HiHiHiHiHiHiHiHiHiHi","Syntax error ","Nothing"],4),
new Question("In which of the following codes, control goes out of the loop if expn2 becomes false ?<br><br><div class='codetext'><br></div>",[" while(expn1){...if(expn2)continue;}"," while(!expn1){if(expn2)continue;...} ","do{..if(expn1)continue;..}while(expn2);","while(!expn2){if(expn1)continue;..} "],3),
new Question("What is the output of the code?<br><br><div class='codetext'>int main()<br>{<br>   int i=3;<br>  while(i--)<br> &nbsp;&nbsp;    {<br>&nbsp;&nbsp;&nbsp;         int i=100;i--;<br> &nbsp;&nbsp;&nbsp;        printf(“%d”, i);<br>  &nbsp;&nbsp;    }<br>}<br></div>",["321","1009998..till 1","Syntax error because i is redefined","999999"],4),
new Question("What does this code do?<br><br><div class='codetext'>signed char ch;<br>for(ch=0;ch<255;ch++)<br> &nbsp;&nbsp;  printf('%d %c\t',ch,ch);<br></div>",["Syntax error as char can not be signed","Prints codes and corresponding characters for ASCII 0 to 255","Infinite loop",""],3),
new Question("To print a number n in octal, hexadecimal and binary you should write<br><br><div class='codetext'><br></div>",["printf('%o %x %b',n,n,n);","n = 0n; printf('%d',n);n=0xn;printf('%d',n);n = 0bn;printf('%d',n);","%o and %x for octal and hex. But you can not directly print a number in binary",""],3),
new Question("Which of the following is not a C keyword?<br><br><div class='codetext'><br></div>",["char","double","array","int"],3),
new Question("Which of the following is a valid identifier?<br><br><div class='codetext'><br></div>",["1stnum","array","sum of numbers","double"],2),
new Question("Write the output of the following line of code?<br><br><div class='codetext'>printf('%d %d %d %d %d\n',sizeof(2),sizeof(2.0),sizeof(2.0f),sizeof('2'));<br></div>",["2 4 4 1","4 8 4 1","4 8 4 2","None of the above"],3),
new Question("If you have defined a character variable ch, how do you assign a value 'A' to it?<br><br><div class='codetext'><br></div>",["ch = 'A';","ch=A;","ch='A';","Any of the above"],3),
new Question("What do header files contain?<br><br><div class='codetext'><br></div>",["Printf and scanf functions","Codes for library functions","Declarations of library functions and macros","None of the above"],3),
new Question("How many main() functions should be present in a program?<br><br><div class='codetext'><br></div>",["zero or more","One or more","One ","Noe of the above"],3),
new Question("Which of the following qualifier can not be used with int data type?<br><br><div class='codetext'><br></div>",["short","long","signed","None of the above"],4),
new Question("What is the error in the following line of code?<br><br><div class='codetext'>short i = 12;<br></div>",["short is not a data type","Initial value must be 12s","No error",""],3),
new Question("What is the output of the following piece of code?<br><br><div class='codetext'>int a = 12;<br>int b = 5;<br>float c = a/b;<br>printf('%3.1f',c);<br></div>",["2.4","2.40","2.0","None of the above"],3),
new Question("What is the output of the following line of code?<br><br><div class='codetext'>if (12>012)<br>   printf('How is it possible? ');<br>else<br>   printf('Correct');<br></div>",["How is it possible","Correct","Compilation error","None of the above"],1),
new Question("What is the value of variable e after the following code is executed?<br><br><div class='codetext'>int a ,b,c,d,e<br>a = 10;<br>b = 2;<br>c = a||b;<br>d = a | b;<br>if (c==d)<br>   e = 1;<br>else<br>   e = 0;<br></div>",["1","0","Depends on compiler","None of the above"],2),
new Question("Which of the following operators can be used with float operands.<br><br><div class='codetext'><br></div>",["^","||","%","|"],2),
new Question("What is the output of the following code?<br><br><div class='codetext'>int a ,b;<br>a= 10;b=5;<br>b+=a;<br>printf('%d %d',a,b);<br><br></div>",["Compilation error","10 15","15 15","None of the above"],2),
new Question("Why does the following code print 'not equal'?<br><br><div class='codetext'>int a = 0;<br>int b = a;<br>if(a=b)<br>   printf('equal');<br>else<br>  printf('not equal');<br></div>",["There is an error in compiler","I really don't know","The code uses wrong operator",""],3),
new Question("How many times does this code print Hello?<br><br><div class='codetext'>int a = 1;<br>while(a<10)<br> &nbsp;&nbsp;  printf('Hello ');<br>  &nbsp;&nbsp;&nbsp;&nbsp; a++;<br></div>",["9 times","10 times","once","infinite times"],4),
new Question("What does the following code do?<br><br><div class='codetext'>int n;<br>for(;;)<br>  {<br>&nbsp;&nbsp;   scanf('%d',&n);<br>&nbsp;&nbsp;    if(n==-1)<br> &nbsp;&nbsp;&nbsp;      break;<br>&nbsp;&nbsp;    printf('Square of %d is %d\n',n,n*n)<br>}<br></div>",["Prints squares of first 10 numbers","Produces compiler error","Prints squares of numbers typed, until a -1 is given","None of the above"],3),
new Question("What does the program display if input is 5?<br><br><div class='codetext'>scanf('%d',&n);<br>switch(n%2)<br>{<br>   case 0:printf('Even ');<br>   case 1:printf('Odd ');<br>   default:printf('I don't know');<br>  }<br></div>",["Odd","Even","Odd I don't know","None of the above"],3),
new Question("What is the output of the following code?<br><br><div class='codetext'>int a;<br>printf('%d',a);<br></div>",["0","1","10","Some garbage value"],4),
new Question("What is the output of the following code?<br><br><div class='codetext'>int a=10,b=2;<br>if(a>0)<br>  {<br>      int b=100;<br>   }<br>printf('%d',b);<br></div>",["100","2","Syntax error",""],2),
new Question("Which of the following codes will print all the numbers from 1 to 20 which are divisible by 3?<br><br><div class='codetext'><br></div>",["for(i=1;i<20;i++)<br>   if(i%3==0)<br>      printf(%d',i);","i=3;<br>while(i<20)<br>   {<br>      printf('%d',i);<br>      i+=3;<br>   }","Both","Neither"],3),
new Question("How do you find if a given number is odd, without using % operator?<br><br><div class='codetext'><br></div>",["Using - in a loop","Using <br>(a/2)*2 == a","Using a&1==0","Both 2 and 3"],4),
new Question("Which of the following statements is true regarding break and continue?<br><br><div class='codetext'><br></div>",["break will terminate the loop","continue will terminate the loop","continue will skip the current iteration","Both 1 and 3"],4),
new Question("What is the output of the following code?<br><br><div class='codetext'>int i;<br>for(i=1;i<10;i++)<br>{<br>   if(i%2==0)<br>      continue;<br>   if(i==5)<br>      break;<br>   printf('%d ',i);<br>}<br></div>",["1 3 5 7 9","1 2 3 4 5 6 7 8 9 ","1 3","Syntax error"],3),
new Question("Which of the following codes checks if a given number is divisible by 100?<br><br><div class='codetext'><br></div>",["if(n%100==0)<br>    printf('%d is divisible by 100',n);<br>else<br>   printf('%d is not divisible by 100',n);","printf('%d is %s',n,(n%100?'not divisible by 100':'divisible by 100'));","Both 1 and 2","None of the above"],3),
new Question("Which symbol can be used in variable names along with letters and digits?<br><br><div class='codetext'><br></div>",["$","-(minus)","_(underscore)","None of the above"],3),
new Question("Which of the following is a valid identifier?<br><br><div class='codetext'><br></div>",["int","2ndnumer","total deposit","None of the above"],4),
new Question("What is the default data type of real numbers in C?<br><br><div class='codetext'><br></div>",["float","double","int","None of the above"],2),
new Question("What is the output of this code?<br><br><div class='codetext'>const int a = 10;<br>a++;<br>printf('%d',a);<br></div>",["10","11","Run time error","Syntax error"],4),
new Question("Which statement is the equivalent of the following statement?<br><br><div class='codetext'>c?printf('Hello'):printf('Goodbye');<br></div>",["if(c==1)<br>   printf('Hello');<br>else<br>   printf('Goodbye');","if(c==0)   printf('Hello');    else   printf('Goodbye');","if(c!=0).   printf('Hello');   else.    printf('Goodbye');","None of the above"],3),
new Question("Write the output of the following code.<br><br><div class='codetext'>int i=100;<br>for(;i;)<br>  {<br>      printf('%d',i);<br>      i>>=1;<br>   }<br></div>",["1 2 3 ..100","100 99 98 ..1","100 50 25 12 6 3 1","None of the above"],3),
new Question("In which of the following statements, 'break' keyword can not be used?<br><br><div class='codetext'><br></div>",["for loop","while loop","switch statement","if statement"],4),
new Question("What is the output of the following program?<br><br><div class='codetext'>#include<stdio.h><br>int main()<br>{<br>     printf('%d',INT_MAX);<br>     return 0;<br>}<br></div>",["Error because main should be void function","Error because macro INT_MAX has not been defined","Error because limits.h is not included","32767"],3),
new Question("Which of the following is a relational operator in C?<br><br><div class='codetext'><br></div>",["<=",">=","!=","All of the above"],4),
new Question("What is the value of d after this code?<br><br><div class='codetext'>int a = 3;<br>int b = 4;<br>int d = a&b;<br></div>",["true","1","0","The operator should be &&"],3),
new Question("What is the value of b after the following code is executed?<br><br><div class='codetext'>int a = 10;<br>int c = a<<1;<br></div>",["There is no << operator in C","5","20","None of the above"],3),
new Question("What is the error in the following code if any?<br><br><div class='codetext'>double a;<br>printf('Enter a number:');<br>scanf('%f',&a);<br>a *= 5;<br>printf('Number multiplied by 5 is %f\n',a);<br></div>",["a is not initialized","a*=5 is wrong. It should be a= a*5","Format specifier in scanf should be %lf","All of the above"],3),
new Question("What is the difference between the following two lines?<br><br><div class='codetext'>printf('Hello world');<br>puts('Hello world');<br></div>",["No difference","puts prints a newline after printing Hello world","puts writes the value to a file","None of the above"],2),
new Question("Write the output of the following code?<br><br><div class='codetext'>printf('%d ',sizeof(7.2));<br>printf('%d ',sizeof(7.2f));<br>printf('%d ',sizeof(7.2L));<br></div>",["4 4 4","8 4 8","Syntax error","8 4 16"],4),
new Question("Which of the following statements is incorrect?<br><br><div class='codetext'><br></div>",["break and continue can be used with for","break and continue can be used with while","break and continue can be used with switch","All of the above"],3),
new Question("What is the output of the following code?<br><br><div class='codetext'>int i=100;<br>int j=i^i;<br>printf('%d %d',i,j);<br></div>",["100 100","100 1","100 0","None of the above"],3),
new Question("How do you toggle LSB of a number a?<br><br><div class='codetext'><br></div>",["n&1","n|1","n^1","Both 1 and 3"],3),
];
var quiz = new Quiz(questions);populate();