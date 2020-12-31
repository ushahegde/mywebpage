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
      element2.innerHTML = 'Score :'+quiz.score;  
}
 
Quiz.prototype.isEnded = function() {
    return this.totalQuestions==this.questionIndex;
}
 
function Question(text,textcode, ans1,ans2,ans3,ans4, answer) {
    this.text = text;
    this.textcode=textcode;
    this.choices = [ans1,ans2,ans3,ans4]
  //  this.choices =new string[] {ans1,ans2,ans3,ans4};
    this.answer = this.choices[answer-1]; 
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
       // console.log(str)       
     //   str = str.replace(/'/g,'"');
        element.innerHTML = str;        
        var strcode = quiz.getQuestionIndex().textcode;
        var elcode = document.getElementById("questioncode");
       
       strcode= strcode.trim();
        if(strcode!=""){
          elcode.style.display='block';
        elcode.innerHTML = "<pre>"+strcode+"</pre>";  
        }
        else{  
          elcode.style.display='none'; 	       
        }
        
        var nextButton = document.getElementById('nextbutton');
        nextButton.innerHTML = "Skip";
        
       
        var choices = quiz.getQuestionIndex().choices;
       
     //   console.log(choices[1]);
        for(var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
           
            var str2 = choices[i];
            str2 = str2.trim();
            if(str2.length!=0){
 		str2= str2.replaceAll("NLL","<br>");
            //console.log("choice"+i+"is "+str2);
           }
           element.innerHTML = str2;
            var bt = document.getElementById("choice"+i);
            bt.checked = false;
            if(str2.length ==0){
					bt.style.display = "none";            
            }else{
					bt.style.display = "inline";            
            }
            guess("choice" + i, str2);
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
    gameOverHTML += "<h2 > Your score: " + quiz.score + "/"+(quiz.questionIndex)+ "</h2>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
};

function showNextQuestion() { 	
   quiz.questionIndex++;
   populate();
 }
 var questions = [ 
new Question('What is the output of the program?',
'class  A<br> {<br>   int a;<br> public:<br>   A(); <br> };<br> A::A()<br> {<br>    cout&lt;&lt;"Constructor ";<br> }<br> int main()<br> {<br>      A obj1;      <br>      A  obj2;<br> }'
,'No output','Constructor','Constructor Constructor','   ',3),
new Question('What is the output of the following program?',
'class  A<br> {<br>   int a;<br> public:<br>   A(int n);<br>   void print_a(); <br> };<br> A::A(int n)<br> {<br>    a = n;    cout&lt;&lt;"Constructor ";<br> }<br> void A::print_a() <br>  {    <br>      cout&lt;&lt;a;<br>   }<br> int main()<br> {<br>      A obj1;     <br>      obj1.print_a();     <br> }',
'Constructor 88 ','88','Error because the class has no default constructor','   ',3),
new Question('What is the error in this program?','class  A<br> {<br>   int a;<br> public:<br>   void A(int n);<br>   void print_a(); <br> };<br> <br> void A::A(int n)<br> {<br>     a = n; <br>     cout&lt;&lt;"Constructor";<br> }<br> void A::print_a() <br>  {    <br>      cout&lt;&lt;a;<br>   }<br> int main()<br> {<br>      A obj1(12);  <br>      obj1.print_a();     <br> }','The statement should be<br> A obj1 = A(12);','Constructor can not have a return type','No error','   ',2),
new Question('What is the output of the following program?','class  A<br> {<br>   int a;<br> public:<br>   A(int n);<br>   A();<br>   void print_a(); <br> };<br> A::A():a(0)<br> {<br>     cout&lt;&lt;"Default Constructor";<br> }<br> A::A(int n):a(n)<br> {<br>    cout&lt;&lt;"Parameterized Constructor";<br> }<br> void A::print_a() <br>  {      cout&lt;&lt;a;  }<br> int main()<br> {<br>      A obj1(12); <br>      A obj2;        <br>      A obj3=5;   <br>      obj1.print_a();     <br> }','Compiler error','12','Parameterized Constructor<br> Default Constructor<br> Parameterized Constructor<br> 12','   ',3),
new Question('Which constructor does the  line marked as line 1 use?','class  A<br> {<br>   int a;<br> public:<br>   A(int n);<br>   A();<br> };<br> A::A()<br> {<br>     this-&gt;a =0;<br> }<br> A::A(int n):a(n)  <br> {<br> } <br> int main()<br> {<br>      A obj1(12);  <br>      A obj2;<br>      A obj3=obj1;/*line 1*/<br>      obj1.print_a();     <br> }','Default constructor','Copy Constructor','Parameterized constructor','   ',2),
new Question('What will be the output of this program?','class  A<br> {<br>   int a;<br> public:<br>   A(int n); <br>   void print_a(); <br> }; <br> A::A(int n):a(n)  <br> {<br>    cout&lt;&lt;"Constructor";<br> }<br> void A::print_a() <br>  {         cout&lt;&lt;a;  }<br> int main()<br> {<br>      A obj1(12);  <br>      A objarr[10];<br>      obj1.print_a();     <br> }','Constructor12','12','1210','Compiler error',4),
new Question('The following program gives the output as <br> Constructor1212DestructorDestructor<br> <br> Why is there an extra destructor?','class  A<br> {<br>   int a;<br> public:<br>   A(int n);<br>   ~A();<br>   void print_a(); <br> }; <br> A::~A()<br> {<br>     cout&lt;&lt;"Destructor";<br> }<br> A::A(int n):a(n)  <br> {<br>    cout&lt;&lt;"Constructor";<br> }<br> void A::print_a() <br>  {<br>          cout&lt;&lt;a;<br>   }<br> void print_num(A obj)<br> {<br>    obj.print_a();<br> }<br> int main()<br> {<br>      A obj1(12);    <br>      print_num(obj1);<br> }','There is an extra destructor because there is a bug in the compiler','obj1 is constructed twice','print_num creates another object using copy constructor','None of the above',3),
new Question('What will be the output of the following program?','class  A<br> {<br>   int n;<br>   int *arr;<br> public:<br>   A(int n);<br>   ~A(); <br>  }; <br> A::~A()<br> {<br>     delete []arr;<br> }<br> A::A(int n):n(n)  <br> {<br>    arr = new int[n]; <br>   for(int i=0;i&lt;n;i++)   <br>        arr[i]=i*i;<br> }  <br> int main()<br> {<br>      A obj1(4);   <br>      if(true) <br>         A obj2(obj1);     <br>      A obj3 = obj1;    <br> }','No output','0','Program crashes because of shallow copy','None of the above',3),
new Question('What is the error in the copy constructor in the following program?','class  A<br> {<br>   int n;<br>   int *arr;<br> public:<br>   A(int n);<br>   A(A obj);/*copy constructor*/<br>   ~A();  <br> };<br> A::A(A orig_obj)<br> {<br>    cout&lt;&lt;"Copy constructor";<br> }<br> /*rest of the code*/','No Error','Copy constructor can not be user defined','Parameter to copy constructor should be reference parameter','   ',3),
new Question('Which of these is the right copy constructor for a class with two data members viz int n and integer array - int*arr?','class A<br> {<br>    int n;<br>    int *arr;<br> public:<br> /** copy constructor decln here*/<br> };<br> ','A::A(A obj1)<br> {<br>     n = obj1.n;<br>     arr = obj1.arr;<br> }<br> ',
'A::A(const A &obj)<br> {<br>     n = obj.n;<br>     arr = obj.arr;<br> }',
'A::A(const A &obj)<br> {<br>    this-&gt;n =  obj.n;   arr = new int[n];   <br>    for(int i=0;i&lt;n;i++)      arr[i] =  obj.arr[i];   <br> }','   ',3),
new Question('What is the difference between copy constructor and assignment operator?','   ','Copy constructor is used for new objects. Assignment operator is used for existing objects.','You can write your own copy ctor but not assignment operator','There are no differences','   ',1),
new Question('What is the output of this program?','class  A<br> {<br>   int m;<br> public:<br>   A(int n);<br>   void print_m();<br> }; <br> A::A(int n=0):m(n)  <br> {<br>    cout&lt;&lt;"Constructor ";<br> }<br> void A::print_m()<br> {<br>    cout&lt;&lt;m;<br> }      <br> int main()<br> {<br>      A obj1(8);   <br>      A objarr[5];<br> }','Error. No default constructor','Error.you can not have array of objects','Constructor','Constructor Constructor Constructor Constructor Constructor Constructor',4),
new Question('What is the output of the program?','class  A<br> {<br>   int m;<br> public:<br>   A(int n);<br>   void print_m();<br> };<br> <br> A::A(int n):m(n)  <br> {<br>    cout&lt;&lt;"Constructor";<br>    cout&lt;&lt;m&lt;&lt;endl;<br> }<br> void A::print_m()<br> {<br>    cout&lt;&lt;m;<br> }     <br> int main()<br> {<br>      A objarr[3]={A(1),A(8),A(3)};<br> }','Error because array needs default constructor.','Error because object array can not be initialized','Constructor1<br> Constructor8<br> Constructor3','   ',3),
new Question('What is the output of the program?','class A<br> {<br>    int num;<br>  public:<br>     A(int n) ;    <br> }; <br>  A::A(int n):num(n)  <br> {     <br>     cout&lt;&lt;"Constructor";<br> } <br> int main()<br> { <br>       A obj3 (0);<br>       obj3 = 25;<br> }','Constructor','compiler error','ConstructorConstructor','   ',3),
new Question('What is the output of the program?','class A<br> {<br>    int num;<br>  public:<br>    explicit A(int n) ;<br>     void print() const;     <br>     int getNum() const;     <br> };<br> int A::getNum() const<br> {<br>    return num;<br> }<br> A::A(int n):num(n)  { } <br> int main()<br> { <br>       A obj3 ;<br>        obj3 = 25;<br>       cout&lt;&lt;obj3.getNum();<br> }','25','No output','Compiler error. ','   ',3),
new Question('How do you call constructor of a class A?','   ','A()','Constructor is called implicitly when you create an object','new A()','   ',2),
new Question('Which of the following statements regarding constructors and destructors is false?','   ','Constructor can be overloaded','Destructor can be overloaded','Name of constructor is same as class name','Name of destructor function is ~ followed by class name',2),
new Question('Which of these member functions are automatically provided by  compiler for a class in C++?','   ','Default Constructor and Destructor','Assignment operator','Copy Constructor','All of these ',4),
new Question('Which of the following is the destructor of a class FOO?','   ','FOO::FOO(){/*code*/}','FOO::FOO~(){/*code*/}','FOO::~FOO(){/*code*/}','None of the above',3),
new Question('Which of these statements about shallow copy and deep copy is true?','   ','A compiler provided copy constructor uses deep  copy','Shallow copy is when data are replicated to new object. So here pointers of old object and new object point to same locations','Shallow copy allocates memory for newly copied objects and then copies the values','None of the above',2),
new Question('Which of the following is the default constructor of a class FOO?','   ','FOO(FOO&other){/*code*/}<br> ','FOO(int num){/*code*/}','FOO(int num=10,int num2=10)<br> {/*code*/}','None of the above',3),
new Question('What is the return type of constructor of a class?','   ','int','void','Class itself','nothing',4),
new Question('How many times the constructor of class A called in the code below?','class A<br> {<br>    public:<br>       A() {/*code*/}<br> };<br> void printHello()<br> {<br>    A obj1;<br>    cout&lt;&lt;"Hello"&lt;&lt;"\n";<br> }<br> int main()<br> {<br>    A obj1;<br>    printHello();<br>    printHello();<br> }','twice','thrice','Compilation error in the program.','None of the above',2),
new Question('Which of the following is the declaration of copy ctor for class A?','   ','A(A obj);','A(A*ptrobj)','A(A&obj);','Any of the above',3),
new Question('In which of these situations, copy constructor of a class is called?','   ','When an object is initialized with another object.','When an object is sent as a value parameter to a function','When an object is returned from a function as a value','All of the above',4),
new Question('What is the output of the following program?','class A<br> {<br>     int n;<br>  public:<br>     A(int m);<br>     void print();<br> };<br> A::A(int m):n(m){ }<br> void A::print()<br> {    cout&lt;&lt;n;    }<br> int main()<br> {<br>      A objarray[3]={11,22,3};<br>      objarray[0].print();<br> }<br> ','Compiler error because there is no default constructor for creating array','Compiler error because you can not have an array of objects','11','None of the above',3),
new Question('Which of these statements calls copy construtor of a class?','   ','A obj1 = obj2;','void foo(A obj1)<br> {<br> ---------<br> }','A bar()<br> {<br> ----<br> }','All of these',4),
new Question('What is the output of the following program?','class A<br> {<br> public:<br>    A()<br>    {<br>       cout&lt;&lt;"Constructor";<br>    }<br> };<br> int main()<br> {<br>       A *ptr;<br> }','No output','Constructor','Compiler error','   ',1),
new Question('What is the output of this program?','class A<br> {<br> };<br> class B<br> {<br>  public:<br>     B(float n)<br>    {<br>           cout&lt;&lt;n;<br>     }<br> };<br> int main()<br> {<br>     A obj;<br>     B obj2;<br>     return 0;<br> }','No output','Error in line A obj;','Error in line B obj2;','   ',3),
new Question('What is the output of this program?','class  A<br> {<br>   int m;<br> <br>   ~A(){ cout&lt;&lt;"destructor";}<br> public:<br>   A()<br>   {<br>       cout&lt;&lt;"Constructor";<br>   }<br> };<br> int main()<br> {<br>     A *ptr=new A;<br>     cout&lt;&lt;"Hello world";<br> }','Compilation error. ','Constructor Hello world destructor','Constructor Hello world','   ',3),
new Question('When must a constructor of a class use initialization list?','   ','When it has a const data member','When it has a reference member','When it has a base class/member object with no default constructor','Any of the above',4),
new Question('Which of the following statements calls copy constructor?','   ','A a; A a2=a;','A a; A a2; a2=a;','A a; A a2(a);','1 and 3',4),
new Question('Which of the following statements about destructors is true?','   ','For static objects destructor is called during program termination','For dynamic objects created using new, destructor is called  when delete is called','For local objects, destructor is called when the block in which object is created exits','All of the above',4),
new Question('What is the output of the following program?','class A<br> {<br>      string str;<br>  public:<br>      A(string s):str(s){}<br>     ~A();<br> };<br> A::~A()<br> { <br>    cout&lt;&lt;"Destructor of "&lt;&lt;str&lt;&lt;endl;<br> }<br> void some_function(A obj1)<br> {<br>      <br> }<br> int main()<br> {<br>     A s1(string("one"));<br>     string st1,st2;<br>     st1="two";<br>     st2="three";<br>     some_function(s1);<br>     A s2(st1),s3(st2);<br>     return 0;<br> }','Destructor of one<br> Destructor of two<br> Destructor of three','Destructor of three<br> Destructor of two<br> Destructor of one','Destructor of two<br> Destructor of three<br> Destructor of one','Destructor of one<br> Destructor of three<br> Destructor of two<br> Destructor of one',4),
new Question('Can a class have private constructor? Can objects be created from such a class?','  ','Yes','No','   ',' ',1),
new Question('What is the output of the following program?','class A<br> {<br>     int n;<br> public:<br>    A(int m){ n = m;}<br>    void print() { cout&lt;&lt;"n is "&lt;&lt;n;}<br> };<br> int main()<br> {<br>      A obj1;<br>      obj1.print();<br> }','0','Garbage value','Compiler Error','   ',3),
new Question('Which is the correct way to use member initializer list in the constructor below?','class B<br> {<br>      float num;<br> public:<br>    B(float a);<br> };<br> B::B(float a)<br> {<br>      num = a;<br> }','B::B(float a):num(a);','B::B(float a){num(a);}','B::B(float a):num(a){}','   ',3),
 ];
var quiz = new Quiz(questions);populate();
