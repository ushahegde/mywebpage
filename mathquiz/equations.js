wordQuestionsArray = [
["One fifth of a number minus 4 gives 3",35],
["3 added to three fourth of a number, gives you 21",24],
["Subtract thrice the number from 50, gives you  8",14],
["Subtracting 11 from twice the number gives you 15",13],
["I think of a number, add 19 to it and divide the sum by 5, I get 5",6],
["I take away 7 from 5/2 of a number, I get a result of 23",12],
["Twice the number subtracted from 10 gives 60",35]
]


function startQuiz()
{
   generateFiveQuestions(); 
   }
function generateFiveQuestions()
{
    qnArray = document.getElementsByClassName("question");
    inputArray = document.getElementsByClassName("answer");
    ans = [0,0,0,0,0];
    for(i=0;i<qnArray.length;i++)
    {
    	x = Math.floor(Math.random() * 15)+1;
    	c = Math.floor(Math.random() *10)+1;
    	m = Math.floor(Math.random()*10)+1;
    	console.log("x is"+x)
    	y = m*x+c;
    	equation = y +"= "+m+"x + "+c;
    	qnArray[i].innerHTML = equation;
    	ans[i]=x;
    	inputArray[i].answerParam = x;
    	inputArray[i].addEventListener("keyup",function(event){validateAns(event);});
  }
 } 
 
 /*********************************/
function validateAns(event)
{
  if(event.keyCode==13){
     answerEntered= event.target.value;
     answerValue = event.target.answerParam;
     console.log("answervalue = "+answerValue);
     console.log("answer entered is ="+answerEntered);
    // let el = document.getElementById("answer")     
    // let answerEntered = el.value
     //console.log("Correct answer is "+answerValue)
     //console.log("Answer entered is "+answerEntered)
     if (answerEntered == answerValue)
        showMessage("CORRECT")
     else
        showMessage("WRONG")
      
  }
}	
 /****************************************/
    	/****************************************/
function showMessage(message)
{
      modalDialog = document.getElementById("dialog")
      modalDialog.style.display = "block"
      var grid = document.getElementById("message");
      grid.innerHTML = message
      grid.style.fontSize="x-large"
      var button= document.getElementById("closebtn")
      button.onclick=function(){
          modalDialog.style.display= "none"
       //   printQuestion()
     }
}

function showUnknownNumberQns()
{
    element = document.getElementById("heading");
    element.innerHTML = "Find the unknown number in these cases"
     qnArray = document.getElementsByClassName("question");
    inputArray = document.getElementsByClassName("answer");
    ans = [0,0,0,0,0];
    for(i=0;i<qnArray.length;i++)
    {
        qnArray[i].innerHTML = wordQuestionsArray[i][0]
        inputArray[i].answerParam = wordQuestionsArray[i][1];
    	inputArray[i].addEventListener("keyup",function(event){validateAns(event);});
    }  
    nextButton = document.getElementById("next");
    nextButton.style.visibility = "hidden";   	
}
function showNextSet()
{
     showUnknownNumberQns();
  }