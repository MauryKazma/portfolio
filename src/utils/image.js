export function readImageFile(file, max = 1200, quality = 0.86) {
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
      resolve(canvas.toDataURL("image/jpeg", quality))
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
