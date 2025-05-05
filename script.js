let currentUser = null;
let users = JSON.parse(localStorage.getItem('users')) || [];

function showRegisterForm() {
  document.getElementById('registerModal').style.display = 'block';
}

function showLoginForm() {
  document.getElementById('loginModal').style.display = 'block';
}

function closeModal(modalId) {
  document.getElementById(modalId).style.display = 'none';
}

function register() {
  const username = document.getElementById('registerUsername').value.trim();
  const email = document.getElementById('registerEmail').value.trim();
  const password = document.getElementById('registerPassword').value.trim();

  if (users.some(user => user.username === username)) {
    alert("Этот никнейм уже занят.");
    return;
  }

  if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
    alert("Введите корректный email.");
    return;
  }

  if (password.length < 5) {
    alert("Пароль должен содержать минимум 5 символов.");
    return;
  }

  const newUser = { username, email, password };
  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));

  alert("Вы успешно зарегистрировались!");
  closeModal('registerModal');
}

function login() {
  const username = document.getElementById('loginUsername').value.trim();
  const password = document.getElementById('loginPassword').value.trim();

  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    currentUser = user;
    alert("Успешный вход!");
    closeModal('loginModal');
    updateUI(); // Обновляем интерфейс после авторизации
  } else {
    alert("Неверный никнейм или пароль.");
  }
}

function updateUI() {
  const createQuestionButton = document.querySelector('button#createQuestion');
  const questionsSection = document.querySelector('#questionsSection');

  if (currentUser) {
    // Показываем кнопки и секции только для авторизованных пользователей
    if (createQuestionButton) createQuestionButton.style.display = 'inline-block';
    if (questionsSection) questionsSection.style.display = 'block';
  } else {
    // Скрываем кнопки и секции для неавторизованных пользователей
    if (createQuestionButton) createQuestionButton.style.display = 'none';
    if (questionsSection) questionsSection.style.display = 'none';
  }
}

// При загрузке страницы обновляем интерфейс
window.onload = function () {
  updateUI();
};
