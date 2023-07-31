//mMaxQns = 11;

/******************************/
         function generateRandomNumber(limit){
		     let n = Math.floor(Math.random()*limit)
		    
		       return n    
       }
 /*********************************************************************/
 function showFourAnswers(ansarr,corrAnswer,ans,showPercentSign)
    {
	    i =0;
       l = ans.length; 
       shuffleArray(ans); 
       var ca = Number(corrAnswer);
       if (isNaN(ca)==false && Number.isInteger(ca)==false)
           corrAnswer = ca.toFixed(2);
       
		for (i = 0;i<4;i++)
		{ 		
		  
		  ansarr[i].innerHTML = ans[i];
		  console.log("Number(ans[i] "+Number(ans[i]));
		  if(isNaN(Number(ans[i]) )==false){
		  	    console.log("here here here");
		  	     var n = Number(ans[i]);
		  	     if(Number.isInteger(n)==false)
		  	         ansarr[i].innerHTML = n.toFixed(2);
		 }        
		//  if(parseInt(ans[i]) !=NaN){
		  //var flAns= parseFloat(ans[i]);
		//  if(flAns==NaN)
		 //        ansarr[i].innerHTML = ans[i];
		//   else
	//	    if(Number.isInteger(ans[i]))
	//	         ansarr[i].innerHTML = ans[i];
	//	    else     
	//	         ansarr[i].innerHTML = flAns.toFixed(2);      
		/*  if (typeof corrAnswer == 'string')
		      ansarr[i].innerHTML = ans[i];
		      else {
		      	
		             if(Number.isInteger(ans[i])==false)
		                     ansarr[i].innerHTML =ans[i].toFixed(2)
	 	           else
	 	                   ansarr[i].innerHTML = ans[i];  
	           } */
	         if(showPercentSign==true)
	              ansarr[i].innerHTML = ansarr[i].innerHTML+"%";
	            
	       ansarr[i].onclick= function(){ 
	           let clickedAns = this.innerHTML; 
	           clickedAns = clickedAns.replace('%','');//remove percent sign
	           var isEqual = clickedAns==corrAnswer?true:false;
	           var fl = Number(parseFloat(clickedAns));
	        //   if (isNaN(fl)==false) 
	           //     isEqual = Number.parseFloat(clickedAns)==Number.parseFloat(corrAnswer)?true:false;
	           if(isEqual){
			      mesg = "Correct"
			      mScore++;
			    }else {
			    	mesg = "Wrong. The correct answer is "+corrAnswer
			     }
			      showMessage(mesg,false);		      
                 mQnNum++;
			}
			  
			}
	   		 
    }
	
       
/*********************************************************************/
     function showStringAnswers(ansarr,corrAnswer,ans,showPercentSign)
    {
	    i =0;
       l = ans.length; 
       shuffleArray(ans); 
       		for (i = 0;i<4;i++)
		   { 		
		          ansarr[i].innerHTML = ans[i];       
	             if(showPercentSign==true)
	                    ansarr[i].innerHTML = ansarr[i].innerHTML+"%";
	              ansarr[i].onclick= function(){ 
	                        let clickedAns = this.innerHTML; 
	                       clickedAns = clickedAns.replace('%','');//remove percent sign
	                       var isEqual = clickedAns==corrAnswer?true:false;
	                       if(isEqual){
			                    mesg = "Correct"
			                    mScore++;
			                }else {
			    	           mesg = "Wrong. The correct answer is "+corrAnswer
			                }
			              showMessage(mesg,false);		      
                          mQnNum++;
		     	}
		    } 	   		 
    }
    /*********************************************************/
      function showQuestion(element, qnString)
    {
           
            console.log("question is"+qnString)
             element.innerHTML = "Qn "+(mQnNum+1)+". "+qnString; 
    }
        
 /********************************************/
   function showMessage(msg,quizEndDialog)
{
     console.log("Here in show message and message is "+msg);
      let modalDialogs = document.getElementsByClassName("modal");
       
      modalDialogs[0].style.display = "block"
      let messageEl = document.getElementById("message")
      messageEl.innerHTML = msg
      var button= document.getElementById("closebtn")
      if(quizEndDialog==false)
     {
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
      else
      {
	   button.onclick=function(){
		modalDialogs[0].style.display= "none" 
		       
                let restartQuiz = document.getElementById("restartScreen")
                restartQuiz.style.display = "block"
                let gridEl = document.getElementById("grid")
                gridEl.style.display = "none"
 		 
           }
      }
}
/**************************************************/ 

    /* function endQuiz()
{
    showMessage("Quiz completed <br> <br>Your score is "+mScore,true)
}     */                                                             
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
/**********************************************/
//generate a proper fraction with given maximum limit for denominator
function generateFraction(maxDen)
{
      let denr = generateRandomNumber(maxDen)+2;//not 1
      let numr = generateRandomNumber(denr);
      if(numr==0) 
           numr = 1;
      let array = [numr,denr];
      console.log("numerator is "+numr+" denominator is "+denr);
      return array;
     }
/******************************************/
function createFractionString(numerator, denominator)
 {
 	  	         
 	  str = "<sup>"+numerator+"</sup>"+ "/" +"<sub>"+denominator+"</sub>";
      return str;
}   
/*******************************************/
function generateDecimal()
{
    
     var dec = generateRandomNumber(100)
     dec = dec/100
     var intpart = generateRandomNumber(3);
     dec = dec+intpart;
     return dec.toFixed(2);
    }
  /***************************************************/

 function generateFourAnswers(correctAnswer)
 {
 	   console.log("in generatefour function Correct answer is "+correctAnswer);
     let answer2 =correctAnswer *1.3
     let answer3 = correctAnswer *0.7
     let answer4 = correctAnswer *1.1;
       
       
       
     answerArray =  [correctAnswer,answer2, answer3,answer4];
     if (Number.isInteger(correctAnswer))
         for(i=1;i<4;i++)
             answerArray[i] = Math.floor(answerArray[i]);
             
     if(answerArray[0]==answerArray[3])
         answerArray[3]++;
     if(answerArray[1]==answerArray[0])
         answerArray[1] +=3;     
     return answerArray;
     }       
  /************************************************/
          function hcf(n1,n2){
    	if(n2==1)
    	   return 1;
        if(n1==n2)
           return n1;
    	console.log("n1 is "+n1+"n2 is"+n2+"modulo is"+n1%n2)   ; 
		if(n1%n2==0)
		    return n2;
		
	   return hcf(n2,n1%n2);	        
		 
    }
    /**********************************************/
    function findlcm(n1,n2)
    {
                console.log("Before swapping n1 and n2 "+n1+" "+n2)
		if(n2>n1){
			let t = n1;
			n1 = n2;
			n2 = t;		
		}  
                console.log("After swapping n1 and n2 "+n1+" "+n2)
		let product = n1 *n2;
		let hc = hcf(n1,n2);
		let lcm = product/hc;
	   return lcm;	
    }
 /**********************************************/
 function generatePythoTriple()
 {
 	  var found=false;
 	  while(!found){
 	   var r = generateRandomNumber(30)+5;
 	   var sq = r*r;  	   
 	   
 	   var s = 0;
 	   for(s = 2;s<r;s++){
 	   for(t=1;t<r;t++)
 	      {
 	     
 	      	  if(s*s+t*t ==sq)
 	      	       {
 	      	       	  found = true;
 	      	       	  break;
 	      	       }
 	  }
 	  if(found==true)
 	     break;
 	  }
 	  if (found == true)
 	      {
 	      	    	      	return [s,t,r];
 	     } 
  }
}     		
/*****************************/
function endQuiz()
{
    var modalDialogs = document.getElementsByClassName("modal");
      
        modalDialogs[0].style.display= "none" 
		       
                var restartQuiz = document.getElementById("restartScreen")
                restartQuiz.style.display = "block"
                let gridEl = document.getElementById("grid")
                gridEl.style.display = "none"
   }
 		 
/***************************************/
function skipQuestion()
{
    mQnNum++;
    if(mQnNum==mMaxQns)
       showMessage("Quiz completed.<br>Your score is "+mScore,true);
    else   
    generateQuestion();
   }
    
 	                   
