import moment from "moment"
import Email from "../models/Email.js"
import ValidatorRepository from "./Validator.js"
import promiseAsyncWrapper from "../middlewares/promise_async_wrapper.js"
import { createTransport } from 'nodemailer';
import { smtp_host, smtp_pass, smtp_port, smtp_user } from "../config.js";
import logger from "../utils/logger.js";


class EmailRepository{
    static transporter

    static getTransporter(){
        if(!this.transporter){
            this.transporter = createTransport({
                host: smtp_host, // Hostinger SMTP server
                port: smtp_port, // Port for sending mail
                secure: true, // Use SSL (false for TLS)
                auth: {
                  user: smtp_user, // Your email address
                  pass: smtp_pass, 
                },
              });
        }
        
        return this.transporter
    }

    static async storeEmail({ to, subject, content, text, html }){
        return new Promise(
            promiseAsyncWrapper(async (resolve) => {
                await ValidatorRepository.isEmail(to)
                
                const created_at = moment().format('DD.MM.YYYY HH:mm:ss')
                const email = await Email.create({ to, subject, content, text, html, created_at })
                return resolve(email)
            })
        )
    }

    static sendMail({ subject, to, text, html}){
        return new Promise(
            promiseAsyncWrapper(async (resolve) => {
                const mailOptions = {
                    from: smtp_user, // Sender address
                    to: to, // Recipient address
                    subject: subject,
                    text: text,
                    html: html
                }
        
                const transporter = this.getTransporter()

                await transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                      logger.error('Error sending email:', error);
                    } else {
                      logger.info('Email sent:', info.response);
                    }
                  })


                return resolve(true)
                
            })
        )
    }
} 

export default EmailRepository