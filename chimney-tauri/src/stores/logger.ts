import { atom } from 'jotai'

export enum LogLevel {
  INFO = 'INFO',
  WARN = 'WARN',
  DEBUG = 'DEBUG',
  ERROR = 'ERROR',
}

interface LogEntry {
  timestamp: Date
  level: LogLevel
  message: string
}

export const logsAtom = atom<LogEntry[]>([])

export const addLogAtom = atom(
  null,
  (get, set, { level, message }: { level: LogLevel; message: string }) => {
    set(logsAtom, [...get(logsAtom), { timestamp: new Date(), level, message }])
  }
)

export const clearLogsAtom = atom(null, (_, set) => {
  set(logsAtom, [])
})

export const logInfoAtom = atom(null, (_, set, message: string) => {
  set(addLogAtom, { level: LogLevel.INFO, message })
})

export const logDebugAtom = atom(null, (_, set, message: string) => {
  set(addLogAtom, { level: LogLevel.DEBUG, message })
})
