$(() => {
  const getPostFormHTML = () => {
    return `
    <form action="/api/posts" method="POST" class="upload-form">
      <input type="textarea" name="title" placeholder="Title">
      <input type="text" name="URL" placeholder="Url of your resource">
      <textarea name="description" placeholder="People should read it because..." cols="30" rows="10"></textarea>
      <input name="category_name" id="category-input" list="categories" name="categories" placeholder="category">
      
      <datalist id="categories">
        <option value="Design">
        <option value="Sports">
        <option value="Technology">
        <option value="Music">
        <option value="Politics">
      </datalist> 
      <input class="post-button" type="submit" value="Upload"> 
    </form>
  `}

  // Get sample user name
  const getUsername = userId => {
    switch(userId) {
      case 1: return 'alice123';
      case 2: return 'MrBob';
      case 3: return 'brown';
      default: return 'stranger';
    }
  }

  const createPostHTML = post => {
    return `
    <div class="post" data-id=${post.id}>
      <div class="post-content">
        <div class="post-header">
          <p class="post-title">${post.title}</p>
          <p class="post-url"><a href="${post.URL}" target="_blank">read more</a></p>
          <p class="post-author">@${getUsername(post.user_id)}</p>
        </div>

        <p class="post-description">${post.description}</p>
        <div class="post-social">
          <i class="fas fa-heart"></i>
          <i class ="likes">${post.like_count || 0}</i>
          <i class="far fa-comment">${getComments(post.id).length || 0 }</i>
          <i class="fas fa-star-half-alt"></i>
          <i class ="ratings">${post.rating_average || ''}</i>
        </div>
      </div>
      <div class="post-comments"></div>
    </div>
    `
  }

  // @params: array of posts to render, and a designated container
  function renderPosts(posts, eraseContainer = true) {
    if (eraseContainer) {
      $('#post-container').html('')
      posts.forEach(post => {
        $(createPostHTML(post)).hide().prependTo('#post-container').slideDown('easing');
      })
    } else {
      posts.forEach(post => {
        $(createPostHTML(post)).hide().appendTo('#post-container').slideDown('easing')
      })
    }
  }

  // Load all posts and render it
  function loadPosts() {
    $.ajax({
      method: "GET",
      url: "/api/posts"
    }).done((response) => {
      if(response.status === 'success') {
        const posts = response.data
        renderPosts(posts)
      } else {
        console.log(response.errors)
      }
    })
    .catch(error => console.log(error))
  }

  // Reload a given post
  function refreshPost($post) {
    const post_id = $post.data('id')

    $.get(`/api/posts/${post_id}`, ({data}) => {
      // $post.html('')
      $post.replaceWith(createPostHTML(data))
    })
  }

  const renderSidebarContent = (htmlBlock, eraseContent = true) => {
    if (eraseContent) {
      $('.sidebar-content').html('')
    }
    $(htmlBlock).hide().appendTo('.sidebar-content').slideDown('easing')
  }

  const createUserProfileHTML = user => {
    return `
    <div class="user">
      <p class="user-username">@${user.username}</p>
      <p class="user-full-name">${user.first_name} ${user.last_name}</p>
      <button class="btn btn-light" id="button-profile-update">Update</button>
    </div>
    `
  }

  const getComments = postId => $.get(`api/posts/${postId}/comments`, (comments) => comments)

  const getCommentHTML = comment => {
    return `
      <div class="comment">
        ${comment.content}
      </div>
    `
  }

  const renderCommentsByPost = (comments, $post) => {
    const commentArea = $post.children('.post-comments')
    console.log(commentArea)
    comments.forEach(comment => {

      $(commentArea).append($(getCommentHTML(comment)))
      // $(getCommentHTML(comment)).appendTo(commentArea)
    })
    console.log(commentArea)

  }

  // Event listeners
  $('.upload-form').on('submit', function (event) {
    event.preventDefault()
    
    const inputSerial = $(this).serialize()
    $.post('/api/posts', inputSerial, () => {
      loadPosts()
    })  
  })

  // Toggle post form on click
  $('#post-resource').on('click', () => {
    renderSidebarContent(getPostFormHTML())
  })

  // Load current user profile and posts
  $('#my-resources').on('click', () => {
    // Render profile in the sidebar
    $.get('/api/users/mine', ({data}) => renderSidebarContent(createUserProfileHTML(data)))

    // posts created by current user
    $.get('/api/posts/mine', (response) => {
      if (response.status === 'success') {
        $('#post-container').html('<h1>My resources</h1>')
        const createdPosts = response.data
        renderPosts(createdPosts, false)
      } else {
        console.log(response.errors)
      }
    })

    // posts liked by current user
    $.get('/api/posts/mine/like', (response) => {
      if (response.status === 'success') {
        $('#post-container').append('<h1>My Favourites</h1>')
        const posts = response.data
        console.log('liked posts: ', posts)
        renderPosts(posts, false)
      } else {
        console.log(response.errors)
      }
    })

  })

  // Loads all posts when click site title
  $('.page-title').on('click', () => loadPosts())

  $('#post-container').on('click', '.fa-heart', function() {
    const $post = $(this).closest('.post')
    const postId = $post.data('id')
    
    $.post(`/api/posts/${postId}/like`, () => {
      refreshPost($post)
    })
  })

  $('#post-container').on('click', '.fa-comment', function() {
    const $post = $(this).closest('.post')
    const postId = $post.data('id')
    
    $.get(`/api/posts/${postId}/comments`, ({data}) => {
      renderCommentsByPost(data, $post)
    })
  })

  // Initial load of the page
  $('.upload-form').toggle()
  loadPosts()
})


