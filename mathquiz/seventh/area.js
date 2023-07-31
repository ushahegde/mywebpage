var qnArray = ["Find the area of a triangle if base is $a cm and height is $b cm.",
"Find the area of a triangle which is right angled triangle, and its  one side  is $a and hypotenuse is $b.",
"Find the area of an isosceles triangle, if the sides are $a,$a and $b. (The height of isosceles triangle with two equal sides as a and base b is &#8730 (a<sup>2</sup> - b<sup>2</sup>/<sub>4</sub>)",
"Find the area of a parallelogram whose base and height are $a and $b.",
"What is the area of a rectangle whose sides are $a and $b?",
"What is the area of a circle with radius as $a?",
"If the length of PQ in the diagram is $a and PQ passes through the center of circle, what is the circumference of the circle?" ,
"If the two equal sides of an isosceles triangle are $a and the third side is $b, what it its perimeter?",
"A circle of radius $a cm is cut out from a square piece of an aluminium sheet of side $b cm. What is the area of the left over aluminium sheet? ",
"A circular flower bed is surrounded by a path $a m wide. The diameter of the flower bed is $b m. What is the area of this path? ",
"How many times a wheel of radius $a cm must rotate to go $b m? ",
"A square lawn has a triangular lake  inside. If the lake is right angled triangle and base and h are  $a and $b, and the each side of lawn is $c, find the area of lawn excluding the lake."
]
var a =0, b=0,c=0;
var imageArray = ["base.png","rtTri.png","isoTr.png",
null,null,null,"diameter.png","isoTr.png",null,null,null,"garden.png"];

var mMaxQns = 10;
var mScore = 10;
var mQnNum = 0;
var mAnswer  = 0;
const pi = 22/7;
function generateQuestion()
{
     if(mQnNum>=mMaxQns){
        showMessage("Quiz completed. <br>Your score is "+mScore,true);
        return;
      }  
     let r = generateRandomNumber(qnArray.length);
     mShowPercent = false;
     var a1 = generateRandomNumber(15)+1;
     var b1 = generateRandomNumber(20)+1;
     question = qnArray[r];
      setImage(r);
     switch(r)
     {
     	case 0: a = a1;
     	             b = b1; 
     	             question = question.replace("$a",a);
     	             question = question.replace("$b",b)
     	             console.log("question is "+question);
     	             mAnswer = 1/2* a*b;
     	             break;
     	case 1:   var rtTr = generatePythoTriple();
     	              
     	              console.log("The triple is "+rtTr);
     	              question = question.replace("$a",rtTr[0]);
     	              question = question.replace("$b",rtTr[2]);
     	              mAnswer = 1/2*rtTr[0]*rtTr[1];      	           
     	              break;    
     	  case 2: var isoTr = generateIsosceles();
     	              question = question.replace("$a",isoTr[0]);
     	               question = question.replace("$a",isoTr[0]);
     	              question = question.replace("$b",isoTr[2]);
     	              a = isoTr[0];
     	              b = isoTr[2];
     	              var ht = Math.sqrt(a*a - (b*b)/4);      	              
     	              var area = 1/2*b*ht;      	              
     	              mAnswer = area;
     	              break;
     	    case 3:var base = a1;  //parallelogram
     	                var height = b1;
     	                question = question.replace("$a",base);
     	                question = question.replace("$b",height); 
     	                mAnswer = base * height ;
     	                break;  
           case 4:var len = a1;  //rectangle
     	                var wid = b1;
     	                question = question.replace("$a",len);
     	                question = question.replace("$b",wid); 
     	                mAnswer = len*wid;  
     	                break;          
     	   case 5: var radius = (generateRandomNumber(5)+1)*7;//circle
     	                question = question.replace("$a",radius);      
     	                mAnswer  = pi * radius*radius;
     	                break;
     	   case 6: var diameter =  (generateRandomNumber(5)+1)*14;//circle and diameter
     	               question = question.replace("$a",diameter);
     	               mAnswer = pi* diameter;
     	               break;
     	   case 7:   var isoTr = generateIsosceles(); //perimeter of isosceles triangle
     	              question = question.replace("$a",isoTr[0]);
     	               question = question.replace("$b",isoTr[2]);  
     	               perimeter = 2*isoTr[0]+isoTr[2];
     	               mAnswer = perimeter;
     	               break;      
     	    case 8: radius = (generateRandomNumber(5)+1) *7;
     	                 side = (generateRandomNumber(10)+3)+(2*radius);
     	                 sqArea = side*side;
     	                 circleArea = pi*radius*radius;
     	                 remainArea = sqArea - circleArea;
     	                 mAnswer = remainArea;
     	                 question = question.replace("$a",radius);
     	                 question = question.replace("$b",side);
     	                 break;
     	     case 9: pathWidth = generateRandomNumber(5)+2;
     	                  gardenRadius = (generateRandomNumber(6)+1)*7;
     	                  outerRadius = gardenRadius+pathWidth;
     	                  totalArea = pi*outerRadius*outerRadius;
     	                  innerArea = pi*gardenRadius*gardenRadius;
     	                  pathArea = totalArea - innerArea;
     	                  mAnswer = pathArea;
     	                  question = question.replace("$a",pathWidth);
     	                  question = question.replace("$b",2*gardenRadius);
     	                  break;
     	      case 10: wheelRadius =  (generateRandomNumber(6)+1)*7;
     	                   circumference = 2*pi*wheelRadius;
     	                   pathLength = (generateRandomNumber(6) +1)*circumference;
     	                   
     	                   question = question.replace("$a",wheelRadius);
     	                   question = question.replace("$b",pathLength);
     	                   pathLength = pathLength*100;//it is in meters
     	                   mAnswer = pathLength/circumference;
     	                   break;
     	        case 11: base = generateRandomNumber(10)+1;
     	                   height = generateRandomNumber(10)+1;
     	                   la = base>height?base:height;
     	                   side = generateRandomNumber(20)+2+ la;  
     	                   question = question.replace("$a",base);
     	                   question = question.replace("$b",height);      
     	                   question = question.replace("$c",side);
     	                   outerArea = side*side;
     	                   innerArea = 1/2  * base * height;
     	                   lawnArea = outerArea - innerArea;
     	                   mAnswer = lawnArea;
     	                   break;         	                     
     }//end of switch
    
      var qnEl = document.getElementById("question");
      showQuestion(qnEl,question);
      var answerArray = generateFourAnswers(mAnswer);
      var btnArray = [null,null,null,null];
      for(i=0;i<4;i++)
        { var m = i+1;
          btnArray[i] = document.getElementById("btn"+m);
        }  
      showFourAnswers(btnArray,mAnswer,answerArray,false);
      
 }
 /***************************************************************/
 function startQuiz()
 {
 	mScore = 0;
 	mQnNum = 0;
 	generateQuestion();
 }
 /***************************************************************/     	             
function generateIsosceles()
{
       var a = generateRandomNumber(10)+2;
       var b = generateRandomNumber(2*a)+1;
       var arr =   [a,a,b];
       return arr;
       }
/***************************************************************/    
    function setImage(which)
    {
        var imgElement = document.getElementById("areaimage");
        
        if(imageArray[which]!=null){
            imgElement.style.display = "inline";
          imgElement.src = imageArray[which];
        }
        else
           imgElement.style.display ="none";
    }
       