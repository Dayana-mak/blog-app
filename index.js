const posts = [];

const TITLE_VALIDATION_LIMIT = 100;
const TEXT_VALIDATION_LIMIT = 200;

const postTitleInputNode = document.querySelector('.js-post-title-input');
const postTextInputNode = document.querySelector('.js-post-text-input');
const newPostBtnNode = document.querySelector('.js-post-btn');
const postsNode = document.querySelector('.js-posts');
const validationMessage = document.getElementById('js-validation-message');

newPostBtnNode.addEventListener('click', function() {
  if (isEmptyInputs()) {
    return;
  }

  const postFromUser = getPostFromUser();
  addPost(postFromUser);
  renderPosts();

  postTitleInputNode.value = '';
  postTextInputNode.value = '';
});

postTitleInputNode.addEventListener('input', validation);
postTextInputNode.addEventListener('input', validation);

function validation() {
  const titleLength = postTitleInputNode.value.length;
  const textLength = postTextInputNode.value.length;

  if (titleLength > TITLE_VALIDATION_LIMIT) {
    validationMessage.innerText = `Длина заголовка не должна превышать ${TITLE_VALIDATION_LIMIT} символов`;
    validationMessage.classList.remove('validation-message_hidden');
    newPostBtnNode.disabled = true;
    newPostBtnNode.classList.add('disabled'); 
    return;
  }

  if (textLength > TEXT_VALIDATION_LIMIT) {
    validationMessage.innerText = `Длина текста не должна превышать ${TEXT_VALIDATION_LIMIT} символов`;
    validationMessage.classList.remove('validation-message_hidden');
    newPostBtnNode.disabled = true;
    newPostBtnNode.classList.add('disabled'); 
    return;
  }

  newPostBtnNode.disabled = false;
  newPostBtnNode.classList.remove('disabled'); 
  validationMessage.classList.add('validation-message_hidden');
}

function isEmptyInputs() {
  if (postTitleInputNode.value.trim() === '') {
    validationMessage.innerText = 'Поле заголовка не должно быть пустым';
    validationMessage.classList.remove('validation-message_hidden');
    return true;
  }

  if (postTextInputNode.value.trim() === '') {
    validationMessage.innerText = 'Поле поста не должно быть пустым';
    validationMessage.classList.remove('validation-message_hidden');
    return true;
  }

  validationMessage.classList.add('validation-message_hidden')
  return false;
}

function getPostFromUser() {
  const title = postTitleInputNode.value;
  const text = postTextInputNode.value;
  const date = getDate();

  return {
    date: date,
    title: title,
    text: text,
  };
}

function getDate() {
  const date = new Date();

  let year = date.getFullYear();
  let month = date.getMonth();
  let day = date.getDate();
  let hour = date.getHours();
  let minutes = date.getMinutes();

  day = day < 10 ? '0' + day : day;
  month = month < 10 ? '0' + month : month;
  hour = hour < 10 ? '0' + hour : hour;
  minutes = minutes < 10 ? '0' + minutes : minutes;

  const postDate = `${day}.${month}.${year} ${hour}:${minutes}` 
  return postDate;
}

function addPost({date, title, text}) {
  posts.push({
    date,
    title,
    text,
  });
}

function getPosts() {
  return posts;
}

function renderPosts() {
  const posts = getPosts();

  let postsHTML = '';

  posts.forEach(post => {
    postsHTML = `
      <div class='post'>
        <p class='post__date'>${post.date}</p>
        <h3 class='post__title'>${post.title}</h3>
        <p class='post__text'>${post.text}</p>
      </div> ${postsHTML}
    `
  });

  postsNode.innerHTML = postsHTML;
}