class Item
{
	constructor(name,price)
	{
		this.name = name;
		this.price = price;	
	}
}
function createObjects()
{
	var objarray = [
	 new Item("Note-book",52),
	new Item("Pen",21),
	new Item("Pencil",5),
	new Item("Bag",125),
	 new Item("Geometry-box",56),
	 new Item("Eraser",5),
	new Item("Ruler",11)];
	return objarray;
}
function setPrices()
{
/* we are setting different prices for global array object. Variety!!*/
   for(i=0;i<objects.length;i++)
   {
   	var item = objects[i];
   	var n = item.price;
		objects[i].price +=generateRandomNumber(n);
		
   }
}
var objects = [];
var answer;
var questionNum=1;
var score = 0;
function startQuiz()
{
	objects = createObjects();
	setPrices();
	 var gridEl = document.getElementById("grid");
    gridEl.style.visibility="visible";
   var startButton = document.getElementById("start");
   startButton.style.visibility = "hidden"; 
	createQuestion();
}
 function generateRandomNumber(limit){
		var n = Math.floor(Math.random()*limit);
		return n    
    }
function createQuestion()
  {
    clearFields();
    var totQn = objects.length;
    var qnIndex = generateRandomNumber(totQn);
    var questionText = "If price of one "+objects[qnIndex].name+    " is "+
     "&#8377; "+objects[qnIndex].price+" then what is the cost of ";
    var m = generateRandomNumber(15)+2;
    answer = m* objects[qnIndex].price;
    questionText+=m+" "+objects[qnIndex].name+"s?";   
     
    var questionwid = document.getElementById("question");
    questionwid.innerHTML = questionText;
    questionwid = document.getElementById("qnnum");
    questionwid.innerHTML = "Qn."+questionNum;
        
  }
  function answerclicked()
  {
	   var inputEl = document.getElementById("answer");
	   var answerTyped = inputEl.value;
	   var resEl = document.getElementById("result");
	   console.log("answer is "+answerTyped);
	   if(answer==answerTyped)
	   {
			resEl.innerHTML = "Correct!!";
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