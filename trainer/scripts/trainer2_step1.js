var VStep1;
const imgPath = "img/trainer2-step1/";

var trainer2_step1 = function () {
  this.postDispatch = function () {
    $("#endTrainer").removeClass("disabled btn-default");
    $("button.check").css("display", "none");
    var options = [4, 3, 5, 9, 10, 2, 8, 6, 1, 7];
    var order = [options[userVariant - 1]];
    var imgInfo = {
      path: [imgPath + "2-" + userVariant.toString() + ".png"],
      order: [options[userVariant - 1]],
    };
    VStep1 = new Validator();
    VStep1.addSvgStep(order, imgInfo, null, () => {
      $("div.validation-alert-success").fadeIn();
      Scorer.addScore(25);
      Rotator.enableNextButton();
    });
    VStep1.setStrictMode(true).enableStepFinishAlert(true).setIgnoreCase(false);
  };

  this.mustache = function () {
    return {
      FIGURE_NAME: I18N.getConstants()[getFigureName()],
    };
  };

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
