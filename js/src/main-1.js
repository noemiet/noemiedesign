$(document).ready(function(){
    //Init jQuery Masonry layout
    init_masonry();

});
function init_masonry(){
    var $container = $('.masonry-container');

    $container.imagesLoaded( function(){
        $container.masonry({
          columnWidth: '.grid-sizer',
          itemSelector: '.item',
          percentPosition: true,
          isAnimated: true
        });
    });
}

$('.grid').isotope({
  // options
  itemSelector: '.grid-item',
  layoutMode: 'fitRows'
});

// filter .metal items
$grid.isotope({ filter: '.print' });

// filter .alkali OR .alkaline-earth items
$grid.isotope({ filter: '.web, .ui' });

// filter .metal AND .transition items
$grid.isotope({ filter: '.photo.video' });

// show all items
$grid.isotope({ filter: '*' });

// cache container
var $container = $('.masonry-container');
// initialize isotope
$container.isotope({
  // options...
});

// filter items when filter link is clicked
$('#filters a').click(function(){
  var selector = $(this).attr('data-filter');
  $container.isotope({ filter: selector });
  return false;
});



// $(document).ready(function(){
//     //Init jQuery Masonry layout
//     init_masonry();

// });


// function init_masonry(){
//     var $container = $('.container-fluid');

//     $container.imagesLoaded( function(){
//         $container.masonry({
//           itemSelector: '.grid-item',
          
//           isAnimated: true
//         });
//     });
// }

// $('.grid').masonry({
//   itemSelector: '.grid-item', // use a separate class for itemSelector, other than .col-
//   columnWidth: '.grid-sizer',
//   percentPosition: true
// });
