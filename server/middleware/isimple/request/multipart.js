const crypto = require('crypto');


class Multipart {
    constructor() {
        this.boundary = this.generateBoundary();
        this.multipart = "";
    }

    generateBoundary() {
        let boundary = 'boundary' + (new Date()).getTime();
        return /*'------------------------' + */crypto.createHash('md5').update(boundary).digest('hex');
    }

    appendField(field) {
        this.multipart += "--" + this.boundary + "\r\n";
        this.multipart += "Content-Disposition: form-data; " +
                          `name="${field.name}"` +
                          `${field.filename ? '; filename="'+field.filename+'"' : ''}`;
        if (field.filename) {
            this.multipart += `\r\nContent-Type: ${field.contentType}`;
        }
        this.multipart += `\r\n\r\n`;
        this.multipart += field.value+'\r\n';
    }

    getMultipart() {
        return this.multipart + `--${this.boundary}--\r\n`;
    }
}

module.exports = Multipart;
