import { useContext, useState } from "react";
import "./login.css";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, {Toaster} from "react-hot-toast";

const Login = () => {
    const [credencials,setCredentians] = useState({
        username:undefined,
        password:undefined,
    });

    const {user, loading, error, dispatch} = useContext(AuthContext)
    const navigate = useNavigate()

    const handleChange = (e) => {
        setCredentians((prev) =>({...prev,[e.target.id]:e.target.value}));
    }
    const login = async (e) => {
        e.preventDefault();
        
        dispatch({type:"LOGIN_START"});
        try{
            toast.loading("Espere..")
            const res = await axios.post("/auth/login",credencials);
            dispatch({type:"LOGIN_SUCCESS",payload:res.data});
            toast.dismiss()
            toast.success("Bienvenid@ al sistema",{
                duration: 2000,
                position: 'top-right'
            })
            toast.loading("Cargando Propiedades..")
            
            setTimeout(()=>{
                toast.dismiss()
                navigate("/")
            },1500)
        }catch(err){
            toast.dismiss()
            toast.error(`Error de acceso: ${err.response.data.message}`,
            {
                duration: 3000,
                position: 'top-right'
            })
            dispatch({type:"LOGIN_FAILURE",payload:err.response.data})
        }
    }

    console.log(user)

    return (
        <div className="container-login">
            <div className="main">
                <input type="checkbox" id="label" arias-hidden="true"/>
            <div className="login">
                <label for="label">Iniciar Sesion</label>
                    <input type="text" placeholder="Nombre de usuario" id="username" className="lInput" 
                    onChange={handleChange}
                    />
                    <input type="password" placeholder="Contraseña" id="password" className="lInput" 
                    onChange={handleChange}
                    />
                    <button className="lButton" onClick={login}>Ingresar</button>
                    {error && <span>{error.message}</span>}
            </div>
            <div className="register">
            <label for="label">Registro</label>
                    
                    <input type="text" placeholder="Nombre de usuario" id="username" className="lInput" 
                    onChange={handleChange}
                    />
                    <input type="password" placeholder="Contraseña" id="password" className="lInput" 
                    onChange={handleChange}
                    />
                    <button className="lButton" onClick={login}>registrar</button>
                    {error && <span>{error.message}</span>}
                
            </div>
        </div>
        <Toaster/>
        </div>
    
    )
}

export default Login