var app = {};

app.environment = "local";//local or server

if (app.environment == "local") {
    app.serverUrl = "www.weibo.com";
    app.appkey = "2445517113";//魔方石的诱惑
    app.callbackUrl = "http://www.weibo.com/oauth/callback";
    app.imageServerUrl = "http://images.weibo.com/";
}
else if (app.environment == "server") {
    app.serverUrl = "www.wlm1001.com";
    app.appkey = "3322737363";
    app.callbackUrl = "http://offline.wlm1001.com/oauth/callback";
    app.imageServerUrl = "http://tools.wlm1001.com/";
}

app.localSettings = {};

window.onbeforeunload = function () {
    window.localStorage.localSettings = JSON.stringify(app.localSettings);
};

function saveLocalSettings() {
    window.localStorage.localSettings = JSON.stringify(app.localSettings);
}

$(document).ready(function () {
    if (window.localStorage.localSettings != null) {
        app.localSettings = JSON.parse(window.localStorage.localSettings);
    }
});


$(document).ready(function () {
    app.localSettings.service_type = "一般服务";

    var reg_phone = /^[1][358]\d{9}$/;
    $("#next").click(function () {

        var phone = $("#phone").val();
        if (!reg_phone.test(phone)) {
            $(".hint_phone").removeClass("hide");
            return;
        }

        $.ajax({
            data: {"phone": phone},
            type: 'GET',
            url: ("/api2/account/verification/get"),
            success: function (data) {
                if (data["提示信息"] == "验证码已发送到指定手机" || data["提示信息"] == "验证码已于10秒之内发送到指定手机") {
                    app.localSettings.phone = phone;
                    div_animation();
                }
            }
        });
        function div_animation() {
            $(".hero-unit.current[type='input_phone']").animate({left: "1500px"}, 400, function () {
                var input_verification_div = $(".hero-unit[type='input_verification']")
                input_verification_div.css({left: "-1500px"});
                $(".hero-unit").removeClass("current");
                input_verification_div.addClass("current");
                input_verification_div.animate({left: "100px"}, 200);
            });
        }
    });


    var reg_verification = /^\d{6}$/;
    $("#complete").click(function () {

            var verification = $("#verification").val();
            if (!reg_verification.test(verification)) {
                $(".hint_verification").removeClass("hide");
                return;
            }

            $.ajax({
                data: {"phone": app.localSettings.phone, "verification": verification},
                type: 'GET',
                url: ("/api2/account/verification/auth"),
                success: function (data) {
                    if (data["提示信息"] == "验证码验证通过") {
                        sendOrder();
                        div_animation();
                    }
                    else {
                        $(".hint_verification").removeClass("hide");
                    }
                }
            });

            function sendOrder() {

                $.ajax({
                    data: {uid: "nnnn", accesskey: "XXXXXX", phone: app.localSettings.phone, service_type: app.localSettings.service_type},
                    type: 'GET',
                    url: ("/api2/order/create"),
                    success: function (data) {
                        if (data["提示信息"] == "订单创建成功") {
                            console.log("订单创建成功");
                        }
                        else {
                        }
                    }
                });
            }

            function div_animation() {
                $(".hero-unit.current[type='input_verification']").animate({left: "1500px"}, 400, function () {
                    var generating_order_div = $(".hero-unit[type='generating_order']")
                    generating_order_div.css({left: "-1500px"});
                    $(".hero-unit").removeClass("current");
                    generating_order_div.addClass("current");
                    generating_order_div.animate({left: "100px"}, 200);


                    $(".head_nav[type='has_order']").removeClass("current");
                    $(".head_nav[type='input_phone']").addClass("current");
                    $(".head_nav[type='show_orders']").addClass("current");
                });
            }
        }

    );

    $(".goback").click(function () {
        $(".hero-unit.current[type='input_verification']").animate({left: "-1500px"}, 400, function () {
            var input_phone_div = $(".hero-unit[type='input_phone']")
            input_phone_div.css({left: "1500px"});
            $(".hero-unit").removeClass("current");
            input_phone_div.addClass("current");
            input_phone_div.animate({left: "100px"}, 200);
        });
    });

    $(".refresh").click(function () {
        $(".refresh_hint").removeClass("hide");
    });

    $(".dropdown").click(function () {
        $(".dropdown").removeClass("active");
        $(this).addClass("active");
        //        alert("next");
        var text = $("a", this).text();
        app.localSettings.service_type = text;
        //        alert(text);
        $(".hero-unit.current").animate({left: "1500px"}, 400, function () {
            $(".hero-unit").removeClass("current");
            var input_phone_div = $(".hero-unit[type='input_phone']");
            input_phone_div.css({left: "-1500px"});
            input_phone_div.addClass("current");
            $("h1", input_phone_div).text("在线预定高端品质生活服务（" + text + "）");
            input_phone_div.animate({left: "100px"}, 200);
        });
    });

    $(".head_nav[type='has_order']").click(function () {
        $(".hero-unit.current").animate({left: "1500px"}, 400, function () {
            $(".hero-unit").removeClass("current");
            var has_order_div = $(".hero-unit[type='has_order']");
            has_order_div.css({left: "-1500px"});
            has_order_div.addClass("current");
            has_order_div.animate({left: "100px"}, 200);
        });
    });

    $(".head_nav[type='input_phone']").click(function () {
        $(".hero-unit.current").animate({left: "1500px"}, 400, function () {
            $(".hero-unit").removeClass("current");
            var has_order_div = $(".hero-unit[type='input_phone']");
            has_order_div.css({left: "-1500px"});
            has_order_div.addClass("current");
            has_order_div.animate({left: "100px"}, 200);
        });
    });

});
