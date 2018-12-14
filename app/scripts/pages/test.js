$(document).ready(function() {
  var dp = new datepicker();
});

(function() {

var datepicker = function () {

  datepicker.createCal();
}

// Create and populate calendar
datepicker.createCal = function(o) {
	o = o || {};

	var dow = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
			d = new Date(),
			calendarHeader = `
										<div class="prev-btn" role="button">&lt;</div>
										<div class="month-title">Month</div>
										<div class="next-btn" role="button">&gt;</div>
										`,
			tableHeader = '<tr>'

	console.log(d);

	// Create day of week header
	for (i = 0; i < dow.length; i++) {
		var day = dow[i].slice(0,2);

		tableHeader += '<th>' + day + '</th>'

		if (i === (dow.length - 1)) {
			tableHeader += '</tr>'
		}
	}

	o.wrapper = document.getElementsByClassName('container--base')[0];

  o.datepicker = $.create('div', {
    class: 'datepicker',
		parent: o.wrapper
  });

	o.header = $.create('div', {
		class: 'datepicker-header',
		innerHTML: calendarHeader,
		parent: o.datepicker
	});

	o.table = $.create('table', {
		class: 'datepicker-calendar',
		parent: o.datepicker,
		innerHTML: tableHeader
	});
}

// Create element
$.create = function(tag, o) {
	var element = document.createElement(tag);

	for (var i in o) {
		var val = o[i];
		if (i === 'innerHTML') {
			element.innerHTML = val;
		} else if (i ==='child') {
			val.parentNode.replaceChild(element, val);
			element.appendChild(val)
		} else if (i === 'parent') {
			val.appendChild(element)
		} else {
			element.setAttribute(i, val);
		}
	}

	return element;
};

// Make available in browser
if (typeof self !== 'undefined') {
	self.datepicker = datepicker;
}

if (typeof module === 'object' && module.exports) {
	module.exports = datepicker;
}

return datepicker;
})();
