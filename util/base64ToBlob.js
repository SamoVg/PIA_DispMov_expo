export function base64ToBlob(base64, mime = "image/jpeg") {
  const byteCharacters = atob(base64.split(",")[1]); // Quitar el encabezado 'data:image/...'
  const byteNumbers = Array.from(byteCharacters, c => c.charCodeAt(0));
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: mime });
}

