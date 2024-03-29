var VStep3;
const imgPath = "img/trainer1-step3/";

var trainer1_step3 = function () {
  this.preDispatch = function () {
    $("#step2").empty();
  };
  this.postDispatch = function () {
    $(":input").attr("autocomplete", "off");
    $(".part:gt(5)").hide();
    var order = [1, 7, 14, 15, 30];
    var imgInfo = {
      path: getImgPathArray(),
      order: order.slice(),
    };
    var partIdsBorders = {
      min: [6, 13, 14, 29],
      max: [13, 14, 29, 42],
    };
    VStep3 = new Validator();
    VStep3.addValidator($('input[name="step3-input-familyP"]'), 0.5)
    VStep3.addValidator($('input[name="step3-input-familyQ"]'), 0.5)
    VStep3.addValidator($('input[name="step3-input-axisP"]'), 20)
    VStep3.addValidator($('input[name="step3-input-axisQ"]'), 20)
    VStep3.addValidator($('input[name="step3-input-axisR"]'), 20)
    VStep3.addValidator($('input[name="step3-input-radius"]'), 35)
    VStep3.setStrictMode(true).enableStepFinishAlert(true).setIgnoreCase(false);
    addSvgStep(order, imgInfo, partIdsBorders, VStep3, () => {
      $(".step3-inputs").css("visibility", "visible");
    });
    $("button.check").click(function () {
      const saveAttempts = VStep3.getAttempts();
      VStep3.setAttemptsOnCheckButton($(this));
      VStep3.validate();
      if (saveAttempts == VStep3.getAttempts() && VStep3.getAttempts() > 0) {
        $(".step3-inputs").css("visibility", "hidden");
        $("#mainImg").attr("src", "img/trainer1-step3/7.png");
        $("button.check").off("click");
      }
    });
  };

  this.mustache = function () {
    return {
      STEP3_INPUT_FAMILYP: new TextInput("step3-input-familyP")
        .placeholder("")
        .render(),
      STEP3_INPUT_FAMILYQ: new TextInput("step3-input-familyQ")
        .placeholder("")
        .render(),
      STEP3_INPUT_AXISP: new TextInput("step3-input-axisP")
        .placeholder("")
        .render(),
      STEP3_INPUT_AXISQ: new TextInput("step3-input-axisQ")
        .placeholder("")
        .render(),
      STEP3_INPUT_AXISR: new TextInput("step3-input-axisR")
        .placeholder("")
        .render(),
      STEP3_INPUT_RADIUS: new TextInput("step3-input-radius")
        .placeholder("")
        .render(),
    };
  };

  function getImgPathArray() {
    var array = [];
    for (var i = 2; i <= 7; i++) {
      array[i - 2] = imgPath + i.toString() + ".png";
    }
    return array;
  }
};
