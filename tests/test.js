/*
 * SlideNote Test Suite
 * Unit Tests for SlideNote
 * A JQuery Plugin for flexible, customizable sliding notifications.
 *
 * Copyright 2010 Tom McFarlin, http://tommcfarlin.com
 * Released under the MIT License
 * More information: http://slidenote.info
*/

/*-------------------------------------------------------*
 * Initialization & Setup
 *-------------------------------------------------------*/
 
module("Initialization &amp; Setup");
test("Setup", function() {
	function defined() {
		return $("#note").length;
	}
	equal(defined(), 1, 'A single instance of the note container is found.');
});

test('Initialization', function() {
	function init() {
		$('#note').slideNote();
		return $('#note').css('position') === 'fixed' && $('#note').css('bottom') === '0px';
	}
	equal(init(), true, 'Verifies that the initial CSS position and bottom values are properly set.');
});

/*-------------------------------------------------------*
 * Default Option Values
 *-------------------------------------------------------*/

module("Default Option Values");
test("where", function() {
	function defaultWhereValue() {
		return $.fn.slideNote.defaults.where
	}
	equal(defaultWhereValue(), 640, 'At what scroll position the note will be displayed if no value has been provided.');
});

test("corner", function() {
	function defaultCornerValue() {
		return $.fn.slideNote.defaults.corner
	}
	equal(defaultCornerValue(), 'right', 'The corner in which the note will appear if no value has been specified.');
});

test("URL", function() {
	function defaultUrlValue() {
		return $.fn.slideNote.defaults.url
	}
	equal(defaultUrlValue(), null, 'Verifies the URL field is null when not specified.');
});

test("container", function() {
	function defaultUrlValue() {
		return $.fn.slideNote.defaults.container
	}
	equal(defaultUrlValue(), '', 'The default container value if no asynchronous element ID is provided.');
});

test("closeImage", function() {
	function defaultCloseValue() {
		return $.fn.slideNote.defaults.closeImage
	}
	equal(defaultCloseValue(), null, 'No close button should be displayed.');
});
 
test("displayCount", function() {
	function defaultDisplayCountValue() {
		return $.fn.slideNote.defaults.displayCount;
	}
	equal(defaultDisplayCountValue(), -1, 'No display count value is specified. The notification should not stop displaying.');
});

test("onSlideIn", function() {
	function defaultOnSlideIn() {
		return $.fn.slideNote.defaults.onSlideIn;
	}
	equal(defaultOnSlideIn(), null, 'No callback configured for the slide in event.');
});

test("onSlideOut", function() {
	function defaultOnSlideOut() {
		return $.fn.slideNote.defaults.onSlideOut;
	}
	equal(defaultOnSlideOut(), null, 'No callback configured for the slide out event.');
});
 
/*-------------------------------------------------------*
 * Specific Value Tests
 *-------------------------------------------------------*/
 
module("Specified Value Tests")
test("closeImage", function() {
	function closeOption() {
		$('#note').slideNote({
			closeImage: '/images/close.png'
		});
		return $('#note').children(':first').attr('id') === $('#note').attr('id') + '_close';
	}
	equal(closeOption(), true, 'Verifies that the close button is added to the notification.');
});

/*-------------------------------------------------------*
 * Event Tests
 *-------------------------------------------------------*/

module("Event Tests");
asyncTest("slideIn", function() {
	$('#note').slideNote().trigger('slideIn');
	setTimeout(function() {
		equal($('#note').is(':visible'), true, 'Verifies that the note is visible after the slideIn animation has fired.');
		start();
	}, 1000);
});

asyncTest("slideOut", function() {
	$('#note').slideNote()
		.trigger('slideIn')
		.trigger('slideOut');
	setTimeout(function() {
		equal($('#note').is(':visible'), false, 'Verifies that the note is invisible after the slideOut animation has fired.');
		start();
	}, 3000);
});

asyncTest("closeImageEvent", function() {
	$('#note').trigger('slideIn')
		.children(':first')
		.trigger('click');
	setTimeout(function() {
		equal($('#note').css('display') === 'none', false, 'Verifies that the note is no longer visible once the close image has clicked.');
		start();
	}, 1000);
});

asyncTest("slideInCallback", function() {
	$('#note').slideNote({
		onSlideIn: function() {
			$('#note').addClass('slideIn');
		}
	}).trigger('slideIn');
	setTimeout(function() {
		equal($('#note').hasClass('slideIn'), true, 'Verifies that the note properly fires its slideIn callback.');
		start();
	}, 2000);
});

asyncTest('slideOutCallback', function() {
	$('#note').slideNote({
		onSlideOut: function() {
			$('#note').addClass('slideOut');
		}
	}).trigger('slideIn')
		.trigger('slideOut');
		setTimeout(function() {
			equal($('#note').hasClass('slideOut'), true, 'Verifies that the note properly fires its slideOut callback.');
			start();
		}, 3000);
});

asyncTest('displayCountTest', function() {
	// TODO
});

/*-------------------------------------------------------*
 * Ajax Tests
 *-------------------------------------------------------*/
 
module("Ajax Tests");
asyncTest("retrieveData", function() {
	$('#ajaxNote').slideNote({
		url: 'ajax.html'
	});
	setTimeout(function() {
		equal($('#ajaxNote').children(':first').attr('id') === 'container', true, 'Verifies that the entire page is properly appended to the DOM.');
		start();
	}, 1000);
});

asyncTest("retrieveSpecificData", function() {
	$('#ajaxNote').slideNote({
		url: 'ajax2.html',
		container: 'container2'
	});
	setTimeout(function() {
		equal($('#ajaxNote').children(':first').attr('id') === 'container2', true, 'Verifies that the specified element is properly appended to the DOM.');
		start();
	}, 1000);
});