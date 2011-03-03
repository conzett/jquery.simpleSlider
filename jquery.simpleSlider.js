(function( $ ){
    
    var settings = {
            'speed' : 200,
            'backClassName' : 'back',
            'root' : null,
            'callback' : function() {}
    };
    
    var statusData = 'data-ss_status';
    var previousData = 'data-ss_previous';
    
    function swapStatus(target, active){
        $(target).attr(statusData, 'active');
        active.removeAttr(statusData);
    }
    
    function transition(active, target, speed, direction, callback){
        
        active = $(active);
        target = $(target);
        callback = callback || function() {};
        var value = "";        
        if(direction == '+'){
            value = '-';
        }        
        $(target).css('left', value + $(target).width());
        $(active).animate({left: direction + '=' + active.width()}, speed, function() {
                callback.call(this);
        });        
        $(target).animate({left: direction + '=' + target.width()}, speed);
        target.parent().height(target.height());
        swapStatus(target, active);
    }
    
    $.fn.transitionLeft = function(target, speed, callback) {        
        return this.each(function() {
            transition($(this), target, speed, '-', callback);
        });        
    }
    
    $.fn.transitionRight = function(target, speed, callback) {        
        return this.each(function() {
            transition($(this), target, speed, '+', callback);
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
            
            container.css({'position' : 'relative', 'overflow' : 'hidden'});
            children.css({'width' : width + 'px', 'left' : width + 'px', 'top' : 0, 'position' : 'absolute' });
            root.css({'left' : '0'}).attr(statusData, 'active');
            children.not(root).prepend('<a class="' + settings.backClassName + '" href="#">Back</a>');            
            container.css({'height' : root.height()});
          
            $('a[href^="#"]').not(anchorExclude).click(function(e) {
                e.preventDefault();
                
                var active = $('[' + statusData +'="active"]');
                var target = $($(this).attr('href'));
                
                active.transitionLeft(target, settings.speed);                
                target.attr(previousData, '#' + active.attr('id'));
                
            });
            
            $(backClass).click(function(e) {
                e.preventDefault();
                
                var active = $(this).parent();
                var prev = active.attr(previousData);                
                var target = $(prev || ('#' + root.attr('id')));                
                               
                active.transitionRight(target, settings.speed);                
                
            });
            
            settings.callback.call(this);
        
        });

    };
})( jQuery );