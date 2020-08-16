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
 }var questions = [new Question("What is the output of the following program?<br><br><div class='codetext'>package helloworld;<br><br>public class IntrTest implements Runnable {<br>   <br></div>",["Override<br>   public void run() {<br>        for(int i=0;i<10;i++) {<br>              try {<br>                 this.wait(100);<br>                } catch (InterruptedException e) { <br>                    e.printStackTrace(); <br>                }<br>                System.out.println('Hi I am runnable'+i);  <br>          }<br>    }<br><br> public static void main(String args[]) {<br>          IntrTest t = new IntrTest();<br>          IntrTest t2 = new IntrTest();<br>          t.run();<br>          t2.run();<br>   }<br>}","00112233445566778899","0123456789","Compilation Error"],Run time error),
new Question("Which of the following methods of Thread class waits for a  thread to die?<br><br><div class='codetext'><br></div>",["stop","pause","join","none of the above"],3),
new Question("What will happen if we directly call the run method of a thread instead of start() method?<br><br><div class='codetext'><br></div>",["The method will run in separate thread","The method will run in calling thread","Compilation error","None of the above"],2),
new Question("How do you continue a suspeneded thread?<br><br><div class='codetext'><br></div>",["Using start()","Using resume()","Using yield","Using suspend()"],2),
new Question("Which  interface is implemented by Thread class?<br><br><div class='codetext'><br></div>",["Runnable","Collections","Handler","None of the above"],1),
new Question("Which method do you use to pause a thread for a while?<br><br><div class='codetext'><br></div>",["suspend()","pause()","sleep()","stop()"],3),
new Question("Complete the following code to start the thread.<br><br><div class='codetext'>class MyThread implements Runnable{<br>    public void run(){<br>        while(true){<br>            System.out.println('Hello world');<br>         }<br>}<br><br>class Demo{<br>    public static void main(String args[]){<br>          MyThread obj = new MyThread();<br>           -------------<br>    }<br>}<br><br></div>",["obj.run()","obj.start()","new Thread(obj).run()","new Thread(obj).start()"],4),
new Question("What is the output of the following program?<br><br><div class='codetext'>class MyThread implements Runnable{<br>     public MyThread(){<br>          System.out.println('starting thread');<br>          this.start();<br>      }<br>}<br>public class Demo{<br>   public static void main(String args[]){<br>       MyThread obj = new MyThread();<br>  }<br>}<br></div>",["No output","thread starting","Compiler error","None of the above"],3),
new Question("Which method is used to determine if a thread is still running or not?<br><br><div class='codetext'><br></div>",["isRunning()","isAlive()","alive()","None of the above"],2),
new Question("When a class extends Thread class, it must override --- method to start the thread.<br><br><div class='codetext'><br></div>",["run()","start() ","both start() and run()","init()"],1),
new Question("With reference to the code below, which of the following statements are true?<br><br><div class='codetext'>public class MyClass implements Runnable{<br>    public void run(){<br>       System.out.println('Hello world');<br>    }<br>    public static void main(String args[]){<br>           Thread cl = new Thread(new MyClass());<br>           cl.start();<br>    }<br>}<br></div>",["The program does not compile, because start() method is not implemented","The program gives a run time error","Program compiles runs and gives Hello world as output","Program does not output anything because run() method is not called. "],3),
new Question("The priority of a newly created thread is -----<br><br><div class='codetext'><br></div>",["Always equal to MIN_PRIORITY","Same as priority of parent thread","specified as parameter to constructor of Thread","None of the above"],2),
new Question("What is the output of the following program?<br><br><div class='codetext'>class ThreadSub extends Thread{  <br>    public void start(){<br>        System.out.println('Hello thread'); <br>    }<br>    public void run(){<br>        for(int i=0;i<10;i++)<br>          System.out.print(i);<br>    }<br>}<br>public class Demo{<br>    public static void main(String args[]){<br>          ThreadSub th = new ThreadSub();<br>          th.start();<br>    }<br>}<br></div>",["0123456789","Hello thread<br>0123456789","Hello thread","None of the above"],3),
];
var quiz = new Quiz(questions);populate();