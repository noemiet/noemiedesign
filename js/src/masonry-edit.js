var $container = $('.masonry-container');
// initialize
$container.masonry({
  columnWidth: '.grid-sizer',
  itemSelector: '.item',
  percentPosition: true
});