import jwt from 'jsonwebtoken'

// Doctor authentication middleware

export const authDoctor = async(req, res, next) => {
    try {
        const bearerToken = req.headers.authorization?.split(' ')[1]
        const headerToken = req.headers.dtoken
        const token = bearerToken || headerToken
        if (!token) {
            return res.status(401).json({ success: false, message: "Unauthorized" })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.body = req.body || {};
        req.body.docId = decoded.id 
        next()
    } catch (error) {
        console.error('Auth doctor error:', error?.message || error)
        res.status(401).json({ success: false, message: "Unauthorized" })
    }
}