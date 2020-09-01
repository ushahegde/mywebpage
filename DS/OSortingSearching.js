 function Quiz(questions) {
    this.score = 0;
    this.questions = shuffle(questions);
    this.totalQuestions = 10;
    this.questionIndex = 0;
 
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
Quiz.prototype.getQuestionIndex = function() {
    return this.questions[this.questionIndex];
}
 
Quiz.prototype.guess = function(answer,button) {
	var nextbutton = document.getElementById('nextbutton');
	nextbutton.innerHTML = 'Next Question';
   var element = document.getElementById("answerIndicator");
    
    if(this.getQuestionIndex().isCorrectAnswer(answer)) {
        this.score++;
        
         element.style="color:green;";
        element.innerHTML="CORRECT";
     
        
    }else{
    	 
       
       element.style="color:red;";
     element.innerHTML="WRONG";  
      
    }
     var element2 = document.getElementById('score');
      element2.innerHTML = 'Your Score :'+quiz.score;
  
}
 
Quiz.prototype.isEnded = function() {
    return this.totalQuestions==this.questionIndex;
}
 
 
function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = choices[answer-1]; 
}
 
Question.prototype.isCorrectAnswer = function(choice) {
	 
    return this.answer === choice;
};
 


 
 
function populate() {
	
    if(quiz.isEnded()) {
        showScores();
    }
    else { 
        var correctIndicator = document.getElementById('answerIndicator');
       
        correctIndicator.innerHTML= "                       ";     
        var element = document.getElementById("question");
        var str = quiz.getQuestionIndex().text;
        str = str.replace(/'/g,'"');
        element.innerHTML = str;
        
        var nextButton = document.getElementById('nextbutton');
        nextButton.innerHTML = "Skip";
        
       
        var choices = quiz.getQuestionIndex().choices;
        for(var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            var str2 = choices[i];
            str2 = str2.trim();
            
          
            var bt = document.getElementById("btn"+i);
            bt.checked = false;
            if(str2.length ==0){
					bt.style.display = "none";            
            }else{
					bt.style.display = "inline";            
            }
            guess("btn" + i, choices[i]);
        }
 
        showProgress();
    }
};
 
function guess(id, guess) {
    var button = document.getElementById(id);   
    button.onclick = function() {
        quiz.guess(guess,this); 
    }
};
 
function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;  
    var element = document.getElementById("progress");
   
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.totalQuestions;
    if(currentQuestionNumber==quiz.totalQuestions){
        var el = documennt.getElementById("nextbutton");
        el.innerHTML="Show Result";
    }
   
};
 
function showScores() {
    var gameOverHTML = "<h1>Result</h1>";
    gameOverHTML += "<h2 > Your scores: " + quiz.score + "/"+(quiz.questionIndex)+ "</h2>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
};

function showNextQuestion() { 	
   quiz.questionIndex++;
   populate();
 }
var questions = [new Question("Which of the following methods is divide and conquer method of sorting?",["Shell sort","Heap sort","Merge sort","Insertion sort"],3),
new Question("Which of the following sorting techniques is not an inplace algorithm?",["Bubble sort","Merge sort","Insertion sort","All of the above"],2),
new Question("The running time of quick sort is dependant on which of these factors?",["Size of array","Pivot element selection","Sequence of values","None of the above"],2),
new Question("The maximum number of comparisons in a binary search in an array of n elements is -----",["n","n-1","log(n)","n*n"],3),
new Question("The complexity of linear search algorithm is -----",["O(logn)","O(n)","O(1)","O(n2)"],2),
new Question("The complexity of bubble sort algorithm is -----",["O(n)","O(n2)","O(nlogn)","O(1)"],2),
new Question("Binary search algorithm can not be applied to ----",["Sorted  array","Pointer array","Sorted linked list","Sorted binary tree"],3),
new Question("The complexity of binary search algorithm is ----",["O(n)","O(logn)","O(n2)","None of the above"],2),
new Question("The complexity of insertion sort is ----",["O(n2)","O(n)","O(nlogn)","None of the above"],1),
new Question("The complexity of merge sort algorith is -----",["O(n2)","O(nlogn)","O(n)","None of the above"],2),
new Question("In ---- sort, the elements are split into two groups, those which are less than pivot and those which are greater than pivot",["Selection sort","Bubble sort","Merge sort","Quick sort"],4),
new Question("Finding the smallest elements and storing them in begining of array is done in ----------",["Insertion sort","Selection Sort","Quick sort","Bubble sort"],2),
new Question("Which of the following sorting methods is slowest?",["Quick sort","Merge sort","Radix sort","Bubble sort"],4),
new Question("You have to sort a list L consisting of a sorted list followed by a few “random” elements.<br>Which of the following sorting methods would be especially suitable for such a task?",["Bubble Sort","Quick Sort","Insertion Sort","Selection Sort"],3),
new Question("The quick sort algorithm exploits _________ design technique",["Greedy algorithm","Divide and Conquer","Dynamic programming","Backtracking"],2),
new Question("In ---- sort, the list is split into two equal halves recursively until only one element is left in subarray and then the adjeacent subarrays are merged together",["Quick sort","Merge sort","Insertion sort","Bubble sort"],2),
new Question("What does the following function do?<br><br>void foo(int *a,int n,int val)<br>{<br>for(i=0;i<n && a[i]!=val;i++)<br>     ;<br>return i==n?-1:i;<br>}<br>    ",["Traverse an array","Binary search","Linear search","None of the above"],3),
new Question("What does the following function do?<br><br>int foo(int *a,int start, int end,int val)<br>{<br>    if(start<=end)<br>    {<br>    int mid = (start+end)/2;<br>    if(a[mid]==val)<br>       return mid;<br>    if(a[mid]>val)<br>        end = mid-1;<br>    else <br>        start=mid+1;<br>    return foo(a,start,end,val);<br>   }<br>   else<br>      return -1;<br>}<br>        ",["Linear search","Binary search","Bubble sort","None of the above"],2),
];
var quiz = new Quiz(questions);populate();