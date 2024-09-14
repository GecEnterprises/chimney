import PanelContainer from '../components/PanelContainer'
import {
  LogLevel,
  logsAtom,
  clearLogsAtom,
  logInfoAtom,
} from '../stores/logger'
import { useAtom, useSetAtom } from 'jotai'
import React from 'react'
import styled from 'styled-components'

const ConsoleContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const ConsoleOutput = styled.div`
  flex: 1;
  overflow-y: auto;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  font-family: monospace;
  padding: 8px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`

const ConsoleInput = styled.input`
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  border: none;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding: 8px;
  font-family: monospace;
  outline: none;

  &:focus {
    box-shadow: inset 0 0 0 1px ${({ theme }) => theme.colors.primary};
  }
`

const LogEntry = styled.div<{ level: LogLevel }>`
  margin-bottom: 4px;
  color: ${({ level, theme }) => {
    switch (level) {
      case LogLevel.INFO:
        return theme.colors.text
      case LogLevel.WARN:
        return theme.colors.warning
      case LogLevel.DEBUG:
        return theme.colors.secondary
      case LogLevel.ERROR:
        return theme.colors.error
      default:
        return theme.colors.text
    }
  }};
`

const DebugLogPanel: React.FC = () => {
  const [logs] = useAtom(logsAtom)
  const setClearLogs = useSetAtom(clearLogsAtom)
  const setLogInfo = useSetAtom(logInfoAtom)

  const handleInputSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.currentTarget.value.trim() !== '') {
      const input = e.currentTarget.value.trim()
      if (input === 'clear') {
        setClearLogs()
      } else {
        setLogInfo(`Executed: ${input}`)
      }
      e.currentTarget.value = ''
    }
  }

  return (
    <PanelContainer title="Debug Log">
      <ConsoleContainer>
        <ConsoleOutput>
          {logs.map((log, index: number) => (
            <LogEntry key={index} level={log.level}>
              [{log.timestamp.toLocaleTimeString()}] [{log.level}] {log.message}
            </LogEntry>
          ))}
        </ConsoleOutput>
        <ConsoleInput
          type="text"
          onKeyDown={handleInputSubmit}
          placeholder="Enter debug command..."
        />
      </ConsoleContainer>
    </PanelContainer>
  )
}

export default DebugLogPanel
