import { useState, useEffect } from 'react'
import { BsThreeDots } from 'react-icons/bs';
import { AiOutlineHeart } from 'react-icons/ai';
import { FaRegComment } from 'react-icons/fa';
import { FiSend } from 'react-icons/fi';
import { BsBookmark } from 'react-icons/bs';
import { VscDebugStackframeDot } from 'react-icons/vsc';
import { HiOutlineEmojiHappy } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/appContext';
import moment from 'moment'

const Post = ({ post, lastPostElementRef }) => {
  const navigate = useNavigate()
  const {
    // showProfile,
    toggleOptionModal,
    changeImagePath,
    authFetch,
    customAxios,
    user,
    // post: postState,
  } = useAppContext()

  const [userComments, setUserComments] = useState([])
  const [comment, setComment] = useState('')
  const [isLike, setIsLike] = useState(false)
  const [likeSum, setLikeSum] = useState(0)

  const getLikeCondition = async () => {
    const url = `getLike/${post.id}/`
    try {
      const { data } = await customAxios(url)
      const { isLike, likeSum } = data
      setIsLike(isLike)
      setLikeSum(likeSum)
    } catch (error) {
      console.log(error);
    }
  }

  const toggleIsLike = async () => {
    if (user) {
      const url = `like/${post.id}/`
      try {
        const { data } = await authFetch.patch(url, {'isLike':!isLike})
        setLikeSum(data.likeSum)
        setIsLike(data.isLike)
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handleChange = (e) => {
    setComment(e.target.value)
  }

  const submitComment = async () => {
    const url = `comment/${post.id}/`
    try {
      const { data } = await authFetch.post(url, { comment })
      if (data.status === false) {
        console.log(data)
      }
    } catch (error) {
      console.log(error)
    }
    finally {
      getUserComments(post.id)
      setComment('')
    }
  }

  const navigateProfile = (username) => {
    // showProfile(userId)
    // getProfilePosts(userId)
    // showProfile(userId)
    navigate(`/${username}`)
  }

  const showPostModal = () => {
    // togglePostModal(post.id)
    navigate(`p/${post.id}/`)
    // window.history.replaceState(null, "Instagram", `/p/${post.id}`)
  }

  const getUserComments = async (postId) => {
    if (user) {
      // const url = `/data/userComments.json`
      const url = `post_user_comment/${postId}/`
      const { data } = await authFetch(url)
      // console.log(`usersComments:`, data)
      setUserComments(data)
    }
  }

  let date = moment(post.timestamp)
  date = date.startOf('day').fromNow()

  useEffect(() => {
    getUserComments(post.id)
    // document.body.style.overflowY = 'auto'
    getLikeCondition()
    // dont't add isLike to dependencies
  }, [navigate])

  return (
    <article className='post-cover' ref={lastPostElementRef}>
      <div>
        {/* Post info */}
        <div className='post-info-cover'>
          {/* Post owner */}
          <div className='post-info'>
            <img className='icon-user-1 icon' src={changeImagePath(post.user__avatar)} alt="haku" onClick={() => navigateProfile(post.user__username)} />
            <div style={{ fontWeight: '500' }} onClick={() => navigateProfile(post.user__username)}>
              {post.user__username}
            </div>
          </div>
          <BsThreeDots className='post-option' onClick={() => toggleOptionModal(post)} />
        </div>

        {/* Post picture */}
        <div className='post-picture'>
          <img src={changeImagePath(post.image)} alt={post.image} onDoubleClick={toggleIsLike} />
          <div className='post-picture-number'>
            <VscDebugStackframeDot style={{ transform: 'scale(1.5)' }} />
          </div>
        </div>

        {/* Post interactive option */}
        <div className='post-interact'>
          <div className='post-interact-icon-list'>
            <AiOutlineHeart className='post-interact-icon icon'
              style={{ color: isLike ? 'red' : '' }}
              onClick={toggleIsLike}
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

          <div className='post-interact-like-sum'>
              {likeSum > 0 && (likeSum > 1 ? `${likeSum} likes` : `1 like`) }
          </div>

          <div className='post-date'>
            {date}
          </div>
        </div>

        {/* Post comment */}
        <div className='post-comment-cover'>

          <div className='post-comment-icon'>
            <HiOutlineEmojiHappy className='HiOutlineEmojiHappy' />
            <input placeholder='Add comment...' value={comment} onChange={handleChange} />
          </div>

          <div className='post-comment-post' onClick={submitComment}>
            Post
          </div>

        </div>
      </div>

    </article>
  )
}
export default Post