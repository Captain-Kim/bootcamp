function TodoItem({todo, handleToggle}) {
  return (
    <>
        <button type="button" onClick={()=>handleToggle(todo.id)}>{todo.isDone ? '취소' : '완료'}</button>
    </>
  );
}

export default TodoItem;
