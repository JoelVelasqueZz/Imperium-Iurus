  import GoldDivider from './GoldDivider'

  export default function SectionHeader({
    eyebrow,
    title,
    subtitle,
    invert = false,
  }: {
    eyebrow?: string
    title: string
    subtitle?: string
    invert?: boolean
  }) {
    return (
      <div className="mx-auto mb-12 max-w-3xl text-center">
        {eyebrow ? (
          <p className="mb-3 font-cinzel text-xs font-semibold uppercase tracking-[0.35em] text-gold">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="font-cinzel text-3xl font-bold tracking-wider text-gold md:text-4xl">{title}</h2>
        <GoldDivider />
        {subtitle ? (
          <p className={`font-inter text-base font-light leading-relaxed md:text-lg ${invert ? 'text-primary/70' : 'text-text-muted'}`}>
            {subtitle}
          </p>
        ) : null}
      </div>
    )
  }
