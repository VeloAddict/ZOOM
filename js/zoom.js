(function($) {
	$.zoom = function() {
		$('body').append('<div id="zoom"></div>');
		var zoomedIn = false,
		    zoom = $('#zoom'),
		    zoomContent = null,
		    opened = null;
		
		function setup() {
			zoom.hide();
			zoom.prepend('<div class="content"></div>');
			zoomContent = $('#zoom .content');
			
			zoom.prepend('<div class="close"></div>');
			zoom.prepend('<a href="#previous" class="previous">Previous</a>');
			zoom.prepend('<a href="#next" class="next">Next</a>');
			bindNavigation();
		}
		
		function bindNavigation() {
			$('#zoom .close').on('click', close);
			$('#zoom .previous').on('click', openPrevious);
			$('#zoom .next').on('click', openNext);
			$(document).keydown(function(event) {
				if (!opened)
					return;
				if (event.which == 27) {
					$('#zoom .close').click();
					return;
				}
				if (event.which == 37) {
					$('#zoom .previous').click();
					return;
				}
				if (event.which == 39) {
					$('#zoom .next').click();
					return;
				}
				return;
			});
			
			if ($('.gallery li a').length == 1)
				$('.gallery li a')[0].addClass('zoom');
			$('.zoom, .gallery li a').on('click', open);
		}
		
		function open(event) {
			event.preventDefault();
			var link = $(this),
			    src = link.attr('href');
			if (!src)
				return;
			var image = $(new Image()).hide();
			$('#zoom .previous, #zoom .next').show();
			if (link.hasClass('zoom'))
				$('#zoom .previous, #zoom .next').hide();
			if (!zoomedIn) {
				zoomedIn = true;
				zoom.show();
			}
			zoomContent.empty().prepend(image);
			image.load(render).attr('src', src);
			opened = link;
		}
		
		function openPrevious(event) {
			event.preventDefault();
			if (opened.hasClass('zoom'))
				return;
			var prev = opened.parent('li').prev();
			if (prev.length == 0)
				prev = $('.gallery li:last-child');
			prev.find('a').trigger('click');
		}
		
		function openNext(event) {
			event.preventDefault();
			if (opened.hasClass('zoom'))
				return;
			var next = opened.parent('li').next();
			if (next.length == 0)
				next = $('.gallery li:first-child');
			next.children('a').trigger('click');
		}
		
		function render() {
			var image = $(this);
			if (image.width() == zoomContent.width() && image.height() == zoomContent.height()) {
					show(image);
					return;
			}
			var borderWidth = parseInt(zoomContent.css('borderLeftWidth'));
			zoomContent.animate({
				width: image.width(),
				height: image.height(),
				marginTop: -(image.height() / 2) - borderWidth,
				marginLeft: -(image.width() / 2) - borderWidth
			}, 300, function(){
				show(image);
			});
			
			function show(image) {
				image.fadeIn('fast');
			}
		}
		
		function close(event) {
			event.preventDefault();
			zoomedIn = false;
			opened = null;
			zoom.hide();
			zoomContent.empty();
		}
		
		setup();
	};
})(jQuery);
