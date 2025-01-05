import Post from './Post'

const content = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum aliquam ornare nulla, id sodales erat. Sed facilisis pretium arcu. Nunc molestie tristique nulla, cursus porta nunc feugiat sed. Nunc et sem quis augue facilisis scelerisque. Morbi dignissim volutpat nisl sit amet maximus. Cras fermentum nunc luctus sapien suscipit, a ultrices erat imperdiet. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nunc rhoncus luctus tellus, in rhoncus purus gravida vitae. Donec quis imperdiet augue. Curabitur consequat id elit quis vestibulum. Suspendisse aliquam, eros in maximus auctor, ipsum diam rutrum magna, vitae hendrerit elit mauris a ipsum. Phasellus efficitur justo ut erat cursus, et rhoncus neque vehicula. Etiam sit amet neque libero. Quisque rutrum sit amet orci quis euismod. Vestibulum gravida pellentesque est, suscipit blandit lorem blandit sed.

Vestibulum at nisl non lectus egestas hendrerit in a erat. Suspendisse et porta tortor. Ut nulla lorem, vulputate at quam sed, sodales suscipit purus. Proin lacus massa, facilisis a tincidunt vel, sagittis in sapien. Mauris neque arcu, lobortis vitae ligula ut, tristique iaculis felis. Sed non egestas odio. Praesent gravida vel nisi sit amet tempus. Mauris quam est, porta non magna nec, lobortis finibus tellus. Aliquam dapibus cursus enim eu consectetur. Nam.`

const Feed = () => {


    return(
        <div className='feed'>
            <Post authorID='logo512' authorUsername='test' authorName='John Doe' content={content}/>
            <Post authorID='logo512' authorUsername='test' authorName='John Doe' content={content}/>
            <Post authorID='logo512' authorUsername='test' authorName='John Doe' content={content}/>
            <Post authorID='logo512' authorUsername='test' authorName='John Doe' content={content}/>
            <Post authorID='logo512' authorUsername='test' authorName='John Doe' content={content}/>
            <Post authorID='logo512' authorUsername='test' authorName='John Doe' content={content}/>
            <Post authorID='logo512' authorUsername='test' authorName='John Doe' content={content}/>
            <Post authorID='logo512' authorUsername='test' authorName='John Doe' content={content}/>
            <Post authorID='logo512' authorUsername='test' authorName='John Doe' content={content}/>
            <Post authorID='logo512' authorUsername='test' authorName='John Doe' content={content}/>
        </div>
    )
}

export default Feed