import React, { ReactNode } from 'react'
import styled from 'styled-components'

interface PanelContainerProps {
  title: string
  children: ReactNode
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100%;
`

const TitleBar = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  font-style: italic;
  padding: 4px 8px;
  font-size: 11px;
  font-weight: 600;
  user-select: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const TitleText = styled.span`
  margin-right: 8px;
`

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  font-size: 11px;
  padding: 0;
  margin-left: auto;
  &:hover {
    color: ${({ theme }) => theme.colors.error};
  }
`

const Content = styled.div`
  flex: 1;
  overflow: auto;
  background-color: ${({ theme }) => theme.colors.background};
  font-size: 13px;
`

const PanelContainer: React.FC<PanelContainerProps> = ({ title, children }) => {
  return (
    <Container>
      <TitleBar>
        <TitleText>{title}</TitleText>
        <CloseButton>×</CloseButton>
      </TitleBar>
      <Content>{children}</Content>
    </Container>
  )
}

export default PanelContainer
