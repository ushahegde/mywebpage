
new Question('Complete the line to assign value 23 to data member a of obj1.','#include&lt; iostream> NLL using namespace std; NLL class A NLL { NLL public: NLL   int a; NLL   void print_a() NLL   {     cout&lt; &lt; a;  } NLL };  NLL int main() NLL { NLL      A obj1; NLL      ------- = 23; NLL      obj1.print_a(); NLL }',obj1.a = 23;,obj1::a = 23;,'Not possible','   ',1),
new Question('What is the output of the following program?','#include&lt; iostream> NLL using namespace std; NLL class A NLL { NLL   int a; NLL   void print_a() NLL   { NLL      a = 23; NLL      cout&lt; &lt; a; NLL   } NLL };  NLL int main() NLL { NLL      A obj1; NLL      obj1.print_a(); NLL }',23,'Garbage value','Compiler error','   ',3),
new Question('What is the output of the following program?','#include&lt; iostream> NLL using namespace std; NLL class  A NLL { NLL   int a=88; NLL public: NLL   void print_a() NLL   {     cout&lt; &lt; a;  } NLL };  NLL int main() NLL { NLL      A obj1; NLL      obj1.print_a(); NLL }','Compiler Error','Garbage value',88,'   ',1),
new Question('What is the output of the following program?','#include&lt; iostream> NLL using namespace std; NLL class  A NLL { NLL    int a; NLL public: NLL   void seta(int m){ a = m;} NLL   void print_a() NLL   {     cout&lt; &lt; a;  } NLL };  NLL int main() NLL { NLL      A obj1; NLL      obj1.print_a(); NLL }',0,'Garbage value','Run time error', ,2),
new Question('Which of the following statements is true about classes in C++?','   ','By default members of a class are public','By default members of a class are private','Data members of a class are private by default and function members are public by default','None of the above',2),
new Question('How do you assign one object to another object of same class?','   ','Not possible','Using  =','copying individual members','By overloading =',2),
new Question('What is the output of the following program?','#include&lt; iostream> NLL using std::cout; NLL class A NLL { NLL    int n; NLL  public: NLL    void setn(int m) NLL    { n = m; } NLL    int getn() NLL    {   return n; } NLL }; NLL int main() NLL { NLL    A obj1;  NLL    A obj2; NLL    obj1.setn(10); NLL    cout&lt; &lt; obj2.getn(); NLL }',10,0,'Some garbage value','None of the above',3),
new Question('With the following declaration of the class Num, how do you define two objects and one pointer of class Num?','class Num NLL { NLL      int n; NLL public: NLL     int getn() { return n;} NLL     void setn(int m)  { n=m;} NLL };','Num(obj1); Num(obj2); NLL Num *ptr;','Num obj1, obj2; NLL Num *ptr;','Num obj1, obj2; NLL Num *ptr = new Num;','   ',3),
new Question('What is the output of the following program?','class B NLL { NLL } NLL int main() NLL { NLL     B obj1; NLL     cout&lt; &lt; "Hello from classes"; NLL }','Error. Class B does not have any data members. ','Error. No objects can be  created from class B because it is empty class.','Error. No semicolon at the end of class declaration.','   ',3),
new Question('What is the output of the following program?','class B NLL { NLL     int m; NLL }; NLL int main() NLL { NLL     B obj1; NLL     obj1.m = 10; NLL     cout&lt; &lt; obj1.m; NLL }',10,'Garbage value','Error. m is private','   ',3),
new Question('Data hiding is achieved in C++ by','   ','Making data members as private and methods as public','Making member functions as private and data members as public.','Making all members private','   ',1),
new Question('What is the output of the program?','class A NLL { NLL     public: NLL      void print_hello(){ cout&lt; &lt; "Hello world";} NLL }; NLL int main() NLL { NLL     A * ptr = new A; NLL    ptr.print_hello(); NLL }','Hello world','No output','Compiler error','   ',3),
new Question(
