function moveTooltips(t,i){t.each(function(t,a){var o=$(this),n=o.find(".tooltipstered");i?o.prepend(n):o.append(n),fadeBg(o,i)})}function hideVariation(t,i){t.each(function(t,a){function o(t,i,a){"out"===i?t.fadeOut("300",function(){null!==a&&void 0!==a&&a.hide()}):(null!==a&&void 0!==a&&a.show(),t.fadeIn("300"))}var n=$(this),e=n.next(),l=n.closest(".collapse-wrapper"),r=n.parent(),g=r.hasClass("variation-highlight");g&&(e=r.next()),e.hasClass("variation-orig")?(g&&(i?r.hide():r.show()),i?n.hide():o(n,"in"),i?o(e,"in"):e.hide(),i?fadeBg(e,i):fadeBg(n,i)):(g?i?o(n,"out",r):o(n,"in",r):i?o(n,"out"):o(n,"in"),fadeBg(n,i)),l.length>0&&(i?l.prev().removeClass("pdf-list"):l.prev().addClass("pdf-list"))})}function fadeBg(t,i){function a(t){t.css("background-color","")}var o=i?"rgba(255, 230, 240, ":o="rgba(225, 250, 223, ",n=t.css("background-color","").css("background-color");n.indexOf("a")>=0&&(n=n.replace("a","").slice(0,17)+")"),TweenLite.fromTo(t,1,{"background-color":o+"1)"},{"background-color":o+(i||"rgb(225, 250, 223)"!==n?"0)":"1)"),onComplete:a,onCompleteParams:[t]})}function toggleHighlight(t,i){t.each(function(t,i){var a=$(this);a.parent().hasClass("variation-highlight")?a.unwrap():a.wrap('<div class="variation-highlight"></div>')})}function toggleButton(t,i){i?t.attr("data-variation",!1):t.attr("data-variation",!0)}function toggleClick(t,i){var a=$("[data-tooltip-side]"),o=$(".variation-el");a.length>0&&moveTooltips(a,i),o.length>0&&hideVariation(o,i),toggleButton(t,i)}function highlightClick(t,i){var a=$("[data-tooltip-side]"),o=$(".variation-el");a.length>0&&toggleHighlight(a,i),o.length>0&&toggleHighlight(o,i),toggleButton(t,i)}$(document).ready(function(){$("#toggle-variation").click(function(t){t.preventDefault();var i=$(this).attr("data-variation");i="true"===i,toggleClick($(this),i)}),$("#highlight-variation").click(function(t){t.preventDefault();var i=$(this).attr("data-variation");i="true"===i,highlightClick($(this),i)})});