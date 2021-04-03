var VStep1;
const imgPath = "img/trainer1-step1/";

var trainer1_step1 = function () {
  this.postDispatch = function () {
    $("#endTrainer").removeClass("disabled btn-default");
    $(".part:gt(5)").hide();
    $(".part:gt(24)").css("opacity", "0");
    var options = {
      length: [50, 20, 15, 13, 25, 10, 55, 20, 10, 15],
      width: [30, 80, 23, 24, 35, 10, 44, 30, 15, 45],
      height: [25, 10, 60, 10, 45, 10, 62, 20, 90, 50],
      color: [75, 76, 77, 79, 80, 81, 82, 85, 86, 88],
    };
    var colorAreaId = options.color[userVariant - 1];
    var order = [1, 7, 14, 25, colorAreaId];
    var imgInfo = {
      path: [imgPath + "2.png", imgPath + "3.png", imgPath + "4.png", imgPath + "5.png", imgPath + "6-" + userVariant + ".png"],
      order: order.slice(),
    };
    var partIdsBorders = {
      min: [6, 13, 24, 25],
      max: [13, 24, 25, 89],
    };
    setTableValues(options);
    VStep1 = new Validator();
    VStep1.addValidator($('input[name="step1-input-length"]'), options.length[userVariant - 1]);
    VStep1.addValidator($('input[name="step1-input-width"]'), options.width[userVariant - 1]);
    VStep1.addValidator($('input[name="step1-input-height"]'), options.height[userVariant - 1]);
    VStep1.addSvgStep(order, imgInfo, partIdsBorders, () => {
      $(".step1-inputs").css("visibility", "visible");
    });
    VStep1.setStrictMode(true).enableStepFinishAlert(true).setIgnoreCase(false);
    $("button.check").click(function () {
      VStep1.setAttemptsOnCheckButton($(this));
      VStep1.validate();
      if (VStep1.getFulfilled() && VStep1.getAttempts() > 0) {
        $(".step1-inputs").css("visibility", "hidden");
        $("#mainImg").attr("src", "img/trainer1-step1/7-" + userVariant + ".png");
        $("button.check").off("click");
      }
    });
  };

  this.mustache = function () {
    return {
      STEP1_INPUT_LENGTH: new TextInput("step1-input-length")
        .placeholder("")
        .autocomplete("off")
        .render(),
      STEP1_INPUT_WIDTH: new TextInput("step1-input-width")
        .placeholder("")
        .autocomplete("off")
        .render(),
      STEP1_INPUT_HEIGHT: new TextInput("step1-input-height")
        .placeholder("")
        .autocomplete("off")
        .render(),
    };
  };

  function setTableValues(values) {
    $("#boxlength").html(values.length[userVariant - 1]);
    $("#boxwidth").html(values.width[userVariant - 1]);
    $("#boxheight").html(values.height[userVariant - 1]);
    $("#boxcolor").attr("src", "img/trainer1-step1/colors/" + userVariant + ".png");
    $("#variant").text($("#variant").text() + userVariant);
  }
};
