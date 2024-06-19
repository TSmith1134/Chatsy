// import { Link, useLocation } from "react-router-dom"
import "../../assets/styles/Home.css"
import Header from "../../components/header/Header"
import FeedOptions from "./components/FeedOptions"

export function Home(){
    // const location = useLocation()
    return (
        <div className="homePage">
            <Header/>
            <FeedOptions/>
        </div>
    )
}