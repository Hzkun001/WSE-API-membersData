// Validasi input untuk POST/PUT/PATCH members
export function validateMember(req, res, next) {
  const { name, role, joinedAt } = req.body;
  const errors = [];

  if (name !== undefined && (typeof name !== "string" || !name.trim())) {
    errors.push("Field 'name' wajib string & tidak kosong.");
  }
  if (role !== undefined && (typeof role !== "string" || !role.trim())) {
    errors.push("Field 'role' wajib string & tidak kosong.");
  }
  if (joinedAt !== undefined) {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(joinedAt)) errors.push("Field 'joinedAt' wajib format YYYY-MM-DD.");
  }

  if (errors.length) {
    return res.status(400).json({ status: "fail", message: "Validasi gagal", errors });
  }
  next();
}
