$(document).ready(function(){$(".select-item-form-ship").change(function(e){var s=$(".select-item-form-ship input:radio:checked").val();$(".form-error").hide(),"medicare-hospital"===s?$(".hidden-select-block").show():$(".hidden-select-block").hide()}),$(".select-item-submit").click(function(e){var s;s=$(this).closest(".select-item-form").length>0?$(this).closest(".select-item-form").valid():$(this).closest(".select-item-form-ship").valid(),s||e.preventDefault()}),$(".select-item-form").validate({rules:{"order-materials":"required"},messages:{"order-materials":'<img src="/images/icon-svgs/important.svg" alt="Error" class="img-text"> One item must be selected to submit order'},highlight:function(e){$(e).closest(".radio-group").length>0?$(e).closest(".radio-group").addClass("field-has-error"):$(e).closest(".field").addClass("field-has-error"),$(e).closest("form").find("legend").addClass("field-has-error")},unhighlight:function(e){$(e).closest(".radio-group").length>0?$(e).closest(".radio-group").removeClass("field-has-error"):$(e).closest(".field").removeClass("field-has-error"),$(e).closest("form").find("legend").removeClass("field-has-error")},errorPlacement:function(e,s){$(s).closest(".radio-group").length>0?$(s).closest(".radio-group").append(e):$(s).closest(".field").append(e)}}),$(".select-item-form-ship").validate({rules:{"order-materials-ship":"required"},messages:{"order-materials-ship":'<img src="/images/icon-svgs/important.svg" alt="Error" class="img-text"> One item must be selected to submit order'},highlight:function(e){$(e).closest(".radio-group").length>0?$(e).closest(".radio-group").addClass("field-has-error"):$(e).closest(".field").addClass("field-has-error"),$(e).closest("form").find("legend").addClass("field-has-error")},unhighlight:function(e){$(e).closest(".radio-group").length>0?$(e).closest(".radio-group").removeClass("field-has-error"):$(e).closest(".field").removeClass("field-has-error"),$(e).closest("form").find("legend").removeClass("field-has-error")},errorPlacement:function(e,s){$(s).closest(".radio-group").length>0?$(s).closest(".radio-group").append(e):$(s).closest(".field").append(e)}})});