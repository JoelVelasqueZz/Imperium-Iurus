'use client'

import { createContext, use, useCallback, useMemo, useState } from 'react'
import type { SiteConfig } from '@/lib/config-utils'

type ConfigContextValue = {
  config: SiteConfig
  updateConfig: <K extends keyof SiteConfig>(key: K, value: SiteConfig[K]) => void
}

const ConfigContext = createContext<ConfigContextValue | null>(null)

export function ConfigProvider({
  config,
  children,
}: {
  config: SiteConfig
  children: React.ReactNode
}) {
  const [state, setState] = useState(config)

  const updateConfig = useCallback(<K extends keyof SiteConfig>(key: K, value: SiteConfig[K]) => {
    setState((prev) => ({ ...prev, [key]: value }))
  }, [])

  const contextValue = useMemo(() => ({ config: state, updateConfig }), [state, updateConfig])

  return (
    <ConfigContext.Provider value={contextValue}>
      {children}
    </ConfigContext.Provider>
  )
}

export function useSiteConfig(): SiteConfig {
  const ctx = use(ConfigContext)
  if (!ctx) throw new Error('useSiteConfig must be used inside <ConfigProvider>')
  return ctx.config
}

// Permite reflejar de inmediato en el sitio los cambios guardados desde el
// editor inline, sin esperar a un refresh de la página (revalidatePath solo
// afecta al próximo request server-side).
export function useUpdateConfig() {
  const ctx = use(ConfigContext)
  if (!ctx) throw new Error('useUpdateConfig must be used inside <ConfigProvider>')
  return ctx.updateConfig
}
