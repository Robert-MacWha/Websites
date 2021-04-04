// Colors for different menu items
let defaultFontColor = getComputedStyle(document.documentElement).getPropertyValue('--font-light-2');
let defaultBackgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--font-dark-1');
let currentAffColor = "#b17ac2";
let techColor = "#72b584";
let careersColor = "#c2bc7a";
let workColor = "#b59064";
let healthColor = "#77bebf";
let productivityColor = "#6479b3";
let sportsColor = "#d4635b";

let show_underline_on_dropdown = true;
let window_width = 0;

(function($) {
    window_width = window.innerWidth;

    checkMenuItem(".menu-item-96", currentAffColor);
    checkMenuItem(".menu-item-97", techColor);
    checkMenuItem(".menu-item-99", workColor);
    checkMenuItem(".menu-item-98", careersColor);
    checkMenuItem(".menu-item-100", healthColor);
    checkMenuItem(".menu-item-192", productivityColor);
    checkMenuItem(".menu-item-193", sportsColor);


    // Updates a given nav item depending on its hovered state
    function checkMenuItem (identification, color) {
        $(identification + " a").css("color", defaultFontColor);

        $(identification).mouseenter(function () {
            $(identification + " a").css("color", color);

            if (window_width >= 992 || show_underline_on_dropdown) {
                $(".navbar").css("border-bottom", color + " 3px solid");
            }

        });
    
        $(identification).mouseleave(function () {
            $(identification + " a").css("color", defaultFontColor);

            if (window_width >= 992 || show_underline_on_dropdown) {
                $(".navbar").css("border-bottom", defaultBackgroundColor + " 3px solid");
            }
        });
    }
      
})( jQuery );