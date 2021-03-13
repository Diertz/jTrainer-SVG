var VStep5;
var currentImageNumber = 1;

var trainer2_step1 = function () {
  this.postDispatch = function () {
    $("button.check").click(function () {
      VStep5.setAttemptsOnCheckButton($(this));
      VStep5.validate();
    });
  };

  this.mustache = function () {
    return {};
  };
};
