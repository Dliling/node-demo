const nodemailer = require("nodemailer");

// create reusable transporter object using the default SMTP transport
// 创建发送邮件的对象
let transporter = nodemailer.createTransport({
    host: "smtp.qq.com", // 发送方邮箱 node_modules/nodemailer/lib/wellknow/service.json
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: '1521488894@qq.com', // 发送方邮箱地址
        pass: 'xeztdcguptaxgaaf' // mtp 验证码 设置-》账号安全-》POP3/SMTP服务
    }
});

function send(mail, code) {
    let mailObj = {
        from: '"Fred Foo 👻" <1521488894@qq.com>', // sender address
        to: mail, // list of receivers
        subject: "Hello node", // Subject line
        text: `验证码是${code},五分钟内有效。`, // plain text body only string
    };
    // send mail with defined transport object
    return new Promise((resolve, reject) => {
        transporter.sendMail(mailObj, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    })
}
module.exports = {send};
