import { Orientation, workingDirectoryAtom } from '../stores/chimney'
import { orientationAtom } from '../stores/config'
import { logDebugAtom } from '../stores/logger'
import { open } from '@tauri-apps/api/dialog'
import { useAtom, useSetAtom } from 'jotai'
import React from 'react'
import styled from 'styled-components'

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 20px;
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.background};
  user-select: none;
  position: relative;
`

const HeaderNav = styled.nav`
  display: flex;
  user-select: none;
`

const HeaderMenu = styled.ul`
  list-style-type: none;
  background-color: ${({ theme }) => theme.colors.background};
  display: flex;
  margin: 0;
  padding: 0;
  user-select: none;
`

const HeaderMenuItem = styled.li`
  position: relative;
  background-color: ${({ theme }) => theme.colors.background};
  user-select: none;
`

const MenuSpan = styled.span`
  cursor: pointer;
  padding: 5px 10px;
  user-select: none;
  &:hover {
    background-color: ${({ theme }) => theme.colors.hover};
  }
`

const Submenu = styled.ul`
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  background-color: ${({ theme }) => theme.colors.background};
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: 10px;
  list-style-type: none;
  user-select: none;
  z-index: 1000;

  ${HeaderMenuItem}:hover & {
    display: block;
  }
`

const SubmenuItem = styled.li`
  padding: 5px 5px;
  user-select: none;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.hover};
  }
`

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  user-select: none;
`

const Icon = styled.span`
  font-size: 15px;
  margin-left: 15px;
  cursor: pointer;
  user-select: none;
  padding: 5px;
  border-radius: 4px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.hover};
  }
`

const CenteredText = styled.div`
  position: absolute;
  left: 50%;
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 12px;
  top: 50%;
  transform: translate(-50%, -50%);
  font-weight: bold;
`

const Header: React.FC = () => {
  const setOrientation = useSetAtom(orientationAtom)
  const setWorkingDirectory = useSetAtom(workingDirectoryAtom)
  const logDebug = useSetAtom(logDebugAtom)

  const handleUpClick = () => {
    setOrientation((prevOrientation: Orientation) =>
      prevOrientation === Orientation.Vertical
        ? Orientation.Horizontal
        : Orientation.Vertical
    )
    logDebug('Flipping orientation')
  }

  const handleOpen = async () => {
    const selectedDirectory = await open({
      directory: true,
      multiple: false,
    })
    if (selectedDirectory) {
      if (Array.isArray(selectedDirectory)) {
        setWorkingDirectory(
          selectedDirectory.length > 1
            ? selectedDirectory.join(':')
            : selectedDirectory[0]
        )
      } else {
        setWorkingDirectory(selectedDirectory)
      }
    }
  }

  const [workingDirectory] = useAtom(workingDirectoryAtom)

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
      <CenteredText>
        {workingDirectory ? workingDirectory : 'No directory selected'}
      </CenteredText>
      <IconContainer>
        <HeaderMenu>
          <HeaderMenuItem>
            <MenuSpan>🪟open panel</MenuSpan>
            <Submenu>
              <SubmenuItem>Welcome</SubmenuItem>
              <SubmenuItem>Documentation</SubmenuItem>
              <SubmenuItem>About</SubmenuItem>
            </Submenu>
          </HeaderMenuItem>
        </HeaderMenu>
        <Icon onClick={handleOpen}>🗃️open</Icon>
        <Icon onClick={handleUpClick}>🆙rotate</Icon>
      </IconContainer>
    </HeaderContainer>
  )
}

export default Header
