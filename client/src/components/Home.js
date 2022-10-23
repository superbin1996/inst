import { useCallback, useEffect, useRef } from "react"
import { Loading, Post } from "./index"
import { useAppContext } from "../context/appContext"
// import Wrapper from "../../assets/wrappers/Home"
import { Outlet, useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"

// import data from '../../assets/data/data.json'
// const posts = data

const Home = () => {
  const {
    isLoading,
    user,
    getPosts,
    posts,
    page,
    numOfPages,
    clearStates,
    showDropdown,
    setShowDropdown,
    changeImagePath,
    loadMorePosts,
  } = useAppContext()

  const navigate = useNavigate()

  const params = useParams()
  const observer = useRef()
  const lastPostElementRef = useCallback(node => {
    if (observer.current) {
      observer.current.disconnect()
    }

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && page < numOfPages) {
        loadMorePosts()
      }
    })

    if (node) {
      observer.current.observe(node)
    }
  })

  const hideHeaderDropdown = () => {
    if (showDropdown) {
      setShowDropdown()
    }
  }

  const navigateToProfile = () => {
    navigate(`/${user.username}`)
  }

  useEffect(() => {
    clearStates()
    if (parseInt(page) === 1) {
      window.scrollTo({ top: 0 })
      getPosts()
    }
    else {
      loadMorePosts()
    }
  }, [])

  useEffect(() => {
    // only clear states when navigate back to home
    if (Object.keys(params).length === 0) {
      console.log(params, 'clear state run')
      clearStates()
    }
  }, [params])

  if (isLoading) {
    return (
      <Loading center />
    )
  }

  if (posts.length === 0) {
    return (
      <div className="main">
        <h2>No posts to display...</h2>
      </div>
    )
  }


  return (
    <div className={'main'} onClick={hideHeaderDropdown}>
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
          {posts.map((post, index) => {
            if (posts.length === index + 1) {
              return (
                <Post key={post.id} post={post} lastPostElementRef={lastPostElementRef} />
              )
            }
            else {
              return (
                <Post key={post.id} post={post} />
              )
            }
          })}
        </div>
      </article>

      {/* RightSide */}
      <div className={'bar-right'}>
        <div className='post-info-1' style={{ paddingTop: '50px' }}>
          <div className='bar-right-avatar'>
            <img src={changeImagePath(user.avatar)} alt={user.avatar} onClick={navigateToProfile} />
          </div>

          <div className='username-and-caption' onClick={navigateToProfile}>
            {user.username}
          </div>
        </div>
      </div>

    </div>
  )
}

export default Home