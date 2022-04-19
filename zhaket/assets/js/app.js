$('.hamburger').click(function(){
    $('.header__menu').fadeIn();
})
$('.header__menu').focusout(function(){
    $(this).fadeOut();
})