let half = "<sup>1</sup>/<sub>2</sub>"
let qnArray=["If you subtract "+half+" from a number and multiply the result by "+half+", you get <sup>1</sup>/<sub>8</sub>. What is the number?",
"The perimeter of a rectangular swimming pool is 154 m. Its length is 2 m more than twice its breadth. What is the length the pool?",
"Sum of two numbers is 95. If one exceeds the other by 15, find the larger number.",
"Two numbers are in the ratio 5:3. If they differ by 18, what is the smaller number?",
"Three consecutive integers add up to 51. What is the first of these integers?",
"The ages of Rahul and Haroon are in the ratio 5:7. Four years later the sum of their ages will be 56 years. What is Rahul's present age?",
"The number of boys and girls in a class are in the ratio 7:5. The number of boys is 8 more than the number of girls. What is the total class strength?",
"I have a total of Rs.300 in coins of denomination Rs.1, Rs.2 and Rs. 5. The number of Rs.2 coins is 3 times the number of Rs.5 coins. The total number of coins is 160. How many coins of one rupee are with me?",
"A positive number is 5 times another number. If 21 is added to both the numbers, then one of the new numbers becomes twice the other new number. Find the larger number.",
"Sum of the digits of a two-digit number is 9. When we interchange the digits, it is found that the resulting new number is greater than the original number by 27. What is the two-digit number?",
"Shobo's mothers present age is six times Shobo's present age. Shobo's age five years from now will be one third of his mother's present age. What is Shobo's present age?",
"There is a narrow rectangular plot, reserved for a school. The length and breadth of the plot are in the ratio 11:4. At the rate Rs. 100 per metre it will cost the village panchayat Rs.75000 to fence the plot. What is the length of plot?",
"Half of a herd of deer are grazing in the field and three fourths of the remaining are playing nearby. The rest 9 are drinking water from the pond. Find the number of deer in the herd.",
"A grandfather is ten times older than his granddaughter.He is also 54 years older than her. Find their present ages.",
"Aman’s age is three times his son’s age. Ten years ago he was five times his son’s age. Find their present ages.",
"The ages of Hari and Harry are in the ratio 5:7. Four years from now the ratio oftheir ages will be 3:4. Find Hari's present age.",
"The denominator of a rational number is greater than its numerator by 8. If the numerator is increased by 17 and the denominator is decreased by 1, the number obtained is 3/2.Find the rational number."

]
/**********************************************/ 
let ansArray=["3/4","52","55","27","16","20","48","80","35","36","5","550","72","60","20","13/21"]
/**********************************************/
let solnArray=["Let the number be x<br>(x-1/2)*1/2 =1/8<br>Moving 8 to the numr of LHS, (8x-8/2)*1/2 = 1<br>Taking 1/2 inside bracket, 8x/2 - 8/2/2 = 1<br>4x-2 =1<br> 4x = 3<b>x = 3/4","Perimeter = 2(l+w) where l is lenghth and w is breadth<br>2(l+w)=154<br>l+w = 77---(i)<br>Also lenght = 2+2*breadth<br>l=2+2w<br>Replacing value of l in (i) we get 2+2w+w = 77<br>2+3w = 77<br>3w = 77-2<br>w = 75/3=25m<br>l=2+2w=52m",
"Let the numbers be x and y<br>x+y=95---(i)<br>x=y+15----(ii)<br>Replacing x in (i), y+15+y=95<br>2y=95-15<br>2y=80<br>y=40<br>x=y+15=40+15=55",
"Let the numbers be x and y<br>5x = 3y----(i)<br>y-x=18-----(ii)<br>y=x+18<br>Replacing the value of y in equation(i),5x = 3*(x+18)<br>5x=3x+54<br>2x=54<br>x=54/2=27<br>y=x+18=27+18=45",
"Let the first integer be x<br>The numbers are x,x+1,x+2<br>sum of these = 51<br>x+x+1+x+2=51<br>3x+3=51<br>3x=51-3=48<br>x=48/3=16<br>The numbers are 16,17,18",
"Let the age of Rahul be x and Haroon be y<br>x/y = 5/7----(1)<br>4 years later sum of ages is 56 viz x+4+y+4 = 56<br>x+y+8=56-->x+y=48<br>Replacing value of x from equation (1) we get y*5/7 + y=48<br>5y+7y=48*7--->12y=48*7<br>y = 48*7/12=28<br>x=y*5/7=28*5/7=20<br>Age of Rahul is 20 and age of Haroon is 28",
"Let number of boys be b and numbers of girls be g<br>b/g = 7/5 ----(1)<br>b=8+g ---(2)<br>From 1 we have b = g*7/5<br>Replacing this value in 2, g*7/5 = 8+g----> Cross multiplying by 5, we get 7g = 40+5g<br>2g = 40<br>g = 40/2=20<br>b=8+g=28<br>Class strength = b+g = 20+28=48",
 
"Let the number of 5 Rs coins = x<br>Number of Rs.2 coins = 3x<br>Total number of coins=160--->1 rupee coin = 160-x-3x=160-4x<br>TOtal amount is 300-->(160-4x)+3x*2+x*5=300<br> 160-4x+6x+5x=300<br>7x=140<br>x=20<br>Number of 1 rupee coin = 160-4*20=80",
"Let the smaller number be x. Second number is 5x<br>After adding 21, first number is 21+x and second number is 5x+21 <br>Now second number is twice first number.<br>105+5x=2(21+x)<br>21+5x=42+2x<br>3x=42-21=21<br>x=21/3=7<br>Larger number is 5x=5*7=35",
"Let the digits of the number be x and y.<br>Sum =x+y=9 ----(1)<br>The original number is x*10+y.<br>When we interchange we get 10*y+x<br>This is 27+original number<br>10y+x=27+10x+y<br>9y-9x=27 ---(2)<br>Multiplying  equation (1) by 9 we get 9x+9y=81---(3)<br>Adding 2 and 3 we get 18y= 81+27=108<br>y = 108/18=6<br>x=9-y=9-6=3. So the number is 36",
"Let Shobo's age be x and his mother's age be y<br>y=6x-----(1)<br>Five years from now, Shobo's age is x+5<br>x+5=1/3(y)<br>Cross multiplying, 3x+15=y---(2)<br>Replacing value of y from equation (1), we get 3x+15=6x<br>15= 6x-3x<br>3x=15-->x=5",
"Let l be length and w be breadth<br>l/w = 11/4 -----l = w*11/4<br>Perimeter = 2(l+w)<br>Cost of fencing = 100*perimeter = 100*2*(l+w)<br>75000=200*(l+w)=200*(w*11/4+w) <br>Multiplying both sides by 4, 75000*8=200*(11w+4w)<br>75000*8=200*15w<br>w = 75000*8/3000 = 200<br> And l = w*11/4=200*11/4=550",
"Let x be the number of deers.<br>Number of grazing deer = x/2 and number of playing deer = 3/4*x/2<br>Rest of deer = 9 which = x - x/2-3/8 x<br> Finding LCM and multiplying both the sides by 8, 9*8 = 8x-4x-3x<br>72 = x. Total number of deer = 72",
"Let granddaughter's age be x. Grandfather's age = 10x.<br>It is 54 more than x--> 10x=x+54<br>9x = 54<br>x = 6<br>Grandfather's age = 10x = 60",
"Let Aman's age be x. And his son's age be y. <br>x=3y----(1)<br>10 years ago, his age was 5 times his son's age --->x-10=5*(y-10)<br>x-10=5y-50<br>x+40=5y<br>Replace the value of x from equation (1), we get 3y+40=5y<br>40=5y-3y=2y<br>y = 40/2 =20<br>x=3*x=60<br>Aman's age is 60" ,
"Let the age of Hari be x and Harry be y<br> Ratio is 5:7--->x/y = 5/7<br>x = y*5/7---(1)<br>4 years from now, ratio will be 3:4--->(x+4)/(y+4)=3/4<br>Replacing the value of x from equation (1) we get (y*5/7+4)/(y+4)=3/4<br>Simplifying 5y/7+4 = 3/4 y+3<br>Multiplying both the sides by 28, 20y+112=21y+84<br>112-84=21y-20y<br>y=28, x = y*5/7=28*5/7=20",
"Let numerator be x and denominator be y<br>y=x+8<br>(x+17)/(y-1) = 3/2<br>Replacing the value of y from first equation, we get (x+17)/(x+8-1)=3/2<br>(x+17)/(x+7)=3/2<br>Cross multiplying we get, (x+17)*2=(x+7)*3<br>2x+34 = 3x+21<br>34-21=3x-2x<br>x=13 and y=x+8=21"]
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
/**********************************************/
class Question {
   constructor(question,answer)
   {
     this.question = question
     this.answer = answer
     this.solution = solution
   }
}
/**********************************************/
let questionArray=[]
let num=0
/**********************************************/
function createObjects()
{
     for(i=0;i<qnArray.length;i++)
      {
        
         if(i<ansArray.length)
             answer = ansArray[i]
         else
             answer = "Not Defined"
        
        if(i<solnArray.length)
             solution = solnArray[i]
         else
             solution = "Not Defined"
      //   console.log("soln    is "+solution)
         let obj = new Question(qnArray[i],answer,solution)
         questionArray.push(obj)
      }
     // questionArray = shuffle(questionArray)
}
/*************************************/
function printQuestion()
{ 
           let el = document.getElementById("question")
           let st = "<p>" + questionArray[num].question+"</p>"
           el.innerHTML = st 
           let answerEl = document.getElementById("answer")
           answerEl.value=""       
           answerValue = questionArray[num].answer
           currSolution = questionArray[num].solution
        
}
/***************************************/
function startQuiz()
{
    createObjects()
    printQuestion()
}
/*********************************/
function validateAns(event)
{
  if(event.keyCode==13){
     let el = document.getElementById("answer")     
     let answerEntered = el.value
     //console.log("Correct answer is "+answerValue)
     //console.log("Answer entered is "+answerEntered)
     if (answerEntered == answerValue)
        showMessage("CORRECT")
     else
        showMessage("WRONG")
      
  }
}

/*********************/
function showPreviousQuestion()
{
     if(num>0)
     {
       num--;
       printQuestion();
     }
}
/************************/
function showNextQuestion()
{
      if(num<questionArray.length)
      {
           num++;
           printQuestion();
       }
}
/***********************************/
function showSolution()
{ 
      modalDialog = document.getElementById("dialog")
      modalDialog.style.display = "block"
      var grid = document.getElementById("message");
      grid.style.fontSize="medium";
      grid.style.textAlign="left"
      grid.innerHTML = currSolution
      var button= document.getElementById("closebtn")
      button.onclick=function(){
          modalDialog.style.display= "none"
          printQuestion()
     }
     
}
/****************************************/
function showMessage(message)
{
      modalDialog = document.getElementById("dialog")
      modalDialog.style.display = "block"
      var grid = document.getElementById("message");
      grid.innerHTML = message
      grid.style.fontSize="x-large"
      var button= document.getElementById("closebtn")
      button.onclick=function(){
          modalDialog.style.display= "none"
          printQuestion()
     }
}
