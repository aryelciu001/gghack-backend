const bcrypt = require('bcrypt')
const saltRounds = 10;

const encrypt = async (text) => {
  let _ = await bcrypt.hash(text, 10)
  return _
}

const checkEncryption = async (anotherText, correctText) => {
  return await bcrypt.compare(anotherText, correctText)
}

module.exports = ({ encrypt, checkEncryption })