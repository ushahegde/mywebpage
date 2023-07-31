qnArray = [
["In the given diagram, if the exterior angle x is ","  and angle a is ","  what is the value of angle b?"],
["In the given diagram, if the exterior angle x is ","  and angle a is equal to angle b then  what is the value of angle  a?"],
["If the in the given diagram, angles a and b are "," and "," then what is value of exterior angle x?"],
["If the triangle given in the diagram  is an isosceles triangle and angles y  and z are equal to "," what is the value of angle x?"],
["If the triangle given in the diagram is an equilateral triangle, what is the value of angle x?"],
["If in the triangle given the sides s1 and s2 are equal, and angle y is ", " what is the angle x?"],
["If in the diagram given the angle PQR is 90, and sides PQ and PR are "," and "," what is the length of side QR?"],
["If the 3  sides of a triangle have lengths "," is such a  triangle valid?"],
["A ","m  long ladder reached a window ", " high from the ground on placing it against a wall at a distance a. Find the distance of the foot of the ladder from the wall."],
["Find the perimeter of the rectangle whose length is" ,  "cm and a diagonal is "," cm."], 
];
mIndex = 0;
let mAnswer =0;
let pythtriples = [[3,4,5],[5,12,13],[6,8,10],[10,24,26],[9,12,15],[8,15,17]];
let question="";
let mScore = 0;
let mQnNum = 0;
function generateQuestion()
{
 
    let index = mQnNum;
  
     if(index>=qnArray.length)
    {
         showMessage("Quiz completed.<br>Your score is "+mScore,true);
         return;
      }
    let obtuse = generateRandomNumber(90)+90;
    let acute = generateRandomNumber(90)+10;
    let acute2 = generateRandomNumber(90)+10;
    let angle = 160/2; let acute3 = generateRandomNumber(angle)+1
    
    switch(index)
    {
    	case 0: x = obtuse;
    	             a = generateRandomNumber(x/4)+45;
    	             
    	             question = qnArray[index][0]+x+qnArray[index][1]+a+qnArray[index][2];
    	             mAnswer = x-a;
    	             setImage(0);//exterior
    	             break;
        case 1: x = obtuse;
                    a = x/2;
                    question =  qnArray[index][0]+x+qnArray[index][1]	 ;
                    mAnswer = a;
                    setImage(0);//exterior
                    break;
         case 2:  a = acute;
                      b = acute2;
                      x = a+b;
                      setImage(0);//exterior
                      question =  qnArray[index][0] +a+  qnArray[index][1]+b+ qnArray[index][2];
                      mAnswer = x;
                      break;
           case 3:  a = generateRandomNumber(70);
                     mAnswer = 180 - 2*a;
                     setImage(1);//triangle
                     question =  qnArray[index][0]+a+ qnArray[index][1];
                     break;
           case 4: mAnswer = 60;
                     setImage(3);//triangle
                     question =  qnArray[index][0]  ;
                     break
            case  5: y = acute;
                       x = 180 - 2*y;
                       mAnswer = x;
                       setImage(1);//triangle
                       question =  qnArray[index][0]+y+ qnArray[index][1];
                       break;
            case 6:  r1 = generateRandomNumber(pythtriples.length);
                         s1 = pythtriples[r1][0];
                         s2 = pythtriples[r1][1];
                         s3 = pythtriples[r1][2];
                       setImage(2);//rt triangle
                       question = qnArray[index][0]+s1+qnArray[index][1]+s2+qnArray[index][2];
                       mAnswer = s3;
                       break;
             case 7:   s1 = generateRandomNumber(12)+1;
                         s2 = generateRandomNumber(12)+1;
                         s3 = s1+s2+5;
                       hideImage()
                       question = qnArray[index][0]+s1+","+s2+" and "+s3+qnArray[index][1];
                       mAnswer = "Invalid";
                       break;
             case 8: r1 = generateRandomNumber(pythtriples.length);
                          s1 = pythtriples[r1][0];
                         s2 = pythtriples[r1][1];
                         s3 = pythtriples[r1][2];
                       question = qnArray[index][0]+s3+qnArray[index][1]+s1+ qnArray[index][2];
                       hideImage()
                       mAnswer = s2;
                       break;
               case 9:r1 = generateRandomNumber(pythtriples.length);
                          side = pythtriples[r1][0];
                         s2 = pythtriples[r1][1];
                         diagonal = pythtriples[r1][2]; 
                       hideImage()
                        mAnswer = 2*side+2*s2
                       question = qnArray[index][0]+s1+qnArray[index][1]+diagonal+qnArray[index][2];
                       break;
                 case 10: r1 = generateRandomNumber(pythtriples.length);
                        s1 = pythtriples[0];
                        s2 =  pythtriples[1];
                        hypotenuse = pythtriples[2];
                        mAnswer = hypotenuse;
                        question = qnArray[index][0]+s1+qnArray[index][1]+s2+qnArray[index][2];
                        hideImage();
                       break;                        
        }   
        
         let qnElement = document.getElementById("question")
 	//  	 console.log("question is "+question)
         if(index<6)
           answerArray = [mAnswer,generateRandomNumber(90),generateRandomNumber(180),generateRandomNumber(90)]
         else if(index==7) //sides and valid triangle
         answerArray = ["Invalid","Vailid","Insufficient data","Valid if one angle is right angle"];
         else //pythogorean sides
           answerArray = [mAnswer,generateRandomNumber(10),generateRandomNumber(20),generateRandomNumber(30)];
         
         shuffleArray(answerArray)
     	 showQuestion(qnElement,question);
         //correctAnswer = "correct"
  
          let answerButton = [null,null,null,null];//the four answer buttons
  /**find the buttons*/
          answerButton[0] = document.getElementById("btn1");
          answerButton[1] = document.getElementById("btn2");
          answerButton[2] = document.getElementById("btn3");
          answerButton[3] = document.getElementById("btn4");
          showFourAnswers(answerButton,mAnswer,answerArray);    
}
function startQuiz()
{
    mScore = 0;
    mQnNum =0;  
    mMaxQns = qnArray.length;
     generateQuestion()
 }

function setImage(which)
{
   let el = document.getElementById("trimage");
   el.style.display = "inline";
   if(which==0)
      el.src = "ext.png";
   else if (which==1)
      el.src = "isoTr.png"
   else if(which ==2)
     el.src = "rtTri.png"
     else if(which ==3)
     el.src = "triangle2.png"
            
}

function hideImage()
{
 let el = document.getElementById("trimage");
   el.style.display = "none";
}             
                                     
               
                     
                       
                                                