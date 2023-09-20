const Message = ({ message }) => {
    if (message === '') return null
    return (
        <div className='info'>
            {message}
        </div>
    )
}

export default Message