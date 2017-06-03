
const defaultSettings = {
  email: {
    smtpConfig: {
      // pool: true,
      host: 'smtp.126.com',
      port: 994,
      secure: true, // use TLS
      auth: {
        user: 'user@126.com',
        pass: 'pass'
      }
    },
    sender: 'user@126.com',
    receivers: []
  }
}

module.exports = defaultSettings;