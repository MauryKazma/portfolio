import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react"
import {
  clampSkillPercent,
  cloneSite,
  emptySkillTool,
  hydrateSite,
  SITE_CONTENT_REVISION,
} from "../data/siteDefault"
import { siteStorage } from "../data/siteStorage"
import { EDITOR_GRANTED, isEditorSession } from "../utils/editorSession"

const SiteContext = createContext(null)

function uniqueTag(list, label) {
  const next = label.trim()
  if (!next) return list
  if (list.some((item) => item.toLowerCase() === next.toLowerCase())) return list
  return [...list, next]
}

export function SiteContentProvider({ children }) {
  const [data, setData] = useState(() =>
    hydrateSite(isEditorSession() ? siteStorage.load() : null)
  )
  const [draft, setDraft] = useState(null)
  const [status, setStatus] = useState("")
  const [dialog, setDialog] = useState(null)
  const savedMessageTimer = useRef(null)

  const editing = draft !== null
  const display = draft ?? data
  const dirty = editing && JSON.stringify(draft) !== JSON.stringify(data)
  const dataRef = useRef(data)
  dataRef.current = data

  useEffect(() => {
    if (!isEditorSession()) return
    const loaded = siteStorage.load()
    if (!loaded || loaded.contentRevision === SITE_CONTENT_REVISION) return
    siteStorage.save(data)
  }, [data])

  useEffect(() => {
    const onGrant = () => {
      setDraft(cloneSite(dataRef.current))
      setStatus("")
    }
    window.addEventListener(EDITOR_GRANTED, onGrant)
    return () => window.removeEventListener(EDITOR_GRANTED, onGrant)
  }, [])

  const patch = useCallback(
    (updater) => {
      setDraft((current) => {
        const base = current ?? cloneSite(data)
        return updater(cloneSite(base))
      })
      setStatus("")
    },
    [data]
  )

  const startEdit = useCallback(() => {
    setDraft(cloneSite(dataRef.current))
    setStatus("")
  }, [])

  const cancelEdit = useCallback(() => {
    setDraft(null)
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
      message: "Se annulli, le modifiche ai testi e ai tag andranno perse. Vuoi continuare?",
      confirmLabel: "Scarta modifiche",
      onConfirm: cancelEdit,
    })
  }, [cancelEdit, dirty])

  const save = useCallback(() => {
    if (!draft) return false
    const saved = cloneSite(draft)
    setData(saved)
    if (isEditorSession()) siteStorage.save(saved)
    setDraft(null)
    setStatus("saved")
    clearTimeout(savedMessageTimer.current)
    savedMessageTimer.current = setTimeout(() => setStatus(""), 4000)
    return true
  }, [draft])

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

  const guardNavigation = useCallback(
    (proceed) => {
      if (!dirty) {
        proceed()
        return
      }
      setDialog({
        title: "Modifiche non salvate",
        message: "Stai lasciando la modifica dei testi. Le modifiche non salvate andranno perse.",
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
      display,
      editing,
      dirty,
      status,
      dialog,
      setDialog,
      startEdit,
      requestCancel,
      save,
      guardNavigation,
      setLogo(value) {
        patch((next) => {
          next.logo = value
          return next
        })
      },
      setSkipLink(value) {
        patch((next) => {
          next.skipLink = value
          return next
        })
      },
      setNavLabel(id, value) {
        patch((next) => {
          next.nav = next.nav.map((item) => (item.id === id ? { ...item, label: value } : item))
          return next
        })
      },
      setHero(field, value) {
        patch((next) => {
          next.hero[field] = value
          return next
        })
      },
      persistPortrait(value) {
        setDraft((current) => {
          if (!current) return current
          const next = cloneSite(current)
          next.hero.portraitSrc = value
          return next
        })
        if (!isEditorSession()) return
        setData((current) => {
          const next = cloneSite(current)
          next.hero.portraitSrc = value
          siteStorage.save(next)
          return next
        })
      },
      setTickerItem(index, value) {
        patch((next) => {
          if (!next.ticker) next.ticker = { items: [] }
          next.ticker.items = next.ticker.items.map((item, i) => (i === index ? value : item))
          return next
        })
      },
      addTickerItem(label) {
        const nextLabel = label.trim()
        if (!nextLabel) return
        patch((next) => {
          if (!next.ticker) next.ticker = { items: [] }
          next.ticker.items = [...next.ticker.items, nextLabel]
          return next
        })
      },
      removeTickerItem(index) {
        patch((next) => {
          if (!next.ticker) next.ticker = { items: [] }
          next.ticker.items = next.ticker.items.filter((_, i) => i !== index)
          return next
        })
      },
      setChiSono(field, value) {
        patch((next) => {
          next.chiSono[field] = value
          return next
        })
      },
      setNote(index, field, value) {
        patch((next) => {
          next.chiSono.notes = (next.chiSono.notes ?? []).map((item, i) =>
            i === index ? { ...item, [field]: value } : item
          )
          return next
        })
      },
      setToolkitTag(index, value) {
        patch((next) => {
          next.chiSono.toolkit = next.chiSono.toolkit.map((item, i) => (i === index ? value : item))
          return next
        })
      },
      addToolkitTag(label) {
        patch((next) => {
          next.chiSono.toolkit = uniqueTag(next.chiSono.toolkit, label)
          return next
        })
      },
      removeToolkitTag(index) {
        patch((next) => {
          next.chiSono.toolkit = next.chiSono.toolkit.filter((_, i) => i !== index)
          return next
        })
      },
      setSkills(field, value) {
        patch((next) => {
          if (!next.skills) next.skills = { disciplines: [], tools: [] }
          next.skills[field] = value
          return next
        })
      },
      setSkillTool(id, field, value) {
        patch((next) => {
          if (!next.skills) next.skills = { disciplines: [], tools: [] }
          next.skills.tools = (next.skills.tools ?? []).map((item) =>
            item.id === id
              ? {
                  ...item,
                  [field]:
                    field === "level"
                      ? clampSkillPercent(value)
                      : field === "mark"
                        ? String(value).slice(0, 3)
                        : value,
                }
              : item
          )
          return next
        })
      },
      addSkillTool() {
        patch((next) => {
          if (!next.skills) next.skills = { disciplines: [], tools: [] }
          next.skills.tools = [...(next.skills.tools ?? []), emptySkillTool()]
          return next
        })
      },
      removeSkillTool(id) {
        patch((next) => {
          if (!next.skills) return next
          next.skills.tools = (next.skills.tools ?? []).filter((item) => item.id !== id)
          return next
        })
      },
      setSkillTrait(index, value) {
        patch((next) => {
          if (!next.skills) next.skills = { disciplines: [], tools: [], traits: [] }
          next.skills.traits = (next.skills.traits ?? []).map((item, i) =>
            i === index ? value : item
          )
          return next
        })
      },
      addSkillTrait(label) {
        patch((next) => {
          if (!next.skills) next.skills = { disciplines: [], tools: [], traits: [] }
          next.skills.traits = uniqueTag(next.skills.traits ?? [], label)
          return next
        })
      },
      removeSkillTrait(index) {
        patch((next) => {
          if (!next.skills) return next
          next.skills.traits = (next.skills.traits ?? []).filter((_, i) => i !== index)
          return next
        })
      },
      setSkillUseful(index, value) {
        patch((next) => {
          if (!next.skills) next.skills = { disciplines: [], tools: [], useful: [] }
          next.skills.useful = (next.skills.useful ?? []).map((item, i) =>
            i === index ? value : item
          )
          return next
        })
      },
      addSkillUseful(label) {
        patch((next) => {
          if (!next.skills) next.skills = { disciplines: [], tools: [], useful: [] }
          next.skills.useful = uniqueTag(next.skills.useful ?? [], label)
          return next
        })
      },
      removeSkillUseful(index) {
        patch((next) => {
          if (!next.skills) return next
          next.skills.useful = (next.skills.useful ?? []).filter((_, i) => i !== index)
          return next
        })
      },
      setSkillDiscipline(id, field, value) {
        patch((next) => {
          if (!next.skills) next.skills = { disciplines: [], tools: [] }
          next.skills.disciplines = (next.skills.disciplines ?? []).map((item) =>
            item.id === id ? { ...item, [field]: value } : item
          )
          return next
        })
      },
      setSkillDisciplineTool(id, index, value) {
        patch((next) => {
          if (!next.skills?.disciplines) return next
          next.skills.disciplines = next.skills.disciplines.map((item) => {
            if (item.id !== id) return item
            return {
              ...item,
              tools: (item.tools ?? []).map((tool, i) => (i === index ? value : tool)),
            }
          })
          return next
        })
      },
      addSkillDisciplineTool(id, label) {
        patch((next) => {
          if (!next.skills?.disciplines) return next
          next.skills.disciplines = next.skills.disciplines.map((item) => {
            if (item.id !== id) return item
            return { ...item, tools: uniqueTag(item.tools ?? [], label) }
          })
          return next
        })
      },
      removeSkillDisciplineTool(id, index) {
        patch((next) => {
          if (!next.skills?.disciplines) return next
          next.skills.disciplines = next.skills.disciplines.map((item) => {
            if (item.id !== id) return item
            return { ...item, tools: (item.tools ?? []).filter((_, i) => i !== index) }
          })
          return next
        })
      },
      setLavori(field, value) {
        patch((next) => {
          next.lavori[field] = value
          return next
        })
      },
      setProject(id, field, value) {
        patch((next) => {
          next.lavori.projects = next.lavori.projects.map((item) =>
            item.id === id ? { ...item, [field]: value } : item
          )
          return next
        })
      },
      setProjectTag(id, index, value) {
        patch((next) => {
          next.lavori.projects = next.lavori.projects.map((item) => {
            if (item.id !== id) return item
            return {
              ...item,
              tags: item.tags.map((tag, i) => (i === index ? value : tag)),
            }
          })
          return next
        })
      },
      addProjectTag(id, label) {
        patch((next) => {
          next.lavori.projects = next.lavori.projects.map((item) => {
            if (item.id !== id) return item
            return { ...item, tags: uniqueTag(item.tags, label) }
          })
          return next
        })
      },
      removeProjectTag(id, index) {
        patch((next) => {
          next.lavori.projects = next.lavori.projects.map((item) => {
            if (item.id !== id) return item
            return { ...item, tags: item.tags.filter((_, i) => i !== index) }
          })
          return next
        })
      },
      setProjectGalleryItem(id, index, field, value) {
        patch((next) => {
          next.lavori.projects = next.lavori.projects.map((item) => {
            if (item.id !== id) return item
            const gallery = Array.isArray(item.gallery) ? [...item.gallery] : []
            gallery[index] = { src: "", caption: "", ...gallery[index], [field]: value }
            return { ...item, gallery }
          })
          return next
        })
      },
      setServizi(field, value) {
        patch((next) => {
          next.servizi[field] = value
          return next
        })
      },
      setPhase(id, field, value) {
        patch((next) => {
          next.servizi.phases = next.servizi.phases.map((item) =>
            item.id === id ? { ...item, [field]: value } : item
          )
          return next
        })
      },
      setCv(field, value) {
        patch((next) => {
          next.cv[field] = value
          return next
        })
      },
      setFooter(field, value) {
        patch((next) => {
          next.footer[field] = value
          return next
        })
      },
      setMenuLabel(id, value) {
        patch((next) => {
          next.footer.menu = next.footer.menu.map((item) =>
            item.id === id ? { ...item, label: value } : item
          )
          return next
        })
      },
      setSocial(index, field, value) {
        patch((next) => {
          next.footer.social = next.footer.social.map((item, i) =>
            i === index ? { ...item, [field]: value } : item
          )
          return next
        })
      },
    }),
    [dialog, dirty, display, editing, guardNavigation, patch, requestCancel, save, startEdit, status]
  )

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>
}

export function useSite() {
  const ctx = useContext(SiteContext)
  if (!ctx) throw new Error("useSite deve essere usato dentro SiteContentProvider")
  return ctx
}
