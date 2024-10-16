$(function () {
    function e(e, t, d) {
        $.each(d, function () {
            e.append("<h3>" + this.date + "</h3>"), e.append(this.text);
        }),
            d.length && t.show();
    }
    var t = $(".updates .tab.selected"),
        d = $(".updates [id^=content-][class!=hidden]");
    $(".updates [id^=tab-]").each(function (e) {
        var n = $(this),
            s = n.attr("id"),
            a = s.substring(s.lastIndexOf("-") + 1),
            i = $(".updates [id^=content-" + a + "]");
        n.click(function () {
            t.removeClass("selected"), d.addClass("hidden"), n.addClass("selected"), i.removeClass("hidden"), (t = n), (d = i);
        });
    }),
        $.post(g_URLdir + "handler/news", function (t) {
            var d = $(".updates"),
                n = JSON.parse(t);
            for (var s in n)
                if (n.hasOwnProperty(s)) {
                    var a = d.find("#content-" + s),
                        i = a.find(".extra"),
                        c = a.find(".expand");
                    e(i, c, n[s]), "syncs" === s && a.addClass("sync-dates-list");
                }
        }),
        $(".updates [id^=content-]").each(function (e) {
            var t = $(this),
                d = t.find(".expand"),
                n = t.find(".extra");
            d.click(function () {
                n.hasClass("hidden") ? (n.removeClass("hidden"), d.text("Скрыть")) : (n.addClass("hidden"), d.text("Ещё"));
            });
        });
});
