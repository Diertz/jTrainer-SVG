var VStep2;
const imgPath = "img/trainer2-step2/";

var trainer2_step2 = function () {
  this.preDispatch = function () {
    $("#step1").empty();
  };
  this.postDispatch = function () {
    $(":input").attr("autocomplete", "off");
    var options = {
      x: [50, 10, -25, 15, 20, -30, 10, 5, 20, -10],
      y: [25, 10, 40, -30, 20, -20, -10, 5, 25, -50],
      z: [-50, 10, 30, 10, 15, -10, -20, 10, 30, -10],
    };
    var order = [5, 10];
    var imgInfo = {
      path: [imgPath + "2.png", imgPath + "3.png"],
      order: [5, 10],
    };
    setTableValues(options);
    VStep2 = new Validator();
    VStep2.addValidator($('input[name="step2-input-x"]'), options.x[userVariant - 1]);
    VStep2.addValidator($('input[name="step2-input-y"]'), options.y[userVariant - 1]);
    VStep2.addValidator($('input[name="step2-input-z"]'), options.z[userVariant - 1]);
    VStep2.setStrictMode(true).enableStepFinishAlert(true).setIgnoreCase(false);
    addSvgStep(order, imgInfo, null, VStep2, () => {
      $(".step2-inputs").css("visibility", "visible");
    });
    $("button.check").click(function () {
      const saveAttempts = VStep2.getAttempts();
      VStep2.setAttemptsOnCheckButton($(this));
      VStep2.validate();
      if (saveAttempts == VStep2.getAttempts() && VStep2.getAttempts() > 0) {
        $(".step2-inputs").css("visibility", "hidden");
        $("#mainImg").attr("src", "img/trainer2-step2/4-" + userVariant + ".png");
        $("button.check").off("click");
      }
    });
  };

  this.mustache = function () {
    return {
      STEP2_INPUT_X: new TextInput("step2-input-x")
        .placeholder("")
        .render(),
      STEP2_INPUT_Y: new TextInput("step2-input-y")
        .placeholder("")
        .render(),
      STEP2_INPUT_Z: new TextInput("step2-input-z")
        .placeholder("")
        .render(),
    };
  };

  function setTableValues(values) {
    $("#x_value").html(values.x[userVariant - 1]);
    $("#y_value").html(values.y[userVariant - 1]);
    $("#z_value").html(values.z[userVariant - 1]);
  }
};
