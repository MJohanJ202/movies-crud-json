import { app } from './app.js'

const PORT = process.env['PORT'] ?? 3000
const HOST = process.env['HOST'] ?? 'localhost'

app.listen(PORT, () => {
  console.log(`server listening on port http://${HOST}:${PORT}`)
})
