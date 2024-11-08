import { ContentTypes } from "../enums/ContentTypes"
import { MultiPartRequest } from "./multipartRequest"


/**
 * Utility function to send media using multi-part requests to the Discord HTTP api.
 * @param {Array<string>}filepath Array of paths to media to send.
 * @param {object} Message to be sent.
 * @returns {Array<string>}
 */
export function mediaSend(filepath: Array<string>, message: object): MultiPartRequest{
    let contentType: string;
    // Multi-part request
    let request = new MultiPartRequest()
    .contentOptions({
        contentDisposition: "name=\"payload_json\"",
        contentType: "application/json"
    })
    .insertJSONData(message)
    
    // Iterating over array to attach each file to the request
    filepath.forEach((file) => {
        request.insertBoundary() //
        let match = file.match(/([^\\]*$)/)

        if(match !== null){
            let filename = match[0]
            request.contentOptions({
                contentDisposition: `name=\"files[${filepath.indexOf(file)}]\"; filename=\"${filename}\"`,
                contentType: ContentTypes[filename.match(/([^\.]*$)/)![0]],
                contentTransferEncoding: 'base64'
            })
            request.insertBase64(file)
        } else {
            throw new Error(`Couldn't find such a file: ${file}!`)
        }
    })
    request.endBoundary()
    return request
}