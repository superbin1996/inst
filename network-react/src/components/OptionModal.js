import React, {useEffect} from 'react'

const OptionModal = (props) => {
  const {
    optionModalTrigger,
    delPost,
    post,
    currentUser,
    getFollowState,
    isFollow,
    changeFollowState,
    editModalTrigger,
  } = props

  useEffect(()=>{
    getFollowState(post.user__id)
  }, [])

  function selfPostOption(userId) {
    // currentUser.id is string, so change it to integer
    if (userId === parseInt(currentUser.id)) {
      return true
    }
    else {
      return false
    }
  }

  return (
    <div className="modal" onClick={optionModalTrigger}>
      <div className='option-content' onClick={e=>e.stopPropagation()}>
        { selfPostOption(post.user__id) ?
        // Self post
        <div>
          <div className="option-content-item" onClick={()=>delPost(post.id)} style={{color:'red'}}>
            Delete
          </div>

          <div className="option-content-item" style={{color:'red'}} onClick={editModalTrigger}>
            Edit
          </div>

          <div className="option-content-item">Hide like count</div>
          <div className="option-content-item">Turn off commenting</div>

        </div>
        :
        // Others post
        <div>
          <div className="option-content-item">
            Report
          </div>

          <div className="option-content-item" onClick={()=>changeFollowState(post.user__id)} style={{color:'red'}}>
            {isFollow?`Following`:`Follow`}
          </div>
        </div>
        }

        <div className="option-content-item">Go to post</div>
        <div className="option-content-item">Share to...</div>
        <div className="option-content-item">Copy Link</div>
        <div className="option-content-item">Embed</div>

        <div className="option-content-item" style={{border:'none',color:'red'}} onClick={optionModalTrigger}>
          Cancel
        </div>

      </div>

    </div>
  )
}

export default OptionModal