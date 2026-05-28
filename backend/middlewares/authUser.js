import jwt from 'jsonwebtoken'

// User authentication middleware

export const authUser = async(req, res, next) => {
    try {
        const bearerToken = req.headers.authorization?.split(' ')[1]
        const headerToken = req.headers.token
        const token = bearerToken || headerToken
        if (!token) {
            return res.status(401).json({ success: false, message: "Unauthorized" })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = decoded.id
        next()
    } catch (error) {
        console.error('Auth user error:', error?.message || error)
        res.status(401).json({ success: false, message: "Unauthorized" })
    }
}