function addSvgStep (order, imgInfo, partsBorders, vstep, callback) {
    $(".part").click(function () {
      if (order[0] == $(this).attr("id")) {
        $(this).css("fill", "green");
        if (order[0] == imgInfo.order[0]) {
          $("#mainImg").attr("src", imgInfo.path[0]);
          imgInfo.order.shift();
          imgInfo.path.shift();
        }
        if (partsBorders) {
          $(".part").css("fill", "blue");
          $(".part:gt(0)").hide();
          $(".part:lt(" + partsBorders.max[0] + ")").show();
          $(".part:lt(" + partsBorders.min[0] + ")").hide();
          partsBorders.min.shift();
          partsBorders.max.shift();
        }
        order.shift();
        if (order.length == 0) {
          $(".part").hide();
          callback();
        }
      } else {
        $(this).css("fill", "red");
        var attempts = vstep.getAttempts() - 1;
        if (attempts == 0) {
          $(".part").hide();
          $("div.validation-alert-danger").fadeIn();
          Rotator.enableNextButton();
        } else {
            vstep.setAttempts(attempts);
        }
      }
    });
  }
