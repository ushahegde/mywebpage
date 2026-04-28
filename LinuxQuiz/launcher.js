let selectedTopic = "";

document.getElementById("topic").addEventListener("change", (e) => {
  selectedTopic = e.target.value;
});

document.getElementById("quiz-btn").addEventListener("click", (e) => {
  loadQuiz();
  });
document.getElementById("desc-btn").addEventListener("click", (e) => {
  loadDesc();
  });