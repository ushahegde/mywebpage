index =0
var x = [0,0,0,0,0,0,0,0,0]
function generateNumbers()
{
 // var x = [0,0,0,0,0,0,0,0,0];
  var neededSum=100;
 
		  foundX0 = false;
          genOver = false;
         reptns = 0;
		do {
            reptns++;
            if(reptns>200){//Takes too much time abort
                break;
            }
			x[0] = getRandomNumber(x,neededSum);
            if(x[0]==-1){
                continue;
            }

			x[1] = getRandomNumber(x,neededSum-x[0]);
			if (x[1]<=0 || isElementPresentInArray(x, x[1],0) ||x[1]==-1) {
				clearAllArrayElements(x);
				continue;
			}
			x[2] = neededSum - x[0] - x[1];
			if ((x[2] <= 0) || isElementPresentInArray(x, x[2], 1)) {
				clearAllArrayElements(x);
				continue;
			}
			x[3] = getRandomNumber(x,neededSum-x[0]);

			x[6] = neededSum - x[0] - x[3];
			if ((x[6] <= 0) || isElementPresentInArray(x, x[6], 5) || (x[3] == -1)) {
				clearAllArrayElements(x);
				continue;
			}


			x[4] = getRandomNumber(x,neededSum-x[1]-1);
			if ((x[4] == 0) || isElementPresentInArray(x, x[4], 3) || (x[4] == -1)) {
				clearAllArrayElements(x);
				continue;
			}
			x[5] = neededSum - x[4] - x[3];
			if (x[5]<=0 ||isElementPresentInArray(x, x[5],4)) {
				clearAllArrayElements(x);
				continue;
			}
			x[7] = neededSum - x[1] - x[4];
			if (x[7]<=0 ||isElementPresentInArray(x, x[7],6)) {
				clearAllArrayElements(x);
				continue;
			}
			x[8] = neededSum - x[6] - x[7];
			if (x[8]<=0 ||isElementPresentInArray(x, x[8],7)) {
				clearAllArrayElements(x);
				continue;
			}
			genOver = true;
} while( !genOver  );
return x;
     }
 /************************************************************/
 function generateRandomNumber(max,min){
    return Math.floor(Math.random()*(max-min)+min);
 }
/*******************************************/
	 function getRandomNumber(x,randSeed) {
		  var num;
          reptns = 0;
		while (true) {
			num = generateRandomNumber(randSeed,1)
            reptns++;
            if(reptns>50){
                num = -1; break;
            }
			/*if (num == 0 || num >= (randSeed-5)) {//TODO is it right??
				continue;
			}*/
			if(isElementPresentInArray(x,num,8)){
				continue;
			}

			break;



		}
		return num;
	}
/**********************************************/
function shuffle(arra1,l) {
    var ctr = l, temp, index; 
    while (ctr > 0) { 
        index = Math.floor(Math.random() * ctr); 
        ctr--; 
        temp = arra1[ctr];
        arra1[ctr] = arra1[index];
        arra1[index] = temp;
    }
    return arra1;
}
/*****************************************************/
function clearAllArrayElements(x)
{
   for(i=0;i<9;i++)
     x[i]=0;
}

/**********************************************/
var optionArray=[0,0,0,0,0,0,0,0,0]
var arr = [0,0,0,0,0,0,0,0,0,0];
var maxshown=6;
function showNumbers(x,restart)
{
     if(restart==false){
      arr = [0,0,0,0,0,0,0,0,0,0];
     
     var i= 0;
     var j = 0;
    
     for (;i<maxshown;)
     {
          var n = generateRandomNumber(0,9)
         
          if(arr[n]==0)
          {
             arr[n]=x[n];
             i++;
           }
          
     }
     }
     
     for(i=0;i<9;i++)
     {
        var qnNum = "n"+i; 
        var el = document.getElementById(qnNum);
        if(arr[i]>0)
           el.value = arr[i];
        else{
           el.value=" "
           optionArray[index++]=x[i]
         }
      }
      showOptions()
     

}
/*****************************************************/
function showOptions()
{
    var l = 0;
    for(i=0;i<9;i++)
       if(optionArray[i]==0)
          break;
    l = i
  
    shuffle(optionArray,l)
    index = 0
 for(i=0;i<9;i++)
       if(optionArray[i]==0)
          {
              var m = i+1
              var btn = document.getElementById("ans"+m)
              btn.style.visibility = "hidden"
          }
    for(i=0;i<l;i++)
      showAsOption(i+1,optionArray[i])

    
       
    }
/*****************************************************/
function showAsOption(index,value)
{
    
              
        var btn = document.getElementById("ans"+index)
        
           btn.innerHTML = value
           btn.style.visibility = "visible"
     
      
}
/******************************************************/ 
function startGame()
{
    clearOptions()
    var x = generateNumbers();
    showNumbers(x,false);
}
/******************************************************/
 function isElementPresentInArray( x,   num,  tillIndex) {
		 for(  i=0;i<=tillIndex;i++){
			 if(x[i]==num){
				 return true;
			 }
		 }
		 return false;
	}
/*************************************************************/
function isValid()
{
     var answer=[0,0,0,0,0,0,0,0,0];
     for(i=0;i<9;i++)
     {
        var elid = "n"+i;
        var element = document.getElementById(elid);
        var ans = element.value;
        answer[i] = ans;
     }
     var i=0;
     for(row = 0;row<3;row++)
       {
          var sum=0;
          for(col=0;col<3;col++)
             sum = sum+parseInt(answer[(row*3)+col]);
	 
          if(sum!=100)
             return false;
       }
     for(col = 0;col<3;col++)
       {
          var sum=0;
          for(row=0;row<3;row++)
             sum = sum+parseInt(answer[(row*3)+col]);
          console.log("sum is "+sum);
          if(sum!=100)
             return false;
       }
     return true;

}
/***********************************************************/
function submitAnswer()
{
    var message = document.getElementById("message");
    if(isValid())
    {
      alert("Wonderful!!!!");
       var startBtn = document.getElementById("startbtn")
       startBtn.innerHTML = "New Game"
       if(maxshown>=0)
          maxshown--
    }
    else
    {
       alert("Wrong ");
    }
}
/*********************************************************/
function clearOptions()
{
    for(i=1;i<=4;i++)
    {
         var m = "ans"+i
         var btn = document.getElementById(m)
         btn.innerHTML = ""
         btn.style.visibility = "visible"
    }
    index = 0
}
/*********************************************************/
function allowDrop(ev)
{

   ev.preventDefault()
   
}
/*********************************************************/
function drag(ev)
{     
     
     ev.dataTransfer.setData("text",ev.target.id)
}
/*********************************************************/
function drop(ev)
{
     ev.preventDefault()
     var data = ev.dataTransfer.getData("text")
     var el = document.getElementById(data) 
     if(ev.target.value>0)
        return
     ev.target.value = el.innerHTML
     el.innerHTML = " "
     el.style.visibility= "hidden"
     checkCompletion()
    // ev.target.innerHTML = data
    // document.getElementById(data).innerHTML = ""
    
}
/*********************************************************/
function restartGame()
{
    clearOptions()
  //  var x = generateNumbers();
    showNumbers(x,true)
}
/******************************************************/
function checkCompletion()
{
     console.log("In check completion")
      for(i=0;i<9;i++)
     {
        var elid = "n"+i;
        var element = document.getElementById(elid);
        if(element.value==0)
            return
     }
     submitAnswer()
}
/******************************************************/
 
 
