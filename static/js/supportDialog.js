$(function () {
    function e(e, t) {
        var a = new FileReader();
        (a.onload = function (e) {
            t.attr("src", e.target.result);
        }),
            a.readAsDataURL(e);
    }
    function t(e, t, a) {
        var i = new FormData();
        i.append("imageFile", e),
            $.ajax({
                url: g_URLdir + "handler/RequestsProcessing/imageUpload",
                data: i,
                processData: !1,
                contentType: !1,
                type: "POST",
                dataType: "json",
                error: a,
                success: function (e) {
                    e.success ? t(e) : a();
                },
            });
    }
    function a(e) {
        for (var t = arguments.length, a = Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++) a[i - 1] = arguments[i];
        return e.bind.apply(e, [null].concat(a));
    }
    function i(a, i) {
        function s(e) {
            console.log("Load succeeded: " + e.requestID), (r = e.requestID), d.show(), u.hide(), (o = !0);
        }
        function l() {
            console.log("Load failed"),
                EventInspector.error("Невозможно загрузить изображение"),
                u.attr("class", "fa fa-exclamation-circle text-danger fa-lg").show(),
                setTimeout(function () {
                    (h = !0), u.attr("class", "fa fa-camera fa-lg").show();
                }, 3e3),
                (o = !1);
        }
        if ((wnd.open(JSON.parse(i)), !this.isInit)) {
            (this.isInit = !0), (c = !1), null !== a && (c = !0);
            var p = $("#uploadImage"),
                u = $("#status-icon"),
                d = $("#errDialog").find(".Preview"),
                h = !0;
            u.click(function () {
                h && p.click();
            }),
                p.change(function () {
                    h = !1;
                    var a = p[0].files[0];
                    e(a, $("#previewImage")), u.attr("class", "fa fa-circle-o-notch fa-lg fa-spin"), t(a, s, l);
                });
            var f = $("#imagePreviewContainer"),
                g = $("#removeImageButton");
            d.hover(
                function () {
                    f.css("opacity", 1);
                },
                function () {
                    f.css("opacity", 0);
                }
            ),
                g.click(function () {
                    u.attr("class", "fa fa-camera fa-lg").show(), d.hide(), (h = !0), (r = n), (o = !1);
                });
        }
    }
    $("#errButton").click(function () {
        $.get(g_URLdir + "window/support", a(i, null));
    }),
        $(".disciplineTeacherUnlockButton").click(function () {
            (params = {}), this.hasClass("disciplineTeacherUnlockButton") && ((params.type = "unlock"), (params.discipline = parseInt(this.id.substr(17)))), $.post(g_URLdir + "window/support", params, a(i, this));
        }),
        $(".disciplineTeacherAuthorButton").click(function () {
            (params = {}), this.hasClass("disciplineTeacherAuthorButton") && ((params.type = "author"), (params.discipline = parseInt(this.id.substr(21)))), $.post(g_URLdir + "window/support", params, a(i, this));
        }),
        $(".disciplineTeacherMoveButton").click(function () {
            (params = {}), this.hasClass("disciplineTeacherMoveButton") && ((params.type = "move"), (params.discipline = parseInt(this.id.substr(15)))), $.post(g_URLdir + "window/support", params, a(i, this));
        }),
        $(".disciplineTeacherExportButton").click(function () {
            (params = {}), this.hasClass("disciplineTeacherExportButton") && ((params.type = "export"), (params.discipline = parseInt(this.id.substr(20)))), $.post(g_URLdir + "window/support", params, a(i, this));
        });
    var s = !0,
        n = -1,
        r = n,
        o = !1,
        c = !1;
    (i.isInit = !1),
        $(document).on("click", "#dialogSendButton", function () {
            dialogSettings = (function () {
                var e = $("#errDialog #DialogOptions");
                return $.parseJSON(e.html() || '{ "FacultyID": 0 }');
            })();
            var e = $("#messageEMail"),
                t = $("#messageTitle"),
                a = $("#message"),
                i = $("#dialogSendButton");
            if (s) {
                s = !1;
                var c = e.val(),
                    l = t.val(),
                    p = a.val(),
                    u = window.location.pathname;
                if (l.length <= 0 || p.length <= 0) {
                    var d = l.length <= 0 ? "Вы не ввели тему сообщения" : "Вы не ввели сообщение";
                    return EventInspector.error(d), void (s = !0);
                }
                a.prop("disabled", !0),
                    t.prop("disabled", !0),
                    i.prop("disabled", !0),
                    $.ajax({
                        type: "POST",
                        url: g_URLdir + "handler/RequestsProcessing/createRequest",
                        data: { email: c, title: l, text: p, requestID: r, faculty: dialogSettings.FacultyID, hasImage: o, location: u },
                        success: function (e) {
                            (s = !0), (e = $.parseJSON(e)), !0 === e.success ? (EventInspector.success("Сообщение успешно отправлено!"), t.val(""), a.val(""), wnd.hide(), (r = n)) : EventInspector.error("Сообщение не отправлено");
                        },
                        error: function () {
                            EventInspector.error("Сообщение не отправлено"), (s = !0);
                        },
                        complete: function () {
                            a.removeAttr("disabled"), t.removeAttr("disabled"), i.removeAttr("disabled");
                        },
                    });
            }
        });
});
