export const serverError = (res) => (err) => {
    console.log(err);
    res.status(500).send({
        error: {
            message: err.message,
        },
        message: 'Cannot process response at this time. Please try again shortly.',
    });
};