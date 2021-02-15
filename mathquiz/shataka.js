
function generateNumbers()
{
  var x = [0,0,0,0,0,0,0,0,0];
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
/*****************************************************/
function clearAllArrayElements(x)
{
   for(i=0;i<9;i++)
     x[i]=0;
}

/**********************************************/
function showNumbers(x)
{
     var arr = [0,0,0,0,0,0,0,0,0,0];
     var i= 0;
     var j = 0;
    
     for (;i<=5;)
     {
          var n = Math.floor(Math.random()*10+1)
          if(arr[n]==0)
          {
             arr[n]=x[n];
             i++;
           }
          
     }
     for(i=0;i<9;i++)
     {
        var qnNum = "n"+i; 
        var el = document.getElementById(qnNum);
        if(arr[i]>0)
           el.value = arr[i];
        else
           el.value=" ";
      }

}
/******************************************************/ 
function startGame()
{
    var x = generateNumbers();
    showNumbers(x);
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
       message.innerHTML = "Correct!!!!";
    }
    else
    {
       message.innerHTML = "Wrong ";
    }
}
       
