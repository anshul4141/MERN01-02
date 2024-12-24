const isLogedInUser = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.status(401).json({ message: 'User unauthorized. Please log in.' });
    }
};

module.exports = { isLogedInUser };