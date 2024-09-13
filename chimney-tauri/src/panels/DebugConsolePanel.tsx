import React, { useState } from 'react';
import styled from 'styled-components';
import PanelContainer from '../components/PanelContainer';

const ConsoleContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const ConsoleOutput = styled.div`
  flex: 1;
  overflow-y: auto;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  font-family: monospace;
  padding: 8px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

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
`;

const LogEntry = styled.div`
  margin-bottom: 4px;
`;

const DebugConsolePanel: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([
    'Debug console initialized.',
    'Type your commands below.',
  ]);
  const [input, setInput] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleInputSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && input.trim() !== '') {
      setLogs([...logs, `> ${input}`, `Executed: ${input}`]);
      setInput('');
    }
  };

  return (
    <PanelContainer title="Debug Console">
      <ConsoleContainer>
        <ConsoleOutput>
          {logs.map((log, index) => (
            <LogEntry key={index}>{log}</LogEntry>
          ))}
        </ConsoleOutput>
        <ConsoleInput
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleInputSubmit}
          placeholder="Enter debug command..."
        />
      </ConsoleContainer>
    </PanelContainer>
  );
};

export default DebugConsolePanel;
