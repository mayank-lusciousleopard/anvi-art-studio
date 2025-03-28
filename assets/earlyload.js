/****** Masonary shop grid ******/
function initShopGrid(section) {
    section = (typeof section === typeof undefined || section == 'undefined') ? document : section;
    var $shop_grid = $(section.querySelectorAll('.grid-isotop'));
    $shop_grid.imagesLoaded(function() {
        $shop_grid.isotope({
            layoutMode: 'masonry',
            itemSelector: '.grid-item',
            percentPosition: true,
            transitionDuration: 0,
            stagger: 0,
            masonry: {
                columnWidth: '.grid-sizer'
            }
        });
         $shop_grid.imagesLoaded( function() {
            $(".shop-grid-main .loading-box").addClass("hidden")
            $(".shop-grid-main .shop-grid").removeClass("opacity-0 isotop-loading")
          });
        $shop_grid.isotope();
    });
} 
initShopGrid();   
/****** Returns mini header height ******/
function getMiniheaderHeight() {
  var miniHeaderHeight = 0;
  if ($('#shopify-section-mini-header').length) {
      miniHeaderHeight = $('#shopify-section-mini-header').outerHeight();
  }
  return miniHeaderHeight;
}       
/****** Returns header height ******/
function getHeaderHeight() {
  var headerHeight = 0;
  if ($('#hongo-header .navbar').length) {
      headerHeight = $('#hongo-header .navbar').outerHeight();
  }
  
  return headerHeight;
}

/****** Returns top space ******/
window.getTopSpaceHeaderHeight = function getTopSpaceHeaderHeight() {
  return getMiniheaderHeight() + getHeaderHeight();
}
window.resetBodyVars = function resetBodyVars() {
document.body.style.setProperty('--top-space', getTopSpaceHeaderHeight() + 'px');
document.body.style.setProperty('--miniheader-height', getMiniheaderHeight() + 'px');
document.body.style.setProperty('--header-height', getHeaderHeight() + 'px');        
}   
window.resetHeader =  function resetHeader() {
setTimeout(function(){
    resetBodyVars();
    if ($('#hongo-header .navbar').length) {
        if ($('#hongo-header .navbar').hasClass('disable-fixed')) {
            $('body').addClass('disable-fixed');
            $('body').removeClass('sticky');
        } else {
            $('body').removeClass('disable-fixed');
            $('body').addClass('sticky');
        }

        if ($('#hongo-header .navbar').hasClass('header-transparent')) {
            $('body').addClass('transparent');

            var minHeight = getWindowHeight(),
            miniheaderHeight = getMiniheaderHeight();
        } else {
            $('body').removeClass('transparent');
        }            
    }
}, 300);
}
window.resetHeader();
/****** Returns Window width ******/
function getWindowWidth() {
return $( window ).width();
}

/****** Returns window height ******/
function getWindowHeight() {
return $( window ).height();
}
/****** Swiper slide show ******/
window.SlideshowObjs = window.SlideshowObjs || [];
function initSlideshow(section) {
section = (typeof section === typeof undefined || section == 'undefined') ? document : section;
var swiperItems = section.querySelectorAll('.swiper');
swiperItems.forEach(function(swiperItem, index) {
    if (swiperItem.classList.contains('product-media-gallery'))
        return false;
    var _this = $(swiperItem),
        sliderOptions = _this.attr('data-slider-options'),
        isNumberNavigation = _this.attr('data-swiper-number-navigation');
    var isNumberPaginationProgress = _this.attr('data-swiper-number-pagination-progress') || false;

    if (typeof(sliderOptions) !== 'undefined' && sliderOptions !== null ) {
        sliderOptions = $.parseJSON(sliderOptions);
        if (sliderOptions.hasOwnProperty('effect')) {
            if (sliderOptions.effect == 'creative') {
                sliderOptions['creativeEffect'] = {
                    prev: {
                        translate: [0, 0, -400],
                    },
                    next: {
                        translate: ["100%", 0, 0],
                    }
                };
            }
            
            if (sliderOptions.effect == 'fade') {
                sliderOptions['fadeEffect'] = {
                    crossFade: true,
                };
            }
        }

        /* If user have provided "data-thumb-direction" attribute then below code will execute */
        if( sliderOptions['thumbs'] != '' && sliderOptions['thumbs'] != undefined ) {
            var mdThumbDirection = _this.attr( 'data-thumb-direction' );
            sliderBreakPoint = _this.attr( 'data-thumb-breakpoint' ) !== 'undefined' ? _this.attr( 'data-thumb-breakpoint' ) : sliderBreakPoint;

            var viewportWidth = $(window).width();    
            if(viewportWidth > 767) {
                sliderOptions['thumbs']['autoScrollOffset'] = 1;
            }
            
            if( mdThumbDirection != '' && mdThumbDirection != undefined ) {
                var thumbDirection   = ( sliderOptions['thumbs']['swiper']['direction'] != '' && sliderOptions['thumbs']['swiper']['direction'] != undefined ) ? sliderOptions['thumbs']['swiper']['direction'] : mdThumbDirection;
                sliderOptions['thumbs']['swiper']['on'] = {
                    init: function() {
                        if( getWindowWidth() <= sliderBreakPoint ) {
                            this.changeDirection( mdThumbDirection );
                        } else {
                            this.changeDirection( thumbDirection );
                        }
                        this.update();
                    },
                    resize: function () {
                        if( getWindowWidth() <= sliderBreakPoint ) {
                            this.changeDirection( mdThumbDirection );
                        } else {
                            this.changeDirection( thumbDirection );
                        }
                        this.update();
                    }
                };
            }
        }
        sliderOptions['on'] = {
            init: function () {
                var length = this.loopedSlides ? this.slides.length - 2 : this.slides.length;
                /* For Number Navigation - On Swiper Initialize - Add Navigation Number */
                if (isNumberNavigation == '1') {
                    _this.find('.swiper-button-next').text( '02' );
                    _this.find('.swiper-button-prev').text( '0' + length );
                }
                /* End */
                /* Number pagination progress */
                if (isNumberPaginationProgress) {
                    _this.parent().find('.number-next').text('0' + length);
                    _this.parent().find('.number-prev').text('01');
                    _this.parent().find('.swiper-pagination-progress')[0].style.setProperty('--swiper-progress', (100 / length).toFixed(2) + '%');
                }
                /* End */
            },
            slideChange: function(swiper) {
                    var productSlider = this.$el[0];
                    if (document.querySelector('.videos-autoplay')  ) {
                        setTimeout(function(){
                            if (productSlider.querySelector('.swiper-slide-active video')) {
                                const player = new Plyr(productSlider.querySelector('.swiper-slide-active video'));
                                            window.player = player;
                                            player.play(); 
                            }
                        },250)
                        
                    }
                var length = this.loopedSlides ? this.slides.length - 2 : this.slides.length,
                    active = (this.realIndex) + 1,
                    next = active + 1,
                    prev = active - 1; 
                if ( active == 1 ) { 
                    prev = length; 
                }
                if ( active == length ) { 
                    next = 1;
                }
                /* For Number Navigation - On Swiper Slide Change - Change Navigation Number */
                if (isNumberNavigation == '1') {
                    _this.find('.swiper-button-next').text( next < 10 ? '0' + next : next ); 
                    _this.find('.swiper-button-prev').text( prev < 10 ? '0' + prev : prev ); 
                }
                /* End */
                /* Number pagination progress */
                if (isNumberPaginationProgress) {
                    _this.parent().find('.number-prev').each(function () {
                        $(this).text(active < 10 ? '0' + active : active);
                    });
                    _this.parent().find('.swiper-pagination-progress')[0].style.setProperty('--swiper-progress', ((100 / length) * active).toFixed(2) + '%');
                }
                /* End */
                if (swiper.$el.hasClass('product-image-main')) {
                    const currSlide = swiper.slides[swiper.activeIndex];
                    const mediaType = currSlide.dataset.mediaType || false;
                    const mediaHost = currSlide.dataset.mediaHost || false;

                    // Pause all videos
                    if (typeof window.currPlayingVid != typeof undefined && window.currPlayingVid != 'undefined' && window.currPlayingVid.plyrInstance.playing) {
                        window.currPlayingVid.plyrInstance.pause();
                    }

                    if (mediaType == 'model') {
                        swiper.allowTouchMove = false;
                    } else {
                        swiper.allowTouchMove = true;
                    }
                }
            }
        };
        swiperItem.sliderOptions = sliderOptions;
        var swiperObj = new Swiper(swiperItem, sliderOptions);
        window.SlideshowObjs.push(swiperItem);
    }
});
}
initSlideshow();

/****** Custom wishlist ******/
var LOCAL_STORAGE_WISHLIST_KEY = 'hongoWishlistItems',
LOCAL_STORAGE_DELIMITER = ',',
BUTTON_ACTIVE_CLASS = 'active',
GRID_LOADED_CLASS = 'loaded',
wishlistSelectors = {button: '[button-wishlist]', grid: '[grid-wishlist]'};

/****** Bind wishlist button events after ajax complete ******/
document.addEventListener('initialize:wishlist-button', function () {
initWishlistButtons();
});

document.addEventListener('trigger:wishlist-button', function (event) {
updateWishlist(event.detail.handle);
const buttons = document.querySelectorAll('[button-wishlist][data-product-handle="'+event.detail.selector.dataset.productHandle+'"]');
buttons.forEach(function(button) {
    if (wishlistContains(event.detail.handle)) {
        button.classList.add(BUTTON_ACTIVE_CLASS);
        button.setAttribute('data-bs-original-title', window.wishlistStrings.remove);
    } else {
        button.classList.remove(BUTTON_ACTIVE_CLASS);
        button.setAttribute('data-bs-original-title', window.wishlistStrings.add);
    }
    window.updateTooltip(event.detail.selector, true);
});
});

document.addEventListener('DOMContentLoaded', function () {
initWishlistButtons();
initWishlistGrid();
});
document.addEventListener('shopify-wishlist:updated', function (event) {
initWishlistGrid();
});
var setupWishlistGrid = function (grid) {
var wishlist = getWishlist();
var requests = wishlist.map(function (handle) {
    if (handle == '') {
        return;
    }
    var productTileTemplateUrl = '/products/' + handle + '?view=card';
    return fetch(productTileTemplateUrl).then(function (res) {
        return res.status === 200 ? res.text() : '';
    });
});

Promise.all(requests).then(function (responses) {
    var wishlistProductCards = responses.join('');
    let wishlistText = $('[grid-wishlist]').attr('wishlist-item-text');
    let wishlistButtonText = $('[grid-wishlist]').attr('wishlist-button-text');        

    if (!wishlistProductCards.trim()) {
        wishlistProductCards = '<div class="w-100 text-center wishlist-warning"><h6>'+wishlistText+'</h6> <a href="/collections/all" class="btn btn-medium btn-black"><i class="feather-arrow-left left-icon"></i>'+wishlistButtonText+'</a></div>';

    }
    grid.innerHTML = wishlistProductCards;
    grid.classList.add(GRID_LOADED_CLASS);
    initWishlistButtons();
    var ReloadYotpoReviews = new Yotpo.API(yotpo);
    ReloadYotpoReviews.refreshWidgets(); 
    window.initVariantChanger(document.querySelector('[grid-wishlist]'));

    var event = new CustomEvent('shopify-wishlist:init-product-grid', {
        detail: { wishlist: wishlist }
    });
    let tooltipTriggerList = grid.querySelectorAll('[data-bs-toggle="tooltip"]');
    window.initTooltips(tooltipTriggerList); 
    document.dispatchEvent(event);
});
};

var setupWishlistButtons = function (buttons) {
buttons.forEach(function (button) {
    var addedText = button.dataset.textAdded;
    var productHandle = button.dataset.productHandle || false;
    if (!productHandle) return console.error('[Hongo Wishlist] Missing `data-product-handle` attribute. Failed to update the wishlist.');
    if (wishlistContains(productHandle)) { 
        button.classList.add(BUTTON_ACTIVE_CLASS);
        button.setAttribute('data-bs-original-title', window.wishlistStrings.remove);
    }  
});
};

var initWishlistGrid = function (element) {
var grid = document.querySelector(wishlistSelectors.grid) || false;
if (grid) setupWishlistGrid(grid);
};

var initWishlistButtons = function () {
var wishlist_selectors = document.querySelectorAll('[data-wishlist-counter]');
var wishlist = getWishlist();
var wishlist_count = wishlist.length;
var add_count = document.querySelector(".icon-bubble");
wishlist_selectors.forEach (function (wishlist_selector) {
    if( wishlist_selector != null  && wishlist_selector != '' ){
    
        if( wishlist_count <= 0 ){ 
            wishlist_selector.classList.add("d-none");
            add_count.classList.add("no-count");
        }
        else{
            add_count.classList.remove("no-count");
            wishlist_selector.classList.remove("d-none");
        }
        wishlist_selector.innerHTML = wishlist_count;
    }
});    
var buttons = document.querySelectorAll(wishlistSelectors.button) || [];
if (buttons.length) setupWishlistButtons(buttons);
else return;
var event = new CustomEvent('shopify-wishlist:init-buttons', {
    detail: { wishlist: getWishlist() }
});
document.dispatchEvent(event);
};
var wishlistContains = function (handle) {
var wishlist = getWishlist();
return wishlist.indexOf(handle) !== -1;
};
var getWishlist = function () {
var wishlist = localStorage.getItem(LOCAL_STORAGE_WISHLIST_KEY) || false;
if (wishlist) return wishlist.split(LOCAL_STORAGE_DELIMITER);
return [];
};
var setWishlist = function (array) {
var wishlist = array.join(LOCAL_STORAGE_DELIMITER);
if (array.length) localStorage.setItem(LOCAL_STORAGE_WISHLIST_KEY, wishlist);
else localStorage.removeItem(LOCAL_STORAGE_WISHLIST_KEY);

var event = new CustomEvent('shopify-wishlist:updated', {
    detail: { wishlist: array }
});
document.dispatchEvent(event);

return wishlist;
};
var updateWishlist = function (handle) {
var wishlist = getWishlist();
var indexInWishlist = wishlist.indexOf(handle);
if (indexInWishlist === -1) wishlist.push(handle);
else wishlist.splice(indexInWishlist, 1);
var wishlist_selectors = document.querySelectorAll('[data-wishlist-counter]');
var add_count = document.querySelector(".icon-bubble");
wishlist_selectors.forEach ( function (wishlist_selector) {
    if( wishlist_selector != null  && wishlist_selector != '' ){
        var wishlist_count = wishlist.length;
        if( wishlist_count <= 0 ){ 
            wishlist_selector.classList.add("d-none");
            add_count.classList.add("no-count");;
        }
        else{
            wishlist_selector.classList.remove("d-none");
            add_count.classList.remove("no-count");;
        }
    
            wishlist_selector.innerHTML = wishlist_count;
    } 
});
return setWishlist(wishlist);
};
var resetWishlist = function () {
return setWishlist([]);
};
    /****** product grid-2-column js ******/
    (function() {
        'use strict';
        const breakpoint = window.matchMedia( '(min-width: 992px)' );
        let myswiper;
        let promotion_slider;
        const breakpointChecker = function() {
            if ( breakpoint.matches === true ) {
                if ( myswiper !== undefined ) myswiper.destroy();
                $('.product-media-grid-wrapper').removeClass('swiper');
                $('.product-media-grid-wrapper .product-gallery-slider').removeClass('swiper-wrapper');
                $('.product-media-grid-wrapper .product-gallery-slider').addClass('row');
                $('.product-media-grid-wrapper .product-gallery-slider .gallary-item').removeClass('swiper-slide');
                $('.product-media-grid-wrapper .product-gallery-slider .gallary-item').addClass('col');
                return;
            } else if ( breakpoint.matches === false ) {
                return enableSwiper();
            }
        };

        const enableSwiper = function() {
            $('.product-media-grid-wrapper').addClass('swiper');
            $('.product-media-grid-wrapper .product-gallery-slider').addClass('swiper-wrapper');
            $('.product-media-grid-wrapper .product-gallery-slider').removeClass('row');
            $('.product-media-grid-wrapper .product-gallery-slider .gallary-item').addClass('swiper-slide');
            $('.product-media-grid-wrapper .product-gallery-slider .gallary-item').removeClass('col');
            myswiper = new Swiper ('.product-media-grid-wrapper', {
                "slidesPerView": 1,
                "loop": true,
                "spaceBetween": 10,
                "autoplay": {
                    "delay": 5000,
                    "disableOnInteraction": false
                },
                "pagination":{
                    "el":".product-swiper-pagination",
                    "clickable":true
                },
                "keyboard":{
                    "enabled":true,
                    "onlyInViewport":true
                },
                "speed": 500
            });
        };

        var slider_count = parseInt($(".promotion_slider .product-box").attr("data-number"));
        if ( breakpoint.matches === false && slider_count !== 1 ) {
                $('.promotion-slider').addClass('swiper');
                $('.promotion-slider .slider-inner').addClass('swiper-wrapper');
                $('.promotion-slider .slider-inner').removeClass('row');
                $('.promotion-slider .slider-inner .product-box').addClass('swiper-slide');
                $('.promotion-slider .slider-inner .product-box').removeClass('col');
                promotion_slider = new Swiper ('.promotion-slider', {
                    "slidesPerView": 1,
                    "loop": true,
                    "spaceBetween": 10,
                    "autoplay": {
                        "delay": 2000,
                        "disableOnInteraction": false
                    },
                    
                    "keyboard":{
                        "enabled":true,
                        "onlyInViewport":true
                    },
                    "speed": 500,
                    "breakpoints": { 
                        320: {
                        slidesPerView: 1
                        },
                        480: {
                        slidesPerView: 2
                        }
                    }
                });
        }
        breakpoint.addListener(breakpointChecker);
        breakpointChecker();
    })();