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

    $("#next").click(function () {
        //        alert("next");
        $(".hero-unit.current").animate({left: "1500px"}, 400, function () {
            $(".hero-unit.current").css({left: "-1500px"})
            $(".hero-unit.current").animate({left: "100px"}, 200);
        });
    });

    $(".dropdown").click(function () {
        $(".dropdown").removeClass("active");
        $(this).addClass("active");
        //        alert("next");
        var text = $("a", this).text();
        //        alert(text);
        $(".hero-unit.current").animate({left: "1500px"}, 400, function () {
            $(".hero-unit").removeClass("current");
            var input_phone_div = $(".hero-unit[type='input_phone']");
            input_phone_div.css({left: "-1500px"});
            input_phone_div.addClass("current");
            $("h1", this).text("在线预定高端品质生活服务（" + text + "）");
            input_phone_div.animate({left: "100px"}, 200);
        });
    });


});
