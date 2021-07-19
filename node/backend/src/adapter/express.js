export default function (fn) {
  return async function (req, res) {
    const { params, body } = req;
    const obj = await fn({ params, body });
    res.json(obj);
  };
}
