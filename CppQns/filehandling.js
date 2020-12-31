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
new Question('Which of the following statements opens a file  myfile.txt, for reading?','  ','ifstream file("myfile.txt");','ifstream file;<br>file.open("myfile.txt");','fstream("myfile.txt",ios::in);','Any of the above',4),
new Question('How do you check if file open operation has failed? ','fstream file("myfile.txt",ios::in);<br>if(-----------)<br>   cout&lt;&lt;"file open error";','fstream.fail()','!fstream','Either of the above','  ',3),
new Question('How do you open a file for both reading and writing?','  ','fstream file("a.txt");','fstream file("a.txt",ios::in&amp;ios::out);','fstream file("a.txt",ios::in|ios::out);','Not possible',3),
new Question('What does the following program do?',' int main()  <br> {  <br>      fstream file("myfile2.txt",ios::out);	 <br>      for(int i=0;i&lt;10;i++)<br>               file&lt;&lt;i;<br>      return 0;<br> }','Compilation error','Displays the numbers 0 to 9 on screen','Writes the numbers 0 to 9 to the file myfile2.txt','None of the above',3),
new Question('What is the output of this program, if the file a.txt contains "Hello world" and "Goodbye world" in two lines?','int main()<br>{<br>    ifstream file("a.txt");<br>   char str[100];<br>   while(!file.eof())<br>   {<br>       file&gt;&gt;str;<br>      cout&lt;&lt;str;<br>   }<br>   return 0;<br> }<br> ','Hello world<br>Goodbye world','HelloworldGoodbyeworld','HelloworldGoodbyeworldworld','None of the above',3),
new Question('What does the following program do?','int main()  <br> {  <br>      fstream file("../a.txt",ios::app);<br>      if(!file)<br>     {<br>           cout&lt;&lt;"File open error";<br>           exit(1);<br>      }<br>     char str[100];<br>     for(int i=0;i&lt;10;i++)<br>     {<br>         cin&gt;&gt;str;<br>         file&lt;&lt;str;<br>      }<br>      return 0;<br> }','Creates a new file a.txt and writes 10 strings to it.','Opens a file a.txt and reads 10 strings from it','Opens a file a.txt if it exists. If not, creates the file and then writes 10 strings to the end of file  ','Produces compliation error',3),
new Question('What should be the next line in the code in order to write obj to the binary file?','  fstream file("../a.txt",ios::out|ios::binary);<br>   if(!file)<br>  {<br>       cout&lt;&lt;"File open error";<br>       exit(1);<br>  }<br>  char str[100];<br>  NumString obj(96); <br>  obj.setstr("Hello world");<br> ---------------------<br>','file&lt;&lt;obj;','file.write(obj,sizeof(obj));','You can not write an object to binary file directly','file.write((char*)&obj,sizeof(obj));',4),
new Question('How do you read an object obj from binary file a.txt?','fstream file("a.txt",ios::binary|ios::in);','file.read(&obj,sizeof(obj));<br>','file.read((char*)&obj,sizeof(obj));','file&gt;&gt;obj;','None of the above',2),
new Question('How do you move the file pointer of file being read to the begining?','  ','Close the file and open it again','file.seek(0);','file.seekg(0);','file.seekp(0);',3),
new Question('File a.txt has 3 numbers 11 22 33. What does the following program print with this file?','      fstream file("../a.txt",ios::in);<br>      if(!file)<br>      {<br>           cout&lt;&lt;"File open error";<br>            exit(1);<br>        } <br>         int n;<br>        file&gt;&gt;n;<br>        cout&lt;&lt; n&lt;&lt;" ";<br>        file.seekg(-1*sizeof(int),ios::cur);<br>        file&gt;&gt;n;<br>        cout&lt;&lt;n;<br>','11 22','11 33','11 11','None of the above',3),
new Question('How do you find the size of a file in C++?','  ','fstream file("a.txt",ios::in);<br>int size= sizeof(file);','fstream file("a.txt",ios::in|ios::ate);<br>int size= sizeof(file);','fstream file("a.txt",ios::in|ios::ate);<br>int size= fie.tellg();','None of the above',3),
new Question('What does the following program do?','int main()<br>{<br>  fstream file;<br>  file.open("test.dat", ios::out);<br>  if(file.fail())<br>  {<br>      cout&lt;&lt;"file open error";<br>      exit(1);<br>  }<br>  file&lt;&lt;"Hello world"; <br>}','Write Hello world to the file test.dat','Nothing','Gives compilation error','Prints file open error',4),
new Question('If a class MyInteger has only one int member, how do you read and write the object of this class using &gt;&gt; and &lt;&lt; operators?','class MyInteger<br>{<br>     int number;<br>/* ......*/<br>};','Not possible','MyInteger abc; cin&gt;&gt;abc; cout&lt;&lt;abc;','Overloading &gt;&gt; and &lt;&lt; with fstream as first parameter and MyInteger as second parameter','None of the above',3)];
var quiz = new Quiz(questions);populate();
