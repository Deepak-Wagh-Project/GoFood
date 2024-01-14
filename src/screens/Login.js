import React ,{useState}from 'react'
import { NavLink,useNavigate } from 'react-router-dom';

function Login() {

  const [credentials, setCredentials] = useState({ email:"",password:""})
  const navigate=useNavigate();
  const handleSubmit=async(e)=>{
   e.preventDefault();
   const response = await fetch(`http://localhost:8080/api/loginuser`,{
     method:"POST",
     headers:{
        "Content-Type":"application/json"
     },
     body:JSON.stringify({
        email:credentials.email,
        password:credentials.password,
       

     })
   })

   const json= await response.json();
   if(json.status!==200){
    alert("Enter valid credentials")
   }
   else{
     localStorage.setItem("authToken",json.authToken)
     localStorage.setItem("user-email",credentials.email)
     console.log(localStorage.getItem("authToken"))
       navigate("/")
   }
  console.log(json)
  }
  const onChange=(event)=>{
    setCredentials({...credentials,[event.target.name]:event.target.value})
}
  return (
    <>
    <div className='container'>
      <form onSubmit={handleSubmit}>
       
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name="email"
            value={credentials.email}
            onChange={onChange}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            name="password"
            value={credentials.password}
            onChange={onChange}
          />
        </div>
       
        <button type="submit" className="btn btn-success">
          Login
        </button>
        <NavLink  to="/signup"className={"m-3 btn btn-danger"}>I am new user</NavLink>
      </form>
      </div>
    </>
  )
}

export default Login