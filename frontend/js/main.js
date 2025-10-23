(function ($) {
  "use strict";

  $(window).stellar({
    responsive: true,
    parallaxBackgrounds: true,
    parallaxElements: true,
    horizontalScrolling: false,
    hideDistantElements: false,
    scrollProperty: "scroll",
  });

  var fullHeight = function () {
    var resizeTimeout;
    var setHeight = function () {
      requestAnimationFrame(function () {
        $(".js-fullheight").css("height", $(window).height());
      });
    };
    setHeight();
    $(window).resize(function () {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(setHeight, 100);
    });
  };
  fullHeight();

  // loader
  var loader = function () {
    setTimeout(function () {
      if ($("#ftco-loader").length > 0) {
        $("#ftco-loader").removeClass("show");
      }
    }, 1);
  };
  loader();

  var carousel = function () {
    $(".home-slider").owlCarousel({
      loop: true,
      autoplay: true,
      margin: 0,
      animateOut: "fadeOut",
      animateIn: "fadeIn",
      nav: true,
      dots: true,
      autoplayHoverPause: false,
      items: 1,
      touchDrag: false,
      navText: [
        "<span class='ion-ios-arrow-back'></span>",
        "<span class='ion-ios-arrow-forward'></span>",
      ],
      responsive: {
        0: {
          items: 1,
        },
        600: {
          items: 1,
        },
        1000: {
          items: 1,
        },
      },
    });
    $(".carousel-testimony").owlCarousel({
      center: true,
      loop: true,
      items: 1,
      margin: 30,
      stagePadding: 0,
      nav: false,
      navText: [
        '<span class="ion-ios-arrow-back">',
        '<span class="ion-ios-arrow-forward">',
      ],
      responsive: {
        0: {
          items: 1,
        },
        600: {
          items: 2,
        },
        1000: {
          items: 3,
        },
      },
    });
  };
  carousel();

  // Fix passive event listeners for Owl Carousel
  $('.owl-carousel').each(function() {
    var $carousel = $(this);
    var owlData = $carousel.data('owl.carousel');
    if (owlData && owlData._handlers) {
      // Remove existing touchstart listeners and re-add as passive
      $carousel.off('touchstart.owl.carousel');
      $carousel.on('touchstart.owl.carousel', { passive: true }, function(e) {
        // Re-trigger the original handler with passive option
        if (owlData._handlers.touchstart) {
          owlData._handlers.touchstart.call(this, e);
        }
      });
    }
  });

  $("nav .dropdown").hover(
    function () {
      var $this = $(this);
      // 	 timer;
      // clearTimeout(timer);
      $this.addClass("show");
      $this.find("> a").attr("aria-expanded", true);
      // $this.find('.dropdown-menu').addClass('animated-fast fadeInUp show');
      $this.find(".dropdown-menu").addClass("show");
    },
    function () {
      var $this = $(this);
      // timer;
      // timer = setTimeout(function(){
      $this.removeClass("show");
      $this.find("> a").attr("aria-expanded", false);
      // $this.find('.dropdown-menu').removeClass('animated-fast fadeInUp show');
      $this.find(".dropdown-menu").removeClass("show");
      // }, 100);
    }
  );

  $("#dropdown04").on("show.bs.dropdown", function () {
    console.log("show");
  });

  // magnific popup
  $(".image-popup").magnificPopup({
    type: "image",
    closeOnContentClick: true,
    closeBtnInside: false,
    fixedContentPos: true,
    mainClass: "mfp-no-margins mfp-with-zoom", // class to remove default margin from left and right side
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0, 1], // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      verticalFit: true,
    },
    zoom: {
      enabled: true,
      duration: 300, // don't foget to change the duration also in CSS
    },
  });

  $(".popup-youtube, .popup-vimeo, .popup-gmaps").magnificPopup({
    disableOn: 700,
    type: "iframe",
    mainClass: "mfp-fade",
    removalDelay: 160,
    preloader: false,

    fixedContentPos: false,
  });

  var counter = function () {
    $("#section-counter, .ftco-appointment").waypoint(
      function (direction) {
        if (
          direction === "down" &&
          !$(this.element).hasClass("ftco-animated")
        ) {
          var comma_separator_number_step =
            $.animateNumber.numberStepFactories.separator(",");
          $(".number").each(function () {
            var $this = $(this),
              num = $this.data("number");
            console.log(num);
            $this.animateNumber(
              {
                number: num,
                numberStep: comma_separator_number_step,
              },
              7000
            );
          });
        }
      },
      { offset: "95%" }
    );
  };
  counter();

  var contentWayPoint = function () {
    var i = 0;
    $(".ftco-animate").waypoint(
      function (direction) {
        if (
          direction === "down" &&
          !$(this.element).hasClass("ftco-animated")
        ) {
          i++;

          $(this.element).addClass("item-animate");
          setTimeout(function () {
            $("body .ftco-animate.item-animate").each(function (k) {
              var el = $(this);
              setTimeout(
                function () {
                  var effect = el.data("animate-effect");
                  if (effect === "fadeIn") {
                    el.addClass("fadeIn ftco-animated");
                  } else if (effect === "fadeInLeft") {
                    el.addClass("fadeInLeft ftco-animated");
                  } else if (effect === "fadeInRight") {
                    el.addClass("fadeInRight ftco-animated");
                  } else {
                    el.addClass("fadeInUp ftco-animated");
                  }
                  el.removeClass("item-animate");
                },
                k * 50,
                "easeInOutExpo"
              );
            });
          }, 100);
        }
      },
      { offset: "95%" }
    );
  };
  contentWayPoint();

	// Causes modal functionality
	var causesModal = function() {
		// Causes data
		const causesData = [
			{
				id: 1,
				title: "Education for Children",
				shortDesc: "Providing quality education to underprivileged children worldwide.",
				fullDesc: "Our Education for Children initiative focuses on providing access to quality education for children in underserved communities. We build schools, provide learning materials, and train teachers to ensure every child has the opportunity to learn and grow. Your donation helps break the cycle of poverty through education.",
				image: "images/g_1.jpg",
				raised: 5200,
				goal: 10000,
				impact: "Help educate 500 children annually"
			},
			{
				id: 2,
				title: "Education for All",
				shortDesc: "Ensuring access to quality education for every child.",
				fullDesc: "Many communities lack basic educational resources. Our Education for All program builds schools, provides learning materials, and trains teachers to ensure every child has the opportunity to learn and grow. Your donation helps break the cycle of poverty through education.",
				image: "images/g_2.jpg",
				raised: 3800,
				goal: 8000,
				impact: "Provide education to 2000+ children"
			},
			{
				id: 3,
				title: "School Infrastructure",
				shortDesc: "Building safe and conducive learning environments for children.",
				fullDesc: "Our School Infrastructure program focuses on building and renovating schools in underserved areas. We believe that a safe and inspiring learning environment is crucial for children's education. Your support helps us create spaces where children can learn, grow, and thrive.",
				image: "images/g_5.jpg",
				raised: 4500,
				goal: 9000,
				impact: "Construct 5 new schools annually"
			},
			{
				id: 4,
				title: "Clothing for All",
				shortDesc: "Providing clothing and essentials to families in need.",
				fullDesc: "Our Clothing for All program focuses on distributing clothing and essential items to families facing hardship. We believe that everyone deserves dignity and comfort, and your support helps us provide these basic needs.",
				image: "images/g_4.jpg",
				raised: 2900,
				goal: 7500,
				impact: "Support 15000 families annually"
			},
			{
				id: 5,
				title: "Education for All",
				shortDesc: "Ensuring access to quality education for every child.",
				fullDesc: "Many communities lack basic educational resources. Our Education for All program builds schools, provides learning materials, and trains teachers to ensure every child has the opportunity to learn and grow. Your donation helps break the cycle of poverty through education.",
				image: "images/causes-5.jpg",
				raised: 6100,
				goal: 12000,
				impact: "Plant 10,000 trees annually"
			},
			{
				id: 6,
				title: "Women's Education Empowerment",
				shortDesc: "Empowering women and girls for a better future.",
				fullDesc: "When women are empowered, entire communities thrive. Our Women's Education Empowerment program provides education, skills training, and economic opportunities for women and girls. We believe in creating equal opportunities for all.",
				image: "images/g_1.jpg",
				raised: 4200,
				goal: 8500,
				impact: "Empower 800 girls annually"
			},
			{
				id: 7,
				title: "Disaster Relief",
				shortDesc: "Providing aid and support during natural disasters.",
				fullDesc: "Natural disasters can devastate communities overnight. Our Disaster Relief program provides immediate emergency aid, long-term recovery support, and disaster preparedness training. Your generosity helps communities rebuild and become more resilient.",
				image: "images/causes-7.jpg",
				raised: 7300,
				goal: 15000,
				impact: "Support disaster recovery for 5000+ people"
			},
			{
				id: 8,
				title: "Animal Welfare",
				shortDesc: "Caring for animals and promoting humane treatment.",
				fullDesc: "Animals deserve compassion and care. Our Animal Welfare program rescues abandoned animals, provides veterinary care, and promotes responsible pet ownership. We work to create a more humane world for all living beings.",
				image: "images/causes-8.jpg",
				raised: 1800,
				goal: 5000,
				impact: "Care for 1000+ animals annually"
			}
		];

		// Handle Details button clicks
		$(document).on('click', '[data-cause]', function(e) {
			e.preventDefault();
			const causeId = parseInt($(this).data('cause'));
			const cause = causesData.find(c => c.id === causeId);

			if (cause) {
				// Populate modal
				$('#causeModalTitle').text(cause.title);
				$('#causeModalImage').attr('src', cause.image).attr('alt', cause.title);
				$('#causeModalDescription').html(`
					<p>${cause.fullDesc}</p>
					<p><strong>Impact:</strong> ${cause.impact}</p>
					<p><strong>Progress:</strong> $${cause.raised.toLocaleString()} raised of $${cause.goal.toLocaleString()} goal</p>
				`);
				$('#causeModalMeta').text(`Started: January 2024 • Location: Global`);

				// Show modal
				$('#causeModal').modal('show');
			}
		});
	};
	causesModal();

  $(".appointment_date").datepicker({
    format: "m/d/yyyy",
    autoclose: true,
  });

  $(".appointment_time").timepicker();
})(jQuery);

