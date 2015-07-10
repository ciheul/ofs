'use strict';
/* jshint ignore:start */
(function($) {
            $.StartScreen = function(){
                var plugin = this;
                var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;

                plugin.init = function(){
                    setTilesAreaSize();
                    if (width > 640) { 
                        addMouseWheel();
                    }
                };

                var setTilesAreaSize = function(){
                    var groups = $('.tile-group');
                    var tileAreaWidth = 80;
                    $.each(groups, function(i, t){
                        if (width <= 640) {
                            tileAreaWidth = width;
                        } else {
                            tileAreaWidth += $(t).outerWidth() + 80;
                        }
                    });
                    $('.tile-area').css({
                        width: tileAreaWidth
                    });
                };

                var addMouseWheel = function (){
                    $('body').mousewheel(function(event, delta, deltaX, deltaY){
                        var page = $(document);
                        var scrollValue = delta * 50;
                        page.scrollLeft(page.scrollLeft() - scrollValue);
                        return false;
                    });
                };

                plugin.init();
            };
        })(jQuery);

        $(document).ready(function(){
            $.StartScreen();

            var tiles = $('.tile, .tile-small, .tile-sqaure, .tile-wide, .tile-large, .tile-big, .tile-super');

            $.each(tiles, function(){
                var tile = $(this);
                setTimeout(function(){
                    tile.css({
                        opacity: 1,
                        '-webkit-transform': 'scale(1)',
                        'transform': 'scale(1)',
                        '-webkit-transition': '.3s',
                        'transition': '.3s'
                    });
                }, Math.floor(Math.random()*500));
            });

            $(document).ready('.tile-group').animate({
                left: 0
            });
        });
/* jshint ignore:end */