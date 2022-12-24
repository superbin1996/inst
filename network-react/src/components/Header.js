import React from 'react';
import {FaSearch,FaRegCompass} from 'react-icons/fa';
import {MdHomeFilled} from 'react-icons/md';
import {FiSend} from 'react-icons/fi';
import {BsPlusSquare} from 'react-icons/bs';
import {AiOutlineHeart} from 'react-icons/ai';
import { useNavigate } from 'react-router-dom'

export default function Header(props) {
  const {
    uploadModalTrigger,
    currentUser,
    imagePath,
    triggerProfile,
    hideHeaderUserOption,
    showHeaderUserOption,
    profileDrop,
    logout,
    setTogglePosts,
    showProfile,
  } = props

  // Use to redirect website <react-router-dom>
  const navigate = useNavigate()

  return (
    <div className='header-cover' onClick={hideHeaderUserOption}>
      
      {/* Left  */}
      <div className='header-left'>
        <img className='logo' 
          src="https://i0.wp.com/www.dafontfree.io/wp-content/uploads/2020/12/instagram-new.png?fit=1100%2C750&ssl=1" 
          alt="Instargram Logo"
          onClick={()=>navigate('/')} 
        />

        <div className='search'>
          <FaSearch className='faSearch'/>
          <input className='search-input' type="text" placeholder='Search' />
        </div>
      </div>

      {/* Right */}
      <div className='header-right'>
        <MdHomeFilled className='icon' />
        <FiSend className='icon' />
        
        <BsPlusSquare 
          className='icon'
          onClick={uploadModalTrigger}
        />

        <FaRegCompass className='icon' />
        <AiOutlineHeart className='icon' />
        {/* {console.log(profileDrop)} */}
        <div className='dropdown-cover'>
          <span className='dropdown'>
            <img onClick={showHeaderUserOption} className='icon-user' src={imagePath(currentUser.avatar)} alt="Ahri" />
            <div id='myDropDown' className={profileDrop}>
              <a onClick={()=>triggerProfile({'profileId':parseInt(currentUser.id),'profileUsername':currentUser.username,'profileAvatar':currentUser.avatar})}>
                Profile
              </a>
              <a onClick={()=>{if(!showProfile){setTogglePosts(false)}}}>
                Following posts
              </a>
              <a onClick={logout}>
                Logout
              </a>
            </div>
          </span>
        </div>

      </div>

    </div>
  );
}
