var g_URLdir = "/",
    singleNumRegexp = /\w_(\d+)/,
    parseID = function (e) {
        return (singleNumRegexp.lastIndex = 0), +singleNumRegexp.exec(e.attr("id"))[1];
    };
($.postJSON = function (e, t, n) {
    return $.post(e, t, n, "json");
}),
    $(window).on("turnOn", function (e) {
        return $(e.target).prop("disabled", !1);
    }),
    $(window).on("turnOff", function (e) {
        return $(e.target).prop("disabled", !0);
    }),
    $.fn.extend({
        turnOn: function () {
            return $(this).trigger("turnOn");
        },
        turnOff: function () {
            return $(this).trigger("turnOff");
        },
        aggregate: function (e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
                n = t;
            return (
                this.each(function (t, r) {
                    n = e(n, r);
                }),
                n
            );
        },
    });
var Auth = (function () {
        var e = !0;
        return {
            signIn: function (t, n) {
                if (e) {
                    e = !1;
                    var r = this;
                    return (
                        this.onDeprecate(),
                        $.postJSON(g_URLdir + "handler/sign/in", { login: t, password: n }).always(function () {
                            (e = !0), r.onAllow();
                        })
                    );
                }
            },
            onAllow: function () {},
            onDeprecate: function () {},
        };
    })(),
    Watcher = (function () {
        var e = 0;
        return function (t, n) {
            clearTimeout(e), (e = setTimeout(n, t));
        };
    })();
(Element.prototype.hasClass = function (e) {
    return new RegExp(" " + e + " ").test(" " + this.className + " ");
}),
    (Element.prototype.addClass = function (e) {
        this.hasClass(e) || (this.className += " " + e);
    }),
    (Element.prototype.removeClass = function (e) {
        var t = " " + this.className.replace(/[\t\r\n]/g, " ") + " ";
        if (this.hasClass(e)) {
            for (; t.indexOf(" " + e + " ") >= 0; ) t = t.replace(" " + e + " ", " ");
            this.className = t.replace(/^\s+|\s+$/g, " ");
        }
    }),
    (Element.prototype.toggleClass = function (e) {
        var t = " " + this.className.replace(/[\t\r\n]/g, " ") + " ";
        if (this.hasClass(e)) {
            for (; t.indexOf(" " + e + " ") >= 0; ) t = t.replace(" " + e + " ", " ");
            this.className = t.replace(/^\s+|\s+$/g, " ");
        } else this.className += " " + e;
    });
var getSettings = function () {
    var e = $("#hidden_div"),
        t = $.parseJSON(e.html());
    return e.remove(), t;
};
