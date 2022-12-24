import React, {useState, useEffect, useContext} from 'react'
import { BsThreeDots } from 'react-icons/bs';
import {AiOutlineHeart} from 'react-icons/ai';
import { FaRegComment } from 'react-icons/fa';
import {FiSend} from 'react-icons/fi';
import { BsBookmark } from 'react-icons/bs';
import {VscDebugStackframeDot} from 'react-icons/vsc';
import {HiOutlineEmojiHappy} from 'react-icons/hi';
import FetchingFunction from './FetchingFunction';
import PostModal from './PostModal';
import OptionModal from './OptionModal';
import EditPost from './EditPost';
import { AppContext } from '../App';

const Post = (props) => {

  const {
    delPost,
    editPost,
  } = useContext(AppContext)
  
  const {
    post,
    token,
    currentUser,
    triggerProfile,
    showProfile,
    imagePath,
    getFollowState,
    isFollow,
    setIsFollow,
    changeFollowState,
    preventSelfFollow,
  } = props

  // Toggle like
  const [like, setLike] = useState(false)

  // Caption
  const [caption, setCaption] = useState('')

  // Get currentUser's comment to show on post list
  const [currentUserComments, setCurrentUserComments] = useState([])

  // Number of like in post
  const [likeSum, setLikeSum] = useState(0)

  // Comment input value
  const [comment, setComment] = useState('')

  // Show post modal
  const [showPost, setShowPost] = useState(false)

  // Show option modal
  const [showOption, setShowOption] = useState(false)

  // Show edit modal
  const [showEdit, setShowEdit] = useState(false)

  useEffect(()=>{
    getCurrentUserLike()
    getCurrentUserComment()
    getLikeSum()
  }, [like, post, token])

  useEffect(()=>{
    getCurrentUserComment()
  }, [post, token])

  useEffect(()=>{
    setCaption(post.status)
  }, [])

  function getLikeSum() {
    FetchingFunction.LikeSum(token, post.id)
    .then((data)=>{
      setLikeSum(data)
    })
  }

  function getCurrentUserLike() {
    FetchingFunction.GetUserLike(token, post.id)
    .then((data)=>{
      setLike(data.like)
    })
  }

  function getCurrentUserComment() {
    FetchingFunction.GetCurrentUserComments(token, post.id)
    .then((data)=>{
      setCurrentUserComments(data)
    })
  }


  function likeToggle() {
    FetchingFunction.UpdateLike(token, post.id, !like)
    .then(()=>{
      setLike(!like)
    })
  }

  function addComment() {
    FetchingFunction.AddComment(token, post.id, {content:comment})
    .then(()=>{
      setComment('')
      getCurrentUserComment()
    })
  }

  function profileTrigger(props) {
    triggerProfile(props)
  }

  function postModalTrigger() {
    setShowPost(!showPost)
  }

  function optionModalTrigger() {
    setShowOption(!showOption)
  }

  function editModalTrigger() {
    setShowEdit(!showEdit)
    setShowOption(false)
  }

  return (
      
    <article className='post-cover'>
      { showPost && 
      <PostModal
        token={token}
        post={post}
        imagePath={imagePath}
        currentUser={currentUser}
        postModalTrigger={postModalTrigger}
        isFollow={isFollow}
        setIsFollow={setIsFollow}
        getFollowState={getFollowState}
        changeFollowState={changeFollowState}
        preventSelfFollow={preventSelfFollow}
        currentUserComments={currentUserComments}
        comment={comment}
        setComment={setComment}
        addComment={addComment}
        optionModalTrigger={optionModalTrigger}
        caption={caption}
        profileTrigger={profileTrigger}
        like={like}
        likeSum={likeSum}
        likeToggle={likeToggle}
        />}

      { showOption && 
      <OptionModal
        optionModalTrigger={optionModalTrigger}
        delPost={delPost} 
        post={post}
        currentUser={currentUser}
        getFollowState={getFollowState}
        isFollow={isFollow}
        changeFollowState={changeFollowState}
        editModalTrigger={editModalTrigger}
        />
      }

      { showEdit &&
      <EditPost
        editModalTrigger={editModalTrigger}
        editPost={editPost}
        currentUser={currentUser}
        imagePath={imagePath}
        post={post}
        caption={caption}
        setCaption={setCaption}
      />
      }

      { showProfile ?
      <div className='profile-images-item' onClick={postModalTrigger}>
        <img src={imagePath(post.image)} alt={post.avatar} />
      </div>

      :
      <div>
        {/* Post info */}
        <div className='post-info-cover'>
          {/* Post owner */}
          <div className='post-info' onClick={()=>profileTrigger({'profileId':post.user__id, 'profileUsername':post.user__username, 'profileAvatar':post.user__avatar})}>
            <img className='icon-user-1 icon' src={imagePath(post.user__avatar)} alt="haku" />
            <div style={{fontWeight:'500'}}>{post.user__username}</div>
          </div>
          <BsThreeDots className='post-option' onClick={optionModalTrigger} />
        </div>

        {/* Post picture */}
        <div className='post-picture'>
          <img src={imagePath(post.image)} alt={post.image} onDoubleClick={likeToggle} />
          <div className='post-picture-number'>
            <VscDebugStackframeDot style={{transform: 'scale(1.5)'}} />
          </div>
        </div>

        {/* Post interactive option */}
        <div className='post-interact'>
          <div className='post-interact-icon-list'>
            <AiOutlineHeart className='post-interact-icon icon'
              style={{color:like?'red':''}} 
              onClick={likeToggle}
            />
            <FaRegComment className='post-interact-icon icon' onClick={postModalTrigger} />
            <FiSend className='post-interact-icon icon' />
          </div>
          <BsBookmark className='post-interact-icon icon' />
        </div>

        {/* Post interactive info */}
        <div className='post-interact-info'>
          {/* <img className='icon icon-user' src={process.env.PUBLIC_URL + '/ahri.jpg'} alt="ahri" /> */}
          {likeSum > 0 &&
          <div className='post-interact-like-sum'>
            liked by {likeSum === 1 ? (like ? `${currentUser.username}` : `a person`) : (like ? `${currentUser.username} and ${likeSum-1} people` : `${likeSum} people`)}
          </div>
          }
          <div className='post-interact-caption' onClick={()=>profileTrigger(post.user__id)}>
            {post.user__username} <span className='post-interact-caption-content'>
              {caption}
            </span>
          </div>
          <div className='post-date' onClick={postModalTrigger}>
            View all comments
          </div>
          <div>
            {currentUserComments.map(comment=>{
              return(
                <div className='post-interact-caption' key={comment.id} onClick={()=>profileTrigger(comment.user__id)}>
                  {comment.user__username} <span className='post-interact-caption-content'>
                    {comment.content}
                  </span>
                </div>
              )
            })}

          </div>
          <div className='post-date'>
            {post.timestamp}
          </div>
        </div>

        {/* Post comment */}
        <div className='post-comment-cover'>

          <div className='post-comment-icon'>
            <HiOutlineEmojiHappy className='HiOutlineEmojiHappy' />
            <input placeholder='Add comment...' value={comment} onChange={e=>setComment(e.target.value)} />
          </div>

          <div className='post-comment-post' onClick={addComment}>
            Post
          </div>

        </div>
      </div>}

    </article>
  )
}

export default Post