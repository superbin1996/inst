import { CLEAR_STATES, GET_POSTS_BEGIN, GET_POSTS_SUCCESS, GET_OTHER_COMMENTS_SUCCESS, HANDLE_CHANGE, LOGIN_USER_BEGIN, LOGIN_USER_ERROR, LOGIN_USER_SUCCESS, SHOW_PROFILE, TOGGLE_POST_MODAL, GET_PROFILE_POSTS_SUCCESS, GET_PROFILE_POSTS_BEGIN, TOGGLE_UPLOAD_MODAL } from "./actions"

const reducer = (state, action) => {
  if (action.type === LOGIN_USER_BEGIN) {
    return {
      ...state,
      isLoading: true
    }
  }
  if (action.type === LOGIN_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      user: action.payload.user,
    }
  }
  if (action.type === LOGIN_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
    }
  }

  if (action.type === GET_POSTS_BEGIN) {
    return {
      ...state,
      isLoading: true,
    }
  }
  if (action.type === GET_POSTS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      posts: action.payload.posts,
    }
  }

  if (action.type === SHOW_PROFILE) {
    // console.log(action.payload.profileId);
    return {
      ...state,
      profileId: action.payload.profileId,
    }
  }

  if (action.type === GET_PROFILE_POSTS_BEGIN) {
    return {
      ...state,
      isLoading: true,
    }
  }
  if (action.type === GET_PROFILE_POSTS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      profilePosts: action.payload.data,
    }
  }

  if (action.type === TOGGLE_POST_MODAL) {
    const postId = action.payload.postId
    const post = action.payload.post
    // console.log(`postId:`, postId);
    // const post = state.posts.find(post => parseInt(post.id) === parseInt(postId))
    return {
      ...state,
      // showPostModal: true,
      postId: postId,
      post: post,
    }

  }

  if (action.type === GET_OTHER_COMMENTS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      otherComments: action.payload.data,
    }
  }

  if (action.type === CLEAR_STATES) {
    const initialState = {
      // alert
      showAlert: false,
      alertText: '',
      alertType: '',
      // posts
      // posts: [],
      // profile
      profileId: -1,
      profilePosts: [],
      // postModal
      // showPostModal: false,
      postId: -1,
      post: {},
      otherComments: [],
    }
    return {
      ...state,
      ...initialState,
    }
  }

  if (action.type === HANDLE_CHANGE) {
    return {
      ...state,
      [action.payload.name]: action.payload.value
    }
  }

  if(action.type === TOGGLE_UPLOAD_MODAL){
    return {
      ...state,
      showUploadModal: !state.showUploadModal,
    }
  }
}
export default reducer