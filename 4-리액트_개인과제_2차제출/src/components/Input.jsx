function Input({newLabel, newValue, setNewValue}) {
    return(
        <>

        <span>{newLabel}</span>
        <input
        type="text"
        value={newValue}
        className="input-title"
        onChange={(e) => setNewValue(e.target.value)}
        placeholder={newLabel}
        />

        </>
    )
}

export default Input