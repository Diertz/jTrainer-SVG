var VStep3;
var currentImageNumber = 1;

var step3 = function () {
    this.postDispatch = function () {
        $("#step2").empty();

        // store right answers order
        var order = ["1", "7", "14", "15", "30"];
        // store areas ids after which we should enable next areas
        var areasInImg = ["6", "13", "14", "28"];
        // store areas ids after which we should replace image with new
        var changeImageOrder = ["1", "7", "14", "15", "30"];

        $(".part:gt(5)").hide();
        area_click(order, changeImageOrder, areasInImg);

        VStep3 = new Validator();
        VStep3.addValidator($('input[name="step3-input-familyP"]'), 0.5)
        .addValidator($('input[name="step3-input-familyQ"]'), 0.5)
        .addValidator($('input[name="step3-input-axisP"]'), 20)
        .addValidator($('input[name="step3-input-axisQ"]'), 20)
        .addValidator($('input[name="step3-input-axisR"]'), 20)
        .addValidator($('input[name="step3-input-radius"]'), 35)
        .setStrictMode(true).setIgnoreCase(false).enableStepFinishAlert(true);
        VStep3.addAreaSteps(order, order.length);

        $('button.check').click(function () {
            VStep3.setAttemptsOnCheckButton($(this));
            VStep3.validate();
            if(VStep3.getFulfilled()) {
                $(".step3-inputs").css("visibility", "hidden");
                $("#mainImg").attr("src", "img/step3/7.png")
            }
        });
    };

    this.mustache = function () {
        return {
            STEP3_INPUT_FAMILYP: new TextInput('step3-input-familyP')
            .placeholder("P")
            .render(),
    
            STEP3_INPUT_FAMILYQ: new TextInput('step3-input-familyQ')
            .placeholder("Q")
            .render(),
    
            STEP3_INPUT_AXISP: new TextInput('step3-input-axisP')
            .placeholder("P")
            .render(),

            STEP3_INPUT_AXISQ: new TextInput('step3-input-axisQ')
            .placeholder("Q")
            .render(),

            STEP3_INPUT_AXISR: new TextInput('step3-input-axisR')
            .placeholder("R")
            .render(),

            STEP3_INPUT_RADIUS: new TextInput('step3-input-radius')
            .placeholder("{{RADIUS}}")
            .render()
        }
    }

    function area_click(order, changeImageOrder, areasInImg){
        $(".part").click(
            function(){
                if(order[0] == $(this).attr("id")){
                    $(this).css("fill", "green");
                    updateImage(order, changeImageOrder);
                    updateAreas(areasInImg);
                    order.shift();
                }
                else{
                    $(this).css("fill", "red");
                    VStep3.validateArea();
                }
            }
        )
    }
    
    function updateImage(order, changeImageOrder) {
        if(changeImageOrder[0] == order[0]){
            $("#mainImg").attr("src", "img/step3/" + ++currentImageNumber + ".png")
            changeImageOrder.shift();
        }
    }
    
    function updateAreas(areasInImg) {
        var temp = areasInImg[0];
        areasInImg.shift();
        $(".part:lt(" + areasInImg[0] + ")").show();
        if (areasInImg[0]) {
            $(".part:lt(" + temp + ")").hide();
        } else {
            $(".part:lt(" + temp + ")").hide();
            $(".part:gt(" + temp + ")").show();
        }
        if(areasInImg.length == 0 && !temp) {
            $(".part:gt(0)").hide();
            $(".step3-inputs").css("visibility", "visible");
        }
    }
};