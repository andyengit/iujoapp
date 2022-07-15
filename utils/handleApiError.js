export const handleApiError = {
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is notssssssss found");
  },
};

export const onNoMethod = (req, res) => {
  res.status(405).end("Method not allowed");
};
