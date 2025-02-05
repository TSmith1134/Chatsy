const verifyRole = (...allowedRoles) => {
    return (req, res, next) =>  {
        if(!req?.roles) return  res.sendStatus(401)

        const  rolesArray = [...allowedRoles]
        if(!rolesArray.includes(req.roles)) return res.sendStatus(401)

        next()
    }
}

module.exports = verifyRole