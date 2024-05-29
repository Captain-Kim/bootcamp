function TodoForm({labelText, sortData, setData, placeholder}) {

  return (
    <>
          <label>{labelText}</label>
          <input
          type="text"
          value={sortData}
          onChange={(e) => setData(e.target.value)}
          placeholder={placeholder}>
          </input>
    </>
  );
}

export default TodoForm;
