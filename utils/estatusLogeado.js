module.exports = (request, response, next) => {
    if (!request.session.estatusLogeado) {
        return response.redirect('/usuario/login');
    }
    next();
}