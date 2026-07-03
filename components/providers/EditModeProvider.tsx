'use client'

import { createContext, use, useCallback, useMemo, useState } from 'react'

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

  const contextValue = useMemo(
    () => ({ isAdmin, editMode: isAdmin && editMode, toggleEditMode }),
    [isAdmin, editMode, toggleEditMode],
  )

  return (
    <EditModeContext.Provider value={contextValue}>
      {children}
    </EditModeContext.Provider>
  )
}

export function useEditMode(): EditModeContextValue {
  const ctx = use(EditModeContext)
  if (!ctx) throw new Error('useEditMode must be used inside <EditModeProvider>')
  return ctx
}
