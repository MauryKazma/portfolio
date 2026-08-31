import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react"
import { CV_CONTENT_REVISION, CV_DEFAULT } from "../data/cvDefault"
import { cvStorage } from "../data/cvStorage"
import { EDITOR_GRANTED, isEditorSession } from "../utils/editorSession"
import {
  byOrder,
  cloneCV,
  emptyEducation,
  emptyExperience,
  emptyLanguage,
  emptySkillCategory,
  emptySkillItem,
  hydrateCV,
  moveItem,
  reindex,
  uniqueTag,
  validateCV,
} from "../utils/cv"

const CVContext = createContext(null)

function insertFirst(list, item) {
  return reindex([item, ...list])
}

export function CVProvider({ children }) {
  const [data, setData] = useState(() =>
    isEditorSession() ? hydrateCV(cvStorage.load(), CV_DEFAULT) : cloneCV(CV_DEFAULT)
  )
  const [draft, setDraft] = useState(null)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState("")
  const [dialog, setDialog] = useState(null)
  const [expanded, setExpanded] = useState(false)
  const savedMessageTimer = useRef(null)

  const editing = draft !== null
  const display = draft ?? data
  const dirty = editing && JSON.stringify(draft) !== JSON.stringify(data)
  const dataRef = useRef(data)
  dataRef.current = data

  const patch = useCallback((updater) => {
    setDraft((current) => {
      const base = current ?? cloneCV(data)
      return updater(cloneCV(base))
    })
    setStatus("")
  }, [data])

  const expand = useCallback(() => {
    setExpanded(true)
  }, [])

  const collapse = useCallback(() => {
    if (draft !== null) return
    setExpanded(false)
  }, [draft])

  const startEdit = useCallback(() => {
    setExpanded(true)
    setDraft(cloneCV(dataRef.current))
    setErrors({})
    setStatus("")
  }, [])

  const cancelEdit = useCallback(() => {
    setDraft(null)
    setErrors({})
    setStatus("")
    setDialog(null)
  }, [])

  const requestCancel = useCallback(() => {
    if (!dirty) {
      cancelEdit()
      return
    }
    setDialog({
      title: "Modifiche non salvate",
      message: "Se annulli, le modifiche non salvate andranno perse. Vuoi continuare?",
      confirmLabel: "Scarta modifiche",
      onConfirm: cancelEdit,
    })
  }, [cancelEdit, dirty])

  const save = useCallback(() => {
    if (!draft) return false
    const nextErrors = validateCV(draft)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      setStatus("error")
      requestAnimationFrame(() => {
        document.querySelector("#curriculum [aria-invalid='true']")?.focus()
      })
      return false
    }
    const saved = cloneCV(draft)
    saved.contentRevision = CV_CONTENT_REVISION
    if (isEditorSession()) {
      const result = cvStorage.save(saved)
      if (!result.ok) {
        setStatus(result.quota ? "quota" : "persist-error")
        return false
      }
    }
    setData(saved)
    setDraft(null)
    setStatus("saved")
    clearTimeout(savedMessageTimer.current)
    savedMessageTimer.current = setTimeout(() => setStatus(""), 4000)
    return true
  }, [draft])

  const restoreDefaults = useCallback(() => {
    const restored = cloneCV(CV_DEFAULT)
    setDraft(restored)
    setErrors({})
    setStatus("")
    setDialog(null)
  }, [])

  const requestRestore = useCallback(() => {
    setDialog({
      title: "Ripristinare il CV originale?",
      message:
        "I contenuti torneranno ai dati iniziali del curriculum. Potrai comunque annullare prima di salvare.",
      confirmLabel: "Ripristina",
      onConfirm: restoreDefaults,
    })
  }, [restoreDefaults])

  useEffect(() => {
    const onBeforeUnload = (event) => {
      if (!dirty) return
      event.preventDefault()
      event.returnValue = ""
    }
    window.addEventListener("beforeunload", onBeforeUnload)
    return () => window.removeEventListener("beforeunload", onBeforeUnload)
  }, [dirty])

  useEffect(() => () => clearTimeout(savedMessageTimer.current), [])

  useEffect(() => {
    if (!isEditorSession()) return
    const loaded = cvStorage.load()
    if (!loaded || loaded.contentRevision === CV_CONTENT_REVISION) return
    const payload = cloneCV(data)
    payload.contentRevision = CV_CONTENT_REVISION
    cvStorage.save(payload)
  }, [data])

  useEffect(() => {
    const onGrant = () => {
      const loaded = hydrateCV(cvStorage.load(), CV_DEFAULT)
      setData(loaded)
      dataRef.current = loaded
    }
    window.addEventListener(EDITOR_GRANTED, onGrant)
    return () => window.removeEventListener(EDITOR_GRANTED, onGrant)
  }, [])

  const guardNavigation = useCallback(
    (proceed) => {
      if (!dirty) {
        proceed()
        return
      }
      setDialog({
        title: "Modifiche non salvate",
        message: "Stai uscendo dalla modifica del CV. Le modifiche non salvate andranno perse.",
        confirmLabel: "Esci senza salvare",
        onConfirm: () => {
          cancelEdit()
          proceed()
        },
      })
    },
    [cancelEdit, dirty]
  )

  const value = useMemo(
    () => ({
      data,
      draft,
      display,
      editing,
      dirty,
      errors,
      status,
      dialog,
      expanded,
      setDialog,
      expand,
      collapse,
      startEdit,
      requestCancel,
      save,
      requestRestore,
      guardNavigation,
      updatePersonal(field, value) {
        patch((next) => {
          next.personalInfo[field] = value
          return next
        })
      },
      updatePresentation(value) {
        patch((next) => {
          next.presentation = value
          return next
        })
      },
      updateSimple(field, value) {
        patch((next) => {
          next[field] = value
          return next
        })
      },
      addExperience() {
        patch((next) => {
          next.experiences = insertFirst(byOrder(next.experiences), emptyExperience())
          return next
        })
      },
      updateExperience(id, field, value) {
        patch((next) => {
          next.experiences = next.experiences.map((item) => {
            if (item.id !== id) return item
            const updated = { ...item, [field]: value }
            if (field === "current" && value) updated.endDate = ""
            return updated
          })
          return next
        })
      },
      removeExperience(id) {
        patch((next) => {
          next.experiences = reindex(next.experiences.filter((item) => item.id !== id))
          return next
        })
      },
      moveExperience(from, to) {
        patch((next) => {
          next.experiences = moveItem(byOrder(next.experiences), from, to)
          return next
        })
      },
      setExperienceTag(id, index, value) {
        patch((next) => {
          next.experiences = next.experiences.map((item) => {
            if (item.id !== id) return item
            const tags = [...(item.tags ?? [])]
            tags[index] = value
            return { ...item, tags }
          })
          return next
        })
      },
      addExperienceTag(id, label) {
        patch((next) => {
          next.experiences = next.experiences.map((item) =>
            item.id === id ? { ...item, tags: uniqueTag(item.tags ?? [], label) } : item
          )
          return next
        })
      },
      removeExperienceTag(id, index) {
        patch((next) => {
          next.experiences = next.experiences.map((item) =>
            item.id === id
              ? { ...item, tags: (item.tags ?? []).filter((_, i) => i !== index) }
              : item
          )
          return next
        })
      },
      addEducation() {
        patch((next) => {
          next.education = insertFirst(byOrder(next.education), emptyEducation())
          return next
        })
      },
      updateEducation(id, field, value) {
        patch((next) => {
          next.education = next.education.map((item) =>
            item.id === id ? { ...item, [field]: value } : item
          )
          return next
        })
      },
      removeEducation(id) {
        patch((next) => {
          next.education = reindex(next.education.filter((item) => item.id !== id))
          return next
        })
      },
      moveEducation(from, to) {
        patch((next) => {
          next.education = moveItem(byOrder(next.education), from, to)
          return next
        })
      },
      setEducationTag(id, index, value) {
        patch((next) => {
          next.education = next.education.map((item) => {
            if (item.id !== id) return item
            const tags = [...(item.tags ?? [])]
            tags[index] = value
            return { ...item, tags }
          })
          return next
        })
      },
      addEducationTag(id, label) {
        patch((next) => {
          next.education = next.education.map((item) =>
            item.id === id ? { ...item, tags: uniqueTag(item.tags ?? [], label) } : item
          )
          return next
        })
      },
      removeEducationTag(id, index) {
        patch((next) => {
          next.education = next.education.map((item) =>
            item.id === id
              ? { ...item, tags: (item.tags ?? []).filter((_, i) => i !== index) }
              : item
          )
          return next
        })
      },
      addLanguage() {
        patch((next) => {
          next.languages = insertFirst(byOrder(next.languages), emptyLanguage())
          return next
        })
      },
      updateLanguage(id, field, value) {
        patch((next) => {
          next.languages = next.languages.map((item) =>
            item.id === id ? { ...item, [field]: value } : item
          )
          return next
        })
      },
      removeLanguage(id) {
        patch((next) => {
          next.languages = reindex(next.languages.filter((item) => item.id !== id))
          return next
        })
      },
      moveLanguage(from, to) {
        patch((next) => {
          next.languages = moveItem(byOrder(next.languages), from, to)
          return next
        })
      },
      addSkillCategory() {
        patch((next) => {
          next.digitalSkills = insertFirst(byOrder(next.digitalSkills), emptySkillCategory())
          return next
        })
      },
      updateSkillCategory(id, field, value) {
        patch((next) => {
          next.digitalSkills = next.digitalSkills.map((item) =>
            item.id === id ? { ...item, [field]: value } : item
          )
          return next
        })
      },
      removeSkillCategory(id) {
        patch((next) => {
          next.digitalSkills = reindex(next.digitalSkills.filter((item) => item.id !== id))
          return next
        })
      },
      moveSkillCategory(from, to) {
        patch((next) => {
          next.digitalSkills = moveItem(byOrder(next.digitalSkills), from, to)
          return next
        })
      },
      addSkillItem(categoryId) {
        patch((next) => {
          next.digitalSkills = next.digitalSkills.map((category) => {
            if (category.id !== categoryId) return category
            return {
              ...category,
              items: insertFirst(byOrder(category.items), emptySkillItem()),
            }
          })
          return next
        })
      },
      updateSkillItem(categoryId, itemId, value) {
        patch((next) => {
          next.digitalSkills = next.digitalSkills.map((category) => {
            if (category.id !== categoryId) return category
            return {
              ...category,
              items: category.items.map((item) =>
                item.id === itemId ? { ...item, name: value } : item
              ),
            }
          })
          return next
        })
      },
      removeSkillItem(categoryId, itemId) {
        patch((next) => {
          next.digitalSkills = next.digitalSkills.map((category) => {
            if (category.id !== categoryId) return category
            return {
              ...category,
              items: reindex(category.items.filter((item) => item.id !== itemId)),
            }
          })
          return next
        })
      },
      moveSkillItem(categoryId, from, to) {
        patch((next) => {
          next.digitalSkills = next.digitalSkills.map((category) => {
            if (category.id !== categoryId) return category
            return { ...category, items: moveItem(byOrder(category.items), from, to) }
          })
          return next
        })
      },
      addInterpersonal() {
        patch((next) => {
          next.interpersonalSkills = insertFirst(
            byOrder(next.interpersonalSkills),
            emptySkillCategory()
          )
          return next
        })
      },
      updateInterpersonal(id, field, value) {
        patch((next) => {
          next.interpersonalSkills = (next.interpersonalSkills ?? []).map((item) =>
            item.id === id ? { ...item, [field]: value } : item
          )
          return next
        })
      },
      removeInterpersonal(id) {
        patch((next) => {
          next.interpersonalSkills = reindex(
            (next.interpersonalSkills ?? []).filter((item) => item.id !== id)
          )
          return next
        })
      },
      moveInterpersonal(from, to) {
        patch((next) => {
          next.interpersonalSkills = moveItem(byOrder(next.interpersonalSkills), from, to)
          return next
        })
      },
    }),
    [
      data,
      dialog,
      dirty,
      display,
      draft,
      editing,
      errors,
      expanded,
      expand,
      collapse,
      guardNavigation,
      patch,
      requestCancel,
      requestRestore,
      save,
      startEdit,
      status,
    ]
  )

  return <CVContext.Provider value={value}>{children}</CVContext.Provider>
}

export function useCV() {
  const ctx = useContext(CVContext)
  if (!ctx) throw new Error("useCV deve essere usato dentro CVProvider")
  return ctx
}
