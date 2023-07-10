let mAnswer = 0;
let mQnNum = 0;
let mMaxQns = 10
let mScore =0

questionArray1 = //Find the number if ...
[
   [" If you add "," to  "," times a number and you get "],
   [" If you take "," of a number and subtract by "," and you get "],
   [" If you subtract" ,"  the number from "," the result is "],
   [" If you add "," to the number and divide the sum by "," and you get "]
   
 ];
 question1Common = ". Find the number.";
      
questionArray2=
      [
      ["Irfan says he has ","  marbles more than "," times the marbles Parmit has. Irfan has ", " marbles. How many marbles does Parmit have?"],
      ["Laxmis father is "," years old. He is ","  years older than ","  times Laxmis age. What is Laxmis age?"],
      ["In an isosceles triangle, the base angles are equal. If the vertex angle is ","  what are the base angles of triangle? The sum of angles of a triangle is 180."]
      ];
  /********************************/
 function generateQuestion()
   {
      	   r = generateRandomNumber(2);//we have two type of questions
      	   if(r==0)
      	   {
      	   	    index = generateRandomNumber(questionArray1.length)
      	   	    if(index==0){
      	   	    	 str = generateQuestion11() 	
      	   	    }else if(index==1){
      	   	    	 str = generateQuestion12();
      	   	    } else if (index==2){
      	   	    	str = generateQuestion13();
      	   	    } else if(index==3){
      	   	    		str = generateQuestion14();
      	   	    }
      	   	     question =  str+ question1Common;
      	   	    
      	 }else if(r==1)
      	 {
      	     index =generateRandomNumber(questionArray2.length)
      	     switch(index)
      	     {
      	           case 0: str = genQuestion21(0);
      	           break;
      	           case 1: str = genQuestion21(1);
      	           break;
      	           case 2: str = genQuestion23();
      	           break;
      	    }
      	    question =str;
      	   }
      	  showQuestion(question);       	   	    
      	   showFourAnswers(mAnswer)
   }
       /******************************/
       function generateRandomNumber(limit){
		     let n = Math.floor(Math.random()*limit)
		       return n    
       }
       /********************************/
function generateQuestion11()
 {
       	    n1 = generateRandomNumber(30);
       	    n2 = generateRandomNumber(5)+2;
       	    x = generateRandomNumber(30);
       	    product = x*n2;
       	    sum = product+n1;
       	    str = questionArray1[0][0]+n1+questionArray1[0][1]+n2+questionArray1[0][2]+sum;
       	    mAnswer = x
       	    return str;
 }
 /*******************************************************/
 function generateQuestion12()
 {
 	 fractionArray = ["one half","one third","two thirds","one fourth","three fourth","one fifth"];
 	 fractionIndex = generateRandomNumber(fractionArray.length)
 	 
 	 x = generateRandomNumber(20) 
 	 switch(fractionIndex)
 	 {
 	 	 case 0: x = x*2;//the number must be divisible by 2
 	 	             fraction = 1/2;
 	 	             break;
 	 	  case 1: x = x*3;//divisible by 3
 	 	             fraction = 1/3;
 	 	              break;
 	 	  case 2: x = x*3; 
 	 	             fraction = 2/3;
 	 	              break;
 	 	   case 3: x = x*4;
 	 			    fraction = 1/4;
 	 	                break;
 	 	    case 4:  x = x*4;
 	 	    		fraction = 3/4;
 	 	                break;
 	 	     case 5: x = x*5;
 	 	               fraction = 1/5;
 	 	                break;
 	 	   }
 	 	   
 	   	 	   product = x *fraction; 
 	 	   subt = generateRandomNumber(product ) +2 	 	  
 	 	    difference = product - subt; 
 	 	   string = questionArray1[1][0]+fractionArray[fractionIndex]+questionArray1[1][1]+subt+questionArray1[1][2]+difference;
 	 	   mAnswer = x;
 	 	   return string;
 }
 /*******************************************************/
 function  generateQuestion13()
 {
     timesArray = [" twice "," thrice "," four times "," five times "];
 	 fractionIndex = generateRandomNumber(timesArray.length)
 	 
 	 x = generateRandomNumber(20)+5
 	 console.log("index is "+fractionIndex)
 	 switch(fractionIndex)
 	 {
 	 	 case 0:   factor = 2;;
 	 	             break;
 	 	  case 1:factor  = 3;
 	 	              break;
 	 	  case 2:  factor = 4;
 	 	              break;
 	 	   case 3:factor = 5;
 	 	                break;
 	 	   
 	 	   }
 	 	   product = x *factor;
 	 	   
 	 	   subt = generateRandomNumber(product)+2;
 	 	   
 	 	   difference = product - subt;
 	 	   
 	 	   string = questionArray1[2][0]+timesArray[fractionIndex]+questionArray1[2][1]+subt+questionArray1[2][2]+difference;
 	 	   mAnswer = x;
 	 	   return string;
 	 	}
 /*******************************************************/
 
 
 //todo complete this question
 function  generateQuestion14(){
 	      denr = generateRandomNumber(10)+2
 	      
 	      x = generateRandomNumber(50)+2;
 	      
 	      
 	      
 	      addend = generateRandomNumber(50)+2;
 	      sum = x+addend;
 	      
 	      quotient = sum/denr;
 	      if( (sum%denr)!=0)
 	           {
 	               addend = addend - sum%denr;
 	               sum = x + addend;
 	               quotient = sum/denr;
 	              }
 
 	 	   
 	 	   string = questionArray1[3][0]+addend+questionArray1[3][1]+denr+questionArray1[3][2]+quotient;
 	 	   mAnswer = x;
 	 	   return string;
 	          
 	 }
   /*********************************************************************/
   function showFourAnswers(corrAnswer)
    {
		let ansarr=[null,null,null,null];
		ansarr[0] = document.getElementById("btn1");
		ansarr[1] = document.getElementById("btn2");
		ansarr[2] = document.getElementById("btn3");
		ansarr[3] = document.getElementById("btn4");
		
		
		for (i = 0;i<4;i++)
		{
		    n = generateRandomNumber(50)
		   ansarr[i].innerHTML = n;
	       ansarr[i].onclick= function(num,den){ 
			      showMessage("Wrong",false);
                 mQnNum++;
                 	
			       }
				
			}
	   		
		    
		let btnIndex = generateRandomNumber(4);
		let str = ""+corrAnswer;
				 
		ansarr[btnIndex].innerHTML = str;
		ansarr[btnIndex].onclick =  function(num){  						
		    showMessage("Correct",false);
			 mScore++;
		    mQnNum++;
            
		}
    }
    /*********************************************************/
    function showQuestion(qnString)
    {
            qn = document.getElementById("question") 
             qn.innerHTML = "Qn "+(mQnNum+1)+". "+qnString; 
    }
        
 /***************************************/       
 function startQuiz()
 {
    let mQnNum = 0;
    let mAnswer = 0;
    let mScore = 0;
    generateQuestion();
}
/****************************************/ 
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
		  if(mQnNum>=mMaxQns)
		      endQuiz()
		   else   
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

   function endQuiz()
{
    showMessage("Quiz completed <br> <br>Your score is "+mScore,true)
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
        	   
   /**************************************************/ 
   function genQuestion21(which)
   {
     
       let pa = generateRandomNumber(50);
       let x = generateRandomNumber(5)+2
       let y = generateRandomNumber(20)
       
       let ir = pa*x + y
       console.log("which is "+which)
       mAnswer = pa
       let string = ""
       if(which==0){
              return string = questionArray2[0][0]+y+questionArray2[0][1]+x+questionArray2[0][2]+ir+questionArray2[0][3]
       }else if(which==1){
             return  string = questionArray2[1][0]+ir+questionArray2[1][1]+y+questionArray2[1][2]+x+questionArray2[1][3]
          }
          
        
      }
   /**************************************************/ 
   function genQuestion23()    
   {
       let v = generateRandomNumber(90)
       if(v%2!=0)//the angle should be even
            v++ ;
       let diff = 180 - v;
       let base = diff/2;
       mAnswer = base;
       let string = questionArray2[2][0]+v+questionArray2[2][1]
       return string;     
       
   }      	    