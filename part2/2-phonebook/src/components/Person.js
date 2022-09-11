const Person = ({ name, number, visible }) => {
    if (visible) return <p>{name} {number}</p>
}

export default Person