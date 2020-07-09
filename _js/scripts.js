(function($) {
  'use strict';

AOS.init();

$(".js-beacon").click(function(e) {
  e.preventDefault();
  Beacon("open");
  $(".js-beacon").blur();
});

// $(".s-home .c-nav-list__link").css("opacity","0");
// $(".s-home .s-hero .o-grid__block").css("opacity","0");
// $(".s-hero__eye svg").css("opacity","0");
// $(".s-hero__eye svg .c-eyelash").css("opacity","0");

// grid load

anime({
  targets: '.s-home .s-hero .o-grid__block',
  opacity: 1,
  translateY: [10,0],
  delay: anime.stagger(40)
});

// eye intro

var eyeSvg = {
  targets: '.s-hero__eye svg',
  opacity: 1,
  translateY: [30,0],
  delay: 1200
};

anime({
  targets: '.s-hero__eye__inner',
  translateY: [-20,0],
  direction: 'alternate',
  duration: 2000,
  autoplay: true,
  loop: true,
  easing: 'easeInOutQuad'
});

var eyeLashes = {
  targets: '.s-hero__eye svg .c-eyelash',
  opacity: 1,
  delay: anime.stagger(200, {easing: 'cubicBezier(.5, .05, .1, .3)'})
};

var timelineEyeIntro = anime.timeline();
timelineEyeIntro.add(eyeSvg).add(eyeLashes);

// main eye animations

var eyeCornea = {
  targets: '.c-cornea',
  translateX: -40,
  autoplay: true,
  duration: 3000,
  delay: 1500,
  easing: 'easeInOutExpo'
};

var eyeCorneaUp = {
  targets: '.c-cornea',
  translateY: -10,
  autoplay: true,
  duration: 100,
  easing: 'easeInOutExpo'
};

var eyeCorneaMid = {
  targets: '.c-cornea',
  translateY: 0,
  autoplay: true,
  duration: 50,
  delay: 1000,
  easing: 'easeInOutExpo'
};

var eyeCorneaBottom = {
  targets: '.c-cornea',
  translateY: 10,
  autoplay: true,
  duration: 50,
  delay: 1000,
  easing: 'easeInOutExpo'
};

var eyeCorneaStart = {
  targets: '.c-cornea',
  translateX: 0,
  translateY: 0,
  autoplay: true,
  duration: 1000,
  delay: 1000,
  easing: 'easeInOutExpo'
};


var eyeCorneaDown = {
  targets: '.c-cornea',
  translateY: 80,
  scale: 0.7,
  autoplay: true,
  duration: 500,
  delay: 3000,
  easing: 'easeInOutExpo'
}

var eyeRollUp = {
  targets: '.c-cornea',
  translateY: -30,
  autoplay: true,
  duration: 1300,
  delay: 400,
  easing: 'easeInOutBack'
}

var eyeRollDown = {
  targets: '.c-cornea',
  translateY: 0,
  autoplay: true,
  duration: 200,
  easing: 'easeOutBack'
}

var eyeCornPanRight = {
  targets: '.c-cornea',
  translateX: 80,
  autoplay: true,
  duration: 2000,
  delay: 200,
  easing: 'easeInOutBack'
}

var eyeCorneaReUp = {
  targets: '.c-cornea',
  translateX: 0,
  translateY: 0,
  scale: 1,
  autoplay: true,
  duration: 600,
  delay: 2000,
  easing: 'easeInOutExpo'
}

var eyeScale = {
  targets: '.s-hero__eye__scale',
  scale: 4.2,
  duration: 600,
  delay: 1500,
  easing: 'easeOutElastic(1, .8)'
}

var eyeScaledZoomLeft = {
  targets: '.c-cornea',
  translateX: -40,
  duration: 2500,
  easing: 'easeInOutExpo'
}

var eyeScaledZoomRight = {
  targets: '.c-cornea',
  translateX: 40,
  duration: 2500,
  easing: 'easeInOutExpo'
}

var eyeScaledZoomCenter= {
  targets: '.c-cornea',
  translateX: 0,
  duration: 2500,
  easing: 'easeInOutExpo'
}

var eyeScaleBack = {
  targets: '.s-hero__eye__scale',
  scale: 1,
  duration: 600,
  delay: 500,
  easing: 'easeInOutExpo'
}



var timelineEye = anime.timeline({
  loop: true,
  autoplay: true
});

timelineEye.add(eyeCornea)
.add(eyeCorneaUp)
.add(eyeCorneaMid)
.add(eyeCorneaBottom)
.add(eyeCorneaStart)
.add(eyeRollUp)
.add(eyeRollDown)
.add(eyeCorneaDown)
.add(eyeCornPanRight)
.add(eyeCorneaReUp)
.add(eyeScale)
.add(eyeScaledZoomLeft)
.add(eyeScaledZoomRight)
.add(eyeScaledZoomCenter)
.add(eyeScaleBack)

// navigation



var $hasVisit = localStorage.getItem('site.visted');
if ($hasVisit == null) {

  var navIntro = {
    targets: '.s-home .c-nav-list__link',
    opacity: 1,
    translateY: [10,0],
    delay: anime.stagger(100, {easing: 'cubicBezier(.5, .05, .1, .3)'})
  };

  var navIntroDelay = {
    targets: '.s-home .c-nav-list__link',
    translateY: [10,0],
    delay: 1000
  };

  var timelineNav = anime.timeline();
  timelineNav.add(navIntroDelay).add(navIntro);

  localStorage.setItem('site.visted', 1);
} else {
  $(".s-home .c-nav-list__link, .s-home .c-nav-list__link").css("opacity","1");
};



})(jQuery);
