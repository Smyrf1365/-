let currentUser = null;
let users = JSON.parse(localStorage.getItem('users')) || [];

function showRegisterForm() {
  document.getElementById('mainPage').style.display = 'none';
  document.getElementById('registerForm').style.display = 'block';
  document.getElementById('loginForm').style.display = 'none';
}

function showLoginForm() {
  document.getElementById('mainPage').style.display = 'none';
  document.getElementById('registerForm').style.display = 'none';
  document.getElementById('loginForm').style.display = 'block';
}

function register() {
  const username = document.getElementById('registerUsername').value.trim();
  const email = document.getElementById('registerEmail').value.trim();
  const password = document.getElementById('registerPassword').value.trim();

  if (users.some(user => user.username === username)) {
    alert("Этот никнейм уже занят.");
    return;
  }

  const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  if (!emailPattern.test(email)) {
    alert("Пожалуйста, введите правильный Gmail.");
    return;
  }

  if (password.length < 5) {
    alert("Пароль должен содержать минимум 5 символов.");
    return;
  }

  const newUser = { username, email, password };
  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));

  alert("Вы успешно зарегистрированы!");
  window.location.href = "questions.html";
}

function login() {
  const username = document.getElementById('loginUsername').value.trim();
  const password = document.getElementById('loginPassword').value.trim();

  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    currentUser = user;
    window.location.href = "questions.html";
  } else {
    alert("Неверный никнейм или пароль.");
  }
}
