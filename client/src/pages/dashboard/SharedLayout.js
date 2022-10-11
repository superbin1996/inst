import Wrapper from "../../assets/wrappers/SharedLayout"
import { Header, UploadModal } from '../../components/index'
import Home from "./Home"
import { useEffect } from "react"
import { useAppContext } from "../../context/AppContext"

const SharedLayout = () => {
  const {
    showUploadModal,
  } = useAppContext()
  useEffect(()=>{
    document.body.style.overflowY = 'auto'
    // console.log('overflow scroll');
  }, [])
  return (
    <Wrapper>
      <div className="dashboard">
        <Header></Header>
        {showUploadModal && <UploadModal/> }
        <div className="dashboard-page">
          <Home />
        </div>
      </div>
    </Wrapper>
  )
}
export default SharedLayout