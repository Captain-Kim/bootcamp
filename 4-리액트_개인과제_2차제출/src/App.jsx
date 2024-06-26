// src/App.jsx
import { useState } from 'react';
import './App.css';
import Input from './components/Input';
import CardSection from './components/CardSection';

function App() {
  const [cards, setCards] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newBody, setNewBody] = useState('');

  const addCard = (e) => {
    e.preventDefault();
    if (newTitle === '' || newBody === '') {
      setNewTitle('');
      setNewBody('');
      alert('값이 입력되지 않았습니다.');
      return;
    }
    setNewTitle('');
    setNewBody('');

    const newCard = {
      id: Date.now(),
      title: newTitle,
      body: newBody,
      isDone: false
    };

    setCards([...cards, newCard]);
  };

  const removeCard = (id) => {
    const filteredCards = cards.filter(card => card.id !== id);
    setCards(filteredCards);
  };

  const handleComplete = (id) => {
    const updatedCards = cards.map(card => {
      if (card.id === id) {
        return { ...card, isDone: true };
      }
      return card;
    });
    setCards(updatedCards);
  };

  const handleCancel = (id) => {
    const updatedCards = cards.map(card => {
      if (card.id === id) {
        return { ...card, isDone: false };
      }
      return card;
    });
    setCards(updatedCards);
  };

  return (
    <>
      <h1>나만의 To Do List</h1>
      <form onSubmit={addCard}>
        <div className="input-group">
          <Input newLabel={'제목'} newValue={newTitle} setNewValue={setNewTitle} />
          <Input newLabel={'내용'} newValue={newBody} setNewValue={setNewBody} />
          <button type="submit" className="submit-button">작성하기</button>
        </div>
      </form>

      <div>
        <CardSection 
          newCards={cards.filter(card => !card.isDone)} 
          toggleClassName={'done-button'} 
          toggleText={'완료'} 
          h1Text={'Working! 🔥'} 
          handleToggle={handleComplete}
          removeCard={removeCard} 
        />
      </div>

      <div>
        <CardSection 
          newCards={cards.filter(card => card.isDone)} 
          toggleClassName={'cancel-button'} 
          toggleText={'취소'} 
          h1Text={'Done! ✅'} 
          handleToggle={handleCancel}
          removeCard={removeCard} 
        />
      </div>
    </>
  );
}

export default App;
