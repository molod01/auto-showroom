const prepareUpdates = (req, res, next) => {
    req.data = Object.fromEntries(
        Object.entries(req.body).filter(([_, v]) => v != null && v != ''));
    next();
}
export default prepareUpdates;