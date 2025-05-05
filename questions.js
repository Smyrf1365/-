let questions = JSON.parse(localStorage.getItem('questions')) || [];
let questionsPerPage = 5;
let currentPage = 1;

// Функция добавления вопроса
function addQuestion() {
  const questionText = document.getElementById('questionInput').value.trim();

  if (questionText !== "") {
    const question = { text: questionText, answers: [] };
    questions.push(question);
    localStorage.setItem('questions', JSON.stringify(questions));
    displayQuestions();
    document.getElementById('questionInput').value = '';
  }
}

// Функция отображения вопросов (с пагинацией)
function displayQuestions() {
  const startIndex = (currentPage - 1) * questionsPerPage;
  const endIndex = currentPage * questionsPerPage;

  const questionsList = document.getElementById('questionsList');
  questionsList.innerHTML = ''; // Очистка списка

  // Отображение вопросов
  questions.slice(startIndex, endIndex).forEach(question => {
    const questionElement = document.createElement('div');
    questionElement.classList.add('question');

    const questionTitle = document.createElement('h3');
    questionTitle.textContent = question.text;
    questionElement.appendChild(questionTitle);

    questionsList.appendChild(questionElement);
  });

  // Показываем кнопку "Загрузить еще", если есть еще вопросы
  const loadMoreButton = document.getElementById('loadMoreQuestions');
  if (endIndex < questions.length) {
    loadMoreButton.style.display = 'block';
  } else {
    loadMoreButton.style.display = 'none';
  }
}

// Функция поиска вопросов
function searchQuestions() {
  const searchText = document.getElementById('searchInput').value.trim().toLowerCase();
  const filteredQuestions = questions.filter(q => q.text.toLowerCase().includes(searchText));

  displayFilteredQuestions(filteredQuestions);
}

// Отображение отфильтрованных вопросов
function displayFilteredQuestions(filteredQuestions) {
  const questionsList = document.getElementById('questionsList');
  questionsList.innerHTML = ''; // Очистка списка

  filteredQuestions.forEach(question => {
    const questionElement = document.createElement('div');
    questionElement.classList.add('question');

    const questionTitle = document.createElement('h3');
    questionTitle.textContent = question.text;
    questionElement.appendChild(questionTitle);

    questionsList.appendChild(questionElement);
  });

  if (filteredQuestions.length === 0) {
    const noResultsMessage = document.createElement('p');
    noResultsMessage.textContent = "Нет вопросов, соответствующих поисковому запросу.";
    questionsList.appendChild(noResultsMessage);
  }
}

// Загрузка дополнительных вопросов (пагинация)
function loadMoreQuestions() {
  currentPage++;
  displayQuestions();
}

function saveQuestion() {
  const title = document.getElementById('questionTitle').value.trim();
  const description = document.getElementById('questionDescription').value.trim();

  if (title === "" || description === "") {
    alert("Пожалуйста, заполните все поля.");
    return;
  }

  const newQuestion = {
    text: title, // Исправлено для соответствия структуре
    description: description,
    answers: []
  };

  questions.push(newQuestion);
  localStorage.setItem('questions', JSON.stringify(questions));
  alert("Вопрос успешно создан!");
  window.location.href = 'questions.html';
}
