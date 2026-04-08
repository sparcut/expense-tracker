export function resolveColor(cssVar: string): string {
  const match = cssVar.match(/var\((--[\w-]+)\)/)
  if (!match) return cssVar
  return getComputedStyle(document.documentElement).getPropertyValue(match[1]).trim()
}
