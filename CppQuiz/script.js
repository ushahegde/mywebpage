let questions = [];
let selectedQuestions = [];
let currentIndex = 0;
let score = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const explanationEl = document.getElementById("explanation");
const nextBtn = document.getElementById("next-btn");
const resultBox = document.getElementById("result-box");
const scoreEl = document.getElementById("score");

const codeEl = document.getElementById("code");
const explainBtn = document.getElementById("explain-btn");
 
fetch("quizcpp.json")
  .then(res => res.json())
  .then(data => {
    questions = data;
    topics = [...new Set(questions.map(item => item.topic))];
    populateTopics(topics)
    //startQuiz();
  });

function startQuiz() {
  selectedQuestions = shuffleArray(questions).slice(0, 10);
  loadQuestion();
}

function loadQuestion() {
  resetState();

  let q = selectedQuestions[currentIndex];
  questionEl.textContent = `${currentIndex + 1}. ${q.question}`;
  let qncode=q.qncode;
  if(qncode==null){
      codeEl.innerText="";
  }else{
  //take care of < and > tags
 /* qncode = qncode.replaceAll("<","&lt;");
  qncode = qncode.replaceAll(">","&gt;");
  qncode = qncode.replaceAll("&","&amp;");
  qncode = qncode.replaceAll('"',"&quot;");
  */

      codeEl.innerText=qncode;
  }

  q.options.forEach((option, index) => {
    const btn = document.createElement("button");
    btn.textContent = option;
    if(option!=null && option!=""){
       btn.onclick = () => selectAnswer(btn, index, q.correct, q.explanation);
       optionsEl.appendChild(btn);
    }
  }); 
}

function selectAnswer(button, selected, correct, explanation) {
  const buttons = optionsEl.children;

  for (let btn of buttons) {
    btn.disabled = true;
  }
  console.log("selected="+selected+"correct="+correct);
  if (selected === (correct-1)) {
    //buttons[selected].style.color='green';
    button.classList.add("correct");
    score++;
  } else {
       
    button.classList.add("wrong");
     //buttons[selected].style.color='red';
     
     buttons[correct-1].classList.add("correct");
    // buttons[correct-1].style.color='green';
    
  }
  
  nextBtn.classList.remove("hidden");
  if( explanation!=null){
  explainBtn.classList.remove('hidden');
 // explanationEl.textContent = explanation;
 // explanationEl.classList.remove("hidden");
  
  explainBtn.onclick=function(){
      explanationEl.classList.remove("hidden");
      explainBtn.classList.add('hidden');
      explanationEl.textContent=explanation;
  }
  }
}

nextBtn.onclick = () => {
  currentIndex++;
  l = selectedQuestions.length;
  if (currentIndex < 10 && currentIndex<l) {
    loadQuestion();
  } else {
    showResult();
  }
};

function showResult() {
  document.getElementById("quiz-box").classList.add("hidden");
  resultBox.classList.remove("hidden");
  scoreEl.textContent = score+"/"+currentIndex;
}

function resetState() {
  optionsEl.innerHTML = "";
  explanationEl.classList.add("hidden");
  explainBtn.classList.add("hidden");
  nextBtn.classList.add("hidden");
}

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}
function populateTopics(topics) {
  const topicSelect = document.getElementById("topicSelect");
  
  // Optional: add "All" option
  const allOption = document.createElement("option");
  allOption.value = "All";
  allOption.textContent = "All Topics";
  topicSelect.appendChild(allOption);

  // topics = new Set(data.map(q => q.topic));

  topics.forEach(topic => {
    const option = document.createElement("option");
    option.value = topic;
    option.textContent = topic;
    topicSelect.appendChild(option);
  });
  topicSelect.addEventListener("change",(event)=>{
      
      selectedQuestions = getRandomQuestionsByTopic(questions,event.target.value,10);
      event.target.classList.add("hidden");
      loadQuestion();
  })
}
 
function getRandomQuestionsByTopic(data, topic, count = 10) {
   
  const filtered = data.filter(q => q.topic === topic);
  const shuffled = [...filtered].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
   
}
