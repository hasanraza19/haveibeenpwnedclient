const request = require("request")
const chalk = require("chalk")
const SHA1 = require("crypto-js/sha1")
const pass = process.argv[2]
if(pass === undefined){
    return console.log("No password entered.")
}

hashedPass = SHA1(pass).toString()
prefix = hashedPass.substring(0,5)
const url = "https://api.pwnedpasswords.com/range/" + prefix
suffix = hashedPass.substring(5)



request({url}, (e,r)=>{
    var pwned = false;
    if(e){
        console.log(e)
    }
    else{
        hashList = r.body.split(/\r?\n/)
        hashList.forEach(h => {

            if(h.split(":")[0] == suffix.toUpperCase()){
                pwned = true
                numberOfTimes = h.split(":")[1]
                console.log(chalk.red("Your password has been leaked " +numberOfTimes + " times"))
                console.log(chalk.red("The hash of your password is: " +h.split(":")[0]))
                

            }
            
        })

        
        if(!pwned){
            console.log(chalk.green("Your password was not found"))
        }
        
    }

})