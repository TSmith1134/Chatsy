// import { Link, useLocation } from "react-router-dom"
import "../../assets/styles/Home.css"
import "../../assets/styles/index.css"
import Header from "../../components/header/Header"
import FeedMenus from "./components/FeedMenus"
import Feed from "./components/feed/Feed"
import News from "./components/news/News"
import SuggestedFollows from "./components/suggestFollows/SuggestedFollows"
import NewPost from "./components/NewPost"

export function Home(){
    // const location = useLocation()
    return (
        <div className="homePage">
            <Header/>
            <FeedMenus/>
            <Feed/>
            <div className="sideMenu">
                <News/>
                <SuggestedFollows/>
            </div>
            <NewPost/>
        </div>
    )
}