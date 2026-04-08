const canvas = document.createElement('canvas')
canvas.width = canvas.height = 1
const ctx = canvas.getContext('2d')!

export function resolveColor(cssVar: string): string {
  const match = cssVar.match(/var\((--[\w-]+)\)/)
  if (!match) return cssVar
  const raw = getComputedStyle(document.documentElement).getPropertyValue(match[1]).trim()
  ctx.fillStyle = raw
  return ctx.fillStyle // browser normalises any format (oklch, hsl, etc.) to hex
}
