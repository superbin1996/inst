import React, {useState} from 'react';
import {AiOutlinePicture} from 'react-icons/ai'
import {BiArrowBack} from 'react-icons/bi'
import {HiOutlineEmojiHappy} from 'react-icons/hi';
import Wrapper from '../assets/wrappers/UploadModal';
import { useAppContext } from '../context/appContext';

export default function UploadModal() {
  const {
    user,
    toggleUploadModal,
    addPost,
    changeImagePath,
  } = useAppContext()

  // After choosing picture
  const [preview, setPreview] = useState(false)
  // image input file
  const [uploadImage, setUploadImage] = useState(null)
  // preview image
  const [previewImage, setPreviewImage] = useState(null)
  // Image scale
  const [imgScale, setImgScale] = useState(1)
  // preview image and add caption
  const [addCaption, setAddCaption] = useState(false)
  // Count text length in textarea
  const [captionLength, setCaptionLength] = useState(0)
  // caption content
  const [caption, setCaption] = useState('')

  function onChangePicture(e) {
    e.preventDefault()

    if (e.target.files[0]) {
      setPreview(true)      
      setUploadImage(e.target.files[0])

      const reader = new FileReader()
      reader.readAsDataURL(e.target.files[0])
      reader.addEventListener('load', ()=>{
        setPreviewImage(reader.result)
      })
    }
  }

  function skipChoosingPicture() {
    // setPreviewImage(process.env.PUBLIC_URL + './default.jpg')
    
    // If using Route, delete first '.' in url
    setPreviewImage('/default.jpg')
    setPreview(true)      
  }

  function uploadBack() {
    if (addCaption) {
      setAddCaption(false)
    }
    else {
      setPreview(false)
      setCaption('')
    }
  }

  function uploadNext() {
    if (addCaption) {
      uploadPost()
    }
    else {
      setAddCaption(true)
    }
  }

  const changeImageSize = ({ target: img }) => {
    const { offsetHeight, offsetWidth } = img;
    console.log(offsetWidth, offsetHeight);
    if (offsetHeight < 500) {
      setImgScale(500/offsetHeight)

    }
  }

  function uploadPost() {
    const formData = new FormData()
    formData.append('status', caption)
    if (uploadImage) {
      formData.append('image', uploadImage)
    }
    formData.append('user', user.id)

    addPost(formData)
    toggleUploadModal()
  }

  function inputCaption(e) {
    setCaption(e.target.value)
    setCaptionLength(e.target.value.length)
  }

  return  (
    // <Wrapper>
      <div>
        {/* The Modal */}
        <div className="modal" onClick={toggleUploadModal}>

          <div className="close" 
            onClick={toggleUploadModal}
          >&times;</div>

          {/* Modal content */}
          <div className={addCaption?'modal-content-full':'modal-content'} onClick={e=>e.stopPropagation()}>

            {/* Preview header */}
            { preview ? 
            // preview header after choosing picture
            <div className='modal-intro-preview'>
              <BiArrowBack className='modal-intro-preview-item-1' onClick={uploadBack} />
              <div className='modal-intro-preview-item-2'>Crop</div>
              <div className='modal-intro-preview-item-3' onClick={uploadNext}>{addCaption?'Share':'Next'}</div>
            </div>
            :
            // preview header before choosing picture
            <div className="modal-intro">Create new status here</div>
            }
            
            {/* Image and Caption */}
            <div className='modal-upload-column'>
              { preview ?
              // After choosing picture
              <div className='modal-preview'>

                <div className='modal-preview-image'>
                  <div className='modal-file'>
                    <img src={previewImage} alt={previewImage} onLoad={changeImageSize} style={{transform:`scale(${imgScale})`}} />
                  </div>
                </div>

                {/* Caption input */}
                {addCaption &&
                <div className='modal-upload-caption'>
                  <div className='post-info' style={{marginLeft:'-5px'}}>
                    <img className='icon-user-1 icon' src={user.avatar} alt={user.avatar} />
                    <p>{user.username}</p>
                  </div>
                  <textarea name="" id="" cols="30" rows="13" placeholder='Write a caption...' autoFocus value={caption} onChange={inputCaption} />
                  <div className='modal-upload-emoji-cover'>
                    <HiOutlineEmojiHappy className='modal-upload-emoji'/>
                    <div className='textarea-length'>{captionLength}/2,200</div>
                  </div>
                </div>
                }
                
              </div>
              :
              // Choosing image file
              <div className='modal-file'>
                <div><AiOutlinePicture className="AiOutlinePicture" /></div>
                <h3>Drag piuctures here</h3>
                <form>
                  <input type="file" className='modal-upload-input' onChange={onChangePicture} />
                </form>
                <div>
                  <button className='btn-skip' onClick={skipChoosingPicture}>Skip</button>
                </div>
              </div>
              }
            </div>

          </div>
        </div>

      </div>
    // </Wrapper>
  );
}
