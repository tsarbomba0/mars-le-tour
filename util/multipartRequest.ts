import fs from 'fs'
const CRLF = '\r\n'

export class MultiPartRequest {
    data: string;
    boundary: string;
    constructor(boundary){
        this.data = ""
        this.boundary = boundary
    }
    
    public insertBoundary(){
        this.data = this.data.concat(this.boundary+CRLF)
        return this
    }

    public contentDisposition(disposition: string){
        this.data = this.data.concat(`Content-Disposition: form-data; ${disposition}`+CRLF)
        return this
    }

    public contentType(type: string){
        this.data = this.data.concat(`Content-Type: ${type}`+CRLF)
        return this
    }

    public insertStringData(data: string){
        this.data = this.data.concat(data+CRLF)
        return this
    }

    public insertBase64(filename: string){
        this.data = this.data.concat(`${fs.readFileSync(filename).toString('base64')}`+CRLF)
        return this
    }

    public contentTransferEncoding(encoding: string){
        this.data = this.data.concat(`Content-Transfer-Encoding: ${encoding}\r\n`)
        return this
    }

    public insertCRLF(){
        this.data = this.data.concat(CRLF)
        return this
    }
    public endBoundary(){
        this.data = this.data.concat(`\r\n${this.boundary}--`)
        return this
    }

    public finalize(){
        return this.data
    }
    

}



