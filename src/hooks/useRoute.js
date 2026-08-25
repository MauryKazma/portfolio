import { useEffect, useState } from "react"
import { parsePath } from "../utils/route"

export function useRoute() {
  const [route, setRoute] = useState(() => parsePath())

  useEffect(() => {
    const sync = () => setRoute(parsePath())
    window.addEventListener("popstate", sync)
    window.addEventListener("app:route", sync)
    return () => {
      window.removeEventListener("popstate", sync)
      window.removeEventListener("app:route", sync)
    }
  }, [])

  return route
}
