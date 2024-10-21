import WebSocket from "ws";
let heartbeatInterval: number

export class DiscordClient {
    private token: string;
    private resumeUrl: string;
    private sessionId: string;
    private gatewayApiConnection: WebSocket

    guilds: object;
    id: string;
    username: string;
    
    constructor(token: string){
        // property assignment
        this.token = token
        this.gatewayApiConnection = new WebSocket('wss://gateway.discord.gg/?v=10&encoding=json')

        // constructor-wide gateway 
        const gateway = this.gatewayApiConnection

        // Error and closed
        gateway.on('close', (reason) => {
            console.log(`closed! ${reason}`)
        })

        gateway.on('error', (err) =>{
            console.log(err)
        })

        // on open
        gateway.on('open', () => {
            gateway.on('message', async (rawMessage) => {
                let jsonMessage = JSON.parse(rawMessage.toString()) // Message converted to String from Buffer and parsed to a object

                // Switch case for opcodes 
                switch(jsonMessage.op){
                    case 0: // OPCODE 0
                        console.log(jsonMessage)
                        break;
        
                    case 10: // OPCODE 10
                        heartbeatInterval = jsonMessage.d.heartbeat_interval; // heartbeat interval from Hello message

                        // Timeout to send a opcode 1 reply in (heartbeatInterval*Math.random()) ms
                        setTimeout(() => {
                            gateway.send(JSON.stringify({
                                op: 1,
                                d: jsonMessage.s
                            }))
                        }, heartbeatInterval*Math.random());


                        // IDENTIFY payload
                        gateway.send(JSON.stringify({
                            op: 2,
                            d: {
                                token: this.token,
                                intents: 513,
                                properties: {
                                    os: 'Windows',
                                    browser: 'Mars-le-Tour',
                                    device: 'Mars-le-Tour'
                                }
                            }}));
                        
                        // send a heartbeat every heatbeatInterval ms with opcode 1 and data field as the last message's s field
                        (async () =>{
                            setInterval(() => {
                                gateway.send(JSON.stringify({
                                    op: 1,
                                    d: jsonMessage.s
                                }))
                            }, heartbeatInterval)
                        })();

                        break;
            
                    
                }
        
            })
        })        
    }
}