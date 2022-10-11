import { Header, OptionModal, UploadModal, Home } from '../components/index'
import { useEffect } from "react"
import { useAppContext } from "../context/appContext"
import Wrapper from '../assets/wrappers/SharedLayout'

const SharedLayout = () => {
  const {
    showUploadModal,
    showOptionModal,
  } = useAppContext()
  useEffect(()=>{
    document.body.style.overflowY = 'auto'
  }, [])
  return (
    <Wrapper>
      <div className="dashboard">
        <Header></Header>
        {showOptionModal && <OptionModal/>} 
        {showUploadModal && <UploadModal/> }
        <div className="dashboard-page">
          <Home />
        </div>
      </div>
    </Wrapper>
  )
}
export default SharedLayout