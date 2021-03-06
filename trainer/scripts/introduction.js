var userVariant;
var introduction = function () {
    this.preDispatch = function () {
		
    };
    this.postDispatch = function () {
		$('div.flag-icon').each(function() {
		  $(this).attr('onclick', 'window.location.href = \'?lang=\' + $(this).attr("id")');
		});
    window.parent.document.title = window.document.title;
    };

    this.mustache = function () {
        return {
			STEPS_COUNT: Rotator.getStepsCount()-3
		}
    }
};