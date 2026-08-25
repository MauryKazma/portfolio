import { useEffect, useState } from "react"

const STORAGE_KEY = "site-editor"

function readAllowed() {
  try {
    return (
      sessionStorage.getItem(STORAGE_KEY) === "1" ||
      new URLSearchParams(window.location.search).get("edit") === "1"
    )
  } catch {
    return false
  }
}

export function useEditorAccess() {
  const [allowed, setAllowed] = useState(readAllowed)

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("edit") !== "1") return
    try {
      sessionStorage.setItem(STORAGE_KEY, "1")
    } catch {
      /* ignore quota / private mode */
    }
    setAllowed(true)
  }, [])

  return allowed
}
