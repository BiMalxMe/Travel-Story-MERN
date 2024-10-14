import { useNavigate} from "react-router-dom"
import { PasswordInput } from "../../components/Input/PasswordInput"
export const Login=()=>{
    const navigate=useNavigate()
    return <div className="h-screen bg-cyan-50 overflow-hidden relative">
        <div className="h-screen container flex items-center justify-center px-20 mx-auto"> 
            <div className="w-2/4 h-[90vh] flex items-end bg-signup-bg-img bg-cover bg-center rounded-lg p-10 z-50">
                <div>
                    <h4 className="text-5xl text-white font-semibold leading-[50px]">
                        Capture your <br /> Journeys
                    </h4>
                    <p className="text-[15px] text-white leading-6 pr-7 pt-4">
                        Record your travel experiences and memories in your personal travel journal.
                    </p>
                </div>
            </div>
            <div className="w-2/4 h-[75vh] bg-white rounded-r-lg relative p-16 shadow-lg shadow-cyan-200/20">
                <form onSubmit={()=>{}}>
                    <h4 className="text-2xl font-semibold mb-7">Login</h4>
                    <input type="text" placeholder="Email" className="input-box" />
                    <PasswordInput />
                    <button type="submit" className="btn-primary">
                        Login
                    </button>
                    <p className="text-xs text-slate-500 text-center my-4">Or</p>
                    <button
                    type="submit"
                      className="btn-primary btn-light"
                      onClick={()=>{
                        navigate("/signup")
                      }}   
                      > Create Account</button>
                </form>
            </div>
        </div>
    </div>
}