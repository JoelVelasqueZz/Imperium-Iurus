import SectionHeader from '@/components/ui/SectionHeader'
import { NOSOTROS } from '@/lib/constants'

export default function VisionSection() {
  return (
    <section className="bg-[#F5F3EE] px-4 py-24 text-center sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <SectionHeader title={NOSOTROS.vision.title} invert />
        <p className="text-lg font-light leading-8 text-primary/70">
          {NOSOTROS.vision.body}
        </p>
        <p className="mt-8 font-trajan text-2xl font-bold uppercase tracking-[0.1em] text-primary">
          {NOSOTROS.vision.tagline}
        </p>
      </div>
    </section>
  )
}