function validateForm(r,e){var t="[data-form="+r+"]",o=getRequiredFormFields(t);console.log(o),$("#other-amount").is(":checked")||(o=o.filter(function(r){var e=r.target[0].id;return"other-amount-number"!==e&&"total-amount"!==e&&"other-amount"!==e})),console.log(o);var a=checkForErrors(t,o);a||(window.location.href=e)}function getRequiredFormFields(r){var e=[];return $(r+" :input:not(:button,:hidden,[data-optional])").each(function(){var r={target:$(this),value:$(this).val()};e.push(r)}),e}function checkForErrors(r,e){var t=!1,o=0,a=$(r+" .error-summary");return e.forEach(function(r){var e=r.target;if(toggleErrorOnField(e,!0),e.is(":radio, :checkbox")){var a=e.closest("fieldset");a.find(":checked").length<1&&toggleErrorOnField(e)}e.is("select")?e.find(":selected").is(":disabled")&&(o++,toggleErrorOnField(e),t=!0):0==e.val()&&(o++,toggleErrorOnField(e),t=!0)}),o>0?($(r).addClass("has-errors"),a.removeClass("hidden"),a.find(".error-summary-count").text(o)):a.addClass("hidden"),t}function toggleErrorOnField(r,e){var t=r.parents(".longform__row");e?t.removeClass("has-error"):t.toggleClass("has-error")}$("[data-form-target]").on("click",function(r){r.preventDefault();var e=$(this).data("form-target"),t=$(this).data("goto");validateForm(e,t)}),$("[data-formfield]").focus(function(){var r=($(this).parents(".longform__row")[0],$(this));toggleErrorOnField(r,!0)}),$("[data-form] fieldset :checkbox, [data-form] fieldset :radio").change(function(){var r=($(this).parents(".longform__row")[0],$(this));toggleErrorOnField(r,!0);var e=r.closest("fieldset");e.find(":checked").length<1&&toggleErrorOnField(r)}),$("[data-formfield]").focusout(function(){var r=$(this).parents("[data-form]")[0],e=$(this);if($(r).hasClass("has-errors")){$(this).parents(".longform__row")[0];toggleErrorOnField(e,!0),e.is("select")?e.find(":selected").is(":disabled")&&toggleErrorOnField(e):0==e.val()&&toggleErrorOnField(e)}if($(this).attr("data-matchfield")){toggleErrorOnField(e,!0);var t=$(this).data("matchfield");$(this).val()!==$("[data-formfield="+t+"]").val()&&toggleErrorOnField(e)}});