import { subtle } from "uncrypto"

const stringToArrayBuffer = (str: string) => {
  const enc = new TextEncoder()
  return enc.encode(str)
}

const arrayBufferToHex = (buffer: ArrayBuffer) => {
  const byteArray = new Uint8Array(buffer)
  const hexParts = []
  for (let i = 0; i < byteArray.length; i++) {
    const hex = byteArray[i].toString(16)
    const paddedHex = ("00" + hex).slice(-2)
    hexParts.push(paddedHex)
  }
  return hexParts.join("")
}

export const hmac = async (input: string, secret: string) => {
  const key = await subtle.importKey(
    "raw",
    stringToArrayBuffer(secret),
    {
      name: "HMAC",
      hash: "SHA-512",
    },
    false,
    ["sign", "verify"]
  )

  const cypher = await subtle.sign("HMAC", key, stringToArrayBuffer(input))
  return arrayBufferToHex(cypher)
}
