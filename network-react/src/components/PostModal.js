import {React, useEffect, useState} from 'react'
import { BsThreeDots } from 'react-icons/bs';
import {AiOutlineHeart} from 'react-icons/ai';
import { FaRegComment } from 'react-icons/fa';
import {FiSend} from 'react-icons/fi';
import { BsBookmark } from 'react-icons/bs';
import {HiOutlineEmojiHappy} from 'react-icons/hi';
import FetchingFunction from './FetchingFunction';

const PostModal = (props) => {
  const {
    token,
    post,
    imagePath,
    currentUser,
    postModalTrigger,
    isFollow,
    getFollowState,
    changeFollowState,
    preventSelfFollow,
    currentUserComments,
    comment,
    setComment,
    addComment,
    optionModalTrigger,
    caption,
    profileTrigger,
    like,
    likeSum,
    likeToggle,
  } = props

  // Comment list
  const [commentList, setCommentList] = useState([])
  
  useEffect(()=>{
    getFollowState(post.user__id)
    getCommentList()
  }, [])

  function getCommentList() {
    FetchingFunction.GetComments(token, post.id)
    .then((data)=>{
      setCommentList(data)
    })
  }

  return (
      // The Modal
      <div className="modal" onClick={postModalTrigger}>

        <div className="close" onClick={postModalTrigger}
        >&times;</div>

        {/* Modal content */}
        <div className='modal-content-full-1' onClick={e=>e.stopPropagation()}>

          {/* Image and Caption */}
          <div className='modal-preview-1'>

            {/* Image */}
            <div className='modal-image'>
              <div className='modal-file-1'>
                <img src={imagePath(post.image)} alt={post.image} />
              </div>
            </div>
            
            {/* Owner info */}
            <div className='modal-caption-cover'>

              {/* Post owner infor */}
              <div className='post-info-1'>
                <img className='icon-user-1 icon' src={imagePath(post.user__avatar)} alt={post.user__avatar} onClick={()=>profileTrigger({'profileId':post.user__id, 'profileUsername':post.user__username, 'profileAvatar':post.user__avatar})} />

                {/* Follow Btn */}
                <div className='username-and-caption' onClick={()=>profileTrigger({'profileId':post.user__id, 'profileUsername':post.user__username, 'profileAvatar':post.user__avatar})}>
                  {post.user__username} {preventSelfFollow(post.user__id) && <span onClick={()=>changeFollowState(post.user__id)} style={{cursor:'pointer'}}>
                    ・ {isFollow?`Following`:`Follow`}
                  </span>}
                </div>

                <BsThreeDots className='post-option' style={{marginRight:'8px'}} onClick={optionModalTrigger} />
              </div>

              {/* Caption and comment */} 
              <div className='modal-caption-1'>
                {/* Caption */}
                { caption !== null &&
                <div className='post-info-1'>
                  <div>
                    <img className='icon-user-1 icon' src={imagePath(post.user__avatar)} alt={post.user__avatar} onClick={()=>profileTrigger({'profileId':post.user__id, 'profileUsername':post.user__username, 'profileAvatar':post.user__avatar})} />
                  </div>

                  <div className='username-and-caption' onClick={()=>profileTrigger({'profileId':post.user__id, 'profileUsername':post.user__username, 'profileAvatar':post.user__avatar})}>
                    {post.user__username} <span style={{fontWeight:'400'}}>{caption}</span>
                     {/* ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss */}
                  </div>
                </div>
                }

                {/* CurrentUser comments */}
                {currentUserComments.map(comment=>{
                  return(
                    <div className='post-info-1' key={comment.id}>
                      <div>
                        <img className='icon-user-1 icon' src={imagePath(currentUser.avatar)} alt={currentUser.avatar} />
                      </div>

                      <div className='username-and-caption'  onClick={()=>profileTrigger({'profileId':currentUser.id, 'profileUsername':currentUser.username, 'profileAvatar':currentUser.avatar})}>
                        {currentUser.username} <span style={{fontWeight:'400'}}>{comment.content}</span>
                      </div>
                    </div>
                  )
                })}

                {/* Other comments */}
                {commentList.filter(comment => comment.user__id !== parseInt(currentUser.id)).map(comment=>{
                  return(
                    <div className='post-info-1' key={comment.id}>
                      <div>
                        <img className='icon-user-1 icon' src={imagePath(comment.user__avatar)} alt={comment.user__avatar} onClick={()=>profileTrigger({'profileId':comment.user__id, 'profileUsername':comment.user__username, 'profileAvatar':comment.user__avatar})} />
                      </div>

                      <div className='username-and-caption' onClick={()=>profileTrigger({'profileId':comment.user__id, 'profileUsername':comment.user__username, 'profileAvatar':comment.user__avatar})}>
                        {comment.user__username} <span style={{fontWeight:'400'}}>{comment.content}</span>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Like, comment, share, bookmark */}
              <div className='post-interact-container'>

                <div className='post-interact' style={{borderTop:'1px solid rgba(var(--b6a, 219, 219, 219), 1)'}}>
                  <div className='post-interact-icon-list'>
                    <AiOutlineHeart className='post-interact-icon icon'
                      style={{color:like?'red':''}} 
                      onClick={likeToggle}
                    />
                    <FaRegComment className='post-interact-icon icon' />
                    <FiSend className='post-interact-icon icon' />
                  </div>
                  <BsBookmark className='post-interact-icon icon' />
                </div>
              </div>

              {/* Like sum */}
              <div className='post-interact-info'>
                {/* <img className='icon icon-user' src={process.env.PUBLIC_URL + '/ahri.jpg'} alt="ahri" /> */}
                {likeSum > 0 &&
                <div className='post-interact-like-sum'>
                  liked by {likeSum === 1 ? (like ? `${currentUser.username}` : `a person`) : (like ? `${currentUser.username} and ${likeSum-1} people` : `${likeSum} people`)}
                </div>
                }
               
                <div className='post-date'>
                  {post.timestamp}
                </div>
              </div>

              {/* Input comment */}
              <div className='modal-comment'>
                {/* <HiOutlineEmojiHappy className='modal-upload-emoji'/>
                <input type="text" value={comment} onChange={e=>setComment(e.target.value)} /> */}
                <div className='post-comment-icon'>
                  <HiOutlineEmojiHappy className='HiOutlineEmojiHappy' />
                  <input placeholder='Add comment...' value={comment} onChange={e=>setComment(e.target.value)} />
                </div>

                <div className='post-comment-post' onClick={addComment}>
                  Post
                </div>
              </div>

            </div>
            
          </div> 
            

        </div>
      </div>
  );
}

export default PostModal