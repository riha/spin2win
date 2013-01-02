

ko.bindingHandlers['modal'] = {
    init: function (element) {
        //$(element).modal('init');
        return ko.bindingHandlers['with'].init.apply(this, arguments);
    },
    update: function (element, valueAccessor) {
        var value = ko.utils.unwrapObservable(valueAccessor());
        var returnValue = ko.bindingHandlers['with'].update.apply(this, arguments);

        if (value) {
            $(element).modal('show');
        } else {
            $(element).modal('hide');
        }

        return returnValue;
    }
};