module.exports = (request, response, next) => {
    if (!request.session.rol) {
        return response.redirect('/proyecto/home');
    }
    next();
}