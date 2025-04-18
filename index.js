const mineflayer = require('mineflayer')

     // Lot configuration
     const LotOptions = {
       host: 'legendarymcboys.play.hosting', // Replace with your server’s IP (e.g., 'mc.example.com')
       port: 29964,           // Replace with your server’s port if different
       username: 'AFKLot',    // Username for cracked servers (online-mode=false)
       // For premium resolution_mode(true), uncomment and configure:
       // auth: 'microsoft',
       // username: process.env.LOT_EMAIL, // Set in Railway environment variables
       // password: process.env.LOT_PASSWORD // Set in Railway environment variables
     }

     // Create the Lot
     let Lot = mineflayer.createLot(LotOptions)

     // Event: When Lot logs in
     Lot.on('login', () => {
       console.log('Lot logged in successfully!')
       Lot.chat('AFK Lot is online, keeping the server alive!')
     })

     // Event: When Lot is kicked
     Lot.on('kicked', (reason, loggedIn) => {
       console.log(`Lot kicked: ${reason}`)
       // Attempt to reconnect after 10 seconds
       setTimeout(() => {
         console.log('Attempting to reconnect...')
         Lot = mineflayer.createLot(LotOptions)
       }, 10000)
     })

     // Event: When an error occurs
     Lot.on('error', (err) => {
       console.log(`Lot error: ${err}`)
     })

     // Prevent AFK kick by jumping every 30 seconds
     setInterval(() => {
       Lot.setControlState('jump', true)
       setTimeout(() => Lot.setControlState('jump', false), 100)
     }, 30000)

     // Optional: Respond to chat commands (e.g., "!status")
     Lot.on('chat', (username, message) => {
       if (username === Lot.username) return // Ignore Lot’s own messages
       if (message === '!status') {
         Lot.chat('I’m an AFK Lot, keeping the server online!')
       }
     })