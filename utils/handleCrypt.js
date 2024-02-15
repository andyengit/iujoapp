import bcrypt from "bcrypt"

export const hashPassword = async (password) => {
  try {
    let salt = await bcrypt.genSalt(10)
    let hash = await bcrypt.hash(password, salt)
    return hash

  } catch (err) {
    return false
  }
}

export const comparePassword = async (password, hash) => {
  try {
    let result = await bcrypt.compare(password, hash)
    return result
  } catch (err) {
    console.log(err)
    return false
  }
}
