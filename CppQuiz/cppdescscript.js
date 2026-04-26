const container = document.getElementById("qa-container");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const pageInfo = document.getElementById("pageInfo");
const searchInput = document.getElementById("searchInput");
const topicSelect = document.getElementById("topicSelect");
  

let allQuestions = [];
let filteredQuestions = [];
let currentPage = 1;
const itemsPerPage = 6;

// Load JSON
fetch("cppdescriptive.json")
  .then(res => res.json())
  .then(data => {
    allQuestions = data;
    topics = [...new Set(allQuestions.map(item => item.topic))];
     topics.forEach(topic => {
          const option = document.createElement("option");
          option.value = topic;
          option.textContent = topic;
          topicSelect.appendChild(option);
     });
    filteredQuestions = data;
    renderPage();
  });

// Render page
function renderPage() {
  container.innerHTML = "";

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const pageItems = filteredQuestions.slice(start, end);

  pageItems.forEach(item => {
    const qa = document.createElement("div");
    qa.classList.add("qa-item");

    const question = document.createElement("div");
    question.classList.add("question");
    question.textContent = item.question;

    const answer = document.createElement("div");
    answer.classList.add("answer");

    let content = item.answer;
      // /* if (item.code) {
     // content += '<pre><code>'+escapeHtml(content)+'<code></pre>';
   // }*/

    answer.innerText = content;

    question.addEventListener("click", () => {
      answer.style.display =
        answer.style.display === "block" ? "none" : "block";
    });

    qa.appendChild(question);
    qa.appendChild(answer);
    container.appendChild(qa);
  });

  updatePagination();
}

// Pagination update
function updatePagination() {
  const totalPages = Math.ceil(filteredQuestions.length / itemsPerPage);

  pageInfo.textContent = `Page ${currentPage} of ${totalPages || 1}`;

  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages || totalPages === 0;
}

// Buttons
prevBtn.addEventListener("click", () => {
  currentPage--;
  renderPage();
});

nextBtn.addEventListener("click", () => {
  currentPage++;
  renderPage();
});

// Search
searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();

  filteredQuestions = allQuestions.filter(q =>
    q.question.toLowerCase().includes(query)
  );

  currentPage = 1;
  renderPage();
});

topicSelect.addEventListener("change",(event)=>{
      const topic = event.target.value;
      
    filteredQuestions = allQuestions.filter(q =>
           q.topic === topic);
      
      currentPage=1;
      renderPage();
 });

// Escape code safely
function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}