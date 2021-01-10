var variantValidator;
var userVariant;
var variant = function () {
    this.postDispatch = function () {
        var variants = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

        variantValidator = new Validator();
        variantValidator.addValidator($('input[name="variant-input"]'), variants, true, false)
        .enableStepFinishAlert(true);

        $('button.check').click(function () {
            variantValidator.validate();
            userVariant = $(".form-control").val();
            if(!variants.includes(userVariant)){
                $('div.validation-alert-variant').fadeIn();
            }
        });
    }

    this.mustache = function () {
        return {
            VARIANT_INPUT: new TextInput('variant-input')
            .placeholder("{{ENTER_VARIANT}}")
            .maxLength(2)
            .render()
        }
    }
};