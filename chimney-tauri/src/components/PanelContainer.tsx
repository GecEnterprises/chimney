import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface PanelContainerProps {
  title: string;
  children: ReactNode;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  /* border: 1px solid ${({ theme }) => theme.colors.border}; */
  overflow: hidden;
  height: 100%;
`;

const TitleBar = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  font-style: italic;
  padding: 4px 8px;
  font-size: 11px;
  font-weight: 600;
  user-select: none;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
`;

const TitleText = styled.span`
  margin-right: 8px;
`;

const Content = styled.div`
  flex: 1;
  overflow: auto;
  padding: 8px;
  background-color: ${({ theme }) => theme.colors.background};
  font-size: 13px;
`;

const PanelContainer: React.FC<PanelContainerProps> = ({ title, children }) => {
  return (
    <Container>
      <TitleBar>
        <TitleText>{title}</TitleText>
      </TitleBar>
      <Content>{children}</Content>
    </Container>
  );
};

export default PanelContainer;
