var VStep4;
const imgPath = "img/trainer1-step4/";
let figureName;
let params;
const step4Template = "step4-input-";

var trainer1_step4 = function () {
  this.preDispatch = function () {
    $("#step3").empty();
  };
  this.postDispatch = function () {
    $(":input").attr("autocomplete", "off");
    $(".step4-inputs:gt(" + (params.length - 1).toString() + ")").remove();
    $(".part:gt(5)").hide();
    var options = {
      type: [37, 31, 38, 32, 39, 33, 40, 34, 41, 42],
      param1: [20, 50, 30, 25, 15, 30, 60, 3, 65, 45],
      param2: [20, 50, 40, 50, 60, 50, 70, 35, -65, 60],
      param3: [1, 50, 5, 15, null, 15, 10, 5, 65, 60],
      param4: [5, 5, null, null, null, null, 10, 40, 10, 35],
      param5: [null, null, null, null, null, null, 40, null, 10, null],
      param6: [null, null, null, null, null, null, null, null, 10, null],
      param7: [null, null, null, null, null, null, null, null, 25, null],
    };
    var typeOrder = options.type[userVariant - 1];
    var order = [1, 7, 14, 15, typeOrder];
    var imgInfo = {
      path: [imgPath + "2.png", imgPath + "3.png", imgPath + "4.png", imgPath + "5.png", imgPath + "6-" + userVariant + ".png"],
      order: order.slice(),
    };
    var partIdsBorders = {
      min: [6, 13, 14, 29],
      max: [13, 14, 29, 42],
    };
    setTableValues(options);
    VStep4 = new Validator();
    for (var i = 0; i < params.length; i++) {
      var inputName = step4Template + params[i].toLowerCase();
      var input = 'input[name="' + inputName + '"]';
      var param = null;
      switch (i) {
        case 0:
          param = options.param1[userVariant - 1];
          break;
        case 1:
          param = options.param2[userVariant - 1];
          break;
        case 2:
          param = options.param3[userVariant - 1];
          break;
        case 3:
          param = options.param4[userVariant - 1];
          break;
        case 4:
          param = options.param5[userVariant - 1];
          break;
        case 5:
          param = options.param6[userVariant - 1];
          break;
        case 6:
          param = options.param7[userVariant - 1];
          break;
      }
      VStep4.addValidator($(input), param);
    }
    VStep4.setStrictMode(true).setIgnoreCase(false).enableStepFinishAlert(true);
    addSvgStep(order, imgInfo, partIdsBorders, VStep4, () => {
      $(".step4-inputs").css("visibility", "visible");
    });
    $("button.check").click(function () {
      const saveAttempts = VStep4.getAttempts();
      VStep4.setAttemptsOnCheckButton($(this));
      VStep4.validate();
      if (saveAttempts == VStep4.getAttempts() && VStep4.getAttempts() > 0) {
        $(".step4-inputs").css("visibility", "hidden");
        $("#mainImg").attr("src", "img/trainer1-step4/7-" + userVariant + ".png");
        $("button.check").off("click");
      }
    });
  };

  this.mustache = function () {
    figureName = getFigureName();
    params = getParams(figureName);
    console.debug(params);
    return {
      FIGURE_NAME: I18N.getConstants()[figureName],
      STEP4_TABL_HEADER2: I18N.getConstants()[params[0]],
      STEP4_TABL_HEADER3: I18N.getConstants()[params[1]],
      STEP4_TABL_HEADER4: I18N.getConstants()[params[2]],
      STEP4_TABL_HEADER5: I18N.getConstants()[params[3]],
      STEP4_TABL_HEADER6: I18N.getConstants()[params[4]],
      STEP4_TABL_HEADER7: I18N.getConstants()[params[5]],
      STEP4_TABL_HEADER8: I18N.getConstants()[params[6]],
      STEP4_INPUT1: new TextInput(step4Template + params[0].toLowerCase())
        .placeholder("")
        .render(),
      STEP4_INPUT2: new TextInput(step4Template + params[1].toLowerCase())
        .placeholder("")
        .render(),
      STEP4_INPUT3: new TextInput(step4Template + params[2]?.toLowerCase())
        .placeholder("")
        .render(),
      STEP4_INPUT4: new TextInput(step4Template + params[3]?.toLowerCase())
        .placeholder("")
        .render(),
      STEP4_INPUT5: new TextInput(step4Template + params[4]?.toLowerCase())
        .placeholder("")
        .render(),
      STEP4_INPUT6: new TextInput(step4Template + params[5]?.toLowerCase())
        .placeholder("")
        .render(),
      STEP4_INPUT7: new TextInput(step4Template + params[6]?.toLowerCase())
        .placeholder("")
        .render(),
    };
  };

  function getFigureName() {
    switch (userVariant) {
      case "1":
        return "TORUS_KNOT";
      case "2":
        return "CHAMFER_BOX";
      case "3":
        return "CHAMFER_CYL";
      case "4":
        return "OIL_TANK";
      case "5":
        return "CAPSULE";
      case "6":
        return "SPINDLE";
      case "7":
        return "L_EXT";
      case "8":
        return "GENGON";
      case "9":
        return "C_EXT";
      case "10":
        return "PRISM";
    }
  }

  function getParams(name) {
    switch (name) {
      case "TORUS_KNOT":
        return ["BASE_CURVE_RADIUS", "P", "Q", "CROSS_SECTION_RADIUS"];
      case "CHAMFER_BOX":
        return ["LENGTH", "WIDTH", "HEIGHT", "FILLET"];
      case "CHAMFER_CYL":
        return ["RADIUS", "HEIGHT", "FILLET"];
      case "OIL_TANK":
      case "SPINDLE":
        return ["RADIUS", "HEIGHT", "CAP_HEIGHT"];
      case "CAPSULE":
        return ["RADIUS", "HEIGHT"];
      case "L_EXT":
        return [
          "SIDE_LENGTH",
          "FRONT_LENGTH",
          "SIDE_WIDTH",
          "FRONT_WIDTH",
          "HEIGHT",
        ];
      case "GENGON":
        return ["SIDES", "RADIUS", "FILLET", "HEIGHT"];
      case "C_EXT":
        return [
          "BACK_LENGTH",
          "SIDE_LENGTH",
          "FRONT_LENGTH",
          "BACK_WIDTH",
          "SIDE_WIDTH",
          "FRONT_WIDTH",
          "HEIGHT",
        ];
      case "PRISM":
        return ["SIDE1_LENGTH", "SIDE2_LENGTH", "SIDE3_LENGTH", "HEIGHT"];
    }
  }

  function setTableValues(values) {
    const maxTableSize = 8;
    for (var i = maxTableSize; i > params.length + 1; i--) {
      $("#valuesTable th:nth-child(" + i + "),#valuesTable td:nth-child(" + i + ")").remove();
    }
    $("#variant").text($("#variant").text() + userVariant);
    $("#param1").html(values.param1[userVariant - 1]);
    $("#param2").html(values.param2[userVariant - 1]);
    $("#param3").html(values.param3[userVariant - 1]);
    $("#param4").html(values.param4[userVariant - 1]);
    $("#param5").html(values.param5[userVariant - 1]);
    $("#param6").html(values.param6[userVariant - 1]);
    $("#param7").html(values.param7[userVariant - 1]);
  }
};
