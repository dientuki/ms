var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
var initPage = (function () {
	'use strict';

	jQuery(document).ready(function($){
			/* */
	});

});
jQuery(document).ready(function($){
  $(window).load(function(){
      var acc = document.getElementsByClassName('collapse-section');
      var i;

      for (i = 0; i < acc.length; i++) {
        acc[i].onclick = function() {
          this.classList.toggle('active');
          var panel = this.nextElementSibling;
          if (panel.style.maxHeight){
            panel.style.maxHeight = null;
          } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
          } 
        }
        if (i==0){
          if ($(acc[i]).parents('#disclaimer').length==0) {
            acc[i].classList.toggle('active');
            var panel = acc[i].nextElementSibling;
            if (panel.style.maxHeight){
              panel.style.maxHeight = null;
            } else {
              panel.style.maxHeight = panel.scrollHeight + "px";
            } 
          }
        }
      }

  });
});
/**
  Donwload button
  Options
    introduction: this is the first section ID after banner section.

    Example: downloadButton.init( { introduction: "#introduction" } );

**/
var downloadButton = (function() {

  var lastScrollTop = 0;
  var buttonQuickVisible = true;
  var options;

  return {

  init: function(opt) {

    var self = this;
    self.options = opt;

    jQuery(document).ready(function($) {

      if(window.navigator.userAgent.match( /iP(hone|od|ad)/)) {  

        $('#custom-wrapper').addClass('ios');
      }

       if(isSafari) {  

        $('#custom-wrapper').addClass('safari');
      }

      var introPos = $(self.options.introduction).offset().top;
      var viewportTop = $(window).scrollTop();

      if (viewportTop <= introPos ) {
        buttonQuickVisible = false;
        $('#quickdl').hide();
      } else {
        buttonQuickVisible = true;
        $('#quickdl').show();
      }

      self.downloadButton();

      jQuery(window).scroll(function(event){
        self.downloadButton();
      });

      $(document).on('click', '#download-pdf', function() {
        $('.demo__active').css('width', '140px');
        $('body').addClass('download-active');
      });

     $(document).on('click', '.download-active #download-pdf', function() {
           var pdfUrl = $(this).find("a").attr('href');
           window.open( pdfUrl,'_blank');
    });


      $(document).on('click', '.download-active', function() {
        $('.demo__active').css('width', '0px');
        $('body').removeClass('download-active');
      });

    });

  },

  downloadButton: function() {
    $('.demo__active').css('width', '0px');
    $('body').removeClass('download-active');

    if ($(window).width() < 1024) {
      var st = $(window).scrollTop();
      if (st > lastScrollTop) {
        if (buttonQuickVisible) {
          buttonQuickVisible = false;
          jQuery('#quickdl').fadeOut();
        }
      } else if (st < lastScrollTop) {
        if (!buttonQuickVisible) {
          jQuery('#quickdl').fadeIn();
          buttonQuickVisible = true;
        }
      }
      lastScrollTop = st;
    } else {
      var introPos = $(this.options.introduction).offset().top;
      var viewportTop = $(window).scrollTop();
      var topLimit = introPos - $(window).height() / 2;
      if (viewportTop > topLimit) {
        if (!buttonQuickVisible) {
          $('#quickdl').fadeIn();
          buttonQuickVisible = true;
        }
      } else {
        if (buttonQuickVisible) {
          buttonQuickVisible = false;
          $('#quickdl').fadeOut();
        }
      } 
    } 

  }
  }
})();


// OPTIONS

downloadButton.init( { introduction: "#introduction" } );
/**
  Feedback button
  Options
    introduction: this is the first section ID after banner section.
    conclusion: last section before disclaimer.
    introductionMobile: first section after banner in mobile.
    conclusionMobile: last section before disclaimer in mobile.
	heroBannerMobile: first section in mobile.

    Example: feedbackButton.init( { introduction: "#introduction", conclusion: "#desktop-conclusion" } );
    
**/
var feedbackButton = (function() {

	var lastScrollTopFeedback = 0;
	var goingUp = false;
	var options;

	return {

	init: function(opt) {

	    var self = this;
	    self.options = opt;

		jQuery(document).ready(function($){

			$(document).on('scroll', function() {

				var scrollTop = $(window).scrollTop();
				var goingUp = scrollTop < lastScrollTopFeedback;
				lastScrollTopFeedback = scrollTop;

				 if ($(window).width() >= 1024) { // Desktop

				 	if (scrollTop >= $(self.options.introduction).position().top){ 
			  			$('#feedback-cta').addClass('enter');
					} else {
				  		$('#feedback-cta').removeClass('enter');
					}
			

				 	if (scrollTop >= $(self.options.conclusion).position().top){ 
			  			$('#feedback-cta').addClass('active');
					}
					if ( scrollTop <= $(self.options.introduction).position().top ) {
				 		$('#feedback-cta').removeClass('active');
				 	}

				 } else { // Mobile
				 
				  if ($(self.options.introductionMobile).lengh == 1) {
				   	if (scrollTop >= $(self.options.introductionMobile).position().top && goingUp){ 
			    			$('#feedback-cta').addClass('enter');
					  } else {
				    		$('#feedback-cta').removeClass('enter');
					  }
				  }


					if (scrollTop >= $(self.options.conclusionMobile).position().top){ 
			  			$('#feedback-cta').addClass('active');
					}
					if ($(self.options.heroBannerMobile).length && scrollTop <= $(self.options.heroBannerMobile).position().top ) { 
				 		$('#feedback-cta').removeClass('active');
				 	}
				 }
			});

				
			$('#feedback-cta').not('.active').on('click', function() {
				$(this).addClass('active');
				$('body').addClass('stickOpen');
			});

			$('body').on('click touch', function (e) {
				var container = $('#feedback-cta.active');
				if (!container.is(e.target) // if the target of the click isn't the container...
				  && container.has(e.target).length === 0) // ... nor a descendant of the container
				{
					container.toggleClass('active');
					$('body').removeClass('stickOpen');
				}
			});

			$('#feedback-cta button').on('click', function() {
				$(this).parent().fadeOut(300, function() {
				  $('.thankyou').fadeIn(300, function() {
				    setTimeout(function () {
				      $('#feedback-cta').css('right', '-300px')
				    }, 1000);
				  });
				});
			});
		});

  }
  }
})();


// OPTIONS 

feedbackButton.init( { introduction: "#introduction", conclusion: "#desktop-conclusion", introductionMobile: "#introductionMobile", conclusionMobile: "#conclusionMobile"  } );

jQuery(document).ready(function($){
	$('a[href*="#introduction"], a[href*="#introduction-m"]').on('click', function(event) {
		    if (this.hash !== "") {
		      event.preventDefault();

		      var hash = this.hash;
		
		    	$('html, body').animate({
			    	scrollTop: $(hash).offset().top
			    	}, 500, function(){
			        window.location.hash = hash;
		      	});
		    } 
		});
});


jQuery(document).ready(function($) {
    $('#scroll-menu a').click(function(event) {
        event.preventDefault();
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top + 3)
        }, 1000, 'swing');
    });

    // Handling the navigation selection 
    if ($('#scroll-menu').length) {
        $(window).scroll(function(event) {
            refreshNavigationMenu();
        });

        function refreshNavigationMenu() {

            var viewportTop = $(window).scrollTop();

            // Detecting current selected chapter
            for (var i = 3; i > 0; i--) {
                if (viewportTop > $('#chapter' + i).offset().top  - $(window).height() / 2) {
                    $('#scroll-menu a').attr("aria-selected", 'false');
                    $('#scroll-menu a[href="#chapter' + i + '"]').attr("aria-selected", 'true');

                    $('#scroll-menu .chapter-number').css("opacity", "0");
                    $('#scroll-menu a[href="#chapter' + i + '"]').parent().find(".chapter-number").css("opacity", "1");
                    break;
                }
            }

            // Hiding and showing menu
            if ( (viewportTop < $('#introduction').offset().top + $('#introduction').height()) ||
                 (viewportTop > $('#conclusion').offset().top - $(window).height() / 2 ) ) {
                $('#scroll-menu').css("opacity", "0");
            } else {
                $('#scroll-menu').css("opacity", "1");
            }

        }

        refreshNavigationMenu();
    
    }
});
/**
  Share button
  Options
    introduction: this is the first section ID after banner section.

    Example: downloadButton.init( { introduction: "#introduction" } );

**/
var emailButton = (function () {

    var lastScrollTop = 0;
    var buttonQuickVisible = true;
    var options;

    return {

        init: function (opt) {
            var self = this;
            self.options = opt;

            jQuery(document).ready(function ($) {
                var introPos = $(self.options.introduction).offset().top;
                var viewportTop = $(window).scrollTop();

                if (viewportTop <= introPos) {
                    buttonQuickVisible = false;
                    $('#emailButton').hide();
                } else {
                    buttonQuickVisible = true;
                    $('#emailButton').show();
                }
                self.emailButton();

                jQuery(window).scroll(function (event) {
                    self.emailButton();
                });
            });

        },
        emailButton: function () {
            if ($(window).width() < 1024) {
                var st = $(window).scrollTop();
                if (st > lastScrollTop) {
                    if (buttonQuickVisible) {
                        buttonQuickVisible = false;
                        jQuery('#emailButton').fadeOut();
                    }
                } else if (st < lastScrollTop) {
                    if (!buttonQuickVisible) {
                        jQuery('#emailButton').fadeIn();
                        buttonQuickVisible = true;
                    }
                }
                lastScrollTop = st;
            } else {
                var introPos = $(this.options.introduction).offset().top;
                var viewportTop = $(window).scrollTop();
                var topLimit = introPos - $(window).height() / 2;
                if (viewportTop > topLimit) {
                    if (!buttonQuickVisible) {
                        $('#emailButton').fadeIn();
                        buttonQuickVisible = true;
                    }
                } else {
                    if (buttonQuickVisible) {
                        buttonQuickVisible = false;
                        $('#emailButton').fadeOut();
                    }
                }
            }
        }
    }
})();

emailButton.init({ introduction: "#introduction" });
 // Sticky Menu
    var sticky = null;
    var scrollEnabled = true;
    var internalScroll = 0;

 jQuery(document).ready(function($) {

    $("[role=dialog]").on("scroll", function() {


        // Get the navbar
        var navbar = $(this).find(".sticky-bar");
        var scrollPosition = $(this).scrollTop();

        if (!sticky && navbar.position().top != 0) {
            sticky = navbar.position().top;
        }

        // Get the offset position of the navbar
        if (sticky !== null && scrollPosition >= sticky) {
            navbar.addClass("is-sticky")
        } else {
            navbar.removeClass("is-sticky");
        }

        if(!scrollEnabled) return;


        var menuAnchors = $(this).find(".custom-menu-link a");

        var current = menuAnchors[0];
        for (var i=0; i < menuAnchors.size(); i++) {
            var item = menuAnchors[i];
            var target = $(item).attr("href");
            if (target != '#' && $(this).find(target).length) {         
                var paddingTop = $(this).css('padding-top').replace ( /[^\d.]/g, '' );   
                var targetPosition = $(this).find(target).position().top + scrollPosition - paddingTop;
                if (targetPosition <= scrollPosition) {
                    current = item;
                }   
            }
        }

        if(! $(current).hasClass("custom-menu-link-active")) {
            $(current).parent().siblings().removeClass("custom-menu-link-active");
            $(current).parent().addClass("custom-menu-link-active");
        }


    });

    $(".c-glyph.glyph-cancel").click(function () {
        sticky = null;
    });


    // Menu

    $(".custom-menu-link a").click(function () {
        if ($(this).hasClass('dropdown') == false) {
         
        
        scrollEnabled = false;
        $(this).parent().siblings().removeClass("custom-menu-link-active");
        $(this).parent().addClass("custom-menu-link-active");
        setTimeout(function () {
            scrollEnabled = true;
        }, 1500);
        }
    });

    var $navbar = $("#sticky");
    var $mp = $("#main-content");
    var $co = $('#conclusion');
    var animate = false;
    
    $navbar.find('.custom-menu-dropdown').on('click', function(e){
      e.preventDefault();
      if ($(window).width() > 768) {
        return false;
      }
      $(this).closest('nav').toggleClass('dropdown-full');
    });
    
    // Scroll down
    $('a.page-scroll, #main-selector .main-button').click(function(event) {
        event.preventDefault();
        if ($(this).hasClass('dropdown')) {
          return false;
        }

		  var $target = $($(this).data('target')), 
		      navHeight = $("#sticky").find('.custom-menu-height').outerHeight();
		      

		  if ($target.length === 0) {
		      //reset all the shit 
		      $('html, body').animate({
				  scrollTop: $('#introduction').offset().top
			  }, 1500, 'swing', function(){
			    $navbar.css({"display": "none", "visibility": "hidden"}).addClass('hidden').removeClass('is-sticky');
			    $mp.data('show', 'false').find('> section').addClass('hidden');
			  });
		      
		      return false;
	      }
	      
			$navbar.find('nav').removeClass('dropdown-full')
		  $mp.find('> section').addClass('hidden');
		  $target.removeClass('hidden');
		
		  if ($(this).hasClass('main-button')) {
		      $navbar.find('.custom-menu-link').removeClass('custom-menu-link-active').stop()
		             .find('[data-target=' + $(this).data('target') + ']').parent().addClass("custom-menu-link-active");
		  }
		
		  var offset = $mp.offset().top - (navHeight);
		  
		  $('html, body').animate({
				  scrollTop: offset
			  }, 1500, 'swing', function(){
	    		if ($navbar.hasClass('hidden') == true || $(window).width() <= 768) {
		        //$navbar.css({"display": "block", "visibility": "visible"}).removeClass('hidden').addClass('is-sticky');
		        $mp.data('show', 'true');
		        animate = true;
		        if ($(window).width() > 768) {
		          $navbar.css({"display": "block", "visibility": "visible"}).addClass('is-sticky').removeClass('hidden');
		        }
		        
		      }
			  });
      });

	$(window).scroll(function(){
	
	    if (animate == true) {
	        animate = false;
	        return;
	    }
	
	    if($mp.data('show') == 'true') {
	      
	    
		      var navHeight = $("#sticky").find('.custom-menu-height').outerHeight(),	    
	            offsetA = $mp.offset().top - (navHeight),
	            offsetB = $co.offset().top - (navHeight);
	            
	        if ($(window).width() <= 768) {
        	        if ( (window.pageYOffset < offsetA) ) {
	                  $navbar.css({"position":"static"}).removeClass('is-sticky').addClass('hidden');
	                } else {
	                    
	                    if ((window.pageYOffset > offsetB)) {
	                   // $navbar.css({"position":"ab"}).removeClass('is-sticky').addClass('hidden');
	                    } else {
	                    $navbar.css({"position":"fixed"}).addClass('is-sticky').removeClass('hidden');
	                    }
	                
	                  
	                }
	        
	        } else {
	        
        	        if ( (window.pageYOffset < offsetA) || (window.pageYOffset > offsetB)) {
	                  $navbar.css({"display": "none", "visibility": "hidden"}).removeClass('is-sticky').addClass('hidden');
	                } else {
	                  $navbar.css({"display": "block", "visibility": "visible"}).addClass('is-sticky').removeClass('hidden');
	                }
	        
	        }
	            

	    }
        
	});

});
