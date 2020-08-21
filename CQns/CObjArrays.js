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
 }var questions = [new Question("Which of these is correct way of declarating a function which prints an array  n integers?<br><br><div class='codetext'><br></div>",["void print_array(int a[n]);","void print_array(int a);","void print_array(int *a,int n);","None of the above"],3),
new Question("What are the types of a1 and a2?<br><br><div class='codetext'>typedef int ARR[10];<br>ARR a1,a2;<br></div>",["The typedef statement is invalid","a1 and a2 are integer arrays with 10 elements","a1 and a2 are integers","None of the above"],2),
new Question("Write output of the code.<br><br><div class='codetext'>int arr[10];<br>arr = {1,2,3,5};<br>printf('%d',a[4]);<br></div>",["5","0","Garbage value","Syntax error in line 2"],4),
new Question("What is the output of this code?<br><br><div class='codetext'>char arr[10]='Hello';<br>printf('%d %d',sizeof(arr),strlen(arr));<br></div>",["5 5","10 5","10 6","None of the above"],2),
new Question("What is output of following code<br><br><div class='codetext'>int main()<br>{<br>     int a[5]={2,3};<br>     printf(”%d%d%d”,a[2],a[3],a[4]);<br>}<br></div>",["0 0 0","2 3 3","Garbage values","3 2 2"],1),
new Question("Consider the following declaration of a two dimensional array in C:<br>         char a[100][100];<br>Assuming that the main memory is byte addressable and that the array is stored starting from memory address 0, the address of a[40][50] is<br><br><div class='codetext'><br></div>",["4040","4050","5040","5050"],2),
new Question("If a two dimensional array of integer is sent as paramter to function, it gets implicitly converted to<br><br><div class='codetext'><br></div>",[" A pointer to pointer to integer","A pointer to integer","A pointer to an array of integers","None of these"],3),
new Question("Which of these experssions will  produce compile time errors if used as left hand side of assignment statement in C program if  A and B are declared as below?<br><br><div class='codetext'>int *A [10], B[10][10];<br></div>",["A[2]","A[2][3]","B[2]","B[2][3]"],3),
new Question("What is output of this code?<br><br><br><div class='codetext'>int arr[3][5] = {1,2,3,4,5,6,7,8,9,10,11,12,13,14,15};<br>int (*ptr)[5];<br>ptr = arr;<br>printf('%d',(*++ptr)[1]);<br></div>",["2","3","7",""],3),
new Question("Why does this code produce error?<br><br><div class='codetext'>void print_array(int **arr,int r,int c)<br>{<br>  //code to  print array<br>}<br>int main()<br>{<br>   int arr[2][2]={1,2,3,4};<br>   print_array(arr,2,2);<br>}<br></div>",["It produces no error","2D array parameter to function is not converted to   pointer to pointer.","Array initialization should be<br>int arr[2][2] = {{1,2},{3,4}};",""],2),
new Question("How do you find the number of elements in an array arr?<br><br><div class='codetext'><br></div>",["sizeof(arr)","sizeof(arr)*4","sizeof(arr)/sizeof(arr[0])","None of the above"],3),
new Question("What is the output of the following code?<br><br><div class='codetext'>int a[5] = {1,2,3,4,5};<br>int *ptr = (int*)(&a+1);<br>printf('%d %d', *(a+1), *(ptr-1));<br></div>",["2 Garbage value","Run time error","2 5",""],3),
new Question("What will be output of following program?<br><br><div class='codetext'>int main()<br>{<br>char arr[10];<br>arr = 'world';<br>printf('%s',arr);<br>return 0;<br>}<br> <br></div>",["world ","w","nothing","Compilation error"],4),
new Question("What is the output of the code?<br><br><div class='codetext'>int arr[5]={[3]=12};<br>int i;<br>for(i=0;i<10;i++)<br>   printf('%d ',arr[i]);<br></div>",["Syntax error in line 1","12 0 0 0 0","3 12 0 0 0","0 0 0 12 0"],4),
new Question("What is the correct way of declaring an int arr with ten elements whose first element is 100 and all the rest are 0<br><br><div class='codetext'><br></div>",["int arr[10]={100,0,0,0,0,0,0,0,0,0};","int arr[10]=100","int arr[10]={100};","Both 1 and 3"],4),
new Question("Which of the following is the right method of initializing a char array?<br><br><div class='codetext'><br></div>",["char str[]='Hello';","char str[5]='Hello';","char str[6]='Hello';","None of the above"],1),
new Question("What is the correct way of initializing a 2 dimensional array of 2 rows and 2 columns?<br><br><div class='codetext'><br></div>",["int arr[2,2]={{1,2},{3,4}};","int arr(2)(2)={1,2,3,4};","int arr[2][2]={1,2,3,4};","None of the above"],3),
new Question("What is the output of the following code?<br><br><div class='codetext'>float arr[3]={1.1,2.2,3.3};<br>float *ptr = arr;<br>ptr +=3;<br>printf('%f',*ptr);<br></div>",["2.2","1.1","Garbage value","None of the above"],3),
new Question("In which case does this code fail to return largest of array?<br><br><div class='codetext'>int lar = 0;<br>for(i=0;i<n;i++)<br>   if(a[i]>lar)<br>     lar = a[i];<br>printf('The largest element is %d\n',lar);<br></div>",["It is correct","When the array is float","When all elements are negative","None of the above"],3),
new Question("What is the output of the following program?<br><br><div class='codetext'>int i;<br>int arr[4]={11,0x11,011,0};<br>for(i=0;i<4;i++)<br>   printf('%d ',a[i];<br></div>",["11 11 11 0","11 17 9 0","11 11 11 11","None of the above"],2),
new Question("Which of the following statements about array arr is correct?<br><br><div class='codetext'>int arr[10];<br></div>",["arr can store 9 integers","The first element of array arr is arr[1]","The last element of array arr is arr[9]","The number of elements in arr can be found using strlen(arr)"],3),
new Question("What is the output of the following code?<br><br><div class='codetext'>char str1[]='Hello';<br>char str2[]='world';<br>str1 = str2;<br>printf('%s',str1);<br></div>",["Hello","world","Syntax error","None of the above"],3),
new Question("What does the following code print?<br><br><div class='codetext'>short arr[]={11,22,33,44};<br>short *ptr = arr;<br>printf('%d ',arr[1]);<br>printf('%d ',*(arr+1)); <br>printf('%d ',*(++ptr));<br></div>",["Error because short is not a data type","22 22 22","Error because ptr can not be incremented.","None of the above"],2),
new Question("What is the output of this code if the starting address of array is 1000 and size of an integer is 4 bytes?<br><br><div class='codetext'>int arr[3][2] ={1,2,3,4,5,6};<br>printf('%u %u %u',arr[1],arr[2],&arr[2][1]);<br></div>",["1004 1008 1010","1008 1016 1020","Syntax error because we have not provided second subscript for array","None of the above"],2),
new Question("When an array is sent as an argument to a function, ------ gets passed to function<br><br><div class='codetext'><br></div>",["Size of array","Address of last element of array","Base address of array","None of the above"],3),
new Question("What is the output of this code?<br><br><div class='codetext'>int arr[4];<br>for(i=1;i<=4;i++)<br>   arr[i]=i*i;<br>for(i=0;i<4;i++)<br>   printf('%d ',arr[i]);<br></div>",["1 4 9 16","Undefined behavior","Syntax error","None of the above"],2),
new Question("What does the following statement do?<br><br><div class='codetext'>int arr[10] = {[3]=100};<br></div>",["Initializes first two elements to 3 and 100","Gives a syntax error","Initializes arr[3] to 100","None of the above"],3),
new Question("Complete the following code. print() function must print all the elements of a two dimensional nX3  array.<br><br><div class='codetext'>void print(int (*ptr)[3],int n)<br>{<br>   int i,j;<br>   for(i = 0;i<n;i++,ptr++)<br>     for(j=0;j<3;j++)<br>         -------------<br>}<br></div>",["printf('%d',*ptr);","printf('%d',ptr[i][j]);","printf('%d',(*ptr)[j]);","Both 2 and 3"],3),
new Question("Which of the following codes finds the product of all n elements of an array?<br><br><div class='codetext'><br></div>",["for(i=0,product=0;i<n;i++)<br>    product*=arr[i];","for(i=0,product=1;i<n;i++)<br>    product*=arr[i];"," i=0;product=1;<br>while(i<5)<br>    product*=arr[i++];","Both 2 and 3"],4),
];
var quiz = new Quiz(questions);populate();