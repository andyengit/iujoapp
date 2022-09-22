export const handleApiError = {
  onError: (err, req, res, next) => {
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is notssssssss found");
  },
};

export const onNoMethod = (req, res) => {
  res.status(405).end("Method not allowed");
};

export const notAuthorized = (req, res) => {
  res.status(401).end("Not authorized");
}
