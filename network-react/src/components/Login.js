import React, {useState, useEffect} from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import FetchingFunction from './FetchingFunction'

export default function Login() {
  
  const [token, setToken] = useCookies(["cookie"])
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  // Change button
  const [showRegister, setShowRegister] = useState(false)

  useEffect(()=>{
    console.log(`Login use useEffect render`)

    // When login false, it will return cookie undefined, So check for it
    // if cookie token is valid, move to posts page
    if (typeof(token["cookie"]) !== "undefined") {
      console.log("navigate to posts")
      navigate("/posts")
    }
    else { // when token expires, if reload page
      console.log("Clear localStorage")
      localStorage.removeItem("username")
      localStorage.removeItem("userId")
    } 
  }, [token, navigate])
  


  // Login handle
  const login = (e) => {
    console.log(`login run`)
    e.preventDefault()
    
    // console.log(`username: ${username}, password: ${password}`)

    // Get token then push to cookie
    FetchingFunction.Login({username, password})
    .then((jsonData) => {
      console.log(`token: ${JSON.stringify(jsonData)}`)
      setToken("cookie", jsonData.token)
    })
  }

  // Register handle
  const register = (event) => {
    event.preventDefault()
    // console.log(`register run: ${username}, ${password}`)

    FetchingFunction.Register({username: username, password: password})
    .then(() => event)
    // .then(()=>{
    //   window.location.reload()
    // })
    .then((e)=>{
      console.log(event)
      login(e)
    })

  }

  const changeButton = () => {
    setShowRegister(!showRegister)
  }

  return (
    <div className='login'>
      <div className='login-item'>

        <img className='login-logo' 
          src="https://i0.wp.com/www.dafontfree.io/wp-content/uploads/2020/12/instagram-new.png?fit=1100%2C750&ssl=1" 
          alt="Instargram Logo"
        />
        {/* <h2>{showRegister ? "Register" : "Login"}</h2> */}
        {/* <div>
          <label htmlFor="username">Username</label>    
        </div> */}
        <div>
          <input type="text" id='username' placeholder='Username' value={username} onChange={(e)=>setUsername(e.target.value)} />
        </div>
        
        {/* <div>
          <label htmlFor="password">Password</label>    
        </div> */}
        <div>
          <input type="password" id='password' placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)} />
        </div>

        {showRegister ? 
        <button onClick={register}>Register</button> : <button onClick={login}>Login</button>
        }

        {showRegister ? 
        <div onClick={changeButton}>Already have an account? <span>Sign in</span></div> 
        : 
        <div onClick={changeButton}>Don't have an account? <span>Sign up</span></div>
        }

      </div>

    </div>

  )
}
