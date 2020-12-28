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
    //console.log("you pressed"+answer);
   // console.log("correct answer is "+this.getQuestionIndex().answer);
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
function answerClicked(answernum) 
{
	var nextbutton = document.getElementById('nextbutton');
        var correctanswer = quiz.getQuestionIndex().answer;
	nextbutton.innerHTML = 'Next Question';
   var aa = document.getElementById("rightOrWrong");
    aa.innerHTML = "You clicked a button. la la la la";
    //console.log("you pressed"+answer);
   // console.log("correct answer is "+this.getQuestionIndex().answer);
    if(answernum==correctanswer) {
        quiz.score++;        
         aa.style="color:green;";
        aa.innerHTML="CORRECT";     
    }else{ 
       
       aa.style="color:red;";
     aa.innerHTML="WRONG";   
    }
     var element2 = document.getElementById('score');
      element2.innerHTML = 'Your Score :'+quiz.score;
  
} 

Quiz.prototype.isEnded = function() {
    return this.totalQuestions==this.questionIndex;
}
 
 
function Question(text,textcode, ans1,ans2,ans3,ans4, answer) {
    this.text = text;
    this.textcode=textcode;
    this.choices = [ans1,ans2,ans3,ans4]
  //  this.choices =new string[] {ans1,ans2,ans3,ans4};
    this.answer = answer; 
}
 
Question.prototype.isCorrectAnswer = function(choice) {
	 
    return this.answer === choice;
};
 


 
 
function populate() {
	
    if(quiz.isEnded()) {
        showScores();
    }
    else { 
        var  correctIndicator= document.getElementById("rightOrWrong");
       
      //  correctIndicator.innerHTML= "                       ";     
        var element = document.getElementById("question");
        var str = quiz.getQuestionIndex().text;
        
       // console.log(str)
        
     //   str = str.replace(/'/g,'"');
        element.innerHTML = str;
        
        var strcode = quiz.getQuestionIndex().textcode;
        var elcode = document.getElementById("questioncode");
        strcode = strcode.replaceAll("NLL","<br>")
        strcode = strcode.replaceAll(" ","&nbsp;");
        if(strcode!='a'&& strcode!="")
          elcode.innerHTML = strcode;
        
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
                str2 = str2.replaceAll(" ","&nbsp;");
            //console.log("choice"+i+"is "+str2);
           }
           element.innerHTML = str2;
            var bt = document.getElementById("choice"+i);
            bt.checked = false;
            var ans = quiz.getQuestionIndex().answer;
             
//bt.addEventListener("click",answerClicked(i+1,ans));
		
            if(str2.length ==0){
					bt.style.display = "none";            
            }else{
					bt.style.display = "inline";            
            }
            correctIndicator.innerHTML = "";
         //   guess("btn" + i, str2);
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
 }
var questions=[
new Question('Complete the line to specify that class B is derived from class A',' class B-------------------- NLL {/*code*/  NLL } NLL  ','class B extends class A{}','class B. class A{}','class B:public A{}','class B:A{} NLL ',3),
new Question('When class B is inherited from class A, which of the following statements is false? NLL  NLL class B:public A{/*code*/}','   ','All public members of A are accessible from object of B','All private members of A are accessible from object of B','All protected members of A are accessible from object of B.','Class B can define its own data members and functions.',2),
new Question('What is the output of the following program?','class A NLL { NLL     int a; NLL }; NLL class B:public A NLL { NLL     int b; NLL public: NLL     void print();  NLL }; NLL void B::print() NLL { NLL     cout&lt;&lt;"a="&lt;&lt;a; NLL     cout&lt;&lt;"b="&lt;&lt;b; NLL }  NLL int main() NLL { NLL      B obj2; NLL      obj2.print(); NLL }','a=10b=12','Compiler error','No output','   ',2),
new Question('What will be the size of obj2 printed by this program assuming that size of int is 4 bytes?','class A NLL { NLL     int a; NLL public: NLL     void seta(int n); NLL      int geta(); NLL }; NLL /*code */ NLL class B:public A NLL { NLL     int b; NLL }; NLL /*code*/ NLL int main() NLL { NLL      B obj2; NLL      cout&lt;&lt;"Size of obj of B is "&lt;&lt;sizeof(obj2); NLL }','4','8','Depends on the size of member functions','   ',2),
new Question('Write the output of the following program.','class Vehicle NLL { NLL   NLL public:  NLL      Vehicle(); NLL     ~Vehicle(); NLL }; NLL Vehicle::Vehicle() NLL { NLL     cout&lt;&lt;"Vehicle constructor "; NLL } NLL Vehicle::~Vehicle() NLL { NLL      cout&lt;&lt;"Vehicle destructor  "; NLL }  NLL class Car:public Vehicle NLL { NLL   NLL public:  NLL     Car(); NLL   ~Car(); NLL }; NLL Car::Car() NLL { NLL     cout&lt;&lt;"Car Constructor "; NLL } NLL Car::~Car() NLL { NLL      cout&lt;&lt;"Car Destructor "; NLL }  NLL int main() NLL { NLL      Car obj; NLL }','Car constructor Car destructor','Vehicle Constructor Car Constructor Car Destructor Vehicle Destructor','Vehicle Constructor Car Constructor Vehicle Destructor Car Destructor','None of the above',2),
new Question('What is the output of the program?','class A NLL { NLL     int a; NLL public: NLL     void seta(int n); NLL      int geta(); NLL   }; NLL void A::seta(int n) NLL { NLL     a = n; NLL } NLL int A::geta() NLL { NLL     return a; NLL } NLL class B:public A NLL { NLL     int b; NLL public: NLL     void  setb(int n); NLL }; NLL void B::setb(int n) NLL { NLL     b = n; NLL } NLL int main() NLL { NLL       A obj1; NLL       obj1.seta(10); NLL       obj1.setb(12); NLL       B obj2;  NLL       obj2.seta(10); NLL       obj2.setb(12);  NLL }','Error because obj2 can not call seta()','Error because obj1 can not call setb() function. ','No output','  ',2),
new Question('What will be the output of this program?','class A NLL { NLL     int a; NLL public: NLL     void setnum(int n); NLL      int getnum(){    return a;} NLL   }; NLL  void A::setnum(int n) NLL {    a = n;  } NLL class B:public A NLL { NLL     int b; NLL public: NLL     void print(); NLL     void  setnum(int a,int b); NLL  };  NLL void B::print() NLL { NLL     cout&lt;&lt;"a="&lt;&lt;getnum(); NLL     cout&lt;&lt;"b="&lt;&lt;b; NLL } NLL void B::setnum(int x,int y) NLL { NLL    a= b =x+y; NLL } NLL int main() NLL { NLL       B obj3; NLL       obj3.setnum(22); NLL       obj3.print(); NLL }','a=0b=22','a=22b=22','Compilation Error','   ',3),
new Question('Which of the following members does the derived class not inherit?','   ','protected data members','It inherits all members','constructors, destructor and assignment operators ','private data members',3),
new Question('What are the errors in the following program?','class A NLL { NLL     int a; NLL public: NLL     void setnum(int n); NLL      int getnum(); NLL   }; NLL  void A::setnum(int n) NLL { NLL     a = n; NLL } NLL int A::getnum() NLL { NLL     return a; NLL } NLL class B:public A NLL { NLL     int b; NLL  }; NLL void printA(A &obj) NLL { NLL     cout&lt;&lt;obj.getnum(); NLL } NLL int main() NLL { NLL       A obj1; NLL       obj1.setnum(10); NLL       printA(obj1); NLL       B obj2; NLL       obj2.setnum(2); NLL       printA(obj2); NLL }','No errors','printA function can not take B object as argument','printA() should be a member function of class A','printA() function can not have a reference parameter',1),
new Question('What happens when you use a  syntax  as shown for defining a derived class?','class B:A NLL { NLL /*code*/ NLL }','Compiler error','private inheritance','public inheritance','None of the above',2),
new Question('Virtual functions in a class are used for','   ','Hiding the data from user','Providing dynamic polymorphism','Both ','   ',2),
new Question('What is the output of this program?',' class polygon NLL { NLL  public: NLL     virtual float getArea(); NLL }; NLL float polygon::getArea() NLL {   NLL     return 0; NLL } NLL class triangle:public polygon NLL { NLL     float base,height; NLL  public: NLL     triangle(float b,float h); NLL     float getArea(); NLL }; NLL triangle::triangle(float b,float h) NLL { NLL     base = b; NLL     height = h; NLL } NLL float triangle::getArea() NLL { NLL     return 0.5*base*height; NLL }  NLL void printArea (polygon& p) NLL { NLL      cout&lt;&lt;"Area of polygon is "&lt;&lt;p.getArea(); NLL } NLL int main() NLL { NLL      polygon p;  NLL      triangle t(10,10); NLL      printArea(p); NLL      printArea (t);  NLL }','Area of polygon is 0Area of polygon is 0','Area of polygon is 0Area of polygon is 50','Compiler error','None of the above',2),
new Question('Find out the errors in the following code segment.','class Instrument NLL {   /*code*/   } NLL class Guitar:public Instrument NLL { /*code*/    } NLL void tune(Instrument i) NLL { /*code*/  } NLL int main() NLL { NLL     Guitar g1; NLL     tune(g1);  NLL }','tune function expects  an  Instrument parameter','No error','tune() function must be defined inside the Instrument class.','  ',2),
new Question('Which of the following statements are invalid in the following code?','class A NLL { NLL };  NLL class B:public A NLL { NLL }; NLL int main() NLL { NLL   A obja; NLL   B objb; NLL   A *aptr = &obja; NLL   B *bptr=&objb;   NLL   obja = objb; NLL   objb = obja; NLL   aptr = bptr; NLL }','objb = obja;','aptr = bptr;','obja = objb;','All of the above',1),
new Question('What does the statement NLL foo(bobj); NLL  NLL  in the code below demonstrate?','class A NLL { NLL /*code*/ NLL }; NLL class B:public A NLL { NLL /*code*/ NLL } NLL void foo(A obj) NLL {/*code*/}  NLL int main() NLL {  NLL   B bobj; NLL   foo(bobj); NLL }','Inheritance','Polymorphism','Object slicing','None of the above',3),
new Question('Which of the following statements is true regarding virtual functions?','   ','A static function can not be virtual','Derived class function which overrides a virtual function must have same signature as base class function','A class can have a virtual destructor, but can not have a  virtual constructor','All of these',4),
new Question('What is the output of the following program?','class Shape NLL {	  NLL  public: NLL      virtual string getName(); NLL }; NLL string Shape::getName() NLL { NLL      return "Shape"; NLL } NLL class Circle:public Shape NLL { NLL public: NLL      string getName(); NLL }; NLL string Circle::getName() NLL { NLL     return "Circle"; NLL } NLL void printShape(Shape s) NLL { NLL      cout&lt;&lt;s.getShapeName(); NLL } NLL int main() NLL { NLL      Circle c; NLL      printShape(c);  NLL }','Shape','Circle','Compiler Error','None of the above',1),
new Question('What is the output of the following program in a 64  bit machine?','class A NLL { NLL   public: NLL    void someFuntion(){} NLL }; NLL class B NLL { NLL   public: NLL     virtual void someOtherFunction(){}; NLL }; NLL int main() NLL { NLL 	A aObject; NLL 	B bObject; NLL 	cout&lt;&lt;sizeof(aObject); NLL 	cout&lt;&lt;" "&lt;&lt;sizeof(bObject); NLL } NLL ','0 0','1 1','1 8','None of the above',3),
new Question('In order to make a function virtual which of the following methods should be used?','   ','declare the function as virtual  inside the class','use virtual keyword in definition of function outside class ','Either of the two','None of the above',1),
new Question('What is the output of the following program?','class A NLL { NLL   public: NLL       ~A(); NLL        A(); NLL }; NLL class B:public A NLL { NLL public: NLL        B(); NLL        ~B(); NLL }; NLL A::A() NLL { NLL     cout&lt;&lt;"A constructor "; NLL } NLL A::~A() NLL { NLL     cout&lt;&lt;"A destructor "; NLL } NLL B::B() NLL { NLL    cout&lt;&lt;"B constructor "; NLL } NLL B::~B() NLL { NLL    cout&lt;&lt;"B destructor "; NLL } NLL int main() NLL { NLL      A *objptr = new B; NLL      delete objptr;	  NLL } NLL ','B constructor B destructor','B constructor A destructor','A constructor B constructor B destructor A destructor','A constructor B constructor A destructor',4),
new Question('What is the output of the following program?',' class A NLL { NLL    public: NLL       virtual   ~A(); NLL       A(); NLL }; NLL class B:public A NLL { NLL public: NLL      B(); NLL     ~B(); NLL }; NLL  NLL A::A() NLL { NLL     cout&lt;&lt;"A constructor"; NLL } NLL A::~A() NLL { NLL       cout&lt;&lt;"A destructor"; NLL } NLL B::B() NLL { NLL      cout&lt;&lt;"B constructor"; NLL } NLL B::~B() NLL { NLL     cout&lt;&lt;"B destructor"; NLL } NLL int main() NLL { NLL      A *objptr = new B; NLL      delete objptr;	  NLL } NLL ','B constructorB destructor','B constructor A destructor','A constructorB constructorB destructorA destructor','A constructorB constructorA destructor',3),
new Question('What happens when a derived class inherits base class using protected access specifier?','   ','All members of base class become protected in derived class','All public and protected members become protected in derived class','All private and protected members of base class become protected in derived class','None of the above',2),
new Question('Are private members of a base class inherited in derived class?','   ','No','Yes, but they are not directly accessible','They are inherited only in public inheritance','   ',2),
new Question('What is the output of the program?','class A NLL { NLL     int n; NLL public: NLL    A(int m):n(m){} NLL }; NLL class B:public A NLL { NLL  public: NLL     void print() NLL     {       cout&lt;&lt;"Hi";    } NLL }; NLL int main() NLL { NLL     B obj; NLL     obj.print(); NLL }','Hi','No output','Compiler error ','   ',3),
new Question('What is the output of the following program?','class Shape NLL { NLL    public: NLL       virtual string name(){return string("shape");} NLL }; NLL class Circle:public Shape NLL {   NLL    public: NLL       string name(){return string("Circle");} NLL }; NLL void printshape(Shapeptr *sptr) NLL  {   NLL     cout&lt;&lt;s-&gt;name(); NLL } NLL int main() NLL { NLL      Shape s; NLL      Circle c; NLL      printshape(&s); NLL      printshape(&c); NLL }','shapeshape','shapeCircle','Compiler error in line printshape(c);','None of the above',2),
new Question('Which of the following statements are true regarding inheritance in C++?','  ','A friend of base class is a friend of derived class','Derived class constructor always calls base class constructor first.','Base class object can access all public and protected members of derived class','Base class constructor is always called after derived class constructor ',2),
new Question('What are the errors in the following code?','class A NLL { NLL     protected: NLL       int m; NLL   /*.....*/ NLL }; NLL class B:public A NLL { NLL     public: NLL       void print(); NLL }; NLL void B::print() NLL { NLL     cout&lt;&lt;m&lt;&lt;"\n"; NLL }','The access specifier for m should be private, not protected','B class has no data members','print() function from B can not access m of A','No Error',4),
new Question('With the code given, which of the following statements are true?','class A NLL { NLL     protected: NLL       int m; NLL     private: NLL      int n; NLL };','m can be accessed by A class and all direct and indirect derived classes and friends','n can be accessed by A class members and friends','Both','   ',3),
new Question('What is the output of the following program?','class A NLL { NLL     public: NLL     void printNum(int a) NLL     { NLL         cout&lt;&lt;"Integer  ="&lt;&lt;a; NLL     } NLL     void printNum(int a,int b) NLL     { NLL         cout&lt;&lt;"Sum of numbers =  "&lt;&lt;a+b; NLL     } NLL }; NLL class B:public A NLL { NLL     public: NLL     void printNum(int a) NLL     { NLL         cout&lt;&lt;"From derived class, Integer  ="&lt;&lt;a; NLL     } NLL      NLL }; NLL int main() NLL { NLL     B obj1; NLL     obj1.printNum(10); NLL     obj1.printNum(10,11); NLL }','Integer = 10 NLL Sum of numbers = 21','Compilation error. ','None of the above','   ',2),
new Question('What is the output of the following program?','class A NLL { NLL     int a; NLL public:  NLL      A(int num); NLL }; NLL A::A(int num):a(num) NLL { } NLL class B:public A NLL { NLL     int b; NLL public:  NLL     B(int num); NLL }; NLL B::B(int num) :A(num),b(num) NLL {  } NLL int main() NLL { NLL       A obj1(5); NLL       B obj2(3);       NLL }','No output',53,'Compiler error','   ',1),
new Question('Base class A has only one parameterized constructor. Derived class B has no constructors. Will the code given here compile? If not, how do you correct it?','class A NLL { NLL    int a1; NLL public: NLL    A(int n1):a1(n1){} NLL }; NLL class B:public A NLL { NLL }; NLL int main() NLL { NLL      B obj2; NLL }','It compiles','Write a constructor for B like this NLL B::B(){    A(0);}','Write a constructor for B like this NLL B::B():A(0){}','Either 2 or 3',3),
new Question('What will be the output if the parameter to print() function is A instead of reference to A in the code below?','class A NLL { NLL public: NLL    virtual void printHello() NLL     { NLL         cout&lt;&lt;"Hello world"; NLL    } NLL }; NLL class B:public A NLL { NLL public: NLL     void printHello() NLL     { NLL        cout&lt;&lt;"Hello computer"; NLL     } NLL }; NLL void print(A &ob) NLL { NLL    ob.printHello(); NLL } NLL int main() NLL { NLL     A obj1; NLL     B obj2; NLL     print(obj1); NLL     print(obj2); NLL }','Hello WorldHello Computer','HelloWorldHelloWorld','Hello World','Compiler error',1)];
var quiz = new Quiz(questions);populate();
