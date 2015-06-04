//IE8Respond.js
//Version:0.0.2
//Author:Arun Kumar

//Configuration
var nonResponsive = false;
var resizeEnd = false;

//Check Jquery
if ("undefined" == typeof jQuery) { throw new Error("Script Requires jQuery"); }
else {

    //Variables
    var mediaQueries = new Array();
    var jsMQ = new Array();
    var $currentCSS;

    // provide a resized event
    var timer = window.setTimeout(function () { }, 0);
    $(window).on('resize', function () {
        resizeEnd ? (window.clearTimeout(timer), timer = window.setTimeout(function () { $(window).trigger("resized") }, 250)) : $(window).trigger("resized");
    });


    //Functions
    var readRegEx = function (str, re) {
        var resp = str.match(re);
        null !== resp && resp.shift();
        return resp;
    };

    var parseMQs = function (str) {
        var re = /(@media.(?!print)[^{]+\{[\s\S]+?}\s*})/g;
        return readRegEx(str, re);
    };

    mediaQueries = $("style,link[rel='stylesheet']").map(function () {
        if ($(this).is('style')) {
            return parseMQs($(this).text());
        }
        else {
            var $href = $(this).attr('href');
            var result;
            $.ajax({ url: $href, success: function (data) { result = data; }, type: "GET", async: false });

            return parseMQs(result);
        }
    });   

    $.each(mediaQueries, function (index, value) {
        var minWidth = readRegEx(value, /\(min-width:(.*?)px\)/);
        minWidth = null !== minWidth ? parseInt(minWidth) : 0;
        var maxWidth = readRegEx(value, /\(max-width:(.*?)px\)/);
        var css = readRegEx(value, /@media[^{]+\{([\s\S]+?})\s*}/);

        jsMQ.push({
            min: minWidth,
            max: maxWidth,
            css: css
        })
    });

    var liveStyle = function () {
        $("#jsStyle").remove();
        var $wWidth = $(window).width();
        $currentCSS = $jsMQ.map(function () {
            if (null !== this.max) {
                if ($wWidth > this.min && $wWidth < this.max) {
                    return this.css;
                }
            } else {
                if ($wWidth > this.min) {
                    return this.css;
                }
            }
        }).get().join(" ");
        $('head').append("<style id=\"jsStyle\">" + $currentCSS + "</style>");
    }

    var $jsMQ = $(jsMQ);
    liveStyle();
    nonResponsive || $(window).on("resized",liveStyle);
}
