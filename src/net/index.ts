const os = require("os")

module.exports = {

    /* 
    @desc           判断网络是否虚拟网络
    @params         
    @result         boolean
    */
    isVmNetwork (mac:string) {
        // 常见的虚拟网卡MAC地址和厂商
        let vmNetwork = [
            "00:05:69", // vmware1
            "00:0C:29", // vmware2
            "00:50:56", // vmware3
            "00:1C:42", // parallels1
            "00:03:FF", // microsoft virtual pc
            "00:0F:4B", // virtual iron 4
            "00:16:3E", // red hat xen , oracle vm , xen source, novell xen
            "08:00:27", // virtualbox
            "00:00:00", // VPN
        ]
        for (let i = 0; i < vmNetwork.length; i++) {
            let mac_per = vmNetwork[i];
            if (mac.startsWith(mac_per)) {
                return true
            }
        }
        return false;
    },
    /* 
    @desc           获取IPV4
    @params         
    @result         string
    */
    getIPAdress ():string {
        const interfaces = os.networkInterfaces()
        for (let networkCardName in interfaces) {
            const networkCard = interfaces[networkCardName]
            for (let i = 0; i < networkCard.length; i++) {
                const alias = networkCard[i]
                const VmNetwork = this.isVmNetwork(alias.mac)
                if (!VmNetwork && alias.family === "IPv4" && alias.address !== '127.0.0.1' && !alias.internal) {
                    return alias.address
                }
            }
        }
        return ''
    }
}