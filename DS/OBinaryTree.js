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
var questions = [new Question("State whether true of false<br>a) An empty node is also a binary tree<br>b) A binary tree has a root node and two subtrees which can be empty. <br>",["True False","False False","True True","False True"],3),
new Question("Which of the following is the pre order traversal of a binary tree?",["left subtree- root - right subtree","root - left subtree - right subtree","left subtree-root- right subtree","Any of the above"],2),
new Question("In a binary tree, the nodes with no successor are called -----",["Leaf nodes","Terminal nodes","End nodes","root"],1),
new Question("Which of the traversal methods of a binary seach tree, visits nodes in ascending order of key values?",["In order traversal","Pre order traversal","Post order traversal","Any of the above"],1),
new Question("A binary tree in which all nodes in the left sub tree have keys smaller than the given node and all nodes in right sub tree have key values larger than current node is called -------",["Threaded binary tree","Binary search tree","AVL tree","Splay tree"],2),
new Question("In a binary search tree, if a node which has both sub trees is to be deleted, then this node is replaced by its ----",["Inorder successor","Preorder successor","Post order successor","Any of the above"],1),
new Question("Left subtree-Right subtree-Root is known as ------ traversal",["In order","Post order","Pre order","None of the above"],2),
new Question("The starting node of a binary tree is called -------",["Root","Head","Start","Any of the above"],1),
new Question("Which node in a binary tree has both left child and right child as NULL?",["Root","Leaf","Descendant","None of the above"],2),
new Question("A complete binary tree with height 5 will have maximum --- nodes ",["15","25","63","30"],3),
new Question("What is the maximum number of nodes in level i of a binary tree? ",["2^i","i+1","3^i+1","i+2"],1),
new Question("The worst case time complexity of AVL tree is better in comparison to binary search tree for  -----",["Search and Insert Operations","Search and Delete Operations","Insert and Delete Operations","Search, Insert and Delete Operations"],4),
new Question("A binary search tree is generated by inserting in order the following integers:<br>50, 15, 62, 5, 20<br>The number of nodes in the left subtree and right subtree of the root are",["2 2","1 3","3 1","None of the above"],2),
new Question("A binary search tree contains the values 1, 2, 3, 4, 5, 6, 7, 8. The tree is traversed in pre-order and the values are printed out. Which of the following sequences is a valid output?",[" 5 3 1 2 4 7 8 6 ","5 3 1 2 6 4 8 7","5 3 2 4 1 6 7 8","5 3 1 2 4 7 6 8"],4),
new Question("Which of the following statements is false?",["A tree with n nodes has (n-1) edges","A labeled rooted binary tree can be uniquely constructed given its post-order and pre-order traversal","A full binary tree with n internal nodes has (n+1) leaves","The maximum number of nodes in a binary tree of height h is (2^( h+1) – 1)"],2),
new Question("What is the number of leaf nodes in a binary search tree after adding these values<br><br>50 2 22 17 350",["2","3","4","5"],1),
new Question("A binary tree with n nodes has how many edges?",["n(n-1)","n(n-1)/2","n-1","n"],3),
new Question("State true or false.<br><br>i) The degree of root node is always zero.<br>ii) Nodes that are not root and not leaf are called as internal nodes.",["true true","true false","false true","false false"],4),
new Question("All the nodes in the path from the leaf node to root node are called its ----",["Successors","Ancestors","Internal nodes","Child nodes"],2),
new Question("A binary tree in which if all its levels except possibly the last, have the maximum number of nodes and all the nodes at the last level appear as far left as possible, is known as -------",["full binary tree.","AVL tree.","threaded binary tree.","complete binary tree."],4),
new Question("A binary tree is traversed in the following order.<br>right subtree- parent - left tree<br>The output will be in ---------",["Ascending order","Descending order","No specific order","None of the above"],2),
new Question("A binary tree produces same output in both pre order and post order traversal. The maximum number of nodes in the tree is ------",["3","5","1","Any number"],3),
new Question("How many nodes in a binary tree have no ancestors?",["1","2","0","All"],1),
new Question("What is degree of a node in a tree?",["Number of nodes connected to it","No of children of the node","Number of ancestors of the node","None of the above"],2),
new Question("A full binary tree is the one ------",["Where every node has either 0 or two children","Where all the levels have maximum possible nodes","Where every node has key value greater than its children","None of the above"],1),
new Question("What is a complete binary tree?",["A binary tree where every node has two children except for leaf nodes","A binary tree where every level except last level has maximum possible nodes and last level is filled from left to right","A binary tree where every level has maximum possible nodes","None of the above"],2),
new Question("If a binary search tree has 3 nodes with values 10,3 and 100, 10 being the root, what will be the post order output of the tree?",["3 10 100","100 10 3","3 100 10","10 3 100"],3),
new Question("Which of the following trees can be traversed without using recursion?",["Binary search tree","AVL tree","Threaded binary tree","All of the above"],3),
new Question("In a threaded binary tree, a left link may point to either a left child or -----------",["right child","NULL","Inorder successor","Inorder predecessor"],4),
new Question("If 7 values are entered into a binary search tree in descending order, what will be the height of the tree",["2","3","5","6"],4),
new Question("Which of the following trees can have difference of maximum one between the height of left subtree and height of right subtree for any node",["Red black tree","AVL tree","Splay tree","None of the above"],2),
];
var quiz = new Quiz(questions);populate();