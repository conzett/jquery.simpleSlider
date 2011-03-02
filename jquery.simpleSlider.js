(function( $ ){
    
    var settings = {
            'speed' : 200,
            'backClassName' : 'back',
            'root' : null,
            'callback' : function() {}
    };
    
    $.fn.slideLeft = function(speed, target, callback) {        
        return this.each(function() {
            var current = $(this);
            var callback = callback || function() {};
            $(current).animate({left: '-=' + $(this).width()}, speed, function() {
                    callback.call(this);
            });
            $(target).animate({left: '-=' + $(this).width()}, speed);
        });        
    }
    
    $.fn.slideRight = function(speed, target, callback) {        
        return this.each(function() {
            var current = $(this);
            var callback = callback || function() {};
            $(current).animate({left: '+=' + $(this).width()}, speed, function() {
                    callback.call(this);
            });
            $(target).animate({left: '+=' + $(this).width()}, speed);
        });       
    }
    
    $.fn.simpleSlider = function(options) {       
            
        if ( options ) {
            $.extend( settings, options );
        }
        
        return this.each(function() {
                
            var backClass = '.' + settings.backClassName;
            var anchorExclude = backClass;            
            var container = $(this);                
            var children = container.children();            
            var root = settings.root || children.first();            
            var width = container.width();
            var height = root.height();
            
            var statusData = 'data-ss_status';
            var previousData = 'data-ss_previous';
            
            container.css({'position' : 'relative', 'overflow' : 'hidden'});
            children.css({'width' : width + 'px', 'left' : width + 'px', 'top' : 0, 'position' : 'absolute' });
            root.css({'left' : '0'}).attr(statusData, 'active');
            children.not(root).prepend('<a class="' + settings.backClassName + '" href="#">Back</a>');            
            container.css({'height' : root.height()});
            
            function swapStatus(target, active){
                target.attr(statusData, 'active');
                active.removeAttr(statusData);
            }
          
            $('a[href^="#"]').not(anchorExclude).click(function(e) {
                e.preventDefault();
                
                var active = $('[' + statusData +'="active"]');
                var target = $($(this).attr('href'));
                
                target.css('left', target.width());                
                active.slideLeft(settings.speed, target);                
                target.attr(previousData, '#' + active.attr('id'));
                swapStatus(target, active);
                
            });
            
            $(backClass).click(function(e) {
                e.preventDefault();
                
                var active = $(this).parent();
                var prev = active.attr(previousData);                
                var target = $(prev || ('#' + root.attr('id')));
                
                target.css('left', '-' + target.width());                
                active.slideRight(settings.speed, target);                
                swapStatus(target, active);
                
            });
            
            settings.callback.call(this);
        
        });

    };
})( jQuery );