 qnArray =  [ "What is the complementary angle of  "  ,
 "What is the supplementary angle of  "  ,
 "What is the measure of angle which is complementary to itself?"  ,
 "What is the measure of angle which is supplementary to itself?"  ,
 "An angle x is greater than 45. Its complementary angle will be  ----- than 45."  ,//less greater equal
 "Which of the following set of angles are  complementary to each other?"  , 
 "Which of the following sets of angles are supplementary to each other?"  ,
 "For an angle, its complementary angle is twice in measure. What is the angle?",
 "What is the angle whose supplementary angle is thrice its measure?",
 "If an angle x is complementary to y and supplementary to z, then the difference  of z and x is  ----",//90 180 360 0
 "In the diagram, if angle y is $a, what is the value of angle x?",
 "In the diagram, if angle x is $a, what is the value of angle y?",
 "If in the diagram shown, lines A and B are  parallel.  If angle  p  is $a, what is the measure of angle x? ",
 "If in the diagram shown, lines A and B are  parallel.  If angle  p  is $a, what is the measure of angle a? ",
 "If in the diagram shown, lines A and B are  parallel.  If angle  p  is $a, what is the measure of angle z? ",
 ];
 
qnTrans = 
["If in the diagram shown, lines A and B are  parallel.  If angle  ", " is "," what is the measure of angle "];
indArr = [0,1,2,3,4,5,6,7,8,9,10];
let mAnswer =0;
let mQnNum = 0;
let mMaxQns = 10;// qnArray.length+1
const COMPLI = 1;
const TRANS = 0;
const SUPPLI = 2;
function startQuiz()
{
    mScore = 0;
    mQnNum =0; 
   // shuffleArray(indArr)
     generateQuestion()
      }

 /*************************************************/
 function generateQuestion()
 {
     if(mQnNum >=mMaxQns )
      {  showMessage("Quiz completed. <br>Your score is "+mScore,true);return;}
          
 let index = generateRandomNumber(qnArray.length);
 
 	let question = qnArray[index];
 	
 	let angle = generateRandomNumber(90);
 	 	 console.log("index is "+index)
  	hideImage()
 	switch(index)
 	{
 		case 0: question = question+" "+angle+" ?";
 		             mAnswer = 90-angle;  
 		             answerArray =[ mAnswer,generateRandomNumber(90),generateRandomNumber(90),generateRandomNumber(90)];
 		                break;
 		case 1: question = question +" "+angle+" ?";
 		             mAnswer = 180 - angle;
 		             answerArray =[ mAnswer,generateRandomNumber(90),generateRandomNumber(90),generateRandomNumber(90)];
 		             break;
 		 case 2: mAnswer = 45;
 		             answerArray =[ mAnswer,generateRandomNumber(90),generateRandomNumber(90),generateRandomNumber(90)];
 		 		     break;
 		 case 3: mAnswer = 90;
 		             answerArray =[ mAnswer,generateRandomNumber(90),generateRandomNumber(90),generateRandomNumber(90)];
 		             break;
 		  case 4: answerArray = ["less","greater","equal","Can not say"];
 		               mAnswer = "less";
 		               break;
 		  case 5:  answerArray = [ "90 10","30 60","40 45","20 80"];
 		                mAnswer = "30 60";break;
 		  case 6:   answerArray = [ "90 100","30 160","145 35","120 80"];
 		                mAnswer = "145 35";   break;
 		   case 7:  mAnswer = 30;
 		                answerArray =[ mAnswer,generateRandomNumber(90),generateRandomNumber(90),generateRandomNumber(90)];
 		   				break;
 		    case 8: mAnswer = 45;
 		                answerArray =[ mAnswer,generateRandomNumber(90),generateRandomNumber(90),generateRandomNumber(90)];break;
 		    case 9: answerArray=[90,180,360,0];
 		                 mAnswer = 90;
 		                 break;
 		   /* case 10: question =   generateTransverseQuestion();
 		                answerArray = [mAnswer,generateRandomNumber(180),generateRandomNumber(90),generateRandomNumber(180)];
 		                showImage(TRANS);
 		                break;   */
 		    case 10:  angle1 = generateRandomNumber(60)+5;
 		                  question = question.replace("$a",angle1);
 		                  mAnswer = 90 - angle1;
 		                  answerArray = [mAnswer,generateRandomNumber(angle1),generateRandomNumber(mAnswer),generateRandomNumber(45)];
 		                  showImage(COMPLI);
 		                  break;   
 		    case 11: angle1 = generateRandomNumber(90)+95;
 		                  question = question.replace("$a",angle1);
 		                   y = 180 - angle1;
 		                   mAnswer = y;
 		                   answerArray =  [mAnswer,generateRandomNumber(angle1),generateRandomNumber(mAnswer),generateRandomNumber(45)];
 		                   showImage(SUPPLI);
 		                   break;   
 		      case 12: angleP = generateRandomNumber(80)+5;     
 		                   mAnswer = angleP;
 		                   question = question.replace("$a",angleP);
 		                   answerArray = [mAnswer,generateRandomNumber(180),generateRandomNumber(90),generateRandomNumber(180)];
 		                   showImage(TRANS);
 		                   break;
 		        case 13: angleP = generateRandomNumber(80)+5;     
 		                   mAnswer = angleP;
 		                   question = question.replace("$a",angleP);
 		                   answerArray = [mAnswer,generateRandomNumber(180),generateRandomNumber(90),generateRandomNumber(180)];
 		                   showImage(TRANS);
 		                   break;   
 		            case 14: angleP = generateRandomNumber(80)+5;     
 		                   mAnswer = 180-angleP;
 		                   question = question.replace("$a",angleP);
 		                   answerArray = [mAnswer,generateRandomNumber(180),generateRandomNumber(90),generateRandomNumber(180)];
 		                   showImage(TRANS);
 		                   break;              
       }	                 				                                          		                                
 		            
 	 let qnElement = document.getElementById("question")
 	 
 	 showQuestion(qnElement,question);
  
  let answerButton = [null,null,null,null];//the four answer buttons
  /**find the buttons*/
  answerButton[0] = document.getElementById("btn1");
  answerButton[1] = document.getElementById("btn2");
  answerButton[2] = document.getElementById("btn3");
  answerButton[3] = document.getElementById("btn4");
   showFourAnswers(answerButton,mAnswer,answerArray,false);
}
/*************************************************************************/
//not used currently
/*function generateTransverseQuestion()
{
       let r = generateRandomNumber(4);
       let angle = generateRandomNumber(90);
       switch (r)
       {
       	      case 0: str1 = "p";
       	                   str2 = "a";
       	                   mAnswer = angle;
       	                   break;
       	                   
       	      case 1: str1 =   "x"; str2 = "q";
       	                 mAnswer = 180-angle; break;
       	      
       	      case 2: str1 = "a"; str2 = "s"; mAnswer = angle; break;
       	      
       	      case 3: str1 = "s"; str2 = "r";mAnswer = 180-angle; break;
       	   }
       	   question  = qnTrans[0]+str1+qnTrans[1]+angle+qnTrans[2]+str2+" ?"; 
       	   return question;                         
}*/
/**************************/
function showImage(which)
{ 
   let el = document.getElementById("trimage");
   if(which==TRANS)
          el.src = "tran.png"
   else if(which ==COMPLI)
           el.src = "compli.png"
    else if(which == SUPPLI)
           el.src = "suppli.png";       
   el.style.display = "inline";
}
/*****************************/
function hideImage()
{
 let el = document.getElementById("trimage");
   el.style.display = "none";
}