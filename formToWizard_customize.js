/* Created by jankoatwarpspeed.com */

(function($) {
    $.fn.formToWizard = function(options) {
        options = $.extend({
            submitButton: ""
        }, options);

        var element = this;

        var steps = $(element).find("fieldset");
        var count = steps.size();
        var submmitButtonName = "#" + options.submitButton;
        $(submmitButtonName).hide();

        // 2
        $(element).before("<ul id='steps'></ul>");

        steps.each(function(i) {
            $(this).wrap("<div id='step" + i + "'></div>");
            $("#step"+i+" .bigNextButton ").prepend("<span id='step" + i + "commands'></span>");
            $("#step"+i+" .obPrevious").prepend("<span id='step" + i + "commands'></span>");

            // 2
            var name = $(this).find("legend").html();
//            $("#steps").append("<li id='stepDesc" + i + "'>Step " + (i + 1) + "<span>" + name + "</span></li>");

            if (i == 0) {
                createNextButton(i);
                selectStep(i);
            }
            else if (i == count - 1) {
                $("#step" + i).hide();

                createPrevButton(i);
            }
            else {
                $("#step" + i).hide();
                createPrevButton(i);
                createNextButton(i);
            }
        });

        function createPrevButton(i) {
            var stepName = "step" + i;
            $(".obPrevious #" + stepName + "commands").append("<a href='#' id='" + stepName + "Prev' class='prev'>Previous step</a>");

            $("#" + stepName + "Prev").bind("click", function(e) {
                $("#" + stepName).hide();
                $("#step" + (i - 1)).show();
                $(submmitButtonName).hide();
                selectStep(i - 1);
            });
        }

        function createNextButton(i) {
            var stepName = "step" + i;
            $(".bigNextButton #" + stepName + "commands").append("<a href='#' id='" + stepName + "Next' class='next'>Next step</a>");

            $("#" + stepName + "Next").bind("click", function(e) {
                $("#" + stepName).hide();
                $("#step" + (i + 1)).show();
                if (i + 2 == count)
                    $(submmitButtonName).show();
                selectStep(i + 1);
            });
        }

        function selectStep(i) {
            $("#steps li").removeClass("current");
            $("#stepDesc" + i).addClass("current");
        }

    }
    $.fn.formToReWizard = function(options) {
        var element = this;
        var steps = $(element).find("fieldset");
        var count = steps.size();
        steps.each(function(i) {
             var $this= $(this);
            $('span[id^="step"]').remove();
            if ( $this.parent().is("div") ) {

                $this.unwrap();
            }
        });
        $(element).formToWizard();
    }
})(jQuery); 