$(() => {
  function createPost(post) {
    return $(`<div class="post" data-id=${post.id}>
      <p class="post-title">${post.title}</p>
      <p class="post-url"><a href=${post.URL}>${post.URL}</a></p>
      <p class="post-description">${post.description}</p>
      <p class="post-author">user ${post.user_id}</p>
      
      <div class="social-icon-wrapper">
      <i class="fas fa-heart"></i>
      <i class="far fa-comment"></i>
      <i class="fas fa-star-half-alt"></i>
      </div>

    </div>`);
  }

  function renderPosts(posts, container) {
    $('#post-container').html('')
    $('#user-post-container').html('')


    posts.forEach(post => {
      $(container).prepend(createPost(post))
    })
  }

  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done(users => {
    for (user of users) {
      $("<div>")
        .text(user.name)
        .appendTo($("body"));
    }
  });

  function loadPosts() {
    $.ajax({
      method: "GET",
      url: "/api/posts"
    }).done((posts) => {
      renderPosts(posts, '#post-container')
    })
  }

  function renderProfileContainer (user) {
    // create a jquery user profile
    const $user = $(`<div class="users" data-id=${user.id}>
    <p class="user-id">User ID:${user.id}</p>
    <p class="user-firstname">First name: ${user.first_name}</p>
    <p class="user-lastname">Last name: ${user.last_name}</p>
    </div>`);

    // append the user to container
    $('.profile-container').append($user)
       

  }

  $('.upload-form').on('submit', function (event) {
    event.preventDefault()
    const inputSerial = $(this).serialize()

    $.post('/api/posts', inputSerial, () => {
      loadPosts()
    })  
  })

  $('#post-resource').on('click', () => {
    $('.upload-form').slideToggle('ease')
  })

    // Rendering user profile and resources
  $('#my-resources').on('click', () => {
    // right screen
    $.get('/api/posts/mine', (posts) => {
      renderPosts(posts, '#user-post-container')
      $('#user-post-container').show()
    })

    // left screen 
    // $.get('/api/users', (users) => {
    //   renderProfileContainer(user)
    //   $('#profile-container').show()
    // })

    const user = {
      id: 1,
      first_name: 'xuenan',
      last_name: 'maddie'
    }
    
    renderProfileContainer(user)
    $('#profile-container').show()


  })

  // Loads all posts when click title
  $('.page-title').on('click', () => {
    loadPosts()
  })

  // logs user in
  $('#login-li').on('click', () => {
    $.get('/login/1')
  })  


  // Initial load of page
  loadPosts()
  $('.upload-form').toggle()
})

