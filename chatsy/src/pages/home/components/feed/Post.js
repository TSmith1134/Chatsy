

const Post = ({authorID, authorName, authorUsername, content}) => {

    const authorImagePath = 'http://localhost:3000/images/'+ authorID +'.png'

    return(
        <div className='post'>
            <div className='postAuthor'>
                <img className='postAuthorImage' src={authorImagePath} alt=''/>
                <h2>-</h2>
                <h5>@{authorUsername}<h6>{authorName}</h6> </h5>
            </div>
            <div className='postContent'>
                <p>{content}</p>
            </div>
        </div>
    )
}

export default Post