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
 }var questions = [new Question("What does the following function do?<br><br><div class='codetext'>int foo(int m)<br>{<br> if(m)<br> {<br>     return m%10  +foo(m/10);<br>  }<br>}<br><br></div>",["Returns the remainder when m is divided by 10","Gives run time error","Returns sum of digits of the number","None of the the above"],3),
new Question("What does this function do?<br><br><div class='codetext'>void print(char *str)<br>{<br>    print(str+1);<br>    putchar(*str);<br>}<br></div>",["Prints the string in reverse order","Prints the string in correct order. ","Runs infinitely","None of the above"],3),
new Question("What does this code print?<br><br><div class='codetext'>int squre(int m)<br>{<br>     return m*m;<br>}<br>int main()<br>{<br>     int z=12;<br>    square(z);<br>    printf('%d',z);<br>} <br></div>",["Prints 144","Syntax error.  ","Prints 12","None of the above"],3),
new Question("Write a code to return two values from a function, a and b.<br><br><div class='codetext'><br></div>",["return a; return b;","return a,b;","A function can not return 2 values","None of the above"],3),
new Question("Which of these two functions correctly swaps 2 variables ?<br><br><div class='codetext'>void swap(int a,int b)<br>{<br>     a=a+b;<br>     b=a-b;<br>     a = a-b;<br>}<br><br>void swap(int *a,int *b)<br>{<br>    *a = *a+*b;<br>    *b=*a-*b;<br>    *a=*a-*b;<br>}<br></div>",["First function","Second function","Neither. You should use exor operator to swap two variables",""],2),
new Question("A function is written to add all elements of the array. Find out the lines containing errors<br><br><div class='codetext'>1   void  sum_of_array(int *arr,int n)<br>2    {<br>3       int s;<br>4        int i;<br>5        while(i<n)<br>6              s+=arr[i++];<br>7        return s;<br>8     }<br></div>",["1 3 4 6","1 3 4","No errors","Only 6"],2),
new Question("Which of these can not be the return type of a funciton?<br><br><div class='codetext'><br></div>",["pointer","array","structure","None of these"],2),
new Question("What does the following function do?<br><br><div class='codetext'>int Trial (int a, int b, int c)<br>{<br>if ((a >= b) && (c < b)) return b;<br>else if (a >= b) return Trial (a,c,b);<br>else return Trial (b,a,c);<br>}<br></div>",["Finds maximum of a,b,c","Finds minimum of a,b,c","Finds middle number of a,b,c","None of these"],3),
new Question("Which of these functions prints all the elements of an array?<br><br><div class='codetext'><br></div>",["void foo(int *ptr,int n)<br>{<br>    int i;<br>    for(i=0;i<n;i++,ptr++)<br>        printf('%d',*ptr);<br> }","void bar(int arr[],int n)<br>{<br>      while(n)<br>          printf('%d\n',arr[--n]);<br> }","Neither of these","Both"],4),
new Question("What does this function do?<br><br><div class='codetext'>int fn1(int x,int y)<br>{<br>   if(y>0)<br>       return x*fn1(x,y-1);<br>   else<br>       return 1;<br>}<br></div>",["Returns the product of 2 numbers","Returns first number","Returns first number raised to the power of second number","None of these"],3),
new Question("Recursive functions are executed in ---- order<br><br><div class='codetext'><br></div>",["First In First Out","Last In First Out","All of these",""],2),
new Question("What is the return value of the function foo when it is called as foo(345,10) ?<br><br><div class='codetext'> int foo( int n,  int r)<br> {<br>     if (n > 0)<br>        return (n%r + foo (n/r, r ));<br>    else<br>        return 0;<br>  }<br></div>",["345","5","12","3"],3),
new Question("With the following definition of swap function, how should tbe function be called to exchange the values of two variables?<br><br><div class='codetext'>void swap (int *p1, int *p2)<br>{<br>    int temp;<br>   temp = *a;<br>    *a = *b;<br>    *b = temp;<br>}<br></div>",["swap (x, y)","swap (&x, &y)","Both 1 and 2","None of the above"],2),
new Question("Two functions are written to find nth term of fibonacci seris. Which one is correct?<br><br><div class='codetext'>int fib1(int term)<br>{<br>   if(term>1)    return fib(term-1)+fib(term-2);<br>   else<br>        if(term==1)<br>             return term;<br>}<br><br>int fib2(int term)<br>{    int i=0,n1=0,n2=0,n;<br>    while(i<=term)<br>   {<br>             if(i<2)<br>                   n  = i;       else       n = n1+n2;<br>            n2 = n1;       n1 = n;       i++;<br>      }<br> return n<br>}<br></div>",["fib1","fib2","Both","Neither"],3),
new Question("Which of the following library functions is an example of variable argument function?<br><br><div class='codetext'><br></div>",["printf","scanf","strcpy","Both first and second"],4),
new Question("The function with a prototype given below is --------<br><br><div class='codetext'>void foo(int a,...);<br></div>",["Incomplete function","Syntactically incorrect function","Variable argument function","None of these"],3),
new Question("What is the output of this code?<br><br><div class='codetext'>int foo(int m)<br>{   static int a = 0;<br>     a+=5;<br>     return a;<br>}<br>int main()<br>{<br>    int s;   foo();foo();<br>   s = foo();<br>   printf('%d',s);<br>}<br></div>",["5","15","Syntax error","None of these"],2),
new Question("A function is written to find largest of three numbers. Find out the errors. <br><br><div class='codetext'>int largest(int a,b,c)<br>{<br>     if   (a>b && a>c)   return a;<br>     if   (b>a && b>c)   return b;<br>     return c;<br>}<br></div>",["A function can not have multiple return statements","The function header should be<br>int largest(int a,int b,int c)","if statement should be followed by else statement","No errors"],2),
new Question("Find out errors in this function<br><br><div class='codetext'>int foo(int a)<br>{<br>register int b;<br>scanf('%d',&b);<br>return a+b;<br>}<br></div>",["register int b; is invalid statement","You can not add register variable to auto variable","You can not use address of (&) operator with register variable","No errors"],3),
new Question("What does the following function do?<br><br><div class='codetext'>int sum(int m,...)<br>{<br> int i;int sum=0;<br> va_list lst;<br> va_start(lst,m);<br>for(i=0;i<m;i++)<br> {<br> int a = va_arg(lst,int);<br>  sum+=a;<br>}<br>return sum;<br>}<br></div>",["Finds the sum of n number of parameters where n is given as first parameter","Gives syntx error in line 1","Finds the sum of command line arguments","None of these"],1),
new Question("What is the output of the following code?<br><br><div class='codetext'>void print_array(int arr[])<br>{    int i;<br>     for(i=0;i<size;i++)<br>           printf('%d',arr[i]);<br>}<br>int main()<br>{<br>    int arr[4]={5,6,7,8};<br>    int size = 4;<br>    print_array(arr);<br>    return 0;<br>}<br></div>",["5 6 7 8","Error because function is not declared","Syntax Error. size is not defined in function print_array",""],3),
new Question("What will be the output of the program?<br><br><div class='codetext'>void fun(char *msg, ...)<br>{<br>  va_list ptr;<br>  int num;<br>  va_start(ptr, msg);<br>  num = va_arg(ptr, int);<br>  num = va_arg(ptr, int);<br>  printf('%d', num);<br>}<br>int main()<br>{<br>   fun('Hello world', 1, 4, 7, 11, 0);<br>   return 0;<br>}<br></div>",["Hello world1","1","4",""],3),
new Question("What will be the output of this program?<br><br><div class='codetext'>void fun(...)<br>{<br>    va_list ptr;    int num;<br>    num = va_arg(ptr, int);<br>     printf('%d', num);<br>}<br>int main()<br>{    fun(3, 7, -11.2, 0.66);    return 0;<br>}<br></div>",["3","7","Syntax error  ",""],3),
new Question("What is the error in this code?<br><br><div class='codetext'>void display(char *s, int num1, int num2, ...)<br>{<br>    double c;    char s;<br>    va_list ptr;<br>    va_start(ptr, s);<br>   c = va_arg(ptr, double);    printf('%f', c);<br>}<br></div>",["display function must be<br>void display(char *s,..)","No error","va_start(ptr, s); must be va_start(ptr, num2);",""],3),
new Question("Find the error/s in this code.   <br><br><div class='codetext'>void foobar(int *,void *);<br>void foo()<br>{<br>   int a; void b;<br>   foobar(&a,&b);<br>}<br></div>",["You can not call a function from another function.","You can not define a variable of type void","No errors",""],2),
new Question("What is true about the following C Functions <br><br><div class='codetext'><br></div>",["Functions need not return any value ","Functions must always return an integer ","Functions should always return a float","Functions Should always return more than one value "],1),
new Question("What is incorrect among the following options about recursive function?<br><br>A recursive function ----------<br><br><div class='codetext'><br></div>",["calls itself"," is equivalent to a loop ","does not have a return value at all ","has a termination condition"],3),
new Question("Write the output of the following program<br><br><div class='codetext'>int main()<br>{<br>  static i=3;<br>  printf('%d',i--);<br>  return i>0 ? main():0;<br>}<br></div>",["Error.  main can not be called recursively","Run time error","Infinitely prints 3","321"],4),
new Question("Which of the following return-type cannot be used for a function in C?<br><br><div class='codetext'><br></div>",["char *","struct","void","Array"],4),
new Question("Which header file should you include if you are to develop a function that can accept variable number of arguments ?<br><br><div class='codetext'><br></div>",["stdlib.h","vararg.h","stdio.h","stdarg.h"],4),
new Question("Which of the following statements are correct about the program?<br><br><br><div class='codetext'>#include<stdio.h><br>int main()<br>{<br>    printf('%p\n', main());<br>    return 0;<br>}<br></div>",["It prints garbage values infinitely","Runs infinitely without printing anything","Error: main() cannot be called inside printf()","No Error and prints nothing"],2),
new Question("A function must be enclosed in a pair of -----<br><br><div class='codetext'><br></div>",["Round brackets","curly brackets","begin and end","None of the above"],2),
new Question("A function is written to find if the given number is prime. Find out errors if any.<br><br><div class='codetext'>int isPrime(int n)<br>{<br>    int i=2;<br>    if(n%i==0)<br>      return 0;<br>    for(i=3; i*i<=n;i+=2)<br>       if(n%i==0)<br>          return 0;<br>    return 1;<br>}<br>         <br></div>",["for loop must use i++, not i+=2","Condition in for loop must be i<n, not i*i<=n","A function can not have multiple return statements","No errors"],4),
new Question("A function can contain --- number of parameters<br><br><div class='codetext'><br></div>",["0 or more","1 or more","1",""],1),
new Question("State whether true or false<br>When a C function is called the arguments provided to the function are modified by the function.<br><br><div class='codetext'><br></div>",["true","false","",""],2),
new Question("A non-void function can return ------ values<br><br><div class='codetext'><br></div>",["1","2","0 ","Any number"],1),
new Question("In the function <br>    float fn2(int a);<br>float indicates ---------<br><br><div class='codetext'><br></div>",["Type of parameters to function","Type of return value of function","Type of local variables in function","None of the above"],2),
new Question("What does return statement do in a function?<br><br><div class='codetext'><br></div>",["It terminates the function and returns a value","It returns to the begining of function","It terminates the function","None of the above"],1),
new Question("What is the output of the following code?<br><br><div class='codetext'>int square(int m)<br>{<br>    return m*m;<br>}<br>int main()<br>{<br>   int i= 5;<br>   square(i);<br>   printf('%d',i);<br>}<br></div>",["25","5","Garbage value","None of the above"],2),
new Question("State whether the following line is true or false.<br><br>  A void function can not have a return statement.<br><br><div class='codetext'><br></div>",["true","false","",""],2),
new Question("A function is written to find whether a given character is upper case letter or not. Find out errors if any.<br><br><div class='codetext'>int isuppercase(char ch)<br>{<br>    if(ch>='A' &&ch<='Z')<br>       return 1;<br>    return 0;<br>}<br></div>",["The AND operator is  &","Else is not used","Relational operators <= and >= can not be used with char variables","No errors"],4),
new Question("What is the output of the following code?<br><br><div class='codetext'>int fn1()<br>{<br>    printf('%d',a);<br>}<br>int main()<br>{<br>     int a = 100;<br>     fn1();<br>}<br></div>",["100","Garbage value","0 ","Syntax error"],4),
new Question("What does the following function do?<br><br><div class='codetext'>int fn(int n)<br>{<br>   if(n>=1)<br>     return n*fn(n-1);<br>  return 1;<br>}<br></div>",["It checks whether the number is positive.","It just returns 1","It finds factorial of a number","Syntax error because a function can not call itself"],3),
new Question("Which of the following is declaration of function<br><br><div class='codetext'><br></div>",["m = sum(n,p);","int sum(int a,int b)<br>{<br>   return a+b;<br>}","int sum(int,int);","All of the above"],3),
new Question("What does the function abc() return?<br><br><div class='codetext'>void abc()<br>{<br>    1<2?return 1:return 0;<br>}<br></div>",["1","2","Garbage value","Syntax error"],4),
new Question("Which keyword can be used to terminate a loop? And which keyword is used to terminate a function?<br><br><div class='codetext'><br></div>",["break and continue","continue and break","break and return","None of the above"],3),
new Question("What is the output of the following program?<br><br><div class='codetext'>#include <stdio.h><br>int main()<br>{<br>   static int num;<br>   num++;<br>   printf('In main ');<br>   if(num<5)<br>      main();<br>}<br></div>",["main is called infinitely","in main is printed 5 times","Run time error","in main is printed once"],2),
new Question("A recursive function is the one ------<br><br><div class='codetext'><br></div>",["Which is called multiple times","Which calls itself","Which should be used for factorial program","None of the above"],2),
new Question("What does the following function do?<br><br><div class='codetext'>int somefn(int *p1,int *p2, int n)<br>{<br>    int i;<br>    for(i=0;i<n;i++)<br>      if(*p1++!=*p2++)<br>         return 0;<br><br>  return 1;<br>}<br></div>",["It compares two pointers","It compares two arrays","It gives syntax error","None of the above"],2),
new Question("Complete the code which should find if a sorted array has a value v in it. <br><br><div class='codetext'>for(i=0;i<n;i++)<br>   if(--------)<br>      printf('%d is present in array',v);<br>   else if(-------)<br>      break;<br><br></div>",["a[i]==v<br>a[i]!=v","a[i]==v<br>a[i]!=v","a[i]==v<br>a[i]>v","None of the above"],3),
];
var quiz = new Quiz(questions);populate();