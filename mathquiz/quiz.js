function startPuzzle()
{
    var gridEl = document.getElementById("grid");
    gridEl.style.visibility="visible";
    timeLeft = 120;
    intervalId = setInterval(displayTime,1000);
   // setTimeout(stopQuiz(),60000);
    createQuestion();
  }
  var questionTexts=["What is the square of ",
  "What is the cube of ",
  "What is the square-root of ",
  "What is the product of ",
  "What is the sum of ", 
  "What is the difference between ",
  "What is the quotient when  ",
   "What is x percentage of y",
   "What is one half of",
   "Which is smaller - one half of or one third of",
   "Which is larger - one half of or one fourth of"
  ];
  var answer = 0;
  var score = 0;
  var questionNum = 1;
  function generateRandomNumber(limit){
		var n = Math.floor(Math.random()*limit);
		return n    
    }
    /*********************************/
  function createQuestion()
  {
  	if(timeLeft<=0){		
  		clearInterval(intervalId)
  		showScore();
  	}else{
  	 clearFields();
  	 
    var totQn = questionTexts.length;
    var qnIndex = generateRandomNumber(totQn);
    var questionPrefix = questionTexts[qnIndex];
    console.log("question is"+questionPrefix)
    if(questionPrefix.indexOf("square-root")!=-1){
			var num = generateSquareRootQuestion();
			questionPrefix +=num;    
    }
    else if(questionPrefix.indexOf("square")!=-1){
			var num = generateSquareQuestion();
			questionPrefix+=num;    
    }else if(questionPrefix.indexOf("cube")!=-1){
			var num = generateCubeQuestion();
			questionPrefix+=num;    
    }else if(questionPrefix.indexOf("product")!=-1){
			var numarray = generateProductQuestion();
			questionPrefix+=numarray[0] +" and "+ numarray[1];    
    }else if(questionPrefix.indexOf("sum")!=-1){
			var numarray = generateSumQuestion();
			questionPrefix+=numarray[0] +" and "+ numarray[1];  
			   
    }else if(questionPrefix.indexOf("difference")!=-1){
			var numarray = generateDifferenceQuestion();
			questionPrefix+=numarray[0] +" and "+ numarray[1]; 
			
    	
    }else if(questionPrefix.indexOf("quotient")!=-1){
    	var numarray = generateDivisionQuestion();
    	questionPrefix += numarray[0]+ " is divided by "+numarray[1];
    }else if(questionPrefix.indexOf("percentage")!=-1){
    	var numarray = generatePercentageQuestion();
    	questionPrefix =" What is "+numarray[0]+ "% of "+numarray[1];
    }else if(questionPrefix.indexOf("What is one half of")!=-1){
    	var num = generateHalfQuestion();
    	questionPrefix="What is one half of "+num;
    }else if(questionPrefix.indexOf("smaller")!=-1 ){
        var numArray = generateSmallerQuestion();
        questionPrefix = "Which is smaller - <br>a. one half of "+numArray[0]+" or<br> b. one third of "+numArray[1];    
    }else if(questionPrefix.indexOf("larger") !=-1){
        var numArray = generateLargerQuestion();
        questionPrefix = "Which is larger -<br>a.one third of "+numArray[0]+" or<br> b.one fourth of "+numArray[1];    
    }
    questionPrefix +="?";
    var questionwid = document.getElementById("question");
    questionwid.innerHTML = questionPrefix;
    questionwid = document.getElementById("qnnum");
    questionwid.innerHTML = "Qn."+questionNum;
   }    
  }
  function generateSquareRootQuestion()
  {
		var n = generateRandomNumber(50)+5;
		answer = n;
		var sq = n*n;
		return sq;  
  }
  function generateSquareQuestion(){
	 	var n = generateRandomNumber(20)+3;
	 	var square = n*n;
	 	answer = square;
	 	return n;  
  }
  function generateCubeQuestion(){
	 	var n = generateRandomNumber(10)+2;
	 	var cube = n*n*n;
	 	answer = cube;
	 	return n;  
  }
  function generateSumQuestion(){
	 	var n1 = generateRandomNumber(300)+123;
	 	var n2 = generateRandomNumber(500)+35;
	 	answer = n1 + n2;
	 	var arr = [n1,n2]
	 	return arr;  
  }
  
   function generateDifferenceQuestion(){
	 	var n1 = generateRandomNumber(300)+74;
	 	var n2 = generateRandomNumber(n1-15);
	 	answer = n1 - n2;
	 	var arr = [n1,n2]
	 	return arr;  
  }
  function generateProductQuestion(){
	 	var n1 = generateRandomNumber(20)+2;
	 	var n2 = generateRandomNumber(30)+3;
	 	answer = n1 * n2;
	 	var arr = [n1,n2]
	 	return arr;  
  }
  function generateDivisionQuestion(){
	 	var quo = generateRandomNumber(30)+3;
	 	var n2 = generateRandomNumber(20)+3;
	 	n1 = quo*n2;
	 	answer = quo;
	 	var arr = [n1,n2]
	 	return arr;  
  }
  
  function generatePercentageQuestion(){
  	   var percentages = [1,5,10,20,25,50]
  	   var perc = percentages[generateRandomNumber(percentages.length)];
  	   var x = (generateRandomNumber(15)+1)*25
  	   
  	   var perAn = perc*x/100;
  	    
  	   answer = perAn
  	   var arr = [perc,x];
  	   return arr;
  }
 
  function answerclicked()
  {
	   var inputEl = document.getElementById("answer");
	   var answerTyped = inputEl.value;
	   var resEl = document.getElementById("result");
	   console.log("answer is "+answerTyped);
	   if(answer==answerTyped)
	   {
			resEl.innerHTML = "Wonderful. That is the correct answer";
			score = score+1;
			
	   }  else {
			resEl.innerHTML = "Sorry, It is wrong";	   
	   }
	   console.log("I am out of if");
	   questionNum++;
	   //createQuestion();
	  // if(questionNum<=10){
	    // sleep(1000);	   
	     setTimeout(createQuestion,1000);
	  // }
	  // else{
	   //	showScore();
	   	
	  // }   
  }
  function clearFields(){
      var qn = document.getElementById("question");
      var res = document.getElementById("result");
      var ans = document.getElementById("answer");
      ans.value = "";
      
      qn.innerHTML = "";
      res.innerHTML = "";     
      
  }
  function inputEntered()
  {
  	  if (event.keyCode==13){
  	  	answerclicked();
  	  }
  }
  function showScore()
  {   
      clearInterval();
      var time=document.getElementById("time");
      time.innerHTML="";
      
      var grid = document.getElementById("grid");
      var mes = "";
      if(score>=9){
			mes = "Excellent";      
      }
      else if(score>=7){
			mes = "Very Good";      
      }
			grid.innerHTML="<h1>"+mes+"<br>Your score is "+score+"/"+questionNum+" </h1>";
  }
  /*************************/
  function displayTime()
  {
  	timeLeft--;
  	
  	if(timeLeft==0){
  	    clearInterval(intervalId);
  	    showScore();
  	}else{
  	var timeElement = document.getElementById("time");
  	
  	if(timeLeft<10){
  	    timeElement.style.color="#ff0000";  
  	    timeElement.style.textShadow="1px 1px #660000";
  	    timeLeftSt="0"+timeLeft; 
  	}else{
  	    timeElement.style.color="#ffffff"; 
  	    t1 = Math.floor(timeLeft/60);
  	    t2 = timeLeft%60;
  	    timeLeftSt = "0"+t1+":"+t2
  	}
  	
  	timeElement.innerHTML="00:"+timeLeftSt;
  	}
  	
  }
  /**************************/
  function stopQuiz(){
  	showScore();
  }
  /**********************/
  function generateHalfQuestion()
  {
      var n = generateRandomNumber(100);
      var n2 = n*2;
      answer = n;
      return n2;
  }
 /**********************/
function generateSmallerQuestion()
{
     var n1 = generateRandomNumber(80)+8;
     if(Number.isInteger(n1/2)==false){
         n1++;
     }
     var n2 = generateRandomNumber(80)+3;
    // n2+=n1;
     if(n2%3!=0){
         n2 = n2-(n2%3);
     }
     if(n1/2 <n2/3)
        answer = "a";
     else
        answer = "b";
     return [n1,n2]      
}    
 /**********************/
function generateLargerQuestion()
{
     var n1 = generateRandomNumber(80)+8;
     console.log(n1);
     if(n1%3!=0){
         n1= n1-(n1%3);
     }
     var n2 = generateRandomNumber(80)+3;
   //  n2+=n1;
     if(n2%4!=0){
         n2 = n2-(n2%4);
     }
     if(n1/3 > n2/4)
        answer = "a";
     else
        answer = "b";
     return [n1,n2]      
}    