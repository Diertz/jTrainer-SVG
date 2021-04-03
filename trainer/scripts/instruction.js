var userVariant = document.getElementById("variant-select").value;
var instruction = function () {
  this.postDispatch = function () {
    Rotator.enableNextButton();
  };
  this.mustache = function () {
    window.parent.document.title = I18N.getConstants()["VARIANT"] + " " + userVariant;
    return {};
  };
};
