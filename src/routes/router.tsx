import {
  useEffect,
  useSyncExternalStore,
  type AnchorHTMLAttributes,
} from "react"

// shortcut: tiny history router for five static pages; switch to react-router if routes gain params or nesting.
function subscribe(callback: () => void) {
  window.addEventListener("popstate", callback)
  return () => window.removeEventListener("popstate", callback)
}

export function usePath() {
  return useSyncExternalStore(subscribe, () => window.location.pathname)
}

function scrollToTarget(hash: string) {
  const target = hash && document.getElementById(hash.slice(1))
  if (target) {
    target.scrollIntoView()
    return
  }
  window.scrollTo(0, 0)
  // Move focus to the new page so screen readers and keyboard users start at the top.
  document.getElementById("main")?.focus({ preventScroll: true })
}

export function navigate(to: string) {
  const url = new URL(to, window.location.href)
  window.history.pushState(null, "", url)
  window.dispatchEvent(new PopStateEvent("popstate"))
  requestAnimationFrame(() => scrollToTarget(url.hash))
}

/** Scrolls to the URL hash on first load, after the page has rendered. */
export function useInitialHashScroll() {
  useEffect(() => {
    if (window.location.hash) scrollToTarget(window.location.hash)
  }, [])
}

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }

export function Link({ href, onClick, ...props }: LinkProps) {
  return (
    <a
      href={href}
      {...props}
      onClick={(event) => {
        onClick?.(event)
        const modified =
          event.metaKey || event.ctrlKey || event.shiftKey || event.altKey
        if (event.defaultPrevented || event.button !== 0 || modified) return
        event.preventDefault()
        navigate(href)
      }}
    />
  )
}
