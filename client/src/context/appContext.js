import React, { useContext, useReducer } from "react";
// import axios from 'axios'
import reducer from './reducer'
import { CLEAR_STATES, GET_POSTS_BEGIN, GET_POSTS_SUCCESS, GET_OTHER_COMMENTS_SUCCESS, HANDLE_CHANGE, LOGIN_USER_BEGIN, LOGIN_USER_ERROR, LOGIN_USER_SUCCESS, SHOW_PROFILE, TOGGLE_POST_MODAL, GET_PROFILE_POSTS_BEGIN, GET_PROFILE_POSTS_SUCCESS, TOGGLE_UPLOAD_MODAL, TOGGLE_OPTION_MODAL, HIDE_OPTION_MODAL } from "./actions";

const user = localStorage.getItem('user')

const initialState = {
  isLoading: false,
  // alert
  showAlert: false,
  alertText: '',
  alertType: '',
  // user
  user: user ? JSON.parse(user) : null,
  // posts
  posts: [],
  // profile posts
  profilePosts: [],
  // profile
  profileId: -1,
  // postModal
  postId: -1,
  showPostModal: false,
  post: {},
  otherComments: [],
  // add post
  status: '',
  // upload modal
  showUpLoad: false,
  // Option modal
  showOptionModal: false,
}

const AppContext = React.createContext()
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  // const authFetch = axios.create({
  //   baseURL: '/api/v1',
  // })

  const addUserToLocalStorage = (user) => {
    localStorage.setItem('user', JSON.stringify(user))
  }

  const login = async () => {
    dispatch({ type: LOGIN_USER_BEGIN })
    try {
      const url = `/data/user.json`
      const response = await fetch(url)
      const user = await response.json()
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: {
          user,
        }
      })
      addUserToLocalStorage(user)
    } catch (error) {
      dispatch({ type: LOGIN_USER_ERROR, payload: { 'msg': error.response } })
    }
  }

  // currently be used in Home.js
  const clearStates = () => {
    dispatch({ type: CLEAR_STATES })
  }

  const getPosts = async () => {
    dispatch({ type: GET_POSTS_BEGIN })
    const url = `/data/posts.json`
    try {
      const response = await fetch(url)
      const posts = await response.json()
      console.log(posts);
      dispatch({ type: GET_POSTS_SUCCESS, payload: { posts } })
    } catch (error) {
      console.log(error.response);
    }
  }

  const getProfilePosts = async (profileId) => {
    // dispatch({ type: GET_PROFILE_POSTS_BEGIN })
    const url = `/data/profilePosts.json`
    try {
      console.log(`profile ${profileId}`)
      const response = await fetch(url)
      const data = await response.json()
      console.log(data);
      dispatch({ type: GET_PROFILE_POSTS_SUCCESS, payload: { data } })
    } catch (error) {
      console.log(error.response);
    }
  }

  const showProfile = (profileId) => {
    dispatch({ type: SHOW_PROFILE, payload: { profileId } })
    // getProfilePosts(profileId)
  }

  const getOtherComments = async (postId) => {
    const url = `/data/otherCommentList.json`
    try {
      const response = await fetch(url)
      const data = await response.json()
      dispatch({ type: GET_OTHER_COMMENTS_SUCCESS, payload: { data } })
    } catch (error) {
      console.log(error.response);
    }
  }

  const togglePostModal = (postId) => {
    console.log(`postId:`, postId);
    if (postId === -1) {
      dispatch({ type: TOGGLE_POST_MODAL, payload: { postId, post: {}, showPostModal: false } })
      return
    }
    const post = state.posts.find(post => parseInt(post.id) === parseInt(postId))
    getOtherComments(postId)
    dispatch({ type: TOGGLE_POST_MODAL, payload: { postId, post, showPostModal: true } })
  }

  const handleChange = ({ name, value }) => {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } })
  }

  const toggleUploadModal = () => {
    dispatch({ type: TOGGLE_UPLOAD_MODAL })
  }

  // Change img url
  function changeImagePath(image) {
    const baseUrl = 'http://127.0.0.1:8000/media/'
    if ((image || '').includes(baseUrl)) {
      return image
    }
    else {
      return baseUrl + image
    }
  }

  // Add new post. 
  const addPost = async (formData) => {
    // FetchingFunction.Post(token, formData)
    //   .then(data => {
    //   })
    //   .then(() => {
    //     // setItemOffset(0)
    //     setBackendOffset(1)
    //     setTogglePosts(true)

    //     if (showProfile) {

    //       getProfilePosts()
    //     }
    //     else {
    //       getAllPosts()
    //     }
    //   })
  }

  const toggleOptionModal = (post) => {
    if (state.showOptionModal){
      if (!state.showPostModal){
        dispatch({ type: TOGGLE_OPTION_MODAL, payload: { post:{} } })  
      }
      else {  
        dispatch({ type: TOGGLE_OPTION_MODAL, payload: { post:state.post } })  
      }
      return
    }
    dispatch({ type: TOGGLE_OPTION_MODAL, payload: { post } })
  }

  const hideOptionModal = () => {
    dispatch({ type: HIDE_OPTION_MODAL })
  }


  return (
    <AppContext.Provider
      value={{
        ...state,
        clearStates,
        getPosts,
        showProfile,
        togglePostModal,
        login,
        handleChange,
        getProfilePosts,
        getOtherComments,
        toggleUploadModal,
        changeImagePath,
        addPost,
        toggleOptionModal,
        hideOptionModal,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

const useAppContext = () => { return (useContext(AppContext)) }

export { useAppContext, AppProvider, initialState }
