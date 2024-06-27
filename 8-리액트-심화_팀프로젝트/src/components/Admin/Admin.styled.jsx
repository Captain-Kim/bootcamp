import styled from "styled-components";

const StWriteWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
  height: 100%;
  padding: 40px 0;
`;

const StForm = styled.form`
  width: 700px;
`;

const ImageUploadButton = styled.label`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 15px;
  margin: auto;
  margin-bottom: 10px;
  font-size: 15px;
  border-radius: 20px;
  border: 1px solid gray;
  cursor: pointer;
  input {
    display: none;
  }
`;

const StTopForm = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 5px;
`;

const StFestival = styled.input`
  width: 100%;
  padding: 15px;
  margin: auto;
  margin-bottom: 10px;
  font-size: 15px;
  border-radius: 5px;
  border: 1px solid gray;
`;

const StDateForm = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StDateName = styled.div`
  padding: 15px;
  margin-right: 10px;
  font-size: 15px;
`;

const StFestivalDate = styled.input`
  width: 45%;
  padding: 0px 15px;
  height: 40px;
  margin: 10px 2.5%;
  font-size: 15px;
  border-radius: 5px;
  border: 1px solid gray;
`;

const StDescription = styled.textarea`
  padding: 20px;
  border-radius: 5px;
  border: 1px solid gray;
  font-size: 14px;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  height: auto;
  min-height: 100px;
  resize: vertical;
  display: block;
`;

const StInputForm = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  /* background-color: #ddd; */
  > h3 {
    color: #2d5f2e;
    font-size: 32px;
    text-align: center;
    font-weight: bold;
    padding-bottom: 20px;
  }
`;

const StAddressForm = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px;
`;

const StFestiAddress = styled.button`
  border: ${(props) => (props.selected ? 0 : '1px solid gray')};
  border-radius: 20px;
  height: 40px;
  padding: ${(props) => (props.selected ? '0 21px' : '0 20px')};
  margin: 5px;
  cursor: pointer;
  color: ${(props) => (props.selected ? '#fff' : '#333')};
  background: ${(props) => (props.selected ? '#333' : '#fff')};
  transition: background-color 0.3s ease;
  &:hover {
    background: #333;
    color: #fff;
    border: 0;
    padding: 0 21px;
    text-decoration: none;
  }
`;

const StFestiDetailAddress = styled.input`
  width: 100%;
  padding: 15px;
  margin: auto;
  margin-bottom: 10px;
  font-size: 15px;
  border-radius: 5px;
  border: 1px solid gray;
`;

const StFestiPricing = styled.input`
  width: 100%;
  padding: 15px;
  margin: auto;
  margin-bottom: 10px;
  font-size: 15px;
  border-radius: 5px;
  border: 1px solid gray;
`;

const StFestiCategory = styled.button`
  border: ${(props) => (props.selected ? 0 : '1px solid gray')};
  border-radius: 20px;
  height: 40px;
  padding: ${(props) => (props.selected ? '0 21px' : '0 20px')};
  margin: 5px;
  cursor: pointer;
  color: ${(props) => (props.selected ? '#fff' : '#333')};
  background: ${(props) => (props.selected ? '#333' : '#fff')};
  transition: background-color 0.3s ease;
  &:hover {
    background: #333;
    color: #fff;
    border: 0;
    padding: 0 21px;
    text-decoration: none;
  }
`;

const StCategoryForm = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px;
`;

const StButtonDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
`;

const StButton = styled.button`
  border-radius: 26px;
  border: none;
  color: white;
  font-weight: semi-bolder;
  font-size: 15px;
  background: #588157;
  margin: 5px;
  padding: 10px 25px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background: #3d593c;
    text-decoration: none;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f5f5f5;
  height: 100%;
  min-height: calc(100vh - 80px);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 800px;
  padding: 10px 20px;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.div`
  font-size: 1.5em;
  font-weight: bold;
  color: #2d5f2e;
`;

const SearchBar = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
  width: 50%;
  margin: 0 auto;
`;

const EventList = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
`;

const EventItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding: 15px 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 15px;
  cursor: pointer;
`;

const EventDetails = styled.div`
  flex: 1;
  margin-right: 20px;
  font-size: 1.1em;
  color: #333;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #2d5f2e;
  color: white;
  cursor: pointer;
  font-size: 0.9em;

  &:hover {
    background-color: #3a7741;
  }
`;

export {
    StWriteWrapper,
    StForm,
    ImageUploadButton,
    StTopForm,
    StFestival,
    StDateForm,
    StDateName,
    StFestivalDate,
    StDescription,
    StInputForm,
    StAddressForm,
    StFestiAddress,
    StFestiDetailAddress,
    StFestiPricing,
    StFestiCategory,
    StCategoryForm,
    StButtonDiv,
    StButton,
    Container,
    Header,
    Logo,
    SearchBar,
    EventList,
    EventItem,
    EventDetails,
    ButtonGroup,
    Button,
  };