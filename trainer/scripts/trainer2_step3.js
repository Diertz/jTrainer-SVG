var VStep3;
var currentImageNumber = 1;

var trainer2_step3 = function () {
  this.postDispatch = function () {
    $("#step2").empty();
    $("button.check").css("display", "none");
    $(".part:gt(14)").hide();
    var order = ["13", "16", "17", "18", "19", "3", "20", "22"];
    var partIdsBorders = {
      min: ["15", "16", "17", "18", "0", "19", "21"],
      max: ["19", "19", "19", "19", "15", "21", "22"],
    };
    area_click(order, partIdsBorders);
    VStep3 = new Validator();
    VStep3.setStrictMode(true).enableStepFinishAlert(true);
  };

  this.mustache = function () {
    return {};
  };

  function area_click(order, partIdsBorders) {
    $(".part").click(function () {
      var id = $(this).attr("id");
      if (order[0] == id) {
        $(this).css("fill", "green");
        $("#mainImg").attr(
          "src",
          "img/trainer2-step3/" + ++currentImageNumber + ".png"
        );
        $(".part").css("fill", "blue");
        showAreasFromDiapozon(partIdsBorders.min[0], partIdsBorders.max[0]);
        order.shift();
        if (order.length == 0) {
          $("div.validation-alert-success").fadeIn();
          Scorer.addScore(25);
          Rotator.enableNextButton();
        } else {
          partIdsBorders.min.shift();
          partIdsBorders.max.shift();
        }
      } else {
        $(this).css("fill", "red");
        var attempts = VStep3.getAttempts() - 1;
        if (attempts == 0) {
          $(".part").hide();
          $("div.validation-alert-danger").fadeIn();
          Rotator.enableNextButton();
        } else {
          VStep3.setAttempts(attempts);
        }
      }
    });
  }

  function showAreasFromDiapozon(minId, maxId) {
    $(".part:gt(0)").hide();
    $(".part:lt(" + maxId + ")").show();
    $(".part:lt(" + minId + ")").hide();
  }
};
