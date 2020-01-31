// SMOOTH SCROLL
const anchors = document.querySelectorAll('a[href*="#"]')

for (let anchor of anchors) {
  anchor.addEventListener('click', function (e) {
    e.preventDefault()
    
    const blockID = anchor.getAttribute('href').substr(1)
    
    document.getElementById(blockID).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  })
}
// SLIDER
var multiItemSlider = (function () {
      return function (selector, config) { 
        var
          slider = document.querySelector(selector), 
          sliderWrapper = slider.querySelector('.js-slider__wrapper'), 
          sliderItems = slider.querySelectorAll('.js-slider__item'), 
          sliderControls = slider.querySelectorAll('.js-slider__control'), 
          wrapperWidth = parseFloat(getComputedStyle(sliderWrapper).width), 
          itemWidth = parseFloat(getComputedStyle(sliderItems[0]).width),    
          positionLeftItem = 0, 
          transform = 0, 
          step = itemWidth / wrapperWidth * 100, 
          items = []; 

        sliderItems.forEach(function (item, index) {
          items.push({ item: item, position: index, transform: 0 });
        });

        var position = {
          getMin: 0,
          getMax: items.length - 1,
        }

        var _transformItem = function (direction) {
          if (direction === 'right') {
            if ((positionLeftItem + wrapperWidth / itemWidth - 1) >= position.getMax) {
              return;
            }
            positionLeftItem++;
            transform -= step;
          }
          if (direction === 'left') {
            if (positionLeftItem <= position.getMin) {
              return;
            }
            positionLeftItem--;
            transform += step;
          }
          sliderWrapper.style.transform = 'translateX(' + transform + '%)';
        }

        var _controlClick = function (e) {
          if (e.target.classList.contains('js-slider__control')) {
            e.preventDefault();
            var direction = e.target.classList.contains('js-slider__control_right') ? 'right' : 'left';
            _transformItem(direction);
          }
        };

        var _setUpListeners = function () {
          sliderControls.forEach(function (item) {
            item.addEventListener('click', _controlClick);
          });
        }

        _setUpListeners();

        return {
          right: function () { 
            _transformItem('right');
          },
          left: function () { 
            _transformItem('left');
          }
        }

      }
    }());

    var slider = multiItemSlider('.js-slider');
// Прокручивание слайдера к определенному товару