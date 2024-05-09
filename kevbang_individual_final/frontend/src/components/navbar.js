import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
/**
 * This file serves as the navigation bar for the website.
 * @returns Navigation bar for website
 */
const Navbar = () => {
    // if there arent any cookies, that means you're not logged in.
    const[cookies, setCookies] = useCookies(["access_token"])
    const navigate = useNavigate();

    const signout = () => {
        setCookies("access_token", "");
        window.localStorage.removeItem("userID");
        navigate("/auth");
    }

    return (<div className="navbar"> 
        <Link className='navbar-item' to="/"> Home </Link>
        <Link className='navbar-item' to="/CreateRecipe"> Create </Link>
        <Link className='navbar-item' to="/FavoriteRecipe"> Favorites </Link>
        <Link className='navbar-item' to="/info"> Info </Link>
        {!cookies.access_token ? (<Link to="/auth" style={{ textDecoration: 'none', color: 'white', fontSize: '16px' }}>Login/Register</Link>) : 
        <button onClick={signout} style={{ backgroundColor: '#474B4f', fontSize: '20px', border: 'none' }}> <CiLogout />
        </button>} 
        
    </div>)



}


export default Navbar;