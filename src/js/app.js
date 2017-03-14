; (function ($, window, document, undefined) {
  $('.app-sidebar .nav-parent > .nav').hide();
  $('.app-sidebar .nav-parent.open > .nav').show();
  $('.app-sidebar .nav-parent > .nav-link').on('click', function (e) {
    e.preventDefault();
    var $element = $(this).parent();
    if ($element.hasClass('open')) {
      $element.addClass('animating')
        .find('.nav').slideUp(function () {
          $element.removeClass('open animating')
            .find('.nav-parent.open').removeClass('open');
        });
    } else {
      $element.addClass('open animating')
        .children('.nav').slideDown(function () {
          $element.removeClass('animating');
        });
      var $siblings = $element.siblings('.nav-parent.open');
      $siblings.addClass('animating')
        .find('.nav').slideUp(function () {
          $siblings.removeClass('open animating')
            .find('.nav-parent.open').removeClass('open');
        });
    }
  });
})(jQuery, window, document);
