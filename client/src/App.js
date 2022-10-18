import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { PostModal, Profile } from './components/index';
import { ProtectedRoute, Register, SharedLayout } from './pages/index';
import { Error } from './pages/index'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={
          <ProtectedRoute>
            <SharedLayout/>
          </ProtectedRoute>}
        >
          <Route path='p/:postId' element={<PostModal/>}/>
          <Route path=':profileName' element={<Profile/>} />
        </Route>
        <Route path='/register' element={<Register/>} />
        <Route path='*' element={<Error />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;