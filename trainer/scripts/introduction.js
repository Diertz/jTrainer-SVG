var userVariant;
var introduction = function () {
  this.postDispatch = function () {
    $("#endTrainer").addClass("disabled btn-default");
    $("div.flag-icon").each(function () {
      $(this).attr(
        "onclick",
        "window.location.href = '?lang=trainer1_' + $(this).attr(\"id\")" // need to change trainerNUMBER_ acording to to current trainer
      );
    });
  };
  this.mustache = function () {
    return {
      STEPS_COUNT: Rotator.getStepsCount() - 3,
    };
  };
};
