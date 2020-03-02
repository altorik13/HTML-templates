//hide navigation when scroll
//hide/show arrow for top
$(document).scroll(function () {
    var scroll = $(document).scrollTop();
    if (scroll > 500) {
        $('#return-to-top').addClass("shown")
    }
    else {
        $('#return-to-top').removeClass("shown")
    }
    $('header').removeClass('active');
});

//arrow to top
$('#return-to-top').click(function () {
    $('html, body').animate({ scrollTop: 0 }, 800);
    return false;
});

//navigation bar
$('.nav-bars').click(function () {
    $('header').toggleClass('active');
});

//carousel for branch members
$('.team-list').slick({
    dots: true,
    arrows: true,
    infinite: false,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
        {
            breakpoint: 900,
            settings: {
                dots: false,
                slidesToShow: 3,
                slidesToScroll: 3
            }
        },
        {
            breakpoint: 600,
            settings: {
                dots: false,
                slidesToShow: 2,
                slidesToScroll: 2

            }
        },
        {
            breakpoint: 480,
            settings: {
                dots: false,
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
});

//slider
$('.slides-body').slick({
    dots: true,
    arrows: false,
    draggable: false,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
});

var startingSlider = null;
var all_slider_content = $(document).find('.slider').find('.container');
var slider_controls = $(document).find('.slider').find('.slider-controls').find('li');
var slick_controls = $(document).find('.slider').find('.slick-dots').find('button');
var ref = $('.slick-slider').find('.slick-dots').children().length;

function changeSlide(clickedObj) {
    if (clickedObj == 'timeout') {
        var activeItem = $('.slick-slider').find('.slick-dots').children('.slick-active');
        var n = $('.slick-slider').find('.slick-dots').children().index(activeItem);

        n = n + 1;
        if (n == ref) {
            clearInterval(startingSlider);
            return false;
        }
    } else {
        clearInterval(startingSlider);
        var n = $(clickedObj).parent().children().index(clickedObj);
    }

    all_slider_content.addClass('hiddenWhileScroll');
    setTimeout(function () {
        //fire Slick
        $(slick_controls[n]).trigger("click");
        setTimeout(function () {
            all_slider_content.removeClass('hiddenWhileScroll');
        }, 400);
    }, 450);
}

$(slider_controls).click(function () {
    changeSlide(this);
});


$(document).ready(function () {
    startingSlider = setInterval(function () {
        changeSlide('timeout');
    }, 10000);
});
