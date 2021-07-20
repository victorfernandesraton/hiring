export default function (fn) {
  return async function (req, res) {
    const { params, body } = req;
    const obj = await fn({ params, body });
    res.json(obj);
  };
}

export class ApplicationError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status ?? 500;
    this.name = "ApplicationError";
  }
}
