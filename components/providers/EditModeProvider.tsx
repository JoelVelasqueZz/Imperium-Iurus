'use client'

import { createContext, useCallback, useContext, useState } from 'react'

type EditModeContextValue = {
  isAdmin: boolean
  editMode: boolean
  toggleEditMode: () => void
}

const EditModeContext = createContext<EditModeContextValue | null>(null)

export function EditModeProvider({
  isAdmin,
  children,
}: {
  isAdmin: boolean
  children: React.ReactNode
}) {
  const [editMode, setEditMode] = useState(false)
  const toggleEditMode = useCallback(() => setEditMode((v) => !v), [])

  return (
    <EditModeContext.Provider value={{ isAdmin, editMode: isAdmin && editMode, toggleEditMode }}>
      {children}
    </EditModeContext.Provider>
  )
}

export function useEditMode(): EditModeContextValue {
  const ctx = useContext(EditModeContext)
  if (!ctx) throw new Error('useEditMode must be used inside <EditModeProvider>')
  return ctx
}
