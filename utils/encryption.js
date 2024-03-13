const crypto = require("crypto");

const encryptData = (data, key) => {
  const cipher = crypto.createCipher("aes-256-cbc", key);
  let encrypted = cipher.update(data, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
};

const decryptData = (encryptedData, key) => {
  const decipher = crypto.createDecipher("aes-256-cbc", key);
  let decrypted = decipher.update(encryptedData, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};

module.exports = { encryptData, decryptData };
