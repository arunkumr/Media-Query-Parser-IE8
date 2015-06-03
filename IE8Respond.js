//IE8Respond.min.js
//Version:0.0.1
//Author:Arun Kumar

//Configuration
var nonResponsive = false;

//Check Jquery
if ("undefined" == typeof jQuery) { throw new Error("Script Requires jQuery"); }
else {   

    //Variables
    var mediaQueries = new Array();
    var jsMQ = new Array();
    var $currentCSS;

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

    var styles = $("style,link[rel='stylesheet']").map(function () {
        if ($(this).is('style')) {
            return $(this).text();
        }
        else {
            var $href = $(this).attr('href');
            var result;
            $.ajax({ url: $href, success: function (data) { result = data; }, type: "GET", async: false });

            return result;
        }
    });

    //Code for Execution
    mediaQueries = styles.map(function () {
        return parseMQs(this);
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
    nonResponsive || $(window).resize(liveStyle);
}
