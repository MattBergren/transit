$(document).ready(function(){function e(e,s){s?e.removeClass("hidden"):e.addClass("hidden")}$(".js-document-date").each(function(){var s=$(this);s.change(function(){var t=$("option",s).filter(":selected").val(),o=s.closest(".js-history-filters").find(".js-customhistorydates");"custom-search"===t?e(o,!0):e(o,!1)})}),$(".collapse-close").length>=0&&$(".collapse-close").click(function(e){e.preventDefault();var s="#"+$(this).closest(".collapse-wrapper").find(".collapse").attr("id");$(s).collapse("hide"),$("html, body").animate({scrollTop:$('a[href="'+s+'"]').offset().top})})});