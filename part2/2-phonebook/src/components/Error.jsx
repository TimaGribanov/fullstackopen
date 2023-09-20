const Error = ({ error }) => {
    if (error === '') return null
    return (
        <div className='err'>
            {error}
        </div>
    )
}

export default Error