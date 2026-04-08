let ctx: CanvasRenderingContext2D | null = null

function getCtx(): CanvasRenderingContext2D | null {
  if (!ctx) {
    const canvas = document.createElement('canvas')
    canvas.width = canvas.height = 1
    ctx = canvas.getContext('2d')
  }
  return ctx
}

export function resolveColor(cssVar: string): string {
  const match = cssVar.match(/var\((--[\w-]+)\)/)
  if (!match) return cssVar
  const raw = getComputedStyle(document.documentElement).getPropertyValue(match[1]).trim()
  const context = getCtx()
  if (!context) return raw
  context.fillStyle = raw
  return context.fillStyle // browser normalises any format (oklch, hsl, etc.) to hex
}
