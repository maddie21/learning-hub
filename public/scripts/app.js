$(() => {

  function createPost(post) {
    return $(`<div class="post" data-id=${post.id}>
      <p class="post-title">${post.title}</p>
     
      
      <p class="post-url"><a href=${post.URL}>${post.URL}</a></p>
      <p class="post-description">${post.description}</p>
      <p class="post-author">user ${post.user_id}</p>
      
      <div class="social-icon-wrapper">
     
        <i class="fas fa-heart"></i>
        <i class ="likes">${post.like_count}</i>
        <i class="far fa-comment"></i>
        <i class="fas fa-star"></i>
        <i class ="ratings">${post.rating_average}</i>

      </div>

    </div>`);
  }

  // @params: array of posts to render, and a designated container
  function renderPosts(posts, container) {
    $('#post-container').html('')
    $('#user-post-container').html('')

    posts.forEach(post => {
      $(container).prepend(createPost(post))
    })
  }

  // Load all posts and render it
  function loadPosts() {
    $.ajax({
      method: "GET",
      url: "/api/posts"
    }).done((response) => {
      if(response.status === 'success') {
        const posts = response.data
        renderPosts(posts, '#post-container')
      } else {
        console.log(response.errors)
      }
    })
  }

  function renderProfileContainer (user) {
    // create a jquery user profile
    const $user = $(`<div class="users" data-id=${user.id}>
    <p class="user-id">User ID:${user.id}</p>
    <p class="user-firstname">First name: ${user.first_name}</p>
    <p class="user-lastname">Last name: ${user.last_name}</p>
    <button class="button-update-form">Update</button>
    </div>`);

    // append the user to container
    $('.profile-container').append($user)

  }

  function renderProfileUpdate () {
    const $profileUpdateForm = $(`<form class="profile-update-form" 
    </br></br><label for="user_name">UserName:</label>
    <input type="text" id="user-id" name="user_name" placeholder="Your User Name"></br></br>
    <label for="password">Password: </label>
    <input type="text" id="password" name="password" placeholder="Your Password"></br></br>
    <label for="user_firstname">First name: </label>
    <input type="text" id="first_name" name="first_name" placeholder="Your First Name"></br></br>
    <label for="user_lastname">Last name: </label>
    <input type="text" id="last_name" name="last_name" placeholder="Your Last Name"></br></br>
    
    <input type="submit" class="button-update-profile" value="submit">
    </form>`); 
    $('.profile-container').append($profileUpdateForm)
  }
 
// Dispalys update form when "update" from ProfileContainer is clicked
  $('.profile-container').on('click', () => {
    if($(".profile-container").children().length <=1){
      renderProfileUpdate();
    }
  })

  $('.profile-container').on('submit', '.profile-upload-form', function (event) {
    event.preventDefault()
    
    console.log('target:', event.target)
    const inputSerial = $(this).serialize()
    $.post('/api/posts', inputSerial, () => {
      loadPosts()
    })  
  })

  // function to update user profile info
  function updateUser(user) {
    $.ajax({
      method: "POST",
      url: "/api/users/mine"
    })

  }
  $('.profile-update-form').on('submit', function (event) {
    event.preventDefault()
    
    const inputSerial = $(this).serialize()
    $.post('/api/users/mine', inputSerial, () =>{
      $.get('api/users/mine', (user) =>{
      
        if($(".profile-container").children().length == 0){
          renderProfileContainer(user);
        }
        
      })
    })
    // renderProfileUpdate()
  })

  // Toggle post form on click
  $('#post-resource').on('click', () => {
    $('.upload-form').slideToggle('ease')
  })

  // Load current user posts
  $('#my-resources').on('click', () => {
    $.get('/api/posts/mine', (response) => {
      if (response.status === 'success') {
        const posts = response.data
        renderPosts(posts, '#user-post-container')
      } else {
        console.log(response.errors)
      }
    })

    $.get('api/users/mine', (user) =>{
      
      if($(".profile-container").children().length == 0){
        renderProfileContainer(user);
      }
      
    })

  })

  // Loads all posts when click site title
  $('.page-title').on('click', () => {
    loadPosts()
  })

  // logs user1 in
  $('#login-li').on('click', () => {
    $.get('/login/1')
  })  


  $('#post-container').on('click', '.fa-heart', function() {
    const post_id = $(this).closest('.post').data('id')
    $.post(`/api/posts/${post_id}/like`, () => {
      // renderPost(post_id)
    })
  })

  $('.profile-container').on('click', '.button', function() {
    //const post_id = $(this).closest('.post').data('id')
    //$.post(`/api/posts/${post_id}/like`, () => {
      // renderPost(post_id)
    })
  

  // Initial load of the page
  loadPosts()

})


