const jwt = require("jsonwebtoken")
const unprotectedRoutes = [
    "/aut/login",
    "/auth/register",
    "/graphql"
]

const authenticate = async (req, res,next) => {
    const token = req.cookeis?.jwtToken || ""

    try {
        const verified = jwt.verify (token, process.env.JWT_SECRET)
        req.verifiedUser = verified
        console.log("user verification successful!", verified)
        next()
    }catch(err) {
        console.log("User verification failed")

        if ( unprotectedRoutes.includes(req.path) ){
            next()
        }else {
            res.redirect('/auth/login')
        }
    }
}

module.exports = { authenticate }