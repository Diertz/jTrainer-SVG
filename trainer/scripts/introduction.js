var userVariant;
var introduction = function () {
  this.preDispatch = function () {};
  this.postDispatch = function () {
    $("div.flag-icon").each(function () {
      $(this).attr(
        "onclick",
        "window.location.href = '?lang=trainer2_' + $(this).attr(\"id\")"
      );
    });
    $("#endTrainer").addClass("disabled btn-default");
  };

  this.mustache = function () {
    return {
      STEPS_COUNT: Rotator.getStepsCount() - 3,
    };
  };
};
