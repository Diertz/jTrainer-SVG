var VStep2;
var currentImageNumber = 1;
let figureName;
let params;
const step2Template = 'step2-input-';

var step2 = function () {
    this.postDispatch = function () {
        $("#step1").empty();
        // remove redunant inputs
        $(".step2-inputs:gt(" + (params.length - 1).toString() + ")").remove();

        // store variant options
        var variantsValues = {
            "type": [20, 15, 16, 22, 17, 23, 18, 20, 15, 16],
            "param1": [40, 45, 30, 45, 40, 35, 25, 35, 30, 3],
            "param2": [0, 0, 30, 40, 15, 40, null, 30, 0.5, 30],
            "param3": [10, null, 50, 20, 20, 20, null, 30, null, 50],
            "param4": [null, null, null, 30, null, null, null, null, null, null],
        };
        // set values to variant table
        setTableValues(variantsValues); 

        var typeOrder = variantsValues.type[userVariant - 1].toString();
        // store right answers order
        var order = ["1", "7", typeOrder];
        // store areas ids after which we should enable next areas
        var areasInImg = ["6", "13", "24"];
        // store areas ids after which we should replace image with new
        var changeImageOrder = ["1", "7", typeOrder];

        // hides all areas sections except first
        $(".part:gt(5)").hide();

        area_click(order, changeImageOrder, areasInImg);

        VStep2 = new Validator();
        // create inputs for every parameter
        for (var i = 0; i < params.length; i++) {
            var inputName = step2Template + params[i].toLowerCase();
            var input = 'input[name="' + inputName + '"]';
            var param = null;
            switch(i) {
                case 0:
                    param = variantsValues.param1[userVariant - 1];
                    break;
                case 1:
                    param = variantsValues.param2[userVariant - 1];
                    break;
                case 2:
                    param = variantsValues.param3[userVariant - 1];
                    break;
                case 3:
                    param = variantsValues.param4[userVariant - 1];
                    break;
            }
            VStep2.addValidator($(input), param);
        }
        VStep2.setStrictMode(true).setIgnoreCase(false).enableStepFinishAlert(true);
        VStep2.addAreaSteps(order, order.length);

        $('button.check').click(function () {
            VStep2.setAttemptsOnCheckButton($(this));
            VStep2.validate();
            if(VStep2.getFulfilled()) {
                $(".step2-inputs").css("visibility", "hidden");
                $("#mainImg").attr("src", "img/step2/5-" + userVariant + ".png")
            }
        });
    };

    this.mustache = function () {
        figureName = getFigureName();
        params = getParams(figureName);
        return {
            FIGURE_NAME: I18N.getConstants()[figureName],
            STEP2_TABL_HEADER2: I18N.getConstants()[params[0]],
            STEP2_TABL_HEADER3: I18N.getConstants()[params[1]],
            STEP2_TABL_HEADER4: I18N.getConstants()[params[2]],
            STEP2_TABL_HEADER5: I18N.getConstants()[params[3]],

            STEP2_INPUT1: new TextInput(step2Template + params[0].toLowerCase())
            .placeholder("")
            .autocomplete("off")
            .render(),
            STEP2_INPUT2: new TextInput(step2Template + params[1]?.toLowerCase())
            .placeholder("")
            .autocomplete("off")
            .render(),
            STEP2_INPUT3: new TextInput(step2Template + params[2]?.toLowerCase())
            .placeholder("")
            .autocomplete("off")
            .render(),
            STEP2_INPUT4: new TextInput(step2Template + params[3]?.toLowerCase())
            .placeholder("")
            .autocomplete("off")
            .render()
        }
    }

    function getFigureName() {
        switch(userVariant) {
            case "1":
            case "8":
                return "CONE";
            case "2":
            case "9":
                return "SPHERE";
            case "3":
            case "10":
                return "CYLINDER";
            case "4":
                return "TUBE";
            case "5":
                return "TORUS";
            case "6":
                return "PYRAMID";
            case "7":
                return "TEAPOT";
            default:
                return "UNKNOWN";
        }
    }
    
    function getParams(name) {
        switch(name) {
            case "CONE":
                return ["RADIUS1", "RADIUS2", "HEIGHT"];
            case "SPHERE":
                return ["RADIUS", "SEMICIRCLE"];
            case "TORUS":
            case "CYLINDER":
                return ["RADIUS", "HEIGHT", "SIDES"];
            case "TUBE":
                return ["RADIUS1", "RADIUS2", "HEIGHT", "SIDES"];
            case "PYRAMID":
                return ["HEIGHT", "WIDTH", "DEPTH"];
            case "TEAPOT":
                return ["RADIUS"];
            default:
                return [];
        }
    }
    
    function setTableValues(values) {
        // remove empty coloums
        const maxTableSize = 5;
        for(var i = maxTableSize; i > params.length + 1; i--) {
            $("#valuesTable th:nth-child(" + i + "),#valuesTable td:nth-child(" + i + ")").remove();
        }
        $("#variant").text($("#variant").text() + userVariant);
        $("#param1").html(values.param1[userVariant - 1]);
        $("#param2").html(values.param2[userVariant - 1]);
        $("#param3").html(values.param3[userVariant - 1]);
        $("#param4").html(values.param4[userVariant - 1]);
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
                    VStep2.validateArea();
                }
            }
        )
    }
    
    function updateImage(order, changeImageOrder) {
        if(changeImageOrder[0] == order[0]){
            var img = (currentImageNumber + 1) >= 4 ? (++currentImageNumber + "-" + userVariant) : ++currentImageNumber;
            $("#mainImg").attr("src", "img/step2/" + img + ".png")
            changeImageOrder.shift();
        }
    }
    
    function updateAreas(areasInImg) {
        areasInImg.shift();
        $(".part:lt(" + areasInImg[0] + ")").show();
        if(areasInImg.length == 0){
            $(".step2-inputs").css("visibility", "visible");
        }
    }
};