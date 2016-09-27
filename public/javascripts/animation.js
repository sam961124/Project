//map & history click event
$(function(){
    $(".map, .history, .about").click(function(){
        $(".init-container").addClass("animated fadeOut").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
            $(this).removeClass('animated fadeOut');
            $(this).css("display", "none");
        });
        $(".swiper-container").addClass("animated fadeOut").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
            $(this).removeClass('animated fadeOut');
            $(this).css("display", "none");
        });
        $(".input-container").addClass("animated fadeOutLeft").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
            $(this).removeClass('animated fadeOutLeft');
            $(this).css("display", "none");
        });
        $(".output-container").addClass("animated fadeOutRight").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
            $(this).removeClass('animated fadeOutRight');
            $(this).css("display", "none");
        });
        $(".loader-box").addClass("animated fadeOut").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
            $(this).removeClass('animated fadeOut');
            $(this).css("display", "none");
        });
    });

    $(".header-map").click(function(ev){
        ev.preventDefault();
        $(".history-container").css("display", "none");
        setTimeout(function(){
            $(".map-container").addClass("animated fadeInDown").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                $(this).removeClass('animated fadeInDown');
            });
            $(".map-container").css("display", "block");
        }, 1000);
    });

    $(".header-history").click(function(ev){
        ev.preventDefault();
        $(".map-container").css("display", "none");
        setTimeout(function(){
            $(".history-container").addClass("animated fadeInUp").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                $(this).removeClass('animated fadeInUp');
            });
            $(".history-container").css("display", "block");
        }, 1000);
    });
});


//init-container event
$(function(){
    $(".btn-start").click(function(){
        $(".init-container").css("display", "none");
        $(".swiper-container").css("display", "none");
        $(".input-container").addClass("animated fadeInLeft").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
            $(this).removeClass('animated fadeInLeft')
        });
        $(".input-container").css("display", "block");
    })
    if ($(window).width() > 767)
    {
        $(".init-box-1").addClass("animated fadeInUp").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
            $(this).removeClass('animated fadeInUp')
        });
        $(".init-box-1").css("display", "block");
        setTimeout(function(){
            $(".init-box-2").addClass("animated fadeInUp").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                $(this).removeClass('animated fadeInUp')
            });
            $(".init-box-2").css("display", "block");
        }, 400);
        setTimeout(function(){
            $(".init-box-3").addClass("animated fadeInUp").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                $(this).removeClass('animated fadeInUp')
            });
            $(".init-box-3").css("display", "block");
        }, 800);
        setTimeout(function(){
            $(".btn-start").addClass("animated fadeInUp").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                $(this).removeClass('animated fadeInUp')
            });
            $(".btn-start").css("display", "inline-block");
        }, 1200);
    }
});



//output-container event
$(function(){
    $(".btn-submit").click(function(){
        if ($(window).width() <= 767) {
            $(".input-container").css("display", "none");
         }
        $(".result-container").css("display", "none");
        $(".output-container").css("display", "none");
        $(".loader-box").css("display", "block");
    });
});


$(document).bind("mobileinit", function(){
    $.mobile.loadingMessage = false;
    $.mobile.hidePageLoadingMsg();
});
