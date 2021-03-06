var instruction = function () {
    this.postDispatch = function () {
        Rotator.enableNextButton();
    };

    this.mustache = function () {
        return {
		}
    }
};