var userVariant = document.getElementById("variant-select").value;
var instruction = function () {
  this.postDispatch = function () {
    window.parent.document.title =
      window.document.title + " - " + "Варіант " + userVariant;
    Rotator.enableNextButton();
  };

  this.mustache = function () {
    return {};
  };
};
