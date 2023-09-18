const Header = ({ course }) => {
    return (
      <h1>{course}</h1>
    )
  }
  
  const Part = ({ key, part, exercises }) => {
    return (
      <p key={key}>
        {part} {exercises}
      </p>
    )
  }
  
  const Content = ({ parts }) => {
    return (
      <div>
        {parts.map(part =>
          <Part key={part.id} part={part.name} exercises={part.exercises} />
        )}
      </div>
    )
  }
  
  const Footer = ({ parts }) => {
    let total = 0
    parts.map(part => total += part.exercises)
    return (
      <p><strong>total of {total} exercises</strong></p>
    )
  }
  
  const Course = ({ course }) => {
    return (
      <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Footer parts={course.parts} />  
      </div>
    )
  }

export default Course