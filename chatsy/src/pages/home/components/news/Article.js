

const Article = () => {


    return(
        <div className='article'>
            <img className='articleImage' src='http://localhost:3000/images/logo512.png' alt=''/>
            <div className='articleContent'>
                <h5 className='articleHeadline'>Headline!</h5>
                <p className='articleBrief'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus dapibus mauris et mauris pellentesque ornare quis at mauris. Phasellus aliquam erat libero, a congue nisi imperdiet sed. Nulla blandit tristique.</p>
            </div>
        </div>
    )
}

export default Article