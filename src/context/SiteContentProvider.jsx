import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react"
import { cloneSite, hydrateSite, SITE_CONTENT_REVISION } from "../data/siteDefault"
import { siteStorage } from "../data/siteStorage"

const SiteContext = createContext(null)

function uniqueTag(list, label) {
  const next = label.trim()
  if (!next) return list
  if (list.some((item) => item.toLowerCase() === next.toLowerCase())) return list
  return [...list, next]
}

export function SiteContentProvider({ children }) {
  const [data, setData] = useState(() => hydrateSite(siteStorage.load()))
  const [draft, setDraft] = useState(null)
  const [status, setStatus] = useState("")
  const [dialog, setDialog] = useState(null)
  const savedMessageTimer = useRef(null)

  const editing = draft !== null
  const display = draft ?? data
  const dirty = editing && JSON.stringify(draft) !== JSON.stringify(data)

  useEffect(() => {
    const loaded = siteStorage.load()
    if (!loaded || loaded.contentRevision === SITE_CONTENT_REVISION) return
    siteStorage.save(data)
  }, [data])

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
    setDraft(cloneSite(data))
    setStatus("")
  }, [data])

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
    siteStorage.save(saved)
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
        setData((current) => {
          const next = cloneSite(current)
          next.hero.portraitSrc = value
          siteStorage.save(next)
          return next
        })
        setDraft((current) => {
          if (!current) return current
          const next = cloneSite(current)
          next.hero.portraitSrc = value
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
      setStat(index, field, value) {
        patch((next) => {
          next.chiSono.stats = next.chiSono.stats.map((item, i) =>
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
