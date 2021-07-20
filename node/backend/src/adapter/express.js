export default function (fn) {
  return async function (req, res) {
    const { params, body, query } = req;
    const obj = await fn({ params, body, query });
    res.json(obj);
  };
}
