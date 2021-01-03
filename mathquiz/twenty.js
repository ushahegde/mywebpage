function startPuzzle()
{
    var gridEl = document.getElementById("grid");
    gridEl.style.visibility="visible";
    gridEl = document.getElementById("start");
    gridEl.style.visibility = "hidden";
    createQuestion();
  }
  var questionTexts=["What is the square of ",
  "What is the cube of ",
  "What is the square-root of ",
  "What is the product of ",
  "What is the sum of ", 
  ];
  var answer = 0;
  var score = 0;
  var questionNum = 1;
  function generateRandomNumber(limit){
		var n = Math.floor(Math.random()*limit);
		return n    
    }
  function createQuestion()
  {
  	 clearFields();
  	 
    var totQn = questionTexts.length;
    var qnIndex = generateRandomNumber(totQn);
    var questionPrefix = questionTexts[qnIndex];
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
    }
    questionPrefix +="?";
    var questionwid = document.getElementById("question");
    questionwid.innerHTML = questionPrefix;
    questionwid = document.getElementById("qnnum");
    questionwid.innerHTML = "Qn."+questionNum;
        
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
	 	var n1 = generateRandomNumber(300)+100;
	 	var n2 = generateRandomNumber(500)+20;
	 	answer = n1 + n2;
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
	   if(questionNum<=10){
	       	   
	      setTimeout(createQuestion,1000);
	   }
	   else{
	   	showScore();
	   	
	   }   
  }
  function clearFields(){
      var qn = document.getElementById("question");
      var res = document.getElementById("result");
      var ans = document.getElementById("answer");
      ans.value = "";
      
      qn.innerHTML = "";
      res.innerHTML = "";     
      
  }
  function showScore()
  {
      var grid = document.getElementById("grid");
      var mes = "";
      if(score>=9){
			mes = "<h2>Excellent</h2>";      
      }
      else if(score>=7){
			mes = "<h2>Very Good</h2>";      
      }
			grid.innerHTML=mes+"<h1>Your score is "+score+"/10 </h1>";
  }