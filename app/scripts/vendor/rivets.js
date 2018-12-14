var state = {
    development: false,
    loading: false,
    initialState: {
        DCE: {
            savingsAvail: false,
            savedDrugs: {
                noDrugs: true,
                drugs: []
            },
            savedPharmacy: {
                savingsAvail: false
            },
            pharmacySaver: [],
            pharmacyStandard: []
        },
        PL: {
            hasResults: true,
            resultList: []
        }
    }
};

(function() {
    var Store = lockrRoom;
    window.Store = Store;
    Store.getInitialStore(state);
    window.rivets = rivets;
})();

rivets.configure({
    // Alias for index in rv-each binder
    iterationAlias: function(modelName) {
        return '%' + modelName + '%';
    }
});

// formatters

rivets.formatters.toUpperCase = function(value) {
    return value.toUpperCase();
};

rivets.formatters.isEqualTo = function(value, comparison) {
    return value === comparison;
};

rivets.formatters.isNotEqualTo = function(value, comparison) {
    return value !== comparison;
};

rivets.formatters.isLessThan = function(value, comparison) {
    return parseInt(value) < parseInt(comparison);
};

rivets.formatters.isGreaterThan = function(value, comparison) {
    return parseInt(value) > parseInt(comparison);
};

rivets.formatters.isEmpty = function(value) {
    if (!value || typeof value === undefined) {
        return true;
    } else {
        return false;
    }
};

rivets.formatters.concatenate = function(value, str) {
    return str + value;
};

rivets.formatters.addParameterToUrl = function(paramValue, url, paramName) {
    return url + '?' + paramName + '=' + paramValue;
};

rivets.formatters.hasGeneric = function(value) {
    if (value.length > 0) {
        for (var i = 0; i < value.length; i++) {
            if (value[i]['generic'] === true) {
                return true;
            }
        }
    }
};

rivets.formatters.plusOne = function(value) {
    return value + 1;
};

// binders

rivets.binders.val = function(el, value) {
    if (el.type === 'checkbox' || el.type === 'radio') {
        el.checked = value;
    } else {
        el.value = value;
    }
};

rivets.binders.addclass = function(el, value) {
    if (el.addedClass) {
        $(el).removeClass(el.addedClass);
        delete el.addedClass;
    }

    if (value) {
        $(el).addClass(value);
        el.addedClass = value;
    }
};

rivets.binders.ignore = {
    block: true,
    routine: function() {
        /* do nothing */
    }
};

rivets.bind($('body'), { data: Store.data });
