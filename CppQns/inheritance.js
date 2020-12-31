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
    this.choices = [ans1,ans2,ans3,ans4] ;
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
       
        for(var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            var str2 = choices[i];
            str2 = str2.trim();
            
          
            var bt = document.getElementById("choice"+i);
            bt.checked = false;
            if(str2.length ==0){
					bt.style.display = "none";            
            }else{
					bt.style.display = "inline";            
            }
            guess("choice" + i, choices[i]);
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
    var gameOverHTML = "<h2 class='heading'>Result</h2>";
    gameOverHTML += "<h1 class='heading'> Your score: " + quiz.score + "/"+(quiz.questionIndex)+ "</h1>";
    var element = document.getElementById("quiz");
 
    element.innerHTML = gameOverHTML;
};

function showNextQuestion() { 	
   quiz.questionIndex++;
   populate();
 }
 var questions = [ 
new Question('Complete the line to specify that class B is derived from class A',' class B--------------------<br>{/*code*/ <br>}<br> ','class B extends class A','class B. class A','class B:public A','class B derives A',3),
new Question('When class B is inherited from class A, which of the following statements is false?<br><br>class B:public A{/*code*/}','   ','All public members of A are accessible from object of B','All private members of A are accessible from object of B','All protected members of A are accessible from object of B.','Class B can define its own data members and functions.',2),
new Question('What is the output of the following program?','class A<br>{<br>    int a;<br>};<br>class B:public A<br>{<br>    int b;<br>public:<br>    void print(); <br>};<br>void B::print()<br>{<br>    cout&lt;&lt;"a="&lt;&lt;a;<br>    cout&lt;&lt;"b="&lt;&lt;b;<br>} <br>int main()<br>{<br>     B obj2;<br>     obj2.print();<br>}','a=10b=12','Compiler error','No output','   ',2),
new Question('What will be the size of obj2 printed by this program assuming that size of int is 4 bytes?','class A<br>{<br>    int a;<br>public:<br>    void seta(int n);<br>     int geta();<br>};<br>/*code */<br>class B:public A<br>{<br>    int b;<br>};<br>/*code*/<br>int main()<br>{<br>     B obj2;<br>     cout&lt;&lt;"Size of obj of B is "&lt;&lt;sizeof(obj2);<br>}','4','8','Depends on the size of member functions','   ',2),
new Question('Write the output of the following program.','class Vehicle<br>{<br> <br>public: <br>     Vehicle();<br>    ~Vehicle();<br>};<br>Vehicle::Vehicle()<br>{<br>    cout&lt;&lt;"Vehicle constructor ";<br>}<br>Vehicle::~Vehicle()<br>{<br>     cout&lt;&lt;"Vehicle destructor  ";<br>} <br>class Car:public Vehicle<br>{<br> <br>public: <br>    Car();<br>  ~Car();<br>};<br>Car::Car()<br>{<br>    cout&lt;&lt;"Car Constructor ";<br>}<br>Car::~Car()<br>{<br>     cout&lt;&lt;"Car Destructor ";<br>} <br>int main()<br>{<br>     Car obj;<br>}','Car constructor Car destructor','Vehicle Constructor Car Constructor Car Destructor Vehicle Destructor','Vehicle Constructor Car Constructor Vehicle Destructor Car Destructor','None of the above',2),
new Question('What is the output of the program?','class A<br>{<br>    int a;<br>public:<br>    void seta(int n);<br>     int geta();<br>  };<br>void A::seta(int n)<br>{<br>    a = n;<br>}<br>int A::geta()<br>{<br>    return a;<br>}<br>class B:public A<br>{<br>    int b;<br>public:<br>    void  setb(int n);<br>};<br>void B::setb(int n)<br>{<br>    b = n;<br>}<br>int main()<br>{<br>      A obj1;<br>      obj1.seta(10);<br>      obj1.setb(12);<br>      B obj2; <br>      obj2.seta(10);<br>      obj2.setb(12); <br>}','Error because obj2 can not call seta()','Error because obj1 can not call setb() function. ','No output','  ',2),
new Question('What will be the output of this program?','class A<br>{<br>    int a;<br>public:<br>    void setnum(int n);<br>     int getnum(){    return a;}<br>  };<br> void A::setnum(int n)<br>{    a = n;  }<br>class B:public A<br>{<br>    int b;<br>public:<br>    void print();<br>    void  setnum(int a,int b);<br> }; <br>void B::print()<br>{<br>    cout&lt;&lt;"a="&lt;&lt;getnum();<br>    cout&lt;&lt;"b="&lt;&lt;b;<br>}<br>void B::setnum(int x,int y)<br>{<br>   a= b =x+y;<br>}<br>int main()<br>{<br>      B obj3;<br>      obj3.setnum(22);<br>      obj3.print();<br>}','a=0b=22','a=22b=22','Compilation Error','   ',3),
new Question('Which of the following members does the derived class not inherit?','   ','protected data members','It inherits all members','constructors, destructor and assignment operators ','private data members',3),
new Question('What are the errors in the following program?','class A<br>{<br>    int a;<br>public:<br>    void setnum(int n);<br>     int getnum();<br>  };<br> void A::setnum(int n)<br>{<br>    a = n;<br>}<br>int A::getnum()<br>{<br>    return a;<br>}<br>class B:public A<br>{<br>    int b;<br> };<br>void printA(A &obj)<br>{<br>    cout&lt;&lt;obj.getnum();<br>}<br>int main()<br>{<br>      A obj1;<br>      obj1.setnum(10);<br>      printA(obj1);<br>      B obj2;<br>      obj2.setnum(2);<br>      printA(obj2);<br>}','No errors','printA function can not take B object as argument','printA() should be a member function of class A','printA() function can not have a reference parameter',1),
new Question('What happens when you use a  syntax  as shown for defining a derived class?','class B:A<br>{<br>/*code*/<br>}','Compiler error','private inheritance','public inheritance','None of the above',2),
new Question('Virtual functions in a class are used for','   ','Hiding the data from user','Providing dynamic polymorphism','Both ','   ',2),
new Question('What is the output of this program?',' class polygon<br>{<br> public:<br>    virtual float getArea();<br>};<br>float polygon::getArea()<br>{  <br>    return 0;<br>}<br>class triangle:public polygon<br>{<br>    float base,height;<br> public:<br>    triangle(float b,float h);<br>    float getArea();<br>};<br>triangle::triangle(float b,float h)<br>{<br>    base = b;<br>    height = h;<br>}<br>float triangle::getArea()<br>{<br>    return 0.5*base*height;<br>} <br>void printArea (polygon& p)<br>{<br>     cout&lt;&lt;"Area of polygon is "&lt;&lt;p.getArea();<br>}<br>int main()<br>{<br>     polygon p; <br>     triangle t(10,10);<br>     printArea(p);<br>     printArea (t); <br>}','Area of polygon is 0Area of polygon is 0','Area of polygon is 0Area of polygon is 50','Compiler error','None of the above',2),
new Question('Find out the errors in the following code segment.','class Instrument<br>{   /*code*/   }<br>class Guitar:public Instrument<br>{ /*code*/    }<br>void tune(Instrument i)<br>{ /*code*/  }<br>int main()<br>{<br>    Guitar g1;<br>    tune(g1); <br>}','tune function expects  an  Instrument parameter','No error','tune() function must be defined inside the Instrument class.','  ',2),
new Question('Which of the following statements are invalid in the following code?','class A<br>{<br>}; <br>class B:public A<br>{<br>};<br>int main()<br>{<br>  A obja;<br>  B objb;<br>  A *aptr = &obja;<br>  B *bptr=&objb;  <br>  obja = objb;<br>  objb = obja;<br>  aptr = bptr;<br>}','objb = obja;','aptr = bptr;','obja = objb;','All of the above',1),
new Question('What does the statement<br>foo(bobj);<br><br> in the code below demonstrate?','class A<br>{<br>/*code*/<br>};<br>class B:public A<br>{<br>/*code*/<br>}<br>void foo(A obj)<br>{/*code*/} <br>int main()<br>{ <br>  B bobj;<br>  foo(bobj);<br>}','Inheritance','Polymorphism','Object slicing','None of the above',3),
new Question('Which of the following statements is true regarding virtual functions?','   ','A static function can not be virtual','Derived class function which overrides a virtual function must have same signature as base class function','A class can have a virtual destructor, but can not have a  virtual constructor','All of these',4),
new Question('What is the output of the following program?','class Shape<br>{	 <br> public:<br>     virtual string getName();<br>};<br>string Shape::getName()<br>{<br>     return "Shape";<br>}<br>class Circle:public Shape<br>{<br>public:<br>     string getName();<br>};<br>string Circle::getName()<br>{<br>    return "Circle";<br>}<br>void printShape(Shape s)<br>{<br>     cout&lt;&lt;s.getShapeName();<br>}<br>int main()<br>{<br>     Circle c;<br>     printShape(c); <br>}','Shape','Circle','Compiler Error','None of the above',1),
new Question('What is the output of the following program in a 64  bit machine?','class A<br>{<br>  public:<br>   void someFuntion(){}<br>};<br>class B<br>{<br>  public:<br>    virtual void someOtherFunction(){};<br>};<br>int main()<br>{<br>	A aObject;<br>	B bObject;<br>	cout&lt;&lt;sizeof(aObject);<br>	cout&lt;&lt;" "&lt;&lt;sizeof(bObject);<br>}<br>','0 0','1 1','1 8','None of the above',3),
new Question('In order to make a function virtual which of the following methods should be used?','   ','declare the function as virtual  inside the class','use virtual keyword in definition of function outside class ','Either of the two','None of the above',1),
new Question('What is the output of the following program?','class A<br>{<br>  public:<br>      ~A();<br>       A();<br>};<br>class B:public A<br>{<br>public:<br>       B();<br>       ~B();<br>};<br>A::A()<br>{<br>    cout&lt;&lt;"A constructor ";<br>}<br>A::~A()<br>{<br>    cout&lt;&lt;"A destructor ";<br>}<br>B::B()<br>{<br>   cout&lt;&lt;"B constructor ";<br>}<br>B::~B()<br>{<br>   cout&lt;&lt;"B destructor ";<br>}<br>int main()<br>{<br>     A *objptr = new B;<br>     delete objptr;	 <br>}<br>','B constructor B destructor','B constructor A destructor','A constructor B constructor B destructor A destructor','A constructor B constructor A destructor',4),
new Question('What is the output of the following program?',' class A<br>{<br>   public:<br>      virtual   ~A();<br>      A();<br>};<br>class B:public A<br>{<br>public:<br>     B();<br>    ~B();<br>};<br><br>A::A()<br>{<br>    cout&lt;&lt;"A constructor";<br>}<br>A::~A()<br>{<br>      cout&lt;&lt;"A destructor";<br>}<br>B::B()<br>{<br>     cout&lt;&lt;"B constructor";<br>}<br>B::~B()<br>{<br>    cout&lt;&lt;"B destructor";<br>}<br>int main()<br>{<br>     A *objptr = new B;<br>     delete objptr;	 <br>}<br>','B constructorB destructor','B constructor A destructor','A constructorB constructorB destructorA destructor','A constructorB constructorA destructor',3),
new Question('What happens when a derived class inherits base class using protected access specifier?','   ','All members of base class become protected in derived class','All public and protected members become protected in derived class','All private and protected members of base class become protected in derived class','None of the above',2),
new Question('Are private members of a base class inherited in derived class?','   ','No','Yes, but they are not directly accessible','They are inherited only in public inheritance','   ',2),
new Question('What is the output of the program?','class A<br>{<br>    int n;<br>public:<br>   A(int m):n(m){}<br>};<br>class B:public A<br>{<br> public:<br>    void print()<br>    {       cout&lt;&lt;"Hi";    }<br>};<br>int main()<br>{<br>    B obj;<br>    obj.print();<br>}','Hi','No output','Compiler error ','   ',3),
new Question('What is the output of the following program?','class Shape<br>{<br>   public:<br>      virtual string name(){return string("shape");}<br>};<br>class Circle:public Shape<br>{  <br>   public:<br>      string name(){return string("Circle");}<br>};<br>void printshape(Shapeptr *sptr)<br> {  <br>    cout&lt;&lt;s-&gt;name();<br>}<br>int main()<br>{<br>     Shape s;<br>     Circle c;<br>     printshape(&s);<br>     printshape(&c);<br>}','shapeshape','shapeCircle','Compiler error in line printshape(c);','None of the above',2),
new Question('Which of the following statements are true regarding inheritance in C++?','  ','A friend of base class is a friend of derived class','Derived class constructor always calls base class constructor first.','Base class object can access all public and protected members of derived class','Base class constructor is always called after derived class constructor ',2),
new Question('What are the errors in the following code?','class A<br>{<br>    protected:<br>      int m;<br>  /*.....*/<br>};<br>class B:public A<br>{<br>    public:<br>      void print();<br>};<br>void B::print()<br>{<br>    cout&lt;&lt;m&lt;&lt;endl;<br>}','The access specifier for m should be private, not protected','B class has no data members','print() function from B can not access m of A','No Error',4),
new Question('With the code given, which of the following statements are true?','class A<br>{<br>    protected:<br>      int m;<br>    private:<br>     int n;<br>};','m can be accessed by A class and all direct and indirect derived classes and friends','n can be accessed by A class members and friends','Both','   ',3),
new Question('What is the output of the following program?','class A<br>{<br>    public:<br>    void printNum(int a)<br>    {<br>        cout&lt;&lt;"Integer  ="&lt;&lt;a;<br>    }<br>    void printNum(int a,int b)<br>    {<br>        cout&lt;&lt;"Sum of numbers =  "&lt;&lt;a+b;<br>    }<br>};<br>class B:public A<br>{<br>    public:<br>    void printNum(int a)<br>    {<br>        cout&lt;&lt;"From derived class, Integer  ="&lt;&lt;a;<br>    }<br>    <br>};<br>int main()<br>{<br>    B obj1;<br>    obj1.printNum(10);<br>    obj1.printNum(10,11);<br>}','Integer = 10<br>Sum of numbers = 21','Compilation error. ','None of the above','   ',2),
new Question('What is the output of the following program?','class A<br>{<br>    int a;<br>public: <br>     A(int num);<br>};<br>A::A(int num):a(num)<br>{ }<br>class B:public A<br>{<br>    int b;<br>public: <br>    B(int num);<br>};<br>B::B(int num) :A(num),b(num)<br>{  }<br>int main()<br>{<br>      A obj1(5);<br>      B obj2(3);      <br>}','No output',53,'Compiler error','   ',1),
new Question('Base class A has only one parameterized constructor. Derived class B has no constructors. Will the code given here compile? If not, how do you correct it?','class A<br>{<br>   int a1;<br>public:<br>   A(int n1):a1(n1){}<br>};<br>class B:public A<br>{<br>};<br>int main()<br>{<br>     B obj2;<br>}','It compiles','Write a constructor for B like this<br>B::B(){    A(0);}','Write a constructor for B like this<br>B::B():A(0){}','Either 2 or 3',3),
new Question('What will be the output if the parameter to print() function is <i>A ob</i> instead of <i>A &amp;ob</i> in the code below?','class A<br>{<br>public:<br>   virtual void printHello()<br>    {<br>        cout&lt;&lt;"Hello world";<br>   }<br>};<br>class B:public A<br>{<br>public:<br>    void printHello()<br>    {<br>       cout&lt;&lt;"Hello computer";<br>    }<br>};<br>void print(A &ob)<br>{<br>   ob.printHello();<br>}<br>int main()<br>{<br>    A obj1;<br>    B obj2;<br>    print(obj1);<br>    print(obj2);<br>}','Hello WorldHello Computer','HelloWorldHelloWorld','Hello World','Compiler error',2)];
var quiz = new Quiz(questions);populate();
