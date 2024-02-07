import cros from 'cors'

export const handleCors = () => cros({
  origin: (origin, callback) => {
    const WHITE_LIST = [
      "http://localhost:8080",
      "https://fl0"
    ]
    const isAllowedOrigin = WHITE_LIST.includes(origin ?? '')
    // allow requests with no origin to go through
    if (!origin || isAllowedOrigin) return callback(null, true)
    return callback(new Error('Not allowed by CORS'))
  }
})
