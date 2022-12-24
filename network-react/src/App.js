import React, {useState, useEffect} from 'react';
import { useNavigate, Outlet } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import './App.css';
import Header from './components/Header';
import Main from './components/Main';
import UploadModal from './components/UploadModal';
import FetchingFunction from './components/FetchingFunction';
import ReactPaginate from 'react-paginate';
import PropTypes from 'prop-types'

export const AppContext = React.createContext()

function App({itemsPerPage}) {

  // eslint-disable-next-line
  const [token, setToken, removeToken] = useCookies(["cookie"]) 

  const [posts, setPosts] = useState([])
  // const [users, setUsers] = useState([])
  const [showFollowBtn, setShowFollowBtn] = useState(false)

  // Change between all posts and following posts, false is following posts
  const [togglePosts, setTogglePosts] = useState(true)

  // Current user information, all in string
  const [currentUser, setCurrentUser] = useState([])
  
  // Show uploadModal
  const [uploadModal, setUploadModal] = useState(false)
  
  // When click on avatar in header
  const [profileDrop, setProfileDrop] = useState('dropdown-content')
  
  // Show profile
  const [showProfile, setShowProfile] = useState(false)
  
  // Use for edit, del and add functions in profile, load profile info in Main.js
  const [profileId, setProfileId] = useState(null)
  const [profileUsername, setProfileUsername] = useState(null)
  const [profileAvatar, setProfileAvatar] = useState(null)
  
  // Profile Follow state
  const [isFollow, setIsFollow] = useState(0)
  const [followerSum, setFollowerSum] = useState(0)
  const [followingSum, setFollowingSum] = useState(0)

  // entire posts_length, use for pages pagination
  const [length, setLength] = useState(0)

   // We start with an empty list of items.
  const [currentItems, setCurrentItems] = useState([]);

  //  Paginate pages
  const [pageCount, setPageCount] = useState(0);
  
   // Starting item number
  const [itemOffset, setItemOffset] = useState(0);

  // Decides when to get posts from backend
  const [backendOffset, setBackendOffset] = useState(1)

  // Number of posts for each time backend load
  // eslint-disable-next-line
  const [backendPosts, setBackendPosts] = useState(20)
  

  // Use to redirect website
  const navigate = useNavigate()


  useEffect(()=>{
    // console.log(`useEffect 1 run`)

    // If token expires, move to login page and remove username in localStorage
    if (typeof(token["cookie"]) === "undefined") {
      localStorage.removeItem("username")
      localStorage.removeItem("userId")
      navigate("/")
    } 
    else {

      getCurrentUser()
      
      // Get all posts or get following users's posts
      if (togglePosts) {
        setItemOffset(0)

        // Get profile posts
        // console.log('showProfile:', showProfile)
        if (profileId) {
          console.log('profileId:', profileId)
          getProfilePosts()  
        }
        else {
          // console.log('get all posts')
          getAllPosts()
        }

      }
      else {
        getFollowingPosts()
        console.log('get following posts')
      }

    }
  }, [token, navigate, togglePosts, backendOffset, length, profileId])


  useEffect(()=>{
    // if (itemOffset !== 0) {
      // console.log(`useEffect 2 run`)
      getCurrentItems(posts)

    // }
  }, [itemOffset])

  function getCurrentUser() {
    // Get current user information
    FetchingFunction.CurrentUser(token)
    .then((data)=>{
      // console.log(`currentUser:`, data)
      localStorage.setItem('userId', data.id)
      localStorage.setItem('username', data.username); 
      setCurrentUser(data)
    })
  }


  // Get all posts with pagination
  function getAllPosts() {
    FetchingFunction.GetPaginationPosts(token, backendOffset)
    .then((data) => {
      // console.log(`posts_length:`, data.posts_length)
      // console.log(`posts:`, data.posts)
      // console.log(`backendOffset:`, backendOffset)
      // console.log(`itemOffset:`, itemOffset)
      setPosts(data.posts)
      setLength(data.posts.length)
      setItemOffset(0)
      getCurrentItems(data.posts)
      setPageCount(Math.ceil(data.posts_length / itemsPerPage));
    })
  }


  // Items are displayed for each page 
  function getCurrentItems(posts) {

    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    // setPageCount(Math.ceil(length / itemsPerPage));
    setCurrentItems(posts.slice(itemOffset, endOffset));
    // console.log(`currentItems:`, currentItems)
  }


  // Invoke when user click to request another page.
  function handlePageClick(event) {
    // const newOffset = (event.selected * itemsPerPage) % articles.length;
    const newOffset = (event.selected * itemsPerPage) % backendPosts;

    // console.log(`event.selected ${event.selected} means click on button ${event.selected + 1}`)

    setItemOffset(newOffset);
    setBackendOffset(Math.floor(event.selected * itemsPerPage / backendPosts) + 1)
    
    setTimeout(()=>{
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
      })
      
    }, 300)

    // getCurrentItems(articles)
    // console.log(`current itemOffset:`, itemOffset)
    // console.log(`new itemOffset:`, newOffset)
  }


  // Toggle button content from All posts to following posts
  function getFollowingPosts() {
    FetchingFunction.FollowingPosts(token, backendOffset)
    .then((data) => {
      // console.log(`posts_length:`, data.posts_length)
      // console.log(`posts:`, data.posts)
      // console.log(`backendOffset:`, backendOffset)
      // console.log(`itemOffset:`, itemOffset)
      setPosts(data.posts)
      setLength(data.posts.length)
      getCurrentItems(data.posts)
      setPageCount(Math.ceil(data.posts_length / itemsPerPage));
      setItemOffset(0)
    })
  }
  
  
  // Show profile
  function triggerProfile(props) {
    const {profileId, profileUsername, profileAvatar} = props
    console.log(`Profile:`, props)

    setProfileId(profileId)
    setProfileUsername(profileUsername)
    setProfileAvatar(profileAvatar)
    
    setTimeout(()=>{
      setTogglePosts(true)
      setShowProfile(true)
    }, 300)
  }
  
  // Get profile posts, use in useEffect
  function getProfilePosts() {
    FetchingFunction.UserPosts(token, profileId, backendOffset)
    .then((data) => {
      // console.log(`posts_length:`, data.posts_length)
      // console.log(`posts:`, data.posts)
      setPosts(data.posts)
      setLength(data.posts.length)
      getCurrentItems(data.posts)
      // setPostNumber(data.posts.length)
      setPageCount(Math.ceil(data.posts_length / itemsPerPage));
    })

    // getFollowState(profileId)
  }

  // All profile follow state of
  function getFollowState(userId) {
    FetchingFunction.GetFollow(token, userId)
    .then((data)=>{
      // console.log('follow state:', data)
      setIsFollow(data.isFollow)
      setFollowerSum(data.followers)
      setFollowingSum(data.following)
    })
  }
  
  // // Follow or unfollow
  // function follow(userId) {
  //   FetchingFunction.Follow(token, userId)
  //   .then((data)=>{
      // console.log(`follow:`, data.follow)
  //   })
  // }

  // Add new post. 
  function addPost(formData) {
    
    FetchingFunction.Post(token, formData)
    .then(data => {
        // console.log("Success:", data)
    })
    .then(()=>{
        
      // setItemOffset(0)
      setBackendOffset(1)
      setTogglePosts(true)

      if (showProfile) {
        
        getProfilePosts()
      }
      else {
        getAllPosts()
      }

    })

  }

  // Edit post
  function editPost(postId, formData) {
    // console.log(`editBody: `, formData)

    FetchingFunction.EditPost(postId, formData, token)
    // No need to reload all data
    // .then(()=>{
        
    //   // setItemOffset(0)
    //   setBackendOffset(1)
      
    //   if (showProfile) {
        
    //     getProfilePosts()
    //   }
    //   else {
    //     getAllPosts()
    //   }

    // })
    
  }

  // Delete post
  function delPost(postId) {
    FetchingFunction.Del(postId, token)
    .then(()=>{
        
      // setItemOffset(0)
      setBackendOffset(1)
      
      if (showProfile) {
        
        getProfilePosts()
      }
      else {
        getAllPosts()
      }

    })
  }

  // Dropdown when click in user icon in header
  function showHeaderUserOption() {
    if (profileDrop === 'dropdown-content') {
      setProfileDrop('dropdown-content show')
    }
    else {
      setProfileDrop('dropdown-content')
    }
    // console.log("profileDropDown run")
  }

  function hideHeaderUserOption() {
    if (profileDrop === 'dropdown-content show') {

      setProfileDrop('dropdown-content')
    }
  }

  // Change img url
  // function avatarPath(image) {
  //   return `http://127.0.0.1:8000/media/` + image
  // }

  // Change img url
  function imagePath(image) {
    if ((image || '').includes('http://127.0.0.1:8000/media/')) {
      return image
    }
    else {
      return `http://127.0.0.1:8000/media/` + image
    }
  }

  function logout() {
    removeToken('cookie')
  }


  // Upload modal trigger
  function uploadModalTrigger() {
    // console.log(`showUploadModal: ${!uploadModal}`)
    setUploadModal(!uploadModal);
    if (Boolean(uploadModal) === true) {
      navigate('/posts')
    }
  }
  
  return (
    <AppContext.Provider 
      value={{ 
        addPost,
        delPost,
        editPost,
      }}
    >
      <div className="App">
        <Header
          token={token}
          currentUser={currentUser}
          setPosts={setPosts}
          uploadModalTrigger={uploadModalTrigger} 
          removeToken={removeToken}
          profileDrop={profileDrop}
          setProfileDrop={setProfileDrop}
          setShowFollowBtn={setShowFollowBtn}
          setShowProfile={setShowProfile}
          setTogglePosts={setTogglePosts}
          setItemOffset={setItemOffset}
          setBackendOffset={setBackendOffset}
          imagePath={imagePath}
          triggerProfile={triggerProfile}
          showHeaderUserOption={showHeaderUserOption}
          hideHeaderUserOption={hideHeaderUserOption}
          logout={logout}
          showProfile={showProfile}
        />

        {uploadModal && 
        <UploadModal 
          currentUser={currentUser} 
          addPost={addPost} 
          uploadModalTrigger={uploadModalTrigger} 
          imagePath={imagePath}
        />
        }

        <Outlet />

        <Main 
          posts={currentItems} 
          token={token}
          triggerProfile={triggerProfile}
          currentUser={currentUser}
          setShowFollowBtn={setShowFollowBtn}
          showFollowBtn={showFollowBtn}
          showProfile={showProfile}
          setShowProfile={setShowProfile}
          length={length}
          setBackendOffset={setBackendOffset}
          setItemOffset={setItemOffset}
          imagePath={imagePath}
          profileId={profileId}
          profileAvatar={profileAvatar}
          profileUsername={profileUsername}
          setProfileAvatar={setProfileAvatar}
          hideHeaderUserOption={hideHeaderUserOption}
          getFollowState={getFollowState}
          isFollow={isFollow}
          setIsFollow={setIsFollow}
          followerSum={followerSum}
          followingSum={followingSum}
        />
        
        
        <ReactPaginate
          className='pagination'
          pageClassName='pagination-page'
          pageLinkClassName='pagination-link'
          nextClassName='nextClassName'
          previousClassName='previousClassName'
          activeLinkClassName='activeLinkClass'
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
        />

      </div>
    </AppContext.Provider>
  )
}

App.propTypes = {
  posts: PropTypes.array.isRequired,
  posts_length: PropTypes.number.isRequired,
}

App.defaultProps = {
  posts: [],
  posts_length: 0,
}

export default App;

