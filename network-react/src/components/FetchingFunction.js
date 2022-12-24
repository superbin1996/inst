
export default class FetchingFunction {
  // fetch url and url in urls.py should be the same, even '/' at the end

  static CurrentUser(token) {
    return (
      fetch(`http://127.0.0.1:8000/current_user/dummy`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${token["cookie"]}`
      }
      })
      .then((response) => { // This way will stop promise if error occur
        if (!response.ok) {
          // console.log("Error")
          throw Error(response.statusText)
        }
        // console.log("Success")
        return response.json()
      })
    )
  }

  static UpdateAvatar(token, avatar) {
    return (
      fetch(`http://127.0.0.1:8000/current_user/${avatar.name}/`, {
        method: "PUT", // Add '/' at the end of url for 'PUT' method
        headers: {
          "Authorization": `Token ${token["cookie"]}`
        },
        body: avatar
      })
      // .then((response) => { // This way will stop promise if error occur
      //   if (!response.ok) {
      //     // console.log("Error")
      //     throw Error(response.statusText)
      //   }
      //   // console.log("Success")
      //   return response.json()
      // })
      // .then(response=>response.json())
      // .catch(error=>console.log(`Error:`, error))
    )
  }
  
  // Get posts
  static GetPaginationPosts(token, page) {
    return (
      fetch(`http://127.0.0.1:8000/pagination_posts/${page}`, {
      method: "GET", // Do not add '/' at the end of url for 'GET' method
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${token["cookie"]}`
      }
      })
      .then(response=>response.json())
      .catch(error=>console.error('Error:', error))
    )
  }
  
  // Get following users posts
  static FollowingPosts(token, page) {
    return (
      fetch(`http://127.0.0.1:8000/following_posts/${page}/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${token["cookie"]}`
        }
      })
      // .then((response) => { // This way will stop promise if error occur
      //   if (!response.ok) {
      //     // console.log("Error")
      //     throw Error(response.statusText)
      //   }
      //   // console.log("Success")
      //   return response.json()
      // })
      .then(response=>response.json())
      .catch(error=>console.error('Error:', error))
    )
  }

  // Get user posts
  static UserPosts(token, userId, page) {
    return (
      fetch(`http://127.0.0.1:8000/user_posts/${userId}/${page}/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${token["cookie"]}`
        }
      })
      .then((response) => { // This way will stop promise if error occur
        if (!response.ok) {
          // console.log("Error")
          throw Error(response.statusText)
        }
        // console.log("Success")
        return response.json()
      })
    )
  }
    
  // Add post
  static Post(token, formData) {
    return (
      fetch(`http://127.0.0.1:8000/posts/`, {
        method: "POST",
        headers: {
          "Authorization": `Token ${token["cookie"]}`
        },
        body: formData
      })
      .then((response) => { // This way will stop promise if error occur
        if (!response.ok) {
          // console.log("Error")
          throw Error(response.statusText)
        }
        // console.log("Success")
        return response.json()
      })
    )
  }
    
  // Update post
  static EditPost(postId, formData, token) {
    return (
      fetch(`http://127.0.0.1:8000/posts/${postId}/`, {
        method: "PUT",
        headers: {
          "Authorization": `Token ${token["cookie"]}`
        },
        body: formData
      })
      // .then((response) => { // This way will stop promise if error occur
      //   if (!response.ok) {
      //     // console.log("Error")
      //     throw Error(response.statusText)
      //   }
      //   // console.log("Success")
      //   return response.json()
      // })
      .then(response=>response.json())
      .catch(error=>console.log(`Error:`, error))
    )
  }
      
      
  // Delete posts
  static Del(postId, token) {
    return (
      fetch(`http://127.0.0.1:8000/posts/${postId}/`, {
        method: "DELETE",
        headers: {
          "Authorization": `Token ${token["cookie"]}`
        }})
      // .then((response) => { // This way will stop promise if error occur
      //   if (!response.ok) {
      //     // console.log("Error")
      //     throw Error(response.statusText)
      //   }
      //   // console.log("Success")
      //   return response.json()
      // })
      .then(response=>response.json())
      .catch(error=>console.log(`Error:`, error))
    )
  }
  
  // Log in, fetch Token 
  static Login(body) {
    return (
      fetch("http://127.0.0.1:8000/auth/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      })
      .then((response) => {
        if (!response.ok) {
          // console.log("Error")
          throw Error(response.statusText)
        }
        // console.log("Success")
        return response.json()
      })
    )
  }
  
  // Register
  static Register(body) {
    return (
      fetch("http://127.0.0.1:8000/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      })
      .then((response) => { // This way will stop promise if error occur
        if (!response.ok) {
          // console.log("Error")
          throw Error(response.statusText)
        }
        // console.log("Success")
        return response.json()
      })
    )
  }

  // // Get posts username
  // static Username(userId, token) {
  //    return (
  //      fetch(`http://127.0.0.1:8000/users/${userId}/`, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "Authorization": `Token ${token["cookie"]}`
  //       }
  //     })
  //     .then(response => response.json())
  //   )
  // }

//   // Get users
//   static Users(token) {
//     return (
//       fetch(`http://127.0.0.1:8000/users/`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Token ${token["cookie"]}`
//         }
//       })
//       .then(response => response.json())
//       .catch((error) => {console.error("Error:", error)})
//    )
//  }

  // Check follow user or not
  static GetFollow(token, userId) {
    return (
      fetch(`http://127.0.0.1:8000/follow/${userId}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          "Authorization": `Token ${token["cookie"]}`
        }
      })
      .then((response) => { // This way will stop promise if error occur
        if (!response.ok) {
          // console.log("Error")
          throw Error(response.statusText)
        }
        // console.log("Success")
        return response.json()
      })
    )
  }

  // Follow 
  static Follow(token, userId) {
    return (
      fetch(`http://127.0.0.1:8000/follow/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${token["cookie"]}`
        }
      })
      .then((response) => { // This way will stop promise if error occur
        if (!response.ok) {
          // console.log("Error")
          throw Error(response.statusText)
        }
        // console.log("Success")
        return response.json()
      })
   )
 }

  static GetComments(token, postId) {
    return (
      fetch(`http://127.0.0.1:8000/comment/${postId}`, {
        method: 'GET',
        headers: {
          "Content-type": "application/json",
          'Authorization': `Token ${token['cookie']}`
        }
      })
      .then((response) => { // This way will stop promise if error occur
        if (!response.ok) {
          // console.log("Error")
          throw Error(response.statusText)
        }
        // console.log("Success")
        return response.json()
      })
    )
  }

  static GetCurrentUserComments(token, postId) {
    return (
      fetch(`http://127.0.0.1:8000/post_current_user_comment/${postId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token['cookie']}`
        }
      })
      .then((response) => { // This way will stop promise if error occur
        if (!response.ok) {
          // console.log("Error")
          throw Error(response.statusText)
        }
        // console.log("Success")
        return response.json()
      })
    )
  }

   // Add comment 
  static AddComment(token, postId, body) {
    return (
      fetch(`http://127.0.0.1:8000/comment/${postId}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${token["cookie"]}`
        },
        body: JSON.stringify(body)
      })
      .then(response => response.json())
      .catch((error) => {console.error("Error:", error)})
    )
  }

  static LikeSum(token, postId) {
    return (
      fetch(`http://127.0.0.1:8000/like_sum/${postId}`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Token ${token[`cookie`]}`
        }
      })
      .then((response) => { // This way will stop promise if error occur
        if (!response.ok) {
          // console.log("Error")
          throw Error(response.statusText)
        }
        // console.log("Success")
        return response.json()
      })
    )
  }

  static GetUserLike(token, postId) {
    return (
      fetch(`http://127.0.0.1:8000/like/${postId}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          "Authorization": `Token ${token["cookie"]}`
        }
      })
      .then((response) => { // This way will stop promise if error occur
        if (!response.ok) {
          // console.log("Error")
          throw Error(response.statusText)
        }
        // console.log("Success")
        return response.json()
      })
    )
  }

  static UpdateLike(token, postId, like) {
    return (
      fetch(`http://127.0.0.1:8000/like/${postId}/`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          "Authorization": `Token ${token["cookie"]}`
        },
        body: JSON.stringify({like})
      })
      // .then(response => response.json())
    )
  }

}

