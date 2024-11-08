import fs from 'fs'
const CRLF = '\r\n'

/**
 * Type for Content related headers in multipart requests.
 */
type contentOptions = {
    contentType?: string
    contentDisposition?: string;
    contentTransferEncoding?: string;
}

/**
 * Really basic and makeshift class to create multipart HTTP requests
 */
export class MultiPartRequest {
    /** Data of the request */
    data: string;
    /** String serving as the Boundary */
    boundary: string;
    constructor(){
        this.boundary = `${new Date().getTime()}`
        this.data = `--${this.boundary}`+CRLF
    }
    
    /**
     * Inserts a boundary to the form.
     * @returns {MultiPartRequest}
     */
    public insertBoundary(){
        this.data = this.data.concat('--'+this.boundary+CRLF)
        return this
    }

    /** 
     * Sets the headers related to Content.
     * @param {contentOptions} options
     * @returns {MultiPartRequest} 
     * */
    public contentOptions(options: contentOptions){
       Object.getOwnPropertyNames(options).forEach((option) => {
            switch(option){
                case "contentType":
                    this.data = this.data.concat(`Content-Type: ${options.contentType}`+CRLF)
                break;
                case "contentDisposition":
                    this.data = this.data.concat(`Content-Disposition: form-data; ${options.contentDisposition}`+CRLF)
                break;
                case "contentTransferEncoding":
                    this.data = this.data.concat(`Content-Transfer-Encoding: ${options.contentTransferEncoding}`+CRLF)
                break;
            }
       })
       this.data = this.data.concat(CRLF)
       return this
    }

    /**
     * Inserts String data.
     * @param {string} data Data to be inserted.
     * @returns {MultiPartRequest}
     */
    public insertStringData(data: string){
        this.data = this.data.concat(data+CRLF)
        return this
    }
    /**
     * Inserts stringified JSON data.
     * @param {object} data Data to be inserted
     * @returns {MultiPartRequest}
     */
    public insertJSONData(data: object){
        this.data = this.data.concat(JSON.stringify(data,null,2)+CRLF)
        return this
    }

    /**
     * Inserts Base64-encoded data.
     * @param {string} filename Name of the file to convert to Base64 and insert into the form
     * @returns {MultiPartRequest}
     */
    public insertBase64(filename: string){
        this.data = this.data.concat(`${fs.readFileSync(filename).toString('base64')}`+CRLF)
        return this
    }

    /**
     * Inserts a '\r\n' sequence.
     * @returns {MultiPartRequest}
     */
    public insertCRLF(){
        this.data = this.data.concat(CRLF)
        return this
    }
    
    /**
     * Inserts the last boundary.
     * @returns {MultiPartRequest}
     */
    public endBoundary(){
        this.data = this.data.concat(`\r\n--${this.boundary}--`)
        return this
    }

    /**
     * Returns final data.
     * @returns {string}
     */
    public finalize(){
        return this.data
    }
    

}



