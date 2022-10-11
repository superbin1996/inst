import { useEffect } from "react"
import { Loading, Post, UploadModal } from "../../components/index"
import { useAppContext } from "../../context/appContext"
// import Wrapper from "../../assets/wrappers/Home"
import { Outlet } from "react-router-dom"
import { useParams } from "react-router-dom"

// import data from '../../assets/data/data.json'
// const posts = data

const Home = () => {
  const {
    isLoading,
    user,
    login,
    getPosts,
    posts,
    clearStates,
    showUploadModal,
  } = useAppContext()

  const params = useParams()

  useEffect(() => {
    if(user){
      clearStates()
      getPosts()
      // document.body.style.overflowY = 'auto'
    }
    else {
      login()
    }
  }, [user])

  useEffect(() => {
    console.log(params);
    clearStates()
    // document.body.style.overflowY = 'auto'
  }, [params])

  if (isLoading) {
    return (
      <Loading center />
    )
  }

  if(posts.length === 0){
    return (
      <div className="main">
        <h2>No posts to display...</h2>
      </div>
    )
  }
  

  return (
    <div className={'main'}>
      <Outlet></Outlet>
      {/* LeftSide */}
      <div className='bar-left'></div>

      {/* Center */}
      <article className={'bar-center'}>
        <div className='story-cover'>
          <img className='story-icon icon' src={process.env.PUBLIC_URL + '/ahri.jpg'} alt="ahri" />
          <img className='story-icon icon' src={process.env.PUBLIC_URL + '/haku.jpg'} alt="haku" />
        </div>

        <div className={'post'}>
          {posts.map((post) => {
            return (
              <Post key={post.id} post={post} />
            )
          })}
        </div>
      </article>

      {/* RightSide */}
      <div className={'bar-right'}>
        <div className='post-info-1' style={{ paddingTop: '50px' }}>
          <div className='bar-right-avatar'>
            <img src={'./ahri.jpg'} alt={'Ahri'} />
          </div>

          <div className='username-and-caption'>
            {'superbin1996'}
          </div>
        </div>
      </div>

    </div>
  )
}

export default Home