class Measure
{
	constructor(toname,fromname,conversion)
	{
		this.fromname = fromname;
		this.toname = toname;
		this.conversion = conversion;	
	} 
 }
 var answer = 0;
 var questionNum = 0
 var score = 0;
 var TotalQns = 10
 var objects = [new Measure("rupee","paisa",100),
 new Measure("kilogram","grams",1000),
 new Measure("meter","centimeter",100),
 new Measure("kilometer","meter",1000),
 new Measure("Fraction")
 ];
 var modalDialog=document.getElementById("dialog")
 var fractionDenr = [2,4,5,10,25,50,100]
/********************************************************/
 function generateRandomNumber(limit){
		var n = Math.floor(Math.random()*limit);
		 
		return n    
    }
/********************************************************/
  function startQuiz(){
		createQuestion();    
    }
/********************************************************/
 function createQuestion()
 {
	 var n = generateRandomNumber(objects.length);
	 var object = objects[n];
         var answerSuffixEl = document.getElementById("answersuffix");
	 var ansEl = document.getElementById("answer")
         ansEl.value = ""
         if(object.toname=="Fraction")
         {
            var whole = generateRandomNumber(25)
            var d1 = generateRandomNumber(fractionDenr.length)  
            
            var denr = fractionDenr[d1]
            var numr = generateRandomNumber(denr)
            var question = whole+" "+"<sup>"+numr+"</sup>&frasl;<sub>"+denr+"</sub> ="
            answer = 1.0* numr/denr + whole
            console.log("answer is "+answer)
 	    answerSuffixEl.innerHTML = "";
 	
         }else{
         
         var quantity = generateRandomNumber(10)
         if(quantity==0)
                qunatity = 2.35
	  quantity = generateRandomNumber(object.conversion/10 * quantity);
	 var quantityLarger = generateRandomNumber(10)+1;
	 var question = quantityLarger+" "+object.toname+" and "+quantity+" "+object.fromname+" = ";
	 var ansSuffix = object.toname;
	 answer = quantityLarger + quantity/object.conversion;
 	 var answerSuffixEl = document.getElementById("answersuffix");
	 answerSuffixEl.innerHTML = ansSuffix;
         }
	 var questionEl = document.getElementById("decimalquestion");
         var qnnum = document.getElementById("qnnum")
         qnnum.innerHTML = "Qn"+(questionNum+1)+"."
	 questionEl.innerHTML = question;
	
	 document.getElementById("answer").focus()
 }
 function answerkeyclicked(event)
 {
 	 if(event.keyCode==13){
		var ans = document.getElementById("answer").value
		if( Math.abs(ans-answer)<0.00001)
		{
			showMessage(" Correct ")
                        score++		
		} 	 else{
			showMessage(" Wrong")		

		}
		 questionNum++;
	   if(questionNum<=TotalQns){
	       	   
	      setTimeout(createQuestion,1000);
	   }
	   else{
	   	showScore();
	   	
	   }   
 	 }
 }
  function showScore()
  {
      var modalDialog = document.getElementById("dialog")
      modalDialog.style.visibility = "visible"
      var grid = document.getElementById("message");
      var mes = "";
      if(score>=9){
			mes = "<h2>Excellent</h2>";      
      }
      else if(score>=7){
			mes = "<h2>Very Good</h2>";      
      }
			grid.innerHTML=mes+"<h1>Your score is "+score+"/"+TotalQns+"</h1>";
  }
/*************************************************/
function showMessage(msg)
{
      modalDialog = document.getElementById("dialog")
      modalDialog.style.display = "block"
      var grid = document.getElementById("message");
      grid.innerHTML = msg
     
}
/**************************************************/
function closeDialog()
{
      modalDialog.style.display= "none"
}

