'use strict';
let post = document.getElementById('post');
let url_post = 'http://localhost:8888/todo/add';
let url_get = 'http://localhost:8888/todo';
let url_delete = 'http://localhost:8888/todo/delete';
let url_patch='http://localhost:8888/todo/update'
let text = document.getElementById('text');
let bool = false

post.addEventListener('submit', function (e) {
  e.preventDefault();
  console.log('title>>>', this.title.value);
  let title = this.title.value;
  axios
    .post(url_post, { title })
    .then(res => {
      console.log('response:', res);
      this.title.value = '';
    })
    .catch(err => console.log(err));
});

const getInput = (data) => {
  return `<div id="remove" class="d-flex">
  <h2 id="text" onclick='textClick()'  class="title" style="margin-left:20px"> ${data.title}</h2> 
  <button onclick={btnclick('${data._id}')} type="button" class="btn btn-info mx-4">Delete</button>
</div>`
}

const patchInput = (data) => {
  return ` <div id="send" class="d-flex">
  <input id="update=${data._id}" value='${data.title}' type="text" class="form-control"
  aria-label="Recipient's username" aria-describedby="button-addon2">
  <button onclick={sendClick('${data._id}')} type="button" class="btn btn-info mx-4">Send</button>
</div>`
}

const textClick = () => {
    bool = !bool
    console.log(bool)
    getClick()
  }
const getClick = () => {
  axios
    .get(url_get)
    .then(res => {
      console.log('data>>>', res);
      let todo = document.getElementById('todo');
      let todoHtml = '';
      res.data.map(item => {
        todoHtml += bool ? patchInput(item) : getInput(item)
      });
      todo.innerHTML = todoHtml;
    })
    .catch(err => console.log(err));
};
getClick();

const btnclick = id => {
  axios
    .delete(`${url_delete}/${id}`)
    .then(res => console.log('res>>>', res))
    .catch(err => console.log(err));
};
const sendClick = id => {
bool=!bool
const update=document.getElementById(`update=${id}`)
console.log(id,update.value);
axios.patch(`${url_patch}/${id}`, {title:update.value})
.then((res)=>console.log(res))
.catch((err)=>console.log(err))
getClick()
  }