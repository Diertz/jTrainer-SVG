var VStep1;
var currentImageNumber = 1;

var trainer2_step1 = function () {
  this.postDispatch = function () {
    $("#endTrainer").removeClass("disabled btn-default");
    $("button.check").css("display", "none");
    var variantsValues = [4, 3, 5, 9, 10, 2, 8, 6, 1, 7];
    var order = [variantsValues[userVariant - 1]];
    var changeImageOrder = [variantsValues[userVariant - 1]];
    area_click(order, changeImageOrder);
    VStep1 = new Validator();
    VStep1.setStrictMode(true).enableStepFinishAlert(true);
  };

  this.mustache = function () {
    return {
      FIGURE_NAME: I18N.getConstants()[getFigureName()],
    };
  };

  function area_click(order, changeImageOrder) {
    $(".part").click(function () {
      if (order[0] == $(this).attr("id")) {
        $(this).css("fill", "green");
        updateImage(order, changeImageOrder);
        $(".part").hide();
        $("div.validation-alert-success").fadeIn();
        Scorer.addScore(25);
        Rotator.enableNextButton();
      } else {
        $(this).css("fill", "red");
        var attempts = VStep1.getAttempts() - 1;
        if (attempts == 0) {
          $(".part").hide();
          $("div.validation-alert-danger").fadeIn();
          Rotator.enableNextButton();
        } else {
          VStep1.setAttempts(attempts);
        }
      }
    });
  }

  function updateImage(order, changeImageOrder) {
    if (changeImageOrder[0] == order[0]) {
      var img =
        currentImageNumber + 1 >= 2
          ? ++currentImageNumber + "-" + userVariant
          : ++currentImageNumber;
      $("#mainImg").attr("src", "img/trainer2-step1/" + img + ".png");
      changeImageOrder.shift();
    }
  }

  function getFigureName() {
    switch (userVariant) {
      case "1":
        return "BOX";
      case "2":
        return "CONE";
      case "3":
        return "SPHERE";
      case "4":
        return "CYLINDER";
      case "5":
        return "TUBE";
      case "6":
        return "TORUS";
      case "7":
        return "PYRAMID";
      case "8":
        return "TEAPOT";
      case "9":
        return "PLANE";
      case "10":
        return "TEXT_PLUS";
    }
  }
};
