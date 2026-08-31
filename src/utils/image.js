export function readImageFile(file, max = 1024, quality = 0.72) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const blobUrl = URL.createObjectURL(file)
    img.onload = () => {
      const scale = Math.min(1, max / Math.max(img.width, img.height))
      const canvas = document.createElement("canvas")
      canvas.width = Math.max(1, Math.round(img.width * scale))
      canvas.height = Math.max(1, Math.round(img.height * scale))
      canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height)
      URL.revokeObjectURL(blobUrl)
      const webp = canvas.toDataURL("image/webp", quality)
      resolve(webp.startsWith("data:image/webp") ? webp : canvas.toDataURL("image/jpeg", quality))
    }
    img.onerror = () => {
      URL.revokeObjectURL(blobUrl)
      reject(new Error("Immagine non valida"))
    }
    img.src = blobUrl
  })
}

export function isPlaceholderImage(src) {
  const value = String(src ?? "")
  return !value.trim() || /\/work-(identita|editoria|comunicazione)\.svg$/.test(value)
}

export function rasterWebpSrc(src) {
  const value = String(src ?? "").trim()
  if (!value || value.startsWith("data:") || /\.svg($|\?)/i.test(value) || /\.webp($|\?)/i.test(value)) {
    return ""
  }
  const next = value.replace(/\.(jpe?g|png)($|\?)/i, ".webp$2")
  return next === value ? "" : next
}
