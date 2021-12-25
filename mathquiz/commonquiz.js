

/**********************************************/
class Question {
   constructor(question,answer,wrong1,wrong2,wrong3)
   {
     this.question = question
     this.answer = answer
     this.wrongans1 = wrong1
     this.wrongans2 = wrong2
     this.wrongans3 = wrong3 
   }
}
/**********************************************/
let questionArray=[]
let num=0
/**********************************************/
function createObjects()
{
     for(i=0;i<qnArray.length;i++)
      {
         let qn = qnArray[i][0]
         let ans = qnArray[i][1]
         let wrong1 = qnArray[i][2]
         let wrong2 = qnArray[i][3]
         let wrong3 = qnArray[i][4]
         let obj = new Question(qn,ans,wrong1,wrong2,wrong3)
         questionArray.push(obj)
      }
    
}
/*************************************/
function printQuestion()
{ 
           let el = document.getElementById("question")
           let st = "<p>" + questionArray[num].question+"</p>"
           el.innerHTML = st 
           let answers=[questionArray[num].answer,questionArray[num].wrongans1,questionArray[num].wrongans2,questionArray[num].wrongans3]
           answers = shuffle(answers) 
           showAnswers(answers[0],answers[1],answers[2],answers[3])
        
}
/***************************************/
function startQuiz()
{
    createObjects()
    printQuestion()
}
 

/*********************/
function showPreviousQuestion()
{
     if(num>0)
     {
       num--;
       printQuestion();
     }
}
/************************/
function showNextQuestion()
{
      if(num<questionArray.length)
      {
           num++;
           printQuestion();
       }
}
/***********************************/
function showSolution()
{ 
      modalDialog = document.getElementById("dialog")
      modalDialog.style.display = "block"
      var grid = document.getElementById("message");
      grid.style.fontSize="medium";
      grid.style.textAlign="left"
      grid.innerHTML = currSolution
      var button= document.getElementById("closebtn")
      button.onclick=function(){
          modalDialog.style.display= "none"
          printQuestion()
     }
     
}
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
          printQuestion()
     }
}
/******************************************/
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
	}
/******************************************************/
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
function validate(element){
	console.log("this innerHTML is "+this.innerHTML)
	if(element.innerHTML == questionArray[num].answer)
	{
	     showMessage("Correct",false);
		 score++
		 num++               
	}else{			     
	 	 showMessage("Wrong",false);
		 num++;
	  }
			      
}
