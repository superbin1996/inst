import Wrapper from "../../assets/wrappers/SharedLayout"
import { Header, OptionModal, UploadModal } from '../../components/index'
import Home from "./Home"
import { useEffect } from "react"
import { useAppContext } from "../../context/appContext"

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