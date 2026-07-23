export const sessionInfo = (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Sessions resource initialized",
  });
};
