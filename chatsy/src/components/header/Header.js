import SearchBar from "./SearchBar"
import Profile from "./Profile"

const Header = () => {


    return(
        <header className='header'>
            <h2 className='logo'>CHATSY</h2>
            <SearchBar/>
            <Profile/>
        </header>
    )
}

export default Header