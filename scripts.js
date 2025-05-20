$(document).ready(function () {
  // Toggle Nav
  $('#toggleBtn').click(function () {
    $('.nav-links').toggleClass('show');
  });


  

  // Hover Effects
  
  // Auto Slider
  const slider = $('.slider');
  const slideCount = $('.proj').length;
  const visibleSlides = 3;
  let currentIndex = 0;

 

  $('.proj').slice(0, visibleSlides).clone().appendTo(slider);

  function slide() {
    currentIndex++;
    slider.css('transition', 'transform 0.5s ease-in-out');
    const shift = currentIndex * (100 / visibleSlides);
    slider.css('transform', 'translateX(-' + shift + '%)');

    if (currentIndex === slideCount) {
      setTimeout(() => {
        slider.css('transition', 'none');
        slider.css('transform', 'translateX(0)');
        currentIndex = 0;
      }, 600);
    }
  }



    let sliderInterval = setInterval(slide, 2000);

  $('.proj').hover(
    function () {
      clearInterval(sliderInterval);
    },
    function () {
      sliderInterval = setInterval(slide, 2000);
    }

  );

  // Project Hover Effect
  $(".viewdetails").hide();
  $(".projecttitle").hide();
  $(".proj").hover(
    function () {
      $(this).find(".viewdetails").fadeIn(200);
      $(this).find(".projecttitle").fadeIn(200);
    },
    function () {
      $(this).find(".viewdetails").fadeOut(200);
      $(this).find(".projecttitle").fadeOut(200);
    }
  );


  // Lightbox
  $('.viewdetails').click(function (e) {
    e.stopPropagation();
    const imgSrc = $(this).closest('.proj').find('img').attr('src');
    $('#lightboxImg').attr('src', imgSrc);
    $('#lightbox').fadeIn();
  });

  $('.close, #lightbox').click(function (e) {
    if (e.target.id === 'lightboxImg') return;
    $('#lightbox').fadeOut();
  });

  // Skills Animation
  const skills = [
    { name: 'HTML', level: 90 },
    { name: 'CSS', level: 90 },
    { name: 'JavaScript', level: 80 },
    { name: 'jQuery', level: 75 },
    { name: 'React', level: 70 },
    { name: 'Python', level: 80 }
  ];

  skills.forEach(skill => {
    const skillItem = `
      <div class="skill">
        <span class="skill-name">${skill.name}</span>
        <div class="skill-bar">
          <div class="skill-progress" data-width="${skill.level}%"></div>
        </div>
      </div>
    `;
    $('.skill-list').append(skillItem);
  });

  let animated = false;

  function debounce(func, wait) {
    let timeout;
    return function () {
      clearTimeout(timeout);
      timeout = setTimeout(func, wait);
    };
  }

  const handleScroll = debounce(() => {
    const $skillsSection = $('#skills');
    if ($skillsSection.length === 0) return;

    const skillsOffset = $skillsSection.offset().top;
    const windowBottom = $(window).scrollTop() + $(window).height();

    if (!animated && windowBottom > skillsOffset + 100) {
      $('.skill-progress').each(function () {
        const width = $(this).data('width');
        $(this).animate({ width }, 1000);
      });
      animated = true;
    }
  }, 100);

  $(window).on('scroll', handleScroll);

  // Form Validation
  $('#form').on('submit', function (e) {
    e.preventDefault();

    let isValid = true;
    let name = $('#name').val().trim();
    let email = $('#email').val().trim();
    let message = $('#message').val().trim();

    $('input, textarea').css('border', '');

    if (name === '') {
      $('#name').css('border', '2px solid red');
      $('#namemsg').fadeIn();
      setTimeout(function () {  
        $('#namemsg').fadeOut();
      }, 2000);
      
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === '' || !emailPattern.test(email)) {
      $('#email').css('border', '2px solid red');
      $('#emailmsg').fadeIn();
      return;
    } else {
      $('#emailmsg').fadeOut();
    }

    if (message === '') {
      $('#message').css('border', '2px solid red');
      $('#msgmsg').fadeIn();
      setTimeout(function () {
        $('#msgmsg').fadeOut();
      }, 2000);

      setTimeout(function () {
        $('#msgmsg').fadeOut();
      }, 2000);
      return;
    }

    if (isValid) {
      $('#successmsg').fadeIn();
      setTimeout(function () {
        $('#successmsg').fadeOut();
      }, 1000);
      $('#form')[0].reset();
    }
  });

  // Smooth Scroll
  $('.nav-links a').on('click', function (e) {
    e.preventDefault();

    var target = $(this).attr('href');
    if ($(target).length) {
      $('html, body').animate({
        scrollTop: $(target).offset().top
      }, 800);
    }
  });
   // Scroll to Top Button Visibility
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('#toTop').fadeIn();
    } else {
      $('#toTop').fadeOut();
    }
  });

  // Back to Top Button
  $('#toTop').click(function(e){
    e.preventDefault();
    $('html, body').animate({
      scrollTop: 0
    }, 1000);
  });

 


  
  
});
