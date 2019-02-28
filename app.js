(function() {
  "use strict";


  function Ajax(url) {
    this.url = url;
  }

  Ajax.prototype.generateRequest = function(method, path, data, cb) {
    const xhr = new XMLHttpRequest();
    xhr.open(method, this.url + path);

    xhr.onreadystatechange = function() {
      if(xhr.readyState === 4) {
        cb(xhr.responseText);
      }     
    }

    xhr.send(data);
  }

  Ajax.prototype.get = function(path, cb) {
    this.generateRequest("GET", path, null, cb);
  }

  Ajax.prototype.post = function(path, data, cb) {
    this.generateRequest("POST", path, data, cb);
  }

  Ajax.prototype.put = function(path, data, cb) {
    this.generateRequest("PUT", path, data, cb);
  }

  Ajax.prototype.delete = function(path, cb) {
    this.generateRequest("DELETE", path, null, cb);
  }

  const api = new Ajax("https://api.github.com");

  function renderUI(data) {
    let html = '';

    data.slice(0, 6).forEach(function(item) {
      html += `
        <div class="post" data-id="${item.id}">
          <h3>${item.title}</h3>
          <p>${item.body}</p>
        </div>
      `;
    });

    return html;
  }


  function renderUser(profile) {
    console.log(profile);
  }


  /*
    user.username = "mojombo";
    user.email = "test@sample.com";
    user.password = "adsadsad";
  */

  const user = {};
  const $username = document.getElementById("username");
  const $email = document.getElementById("email");
  const $password = document.getElementById("password");

  const $button = document.getElementById("send");

  $username.addEventListener("change", function(e) {
    user.username = e.target.value;
  });

  $email.addEventListener("change", function(e) {
    user.email = e.target.value;
  });

  $password.addEventListener("change", function(e) {
    user.password = e.target.value;
  });

  $button.addEventListener("click", function(e) {
    console.log(user);

    api.post('/users', JSON.stringify(user), function(data) {
      console.log(data);
    });
  });

  

  /*
  const $input = document.getElementById("input");
  $input.addEventListener("keypress", function(event) {
    api.get("/search/users?q=" + event.target.value, function(data) {
      renderUser(data);
    });
  });
  */


  
/*
  api.get("/posts", function(posts) {
    posts = JSON.parse(posts);
    const html = renderUI(posts);
    document.getElementById("posts").innerHTML = html;
  });
*/

})();
