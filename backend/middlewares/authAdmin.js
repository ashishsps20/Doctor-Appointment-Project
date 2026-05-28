import jwt from 'jsonwebtoken'

// admin authentication middleware

export const authAdmin = async(req, res, next) => {
    try {
        const bearerToken = req.headers.authorization?.split(' ')[1]
        const headerToken = req.headers.atoken
        const atoken = bearerToken || headerToken
        if (!atoken) {
            return res.status(401).json({ success: false, message: "Unauthorized" })
        }

        const decoded = jwt.verify(atoken, process.env.JWT_SECRET)
        if(decoded !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
            return res.status(401).json({ success: false, message: "Unauthorized" })
        }
        req.admin = decoded
        next()
    } catch (error) {
        console.error('Auth admin error:', error?.message || error)
        res.status(401).json({ success: false, message: "Unauthorized" })
    }
}