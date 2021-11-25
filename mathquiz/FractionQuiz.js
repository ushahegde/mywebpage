let qnNum=0
let score = 0
let maxQns = 10
function generateQuestion(){ 
          operatorArr = ["+","-"];
             
           let str = ""
	//		for(i=0;i<20;i++){
				let denr1 = generateRandomNumber(10)
				if(denr1<=1)
				   denr1 = 2+generateRandomNumber(7)
				let numr1 = generateRandomNumber(denr1) 
				if(numr1==0)
				   numr1 = 1
				let fraction1 = "<sup>"+numr1+"</sup>&frasl;"+"<sub>"+denr1+"</sub>"
				
				let denr2 = generateRandomNumber(10)
				if(denr2<=1)
				   denr2 = 3+generateRandomNumber(7)
				let numr2 = generateRandomNumber(denr2)
				if(numr2==0)
				   numr2 = 1
				let fraction2 ="<sup>"+ numr2+"</sup>&frasl;"+"<sub>"+denr2+"</sub>"
				
				let i = generateRandomNumber(operatorArr.length);
				let operator = operatorArr[i];
			 
                         
			 answer= findAnswer(numr1,denr1,numr2,denr2,operator);
		//	simAnswer = simplify(answer[0],answer[1]);
			let ha = operator;
			 
			showAnswers(answer);
			 
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
    	   if(  (operator=="+")||(operator=="-"))
    	   {
    	   	let lcm = 0;
                console.log("in find answer dr1 and dr2 are "+dr1+" "+dr2)
    	   	if(dr1==dr2)
    	   	   lcm = dr1;
    	   	else   
		  lcm = findlcm(dr1,dr2);
				   
		 console.log("lcm of denominators is"+lcm);
                 let numr = 0 
                 console.log("numr1 is "+ ((lcm*nr2)/dr2))
                 let term1 = lcm*nr1 / dr1
                 let term2 = lcm*nr2 / dr2
	         console.log("term1 is "+term1+" and term2 is "+term2)
		 if(operator=="+"){
				       numr = term1 + term2
		  }else{
				       numr = 	term1 - term2;	
		  }
		 let denr = lcm;
		 console.log("The numerator is "+numr);
		 //let frArr = simplify(numr,denr);
		 return [numr,denr];
								    	   
    	   }
			 
		 
    }
    function simplify(numr,denr)
    {
    
    	let intPart = Math.floor(numr/denr);
    	let numrNew = numr%denr;
		let factor = hcf(numrNew,denr);
		
		let numAns = numrNew/factor;
		let denAns =  denr/factor;
			 
		return [intPart,numAns,denAns] ;
		   
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
			
			ansarr[i].innerHTML =  "<sup>"+num+"</sup>"+"/"+"<sub>"+den+"</sub>";
			ansarr[i].onclick= function(num,den){ 
			   let n = this.innerHTML; 
			   n= n.replace("<sup>","");
			   n = n.replace("<sub>","");
			     n= n.replace("</sup>","");
			   n = n.replace("</sub>","");
			   
			   nArr = n.split("/");
			   num = nArr[0];
			   den = nArr[1];
				console.log("here in button click and answer[0]"+answer[0]+"num is"+num);
				
				let el = document.getElementById("correctOrWrong");
					if(num==0 && answer[0]==0){
						showMessage("Correct",false);
                                                score++	
					}
		
					else if(num==answer[0]&&den==answer[1]){		
						showMessage("Correct",false);
                                                score++	
					} else{
						showMessage("Wrong",false);
					}
			                qnNum++;
                                        if(qnNum>=maxQns)
						 
					   endQuiz()		
				
			};
	   }		
		    
		let btnIndex = generateRandomNumber(4);
		let str = "";
		if(corrAnswer[0]==0){
			str="0";		
		}else{
		      str = "<sup>"+corrAnswer[0]+"</sup>"+"/"+"<sub>"+corrAnswer[1]+"</sub>";
	     }  
		 
		ansarr[btnIndex].innerHTML = str;
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
    
