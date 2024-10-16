$(function () {
    var n = $("#login"),
        e = $("#password"),
        o = $("#signin_b"),
        i = $("#signup_b"),
        r = $("#loginopenid"),
        a = $("#loginoauth"),
        t = $("#signopenidin_b"),
        l = $("#signoauthin_b"),
        s = function (n) {
            return n.endsWith("/") ? n.slice(0, -1) : n;
        },
        c = function () {
            var i = n.val(),
                r = e.val();
            Auth.signIn(i, r)
                .fail(function (n) {
                    return Popup.error("Неверный логин и/или пароль!");
                })
                .done(function () {
                    o.val("Всё отлично!"), (window.location = s(window.location.origin) + s(g_URLdir) + targetURI);
                });
        };
    o.click(c);
    var d = function () {
        var n = r.val(),
            e = $("#user_role").val();
        if (!n.trim()) return void alert("Необходимо ввести логин ЮФУ");
        // window.location = g_URLdir + "handler/sign/openidlogin?loginopenid=" + n + "&user_role=" + e + "&user_goal=" + targetURI;
        window.location = "login.html";
    };
    t.click(d);
    var u = function () {
        var n = a.val(),
            e = $("#user_role").val();
        if (!n.trim()) return void alert("Необходимо ввести почтовый адрес ЮФУ");
        // window.location = g_URLdir + "handler/sign/oauthlogin?loginoauth=" + n + "&user_role=" + e + "&user_goal=" + targetURI;
        window.location = "login.html";
    };
    l.click(u),
        (Auth.onAllow = function () {
            return o.removeAttr("disabled");
        }),
        (Auth.onDeprecate = function () {
            return o.attr("disabled", "disabled");
        }),
        $("#remind").click(function () {
            $.postJSON(g_URLdir + "handler/sign/remindPassword", { email: $("#email").val() })
                .fail(function (n) {
                    return EventInspector.error(n.responseText);
                })
                .done(function (n) {
                    $("#remind").val("Проверьте почту!"), window.location.replace(g_URLdir);
                });
        }),
        $("#changepass_b").click(function () {
            $.post(g_URLdir + "handler/sign/changePassword", { password: $("#password").val(), confirm_password: $("#confirm_password").val(), token: $("#token").val() }, function (n) {
                (n = $.parseJSON(n)),
                    !0 === n.success
                        ? ($("#changepass_b").val("Пароль успешно изменен!"), window.location.replace(g_URLdir))
                        : ($("input").each(function () {
                              $(this).removeClass("wrong");
                          }),
                          $("#errors").html("<ul>"),
                          $.each(n.errors, function (e) {
                              EventInspector.error(n.errors[e]), $("#" + e).addClass("wrong");
                          }));
            });
        });
    var g = function () {
        $.postJSON(g_URLdir + "handler/sign/up", {
            activation_code: $("#activation_code").val(),
            login: $("#login").val(),
            password: $("#password").val(),
            confirm_password: $("#confirm_password").val(),
            email: $("#email").val(),
            confirm_email: $("#confirm_email").val(),
        })
            .done(function (n) {
                i.val("Всё отлично!"), window.location.replace(g_URLdir);
            })
            .fail(function (n) {
                return Popup.error(n.responseText);
            });
    };
    i.click(g),
        $(document).keypress(function (o) {
            13 == o.keyCode && (n.is(":focus") ? e.focus() : e.is(":focus") ? c() : r.is(":focus") ? d() : a.is(":focus") && u());
        });
    var v = document.querySelector('[id="login"]');
    v &&
        v.addEventListener("keypress", function (n) {
            32 === n.keyCode && n.preventDefault();
        });
    var p = document.querySelector('[id="email"]');
    p &&
        p.addEventListener("keypress", function (n) {
            32 === n.keyCode && n.preventDefault();
        });
    var f,
        _ = document.getElementsByClassName("collapsible");
    for (f = 0; f < _.length; f++)
        _[f].addEventListener("click", function () {
            this.classList.toggle("active");
            var n = this.nextElementSibling;
            "block" === n.style.display ? (n.style.display = "none") : (n.style.display = "block");
        });
});
