// smart resize
(function ($, sr) {
    // debouncing function from John Hann
    // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
    var debounce = function (func, threshold, execAsap) {
        var timeout;
        //return the debounce
        return function debounced() {
            var obj = this,
                args = arguments;

            function delayed() {
                if (!execAsap)
                    func.apply(obj, args);
                timeout = null;
            };

            if (timeout) // if null
                clearTimeout(timeout); //clear the timeout which is null?
            else if (execAsap) // else execute 
                func.apply(obj, args);

            timeout = setTimeout(delayed, threshold || 200); // determines what to set the timeout to?
        };
    };
    // smartresize 
    jQuery.fn[sr] = function (fn) { return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };  // sets the debounce variables

})(jQuery, 'smartresize');