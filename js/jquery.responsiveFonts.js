;(function ( $, window, document, undefined ) {
    // Defaults
    var pluginName = 'responsiveFonts',
        defaults = {
            minWidth : 960,
            maxWidth : 1920
        };

    // The actual plugin constructor
    function Plugin( element, options ) {
        this.options = $.extend( {}, defaults, options );

        this._defaults = defaults;
        this._name = pluginName;
        this.element = $(element);

        this.init();
    }

    Plugin.prototype = {
        ratio: 0,
        init: function() {
            this.ratio = this.options.minWidth / parseInt($('body').css('font-size'), 10);
            this.bindEvents();
        },
        bindEvents: function(){
            this.refresh();

            var $this = this;
            $(window).resize(function(){ $this.refresh(); });
        },
        refresh: function(){
            var width = this.element.width();
            if(width < this.options.minWidth){
                width = this.options.minWidth;
            }
            else if(width > this.options.maxWidth){
                width = this.options.maxWidth;
            }
            this.options.fontSize = width / this.ratio;
            $(this.element).css('font-size', this.options.fontSize);
        }
    };

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function ( options, methodArguments ) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin( this, options ));
            }
        });
    };

})( jQuery, window, document );
