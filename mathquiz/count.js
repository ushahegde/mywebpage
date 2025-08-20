
 var arr=[];
var targetNum=0;

function checkAnswer()
{
	var ansBox = document.getElementById("answer");
	var answerString = ansBox.value
	var answerNum = math.evaluate(answerString);
	var mesg = document.getElementById("message");
	var divMesg = document.getElementsByClassName("messagecontainer");
	var messageBox = divMesg[0];
	messageBox.style.display="block";
	 var playagain = document.getElementById("playagain");
		playagain.style.display ="inline" ;
		var retry = document.getElementById("retrybutton");
		retry.style.display ="inline" ;
	if (answerNum!=targetNum){
		mesg.innerHTML= "The answer is wrong.";
	}	
	else if( !allButtonsDisabled()){
		mesg.innerHTML="Wrong. <br><br>You have not used all numbers!"
	} else{
		retry.style.display="none";
		mesg.innerHTML = "Wonderful!!!<br><br>That is the correct answer!";	
		
	} 
	
 var progress = document.getElementById("progress");
 progress.style.display = "none"
}
function operatorclicked(button){
   var st = button.innerHTML;
   var ansBox = document.getElementById("answer");
	var answerString = ansBox.value;
	answerString = answerString+st;
	ansBox.value = answerString;
	//disable only numbers
	if(!(st=='+'||st=='-'||st=='*'||st=='/'||st=='('||st==')')){
	   button.disabled = true;
	   showProgress();
	   }
	   
}
function generateCountDownNumbers(){
	var num = generateRandomNumber(30,2);//changed from 200 uh 29/6
	arr[0] = num;
	for(i=1;i<5;i++){
		var num = generateRandomNumber(13,2); //changed from 20 uh 29/6
		arr[i] = num;
		/*index = i+1;
		var btn = document.getElementById("btn"+index)	;
		btn.innerHTML = num;	*/
	}
	
}
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
function displayNumbers(){
    for(i=0;i<5;i++){
    	var btnNum = i+1;
		var btn = document.getElementById("btn"+btnNum)	;
	 	
		btn.innerHTML = String(arr[i]);
		 
		  
    }
}
function generateTargetNumber(){
   var operators = ["+","-","*","/"];
   operators = shuffle(operators);
   arr = shuffle(arr);
   var expr = ""+arr[0];
   var prevOp = "";
   var op = [];
   
   for(i=1;i<5;i++){
   	 
   	 var opIndex = generateRandomNumber(4,0);
   	 
   	 var operator = operators[opIndex];
   	 var number = arr[i];
   	 if(operator=="/" && prevOp =="/")
   	    operator = "+";
   	 if(operator=='/'){
   	 	var factor = generateRandomNumber(10,2);
   	 	var product = number*factor;
   	 	arr[i-1] = arr[i]*factor;
   	 }
   	 /*don't have too many multi*/
   	 if(prevOp=="*" && operator=="*"){
		     	operator="-";   	 
   	 }
   	 op[i-1]=operator;
   	 
   	 prevOp=operator;
	 // expr = expr + " "+operator+" ";
	 
	  //expr = expr + " "+arr[i]+" "; 
	  //prevNumber = arr[i]  
   }
   expr=arr[0];
   for(i=1;i<5;i++){
	 
		   expr = expr+op[i-1]+arr[i]; 
		 
   }
 //  console.log("Expr is "+expr);
   var answer = eval(expr);
   return answer;  
   
}
function startQuiz(){
	enableButtons()
	generateCountDownNumbers();
	 
	targetNum = generateTargetNumber();
	displayNumbers();
	var targetLabel = document.getElementById("targetNum");
	targetLabel.innerHTML = "Target: "+targetNum;
	var answerbox = document.getElementById("answer");
	answerbox.value = "";
	var playagain = document.getElementById("playagain");
	playagain.style.display = "none";
	clearMessage();
}
 function generateRandomNumber(limit,minimum){
		var n = Math.floor(Math.random()*limit)+minimum;		 
		return n    
    }
function findRandomFactor(number){
	var factArr = findFactors(number);
	if(factArr.length==0)
	   return -1;
	var randomIndex = generateRandomNumber(factArr.length,0);
	return factArr[randomIndex];
}   
function findFactors(num){
	var array = []
	var j = 0;
	for(i=2;i<num/2;i++){
		if(num%i==0){
		   array[j++]=i;		
		}
	}
	
	return array;
} 
function enableButtons(){
	 
	for(i=1;i<=5;i++){
		var btn = document.getElementById("btn"+i);
		btn.disabled = false;	
	}
}
function clearMessage(){
	var messa = document.getElementById("message");
	messa.innerHTML = "";
	var progress =document.getElementById("progress");
	progress.innerHTML="";
}
function showProgress(){
	var progress = document.getElementById("progress");
	var input = document.getElementById("answer");
	var yourInput = input.value;
	var answerSoFar = math.evaluate(yourInput);
	console.log(answerSoFar);
    progress.style.display = "inline";
	progress.innerHTML = answerSoFar;
}
function redo(){
	var input = document.getElementById("answer");
	input.value = "";
	enableButtons();
	clearMessage();
}
function closemessage(){
    var divMesg = document.getElementsByClassName("messagecontainer");
	var messageBox = divMesg[0];
	messageBox.style.display="none";
}
function retry(){
    closemessage();
    redo();
}
function newgame(){
    closemessage();
    startQuiz();
}
function allButtonsDisabled(){
	for(i=1;i<=5;i++){
		var btn = document.getElementById("btn"+i);
		if(btn.disabled == false)
		  return false;	
	}
	return true;
}
