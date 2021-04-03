var VStep4;
var currentImageNumber = 1;

var trainer2_step4 = function () {
  this.preDispatch = function () {
    $("#step3").empty();
  };
  this.postDispatch = function () {
    $("button.check").css("display", "none");
    $(".part:gt(13)").hide();
    var variantsValues = ["50", "51", "", "52", "50", "51", "", "52", "50", "51"];
    var order = ["2", "28", "40", "48|49", variantsValues[userVariant - 1], "53"];
    if (variantsValues[userVariant - 1] == "") {
      order.splice(4, 1);
    }
    var partIdsBorders = {
      min: ["14", "39", "47", "49", "52"],
      max: ["39", "47", "49", "53", "53"],
    };
    VStep4 = new Validator();
    VStep3.setStrictMode(true).enableStepFinishAlert(true).addSvgScore(order).setIgnoreCase(false);
    area_click(order, partIdsBorders);
  };

  this.mustache = function () {
    return {
      ALIGNING_VALUE: I18N.getConstants()[getAligningValue()],
    };
  };

  function area_click(order, partIdsBorders) {
    $(".part").click(function () {
      var id = $(this).attr("id");
      var orders = order[0].split("|");
      if (orders.indexOf(id) != -1) {
        $(this).css("fill", "green");
        var img = getImg();
        if (currentImageNumber == 5 && img == "3") {
          currentImageNumber++;
        }
        var imgName =
          ++currentImageNumber >= 6
            ? currentImageNumber + "-" + img
            : currentImageNumber;
        $("#mainImg").attr("src", "img/trainer2-step4/" + imgName + ".png");
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
        var attempts = VStep4.getAttempts() - 1;
        if (attempts == 0) {
          $(".part").hide();
          $("div.validation-alert-danger").fadeIn();
          Rotator.enableNextButton();
        } else {
          VStep4.setAttempts(attempts);
        }
      }
    });
  }

  function showAreasFromDiapozon(minId, maxId) {
    $(".part:gt(0)").hide();
    $(".part:lt(" + maxId + ")").show();
    $(".part:lt(" + minId + ")").hide();
  }

  function getAligningValue() {
    switch (userVariant) {
      case "1":
      case "5":
      case "9":
        return "MINIMUM";
      case "2":
      case "6":
      case "10":
        return "CENTER";
      case "3":
      case "7":
        return "POINT";
      case "4":
      case "8":
        return "MAXIMUM";
    }
  }

  function getImg() {
    var aligningValue = getAligningValue();
    switch (aligningValue) {
      case "MINIMUM":
        return "1";
      case "CENTER":
        return "2";
      case "POINT":
        return "3";
      case "MAXIMUM":
        return "4";
    }
  }
};
