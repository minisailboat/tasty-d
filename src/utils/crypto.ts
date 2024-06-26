import CryptoJS from 'crypto-js'

const key = CryptoJS.enc.Utf8.parse(import.meta.env.VITE_CRYPTO_KEY)
const iv = CryptoJS.enc.Utf8.parse(import.meta.env.VITE_CRYPTO_IV)

/**
 * 加密字符串
 * @param cipherText
 * @returns
 */
export function cryptoEncode(cipherText: string): string {
	const message = CryptoJS.enc.Utf8.parse(cipherText)
	const encryptedData = CryptoJS.AES.encrypt(message, key, {
		mode: CryptoJS.mode.ECB,
		padding: CryptoJS.pad.Pkcs7,
		iv
	}).toString()
	return encryptedData
}

/**
 * 解密字符串
 * @param cipherText
 * @returns
 */
export function cryptoDecode(cipherText: string): string {
	// 解密base64类型的密文
	const encryptedHexStr = CryptoJS.enc.Base64.parse(cipherText)
	const message = CryptoJS.enc.Base64.stringify(encryptedHexStr)

	// aes解密
	const decryptedData = CryptoJS.AES.decrypt(message, key, {
		mode: CryptoJS.mode.ECB,
		padding: CryptoJS.pad.Pkcs7,
		iv
	}).toString(CryptoJS.enc.Utf8)
	return decryptedData.toString()
}
