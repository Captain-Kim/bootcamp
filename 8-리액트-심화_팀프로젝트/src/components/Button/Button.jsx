import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
    width: 200px;
    height: 50px;
    background-color: ${props => props.$bgColor || "white"};
    color: ${props => props.$bgColor ? "white" : "black"};
    border: 2px solid ${props => props.$bgColor || "black"};
    border-radius: 8px;
    font-weight: bold;
    font-size: 16px;
    cursor: pointer;
    &:hover{
        filter: brightness(0.9);
    }
`;

const Button = ({ children, onClick, bgColor }) => {
    return (
        <StyledButton onClick={onClick} $bgColor={bgColor}>{children}</StyledButton>
    )
}

export default Button