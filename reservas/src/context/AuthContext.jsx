import { createContext, useEffect, useReducer } from "react";

const initState = () =>{
    try{
        return{
            user:JSON.parse(localStorage.getItem("user")),
            loading:false,
            error:undefined
        }
    }catch(err){
        return{
                user:undefined,
                loading:false,
                error:undefined
        }
    }
}

const INITIAN_STATE = initState();

export const AuthContext = createContext(INITIAN_STATE);

const AuthReducer = (state,action) =>{
    switch(action.type){
        case "LOGIN_START":
            return {
                user:undefined,
                loading:true,
                error:undefined
            };
            case "LOGIN_SUCCESS":
                return {
                    user:action.payload,
                    loading:false,
                    error:undefined
                };
            case "LOGIN_FAILURE":
            return {
                user:undefined,
                loading:false,
                error:action.payload
            };
            case "LOGOUT":
            return {
                user:undefined,
                loading:false,
                error:undefined
            };
        default:
            return state;
    }
};

export const AuthContextProvider = ({children}) =>{
    const [state,dispatch] = useReducer(AuthReducer,INITIAN_STATE);

    useEffect(()=>{
        localStorage.setItem("user",JSON.stringify(state.user))
    },[state.user])



    return(
        <AuthContext.Provider value={{
            user:state.user,
            loading:state.loading,
            error:state.error,
            dispatch
        }}>
        {children}
        </AuthContext.Provider>
    )
}
