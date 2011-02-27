(function( $ ){
    
    $.fn.simpleSlider = function(options) {
        
        var settings = {
            'speed' : 200,
            'backClassName' : 'back',
            'root' : null,
            'callback' : function() {}
        };
            
        if ( options ) {
            $.extend( settings, options );
        }
        
        return this.each(function() {
                
            var backClass = '.' + settings.backClassName;
            var anchorExclude = backClass;            
            var container = $(this);                
            var children = container.children();
            var root = "";
            
            if(settings.root == null){
                root = children.first();
            }else{
                root = $(settings.root);
            }
            
            var width = container.width();
            var widthPX = width + 'px';
            var height = root.height();
            
            var statusData = 'data-ss_status';
            var previousData = 'data-ss_previous';
            
            container.css({'position' : 'relative', 'overflow' : 'hidden'});
            children.css({'width' : widthPX, 'left' : widthPX, 'top' : 0, 'position' : 'absolute' });
            root.css({'left' : '0'}).attr(statusData, 'active');
            children.not(root).prepend('<a class="' + settings.backClassName + '" href="#">Back</a>');
            
            function swapStatus(target, active){
                target.attr(statusData, 'active');
                active.removeAttr(statusData);
            }
            
            function slide(target, direction){
                target.animate({left: direction + '=' + target.width()}, settings.speed);
            }
          
            $('a[href^="#"]').not(anchorExclude).click(function(e) {
                e.preventDefault();
                
                var active = $('[' + statusData +'="active"]');
                var target = $($(this).attr('href'));
                
                target.css('left', target.width());
                
                slide(active, '-');
                slide(target, '-');
                
                target.attr(previousData, '#' + active.attr('id'));
                
                swapStatus(target, active);
                
            });
            
            $(backClass).click(function(e) {
                e.preventDefault();
                
                var active = $(this).parent();
                var prev = active.attr(previousData);
                
                if(prev != null){
                    
                    var target = $(prev);
                    
                    target.css('left', '-' + target.width());
                    
                    slide(active, '+');
                    slide(target, '+');
                
                    swapStatus(target, active);           
                }
                
            });
            
            settings.callback.call(this);
        
        });

    };
})( jQuery );