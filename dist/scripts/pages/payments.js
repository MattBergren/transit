function confirmLegal(e,t){e.preventDefault();var n=$("#termsAgree:checked").length>0,o=$("#termsAgree").parents("#termsAgreeWrapper")[0];$(o).removeClass("has-error"),n?window.location.href=t:$(o).addClass("has-error")}$(".payment-form .collapse-toggle").on("click",function(){$(this).toggleClass("hidden")}),$("#showCreditCardForm").on("click",function(e){e.preventDefault(),$(this).addClass("hidden"),$("#savedCardRadios :checked").prop("checked",!1),$("#creditCardForm").removeClass("hidden")}),$("#savedCardRadios input[type=radio]").change(function(e){$("#creditCardForm").hasClass("hidden")||($("#creditCardForm").addClass("hidden"),$("#showCreditCardForm").removeClass("hidden"))}),$("#payment-type-form input").change(function(e){var t=$(this).val(),n=$(".collapse#collapseCredit"),o=$(".collapse#collapseCheck");"credit"===t?o.hasClass("in")?(o.collapse("hide"),o.on("hidden.bs.collapse",function(){n.collapse("show")})):n.collapse("show"):n.hasClass("in")?(n.collapse("hide"),n.on("hidden.bs.collapse",function(){o.collapse("show")})):o.collapse("show")}),$("#cancelExistingAutoPayButton").on("click",function(e){e.preventDefault(),$("#cancellingAutomaticPayment").removeClass("hidden"),$("#editAutomaticPaymentButton").text("Set Up Automatic Payments")}),$("#cancelExistingRecurringPayButton").on("click",function(e){e.preventDefault(),$("#cancellingRecurringPayment").removeClass("hidden"),$("#editRecurringPaymentButton").text("Set Up Recurring Payments")}),$("#auto-payments").validate({rules:{"other-amount-number":{"other-amount":!0},"auto-payments-routing":"required","auto-payments-routing-confirm":{required:!0,equalTo:"#auto-payments-routing"},"auto-payments-account-number":"required","auto-payments-account-number-confirm":{required:!0,equalTo:"#auto-payments-routing"},"auto-payments-first-name":"required","auto-payments-last-name":"required","auto-payments-sig-consent":"required"},highlight:function(e){$(e).closest(".field--row").addClass("field-has-error")},unhighlight:function(e){$(e).closest(".field--row").removeClass("field-has-error")},errorPlacement:function(e,t){t.closest(".field--row").find(".table-body-cell:nth-of-type(2)").length>0?t.closest(".field--row").find(".table-body-cell:nth-of-type(2)").append(e):t.closest(".field--row").find(".field-input").append(e)}}),$("#terms-only").validate({rules:{termsAgree:"required"},highlight:function(e){$(e).closest(".field").addClass("field-has-error")},unhighlight:function(e){$(e).closest(".field").removeClass("field-has-error")},errorPlacement:function(e,t){$(t).closest(".field").find(".field-input--radio").append(e)}}),$("#amount-paid").validate({rules:{"other-amount-number":"required"},highlight:function(e){$(e).closest(".field--row").addClass("field-has-error")},unhighlight:function(e){$(e).closest(".field--row").removeClass("field-has-error")},errorPlacement:function(e,t){$(t).closest(".field--row").find(".field-input").append(e)}}),$("#payment-form").validate({rules:{"other-amount-number":"required"},highlight:function(e){$(e).closest(".field--row").addClass("field-has-error")},unhighlight:function(e){$(e).closest(".field--row").removeClass("field-has-error")},errorPlacement:function(e,t){$(t).closest(".field--row").find(".field-input").append(e)}}),$(".submit-payment").on("click",function(e){e.preventDefault();$("#auto-payments").valid();$("#auto-payments").submit()}),$("#terms-only-btn").click(function(e){var t=$("#terms-only").valid();t||e.preventDefault()}),$.validator.addMethod("other-amount",function(e,t){var n=!0,o=$(t).parents(".field--row").find('input[type="radio"]');return o.prop("checked")&&""===$(t).val()&&(n=!1),!!n},"This field is required.");