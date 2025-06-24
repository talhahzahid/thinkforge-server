import jwt from "jsonwebtoken";

export const authenticateUser = (req, res) => {
  try {
    const refreshJwtToken = req.cookies.refreshToken;
    if (!refreshJwtToken)
      return res
        .status(401)
        .json({ message: "Please log in to access this page." });
    // verify token
    const user = jwt.verify(refreshJwtToken, process.env.REFRESH_JWT_SECRET);
    const newAccessToken = jwt.sign(
      { email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "6h" }
    );
    res.status(200).json({
      message: "User verified successfully.",
      user,
      accessToken: newAccessToken,
    });
  } catch (err) {
    console.log("Error in authenticateUser middleware:", err);
    res.status(500).json({ message: "An internal server error occurred." });
  }
};
