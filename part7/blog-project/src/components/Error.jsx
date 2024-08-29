import { Alert } from 'react-bootstrap'
import { useSelector } from 'react-redux'

const Error = () => {
  const error = useSelector(state => {
    if (state.error !== undefined) {
      switch (state.error.action) {
        case 'ERROR':
          return `${state.error.value}`
      }
    }

    return ''
  })

  return <div className='container'>
    {(error &&
      <Alert variant='danger'>
        {error}
      </Alert>
    )}
  </div>
}

export default Error
