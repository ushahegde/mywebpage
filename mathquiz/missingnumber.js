/*****/
var maxType=5;
function startGame(){
   var type = Math.floor(Math.random()*maxType);
   generateNumbers(type+1);
   showNumbers();
   showOptions();
}
/************************/
var maximum=0;
var arr = [];
function generateNumbers(option){
  
   if(option==5){
       generateSquares();
       return;
   }
   if(option==1||option==3)
   maximum=100;
   else if(option==2 || option==4)
   maximum=10;
   var startNum = Math.floor(Math.random()*maximum)+2;//we need integer
   if(option==1 ||option==3)
       maximum=30; 
   else if (option==2 || option==4)
      maximum = 1;   
   var difference = Math.floor(Math.random()*maximum)+2;
   var factor = Math.floor(Math.random()*maximum)+2;
   prevNum = startNum;
   if(option==3){
       prevNum=startNum+5*difference;
   } else if(option==4){
       prevNum = startNum*Math.pow(difference,5);
   }
   for(i=0;i<5;i++){       
       if(option==1)
   	      arr[i]= prevNum + difference;
   	  else if(option==2)
   	      arr[i] = prevNum*factor;
   	  else if(option==3)
   	      arr[i] = prevNum-difference; 
   	  else  if(option==4)
   	      arr[i] = prevNum/difference; 
   	  prevNum = arr[i];            
   }
}
/************************/
var answer;
function showNumbers(){
   var colorArray = ["LightPink","LightSalmon","Plum","PaleTurquoise","PeachPuff"]
   maximum = 5;
   var unknownNum = Math.floor(Math.random()*maximum);
   for(i=0;i<5;i++){
   	  index = i+1;
   	  btn = document.getElementById("num"+index);
   	  if(btn!=null){
   	      btn.style.backgroundColor = colorArray[i];
   	  	if(i==unknownNum){
   	  		btn.innerHTML="?";
   	  		answer = arr[i];
   	  	}else{
   	  		btn.innerHTML=arr[i];
   	  	}
   	  }
   }
}
/*******************/
function showOptions(){
   maximum = 4;
   var correctAnswerIndex = Math.floor(Math.random()*maximum);
   var difference = arr[1]-arr[0];
   if(difference <0){
       difference = -1*difference;
   }
   var ansarray=[];
   for (i=0;i<4;i++){                 
       num =answer+ Math.floor(Math.random()*difference);
       if(ansarray.indexOf(num)==-1)
            ansarray.push(num);
       else{
           ansarray.push(num+ 2);
       }
        
   }
   /* find largest */
   var largest = ansarray[0];
   for(i=1;i<4;i++){
       if(ansarray[i]>largest)
          largest = ansarray[i];
   }
   /*find and remove duplicates*/
   for(i=3;i>0;i--){
       if(ansarray[i]==ansarray[i-1]){
           ansarray[i] = largest+5;
       }
   }
   for(i=0;i<4;i++){
   	  index = i+1;
   	  btn = document.getElementById("ans"+index);
   	  if(btn!=null){
   	  	if(i==correctAnswerIndex){
   	  		btn.innerHTML=answer; 
   	  	}else{
   	  			btn.innerHTML=ansarray[i];
   	  	}
   	  }
   }

}
/********************/
function answerClicked(btn){
   var num = btn.innerHTML;
   if(num==answer){
       showDialog("Correct!");
   }else{
       showDialog("Wrong!<br><br>The correct answer is "+answer);
   }
}
 /****************/
 function showDialog(mes){
     dialogMessage = document.getElementById("msg");
     dialogMessage.innerHTML=mes;
     dialog = document.getElementById("dia");
     dialog.showModal();
     
 }
 /******************/
 function hideDialog(){
     dialog = document.getElementById("dia");
     dialog.close();
     startGame();
 }
 /***********************/
 function generateSquares(){
     var offset1 = 5;
     var maximum = 10;
     var n = offset1+Math.floor(Math.random()*maximum);
     console.log("n is "+n);   
     var i = 0;   
     for(i=0;i<5;i++){      
         var sq = (n+i)*(n+i);
         arr[i] = sq;
     }
 }
 /******************/
 function showMenu(){
     var menuContent = document.getElementById("dropdowncnt");
     if(menuContent.style.display=="block"){
         menuContent.style.display="none";
     }else{
     menuContent.style.display = "block";
     }
 }