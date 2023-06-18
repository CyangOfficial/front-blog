import CryptoJS from 'crypto-js'

// 十六位十六进制数作为密钥
// const SECRET_KEY = CryptoJS.enc.Utf8.parse('3333e6e143439161')
// 十六位十六进制数作为密钥偏移量
// const SECRET_IV = CryptoJS.enc.Utf8.parse('e3bbe7e3ba84431a')

// 加密
const encrypt = (data: string) => {
  try {
    // 如果是对象需要转换成string
    if (typeof data === 'object') {
      data = JSON.stringify(data)
    }
  } catch (error) {
    console.log('encrypt error:', error)
  }
  const dataHex = CryptoJS.enc.Utf8.parse(data)
  const strData = CryptoJS.AES.encrypt(dataHex, 'secretKey').toString()
  return strData
}

// 解密
const decrypt = (data: string) => {
  // const encryptedHexStr = CryptoJS.enc.Hex.parse(data)
  const decryptedText = CryptoJS.AES.decrypt(data, 'secretKey')
  const decryptedString = decryptedText?.toString(CryptoJS.enc.Utf8)
  return decryptedString
}

// 设置localstorage
export const setStorage = (key: string, value: any, encrypted = false) => {
  try {
    if (encrypted) {
      const encryptedData = encrypt(value)
      localStorage.setItem(key, encryptedData)
      return
    }
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.log('set storage error:', error)
  }
}

export const getStorage = (key: string, decrypted = false) => {
  const itemStorge = localStorage.getItem(key)
  if (itemStorge) {
    if (decrypted) {
      try {
        // const decryptedData = CryptoJS.AES.decrypt(itemStorge, 'secretKey')
        const decryptedString = decrypt(itemStorge)
        return decryptedString
      } catch (error) {
        console.log('encrypted error:', error)
      }
      return
    }
    let data = null
    try {
      data = JSON.parse(localStorage.getItem(key)!)
    } catch (error) {
      console.log('getItem error:', error)
    }
    return data
  }
}
