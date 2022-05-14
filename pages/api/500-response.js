export default function handler(req, res) {
  res
    .status(500)
    .json({ message: "A 500 status code was returned with this message" })
}
