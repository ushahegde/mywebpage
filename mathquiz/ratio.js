let half = "<sup>1</sup>/<sub>2</sub>"
let qnArray=["1. 72% of 25 students are interested in mathematics. How many students are not interested in mathematics?",
"2. A football team won 10 matches out of the total number of matches they played. If their win percentage was 40, then how many matches did they play in all?",
"3. If Chameli had Rs. 600 left after spending 75% of her money, how much did she have in the beginning?",
"4. If 60% people in a city like cricket, 30% like football and the remaining like other games, and the total number of people is 50 lakh, find the exact number who like other games.",
"5. If a shop is offering 20% discount on all items, what will be the sale price of dress marked Rs.450?",
"6. A table marked at Rs. 15,000 is available for Rs. 14,400. Find the discount given and the discount percent.",
"7. An almirah is sold at Rs. 5,225 after allowing a discount of 5%. Find its marked price.",
"8. A man got a 10% increase in his salary. If his new salary is Rs. 1,54,000, find his original salary.",
"9. On Sunday 845 people went to the Zoo. On Monday only 169 people went. What is the per cent decrease in the people visiting the Zoo on Monday?",
"10.A shopkeeper buys 80 articles for Rs. 2,400 and sells them for a profit of 16%. Find the selling price of one article.",
"11.The cost of an article was Rs. 15,500. Rs. 450 were spent on its repairs. If it is sold for a profit of 15%, find the selling price of the article.",
"12. A VCR and TV were bought for Rs. 8,000 each. The shopkeeper made a loss of 4% on the VCR and a profit of 8% on the TV. Find the gain or loss percent on the whole transaction.",
"13. During a sale, a shop offered a discount of 10% on the marked prices of all the items. What would a customer have to pay for a pair of jeans marked at Rs. 1450 and two shirts marked at Rs.850 each?",
"14. A milkman sold two of his buffaloes for Rs. 20,000 each. On one he made a gain of 5% and on the other a loss of 10%. Find his overall gain or loss. (Hint: Find CP of each.",
"15. The price of a TV is Rs. 13,000. The sales tax charged on it is at the rate of 12%. Find the amount that Vinod will have to pay if he buys it.",
"16. Arun bought a pair of skates at a sale where the discount given was 20%. If the amount he pays is Rs. 1,600, find the marked price.",
"17. I purchased a hair-dryer for Rs. 5,400 including 8% VAT. Find the price before VAT was added.",
"18.  An article was purchased for Rs. 1239 including GST of 18%. Find the price of the article before GST was added?",
"19.A table marked at Rs.15,000 is available for Rs.14,400. Find the discount given and the discount per cent.",
"20. An almirah is sold at Rs.5,225 after allowing a discount of 5%. Find its marked price.",
"21.Find selling price (SP) if a profit of 5% is made on  a fan bought for Rs.560 and expenses of Rs. 40 made on its repairs.",
"22. A shopkeeper bought two TV sets at Rs.10,000 each. He sold one at a profit 10% and the other at a loss of 10%. Find how much profit or loss he made.",
"23. A house was purchased for Rs.45,00,000. Three years later, the house was sold for 124% of its purchase price. What was the selling price of the house?",
"24. A printing machine produces labels. Four percent of the labels produced are defective. Suppose 372 labels were defective. How many labels are not defective?",
"25. During a 15% off sale, the sale price of a garden bench was Rs.8500. What was the regular price of the bench?"

]
 
let solutionArray=[
"Number of students interested in Maths = 72/100*25 = 18.<br>Total no. of students = 25<br>So students not interested in maths = 25-18 = 7",
"Percentage of win = 40%<br>if x is matches they played, 40% of x = 10 <br> Number of matches played x = 10/(40/100) = 1000/40 = 25",
"Let x is the money she had in begining<br>Amount remaining = 600 = (100-75%) of x=25/100*x<br> x = 600/(25/100)=600*100/25 = 2400.<br>She had Rs.2400 at the begining",
"Percentage of people who like other games = 100-60-30=10%<br>If the population is 50 lakh, then number of people who like games other than cricket and football = 10/100*50,00,000=5,00,000",
"Discount on dress = 20% of 450 = 20/100*450 = 90<br>Sale price = Cost price - discount = 450-90=Rs.360",
"Discount on table = 15000 - 14400=600<br>Discount percent = 600/15000*100 = 4%",
"Selling price = 5225. <br>Let marked price = x<br> Discount = x*5/100<br>Selling price =x - x*5/100= 95x/100<br>95x/100=5225, x= 5225/95 * 100 = 5500",
"Let his salary be x<br>Afer 10% increase salary=x+x*10/100=110x/100<br>110x/100=154000, therefore x = 154000/110 *100 = 14,00,000",
"The decrease in visitors = 845-169 = 676<br>Percentage decrease is 676/845*100 = 80%",
"Price of one article = 2400/80 = 30<br>Profit = 16%=16/100 *30 = 4.8<br>Selling price of artilce = 30+4.8 = 34.8",
"Cost was 15500 and 450 was spent on repairs<br>Cost price after repairs = 15500+450=15950<br>Profit is 15% = 15950*15/100=2392.5<br>Selling price = CP+profit = 15950+1392.5 = 18342.5",
"Total price of TV and VCR = 8000+8000 = 16000<br>Loss on VCR = 4/100*8000=320<br>Profit on TV = 8/100*8000=640<br>Total cost price of TV and VCR = 16000<br>Total Selling price of them = (8000-320)+(8000+640)=16320<br>Total profit = 16320-16000=320 <br>Profit % = 320/16000 * 100 = 2%",
"Discount on jeans = 1450*10/100 = 145<br>Selling price of jeans = 1450-145 = 1305<br>Discount on shirts = (850*10/100 )*2= 85*2 = 170<br>Selling price of shirts = 850*2-170 = 1530<br>Total amount customer must pay = 1305+1530 = 2835",
"Let the price of first buffalo be x. profit = 5/100*x = 20000<br>Selling price = cost price +profit=x+0.5x<br>x*1.95 = 20000 <br>x = 20000/1.05 = 19,047.61<br>Let price of second buffalo be y<br>Loss= 10/100*y = 0.1y<br>Cost price = y = Selling price + loss = 20000+0.1y<br>0.9y = 20000<br>y = 20000/0.9 = 22,222.22<br>Total cost price = 19,047.61+22,222 = 41,269.83<br>Total Selling price = 2*20000 = 40000<br>Total Loss = 41,270 - 40,000 = 1269.83",
"Sales tax is 12% of 13000<br>Sales tax = 13000*12/100 = 1560<br>Selling price=Price+sales tax = 13000+1560=14560",
"Let x be price of skates.<br>Discount on skates = 20% of x = 20/100*x<br>Selling price is 1600<br>1600 = price-discount=x-0.2x = 0.8x<br>Price of skates = x = 1600/0.8=2000",
"If price was 100, VAT will be 8 and selling price will be 108.<br>If price before VAT is 100, selling price is 108.<br>For SP of 5400, the price is 100/108 * 5400 = 5000",
"If the price was 100, GST will be 18 and SP will 100+18 = 118<br>If SP is 1239, price before GST will be 100/118 * 1239= 1050",
"Discount = Marked price - Selling price = 15000-14400 = 600<br>Discount percent = 600/15000 * 100 = 4%",
"If x is its marked price, then discount will be 5/100*x<br> Selling price = x - discount = x-5/100*x = 0.95x<br>Selling price = 5225 = 0.95x, So x = 5225/0.95 = 5500",
"Cost price = price = overhead = 560+40 = 600<br>Profit = 5% of cost price = 5/100*600 = 30<br>Selling price = cost price + profit = 600+30=630",
"Profit shopkeeper made for first TV = 10000*10/100 = 1000<br>Loss he made for second TV = 10%of 10000= 1000<br>Total selling price = (10000+1000)+(10000-1000)= 20000<br>As total selling price = total cost price, he made no profit or loss",
"The selling price is 124% of purchase price<br> SP = 124/100*4500000=Rs.55,80,000",
"For 4 defective labels, total labels is 100<br>For 372 defective labels, total labels = 100/4 * 372 = 9300.<br>Non-defective labels = 9300-372 = 8928",
"Let price of bench be x<br>The discount is 15% = x*15/100<br>Selling price = x - x*15/100 = 0.85x<br> Price of bench = x= 8500/0.85 = 10000"

]

/**********************************************/ 
let ansArray=[7,25,2400,500000,360,4,5500,1400000,80,34.8,18342.5,2,2835,20000,1269.83,14560,2000,5000,1050,4,5500,630,0,5580000,8928,10000]
 

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
        
        if(i<solutionArray.length)
             solution = solutionArray[i]
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
