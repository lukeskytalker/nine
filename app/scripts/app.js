//let there be light!
'use strict';

(function($){

	/*
	 * App config
	 */

	 //App main variables
	var currentUrl = window.location.href,
		pathArray = window.location.href.split( '/' ),
   		protocol = pathArray[0],
    	host = pathArray[2],
    	url = protocol + '//' + host,
    	lastPart = pathArray.pop(),
    	lastPartArray = lastPart.split('.'),
    	pageName = lastPartArray[0],
    	pageHome = 'home',
    	pageAbout = 'about',
    	pageRooms = 'rooms',
    	pageLisbonLife = 'lisbon-life',
    	pageContacts = 'contacts',
    	docElem = window.document.documentElement;

	
	//App routing
	window.configRoutes = function() {	

		if (currentUrl === url + '/') {
	    	$('body').attr('id', pageHome);
	    }
	    if (pageName === pageAbout) {
	    	$('body').attr('id', pageAbout);
	    }

	}();

	
	/*
	 * App model
	 */

	 //App Animations
	 window.requestAnimFrame = function(){
		return (
			window.requestAnimationFrame       || 
			window.webkitRequestAnimationFrame || 
			window.mozRequestAnimationFrame    || 
			window.oRequestAnimationFrame      || 
			window.msRequestAnimationFrame     || 
			function(/* function */ callback){
				window.setTimeout(callback, 1000 / 60);
			}
		);
	}();

	window.cancelAnimFrame = function(){
		return (
			window.cancelAnimationFrame       || 
			window.webkitCancelAnimationFrame || 
			window.mozCancelAnimationFrame    || 
			window.oCancelAnimationFrame      || 
			window.msCancelAnimationFrame     || 
			function(id){
				window.clearTimeout(id);
			}
		);
	}();

	//General basic animations
	function Animation() {

		var AnimationObj = new Object();

		var FadeIn = function(el) {
			$(el).velocity('transition.fadeIn', {dur: 1000});
		},

		SlideLeftIn = function(el) {
			$(el).velocity('transition.slideLeftIn', {dur: 1000});
		},

		SlideRightIn = function(el) {
			$(el).velocity('transition.slideRightIn', {dur: 1000});
		},

		SlideUpIn = function(el) {
			$(el).velocity('transition.slideUpIn', {dur: 1000});
		},

		SlideDownIn = function(el) {
			$(el).velocity('transition.slideDownIn', {dur: 1000});
		};

		AnimationObj.FadeIn = FadeIn; 
    	AnimationObj.SlideLeftIn = SlideLeftIn;
    	AnimationObj.SlideRightIn = SlideRightIn; 
    	AnimationObj.SlideUpIn = SlideUpIn; 
    	AnimationObj.SlideDownIn = SlideDownIn;
    	 
    	return AnimationObj; 

    }

    //SVG Animations
    function SVGEl( el ) {
		this.el = el;
		this.image = this.el.previousElementSibling;
		this.current_frame = 0;
		this.total_frames = 60;
		this.path = new Array();
		this.length = new Array();
		this.handle = 0;
		this.init();
	}

	SVGEl.prototype.init = function() {
		var self = this;
		[].slice.call( this.el.querySelectorAll( 'path' ) ).forEach( function( path, i ) {
			self.path[i] = path;
			var l = self.path[i].getTotalLength();
			self.length[i] = l;
			self.path[i].style.strokeDasharray = l + ' ' + l; 
			self.path[i].style.strokeDashoffset = l;
		} );
	};

	SVGEl.prototype.render = function() {
		if( this.rendered ) return;
		this.rendered = true;
		this.draw();
	};

	SVGEl.prototype.draw = function() {
		var self = this,
			progress = this.current_frame/this.total_frames;
		if (progress > 1) {
			window.cancelAnimFrame(this.handle);
		} else {
			this.current_frame++;
			for(var j=0, len = this.path.length; j<len;j++){
				this.path[j].style.strokeDashoffset = Math.floor(this.length[j] * (1 - progress));
			}
			this.handle = window.requestAnimFrame(function() { self.draw(); });
		}
	};

	/*
	 * App Controller
	 */

	 //App bootstrap
	 function bootApp() {

		var home = document.getElementById('home'),
			about = document.getElementById('about'),
			rooms = document.getElementById('rooms'),
			lisbonLife = document.getElementById('lisbon-life'),
			contacts = document.getElementById('contacts');

		//page specific functions
		if (home) {
			homeAnimation();
		}
		if (about) {
			aboutAnimation();
		}
		if (rooms) {
			
		}
		if (lisbonLife) {
			
		}
		if (contacts) {
			
		}
		headerAnim();
	}
    
    //homepage functions
    function homeAnimation() {
		var home = new Animation();
		
		var loadSlider = function() {
			var slider = $('.home .banner');
			home.FadeIn(slider);
			loadLogo();
		},
		loadLogo = function() {
			logo();
			setTimeout(function(){
				loadHeader();
			}, 1500);
			
		},
		loadHeader = function(){
			var title = $('.home .app-header h1'),
				menu = $('.home .app-header ul');
			home.SlideLeftIn(title, setTimeout(function(){
				home.SlideRightIn(menu, loadBooking());
			}, 1000));
		},
		loadBooking = function(){
			var booking = $('.home .banner .booking');
			home.SlideUpIn(booking, loadVideo());
		},
		loadVideo = function(){
			video();
		}

		loadSlider();
	}

	//Main logo animation
	function logo() {
		var svgs = Array.prototype.slice.call( document.querySelectorAll( 'svg' ) );
		//svgArr = new Array();
		svgs.forEach( function( el ) {
			var svg = new SVGEl( el );
			//svgArr[i] = svg;
			setTimeout(function( el ) {
				return function() {
					svg.render(setTimeout(function(){
							$('#logo-dot1').velocity({opacity: 1, dur: 1000});
							$('#logo-dot2').velocity({opacity: 1, dur: 1000});
							$('#logo-dot3').velocity({opacity: 1, dur: 1000});
						}, 2000));
				};
			}( el ), 1000); 
		});
	}
	//aboutpage functions
	function aboutAnimation(){
		var about = new Animation();

		var loadBanner = function() {
			var banner = $('.about .banner');
			about.FadeIn(banner, setTimeout(function(){
				loadTitle();
			}, 1000));
		}
		var loadTitle = function() {
			var title = $('.about h1');
			about.SlideUpIn(title);
		}
		loadBanner();
	}
   	
   	//main header Anim -> needs work here...
   	var headerAnim = function() {
   		var scrollTop = $(window).scrollTop();
        var winHeight = $(window).height();
        var el = $('.app-header');
		$('.banner').waypoint(function(){
			$('.app-header').toggleClass('header-visible');
	  	}, {offset: -110});
	  	/*$('.app-header').waypoint(function(direction) {
			$('.app-header').toggleClass('header-visible', direction === "down");
		}, {
			offset: -110

		});*/
	}


	var video = function(){
		$('.youtube').each(function() {
	        // Based on the YouTube ID, we can easily find the thumbnail image
	        //$(this).css('background-image', 'url(http://i.ytimg.com/vi/' + this.id + '/sddefault.jpg)');
	        /* add thumbnail as an img tag to container instead of a background */
	        //$(this).append($('<img/>', {'src': 'http://i.ytimg.com/vi/' + this.id + '/hqdefault.jpg'}));

	        // Overlay the Play icon to make it look like a video player
	        //$(this).append($('<div/>', {'class': 'play'}));

	        $(document).delegate('#'+this.id, 'click', function() {
	            // Create an iFrame with autoplay set to true
	            var iframe_url = "https://www.youtube.com/embed/" + this.id + "?autoplay=1&autohide=1";
	            if ($(this).data('params')) iframe_url+='&'+$(this).data('params');

	            // The height and width of the iFrame should be the same as parent
	            var iframe = $('<iframe/>', {'frameborder': '0', 'src': iframe_url, 'width': $(this).width(), 'height': $(this).height()+50 })
	            /* create iframe without sizing constraints if so need ftvids */
	            //var iframe = $('<iframe/>', {'frameborder': '0', 'src': iframe_url });

	            // Replace the YouTube thumbnail with YouTube HTML5 Player
	            //$(this).replaceWith(iframe);
	            /* append youtube's iframe in container and add loaded class */
	            $(this).html(iframe).addClass('loaded');
	           
	            /* call fitVids on container */
	            //$(this).fitVids();
	        });
	    });
	}

	
	
	$(document).ready(bootApp);

})(jQuery);
