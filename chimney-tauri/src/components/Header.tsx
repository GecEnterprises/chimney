import React from 'react';
import styled from 'styled-components';
import { logDebugAtom } from '../states/logger';
import { Orientation, orientationAtom } from '../states/config';
import { useSetAtom } from 'jotai';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 20px;
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.background};
  user-select: none;
`;

const HeaderNav = styled.nav`
  display: flex;
  user-select: none;
`;

const HeaderMenu = styled.ul`
  list-style-type: none;
  background-color: ${({ theme }) => theme.colors.background}; 
  display: flex;
  margin: 0;
  padding: 0;
  user-select: none;
`;

const HeaderMenuItem = styled.li`
  position: relative;
  background-color: ${({ theme }) => theme.colors.background}; 
  margin-right: 20px;
  user-select: none;
`;

const MenuSpan = styled.span`
  cursor: pointer;
  padding: 5px 10px;
  user-select: none;
  &:hover {
    background-color: ${({ theme }) => theme.colors.hover};
  }
`;

const Submenu = styled.ul`
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  background-color: ${({ theme }) => theme.colors.background}; 
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  padding: 10px;
  list-style-type: none;
  user-select: none;

  ${HeaderMenuItem}:hover & {
    display: block;
  }
`;

const SubmenuItem = styled.li`
  padding: 5px 0;
  user-select: none;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  user-select: none;
`;

const Icon = styled.span`
  font-size: 15px;
  margin-left: 15px;
  cursor: pointer;
  user-select: none;
`;

const Header: React.FC = () => {
    const setOrientation = useSetAtom(orientationAtom);

  const logDebug = useSetAtom(logDebugAtom);

  const handleUpClick = () => {
    setOrientation((prevOrientation: Orientation) => prevOrientation === Orientation.Vertical ? Orientation.Horizontal : Orientation.Vertical);
    logDebug('Flipping orientation');
  };

  return (
    <HeaderContainer>
      <HeaderNav>
        <HeaderMenu>
          <HeaderMenuItem>
            <MenuSpan>Help</MenuSpan>
            <Submenu>
              <SubmenuItem>Welcome</SubmenuItem>
              <SubmenuItem>Documentation</SubmenuItem>
              <SubmenuItem>About</SubmenuItem>
            </Submenu>
          </HeaderMenuItem>
        </HeaderMenu>
      </HeaderNav>
      <IconContainer>
        <Icon>🟨</Icon>
        <Icon onClick={handleUpClick}>🆙</Icon>
      </IconContainer>
    </HeaderContainer>
  );
};

export default Header;
