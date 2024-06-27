// src/components/CardSection.jsx
function CardSection({ newCards, toggleClassName, toggleText, h1Text, handleToggle, removeCard }) {
    return (
      <>
        <h1>{h1Text}</h1>
        <ul>
          {newCards.map(card => (
            <li key={card.id} className="card-item">
              <h2>{card.title}</h2>
              <h3>{card.body}</h3>
              <div>
                <button className="delete-button" onClick={() => removeCard(card.id)}>삭제</button>
                <button className={toggleClassName} onClick={() => handleToggle(card.id)}>{toggleText}</button>
              </div>
            </li>
          ))}
        </ul>
      </>
    );
  }
  
  export default CardSection;
  