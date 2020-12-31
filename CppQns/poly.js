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
    this.choices = [ans1,ans2,ans3,ans4];
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
new Question('What does the following declaration indicate?','class C:public A,public B<br>{/*********/}','class C is an inherited class of A and A is inherited class of B','class C is inherited from both class A and class B','Syntax error','   ',2),
new Question('Why is virtual inheritance used?','   ','To achieve runtime polymorphism','To achieve dynamic binding','To avoid the occurance of dreaded diamond problem','All of the above',3),
new Question('What is the output of the following program?','class A<br>{<br> int num;<br>public:<br>    A():num(0)<br>    {<br>       cout&lt;&lt;"A constructor ";<br>    }<br>    int  getnum()<br>     {<br>        return num;<br>      }<br>};<br>class B: public A<br>{<br>      int numb;<br>public:<br>      B()<br>      {<br>         cout&lt;&lt;"B constructor "; <br>     }<br>};<br>class C:public  A<br>{<br>       int numc;<br>public:<br>C()<br>      {<br>         cout&lt;&lt;"C constructor "; <br>     }<br>};<br>class D:public C,public B<br>{<br>   <br>     int numd;<br>public:<br>D()<br>      {<br>         cout&lt;&lt;"D constructor "; <br> }<br>};<br>int main()<br>{<br>    D obj;<br>}','A constructorB constructorA constructorC constructorD constructor0','Compiler Error','A constructor C constructor A constructor B constructor D constructor','None of the above',3),
new Question('Virtual functions in a class are used for','   ','Hiding the data from user','Providing dynamic polymorphism','Both ','  ',2),
new Question('What is the output of this program?',' class polygon<br>{<br> public:<br>    virtual float getArea();<br>};<br>float polygon::getArea()<br>{  <br>    return 0;<br>}<br>class triangle:public polygon<br>{<br>    float base,height;<br> public:<br>    triangle(float b,float h);<br>    float getArea();<br>};<br>triangle::triangle(float b,float h)<br>{<br>    base = b;<br>    height = h;<br>}<br>float triangle::getArea()<br>{<br>    return 0.5*base*height;<br>} <br>void printArea (polygon& p)<br>{<br>     cout&lt;&lt;"Area of polygon is "&lt;&lt;p.getArea();<br>}<br>int main()<br>{<br>     polygon p; <br>     triangle t(10,10);<br>     printArea(p);<br>     printArea (t); <br>}','Area of polygon is 0Area of polygon is 0','Area of polygon is 0Area of triangle is 50','Compiler error','None of the above',2),
new Question('How can a class be made abstract so that objects can not be created from the class?','   ','By using keyword abstract in declaration of the class','By declaring an empty class with no members','By declaring at least one pure virtual function in the class. ','All of the above',3),
new Question('What is the output of the following program?','class polygon<br>{<br> public:<br>    virtual float getArea()=0;<br>};<br><br>class triangle:public polygon<br>{<br>    float base,height;<br> public:<br>    float getArea();<br>}; <br>float triangle::getArea()<br>{<br>   base = height = 10;<br>    return 0.5*base*height;<br>} <br>int main()<br>{<br>     polygon p;<br>     cout&lt;&lt;"polygon area"&lt;&lt;p.getArea();<br>     triangle t; <br>      cout&lt;&lt;"triangle area"&lt;&lt;t.getArea();<br><br>}','polygon area 0triangle area 50','polygon area 0triangle area 0','Compilation error','None of the above',3),
new Question('Which of the following statements is true regarding virtual functions?','   ','A static function can not be virtual','Derived classes functions which override must have same signature as base class functions','A class can have a virtual destructor, but no virtual constructor','All of these',4),
new Question('What is the output of the following program?','class Shape<br>{	 <br> public:<br>     virtual string getName();<br>};<br>string Shape::getName()<br>{<br>     return "Shape";<br>}<br>class Circle:public Shape<br>{<br>public:<br>     string getName();<br>};<br>string Circle::getName()<br>{<br>    return "Circle";<br>}<br>void printShape(Shape s)<br>{<br>     cout&lt;&lt;s.getShapeName();<br>}<br>int main()<br>{<br>     Circle c;<br>     printShape(c); <br>}','Shape','Circle','Compiler Error','None of the above',1),
new Question('What is the output of the following program in a 64  bit machine?','class A<br>{<br>  public:<br>   void someFuntion(){}<br>};<br>class B<br>{<br>  public:<br>    virtual void someOtherFunction(){};<br>};<br>int main()<br>{<br>	A aObject;<br>	B bObject;<br>	cout&lt;&lt;sizeof(aObject);<br>	cout&lt;&lt;" "&lt;&lt;sizeof(bObject);<br>}<br>','0 0','1 1','1 8','None of the above',3),
new Question('In order to make a function virtual which of the following methods should be used?','   ','declare the function as virtual  inside the class','use virtual keyword in definition of function outside class ','Either of the two','None of the above',1),
new Question('Which of the following statements about abstract classes are true?','   ','A pointer to abstract class can be created','Objects of abstract class can not be created','All derived classes of abstract class become abstract, unless they define the pure virtual function','All of these',4),
new Question('Which of the marked lines in the following code are syntactically incorrect?',' class A<br>{<br>  public:<br>     virtual void someFuntion()=0;<br>};<br>class B:public A<br>{<br>};<br><br>int main()<br>{<br>    A obj1;/*****1******/<br>    B obj2;/*****2******/<br>    A * obj3;/*****3******/	 <br>}<br>','1','2','3','1 and 2',4),
new Question('What is the output of the following program?','class A<br>{<br>  public:<br>      ~A();<br>       A();<br>};<br>class B:public A<br>{<br>public:<br>       B();<br>       ~B();<br>};<br>A::A()<br>{<br>    cout&lt;&lt;"A constructor ";<br>}<br>A::~A()<br>{<br>    cout&lt;&lt;"A destructor ";<br>}<br>B::B()<br>{<br>   cout&lt;&lt;"B constructor ";<br>}<br>B::~B()<br>{<br>   cout&lt;&lt;"B destructor ";<br>}<br>int main()<br>{<br>     A *objptr = new B;<br>     delete objptr;	 <br>}<br>','B constructor B destructor','B constructor A destructor','A constructor B constructor B destructor A destructor','A constructor B constructor A destructor',4),
new Question('What is the output of the following program?',' class A<br>{<br>   public:<br>      virtual   ~A();<br>      A();<br>};<br>class B:public A<br>{<br>public:<br>     B();<br>    ~B();<br>};<br><br>A::A()<br>{<br>    cout&lt;&lt;"A constructor";<br>}<br>A::~A()<br>{<br>      cout&lt;&lt;"A destructor";<br>}<br>B::B()<br>{<br>     cout&lt;&lt;"B constructor";<br>}<br>B::~B()<br>{<br>    cout&lt;&lt;"B destructor";<br>}<br>int main()<br>{<br>     A *objptr = new B;<br>     delete objptr;	 <br>}<br>','B constructorB destructor','B constructor A destructor','A constructorB constructorB destructorA destructor','A constructorB constructorA destructor',3),
new Question('What is the output of the following program?','class Shape<br>{<br>   public:<br>      virtual string name(){return string("shape");}<br>};<br>class Circle:public Shape<br>{  <br>   public:<br>      string name(){return string("Circle");}<br>};<br>void printshape(Shapeptr *sptr)<br> {  <br>    cout&lt;&lt;s->name();<br>}<br>int main()<br>{<br>     Shape s;<br>     Circle c;<br>     printshape(&s);<br>     printshape(&c);<br>}','shapeshape','shapeCircle','Compiler error in line printshape(c);','None of the above',2),
new Question('What is the use of virtual keyword in C++?','   ','It is used to define virtual functions for polymorphism','It is used for virtual inheritance','It is used for defining abstract classes','All of the above',4),
new Question('What will be the output if the parameter to print() function is A instead of reference to A in the code below?','class A<br>{<br>public:<br>   virtual void printHello()<br>    {<br>        cout&lt;&lt;"Hello world";<br>   }<br>};<br>class B:public A<br>{<br>public:<br>    void printHello()<br>    {<br>       cout&lt;&lt;"Hello computer";<br>    }<br>};<br>void print(A &ob)<br>{<br>   ob.printHello();<br>}<br>int main()<br>{<br>    A obj1;<br>    B obj2;<br>    print(obj1);<br>    print(obj2);<br>}','Hello WorldHello Computer','HelloWorldHelloWorld','Hello World','Compiler error',2),
new Question('What is the output of the following program?','class A<br>{<br> int num;<br>public:<br>      void  print()<br>    {<br>        cout&lt;&lt;"Hello!!!";<br>      }<br>};<br>class B:  public A<br>{ <br>};<br>class C:public   A<br>{  <br>};<br>class D:public C,public B<br>{ <br>};<br>int main()<br>{<br>    D obj;<br>    cout&lt;&lt;obj.print();     <br>}<br>','No output','Hello!!!','Compiler error. request for member print is ambiguous','   ',3),
new Question('What will be the size of object of D class?','class A<br>{<br>  char a;<br>};<br>class B<br>{  <br>   char b;<br>};<br>class C:public A,public B<br>{<br>/*****/<br>}','1 byte','2 bytes','Wordlength of system','None of the above',2),
new Question('What is the output of the code below?','class Shape<br>{<br>public:<br>   virtual string getName()=0;<br>};<br>class Circle:public Shape<br>{<br>public:<br>    string getName() <br>    {<br>        return string("Circle");<br>    }<br>};<br>int main()<br>{<br>     Shape *sptr;<br>     sptr = new Circle;<br>     cout&lt;&lt;sptr->getName();<br>}','Shape','Circle','Compiler error','   ',2)];
var quiz = new Quiz(questions);populate();
