//*************************
// Filter Toggler
// Version: 0.0.1
// Author: munce
//*************************

// Dependencies: jQuery, smartResize
'use strict';

(function ($) {

    var addDOMElements = UTILITIES.addDOMElements;

    var ImageZoom = function () {
        addDOMElements('image-zoom', $('[data-image-zoom=container]'), this);
    }


    ////close Zoom Tool

    var fullscreenElement = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement;
    var fullscreenEnabled = document.fullscreenEnabled || document.mozFullScreenEnabled || document.webkitFullscreenEnabled;


    // Functions ////////////////////////////////////////////////////////////////
    // Launch fullscreen

    function launchIntoFullscreen(element) {
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
    }

    // Exit fullscreen
    function exitFullscreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }

    function imagePosition() {
        var centerX = $(window).width();
        var centerY = $(window).height();
        var imageX = $('[data-image-zoom="image"]').width();
        var imageY = $('[data-image-zoom="image"]').height();
        var height = centerX - imageX / 2;
        var width = centerY - imageY / 2;
        $('.zoom-image-wrapper').css({
            transform: "translate3d(" + height + "px, " + width + "px , 0px) scale(" + centerX / imageX + ")"
        });
    }

    // ////////////////////////////////////////////////////////////////

    $('[data-image-zoom=main]').on('click', function () {
        $('body').addClass('is-overlay');
        $('[data-overlay]').addClass('is-active');
        imagePosition();
    });

    $('[data-zoom-zoom]').on('mousedown touch', function () {
        $('.zoom-image-wrapper').css({
            transform: "translate3d(0px, 0px, 0px) scale(1)"
        });

    });

    $(window).smartresize(function () {
        imagePosition();
    });




    // Zoom Buttons ////////////////////////////////////////////////////////////////

    // Close 

    $('[data-image-zoom=closeButton]').on('click', function () {
        $('body').removeClass('is-overlay');
        $('[data-overlay]').removeClass('is-active');
        
        if ($('[data-image-zoom=fullButton]').hasClass('fontawesome-resize-small')) {
            $('[data-image-zoom=fullButton]').toggleClass("fontawesome-fullscreen  fontawesome-resize-small");
        }
        if ($('[data-image-zoom=zoomButton]').hasClass('fontawesome-zoom-out')) {
            $('[data-image-zoom=zoomButton]').toggleClass("fontawesome-zoom-in  fontawesome-zoom-out");
        }
        exitFullscreen();
    });


    // Full Screen
    $('[data-image-zoom=fullButton]').on('click', function () {
        if ($(this).hasClass('fontawesome-fullscreen')) {
            launchIntoFullscreen(document.documentElement);
        } else {
            exitFullscreen();
            imagePosition();
        }

        $(this).toggleClass("fontawesome-fullscreen  fontawesome-resize-small ");
    });
    // Cancel fullscreen
    // Full Screen
    $('[data-image-zoom=zoomButton]').on('click', function () {
        $(this).toggleClass("fontawesome-zoom-in  fontawesome-zoom-out");
        if ($(this).hasClass('fontawesome-zoom-in')) {
            $('.zoom-image-wrapper').css({
                transform: "translate3d(0px, 0px, 0px) scale(1)"
            });
        } else {
            imagePosition();
        }
    });
}(jQuery));

