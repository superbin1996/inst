import React, {useState, useEffect} from 'react'
import {HiOutlineEmojiHappy} from 'react-icons/hi';

const EditPost = (props) => {
  const {
    toggleEditPost,
    editPost,
    user,
    changeImagePath,
    post,
    caption,
    setCaption,
  } = props

  
  // Count text length in textarea
  const [eCaptionLength, setECaptionLength] = useState(0)

  // caption content
  const [eCaption, setECaption] = useState('')
  
  useEffect(()=>{
    setECaption(caption)
    // console.log(`eCaption:`, caption)
  }, [])

  function inputECaption(e) {
    setECaption(e.target.value)
    setECaptionLength(e.target.value.length)
  }

  function submitEdit() {
    const formData = new FormData()
    formData.append('status', eCaption)
    // formData.append('image', uploadImage)
    formData.append('user', user.id)

    editPost(post.id, formData)
    setCaption(eCaption)
    toggleEditPost()
  }

  return  (
    <div>

      {/* The Modal */}
      <div className="modal" onClick={toggleEditPost}>

        <div className="close" 
          onClick={toggleEditPost}
        >&times;</div>

        {/* Modal content */}
        <div className='modal-content-full' onClick={e=>e.stopPropagation()}>

          {/* Preview header */}
          <div className='modal-intro-preview' style={{height:'37px'}}>
            <div className='modal-intro-preview-item-3' onClick={toggleEditPost} style={{color:'gray'}}>
              Cancel
            </div> 
            <div className='modal-intro-preview-item-2'>Edit Info</div>
            <div className='modal-intro-preview-item-3' onClick={submitEdit}>Done</div>
          </div>

          {/* Image and Caption */}
          <div className='modal-upload-column'>
            <div className='modal-preview'>

              {/* Image */}
              <div className='modal-preview-image'>
                <div className='modal-file'>
                  <img src={post.image} alt={post.image} style={{borderRadius:'0px'}} />
                </div>
              </div>

              {/* Caption input */}
              <div className='modal-upload-caption'>
                <div className='post-info'>
                  <img className='icon-user-1 icon' src={user.avatar} alt="haku" />
                  <p>{user.username}</p>
                </div>
                <textarea name="" id="" cols="30" rows="13" placeholder='Write a caption...' autoFocus value={eCaption} onChange={inputECaption} />
                <div className='modal-upload-emoji-cover'>
                  <HiOutlineEmojiHappy className='modal-upload-emoji'/>
                  <div className='textarea-length'>{eCaptionLength}/2,200</div>
                </div>
              </div>
              
            </div>
            
          </div>

        </div>
      </div>

    </div>
  );
}

export default EditPost