var VStep2;
const imgPath = "img/trainer1-step2/";
let figureName;
let params;
const step2Template = "step2-input-";

var trainer1_step2 = function () {
  this.preDispatch = function () {
    $("#step1").empty();
  };
  this.postDispatch = function () {
    $(":input").attr("autocomplete", "off");
    $(".step2-inputs:gt(" + (params.length - 1).toString() + ")").remove();
    $(".part:gt(5)").hide();
    var options = {
      type: [20, 15, 16, 22, 17, 23, 18, 20, 15, 16],
      param1: [40, 45, 30, 45, 40, 40, 25, 35, 30, 3],
      param2: [0, 0, 30, 40, 15, 20, null, 30, 0.5, 30],
      param3: [10, null, 50, 20, 20, 35, null, 30, null, 50],
      param4: [null, null, null, 30, null, null, null, null, null, null],
    };
    var typeOrder = options.type[userVariant - 1];
    var order = [1, 7, typeOrder];
    var imgInfo = {
      path: [imgPath + "2.png", imgPath + "3.png", imgPath + "4-" + userVariant + ".png"],
      order: order.slice(),
    };
    var partIdsBorders = {
      min: [6, 13, 24],
      max: [13, 24, 25],
    };
    setTableValues(options);
    VStep2 = new Validator();
    for (var i = 0; i < params.length; i++) {
      var inputName = step2Template + params[i].toLowerCase();
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
      }
      VStep2.addValidator($(input), param);
    }
    VStep2.setStrictMode(true).enableStepFinishAlert(true).setIgnoreCase(false);
    addSvgStep(order, imgInfo, partIdsBorders, VStep2, () => {
      $(".step2-inputs").css("visibility", "visible");
    });

    $("button.check").click(function () {
      const saveAttempts = VStep2.getAttempts();
      VStep2.setAttemptsOnCheckButton($(this));
      VStep2.validate();
      if (saveAttempts == VStep2.getAttempts() && VStep2.getAttempts() > 0) {
        $(".step2-inputs").css("visibility", "hidden");
        $("#mainImg").attr("src", "img/trainer1-step2/5-" + userVariant + ".png");
        $("button.check").off("click");
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
        .render(),
      STEP2_INPUT2: new TextInput(step2Template + params[1]?.toLowerCase())
        .placeholder("")
        .render(),
      STEP2_INPUT3: new TextInput(step2Template + params[2]?.toLowerCase())
        .placeholder("")
        .render(),
      STEP2_INPUT4: new TextInput(step2Template + params[3]?.toLowerCase())
        .placeholder("")
        .render(),
    };
  };

  function getFigureName() {
    switch (userVariant) {
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
    }
  }

  function getParams(name) {
    switch (name) {
      case "CONE":
        return ["RADIUS1", "RADIUS2", "HEIGHT"];
      case "SPHERE":
        return ["RADIUS", "SEMICIRCLE"];
      case "TORUS":
        return ["RADIUS1", "RADIUS2", "SIDES"];
      case "CYLINDER":
        return ["RADIUS", "HEIGHT", "SIDES"];
      case "TUBE":
        return ["RADIUS1", "RADIUS2", "HEIGHT", "SIDES"];
      case "PYRAMID":
        return ["WIDTH", "DEPTH", "HEIGHT"];
      case "TEAPOT":
        return ["RADIUS"];
    }
  }

  function setTableValues(values) {
    // remove empty coloums
    const maxTableSize = 5;
    for (var i = maxTableSize; i > params.length + 1; i--) {
      $("#valuesTable th:nth-child(" + i + "),#valuesTable td:nth-child(" + i +")").remove();
    }
    $("#variant").text($("#variant").text() + userVariant);
    $("#param1").html(values.param1[userVariant - 1]);
    $("#param2").html(values.param2[userVariant - 1]);
    $("#param3").html(values.param3[userVariant - 1]);
    $("#param4").html(values.param4[userVariant - 1]);
  }
};
