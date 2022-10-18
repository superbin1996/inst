import { useState, useEffect} from 'react'
import { BsThreeDots } from 'react-icons/bs';
import { AiOutlineHeart } from 'react-icons/ai';
import { FaRegComment } from 'react-icons/fa';
import { FiSend } from 'react-icons/fi';
import { BsBookmark } from 'react-icons/bs';
import { VscDebugStackframeDot } from 'react-icons/vsc';
import { HiOutlineEmojiHappy } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/appContext';

const Post = ({ post }) => {
  const navigate = useNavigate()
  const {
    // showProfile,
    toggleOptionModal,
    changeImagePath,
  } = useAppContext()

  const [userComments, setUserComments] = useState([])

  const navigateProfile = (username, userId) => {
    // showProfile(userId)
    // getProfilePosts(userId)
    // showProfile(userId)
    navigate(`/${username}`)
  }

  const showPostModal = () => {
    // togglePostModal(post.id)
    navigate(`/p/${post.id}`)
    // window.history.replaceState(null, "Instagram", `/p/${post.id}`)
  }

  const getUserComments = async (postId) => {
    const url = `/data/userComments.json`
    const response = await fetch(url)
    const data = await response.json()
    // console.log(`usersComments:`, data)
    setUserComments(data)
  }

  useEffect(() => {
    getUserComments(post.id)
    document.body.style.overflowY = 'auto'
  }, [navigate])

  return (
    <article className='post-cover'>
      <div>
        {/* Post info */}
        <div className='post-info-cover'>
          {/* Post owner */}
          <div className='post-info'>
            <img className='icon-user-1 icon' src={changeImagePath(post.user__avatar)} alt="haku" onClick={() => navigateProfile(post.user__username, post.user__id)} />
            <div style={{ fontWeight: '500' }} onClick={() => navigateProfile(post.user__username, post.user__id)}>
              {post.user__username}
            </div>
          </div>
          <BsThreeDots className='post-option' onClick={()=>toggleOptionModal(post)} />
        </div>

        {/* Post picture */}
        <div className='post-picture'>
          <img src={changeImagePath(post.image)} alt={post.image} />
          <div className='post-picture-number'>
            <VscDebugStackframeDot style={{ transform: 'scale(1.5)' }} />
          </div>
        </div>

        {/* Post interactive option */}
        <div className='post-interact'>
          <div className='post-interact-icon-list'>
            <AiOutlineHeart className='post-interact-icon icon'
            />
            <FaRegComment className='post-interact-icon icon' onClick={showPostModal} />
            <FiSend className='post-interact-icon icon' />
          </div>
          <BsBookmark className='post-interact-icon icon' />
        </div>

        {/* Post interactive info */}
        <div className='post-interact-info'>
          <div className='post-interact-caption'>
            {post.user__username} <span className='post-interact-caption-content'>
              {post.status}
            </span>
          </div>

          <div className='post-date' onClick={showPostModal}>
            View all comments
          </div>

          <div>
            {userComments.map(comment => {
              return (
                <div className='post-interact-caption' key={comment.id} onClick={() => navigateProfile(userComments.user__username, userComments.user__id)}>
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
            <input placeholder='Add comment...' />
          </div>

          <div className='post-comment-post'>
            Post
          </div>

        </div>
      </div>

    </article>
  )
}
export default Post