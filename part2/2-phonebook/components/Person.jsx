const Person = ({ id, name, number, visible }) => {
    if (visible) return <p key={id}>{name} {number}</p>
}

export default Person