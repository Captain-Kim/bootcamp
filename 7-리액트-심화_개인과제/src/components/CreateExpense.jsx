import { Section } from "../pages/Home";
import styled from "styled-components";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { jsonApi } from "../../api";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSelector } from "react-redux";

const InputRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  align-items: flex-end;
`;

const InputGroupInline = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 140px;

  label {
    margin-bottom: 8px;
    font-size: 14px;
    color: #444;
    text-align: left;
    font-weight: 600;
  }

  input {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 16px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: border-color 0.2s;

    &:focus {
      border-color: #007bff;
      outline: none;
    }
  }
`;

const AddButton = styled.button`
  padding: 10px 25px;
  height: 40px;
  margin-top: 10px;
  background-color: black;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: yellow;
    color: black;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(1);
  }
`;

export default function CreateExpense({ month }) {
  const [newDate, setNewDate] = useState(
    `2024-${String(month).padStart(2, "0")}-01`
  );
  const [newItem, setNewItem] = useState("");
  const [newAmount, setNewAmount] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: newExpense => jsonApi.post('/expenses', newExpense),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
    }
  });

  const nickname = useSelector((state) => state.auth.nickname);

  const handleAddExpense = () => {

    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    if (!datePattern.test(newDate)) {
      alert('날짜를 YYYY-MM-DD 형식으로 입력해주세요.');
      return;
    }

    const parsedAmount = parseInt(newAmount, 10);
    if (!newItem || parsedAmount <= 0) {
      alert('유효한 항목과 금액을 입력해주세요.');
      return;
    }

    const newExpense = {
      id: uuidv4(),
      month: parseInt(newDate.split("-")[1], 10),
      date: newDate,
      item: newItem,
      amount: parsedAmount,
      description: newDescription,
      createdBy: nickname,
    };

    try { mutation.mutate(newExpense); } catch (err) {
      alert('게시글 등록 중 에러가 발생했습니다' + err.message);
    };
  }

  return (
    <Section>
      <InputRow>
        <InputGroupInline>
          <label htmlFor="date">날짜</label>
          <input
            type="text"
            id="date"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
            placeholder="YYYY-MM-DD"
          />
        </InputGroupInline>
        <InputGroupInline>
          <label htmlFor="item">항목</label>
          <input
            type="text"
            id="item"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="지출 항목"
          />
        </InputGroupInline>
        <InputGroupInline>
          <label htmlFor="amount">금액</label>
          <input
            type="number"
            id="amount"
            value={newAmount}
            onChange={(e) => setNewAmount(e.target.value)}
            placeholder="지출 금액"
          />
        </InputGroupInline>
        <InputGroupInline>
          <label htmlFor="description">내용</label>
          <input
            type="text"
            id="description"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            placeholder="지출 내용"
          />
        </InputGroupInline>
        <AddButton onClick={handleAddExpense}>저장</AddButton>
      </InputRow>
    </Section>
  );
}
