const adminOnly = (req, res, next) => {
  //how we are able to acess the user here ?
  //protect middleware pass the same object to admin middleware
  console.log(req.user);
  if (req.user.role == "admin") {
    next();
  } else {
    return res.status(403).json({
      message: "Admin access only",
    });
  }
};
module.exports = adminOnly;