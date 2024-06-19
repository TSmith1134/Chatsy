import SearchBar from "./SearchBar"
import Profile from "./Profile"

const Header = () => {


    return(
        <div className='header'>
            <h2 className='logo'>CHATSY</h2>
            <SearchBar/>
            <Profile/>
        </div>
    )
}

export default Header