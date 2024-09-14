import React, { useState } from 'react'
import styled from 'styled-components'

const ToolboxContainer = styled.div<{ isOpen: boolean }>`
  position: absolute;
  bottom: ${(props) => (props.isOpen ? '0px' : '0')};
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  height: ${(props) => (props.isOpen ? '80px' : '20px')};
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 25px 25px 0 0;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.05);
    pointer-events: none;
    z-index: -1;
    border-radius: inherit;
  }
`

const ToolboxToggle = styled.button`
  width: 100%;
  height: 20px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text};
  border: none;
  border-radius: 25px 25px 0 0;
  cursor: pointer;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ToolboxContent = styled.div`
  padding: 10px;
  color: ${({ theme }) => theme.colors.text};
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
`

const ToolItem = styled.div`
  margin: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
`
const Toolbox: React.FC<{ onCenterFocus: () => void }> = ({
  onCenterFocus,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <ToolboxContainer isOpen={isOpen}>
      <ToolboxToggle onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? '▼' : '▲'}
      </ToolboxToggle>
      {isOpen && (
        <ToolboxContent>
          <ToolItem onClick={onCenterFocus}>🖌️ center focus</ToolItem>
          <ToolItem>✂️</ToolItem>
          <ToolItem>🔍</ToolItem>
          <ToolItem>📏</ToolItem>
          <ToolItem>🎨</ToolItem>
        </ToolboxContent>
      )}
    </ToolboxContainer>
  )
}

export default Toolbox
