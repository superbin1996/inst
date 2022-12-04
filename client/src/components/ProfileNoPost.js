import { BsThreeDots } from 'react-icons/bs';
import { IoIosArrowUp } from 'react-icons/io'
import { useAppContext } from '../context/appContext';
import { Header, UploadModal } from './index';

const ProfileNoPost = () => {
  const {
    following,
    followers,
    profileUser,
    totalProfilePosts,
    changeImagePath,
    user,
    toggleFollowCondition,
    isFollow,
    showUploadModal,
  } = useAppContext()

  const checkUser = () => {
    if (String(profileUser.profileId) === String(user.id)) {
      return true
    }
    else { return false }
  }
  
  return (
    <div className='profile-modal'>
      <Header />
      {showUploadModal && <UploadModal/>}
      <div className={'profile-cover'}>
        <div className={'profile-bar-left'}></div>

        <div className={'profile-bar-center'}>

          <header className='profile-header'>

            <label className='profile-avatar' htmlFor='avatar'>
              <img src={changeImagePath(profileUser.avatar)} alt={profileUser.avatar} />
              {checkUser() && 
              <input type="file" id='avatar' />
              }
            </label>

            <div className='profile-username'>{profileUser.username}</div>
            <div className='profile-message'>Message</div>

            {checkUser() || 
            <div className='profile-follow' onClick={()=>toggleFollowCondition(profileUser.id)}>
              {isFollow?'Following':'Follow'}
            </div>
            }

            <IoIosArrowUp className="profile-suggestion" />
            <BsThreeDots className="profile-option" />
            <div className='profile-posts'>{totalProfilePosts} posts</div>
            <div className='profile-followers'>{followers} followers</div>
            <div className='profile-following'>{following} following</div>
            <div className='profile-info'>
              I am {profileUser.username} and I am awesome
            </div>
          </header>


          <div className={'gallery-cover'}>
            {/* LeftSide */}
            <div></div>

            {/* Center */}
            <article className={'gallery'}>
              <div className='story-cover'>
                <img className='story-icon icon' src={process.env.PUBLIC_URL + '/ahri.jpg'} alt="ahri" />
                <img className='story-icon icon' src={process.env.PUBLIC_URL + '/haku.jpg'} alt="haku" />
              </div>

              <div className={'profile-images'} style={{ display: 'grid', gridTemplateColumns: '1fr' }}>

                <h2>There is no post yet</h2>
              </div>
            </article>

            {/* RightSide */}
            <div></div>

          </div>
        </div>

        <div className={'profile-bar-right'}>
        </div>

      </div>
    </div>
  )
}
export default ProfileNoPost