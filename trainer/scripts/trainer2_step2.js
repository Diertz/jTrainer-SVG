var VStep2;
var currentImageNumber = 1;

var trainer2_step2 = function () {
  this.postDispatch = function () {
    $("#step1").empty();
    var variantsValues = {
      x: [50, 10, -25, 15, 20, -30, 10, 5, 20, -10],
      y: [25, 10, 40, -30, 20, -20, -10, 5, 25, -50],
      z: [-50, 10, 30, 10, 15, -10, -20, 10, 30, -10],
    };
    var order = ["5", "10"];
    setTableValues(variantsValues, userVariant);

    VStep2 = new Validator();
    VStep2.addValidator(
      $('input[name="step2-input-x"]'),
      variantsValues.x[userVariant - 1]
    )
      .addValidator(
        $('input[name="step2-input-y"]'),
        variantsValues.y[userVariant - 1]
      )
      .addValidator(
        $('input[name="step2-input-z"]'),
        variantsValues.z[userVariant - 1]
      );
    VStep2.setStrictMode(true).enableStepFinishAlert(true).addAreaSteps("1", 1);

    $(".part").click(function () {
      var id = $(this).attr("id");
      if (order[0] == id) {
        order.shift();
        $(this).css("fill", "green");
        $("#mainImg").attr(
          "src",
          "img/trainer2-step2/" + ++currentImageNumber + ".png"
        );
        if (order.length == 0) {
          $(".part").css("visibility", "hidden");
          $(".step2-inputs").css("visibility", "visible");
        }
      } else {
        $(this).css("fill", "red");
        var attempts = VStep2.getAttempts() - 1;
        if (attempts == 0) {
          $(".part").hide();
          $("div.validation-alert-danger").fadeIn();
          Rotator.enableNextButton();
        } else {
          VStep2.setAttempts(attempts);
        }
      }
    });

    $("button.check").click(function () {
      VStep2.setAttemptsOnCheckButton($(this));
      VStep2.validate();
      if (VStep2.getFulfilled() && VStep2.getAttempts() > 0) {
        $(".step2-inputs").css("visibility", "hidden");
        $("#mainImg").attr(
          "src",
          "img/trainer2-step2/4-" + userVariant + ".png"
        );
      }
    });
  };

  this.mustache = function () {
    return {
      STEP2_INPUT_X: new TextInput("step2-input-x")
        .placeholder("")
        .autocomplete("off")
        .render(),
      STEP2_INPUT_Y: new TextInput("step2-input-y")
        .placeholder("")
        .autocomplete("off")
        .render(),
      STEP2_INPUT_Z: new TextInput("step2-input-z")
        .placeholder("")
        .autocomplete("off")
        .render(),
    };
  };

  function setTableValues(values, variant) {
    $("#x_value").html(values.x[variant - 1]);
    $("#y_value").html(values.y[variant - 1]);
    $("#z_value").html(values.z[variant - 1]);
  }
};
