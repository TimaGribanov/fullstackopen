const Person = ({ id, name, number, visible, handleDelete }) => {
    if (visible) return (
        <p>{name} {number} <button onClick={() => handleDelete(id, name)}>delete</button></p>
    )
}

export default Person