import PanelContainer from '../components/PanelContainer'
import { FileTreeItem, useChimneyStore } from '../stores/chimney'
import React, { useState, useEffect } from 'react'
import { FaFolder, FaFile } from 'react-icons/fa'
import styled from 'styled-components'

const TreeContainer = styled.div`
  padding: 10px;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
`

const TreeItem = styled.div`
  display: flex;
  align-items: center;
  padding: 2px 0;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text};
  &:hover {
    background-color: ${({ theme }) => theme.colors.hover};
  }
`

const TreeItemContent = styled.span`
  margin-left: 5px;
  color: ${({ theme }) => theme.colors.text};
`

const FileTreeNode: React.FC<{ item: FileTreeItem; depth: number }> = ({
  item,
  depth,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = () => {
    if (item.type === 'folder') {
      setIsOpen(!isOpen)
    }
  }

  return (
    <>
      <TreeItem onClick={toggleOpen} style={{ paddingLeft: `${depth * 15}px` }}>
        {item.type === 'folder' ? <FaFolder /> : <FaFile />}
        <TreeItemContent>{item.name}</TreeItemContent>
      </TreeItem>
      {isOpen &&
        item.children?.map((child, index) => (
          <FileTreeNode key={index} item={child} depth={depth + 1} />
        ))}
    </>
  )
}

const ProjectPanel: React.FC = () => {
  const fileTree = useChimneyStore((state) => state.fileTree)

  const workingDirectory = useChimneyStore((state) => state.workingDirectory)
  const refetchFileTree = useChimneyStore((state) => state.refetchFileTree)

  useEffect(() => {
    refetchFileTree()
  }, [workingDirectory])

  const getTrailingDirectory = (path: string | null) => {
    if (!path) return 'Project'
    const parts = path.split(/[/\\]/)
    return parts[parts.length - 1]
  }

  const panelTitle = `Project - ${getTrailingDirectory(workingDirectory)}`

  return (
    <PanelContainer title={panelTitle}>
      <TreeContainer>
        {fileTree.map((item, index) => (
          <FileTreeNode key={index} item={item} depth={0} />
        ))}
      </TreeContainer>
    </PanelContainer>
  )
}

export default ProjectPanel
