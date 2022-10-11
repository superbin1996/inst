import { useEffect } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { IoIosArrowUp } from 'react-icons/io'
import { Header, Loading } from './index';
import { useAppContext } from '../context/appContext';

export default function Profile() {
  const {
    isLoading,
    profilePosts,
    profileId,
    getProfilePosts,
  } = useAppContext()

  useEffect(() => {
    document.body.style.overflowY = 'hidden'
    getProfilePosts(profileId)
  }, [])

  if (isLoading) {
    return (
      <Loading center />
    )
  }

  if (profilePosts.length === 0) {
    return (
      <h2>
        There are nothing here
      </h2>
    )
  }

  return (
    <div className='profile-modal'>
      <Header/>
      <div className={'profile-cover'}>
        <div className={'profile-bar-left'}></div>

        <div className={'profile-bar-center'}>

          <header className='profile-header'>

            <label className='profile-avatar' htmlFor='avatar'>
              <img src={'ahri.jpg'} alt={'Ahri'} />

              <input type="file" id='avatar' />


            </label>

            <div className='profile-username'>superbin1996</div>
            <div className='profile-message'>Message</div>

            <div className='profile-follow'>
              Following
            </div>

            <IoIosArrowUp className="profile-suggestion" />
            <BsThreeDots className="profile-option" />
            <div className='profile-posts'>1 Posts</div>
            <div className='profile-followers'>5 followers</div>
            <div className='profile-following'>2 following</div>
            <div className='profile-info'>
              152
              followingsssssssssssssssssssssssssssssssssssassssssssssssssssssssssssssssssssssssssssssssssssssssssfollowầingsssssssssssssssssssssssssssssssssssassssssssssssssssssssssssssssssfollowầingsssssssssssssssssssssssssssssssssssassssssssssssssssssssssssssssssfollowầingsssssssssssssssssssssssssssssssssssassssssssssssssssssssssssssssssssssssssssssssssssssssssfollowầingsssssssssssssssssssssssssssssssssssassssssssssssssssssssssssssssssfollowầingsssssssssssssssssssssssssssssssssssassssssssssssssssssssssssssssss
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

              <div className={'profile-images'}>

                {profilePosts.map(post => {
                  return (
                    <div key={post.id} className='profile-images-item'>
                      <img src={post.image} alt={'👩🏽'} />
                    </div>
                  )
                })}
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
