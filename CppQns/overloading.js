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
    //aa.innerHTML = "You clicked a button. la la la la";
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
        strcode = strcode.replaceAll("<br>","<br>")
        strcode = strcode.replaceAll(" ","&nbsp;");
        if(strcode!='a'&& strcode!="")
          elcode.innerHTML = strcode;
        
        var nextButton = document.getElementById('nextbutton');
        nextButton.innerHTML = "Skip";
        
       
        var choices = quiz.getQuestionIndex().choices;
       
     //   console.log(choices[1]);
        for(var i = 0; i <choices.length; i++) {
            var element = document.getElementById("choice" + i);
           
            var str2 = choices[i];
            str2 = str2.trim();
            if(str2.length!=0){
 		str2= str2.replaceAll("<br>","<br>");
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
    gameOverHTML += "<h2> Your score : " + quiz.score + "/"+(quiz.questionIndex)+ "</h2>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
};

function showNextQuestion() { 	
   quiz.questionIndex++;
   populate();
 }
var questions=[
new Question('What is the output of this program?','int sum(int a,int b,int c)<br>{    return a+b+c;} <br>int sum(int a,int b)<br>{   return a+b;}<br>int main()<br>{<br>    int s = sum(2,4,5);   <br>    cout&lt;&lt;s;<br>    return 0;<br>}','Error because function sum is redefined','11','None of the above','  ',2),
new Question('What is the error/output of the program?',' int sum(int a,int b=0,int c=0)<br>{<br>    return a+b+c;<br>} <br>int main()<br>{ <br>    cout&lt;&lt;sum(2,4,5); <br>    cout&lt;&lt;sum(2,4);   <br>    cout&lt;&lt;sum(22);   <br>    return 0;<br>}','Error because assignment is used in parameter declaration','Error because function expects 3 arguments but is called with less than 3 arguments.','11622','  ',3),
new Question('What is the error in this program?','int sum(int a=0,int b,int c=0)<br>{<br>    return a+b+c;<br>} <br>int main()<br>{ <br>    cout&lt;&lt;sum(2,4,5); <br>    cout&lt;&lt;sum(2,4); <br>    cout&lt;&lt;sum(2);   <br>    return 0;<br>}','can not assign values to parameters in function declaration','Default paramter value is not assigned to 2nd parameter but is assigned to first parameter','No error','  ',2),
new Question('What operation is performed by the program below?','#include&lt;iostream&gt;<br>using namespace std;<br>class Number<br>{<br>    int n;<br> public:<br>    Number(int a):n(a){}<br>    int getn() {<br>        return n;<br>    }<br>    bool operator &gt;(const Number & obj1);<br>};<br>bool Number::operator &gt;(const Number &obj1 )<br>{<br>    return n&gt;obj1.n;<br>}<br>int main()<br>{<br>    Number obj1(10),obj2(25);<br>    if(obj1&gt;obj2)<br>       cout&lt;&lt;obj1.getn()&lt;&lt;"is greater than "&lt;&lt;obj2.getn();<br>    else<br>       cout&lt;&lt;obj1.getn()&lt;&lt;"is not greater than"&lt;&lt;obj2.getn();<br>}<br>       <br>    ','syntax error in line<br> A operator +(A obj1); ','Returns true if (n of)  first object is greater than second object','produces run time error','  ',2),
new Question('What are the errors in the following class declaration?','class A<br>{<br>   int n;<br>public:<br>   void set_n(int m);/**1**/<br>   A(int num=0);      /**2**/<br>   A operator +(A obj1,A obj2);/**3**/<br>   int get_n();<br>};','No errors','Program produces compiler error in line marked as  2.','Error in line marked as 1','The program produces error in line marked 3.',4),
new Question('Which of the following is the correct declaration of overloading" - operator" of class A? 1 or 2?','class A<br>{<br>   int n;<br>public:<br>   void set_n(int m);<br>   A(int num=0);   <br>   A operator -(A obj1);/*****1*****/<br>   int get_n();<br>};<br>A operator -(A obj1,A obj2);/****2****/','1','2','Both','Neither',3),
new Question('What is the output of the following program?','class A<br>{<br>  int n;<br>public:<br>   int getn(){return n};<br>   A(int m=0):n(m){}<br>   void print(){cout&lt;&lt;n;}<br>}; <br>A operator +(A obj1,A obj2)<br>{<br>    A temp;<br>   temp = obj1.getn()+obj2.getn();<br>   return temp;<br>}<br>int main()<br>{<br>     A ob1(10);<br>     A ob2(90);<br>     A ob3;<br>     ob3 = ob1+ob2;<br>     ob3.print();<br>     return 0;<br>}','Error. Operator overloading is not a member function','Error. Assignment operator is not overloaded','100','  ',3),
new Question('What is the output of the program below?','class A<br>{<br>   int num;<br> public:<br>    A(int n=0):num(n){}<br>    void print() const;<br>    void setNum(int n);<br>    void  operator+=(const A&obj);<br>};<br>void A::print() const<br>{    cout&lt;&lt;num&lt;&lt;"\n";   }<br>void A:: setNum(int n)<br>{    num = n;    }<br>void  A::operator+=(const A&obj)<br>{<br>     num +=obj.num;<br>}<br>int main()<br>{<br>      A obj1(12);       A obj2(24);<br>      A obj3 =obj2+=obj1;<br>      obj3.print();<br>}','12','Compiler error','36','None of the above',2),
new Question('What is the output when the following program is executed?','class A<br>{<br>   int num;<br> public:<br>    A(int n=0):num(n){}<br>    void print() const;<br>    void setNum(int n);   <br>    bool operator &lt;(const A& obj);<br>};<br>void A::print() const<br>{<br>    cout&lt;&lt;num&lt;&lt;"\n";<br>}<br>void A:: setNum(int n)<br>{<br>    num = n;<br>}<br>bool  A::operator&lt;(const A&obj)<br>{<br>     return num&lt;obj.num;<br>}<br>int main()<br>{<br>      A obj1(12);<br>      A obj2(24);<br>     if(obj1&lt;obj2)<br>        cout&lt;&lt;"object 1 is smaller";<br>     else<br>        cout&lt;&lt;"object 2 is smaller";<br>}<br>','Error. We can not overload relational operators. ','Error. Operator overload function must return an object','object1 is smaller','None of the above',3),
new Question('Find out the errors in the class definition','class A<br>{<br>    int len;<br>    float *arr;<br>public:<br>     A(int sz);  <br>     float operator[](int n) const;<br>     float & operator[](int n);<br>};<br>float A::operator[](int n)const<br>{        return arr[n];<br>}<br>float &A::operator[](int n)<br>{            return arr[n];  <br>}','No errors','Can not overload [] operator','Can not have 2 functions for subscript operator','  ',1),
new Question('Decrement  operator for a class can have two versions - pre-decrement and post decrement. How do you write these two versions for the following class?','class A<br>{<br>     int num;<br>public:<br>     ..........<br>};','A& operator--(){/*code*/}<br>A  operator--(int n){/*code*/}','There can not be two overloaded functions for one operator','A&  operator--(){/*code*/}<br>friend A&   operator--(A obj){/*code*/}','  ',1),
new Question('What lines must be used in the program below to overload new operator correctly?','class A<br>{<br>   int x,y,z;<br> public:<br>    void * operator new(size_t nbytes);<br>    void print() const;<br>};<br>void *A::operator new(size_t nbytes)<br>{<br>     /* implement new */   }<br>int main()<br>{<br>      A *objptr = new A(); <br>}<br>','void * temp = new A[nbytes];<br>return temp;','void *temp = malloc(nbytes);<br>return temp;','None of the above','  ',2),
new Question('What is the output of the following program?','class A<br>{<br>   int num;<br> public:<br>    A(int n);<br>    int getNum() const;<br>    ostream& operator&lt;&lt;(ostream &stream,A obj);<br>};<br>int A::getNum() const<br>{<br>   return num;<br>}<br>ostream& A::operator&lt;&lt;(ostream &stream,A obj)<br>{<br>      stream&lt;&lt;"Number is"&lt;&lt;obj.getNum()&lt;&lt;"\n";<br>      return stream;<br>}<br>A::A(int n=1):num(n){     }<br>int main()<br>{<br>      A obj(10);<br>      cout&lt;&lt;obj;<br>      A obj2 ;<br>      cout&lt;&lt;"Object 2 "&lt;&lt;obj2;<br>}<br>','Number is 10<br>Object 2 Number is 0','Error in constructor call for obj2 as there is no default constructor','Error. &lt;&lt;operator function should be a non-member function','  ',3),
new Question('What does the following code do?','A::operator float()<br>{<br>   float m = num;<br>   return m;<br>}','Error. float should be return type','Defines a function to convert A object to float','Defines a function to convert a float value to object of class A','None of the above',2),
new Question('Which of the following is invalid overloaded function of sum() in  the code given below?','int sum(int a,int b)<br>{ <br>   return a+b;<br>}','int sum(int a,int b,int c);','float sum(int a,int b);','float sum(float a,float b);','int sum(int a,float b);',2),
new Question('Given the following definition of function product(), which of these function calls are valid?','int  product(int a,int b=1,int c=1,int d=1)<br>{<br>   return a*b*c*d;<br>}','m = product(a,b);','n = product(3,45,11,12);','p = product(44,66);','All of the above',4),
new Question('Which of the following operators can not be overloaded?','  ','Dot operator(.)','sizeof operator','scope resolution operator(::)','All of the above',4),
new Question('Which of the following statements are true with respect to the following program?','class Number<br>{<br>    int n;<br>public:<br>   explicit Number(int num):n(num){}<br>   operator int();<br>   Number operator=(int n);<br>  void setval(int val);	 <br>};<br>void Number::setval(int val)<br>{<br>   n = val;<br>}<br>/*function one*/<br>Number::operator int() <br>{<br>    cout&lt;&lt;"this is type conversion operator";<br>    return n;<br>}<br>/*function two*/<br>Number Number::operator =( int val)<br>{<br>   n = val;<br>   return Number(val);<br>}<br>int main()<br>{<br>    Number obj(10);<br>    int m =99;<br>    obj = m;<br>}','Function one converts Number object to integer','Function two converts integer to Number object','Both 1 and 2','None of the above',3),
new Question('Which of the following statements are correct regarding overloading operators in C++?','  ','insertion &lt;&lt;and extraction &gt;&gt; operators should always be non-member functions. ','=,(),[],-&gt;,-&gt;* operators should always be member functions','A non-member operator function should be friend function.','1 and 2',4),
new Question('What does the following code do?','class Equation<br>{	 <br>public:<br>    int operator ()(int n);	<br>};<br>int Equation::operator()(int n)<br>{<br>    return n*n+10*n+25;<br>}','Defines Equation class, whose object works like equation function','Syntax error. Two pairs of parantheses in operator function','The class in invalid because it has no data members','None of the above',1),
new Question('Which of the following operators can  be overloaded?','  ','.','&','sizeof','?:(ternary)',2),
new Question('Which of the following funcitons can be overloaded?','  ','Two functions with different types of paramters ','Two functions with different number of parameters','Two functions of a class which differ in const ness','All of the above',4),
new Question('For the class given below how do you overload assignment operator so that it takes care of self assignment?','class Array<br>{<br>  float*element;<br>  int size; <br>public:<br>  Array(int n=1); <br>   ~Array();<br>  Array(const Array & obj);<br>   T& operator =(const T& other); <br>};  <br>Array&  operator = (const T &other)<br>{<br>   if(--------)<br>   {<br>        ---------<br>    }else<br>   {<br>       delete []element; <br>       element = new T[size];<br>       for(int i=0;i&lt;size;i++)<br>       {     element[i]=other.element[i];    }<br>    }	<br>    return *this;<br>}   <br><br> ','if(this ==&other)<br>    return *this;','if(this==other)<br>   return this;','Assignment operator can not be overloaded','  ',1),
new Question('What is the output of the following program?',' void printNum(int a)<br>    {<br>        cout&lt;&lt;"Integer  ="&lt;&lt;a&lt;&lt;"\n";<br>    }<br>    void printNum(float a)<br>    {<br>        cout&lt;&lt;"Float  ="&lt;&lt;a&lt;&lt;"\n";<br>    }<br> int main()<br>{<br>     printNum(10);<br>     printNum(11.2);<br>}','Integer = 10<br>Float = 11.2','Integer = 10<br>Integer = 11','Compiler error . Ambiguous call to printNum(11.2)','None of the above',3),
new Question('What is the output of the following program?',' class Number<br>{<br>    unsigned char num; <br>public:<br>    Number(int n=0); <br>    Number operator * (const Number & obj);<br>}; <br>Number::Number(int n)<br>{    this-&gt;num =(char) n; } <br>Number Number::operator *(const Number &obj)<br>{<br>    cout&lt;&lt;"The parameter here is "&lt;&lt;(int)obj.num;<br>    cout&lt;&lt;"And current object is "&lt;&lt;(int)num;<br>    return Number(num*obj.num);    <br>}<br>int main()<br>{<br>  Number obj1(12);<br>  Number obj2(25);  <br>  Number obj3 = obj1*obj2;<br>}','No output','300','The parameter here is 25And current object is 12','  ',3),
new Question('For the class given below, write the declaration of overloaded subscript operator.','class ABC<br>{<br>    int size;<br>    float *elements;<br>public:<br>   /*code*/<br>};','float operator[int n];','float & operator[](int n);','None of the above','   ',2),
new Question('What is the output of the following program?','class DbArray<br>{<br>     int len;<br>     double *elements;<br>public:<br>    DbArray(int sz):len(sz)<br>   {  elements = new double[len];}<br>    double  operator [](int i) ;<br>};<br>double DbArray::operator[](int index)<br>{<br>    return elements[index];<br>}<br>int main()<br>{<br>     DbArray obj1(5);<br>     for(int i=0;i&lt;5;i++)<br>         obj[i] = i*2;<br>      for(int i=0;i&lt;5;i++)<br>         cout&lt;&lt;obj[i];<br>}','2468,01234','Compiler error','  ',3),
new Question('What are the errors in this program?','class Distance<br>{<br>    int inches;<br>    int feet;<br>public:<br>    Distance(int inc):feet(inc/12),inches(inc%12){}<br>    Distance & operator ++();/*prefix*/<br>    Distance operator++(int);/*postfix*/<br>};<br>Distance & operator++()<br>{<br>    inches++;<br>    if(inches&gt;=12)<br>    {<br>        inches-=12;<br>        feet++;<br>    }<br>   return *this;<br>}<br>Distance operator ++(int dummy)<br>{<br>    Distance temp = *this;<br>     inches++;<br>    if(inches&gt;=12)<br>    {<br>        inches-=12;<br>        feet++;<br>    }<br>    return temp;<br>}<br>','Can not overload an operator twice','++ operator is unary and it does not need a  parameter','No errors','  ',3),
new Question('What is the output of this program?','class A<br>{<br>   int n;<br>public:<br>  A(int m);<br>  int getn();<br>};<br>A::A(int m):n(m){}<br>int A::getn()<br>{     return n;     }<br>ostream& operator&lt;&lt;(ostream&out,A &obj)<br>{<br>     out&lt;&lt;"n="&lt;&lt;obj.getn()&lt;&lt;endl;<br>     return out;<br>}<br>int main()<br>{<br>      A obj(10);<br>      cout&lt;&lt;obj;<br>}<br>  ','Error in &lt;&lt;operator function','10','n= 10','  ',3),
new Question('How do you write overloaded conversion function for the following class?','class RealNumber<br>{<br>    double num;<br>public:<br>    RealNumber(double m):num(m){ }<br>    operator double();<br>};<br>','RealNumber::operator double()<br>{<br>    return num;<br>}<br>    ','double RealNumber::operator double()<br>{<br>    return num;<br>}<br>    ','It is not possible','  ',1),
 
new Question('Fill in the blanks. ','class RealNumber<br>{<br>    double num;<br>public:<br>    RealNumber(double m):num(m){ }<br>    friend  istream& operator &gt;&gt;(istream&out,RealNumber &rno);<br>    double getn(){ return num;}<br>};<br>istream& operator &gt;&gt;(----------------)<br>{<br>    in&gt;&gt;rno.num;<br>    return in;<br>}<br> ','istream in,RealNumber obj','istream& in,RealNumber obj','istream& in,RealNumber& obj','None of the above',3)];
var quiz = new Quiz(questions);populate();
