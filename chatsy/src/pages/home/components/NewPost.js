

const NewPostOnClickClose = () => {
    document.getElementById('newPost').style.display = 'none';
}

const NewPost = () => {
    return(
        <div id='newPost'>
            <h4>NEW POST</h4>
            <label htmlFor='contentInput'>Add Content</label>
            <textarea autoFocus required form='newPostForm' name='contentInput' placeholder='Add content...'/>
            <div id='newPostButtonGroup'>
                <input type="submit" value='SUBMIT'/>
                <button onClick={NewPostOnClickClose}>Close</button>
            </div>
        </div>
    )
}

export default NewPost