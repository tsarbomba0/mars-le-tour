/**
 * Function to generate Snowflake IDs
 * @param machineId Machine ID - Cannot be larger than 4096 or smaller than 0
 * @param sequenceNumber Sequence Number - Cannot be larger than 4096 or smaller than 0
 * @returns Number
 */
export function generateDiscordSnowflake(machineId: number, sequenceNumber: number): Number{
    if(machineId>1024 || machineId < 0){
        throw new Error("Bad machine id!")
    } else if (sequenceNumber>4096 || sequenceNumber<0){
        throw new Error("Bad sequence number!")
    }
    return Number(new Date("1 January 2015").valueOf().toString(2) + machineId.toString(2) + sequenceNumber.toString(2))
}