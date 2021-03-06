(function( $ ){
    
    var settings = {
            'speed' : 200,
            'backButtons' : true,
            'backClassName' : 'back',
            'root' : null
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
        parent = target.parent(); /* should be the container */
        callback = callback || function() {};
        
        var containerHeight = Math.max(active.height(), target.height());
        
        var value = "";        
        if(direction == '+'){
            value = '-';
        }
        
        parent.height(containerHeight);
        
        $(active).css('position', 'absolute');
        target.css('left', value + target.width());
        target.show();
        
        $(active).add(target).animate({left: direction + '=' + active.width()}, speed, function() {
                target.css('position', 'static');
                parent.css('height', 'auto');                
                active.hide();
                location.hash = "#" + target.attr('id');
                
                callback.call(this);
        });

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
    
    $.fn.simpleSlider = function(options, callback) {       
            
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
            var hash = window.location.hash;
            
            container.css({'position' : 'relative', 'overflow' : 'hidden'});
            children.css({'width' : width + 'px', 'left' : width + 'px', 'top' : 0, 'position' : 'absolute' });
            children.not(root).hide();
            root.css({'left' : '0'}).attr(statusData, 'active');
            root.css('position', 'static');
                        
            if(settings.backButtons == true){
                children.not(root).prepend('<a class="' + settings.backClassName + '" href="#">Back</a>');
            }            
          
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
            
            if(location.hash == ''){
                location.hash = "#" + $(root).attr('id');
            }else{              
                $('a[href="' + location.hash + '"]').click();
            }
            
            callback.call(this);
        
        });

    };
})( jQuery );