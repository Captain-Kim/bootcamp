import { useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { jsonApi } from "../../api";
import { useQueryClient, useMutation } from "@tanstack/react-query";

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 30px;
  background-color: #fdfdfd;
  border-radius: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;

  label {
    margin-bottom: 10px;
    font-size: 16px;
    color: #444;
    text-align: left;
    font-weight: 600;
  }

  input {
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 16px;
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: border-color 0.2s;

    &:focus {
      border-color: #007bff;
      outline: none;
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  justify-content: flex-end;
`;

const Button = styled.button`
  padding: 12px 25px;
  background-color: ${(props) => (props.danger ? "#ff4d4d" : "#007bff")};
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: ${(props) => (props.danger ? "#cc0000" : "#0056b3")};
    transform: scale(1.05);
  }

  &:active {
    transform: scale(1);
  }
`;

const BackButton = styled(Button)`
  background-color: #6c757d;

  &:hover {
    background-color: #5a6268;
  }
`;

export default function Detail({ expenses }) {
  const navigate = useNavigate();
  const { id } = useParams();

  const selectedExpense = expenses.find((element) => element.id === id);

  const [date, setDate] = useState(selectedExpense.date);
  const [item, setItem] = useState(selectedExpense.item);
  const [amount, setAmount] = useState(selectedExpense.amount);
  const [description, setDescription] = useState(selectedExpense.description);

  const queryClient = useQueryClient();

  const editExpense = async (id) => {
    try {
      const datePattern = /^\d{4}-\d{2}-\d{2}$/;
      if (!datePattern.test(date)) {
        alert('날짜를 YYYY-MM-DD 형식으로 입력해주세요.');
        return;
      }
      if (!item || amount <= 0) {
        alert("유효한 항목과 금액을 입력해주세요.");
        return;
      }

      const nickname = localStorage.getItem('nickname');

      const updatedExpense = {
        ...selectedExpense, // 원래의 모든 필드를 유지
        date: date,
        item: item,
        amount: amount,
        description: description,
        createdBy: nickname,
      };

      await jsonApi.put(`/expenses/${id}`, updatedExpense);
      // 위 PUT 요청 이후 새롭게 GET 요청을 보내서 아래의 상태 변경으로 옵티미스트한 렌더링을 안 해줘도 됨.
      queryClient.invalidateQueries({queryKey:['expenses']});
      // setExpenses(expenses.map(expense => (expense.id === id ? updatedExpense : expense)));
      alert(`${item} 항목을 수정하였습니다.`);

    } catch (error) {
      alert('수정 과정에서 에러가 발생했습니다 : ' + error.message);
    }
  };

  const deleteMutation = useMutation({
    mutationFn: (id) => jsonApi.delete(`/expenses/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
      alert(`${description} 항목을 삭제했습니다.`);
      navigate('/');
    },
    onError: (error) => {
      alert('삭제 과정에서 에러가 발생했습니다: ' + error.message);
    },
  });

  return (
    <Container>
      <InputGroup>
        <label htmlFor="date">날짜</label>
        <input
          type="text"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          placeholder="YYYY-MM-DD"
        />
      </InputGroup>
      <InputGroup>
        <label htmlFor="item">항목</label>
        <input
          type="text"
          id="item"
          value={item}
          onChange={(e) => setItem(e.target.value)}
          placeholder="지출 항목"
        />
      </InputGroup>
      <InputGroup>
        <label htmlFor="amount">금액</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="지출 금액"
        />
      </InputGroup>
      <InputGroup>
        <label htmlFor="description">내용</label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="지출 내용"
        />
      </InputGroup>
      <ButtonGroup>
        <Button onClick={() => editExpense(id)}>수정</Button>
        <Button danger="true" onClick={() => deleteMutation.mutate(id)}>
          삭제
        </Button>
        <BackButton onClick={() => navigate(-1)}>뒤로 가기</BackButton>
      </ButtonGroup>
    </Container>
  );
}
