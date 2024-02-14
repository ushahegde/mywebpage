mMaxQns = 10
mQnNum =0
//qnNum = 0
r = 0 
 function generateQuestion()
{
     
     if(mQnNum>=mMaxQns){
        showQuizEndMessage("Quiz completed. <br>Your score is "+mScore);
        return;
      }  
     question = questionArray[mQnNum];   
    
     showQuestion(question);
     
    }
 /************************************************/  
 function showQuestion(question)
 {
 	qnString = question[0];
 	console.log("qn string is",qnString);
 	
 	var qnNum = document.getElementById("qnNum");
 	qnNum.innerHTML=mQnNum+1+".";
 	
 	var qnEl = document.getElementById("question");
 	 
 	qnEl.innerHTML = qnString;
    answerArray= [question[1],question[2],question[3]];
 	correctAnswerNumber = question[4];
 	correctAnswer = question[correctAnswerNumber];
 	imageName = question[5];

 	if(mNumAnswers == 4){
 		console.log("meeee hereeee");
 		answerArray= [question[1],question[2],question[3],question[4] ];
 	    correctAnswerNumber = question[5];
 	    correctAnswer = question[correctAnswerNumber];
 	    imageName = question[6];
 	
    } 
 	/*show answers*/
 	var btnArray = [null,null,null,null];
      for(i=0;i<4;i++)
        { var m = i+1;
          btnArray[i] = document.getElementById("btn"+m);
          
        }
 	for (i = 0;i<mNumAnswers;i++)
	{ 		
		  if(answerArray[i].length ==0)
		  {
		  	btnArray[i].style.display = 'none';
		  }else{
		  	 btnArray[i].style.display = 'inline';
		  }	 	
		  btnArray[i].innerHTML = answerArray[i];
		  btnArray[i].onclick = function(){ 
		        let clickedAns = this.innerHTML; 
		        if(typeof correctAnswer === 'string' ){
	             clickedAns =  clickedAns.replace(/<[^>]+>/g, '');
	             correctAnswer = correctAnswer.replace(/<[^>]+>/g, '');
	             } else if(typeof correctAnswer === 'number')
	             {
	             	correctAns = correctAnswer.toFixed(2)
	             	clickedAns = Number(clickedAns).toFixed(2)
	             }
	 
	            console.log("The correct answer is "+correctAnswer);
	            console.log("The clicked answer is "+clickedAns);
	           
	                
	           if(clickedAns==correctAnswer){
			      mesg = "Correct"
			      mScore++;
			    }else {
			    	mesg = "Wrong. The correct answer is "+correctAnswer;
			     }
			      showMessage(mesg,false);		      
                 mQnNum++; 		 
                 
              } 
        } 
       // imageName = question[5];
        console.log("image name is"+imageName)
        elementImg = document.getElementById("image");
        if(imageName!=null)
        {
        	
        	elementImg.src = imageName;
        	elementImg.style.display = "inline";
       }
       else{
       	  elementImg.style.display = "none";
      }	  
          	
 	
 }
 /****************************************/
 function restartQuiz()
{
   mScore=0
  mQnNum =0
   let restartQuiz = document.getElementById("restartScreen")
   restartQuiz.style.display = "none"
   let gridEl = document.getElementById("grid")
   gridEl.style.display = "block"
   generateQuestion()
}
/********************************************/
   function showMessage(msg,quizEndDialog)
{
       let modalDialogs = document.getElementsByClassName("modal");
       
      modalDialogs[0].style.display = "block"
      let messageEl = document.getElementById("message")
      messageEl.innerHTML = msg
      var button= document.getElementById("closebtn")
      
	      button.onclick=function(){
	         console.log("button clicked");
		  modalDialogs[0].style.display= "none" 
		/*  if(mQnNum>=mMaxQns)
		      endQuiz()
		   else {*/
		      generateQuestion()
		  //   }
	     }
      }

 /**************************************************************/
 function startQuiz()
 {
 	mScore = 0;
 	mQnNum = 0;
 	mMaxQns = 10;//questionArray.length;
 	qnNum = 0;
 	shuffleArray(questionArray);
 	generateQuestion();
 }
 /***********************************************/
 function showQuizEndMessage(msg)
 {
 	   let modalDialogs = document.getElementsByClassName("modal");
      modalDialogs[0].style.display = "block"
      let messageEl = document.getElementById("message")
      messageEl.innerHTML = msg
      var button= document.getElementById("closebtn")
      
	      button.onclick=function(){ 
		  modalDialogs[0].style.display= "none" 
		          let restartQuiz = document.getElementById("restartScreen")
                restartQuiz.style.display = "block"
                let gridEl = document.getElementById("grid")
                gridEl.style.display = "none"

	     }
      }

 /**************************************************************/
 function generateRandomNumber(limit){
		     let n = Math.floor(Math.random()*limit)
		    
		       return n    
       }

 /************************************************/
function shuffleArray(array)
{
   
    let i =0;
    let l = array.length;
    for(i=0;i<10;i++)
    {
    	 let m = generateRandomNumber(l);
    	 let n = generateRandomNumber(l);
    	// let n = l-m-1;
    	 let temp = array[m];
    	 array[m] = array[n];
    	 array[n] = temp;
   }
 //  return array;
} 
 /******************************************************/
	    
   function restartQuiz()
{
   mScore=0
  mQnNum =0
   let restartQuiz = document.getElementById("restartScreen")
   restartQuiz.style.display = "none"
   let gridEl = document.getElementById("grid")
   gridEl.style.display = "block"
   generateQuestion()
}