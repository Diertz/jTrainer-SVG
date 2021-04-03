var VStep3;
const imgPath = "img/trainer2-step3/";

var trainer2_step3 = function () {
  this.preDispatch = function () {
    $("#step2").empty();
  };
  this.postDispatch = function () {
    $("button.check").css("display", "none");
    $(".part:gt(14)").hide();
    var order = [13, 16, 17, 18, 19, 3, 20, 22];
    var imgInfo = {
      path: getImgPathArray(),
      order: order.slice(),
    };
    var partIdsBorders = {
      min: [15, 16, 17, 18, 0, 19, 21],
      max: [19, 19, 19, 19, 15, 21, 22],
    };
    VStep3 = new Validator();
    VStep3.addSvgStep(order, imgInfo, partIdsBorders, () => {
      $("div.validation-alert-success").fadeIn();
      Scorer.addScore(25);
      Rotator.enableNextButton();
    });
    VStep3.setStrictMode(true).enableStepFinishAlert(true).setIgnoreCase(false);
  };

  this.mustache = function () {
    return {};
  };

  function getImgPathArray() {
    var array = [];
    for (var i = 2; i <= 9; i++) {
      array[i - 2] = imgPath + i.toString() + ".png";
    }
    return array;
  }
};
