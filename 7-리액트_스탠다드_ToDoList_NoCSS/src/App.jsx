import React, { useState } from "react";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";

function App() {
  const initialState = [
    // {
    //   id: crypto.randomUUID(),
    //   title: "",
    //   contents: "",
    //   isDone: false,
    // },
  ];
  //   초기상태 지정하니 빈 문자열 때문에 빈 카드 생김.
  const [todos, setTodos] = useState(initialState);

  const [nextTitle, setNextTitle] = useState("");
  const [nextContents, setNextContents] = useState("");

  const addTodo = (e) => {
    e.preventDefault();
    if (nextTitle === "" || nextContents === "") {
      setNextTitle("");
      setNextContents("");
      alert("값을 입력해주세요.");
      return;
    }
    const nextTodo = {
      id: crypto.randomUUID(),
      title: nextTitle,
      contents: nextContents,
      isDone: false,
    };
    setTodos([...todos, nextTodo]);
    setNextTitle("");
    setNextContents("");
  };

  const handleToggle = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isDone: !todo.isDone };
      } else {
        return todo;
      }
    });
    setTodos(updatedTodos);
  };

  const handleDelete = (id) => {
    const updatedTodos = (todos.filter(todo => todo.id !== id));
    setTodos(updatedTodos);
  }

  return (
    <>
      <form onSubmit={addTodo}>
        <TodoForm
          labelText={"제목"}
          sortData={nextTitle}
          setData={setNextTitle}
          placeholder={"제목"}
          todos={todos.filter((todo) => !todo.isDone)}
        />
        <TodoForm
          labelText={"내용"}
          sortData={nextContents}
          setData={setNextContents}
          placeholder={"내용"}
          todos={todos.filter((todo) => !todo.isDone)}
        />
        <button type="submit">작성하기</button>
      </form>

      <TodoList
        section="working!"
        isDone={false}
        todos={todos.filter((todo) => !todo.isDone)}
        handleToggle={handleToggle}
        handleDelete={handleDelete}
      />
      <TodoList
        section="done!"
        isDone={true}
        todos={todos.filter((todo) => todo.isDone)}
        handleToggle={handleToggle}
        handleDelete={handleDelete}
      />
    </>
  );
}

export default App;
