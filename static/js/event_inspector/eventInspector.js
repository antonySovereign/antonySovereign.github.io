var $ = jQuery,
    inspectorCounter = 0,
    inspectorMax = 10,
    inspectorList;
$(function () {
    $("body").append('<div class="EventInspectorList"></div>'),
        (inspectorList = $("div.EventInspectorList")),
        inspectorList.on("click", "div.EventItem", function () {
            $(this).remove();
        }),
        $(window).scroll(function () {
            var t = $(this).scrollTop() > 40 ? "20px" : "50px";
            inspectorList.css("top", t);
        });
});
var EventInspector = {
        show: function (t, s) {
            inspectorCounter >= inspectorMax && inspectorList.children().first().remove(), ++inspectorCounter;
            var n = inspectorList
                    .append('<div class="EventItem ' + s + '">' + t + "</div>")
                    .children()
                    .last(),
                e = function () {
                    return n.animate({ opacity: 0 }, 1e3, function () {
                        return n.remove();
                    });
                };
            setTimeout(function () {
                --inspectorCounter, e();
            }, 4e3);
        },
        message: function (t, s, n) {
            t ? this.show(s, "success") : this.show(n, "error");
        },
        error: function (t) {
            this.show(t, "error");
        },
        success: function (t) {
            this.show(t, "success");
        },
    },
    Popup = EventInspector;
