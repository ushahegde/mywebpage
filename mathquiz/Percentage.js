let qnArray = ["The price of a shirt was Rs.4300 it was reduced to Rs.840. What is the percentage reduction in price?"," Mrs. Mehta spends Rs.56,700 for rent and her total salary is  Rs. 90000. What  percentage of her salary is spent on rent.?","In an election between two candidates, one candidate got 55% of the total valid votes. 20% of the votes were invalid. If the total number of votes was 7500, the number of valid votes that the other candidate got was ------","The production of rice increased by 50% from 1995 to 1996.By what percentage should the production of rice be increased from 1996 to 1997, so that the production of rice in 1997 becomes six times that of 1995 ?","The length of a rectangle is increased by 50%. By what percent would the width have to be decreased to maintain the same area ?","Income of Donald got reduced by 15% this year.  If his income last year was Rs.40,00,000, what is his income this year?","The salary of Claire is first increased by 10% and then decreased by 10% . What is the total change in her salary? "," It costs Rs. 1 to photocopy a sheet of paper. However, 2% discount is allowed on all photocopies done after the first 1000 sheets. How much will it cost to copy 5000 sheets of paper?  ","Rajeev buys goods worth Rs. 6650. He gets a rebate of 6% on it. After getting the rebate, he pays sales tax @10%. Find the amount he will have to pay for the goods","The difference between two numbers is 1550. If 8 % of one number is 10 % of the other number, then find the two numbers","50 % of a number is 18 less than two-third of that number. Find the number. ","A student multiplied a number by 3/5 instead of 5/3, What is the percentage error in the calculation ?","A student has to obtain 33% of the total marks to pass. He got 125 marks and failed by 40 marks. The maximum marks are :","The radius of the base and the height of a right circular cone are increased by 20%, then what is the approximate percentage increase in volume?" ]
let ansArray=["80%","63%","2700","300%","66.66%","34,00,000","1% reduction","4920","6876.1","7750 6200","24","177.77%","500","72.8%"]
let solnArray=["The discount is 4300-840=3360 <br> So the percentage in discount is (3360X100)/4200 = 80%","The percentage is (56700X100)/90000 = 63%","The valid votes are 80% of total votes.<br>So valid votes = 80/100X7500=6000.<br> The other candidate got (100-55)=45% of valid votes.<br>So he got 6000X45/100 = 2700 votes","If the production was 100 in 1995, the production of rice 1996 is 100+50% of 100 = 150.<br>In 1997 it is 6 times that of 1995. If rice production was 100 in 1995, it will be 600 in 1997.<br>So increase in 1997 = 600-150 = 450. In percentage it is 450/150 X100 = 300%","If length is increased by 50%, the total area will be l*1.5*wn.<br> Since this area=lw, 1.5*l*wn = l*w<br> So wn = l*w/(1.5*l) <br>wn = w/1.5<br>New width must be w/1.5*100 = 66.66","Reduction in income = 15/100*4000000 = 600000. So his income this year is 40,00,000-6,00,000=34,00,000","If salary were 100, it is increased to 110.<br>Then it is reduced by 10%<br>10% of 110 = 11.<br>Salary = 110-11 = 99.<br> Difference in Salary = 100-99 = 1.<br>So there is 1% reduction","The cost for first 1000 sheets = 1000*1 = 1000<br>The cost for next 4000 sheets = (4000 - 4000*2/100) = 4000-80 = Rs.3920<br> Total cost=1000+3920 = Rs.4920", "Rebate on goods = 6650*6/100 = 399<br>Cost after rebate = 6650-399 = 6251<br>Sales tax = 10/100 * 6251 = 625.1<br>Amount he needs to pay = 6251+625.1 = Rs. 6876.1","Let the numbers be x and y. <br>x-y = 1550<br>0.08x=0.1y<br>Multiplying second equation by 100, 8x=10y<br>y = 8/10 x<br> Replacing y, we get x -8/10 x = 1550<br>10x -8x = 15500<br> 2x = 15500<br>x=15500/2 = 7750, y = 0.8*x =6200","1/2 x = 2/3 x - 18<br>multiplying the equation by 6, x=4x - 72<br>3x=72<br>x=72/3=24","If the number is x, then student got 3x/5 as answer instead of 5x/3<br>so the error is 5x/3-3x/5 = 25x-9x/15=16x/9<br>percentage error is 16x/9 / x *100 = 177.77%" ,"Student should have got 125+40 = 165 marks to pass<br>Pass percentage is 33%<br>Total marks is 100*165/33 = 500","The volume of right circular cone is pi*r^2*h/3.<br> After increasing radius and height by 20%,volume=pi*(1.2r*1.2r)*(1.2h)/3= pi*r^2*h*1.728<br>So the increase in volume is 0.728*100 = 72.8%"]
let num=0
let currSolution=""
class Question {
   constructor(question,answer)
   {
     this.question = question
     this.answer = answer
     this.solution = solution
   }
}
let ar =[]
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
         console.log("soln    is "+solution)
         let obj = new Question(qnArray[i],answer,solution)
         ar.push(obj)
      }
}
function printQuestion()
{ 
           let el = document.getElementById("question")
           let st = "<p>" + ar[num].question+"</p>"
           el.innerHTML = st        
           answerValue = ar[num].answer
           currSolution = ar[num].solution
        
}
function startQuiz()
{
    createObjects()
    printQuestion()
}
function validateAns(event)
{
  if(event.keyCode==13){
     let el = document.getElementById("answer")     
     let answerEntered = el.value
     console.log("Correct answer is "+answerValue)
     console.log("Answer entered is "+answerEntered)
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
      if(num<solnArray.length)
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
