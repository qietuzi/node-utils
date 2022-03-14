const os = require("os")

module.exports = {
    /* 
    @desc           获取IPV4
    @params         
    @result         string
    */
    getIPAdress () {
        const interfaces = os.networkInterfaces()
        for (let networkCardName in interfaces) {
            const networkCard = interfaces[networkCardName]
            for (let i = 0; i < networkCard.length; i++) {
                const alias = networkCard[i]
                if (alias.family === "IPv4" && alias.address !== '127.0.0.1' && !alias.internal) {
                    return alias.address
                }
            }
        }
    }
}