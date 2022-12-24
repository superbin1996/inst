import React, {useState, useEffect} from 'react';
import Post from './Post';
import FetchingFunction from './FetchingFunction';
import { BsThreeDots } from 'react-icons/bs';
import { IoIosArrowUp } from 'react-icons/io'

export default function Main(props) {
  const {
    posts,
    token,
    currentUser,
    showProfile,
    imagePath,
    triggerProfile,
    profileId,
    profileAvatar,
    profileUsername,
    length,
    hideHeaderUserOption,
    isFollow,
    setIsFollow,
    followerSum,
    followingSum,
    getFollowState,
  } = props
  
  // // Follow state
  // const [isFollow, setIsFollow] = useState(false)

  // Avatar file
  const [avatarImg, setAvatarImg] = useState(null)

  useEffect(()=>{
    if (showProfile) {
      getFollowState(profileId)
    }
  }, [profileId, isFollow])

  // Check follow condition on a user. Use for profile in Main.js and postModal.js 
  // function getFollowState(userId) {
  //   FetchingFunction.GetFollow(token, userId)
  //   .then((data)=>{
  //     setIsFollow(data.follow)
  //   })
  // }

  function changeFollowState(userId) {
    FetchingFunction.Follow(token, userId)
    setIsFollow(!isFollow)
  }

  function preventSelfFollow(userId) {
    // currentUser.id is string, so change it to integer
    if (userId !== parseInt(currentUser.id)) {
      return true
    }
    else {
      return false
    }
  }

  function updateAvatar(e) {
    e.preventDefault()
    if (e.target.files[0]) {
      
      FetchingFunction.UpdateAvatar(token, e.target.files[0])

      const reader = new FileReader()
      reader.readAsDataURL(e.target.files[0])
      reader.addEventListener('load', ()=>{
        // setProfileAvatar()
        setAvatarImg(reader.result)
      })
    }

  }

  return (
    
    <div className={showProfile?'profile-cover':''} onClick={hideHeaderUserOption}>
      <div className={showProfile?'profile-bar-left':''}></div>

      <div className={showProfile?'profile-bar-center':''}>

        { showProfile &&
        <header className='profile-header'>

          <label className='profile-avatar' htmlFor='avatar'>
            {avatarImg ?
            <img src={avatarImg} alt={avatarImg} />
            :
            <img src={imagePath(profileAvatar)} alt={profileAvatar} />
            }

            { profileId == currentUser.id  &&
            <input type="file" id='avatar' onChange={updateAvatar} />
            }

          </label>

          <div className='profile-username'>{profileUsername}</div>
          <div className='profile-message'>Message</div>

          {preventSelfFollow(profileId) &&
          <div className='profile-follow' onClick={()=>changeFollowState(profileId)}>
            {isFollow?`Following`:`Follow`}
          </div>
          }

          <IoIosArrowUp className="profile-suggestion" />
          <BsThreeDots className="profile-option" />
          <div className='profile-posts'>{length} posts</div>
          <div className='profile-followers'>{followerSum} followers</div>
          <div className='profile-following'>{followingSum} following</div>
          <div className='profile-info'>
            152
            followầingsssssssssssssssssssssssssssssssssssassssssssssssssssssssssssssssssssssssssssssssssssssssssfollowầingsssssssssssssssssssssssssssssssssssassssssssssssssssssssssssssssssfollowầingsssssssssssssssssssssssssssssssssssassssssssssssssssssssssssssssssfollowầingsssssssssssssssssssssssssssssssssssassssssssssssssssssssssssssssssssssssssssssssssssssssssfollowầingsssssssssssssssssssssssssssssssssssassssssssssssssssssssssssssssssfollowầingsssssssssssssssssssssssssssssssssssassssssssssssssssssssssssssssss
          </div>
        </header>
        }

        <div className={showProfile?'gallery-cover':'main'}>
          {/* LeftSide */}
          <div className={showProfile?'':'bar-left'}></div>
          
          {/* Center */}
          <article className={showProfile?'gallery':'bar-center'}>
            <div className='story-cover'>
              <img className='story-icon icon' src={process.env.PUBLIC_URL + '/ahri.jpg'} alt="ahri" />
              <img className='story-icon icon' src={process.env.PUBLIC_URL + '/haku.jpg'} alt="haku" />
            </div>

            <div className={showProfile?'profile-images':'post'}>

              {posts.map(post => {
                return (
                  <Post
                  key={post.id}
                  token={token}
                  currentUser={currentUser}
                  post={post}
                  imagePath={imagePath}
                  isFollow={isFollow}
                  setIsFollow={setIsFollow}
                  getFollowState={getFollowState}
                  changeFollowState={changeFollowState}
                  preventSelfFollow={preventSelfFollow}
                  triggerProfile={triggerProfile}
                  showProfile={showProfile}
                  />
                  )
                })}
            </div>

              
          </article>

          {/* RightSide */}
          <div className={showProfile?'':'bar-right'}>
            {showProfile ||
            <div className='post-info-1' style={{paddingTop:'50px'}}>
              <div className='bar-right-avatar'>
                <img src={imagePath(currentUser.avatar)} alt={currentUser.avatar} onClick={()=>triggerProfile({'profileId':currentUser.id, 'profileUsername':currentUser.username, 'profileAvatar':currentUser.avatar})} />
              </div>

              <div className='username-and-caption' onClick={()=>triggerProfile({'profileId':currentUser.id, 'profileUsername':currentUser.username, 'profileAvatar':currentUser.avatar})}>
                {currentUser.username}
              </div>
            </div>
            }
          </div>

        </div>
      </div>

      <div className={showProfile?'profile-bar-right':''}>
      </div>

    </div>
  );
}
