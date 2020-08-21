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
 }var questions = [new Question("What is the output of this code?<br><br><div class='codetext'>int arr[3]={11,34,45};<br>int *ptr = arr;<br>printf('%d',*ptr+2);<br></div>",["13","45","Syntax error in line 2","None of the above"],1),
new Question("Write output of the program<br><br><div class='codetext'>int *ptr;<br>*ptr = 12;<br>printf('%d',*ptr);<br></div>",["12","Garbage Value","Syntax error in line 2","Run time error. 'Segmentation fault'"],4),
new Question("What does this function do?<br><br><div class='codetext'>void foo(char *str1,char *str2)<br>{<br>    while(*str2++=*str1++);<br>}<br></div>",["Syntax error in while loop","While loop repeats 0 times, hence function does nothing","Copies str1 to str2","None of the above"],3),
new Question("Which statement in this code is incorrect?<br><br><div class='codetext'>int main()<br>{<br>    void *ptr;<br>    int a = 10;<br>    ptr = &a;<br>    *ptr = 15;<br>    printf('%d',*ptr);<br>}<br></div>",["void *ptr;","ptr = &a;","*ptr=15;","All of these."],3),
new Question("Which statement correctly defines an array of 10 integer pointers?<br><br><div class='codetext'><br></div>",["int *ptr;","int *ptr[10];","int (*ptr)[10];","int(*ptr)(int[10]);"],2),
new Question("What does the following C statement declare?<br><br><div class='codetext'>int(*ptr)(int *);<br></div>",[" A function that takes an integer pointer as argument and returns an<br>integer"," A function that takes an integer as argument and returns an integer<br>pointer","A pointer to a function that takes an integer pointer as argument and returns an integer."," A function that takes an integer pointer as argument and returns a<br>function pointer"],3),
new Question("Which of the following statements produces syntax error and which statement produces run time error?<br><br><div class='codetext'>char arr[]='Hello';<br>char *ptr='Hello';<br>arr[1]='i';  ptr[1]='i';<br>arr='hi';   ptr='hi';<br></div>",["arr='hi'; and ptr='hi';","arr[1]='i'; and<br>ptr[1]='i';","arr='hi';    and<br>ptr[1]='i';<br>","None of these"],3),
new Question("What is the error in this code?<br><br><div class='codetext'>char *p;<br>*p = malloc(10);<br></div>",["No error","Memory should be allocated to p, not *p","Memory can not be allocated to char pointers","None of these"],2),
new Question("What is the output of this code?<br><br><div class='codetext'>int array[5], i, *ip;<br>for(i = 0; i < 5; i++)<br>      array[i] = i;<br>ip = array;<br>printf('%d\n', *(ip + 3 * sizeof(int)));<br></div>",["3","9","Garbage value","Syntax error"],3),
new Question("A function is written to initialize an integer pointer. Find out errors if any.<br><br><div class='codetext'>void memory_allocate(int *ptr)<br>{<br>      ptr = (int*)malloc(sizeof(int)*100);<br>}<br>int main()<br>{<br>    int *ptr1 ;<br>    memory_allocate(ptr1);<br>    *ptr1 = 12;<br>    ------<br>}<br></div>",["Program produces segmentation fault","No errors","",""],1),
new Question(" In this case, how do you assign square function to the function pointer fptr in the code given below?<br><br><div class='codetext'>int (*fptr)(int);<br>int square(int n);<br></div>",["fptr = &square;","fptr = square;","fptr = square(2);","Both 1 and 2"],4),
new Question("How is NULL pointer defined?<br><br><div class='codetext'><br></div>",["(void*)0","(int*)0","NULL  is wrong. It is null","None of these"],1),
new Question("Is the following code correct in verifying pointer is not NULL before dereferncing the pointer?<br><br><div class='codetext'>if(ptr)<br>*ptr = 12;<br></div>",["Correct","Incorrect","",""],1),
new Question("What is the error in following code?<br><br><div class='codetext'>int *ptr;<br>ptr =(int *)malloc(100);<br>------<br>free(ptr);<br>m  = *ptr+1;<br></div>",["No error","Using a dangling pointer","",""],2),
new Question("Which of the following functions will allocate memory and initialize them with 0?<br><br><div class='codetext'><br></div>",["malloc","calloc","free","Both 1 and 2"],2),
new Question("How do you define a pointer - ptr, to an array of 10 integers?<br><br><div class='codetext'><br></div>",["int *ptr[10];","int (*ptr)[10];","int (*ptr)(10);","None of these"],2),
new Question("What will be the output of this code?<br><br><div class='codetext'>char *p,q;<br>char ch = 'A';<br>q = &ch;     *q ='B';<br>printf('%c',ch);<br></div>",["B","A","Syntax Error",""],3),
new Question("Is the following statement true or false?<br><br>Pointers enable a C program to simulate call by value<br><br><div class='codetext'><br></div>",["true","false","",""],2),
new Question("The complement of & (address of) operator is --------<br><br><div class='codetext'><br></div>",["|","&&","*","None of these"],3),
new Question("What is the output of this C code?<br><br><div class='codetext'> int mul(int a, int b, int c)<br> {<br>return a * b * c;<br>}<br>int main()<br>{<br>  int (*fptr)(int, int, int);   fptr  =  mul;<br>  printf('The product is:%d',  fptr(2, 3, 4));<br>}<br></div>",["The product is 24","Run time error","Nothing","Depends on compiler"],1),
new Question("What does  the following declaration define?<br><br><div class='codetext'>int (*pf)();<br></div>",["pf is a function which returns an integer pointer","pf is a pointer to a function which takes no parameters and returns int","pf is a function  which takes an int pointer parameter.",""],2),
new Question("Find out errors in the code<br><br><div class='codetext'>int a[] = {10, 20, 30, 40, 50, -1};<br>int* b = malloc(sizeof(a));<br>memcpy(b, a, sizeof(a));<br>if ( a == b )<br>printf('Equal\n');<br>else printf('Not equal\n');<br>free(a);<br>free(b); <br></div>",["We must not compare arrays using == operator","free a is wrong, since a is not allocated memory ","Both 1 and 2","No error"],3),
new Question("With every use of a memory allocation function, which function should be used to release allocated memory which is no longer needed?<br><br><div class='codetext'><br></div>",["unalloc()","dealloc()","release()","free()"],4),
new Question("What is the type of foo in the following declaration?<br><br><br><div class='codetext'>void *(*foo)(int *)<br></div>",["A function taking integer pointer as argument and returning a void pointer","A function taking int pointer as argument and returning void","A pointer to function which takes integer pointer as argument and returns a void pointer",""],3),
new Question("Write the output of the following program.<br><br><div class='codetext'> int main()<br>{<br>     int i; float *pf;<br>     pf = (float *)&i;<br>     *pf = 100.00;<br>     printf('%d', i);<br>}<br></div>",["Run time error","100","Some integer but not 100",""],3),
new Question("Declare a pointer to a function that takes a char pointer as argument and returns a void pointer. <br><br><div class='codetext'><br></div>",["void *(*fptr)(char *)","void *fptr(char *);","void *(*fptr,char*);",""],1),
new Question("What will be stored in str after this code is run?<br><br><div class='codetext'>char *str;<br>char *str1='Hello World';<br>sscanf(str1,'%s',str);<br></div>",["Hello world","Syntax error in sscanf","Hello","Run time error"],4),
new Question("What is (void*)0?<br> 	<br><br><div class='codetext'><br></div>",["Representation of NULL pointer","Representation of void pointer","Error","None of above"],1),
new Question("What will be the output of the program ?<br><br><div class='codetext'>int main()<br>{<br>    char *s= 'peace';<br>    printf('%s\n', s++ +3);<br>    return 0;<br>}<br></div>",["peace","eace","ace","ce"],4),
new Question("What is x in the following program?<br><br><div class='codetext'>int main()<br>{<br>    typedef char (*(*arrfptr[3])())[10];<br>    arrfptr x;<br>    return 0;<br>}<br></div>",["x is a pointer","x is an array of three pointers","x is an array of three function pointers which return pointer to an array of 10 characters","Error in x declaration"],3),
new Question("What is the output of this code?<br><br><div class='codetext'>int a=10,b;<br>b=a;<br>int *ptr = &a;<br>*a=15;<br>printf('%d %d',a,b);<br></div>",["10 10","15 15","15 10",""],3),
new Question("What is the output of this code?<br><br><div class='codetext'>int arr[]={1,2,3,4,5,6};<br>int *ptr = arr;<br>int i;<br>for(i=0;i<3;i++,ptr+=2)<br>  printf('%d',*ptr);<br></div>",["1 2 3 4 5 6","1 1 1","1 3 5","Run time error"],3),
new Question("What is the output of this code?<br><br><div class='codetext'>char *ptr[]={'char','double','float','int'};<br>int i;<br>ptr[0]='string';<br>ptr[1][0]='D';<br>for(i=0;i<4;i++)printf('%s  ',ptr[i]);<br></div>",["char double float int","string Double float int","Syntax error in line<br>ptr[0]='string';","Runtime error from line<br>ptr[1][0]='D';"],4),
new Question("What is the output of this code?<br><br><div class='codetext'>int *ptr;<br>int arr[3][3]={1,2,3,4,5,6,7,8,9};<br>int i,j;<br>for(i=0;i<3;i++)<br>{<br>  ptr = arr[i];<br>  for(j=0;j<3;j++)<br>    printf('%d ',*ptr++);<br>}<br></div>",["Syntax Error. ptr can not point to 2 dimensional array","1 2 3","1 2 3 4 5 6 7 8 9",""],3),
new Question("What is the output of this code?<br><br><div class='codetext'>char *str = 'Hello';<br>while(*str)<br>   putchar(*str++);<br></div>",["Infinite loop ","Syntax error","Hello",""],3),
new Question("What does this function do?<br><br><div class='codetext'>void string_reverse(char *str)<br>{<br>   int i,j;i=0;j=strlen(str)-1;<br>   for(i=0;i<strlen(str);i++,j--)<br>      {<br>          char temp=str[i];<br>          str[i]=str[j];<br>           str[j]=temp;<br>       }<br>}<br></div>",["Reverses the string","Prints the string in reverse order","Does not reverse string",""],3),
new Question("What is the output of this program?<br><br><div class='codetext'>#include<stdio.h><br>int main()<br>{<br>   int arr[]= {10,20,30,40,50};<br>   char *ptr = (char *)arr;<br>   printf('%d',*((int*)ptr+3));<br>   printf(' %d',*(int*)(ptr+4));<br>   return 0;<br>}<br></div>",["30 40","30 20","40 20","None of the above"],3),
new Question("What are the errors in the following program if any?<br><br><div class='codetext'>#include<stdio.h><br>int main()<br>{<br>     int arr[]={10,20,30,40};<br>     int i;<br>     for(i=0;i<4;i++)<br>    {<br>        printf('%d ',*arr);<br>        arr++;<br>    }<br>    return 0;<br>}<br></div>",["An array can not be initialized in its declaration statement","for loop should be<br>for(i=1;i<=4;i++)","arr being an array, it can not be incremented","No errors"],3),
new Question("What is the correct way of setting the address of a to the pointer ptr in the following code?<br><br><div class='codetext'>int a=3;<br>int *ptr;<br></div>",["*ptr = a;","ptr = a","ptr = &a;","None of the above"],3),
new Question("What is the output of the following code?<br><br><div class='codetext'>int *ptr;<br>int **ptr2;<br>int ***ptr3;<br>int a=3;<br>ptr = &a;<br>ptr2 = &ptr;<br>ptr3=&ptr2;<br>printf('%d %d %d',***ptr3,**ptr2,*ptr);<br></div>",["Syntax error. Too many indirection operators","Some address repeated thrice","3 3 3","None of the above"],3),
new Question("What is a void pointer in C?<br><br><div class='codetext'><br></div>",["A pointer which can point any type of variable","A pointer which can not be dereferenced without typecasting","A pointer to void","Both 1 and 2"],4),
new Question("A NULL pointer is ------<br><br><div class='codetext'><br></div>",["A generic pointer","A pointer pointing to address 0","Both 1 and 2",""],2),
new Question("Memory is allocated at run time in C using ------ and released using -----<br><br><div class='codetext'><br></div>",["malloc and unalloc","malloc and calloc","malloc and free","None of the above"],3),
new Question("What causes memory leakage in a program?<br><br><div class='codetext'><br></div>",["Too much memory allocation","Allocating memory for very large strings","Not releasing the memory which was allocated earlier","Any of the above"],3),
new Question("What does the following code print, if user input is 10?<br><br><div class='codetext'>int *ptr;<br>int a =10;<br>*ptr = &a; <br>printf('%d',*ptr);<br></div>",["10","0","Run time error","None of the above"],3),
new Question("Which of the following declares an array of 5 integer pointers?<br><br><div class='codetext'><br></div>",["int *ptr;","int *ptr[5];","int (*ptr)[5];","None of the above"],2),
new Question("What is the output of the following program?<br><br><div class='codetext'>#include<stdio.h><br>#include<stdlib.h><br>int main()<br>{<br>   char *ptr;<br>   ptr = 'Hello world';<br>   puts(ptr);<br>   free(ptr);<br>   return 0;<br>}<br></div>",["Hello world","Syntax error","Hello world and then program crashes","None of the above"],3),
];
var quiz = new Quiz(questions);populate();