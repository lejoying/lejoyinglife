/**
 * API account/verification handler
 * Date: 2013.05.21
 */

var verification = {};

var neo4j = require('neo4j');

var db = new neo4j.GraphDatabase('http://localhost:7474');
var RSA = require('./../tools/RSA');
var sha1 = require('./../tools/sha1');
var ajax = require('../lib/ajax');

/***************************************
 *     URL：/api2/account/verification/get
 ***************************************/
verification.get = function (data, response) {

    response.asynchronous = 1;
    var account = {
        "type": "account",
        "phone": data.phone,
        "accessKey": ["f5d4f5d46f4d65f4d654f56d4f", "4f54d6f54d65f45d6f465d4f65"],
        "verification": ""
    };

    var now = new Date();
    var sha_verification = sha1.hex_sha1(now.toString());
    var verificationStr = sha_verification.substr(0, 5);
    var verificationNum = Math.floor(parseInt(verificationStr, 16) / 1.048577);
    var verification = verificationNum.toString();

    account.verification = verification;

    var message = "乐家品质生活服务手机验证码：" + verification + "，欢迎您使用【乐家生活】";
    //    console.log(account.phone, message);

    sendPhoneMessage(account.phone, message);


    response.write(JSON.stringify({
        "提示信息": "验证码已发送到指定手机"
    }));
    response.end();
};


function sendPhoneMessage(phone, message) {
    ajax.ajax({
        type: 'GET',
        url: "http://11529-c9239.sms-api.63810.com/api/SmsSend/user/wsds/hash/54c0b95f55a8851cc15f0ccaaea116ae/encode/utf-8/smstype/notify",
        data: {mobile: phone, content: message},
        success: function (dataStr) {
        }
    });
}

/***************************************
 *     URL：/api2/account/verification/auth
 ***************************************/
verification.auth = function (data, response) {

};


module.exports = verification;