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

  if (error === '') return null
  return <div className='err'>{error}</div>
}

export default Error
