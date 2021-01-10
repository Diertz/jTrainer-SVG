var VStep1;
var currentImageNumber = 1;
var step1 = function () {
    this.postDispatch = function () {

        // store variant options
        var variantsValues = {
            "length": [50, 20, 15, 13, 25, 10, 55, 20, 10, 15],
            "width": [30, 80, 23, 24, 35, 10, 44, 30, 15, 45],
            "height": [25, 10, 60, 10, 45, 10, 62, 20, 90, 50],
            "color": [75, 76, 77, 79, 80, 81, 82, 85, 86, 88]
        };
        // set values to variant table
        setTableValues(variantsValues, userVariant); 

        //  store color area id
        var colorAreaId = variantsValues.color[userVariant - 1];
        // store right answers order
        var order = ["1", "7", "14", "25", colorAreaId];
        // store areas ids after which we should enable next areas this id
        var areasInImg = ["6", "13", "24", "25", "89"];
        // store areas ids after which we should replace image with new
        var changeImageOrder = ["1", "7", "14", "25", colorAreaId];

         // hides all areas sections except first
        $(".part:gt(5)").hide();
        // changes areas color opacity to 0
        $(".part:gt(24)").css("opacity", "0"); 

        area_click(order, changeImageOrder, areasInImg);

        VStep1 = new Validator();
        VStep1.addValidator($('input[name="step1-input-length"]'), variantsValues.length[userVariant - 1])
        .addValidator($('input[name="step1-input-width"]'), variantsValues.width[userVariant - 1])
        .addValidator($('input[name="step1-input-height"]'), variantsValues.height[userVariant - 1])
        .setStrictMode(true).setIgnoreCase(false).enableStepFinishAlert(true);
        VStep1.addAreaSteps(order, order.length);

        $('button.check').click(function () {
            VStep1.setAttemptsOnCheckButton($(this));
            VStep1.validate();
            if(VStep1.getFulfilled()) {
                $(".step1-inputs").css("visibility", "hidden");
                $("#mainImg").attr("src", "img/step1/7-" + userVariant + ".png")
            }
        });
    };

    this.mustache = function () {
        return {
            STEP1_INPUT_LENGTH: new TextInput('step1-input-length')
            .placeholder("{{ENTER_LENGTH}}")
            .render(),

            STEP1_INPUT_WIDTH: new TextInput('step1-input-width')
            .placeholder("{{ENTER_WIDTH}}")
            .render(),

            STEP1_INPUT_HEIGHT: new TextInput('step1-input-height')
            .placeholder("{{ENTER_HEIGHT}}")
            .render()
        }
    }
};

function setTableValues(values, variant){
    $("#boxlength").html(values.length[variant - 1]);
    $("#boxwidth").html(values.width[variant - 1]);
    $("#boxheight").html(values.height[variant - 1]);
    $("#boxcolor").attr('src', 'img/step1/colors/' + variant + '.png');
    $("#variant").text($("#variant").text() + variant);
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
                VStep1.validateArea();
            }
        }
    )
}

function updateImage(order, changeImageOrder){
    if(changeImageOrder[0] == order[0]){
        var img = (currentImageNumber + 1) >= 6 ? (++currentImageNumber + "-" + userVariant) : ++currentImageNumber;
        $("#mainImg").attr("src", "img/step1/" + img + ".png")
        changeImageOrder.shift();
    }
}

function updateAreas(areasInImg){
    //$(".part:lt(" + areasInImg[1] + ")").show();
    //$(".part:lt(" + areasInImg[0] + ")").hide();
    areasInImg.shift();
    $(".part:lt(" + areasInImg[0] + ")").show();
    if(areasInImg.length == 0){
        $(".step1-inputs").css("visibility", "visible");
    }
}