$(document).ready(function(){
    //Init jQuery Masonry layout
    init_masonry();

});
function init_masonry(){
    var $container = $('.masonry-container');
    $container.imagesLoaded( function(){
        $container.masonry({
          columnWidth: '.item',
          itemSelector: '.item'
          // percentPosition: true,
          // isAnimated: true
        });
    });
}



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
