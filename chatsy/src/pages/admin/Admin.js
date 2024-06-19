import { Link } from "react-router-dom"
import Users from "./components/Users"

const Admin = () => {
    return(
        <section>
            <h1>Admin Page</h1>
            <br />
            <Users />
            <br />
            <Link to="/">Home</Link>
        </section>
    )
}

export default Admin