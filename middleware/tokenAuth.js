import Guest from "../models/guestModel.js";

export async function tokenAuth(req, res, next) {
  const token = req.headers.authorization;
  

  if (!token)
    return res.status(401).json({ errors: [{ msg: "No token Provided" }] });

  const guest = await Guest.findOne({ inviteToken: token });

  if (!guest)
    return res.status(401).json({ errors: [{ msg: "No token Provided" }] });

  req.guest = guest;

  next();
}