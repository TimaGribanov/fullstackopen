import { useSelector } from 'react-redux'

const Message = () => {
  const message = useSelector(state => {
    if (state.notification !== undefined) {
      switch (state.notification.action) {
        case 'LIKE': {
          const blogToShow = state.blogs.find(({ id }) => id === state.notification.value)
          return `You have liked the blog '${blogToShow.title}'`
        }
        case 'ADD':
          return `You have added the blog '${state.notification.value}'`
        case 'DELETE':
          return `You have deleted the blog '${state.notification.value}'`
      }
    }

    return ''
  })

  if (message === "") return null
  return <div className="info">{message}</div>
}

export default Message
