import Qrcode from "qr-image";
import { createWriteStream } from "fs";

import promiseAsyncWrapper from "../middlewares/promise_async_wrapper.js";
import { static_absolute_files_host } from "../config.js";
import Randomstring from "randomstring"

class QrcodeRepository{
    static async generateProductQrcode({ link, name }){
        return new Promise(
            promiseAsyncWrapper(async (resolve, reject) => {
                
                const generated = Qrcode.image(link, { type: 'png' });

                const filename = `product_${name}_${Randomstring.generate(10)}.png`;
                const filePath = `public/qrcodes/${filename}`;
                const qrStream = generated.pipe(createWriteStream(filePath));

                qrStream.on('finish', () => {
                    console.log(`QR Code saved as ${filename}`);
                });

                const qrcode_path = static_absolute_files_host  + `qrcodes/${filename}`
                console.log(qrcode_path);
                resolve(qrcode_path);
            })
        )
    }
}

export default QrcodeRepository