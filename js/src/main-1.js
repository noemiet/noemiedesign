$(document).ready(function(){
    //Init jQuery Masonry layout
    init_masonry();

});


function init_masonry(){
    var $container = $('.masonry-container');

    $container.imagesLoaded( function(){
        $container.masonry({
          itemSelector: '.item',
					
          isAnimated: true
        });
    });
}
