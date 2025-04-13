const jwt = require('jsonwebtoken');

exports.AuthenticateToken = (req, res, next) => {

    console.log('hello ',req.cookies)
   // const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
      const token = req.cookies["access_token"]
      console.log('jhjkk',req.cookies)
    if (!token) {
        return res.status(401).json({
            'status': false,
            message: 'Sorry token is not available'
        })
    }

    jwt.verify(token, process.env.TOKEN_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({status : 401 ,message : 'Token expired or invalid'});
        }
        req.userId = decoded.userId;
        req.isAdmin = decoded.isAdmin;
        req.email = decoded.email
        next();
   });
} 




exports.AdminRoutes = (req, res, next) => {

    console.log('hello fyfyf',req)

    if (!req.isAdmin) {

        return res.status(403).json({
            'status': false,
            message: 'Sorry you are not authorised to view this resource contact your administrator'
        })
    }

        next();

}


