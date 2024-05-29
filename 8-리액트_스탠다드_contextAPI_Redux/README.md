# 5차 과제

## 1. context 브랜치에서는 texts 상태를 context api 로 리팩터링 하세요.

## 2. redux 브랜치에서는 context api 를 redux 로 리팩터링 하세요.

### - context 작업을 다했으면 git checkout -b redux 로 브랜치 생성 및 이동해서 이어서 작업하세요.

# 과제 풀이

## context API로 texts state 리펙토링 하기

### 원본

```jsx
import React, { useState, useEffect} from "react";
import TextInput from "./components/TextInput";
import TextList from "./components/TextList";

function App() {
  // TODO: texts 를 context api 로 리팩터링 하세요.
  const [texts, setTexts] = useState(() =>
    localStorage.getItem("texts")
      ? JSON.parse(localStorage.getItem("texts"))
      : [],
  );

  useEffect(() => {
    localStorage.setItem("texts", JSON.stringify(texts));
  }, [texts]);

  const onAddText = (text) => {
    setTexts((prevTexts) => [...prevTexts, text]);
  };

  return (
    <div>
      <h1>Text Input and Listing</h1>
      <TextInput onAddText={onAddText} />
      <TextList texts={texts} />
    </div>
  );
}

export default App;
```
### TextContext.js 파일 생성
```jsx
// src/TextContext.js
```
### createContext import 하기
`createContext` 뿐만 아니라 context API로 상태 관리를 하고자 하는 상태를 모두 import한다.
```jsx
// src/TextContext.js

import React, { createContext, useState, useEffect } from 'react';
```
### TextContext 초기값 정의하기
```jsx
const TextContext = createContext();
```
### TextProvider 컴포넌트 정의하기
```jsx
const TextProvider = ({ children }) => {
	// 이곳에 상태로 관리하고자 하는 것 전부 가져오기
}
```
### context로 관리하고자 하는 상태와 그와 연관된 함수 모조리 불러오기
```jsx
import React, { createContext, useState, useEffect } from 'react';

const TextContext = createContext();

const TextProvider = ({ children }) => {
  const [texts, setTexts] = useState(() =>
    localStorage.getItem('texts') ? JSON.parse(localStorage.getItem('texts')) : [],
  );

  useEffect(() => {
    localStorage.setItem('texts', JSON.stringify(texts));
  }, [texts]);

  const onAddText = (text) => {
    setTexts((prevTexts) => [...prevTexts, text]);
  };

  return (
    <TextContext.Provider value={{ texts, onAddText }}>
      {children}
    </TextContext.Provider>
  );
};

export default TextProvider;
```
### 상태 정의한 App 컴포넌트에서 상태와 관련된 코드 삭제
```jsx
// App.jsx
// TextProvider 가져오기
import { TextProvider } from './TextContext';

function App() {
    // TODO: texts 를 context api 로 리팩터링 하세요.
  return (
	{/* TextProvider 컴포넌트로 감싸기 */}
    <TextProvider>
      <div>
        <h1>Text Input and Listing</h1>
        <TextInput />
        <TextList />
      </div>
    </TextProvider>
  );
}

export default App;
```
### 이 상태를 props로 받아 쓰는 하위 컴포넌트에서 useContext 리펙토링 하기
```jsx
// components/TextInput.jsx 전체코드
import React, { useState } from "react";

function TextInput({ onAddText }) {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onAddText(inputValue);
      setInputValue("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Enter text"
      />
      <button type="submit">Add</button>
    </form>
  );
}

// 두 개의 컨텍스트를 export 하는 것을 잊지 않도록 한다.
export { TextContext, TextProvider };
```
```jsx
// components/TextInput.jsx
// useContext import 하기
import React, { useState, useContext } from 'react';

// TextContext.jsx 컴포넌트 import 하기
import { TextContext } from '../TextContext';

// Context에서 onAddText 함수를 사용하기
function TextInput() { // props로 내려 받고 있던 onAddText 함수 제거
  const [inputValue, setInputValue] = useState("");
  const { onAddText } = useContext(TextContext);
```
```jsx
// components/TextList.jsx
// useContext import 하기
import { useContext } from "react";
// TextContext 컴포넌트 import 하기
import { TextContext } from '../TextContext';

// props로 내려 받은 texts 빼고 TextContext에서 texts 사용하기
export default function TextList() {
  const { texts } = useContext(TextContext); 
  
  return (
    <ul>
      {texts.map((text, index) => (
        <li key={index}>{text}</li>
      ))}
    </ul>
  );
}
```