import { useState } from "react"
import { getLook, setLook } from "../looks/applyLook"

export default function LookSwitch() {
  const [look, setLookState] = useState(getLook)

  const choose = (next) => {
    setLook(next)
    setLookState(next)
  }

  return (
    <div className="look-switch" role="group" aria-label="Versione visiva del sito">
      <button type="button" aria-pressed={look === "clean"} onClick={() => choose("clean")}>
        Pulita
      </button>
      <button type="button" aria-pressed={look === "ink"} onClick={() => choose("ink")}>
        Precedente
      </button>
    </div>
  )
}
