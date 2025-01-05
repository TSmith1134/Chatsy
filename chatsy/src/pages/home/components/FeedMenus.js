

const NewPostOnClickShow = () => {
    document.getElementById('newPost').style.display = 'flex';
}

const FeedMenus = () => {


    return(
        <div className='feedMenus'>
            <div className='profileOptions'>
                <img id='profileOptionsImage' src='http://localhost:3000/images/logo512.png' alt=''/>
                <div id='profileOptionsInfo'>
                    <h4>John Doe</h4>
                    <h6>@test</h6>
                    <p>View Profile</p>
                </div>
            </div>
            <div className='feedOptions'>
                <button className='feedOptionsBTN' onClick={NewPostOnClickShow}>New Post</button>
                <button className='feedOptionsBTN'>Explore</button>            
                <button className='feedOptionsBTN'>Saved Posts</button>            
                <button className='feedOptionsBTN'>Groups</button>            
            </div>
        </div>
        
    )
}

export default FeedMenus