import { ref, watchEffect } from 'vue'

type Theme = 'light' | 'dark' | 'system'

const systemQuery = window.matchMedia('(prefers-color-scheme: dark)')
const theme = ref<Theme>((localStorage.getItem('theme') as Theme) ?? 'system')

function applyTheme(t: Theme) {
  const isDark = t === 'dark' || (t === 'system' && systemQuery.matches)
  document.documentElement.classList.toggle('dark', isDark)
}

systemQuery.addEventListener('change', () => {
  if (theme.value === 'system') applyTheme('system')
})

watchEffect(() => {
  applyTheme(theme.value)
  if (theme.value === 'system') {
    localStorage.removeItem('theme')
  } else {
    localStorage.setItem('theme', theme.value)
  }
})

export function useTheme() {
  const isDark = () =>
    theme.value === 'dark' || (theme.value === 'system' && systemQuery.matches)

  function toggle() {
    theme.value = isDark() ? 'light' : 'dark'
  }

  function resetToSystem() {
    theme.value = 'system'
  }

  return { theme, isDark, toggle, resetToSystem }
}
