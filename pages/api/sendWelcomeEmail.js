export default function handler(req, res) {
  const { event } = req.body
  res.status(200).json({ name: event.name })
}
