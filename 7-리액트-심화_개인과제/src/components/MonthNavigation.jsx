import styled from "styled-components";
import { Section } from "../pages/Home";

const MonthWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 20px;
  justify-content: center;
  margin-bottom: 20px;
`;

const MonthButton = styled.button`
  text-align: center;
  font-family: 'Pretendard', serif;
  font-size: 18px;
  font-weight: 600;
  line-height: normal;
  display: flex;
  height: 60px;
  padding: 20px;
  width: 120px;
  justify-content: center;
  align-items: center;
  color: ${(props) => (props.selected ? "#fff" : "#000")};
  border-radius: 12px;
  border: 2px solid ${(props) => (props.selected ? "black" : "#F6F7FA")};
  cursor: pointer;
  background: ${(props) => (props.selected ? "black" : "#F6F7FA")};
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background: yellow;
    color: black;
  }
`;

const MONTHS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export default function MonthNavigation({ month, setMonth }) {
  return (
    <Section>
      <MonthWrapper>
        {MONTHS.map((element) => {
          return (
            <MonthButton
              key={element}
              selected={element === month}
              onClick={() => {
                setMonth(element);
              }}
            >{`${element}월`}</MonthButton>
          );
        })}
      </MonthWrapper>
    </Section>
  );
}
