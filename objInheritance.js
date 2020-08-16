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
 }var questions = [new Question("Which of the following is the correct declaration of an abstract class?<br><br><div class='codetext'><br></div>",["class ab{<br>   abstract void unfinished();<br>}","class ab{<br>   abstract void unfinished(){}<br>}","abstract class ab{<br>   abstract void unfinished();<br>}","All of the above"],3),
new Question("Which of the following statements are true about an abstract class?<br><br><div class='codetext'><br></div>",["An abstract class can be instantiated","An abstract class can be subclassed","An abstract class can not have a concrete method","All of the above"],2),
new Question("Which of the following is the correct declaration of an interface?<br><br><div class='codetext'><br></div>",["interface Test { public void print(){}}","interface Test { public void print(); }","interface Test {   int a; void print(){}}","All of the above"],2),
new Question("What is/are the errors in the following code?<br><br><div class='codetext'>public interface ABC{<br>    public void printNum();<br>}<br><br>public class DEF implements ABC{}<br><br></div>",["DEF must implement the method printNum() ","ABC interface must implement printNum() function","It should be DEF extends ABC","No error"],1),
new Question("Which of the following statements are true?<br><br><div class='codetext'><br></div>",["A final class can not be extended","An abstract class can not be instantiated","An interface can not be instantiated","All of the above"],4),
new Question("The variables, methods and inner classes that are declared ………………… are accessible to the sub-classes of the class in which they are declared.<br><br><div class='codetext'><br></div>",["public","private","protected","default"],3),
new Question("Which of these access specifiers can be used in an interface?<br><br><div class='codetext'><br></div>",["public","private","protected","All of these"],1),
new Question("A class can ------ an interface<br><br><div class='codetext'><br></div>",["extend","implement","subclass","None of the above"],2),
new Question("A Java interface can contain ---------<br><br><div class='codetext'><br></div>",["public static final variables","public abstract methods","both public abstract methods and public static final variables. ","None of the above"],3),
new Question("What is the correct way of defining a class ABC which uses an interface DEF?<br><br><div class='codetext'><br></div>",["class ABC extends DEF","class DEF extends ABC","class ABC implements DEF","None of the above"],3),
new Question("Which of the following statements are correct?<br><br><div class='codetext'><br></div>",["A class can extend multiple classes","A class can implement multiple interfaces","An interface can not be extended","All of the above"],2),
new Question("Which of the following statements is not true about abstract classes in Java <br><br><div class='codetext'><br></div>",["A class containing abstract methods is called an abstract class.","Abstract methods should be implemented in the derived class.","An abstract class cannot have non-abstract methods."," A class must be qualified as ‘abstract’ class, if it contains one or more abstract methods."],3),
new Question("Data members of an interface are by default <br> ----<br><br><div class='codetext'><br></div>",["public","static","public static and final","All of the above"],4),
new Question("Java does not support-----<br><br><div class='codetext'><br></div>",["Multiple inheritance","Compile time polymorphism","Encapsulation","None of the above"],1),
new Question("Run time polymorphism in Java is achieved using <br><br><div class='codetext'><br></div>",["Method overloading","Method overriding","Constructor overloading","None of the above"],2),
new Question("Complete the following code so that class Cat is a sub-class of animal class<br><br><div class='codetext'>class Animal<br> {.....}<br>class Cat --------- Animal<br>{<br>   ....<br>}<br></div>",["inherits","subclass","extends","implements"],3),
new Question("In object oriented programming, composition is ----<br><br><div class='codetext'><br></div>",["A class composed of objects of other classes	","A class extended from another class","A class extending from multiple classes	","None of the above"],1),
new Question("What does the following code illustrate?<br><br><div class='codetext'>class Car{<br>    Engine e1;<br>    Tyres t1,t2,t3,t4;<br>    Seats s1,s2;<br>}<br></div>",["Inheritance","Polymorphism","Composition","None of the above"],3),
new Question("What is the output of the following code?<br><br><div class='codetext'>class Animal{<br>     Animal(String name){<br>        System.out.println('Animal');<br>    }<br>}<br>class Dog extends Animal{<br>    Dog(String name){<br>        System.out.println('Dog');<br>        super(name );<br>   }<br>}<br>public class Test{<br>   public static void main(String args[]){<br>      Dog d = new Dog('Tom');<br>  }<br>}<br></div>",["Compiler error","AnimalDog","DogAnimal","None of the above"],1),
new Question("When an overridden method is called from a subclass , it calls -----<br><br><div class='codetext'><br></div>",["Subclass method","Super class method","Compiler decides which method to call","None of the above"],1),
new Question("Method overriding is used to implement ------<br><br><div class='codetext'><br></div>",["Inheritance","Polymorphism","Encapsulation","None of the above"],2),
new Question("An overriding method in  a subclass must have ----- as the superclass method<br><br><div class='codetext'><br></div>",["Same number but different types of parameter","Different number or types of parameters","Same number and same type of parameter","None of the above"],3),
new Question("A collection of method signatures with no implementation is called ----<br><br><div class='codetext'><br></div>",["Interface","Package","Class","Subclass"],1),
new Question("Which of the following statements is true?<br><br><div class='codetext'><br></div>",["A class can be instantiated","An interface can be instantiated","Both a class and interface can be instantiated","None of the above"],1),
new Question("Which of the following is the difference between overloading and overriding?<br><br><div class='codetext'><br></div>",["Overloading is a dynamic or runtime binding and overriding is a static or compile time binding.","Overloading is a static or compile time binding and overriding is dynamic or runtime binding.","Redefining a function in a friend class is called overloading, while redefining a function in a derived class is called as overridden function.","Redefining a function in a derived class is called function overloading, while redefining a function in a friend class is called function overriding."],2),
new Question("An overridden method must have ------<br><br><div class='codetext'><br></div>",["Same name and same type and number of parameters","Same name but different type or number of parameters","Different name and same type and number of parameters","None of the above"],1),
new Question("Which keyword is used to inherit a class?<br><br><div class='codetext'><br></div>",["inherits","inheritance","extends","implements"],3),
new Question("What is/are the errors in the code below?<br><br><div class='codetext'>interface timer{<br>      void printTime(){<br>             System.out.println('in the interface');<br>    }<br>}<br></div>",["keyword is Interface","Interface method should be public","Interface method should not have implementation","No error"],3),
new Question("Can an interface have a constructor?<br><br><div class='codetext'><br></div>",["Yes","No","",""],2),
new Question("Can a class implement multiple interfaces<br><br><div class='codetext'><br></div>",["Yes","No","",""],1),
new Question("An anonymous inner class ------<br><br><div class='codetext'><br></div>",["Has no name","Has no constructor","Is an expression","All of the above"],4),
new Question("Which of the following statements is true?<br><br><div class='codetext'><br></div>",["A static inner class object can not be created without outer class object","An anonymous inner class can have a constructor","A local class is defined within a method","None of the above"],3),
new Question("A local class can access a variable within the method if ----<br><br><div class='codetext'><br></div>",["the variable is static","the variable in integer","the variable is final","Not possible"],3),
new Question("A lambda expression can also be used to implement a  --------<br><br><div class='codetext'><br></div>",["A static class","A local class","An anonymous class","All of the above"],3),
new Question("Which of the following statements is true?<br><br><div class='codetext'><br></div>",["A class can be defined within another class","A class can be defined within a method","An outer class can access all variables of inner class.","Both 1 and 2"],4),
new Question("Can a static inner class access instance variables of the outer class?<br><br><div class='codetext'><br></div>",["Yes","No","",""],2),
new Question("With reference to these two statements which of the following answer is true?<br><br>a) this() is used in a constructor to invoke another constructor of the same class. <br>b) super() is used to invoke the base class constructor.<br><br><div class='codetext'><br></div>",["Only a is true","Only b is true","Both are true","Both are false"],3),
new Question("Which of these is used to call the constructor of the base class?<br><br><div class='codetext'><br></div>",["this()","base()","super()","Not possible"],3),
new Question("Which of these keywords can be used to avoid method overriding?<br><br><div class='codetext'><br></div>",["static","abstract","final","None of the above"],3),
new Question("What is the output of the following program?<br><br><div class='codetext'>final class A{<br>   A(){<br>      System.out.println('A);<br>   }<br>}<br>class B extends A{<br>   B(){<br>      System.out.println('B');<br>   }<br>   public static void main(String args[]){<br>       B obj = new B();<br>   }<br>}<br></div>",["B","A<br>B","B<br>A","Syntax error"],4),
new Question("What will be the output of the following program?<br><br><div class='codetext'>public class A {<br>    A(int m){<br>    }<br>    void display(){<br>        System.out.println('Hello world');<br>    }<br>}<br>class B extends A{<br>    B(){<br>        super(0);<br>    }<br>    void display(){<br>        System.out.println('Goodbye world');<br>    }<br>}<br>class OverTest{<br>    public static void main(String args[]){<br>        A obj = new B();<br>        obj.display();<br>    }<br><br>}<br><br></div>",["Hello world","Goodbye world","Syntax error","None of the above"],2),
new Question("How do you access the variable m from class A in the println statement shown in the code below?<br><br><div class='codetext'>class A{<br>   int m;<br>}<br>class B extends A{<br>    int m;<br>    public void display(){<br>         System.out.println(''+--------);<br>   }<br>}<br></div>",["this.m","A.m","super.m","Not possible"],3),
new Question("What is the output of the following program?<br><br><div class='codetext'>public class A {<br>    int m;<br>    A(int m){<br>        this.m=m;<br>    }<br>    void display(){<br>        System.out.println('Hello world');<br>    }<br>}<br>class B extends A{<br>    int m;<br>    B(){<br>        super(0);<br>        m=100;<br>    }<br>    void display(){<br>        System.out.println(super.m);<br>    }<br>}<br>class OverTest{<br>    public static void main(String args[]){<br>        B obj = new B();<br>        obj.display();<br>    }<br><br>}<br><br></div>",["0","100","Syntax error","None of the above"],1),
new Question("How does Java enable multiple inheritance?<br><br><div class='codetext'><br></div>",["Using overriding","Using interfaces","Using abstract classes","None of the above"],2),
new Question("Static methods are not inherited by the derived class. True or false.<br><br><div class='codetext'><br></div>",["true","false","",""],2),
new Question("Which of the following statements are true regarding final keyword?<br><br><div class='codetext'><br></div>",["final variable can not be modified","final method can not be over ridden","final classes can not be extended","All of the above"],4),
new Question("A class is made abstract by ------<br><br><div class='codetext'><br></div>",["Writing an abstract method in the class","Using the keyword final in the class declaration","Using keyword abstract in class declaration","Any of the above"],3),
new Question("What is the output of the following program<br><br><div class='codetext'>abstract class Base1{<br>    abstract public void display();<br>}<br><br><br>public class AbstTest  extends Base1{<br>    public static void main(String args[]){<br>        System.out.println('Hello world');<br>    }<br>}<br></div>",["Hello world","No output","Syntax error","None of the above"],3),
new Question("What is the output of the following program?<br><br><div class='codetext'>class Abcd{<br>    abstract public void display();<br>}<br><br><br>public class AbstTest  extends Abcd{<br>    public static void main(String args[]){<br>        Abcd obj = new Abcd();<br>        System.out.println('Hello world');<br>    }<br>}<br></div>",["Hello world","No output","Syntax error","None of the above"],3),
new Question("Write the output of the following program?<br><br><div class='codetext'>class Base{<br>    private int i,j;<br>}<br>class Derived extends Base{<br>    public void setNumbers(int m){<br>        i=j=m;<br>    }<br>    public void printNumbers(){<br>        System.out.println('i is'+i+'and j is '+j);<br>    }<br>}<br>public class Demo  {<br>    public static void main(String args[]){<br>       Derived d1 = new Derived();<br>       d1.setNumbers(10);<br>       d1.printNumbers();<br>    }<br>}<br><br></div>",["i is 10 and j is 10","i is 0 and j is 0","Syntax error","None of the above"],3),
new Question("Except for Object class, every class has one and only one --------<br><br><div class='codetext'><br></div>",["method","field","super class","sub class"],3),
new Question("Which of the following statements regarding subclass are true?<br><br><div class='codetext'><br></div>",["A sub class inherits all members of super class","A sub class can override a method of superclass","A subclass can define its own methods and fields","All of the above"],4),
new Question("Which of the following statements are valid with respect to the code given below?<br><br><div class='codetext'>class Animal{<br>   int age;<br>   String name;<br>}<br>class Cat extends Animal{<br>    void mews(){<br>        }<br>}<br>class Demo{<br>     public static void main(String args[]){<br>           Animal a = new Animal();<br>           Cat c = new Cat();<br>  }<br>}<br></div>",["c = a;","a = c;","Both 1 and 2","Neither 1 and 2"],2),
new Question("Referring to the code below, which of the following statements are valid?<br><br><div class='codetext'>class A{/*code*/<br>}<br>interface B{/*code*/<br>}<br> <br></div>",["A obj = new A();","B obj = new B();","Both 1 and 2","None of the above"],1),
new Question("What is the output of the following program?<br><br><div class='codetext'>class Ba {<br>    private int n1;<br>    int n2;<br>    protected int n3;<br>    void printBase(){<br>        System.out.println('n1 ='+n1+'n2='+n2+'n3='+n3);<br>    }<br>    Ba (int a){<br>        n1 = n2 = n3=a;<br>    }<br>}<br>public class Inh extends Ba  {<br>    public Inh(){<br>        super(0);<br>    }<br>    void printDerived(){<br>        System.out.println('n1 ='+n1+'n2='+n2+'n3='+n3);<br>    }<br>}<br>class TestInh{<br>    public static void main(String args[]){<br>        Inh obj = new Inh();<br>        obj.printDerived();<br>    }<br>}<br><br></div>",["n1=0 n2=0 n3=0","n1=1 n2 = 1 n3=1","Syntax error","Run time error"],3),
new Question("What is the output of the following program?<br><br><div class='codetext'> public class Shape {<br>    public float area(){<br>        return 0;<br>    }<br>}<br>class Rectangle extends Shape{<br>    int len,wid;<br>    Rectangle(int l,int w){<br>        len = l;<br>        wid =w;<br>    }<br>    public float area(){<br>        return len*wid;<br>    }<br>}<br><br>class Demo{<br>    public static void main(String args[]){<br>        Shape  r = new Rectangle (5,5);<br>        System.out.println('Area  is '+r.area());<br>    }<br>}<br></div>",["area is 0","area is 25","Syntax error","Run time error"],2),
new Question("When we write a static method in subclass with the same signature as a static method in super class, it is called ------<br><br><div class='codetext'><br></div>",["Overriding","Overloading","Polymorphism","Method hiding"],4),
new Question("When we override a method in subclass, we can optionally use the annotation -----<br><br><div class='codetext'><br></div>",["","override","","Override"],),
new Question("A protected method in super class can have an overriding method in sub-class which is ------<br><br><div class='codetext'><br></div>",["public","private","static","None of the above"],1),
new Question("What is the output of the following program?<br><br><div class='codetext'>class A{<br>    int n;<br>    protected void print(){<br>        System.out.println(' n is'+n);<br>    }<br>    static void printHello(){<br>        System.out.println('Hello coder!!');<br>    }<br>}<br>class B extends A{<br><br>     void printHello(){<br>        System.out.println('Hello Java');<br>    }<br>}<br>class Test{<br>    public static void main(String args[]){<br>        B obj = new B();<br>        obj.print();<br>        obj.printHello();<br>    }<br>}<br><br><br></div>",["Hello Coder","Hello Java","Syntax error","None of the above"],3),
new Question("Which of the following statements are true?<br><br><div class='codetext'><br></div>",["In a sub class, we can overload methods from superclass","In a sub class we can override static methods from super class","In a sub class we can override instance methods of super class","Both 1 and 3"],4),
new Question("With the following code, which of these statements are valid?<br><br><div class='codetext'>class A{<br>    int a1;<br>    void printA(){<br>        System.out.println(' A');<br>    }<br><br>}<br>class B extends A{<br>    int b1;<br>    void printB(){<br>        System.out.println(' B');<br>    }<br><br>}<br>class Demo{<br>   public static void main(String args[]){<br>      A obja = new A();<br>      B objb = new B();<br>  }<br>}<br> <br><br><br></div>",["obja.b1 = 10","obja.printB();","objb.printA();","None of the above"],3),
new Question("What is the output of the following program?<br><br><div class='codetext'>public class Animal {<br>    public void talk(){<br>        System.out.println('talk');<br>    }<br>}<br>class Cat extends Animal{<br>    public void talk(){<br>        System.out.println('mews');<br>    }<br>}<br>class Dog extends Animal{<br>    public void talk(){<br>        System.out.println('barks');<br>    }<br>}<br>class Cow extends Animal{<br>    public void talk(){<br>        System.out.println('moos');<br>    }<br>}<br>class Polytest{<br>    public static void main(String args[]){<br>        Animal arr[] = new Animal[3];<br>        arr[0] = new Cat();<br>        arr[1] = new Dog();<br>        arr[2] = new Cow();<br>        for(int i=0;i<3;i++)<br>            arr[i].talk();<br>    }<br><br>}<br><br></div>",["talk<br>talk<br>talk","Syntax error","mews<br>barks<br>moos<br>","None of the above"],3),
new Question("In order to use the clone() method defined in Object class, your class must implement ----- interface.<br><br><div class='codetext'><br></div>",["Object","Clonable","Clone","None of the above"],2),
new Question("Which of the following methods of Object class are inherited by all classes in Java?<br><br><div class='codetext'><br></div>",["equals()","hashCode()","getClass()","All of the above"],4),
new Question("What is the error of the following code?<br><br><div class='codetext'>public class Animal {<br>    public final void talk(){<br>        System.out.println('talktalktalk');<br>    }<br>}<br>class Cat extends Animal{<br>    public void talk(){<br>        System.out.println('mews');<br>    }<br>}<br></div>",["class Animal can not be extended","Method talk() can not be overridden","No errors",""],2),
new Question("What is the error in the code given below?<br><br><div class='codetext'>public final class Animal {<br>    public  void talk(){<br>        System.out.println('talktalktalk');<br>    }<br>}<br>class Cat extends Animal{<br>    public void talk(){<br>        System.out.println('mews');<br>    }<br>}<br></div>",["Final class can not be subclassed","Final class can have only final methods","Subclass of final class must also be final","No error"],1),
new Question("Which statement regarding abstract methods is not true?<br><br><div class='codetext'><br></div>",["An abstract method should not have implementation","class with abstract method must be defined as abstract class","Methods in an interface can not be abstract.","All of the above"],3),
new Question("Which of the following statements are true?<br><br><div class='codetext'><br></div>",["An interface can contain default, abstract and static methods","abstract methods end with a semi-colon but no braces","default methods use the keyword default and have implementation","All of the above"],4),
new Question("What are the errors in the following code?<br><br><div class='codetext'>interface A extends E1,E2,E3{<br>       int m=10;<br>       void doSomething(int n);<br>       abstract int calculateSomething(int a,int b);<br>}<br></div>",["doSomething() has to be declared abstract","An interface can not have data members","An interface can not extend other interfaces","No error"],4),
new Question("What is the error in the following code?<br><br><div class='codetext'>interface Compute{<br>    int add(int a,int b);<br>    default findSq(int a){<br>          return a*a;<br>    }<br>}<br></div>",["method add must be defined as abstract","Method findSq can not have implementation","Interface can not have two methods","No error"],4),
new Question("What are the errors in the following program?<br><br><div class='codetext'>import java.util.Scanner;<br><br>interface Compute{<br>    static int cubeNum(int n){<br>        return n*n*n;<br>    }<br>}<br>public class Demo implements Compute{<br> <br>    public static void main(String args[]){<br>        int n=10;<br>        int cube = Compute.cubeNum(n);<br>        System.out.println('Cube of '+n+' is '+cube);<br>   }<br>}<br>       <br></div>",["class Demo must implement cubeNum method","cubeNum should be used with an object of Demo class","An interface can not define a static method","No error"],4),
new Question("What is the output of the following code?<br><br><div class='codetext'>interface A{}<br>class B {}<br>class C extends B implements A{}<br><br>public class IntrSubn {<br>    public static void main(String args[]){<br>        C obj = new C();<br>        if (obj instanceof A)<br>            System.out.println('obj is an instance of A');<br>        if (obj instanceof B)<br>            System.out.println('obj is an instance of B ');<br><br>    }<br>}<br></div>",["obj is an instance of A<br>obj is an instance of B<br>","obj is an instance of A","obj is an instance of B","Compiler error"],1),
new Question("What is the output of the following program?<br><br><div class='codetext'>class A{<br>  int i,j;<br>  public A(){<br>    i = j = 100;<br>  }<br>}<br>class B extends A{<br>    public B(){<br>       super();<br>   }<br>}<br>class Demo{<br>    public static void main(String args[]){<br>         B obj = new B();<br>         System.out.println('i='+i);<br>   }<br>}<br><br></div>",["compiler error","i=0","i=100","None of the above"],3),
new Question("How do you restrict a variable from being accessed by subclasses?<br><br><div class='codetext'><br></div>",["Declaring it final","Declaring it protected","Declaring it as private","None of the above"],3),
new Question("In the following code, how do you print the variable num from super class A?<br><br><div class='codetext'>class A1{<br>    int num=10;<br>}<br>class B1 extends A1{<br>    int num=100;<br>    void printNumber(){<br>        -------------------//how do you print num from A<br>    }<br>}<br><br>public class SameName {<br>    public static void main(String args[]) {<br>        B1 obj = new B1();<br>        obj.printNumber();<br>    }<br>}<br><br></div>",["System.out.println(num)","System.out.println(super.num)","System.out.println(A.num);","Not possible"],2),
new Question("Which of the following statements are true with respect to the code given below.<br><br><div class='codetext'>public class MyClass{<br>    public abstract double getNum();<br>}<br></div>",["We have to write implementation of getNum() method.","The class MyClass should be abstract","Both 1 and 2","public and abstract keywords can not be used together. "],2),
new Question("Which of the following is correct declaration of abstract method?<br><br><div class='codetext'><br></div>",["public abstract void method1();","public void abstract method1();","public void method1(){}","None of the above"],1),
new Question("If A is an abstract super class and B is a concrete subclass of A, and if both A and B have constructors, which of the following statements are valid?<br><br>1. A a = new B();<br>2. A a= new A();<br>3. B b = new B();<br>4. B b = new A();<br><br><div class='codetext'><br></div>",["1 and 2","1 and 3","2 and 4","All are invalid."],2),
new Question("Which of the following is a correct interface?<br><br><div class='codetext'><br></div>",["abstract interface A{ void print();}","interface A{ void print();}","interface A{ abstract void print(){}}","All of the above"],2),
new Question("What is the output of the following code?<br><br><div class='codetext'>interface A{<br>    void doYourJob();<br>} <br>abstract class C implements A{}<br><br>public class IntrSubn {<br>    public static void main(String args[]){<br> <br>    }<br>}<br><br></div>",["The code does not compile because class C does not implement doYourThing() method","The code compiles fine","The code does not compile because class C must say class C extends A","None of the above"],2),
new Question("What is the output of the following program?<br><br><div class='codetext'>interface A3{<br>    void doYourJob();<br>}<br>class B3 {<br>    void doYourJob(){<br>        System.out.println('Doing my job');<br>    }<br>}<br> <br>  class C3 extends B3 implements A3{<br>    void doYourJob(){<br>        System.out.println('Not Doing my job');<br>    }<br>}<br><br>public class Demo {<br>    public static void main(String args[]){<br>         C3 c3 = new C3();<br>         c3.doYourJob();<br>    }<br>}<br><br></div>",["Doing my job","Not doing my job","No output","Compiler error"],4),
new Question("What is the output of the following program?<br><br><div class='codetext'> class A{<br>    static String getBB(){<br>        return 'BB';  <br>     }<br>    String getAA(){<br>       return 'AA'; <br>    }<br> }<br> class B extends A{<br>    static String getBB(){<br>      return 'BB1';<br>     }<br>     String getAA(){<br>         return 'AA1';<br>    }<br> }<br> <br> class Demo{<br>    public static void main(String args[]){<br> 	  A obj = new B();<br> 	  System.out.println(obj.getAA());<br> 	 System.out.println(obj.getBB());<br> 	}<br> }<br><br></div>",["AA1<br>BB1","AA<br>BB","AA1<br>BB","None of the above"],3),
new Question("Write the output of the following program.<br><br><div class='codetext'>abstract class writer{<br>     void write(){<br>         System.out.println('writing.....');<br>   }<br>}<br>class author extends writer{<br>     void write(){<br>         System.out.println('writing book');<br>   }<br>}<br>class coder extends writer{<br>     void write(){<br>         System.out.println('writing code');<br>   }<br>}<br>class Demo {<br>    public static void main(String args[]){<br>           Writer person = new coder();<br>           person.write();<br>    }<br>}<br></div>",["Writing","Writing code","Writing book","None of the above"],2),
new Question("The code given does not compile. Which statement should be added in line n, to make the code compile?<br><br><div class='codetext'>class A{<br>    public A(int n){<br>        System.out.println('hi');<br>   }<br>}<br>class B extends A{<br>    public B(){<br>      //line n<br>       System.out.println('hello');<br>   }<br>}<br><br></div>",["this(0)","super(0)","A(0)","None of the above"],2),
];
var quiz = new Quiz(questions);populate();