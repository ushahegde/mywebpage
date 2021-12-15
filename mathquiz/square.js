let qnArray=["Square of which the following numbers has 1 in the units place? ",
                        "Which of the following numbers is a perfect square?",
                     "The square of which of the following is an odd number",
                    "How many numbers lie between squares of the following numbers? 99 and 100",
                   "Write a Pythagorean triplet whose one member is 14",
                  "What is square root of 729",
                   "Find the smallest number by which 252 should be multiplied to get perfect square",
                   "Find the square root of 4489",
                   "Find the square root of 3481",
                  "Find the length of the square whose area is 441 m<sup>2</sup>",
                  "In a right angled triangle, A is right angle and AB=6 and AC = 8. What is the value of BC"]
                          
let optionArray=["81 272 797 3853",
			"1057 4000 6084 7928",
                       "431 2826 7778 82004",
                       "100 1000 198 200",
                     
                        "3-4-14 14-48-50 14-16-18 14-5-6",
                      "23 13 27 37",
                      "2 3 7 9",
                      "63 67 57 53",
                      "59 51 61 69",
                      "441 21 19 25",
                      "5 10 9 7"]
let corrAnsArray=[0,2,0,2,1,2,2,1,0,1,1 ]
class Question{
	constructor(questionText,ansOpt1,ansOpt2,ansOpt3,ansOpt4,corrAns)
	{
		this.questionText =questionText
		this.ansOpt1 = ansOpt1;
		this.ansOpt2 = ansOpt2;
		this.ansOpt3 = ansOpt3;
		this.ansOpt4 = ansOpt4;
		this.corrAns = corrAns;
	}
} 
 let qnNum=0
let score = 0
let maxQns = 10
let qnList = []

function createQuestionList(){
	let numQns = qnArray.length
	for(i=0;i<numQns;i++)
	{
		let qn = qnArray[i]
		let str = optionArray[i]
		let options = str.split(" ")
		 
		let question = new Question(qn,options[0],options[1],options[2],options[3],corrAnsArray[i])
		qnList.push(question)
	}
}
function generateQuestion(){ 
	 if(qnNum>=qnList.length)
						endQuiz()				 	
				
     let question = qnList[qnNum]; 
	 showAnswers(question.ansOpt1,question.ansOpt2,question.ansOpt3,question.ansOpt4,question.corrAns);  
     let element = document.getElementById("question")
			element.innerHTML =  question.questionText ;

			let elQnNum = document.getElementById("qnnum")
                        elQnNum.innerHTML = "Qn "+(qnNum+1)+"."
			 
  			
  		 
  			 			
    }
       
    
    
    function showAnswers(ans1,ans2,ans3,ans4,corAnsNum)
    {
		let ansarr=[null,null,null,null];
		ansarr[0] = document.getElementById("btn1");
		ansarr[1] = document.getElementById("btn2");
		ansarr[2] = document.getElementById("btn3");
		ansarr[3] = document.getElementById("btn4");
		
		ansarr[0].innerHTML = ans1;
		ansarr[1].innerHTML = ans2;
		ansarr[2].innerHTML = ans3;
		ansarr[3].innerHTML = ans4;
		
		for (i = 0;i<4;i++)
		{ 
			if(i==corAnsNum){
				ansarr[i].onclick = function(){
				 showMessage("Correct",false);
				  score++
				qnNum++;}
               
			}else{
			    ansarr[i].onclick= function(){ 
				 showMessage("Wrong",false);
				 qnNum++;}
			      
			 }
		    }
							
			 
		  }	  
  
		  
/********************************************************/
  function startQuiz(){
	  createQuestionList()
	  qnNum = 0
	  generateQuestion()  
    }
   /*************************************************/
function showMessage(msg,quizEndDialog)
{
      let modalDialog = document.getElementById("dialog")
      modalDialog.style.display = "block"
      var grid = document.getElementById("message");
      grid.innerHTML = msg
      var button= document.getElementById("closebtn")
      if(quizEndDialog==false)
      {
	      button.onclick=function(){
		  modalDialog.style.display= "none" 
		  generateQuestion()
	     }
      }
      else
      {
	   button.onclick=function(){
		modalDialog.style.display= "none" 
                let restartQuiz = document.getElementById("restartScreen")
                restartQuiz.style.display = "block"
                let gridEl = document.getElementById("grid")
                gridEl.style.display = "none"
 		 
           }
      }
	
     
}
/**************************************************/ 
function restartQuiz()
{
   score=0
   qnNum =0
   let restartQuiz = document.getElementById("restartScreen")
   restartQuiz.style.display = "none"
   let gridEl = document.getElementById("grid")
   gridEl.style.display = "block"
   generateQuestion()
}
    
/******************************************************/
function endQuiz()
{
    showMessage("Quiz completed <br> Your score is "+score,true)
}
    
