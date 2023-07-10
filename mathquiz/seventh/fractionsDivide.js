/*division and multiplication of fractions*/

let qnNum=0
let score = 0
let maxQns = 10
let symbol = ""
let division = 2
let multiplication = 1
let operatorArr = ["X","/"]


function generateQuestion(){  
           let str = ""
	//		for(i=0;i<20;i++){
				let denr1 = generateRandomNumber(10)
				if(denr1<1)
				   denr1 = 1+generateRandomNumber(10)
			
				let numr1 = generateRandomNumber(10) 
				if(numr1==0)
				   numr1 = 1
				 
				 if(numr1 == denr1)
				     denr1++;
				     
				     
			 	let fraction1 = createFraction(numr1,denr1);
			 	//"<sup>"+numr1+"</sup>&frasl;"+"<sub>"+denr1+"</sub>"
				
				let denr2 = generateRandomNumber(10)
				if(denr2<=1)
				   denr2 = 3+generateRandomNumber(7)
				let numr2 = generateRandomNumber(denr2)
				if(numr2==0)
				   numr2 = 1
				   
				  
				 if(numr2==denr2)
				      denr2++;  
				let fraction2 = createFraction(numr2,denr2)     //"<sup>"+ numr2+"</sup>&frasl;"+"<sub>"+denr2+"</sub>"
				
				let i = generateRandomNumber(operatorArr.length);
				let option = operatorArr[i];
			 
            

			 answer= findAnswer(numr1,denr1,numr2,denr2,option);
		    simAnswer = simplify(answer[0],answer[1]);
			let ha = option;
			 
			showAnswers(simAnswer);
			 
				let question = fraction1+"&nbsp;&nbsp;&nbsp;   "+ha+"&nbsp;&nbsp;&nbsp;  "+fraction2;
				
				str = str +"<p class='question'>"+question+" = ? </p>"	;
						
				 
	//	 }   
			let element = document.getElementById("question")
			element.innerHTML =  str ;

			let elQnNum = document.getElementById("qnnum")
                        elQnNum.innerHTML = "Qn "+(qnNum+1)+"."
			/*let element1 = document.getElementById("answer");
			if(simAnswer[0]!=0){
			element1.innerHTML = simAnswer[0]+"<sup>"+ simAnswer[1]+"</sup>&frasl;"+"<sub>"+simAnswer[2]+"</sub>";
  			}else{
  						element1.innerHTML = "<sup>"+ simAnswer[1]+"</sup>&frasl;"+"<sub>"+simAnswer[2]+"</sub>";
  	
  			}*/
  			
  		 
  			 			
    }
      function generateRandomNumber(limit){
		let n = Math.floor(Math.random()*limit)
		if(n==0){
		 n = Math.floor(Math.random()*limit)
		}
		return n    
    }
    let answer=[0,0];
 function findAnswer(nr1,dr1,nr2,dr2,operator)
{
       if(operator == "X")
       {
       	   //multiplication
       	   nr = nr1*nr2;
       	   dr = dr1*dr2;
       	 //  ansarr = simplify(nr,dr)
       	   
//console.log("the values are ",nr1,dr1,nr2,dr2,operator)
     }
     else if(operator == "/"){
     	   nr = nr1*dr2;
       	   dr = dr1*nr2;
       	 //  ansarr = simplify(nr,dr)
       	  
    }
     	 		 return  [nr,dr];	 
		 
    }
    function simplify(numr,denr)
    {
    
        let factor = hcf(numr,denr);
        numr = numr/factor;
        denr = denr/factor;
     			 
		return [numr, denr] ;
		   
    }
    
    
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
    function showAnswers(corrAnswer)
    {
		let ansarr=[null,null,null,null];
		ansarr[0] = document.getElementById("btn1");
		ansarr[1] = document.getElementById("btn2");
		ansarr[2] = document.getElementById("btn3");
		ansarr[3] = document.getElementById("btn4");
		
		for (i = 0;i<4;i++)
		{
			let num = generateRandomNumber(7)+1;
			let den = generateRandomNumber(corrAnswer[1])+1;
			console.log("numerator is "+num+"denr is "+den)
			if(den==1){
			   ansarr[i].innerHTML = ""+num;
			}else{
			ansarr[i].innerHTML = createFraction(num,den)// "<sup>"+num+"</sup>"+"/"+"<sub>"+den+"</sub>";
			}
			ansarr[i].onclick= function(num,den){ 
			   			 	 
						showMessage("Wrong",false);
					
			                qnNum++;
               if(qnNum>=maxQns)
						  endQuiz()		
					}
				
			}
	   		
		    
		let btnIndex = generateRandomNumber(4);
		let str = "";
		if(corrAnswer[0]==0){
			str="0";		
		}else if (corrAnswer[1]==1){
			str = corrAnswer[0]
		}else{
		      str =createFraction(corrAnswer[0],corrAnswer[1])// "<sup>"+corrAnswer[0]+"</sup>"+ "/" +"<sub>"+corrAnswer[1]+"</sub>";
	     }  
		 
		ansarr[btnIndex].innerHTML = str;
		ansarr[btnIndex].onclick =  function(num){ 
			   			 	 
						showMessage("Correct",false);
					     score++;
			                qnNum++;
               if(qnNum>=maxQns)
						  endQuiz()	;	
		};
    }
        
/********************************************************/
  function startQuiz(){ 
	    	generateQuestion();    
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
    
    /****************************************************/
 function createFraction(numerator, denominator)
 {
 	  if(denominator==1)
 	     return numerator;
 
 	  if(numerator == denominator)
 	      return 1;
 	         
 	  str = "<sup>"+numerator+"</sup>"+ "/" +"<sub>"+denominator+"</sub>";
      return str;
}   
