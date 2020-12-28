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
            var bt = document.getElementById("btn"+i);
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
new Question('Which of the following statements opens a file  myfile.txt, for reading?','  ','ifstream file("myfile.txt");','ifstream file; NLL file.open("myfile.txt");','fstream("myfile.txt",ios::in);','Any of the above',4),
new Question('How do you check if file open operation has failed? ','fstream file("myfile.txt",ios::in); NLL if(-----------) NLL    cout&lt; &lt; "file open error";','fstream.fail()','!fstream','Either of the above','  ',3),
new Question('How do you open a file for both reading and writing?','  ','fstream file("a.txt");','fstream file("a.txt",ios::in&&ios::out);','fstream file("a.txt",ios::in|ios::out);','Not possible',3),
new Question('What does the following program do?',' int main()   NLL  {   NLL       fstream file("myfile2.txt",ios::out);	  NLL       for(int i=0;i&lt; 10;i++) NLL                file&lt; &lt; i; NLL       return 0; NLL  }','Compilation error','Displays the numbers 0 to 9 on screen','Writes the numbers 0 to 9 to the file myfile2.txt','None of the above',3),
new Question('What is the output of this program, if the file a.txt contains "Hello world" and "Goodbye world" in two lines?','int main() NLL { NLL     ifstream file("a.txt"); NLL    char str[100]; NLL    while(!file.eof()) NLL    { NLL        file&gt;&gt;str; NLL       cout&lt; &lt; str; NLL    } NLL    return 0; NLL  } NLL  ','Hello world NLL Goodbye world','HelloworldGoodbyeworld','HelloworldGoodbyeworldworld','None of the above',3),
new Question('What does the following program do?','int main()   NLL  {   NLL       fstream file("../a.txt",ios::app); NLL       if(!file) NLL      { NLL            cout&lt; &lt; "File open error"; NLL            exit(1); NLL       } NLL      char str[100]; NLL      for(int i=0;i&lt; 10;i++) NLL      { NLL          cin&gt;&gt;str; NLL          file&lt; &lt; str; NLL       } NLL       return 0; NLL  }','Creates a new file a.txt and writes 10 strings to it.','Opens a file a.txt and reads 10 strings from it','Opens a file a.txt if it exists. If not, creates the file and then writes 10 strings to the end of file  ','Produces compliation error',3),
new Question('What should be the next line in the code in order to write obj to the binary file?','  fstream file("../a.txt",ios::out|ios::binary); NLL    if(!file) NLL   { NLL        cout&lt; &lt; "File open error"; NLL        exit(1); NLL   } NLL   char str[100]; NLL   NumString obj(96);  NLL   obj.setstr("Hello world"); NLL  --------------------- NLL ','file&lt; &lt; obj;','file.write(obj,sizeof(obj));','You can not write an object to binary file directly','file.write((char*)&obj,sizeof(obj));',4),
new Question('How do you read an object obj from binary file a.txt?','fstream file("a.txt",ios::binary|ios::in);','file.read(&obj,sizeof(obj)); NLL ','file.read((char*)&obj,sizeof(obj));','file&gt;&gt;obj;','None of the above',2),
new Question('How do you move the file pointer of file being read to the begining?','  ','Close the file and open it again','file.seek(0);','file.seekg(0);','file.seekp(0);',3),
new Question('File a.txt has 3 numbers 11 22 33. What does the following program print with this file?','      fstream file("../a.txt",ios::in); NLL       if(!file) NLL       { NLL            cout&lt; &lt; "File open error"; NLL             exit(1); NLL         }  NLL          int n; NLL         file&gt;&gt;n; NLL         cout&lt; &lt;  n&lt; &lt; " "; NLL         file.seekg(-1*sizeof(int),ios::cur); NLL         file&gt;&gt;n; NLL         cout&lt; &lt; n; NLL ','11 22','11 33','11 11','None of the above',3),
new Question('How do you find the size of a file in C++?','  ','fstream file("a.txt",ios::in); NLL int size= sizeof(file);','fstream file("a.txt",ios::in|ios::ate); NLL int size= sizeof(file);','fstream file("a.txt",ios::in|ios::ate); NLL int size= fie.tellg();','None of the above',3),
new Question('What does the following program do?','int main() NLL { NLL   fstream file; NLL   file.open("test.dat", ios::out); NLL   if(file.fail()) NLL   { NLL       cout&lt; &lt; "file open error"; NLL       exit(1); NLL   } NLL   file&lt; &lt; "Hello world";  NLL }','Write Hello world to the file test.dat','Nothing','Gives compilation error','Prints file open error',4),
new Question('If a class MyInteger has only one int member, how do you read and write the object of this class using &gt;&gt; and &lt; &lt;  operators?','class MyInteger NLL { NLL      int number; NLL /* ......*/ NLL };','Not possible','MyInteger abc; cin&gt;&gt;abc; cout&lt; &lt; abc;','Overloading &gt;&gt; and &lt; &lt;  with fstream as first parameter and MyInteger as second parameter','None of the above',3)];
var quiz = new Quiz(questions);populate();

