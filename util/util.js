/*
 * @Author: gaiwa gaiwa@163.com
 * @Date: 2023-09-27 15:39:21
 * @LastEditors: Gaiwa 13012265332@163.com
 * @LastEditTime: 2023-10-06 21:44:53
 * @FilePath: \express\myBlog\util\util.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const path = require('path')
const fs = require('fs').promises
const NodeRSA = require('node-rsa')
const { priKeyPath, pubKeyPath } = require('../config')

// generateKeys()
async function generateKeys() {
	const newkey = new NodeRSA({ b: 512 })
	newkey.setOptions({ encryptionScheme: 'pkcs1' })
	let public_key = newkey.exportKey('pkcs8-public')
	let private_key = newkey.exportKey('pkcs8-private')

	await fs.writeFile(priKeyPath, private_key)
	await fs.writeFile(pubKeyPath, public_key)
}

async function encrypt(plain) {
	// 读取密钥 公钥
	let public_key = await fs.readFile(pubKeyPath, 'utf8')
	const nodersa = new NodeRSA(public_key)
	// 设置密钥类型
	nodersa.setOptions({ encryptionScheme: 'pkcs1' })
	// 调用加密方法
	const encrypted = nodersa.encrypt(plain, 'base64')
	return encrypted
}

async function decrypt(cipher) {
	let private_key = await fs.readFile(priKeyPath, 'utf8')
	let prikey = new NodeRSA(private_key)
	prikey.setOptions({ encryptionScheme: 'pkcs1' })
	return prikey.decrypt(cipher, 'utf8')
}

module.exports = {
	encrypt, decrypt, generateKeys
}