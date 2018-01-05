import timeoutMiddleware from 'connect-timeout';

export function combineMiddleware(mids) {
    return mids.reduce((a, b) => function(req, res, next) {
        a(req, res, (err) => {
            if (err) {
                return next(err);
            }
            b(req, res, next);
        });
    });
}

export default function errorRequestDefaultFactory({ timeout = '15s' } = {}) {
    function errorRequestDefaultMiddleware(req, res, next) {
        next();
    }

    if (timeout) {
        return combineMiddleware([
            timeoutMiddleware(timeout),
            errorRequestDefaultMiddleware
        ]);
    }
    return errorRequestDefaultMiddleware;
}
