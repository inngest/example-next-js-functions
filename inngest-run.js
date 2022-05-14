class NextRequest {
  body = {}
  query = {}
  cookies = {}
  constructor(eventPayload) {
    this.body = eventPayload
  }
}

class NextResponse {
  statusCode = 200
  body = {}

  status(code) {
    this.statusCode = code
    return this
  }
  json(body) {
    this.body = body
    return this
  }
  send(body) {
    this.body = body
    return this
  }
  redirect() {
    throw new Error("redirect is not supported in asynchronous functions")
  }
  unstable_revalidate() {
    throw new Error(
      "unstable_revalidate is not supported in asynchronous functions"
    )
  }
}

function handleError(error, code) {
  console.log(JSON.stringify({ error: error }))
  process.exit(code)
}

async function main() {
  const payload = process.argv.pop()
  const functionName = process.argv.pop()
  const config = JSON.parse(payload)
  const eventPayload = config.baggage?.WorkspaceEvent?.Event

  // We use the next.js build output dir
  const fnExports = require(`./.next/server/${functionName}`)
  const fn = fnExports.default

  const req = new NextRequest(eventPayload)
  const res = new NextResponse()

  try {
    await fn(req, res)
  } catch (err) {
    return handleError(err && err.toString(), 1)
  }
  if (res.statusCode !== 200) {
    return handleError(res.body, res.statusCode)
  }

  console.log(JSON.stringify(res.body))
}

main()
