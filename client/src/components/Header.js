import {FaSearch,FaRegCompass} from 'react-icons/fa';
import {MdHomeFilled} from 'react-icons/md';
import {FiSend} from 'react-icons/fi';
import {BsPlusSquare} from 'react-icons/bs';
import {AiOutlineHeart} from 'react-icons/ai';
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/appContext';

export default function Header() {

  const {
    user,
    toggleUploadModal,
  } = useAppContext()
  const navigate = useNavigate()

  return (
    <div className='header-cover'>
      
      {/* Left  */}
      <div className='header-left'>
        <img className='logo' 
          src="https://i0.wp.com/www.dafontfree.io/wp-content/uploads/2020/12/instagram-new.png?fit=1100%2C750&ssl=1" 
          alt="Instargram Logo"
          onClick={()=>{navigate('/')}}
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
          onClick={toggleUploadModal}
        />

        <FaRegCompass className='icon' />
        <AiOutlineHeart className='icon' />
        <div className='dropdown-cover'>
          <span className='dropdown'>
            <img className='icon-user' src={user.avatar} alt="Ahri" />
            <div id='myDropDown' className='dropdown-content'>
              <div>
                Profile
              </div>
              <div>
                Following posts
              </div>
              <div>
                Logout
              </div>
            </div>
          </span>
        </div>

      </div>

    </div>
  );
}
