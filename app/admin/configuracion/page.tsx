import { getSiteConfig } from '@/lib/config'
import ConfiguracionAdmin from './ConfiguracionAdmin'

export const dynamic = 'force-dynamic'

export default async function ConfiguracionPage() {
  const config = await getSiteConfig()
  return <ConfiguracionAdmin initialConfig={config} />
}
