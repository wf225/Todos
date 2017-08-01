
const defaultSettings = {
  email: {
    smtpConfig: {
      // pool: true,
      host: 'smtp.126.com',
      port: 994,
      secure: true, // use TLS
      auth: {
        user: 'wf225@126.com',
        pass: 'Wf200808'
      }
    },
    sender: 'wf225@126.com',
    receivers: []
  }
}

module.exports = defaultSettings;