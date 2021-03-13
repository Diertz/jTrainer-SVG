var VStep3;
var currentImageNumber = 1;

var trainer1_step3 = function () {
  this.postDispatch = function () {
    $("#step2").empty();
    $(".part:gt(5)").hide();

    var order = ["1", "7", "14", "15", "30"];
    var areasInImg = ["6", "13", "14", "28"];
    var changeImageOrder = ["1", "7", "14", "15", "30"];
    area_click(order, changeImageOrder, areasInImg);

    VStep3 = new Validator();
    VStep3.addValidator($('input[name="step3-input-familyP"]'), 0.5)
      .addValidator($('input[name="step3-input-familyQ"]'), 0.5)
      .addValidator($('input[name="step3-input-axisP"]'), 20)
      .addValidator($('input[name="step3-input-axisQ"]'), 20)
      .addValidator($('input[name="step3-input-axisR"]'), 20)
      .addValidator($('input[name="step3-input-radius"]'), 35)
      .setStrictMode(true)
      .setIgnoreCase(false)
      .enableStepFinishAlert(true)
      .addAreaSteps(order, order.length);

    $("button.check").click(function () {
      VStep3.setAttemptsOnCheckButton($(this));
      VStep3.validate();
      if (VStep3.getFulfilled() && VStep3.getAttempts() > 0) {
        $(".step3-inputs").css("visibility", "hidden");
        $("#mainImg").attr("src", "img/trainer1-step3/7.png");
      }
    });
  };

  this.mustache = function () {
    return {
      STEP3_INPUT_FAMILYP: new TextInput("step3-input-familyP")
        .placeholder("")
        .autocomplete("off")
        .render(),
      STEP3_INPUT_FAMILYQ: new TextInput("step3-input-familyQ")
        .placeholder("")
        .autocomplete("off")
        .render(),
      STEP3_INPUT_AXISP: new TextInput("step3-input-axisP")
        .placeholder("")
        .autocomplete("off")
        .render(),
      STEP3_INPUT_AXISQ: new TextInput("step3-input-axisQ")
        .placeholder("")
        .autocomplete("off")
        .render(),
      STEP3_INPUT_AXISR: new TextInput("step3-input-axisR")
        .placeholder("")
        .autocomplete("off")
        .render(),
      STEP3_INPUT_RADIUS: new TextInput("step3-input-radius")
        .placeholder("")
        .autocomplete("off")
        .render(),
    };
  };

  function area_click(order, changeImageOrder, areasInImg) {
    $(".part").click(function () {
      if (order[0] == $(this).attr("id")) {
        $(this).css("fill", "green");
        updateImage(order, changeImageOrder);
        updateAreas(areasInImg);
        order.shift();
      } else {
        $(this).css("fill", "red");
        VStep3.validateArea();
      }
    });
  }

  function updateImage(order, changeImageOrder) {
    if (changeImageOrder[0] == order[0]) {
      $("#mainImg").attr(
        "src",
        "img/trainer1-step3/" + ++currentImageNumber + ".png"
      );
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
    if (areasInImg.length == 0 && !temp) {
      $(".part:gt(0)").hide();
      $(".step3-inputs").css("visibility", "visible");
    }
  }
};
