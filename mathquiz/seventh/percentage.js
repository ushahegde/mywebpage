
let mQnNum = 0;
let mMaxQns = 10;
let mScore = 0;
let mShowPercent = false;
function generateQuestion()
{
     if(mQnNum>=mMaxQns)
     {
         showMessage("Quiz completed.<br>Your score is "+mScore,true);
         return;
    }   
     let r = generateRandomNumber(mMaxQns);
     mShowPercent = false;
     switch(r)
     {
     	   case 0: fractionArr= generateFraction(10);
     	                mAnswer = fractionArr[0]/fractionArr[1]*100;
     	                question = "Convert the following fraction to percentage "+createFractionString(fractionArr[0],fractionArr[1]);
     	                mShowPercent = true;
     	                break;
     	   case 1: decimal = generateDecimal(100,2);  
     	                percentage = decimal*100;
     	                percentage = parseInt(percentage);
     	                mAnswer =percentage;
     	                question = "Convert the following decimal fraction into percentage."+decimal;
     	                 mShowPercent = true;
     	               break;
     	   case 2:  p = generateRandomNumber(100)+2;
     	                whole = (generateRandomNumber(8)+1)*50;
     	               mAnswer = p*whole/100;
     	               question = "What is "+p+"% of "+whole;
     	               break
     	   case 3: p = generateRandomNumber(100)+1;
     	               whole  =    (generateRandomNumber(10)+2)*50;
     	               x = p*whole/100;
     	               question = "If "+p+"% of  a number is "+x +", what is the number?";
     	               mAnswer = whole;
     	               break;
     	   case 4:  
     	                gPercent = 10*(generateRandomNumber( 10)+1)
     	                bPercent = 100 -gPercent;
     	                
     	                totalStudents = findlcm(gPercent,bPercent); 
     	                g = gPercent*totalStudents/100
     	                b = totalStudents - g;
     	                
     	                  mAnswer = b;
     	                question = "If in a class of "+totalStudents+" students, "+gPercent+"%"+" are girls, how many boys are in the class?";
     	                break;
     	    case 5: 
     	               nSweets = 5*(generateRandomNumber(10)+1);
     	               mAnswer = nSweets * 40/100;
     	               question = "If  "+nSweets+"  sweets are divided among Tina and Tarun so that they get 40% and 60%  respectively, how many sweets does Tina get?"       
     	               break;
     	     case 6: f =( generateRandomNumber(30)+1);
     	                  refrAmt = 1000*f;
     	                  loss  = generateRandomNumber(30)+2;
     	              //    console.log("loss ="+loss);
     	                  newAmt = refrAmt - (loss*refrAmt)/100  
     	                  mAnswer = loss ;//(refrAmt - newAmt)/refrAmt * 100;
     	                  question  = "If a refrigerator is bought for "+refrAmt+" and later it is sold for "+newAmt+", what is the percentage loss in this transaction?"   
     	                   mShowPercent = true;   
     	                  break;
     	       case 7:   
     	                selPrice = 1000*generateRandomNumber(15)+1000;
     	                lossPercent = generateRandomNumber(10)+1;
     	                costPrice  = selPrice /(1 - (lossPercent/100))
     	                mAnswer = costPrice;
     	                question = "Juhi sells a washing machine for "+selPrice+" She loses "+ lossPercent+ " % in the bargain. What was the price at which she bought it? ";   
     	                 mShowPercent = false;
     	                break;
     	         case 8: 
     	                calcium = generateRandomNumber(3)+7;
     	                carbon = generateRandomNumber(3)+1;
     	                oxygen = generateRandomNumber(4)+8;
     	                carbonWeight = generateRandomNumber(4)+3;
     	                question = "Chalk contains calcium, carbon and oxygen in the ratio "+ calcium+":"+carbon+":"+oxygen+" What is the weight of chalk stick, if the weight of carbon in it is "+carbonWeight +"gms.";    
     	                tot = calcium+carbon+oxygen;     
     	                totalMass = (tot * carbonWeight )/carbon
     	                mAnswer = totalMass;
     	            //    console.log("calcium = "+calcium+"tot *calciumWeith is "+calciumWeight)
     	                break;
     	           case 9: 
     	              
     	               intrRate = generateRandomNumber(7)+5;
     	               sumBorrowed = 1000*generateRandomNumber(30)+1000;
     	                intrAmt = sumBorrowed * intrRate/100
     	               mAnswer = sumBorrowed
     	               question = "If Meena gives an interest of "+intrAmt+" for one year at "+intrRate+"% rate p.a., what is the sum she has borrowed?   "  
     	                break;
     	                             
         }
         if(mAnswer != Math.floor(mAnswer))
              mAnswer = mAnswer.toFixed(2);
      answerArray = generateFourAnswers (mAnswer);//and shuffle them
        qnElement = document.getElementById("question");
        
        showQuestion(qnElement,question);
        
        let answerButton = [null,null,null,null];//the four answer buttons
      /**find the buttons*/
  answerButton[0] = document.getElementById("btn1");
  answerButton[1] = document.getElementById("btn2");
  answerButton[2] = document.getElementById("btn3");
  answerButton[3] = document.getElementById("btn4");
   showFourAnswers(answerButton,mAnswer,answerArray,mShowPercent);
   }	       
 function startQuiz()
{
    mScore = 0;
    mQnNum =0;  
     generateQuestion()
      }
       