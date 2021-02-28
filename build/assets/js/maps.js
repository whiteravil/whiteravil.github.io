function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly)
            symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
        keys.push.apply(keys, symbols);
    }
    return keys;
}

function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};
        if (i % 2) {
            ownKeys(Object(source), true).forEach(function(key) {
                _defineProperty(target, key, source[key]);
            });
        } else if (Object.getOwnPropertyDescriptors) {
            Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
        } else {
            ownKeys(Object(source)).forEach(function(key) {
                Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
            });
        }
    }
    return target;
}

function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
    } else {
        obj[key] = value;
    }
    return obj;
}

ymaps.ready(init);

function init() {
    var mainMap = document.querySelector('.js-main-offices-map');
    if (!mainMap) return;
    var map = new ymaps.Map(mainMap, {
        center: [55.796554, 49.104752],
        zoom: 12,
        controls: []
    });
    var checkboxes = Array.from(document.querySelectorAll('.js-office-categories .offices__checkbox-input:not([name="all"])'));
    var allCheckbox = document.querySelector('.js-office-categories .offices__checkbox-input[name="all"]');
    var innerMapElements = Array.from(document.querySelectorAll('.js-offices-inner-map'));
    var balloonContainer = document.querySelector('.js-offices-balloon-container');
    console.log({
        allCheckbox: allCheckbox,
        checkboxes: checkboxes
    });
    var mapPinImages = {
        offices: {
            iconLayout: 'default#image',
            iconImageHref: 'img/map-pins/office.svg',
            iconImageSize: window.matchMedia('(min-width: 769px)').matches ? [25, 37] : [25, 37],
            iconImageOffset: window.matchMedia('(min-width: 769px)').matches ? [-12.5, -37] : [-25, -74]
        },
        bankomats: {
            iconLayout: 'default#image',
            iconImageHref: 'img/map-pins/bankomat.svg',
            iconImageSize: window.matchMedia('(min-width: 769px)').matches ? [25, 37] : [25, 37],
            iconImageOffset: window.matchMedia('(min-width: 769px)').matches ? [-12.5, -37] : [-25, -74]
        },
        partners: {
            iconLayout: 'default#image',
            iconImageHref: 'img/map-pins/bankomat-partner.svg',
            iconImageSize: window.matchMedia('(min-width: 769px)').matches ? [25, 37] : [25, 37],
            iconImageOffset: window.matchMedia('(min-width: 769px)').matches ? [-12.5, -37] : [-25, -74]
        },
        terminals: {
            iconLayout: 'default#image',
            iconImageHref: 'img/map-pins/terminal.svg',
            iconImageSize: window.matchMedia('(min-width: 769px)').matches ? [25, 37] : [25, 37],
            iconImageOffset: window.matchMedia('(min-width: 769px)').matches ? [-12.5, -37] : [-25, -74]
        }
    };
    var mainMapData = [
        {
            type: 'offices',
            cash: true,
            allDay: false,
            coords: [55.831082, 49.079644],
            content:
                '<div class="offices__balloon-inner"><button class="offices__balloon-close"><svg width="20" height="20" aria-hidden="true" class="icon-cross"> <use xlink:href="#cross"/> </svg> </button> <div class="offices__balloon-inner-row"><h5>Адрес</h5><p><strong>Казань, улица Декабристов, д.183</strong></p><p>ДО "Декабристов"</p></div><div class="offices__balloon-inner-row"> <h5>Время работы</h5> <table> <tr> <th><strong>Понедельник - пятница</strong></th> <td>09:00 до 19:00</td></tr><tr> <th><strong>Суббота</strong></th> <td>10:00 до 15:00</td></tr></table> </div><div class="offices__balloon-inner-row"><h5>Функционал</h5> <div class="offices__balloon-features"> <img src="img/features-1.svg" class="offices__balloon-features-icon"/><img src="img/features-2.svg" class="offices__balloon-features-icon"/></div></div></div>'
        },
        {
            type: 'offices',
            cash: true,
            allDay: true,
            coords: [55.815159, 49.101276],
            content:
                '<div class="offices__balloon-inner"> <button class="offices__balloon-close"> <svg width="20" height="20" aria-hidden="true" class="icon-cross"> <use xlink:href="#cross"/> </svg> </button> <div class="offices__balloon-inner-row"> <h5>Адрес</h5> <p><strong>Казань, улица Декабристов, д.183</strong></p><p>ДО "Декабристов"</p></div><div class="offices__balloon-inner-row"> <h5>Время работы</h5> <table> <tr> <th><strong>Понедельник - пятница</strong></th> <td>09:00 до 19:00</td></tr><tr> <th><strong>Суббота</strong></th> <td>10:00 до 15:00</td></tr></table> </div><div class="offices__balloon-inner-row"> <h5>Функционал</h5> <div class="offices__balloon-features"> <img src="img/features-1.svg" class="offices__balloon-features-icon"/> <img src="img/features-2.svg" class="offices__balloon-features-icon"/> </div></div></div>'
        },
        {
            type: 'offices',
            cash: false,
            allDay: true,
            coords: [55.812957, 49.183735],
            content:
                '<div class="offices__balloon-inner"> <button class="offices__balloon-close"> <svg width="20" height="20" aria-hidden="true" class="icon-cross"> <use xlink:href="#cross"/> </svg> </button> <div class="offices__balloon-inner-row"> <h5>Адрес</h5> <p><strong>Казань, улица Декабристов, д.183</strong></p><p>ДО "Декабристов"</p></div><div class="offices__balloon-inner-row"> <h5>Время работы</h5> <table> <tr> <th><strong>Понедельник - пятница</strong></th> <td>09:00 до 19:00</td></tr><tr> <th><strong>Суббота</strong></th> <td>10:00 до 15:00</td></tr></table> </div><div class="offices__balloon-inner-row"> <h5>Функционал</h5> <div class="offices__balloon-features"> <img src="img/features-1.svg" class="offices__balloon-features-icon"/> <img src="img/features-2.svg" class="offices__balloon-features-icon"/> </div></div></div>'
        },
        {
            type: 'offices',
            cash: false,
            allDay: true,
            coords: [55.79474, 49.114071],
            content:
                '<div class="offices__balloon-inner"> <button class="offices__balloon-close"> <svg width="20" height="20" aria-hidden="true" class="icon-cross"> <use xlink:href="#cross"/> </svg> </button> <div class="offices__balloon-inner-row"> <h5>Адрес</h5> <p><strong>Казань, улица Декабристов, д.183</strong></p><p>ДО "Декабристов"</p></div><div class="offices__balloon-inner-row"> <h5>Время работы</h5> <table> <tr> <th><strong>Понедельник - пятница</strong></th> <td>09:00 до 19:00</td></tr><tr> <th><strong>Суббота</strong></th> <td>10:00 до 15:00</td></tr></table> </div><div class="offices__balloon-inner-row"> <h5>Функционал</h5> <div class="offices__balloon-features"> <img src="img/features-1.svg" class="offices__balloon-features-icon"/> <img src="img/features-2.svg" class="offices__balloon-features-icon"/> <img src="img/features-1.svg" class="offices__balloon-features-icon"/> <img src="img/features-2.svg" class="offices__balloon-features-icon"/> </div></div></div>'
        },
        {
            type: 'bankomats',
            cash: false,
            allDay: false,
            coords: [55.833308, 49.132141],
            content:
                '<div class="offices__balloon-inner"> <button class="offices__balloon-close"> <svg width="20" height="20" aria-hidden="true" class="icon-cross"> <use xlink:href="#cross"/> </svg> </button> <div class="offices__balloon-inner-row"> <h5>Адрес</h5> <p><strong>Казань, улица Декабристов, д.183</strong></p><p>ДО "Декабристов"</p></div><div class="offices__balloon-inner-row"> <h5>Время работы</h5> <table> <tr> <th><strong>Понедельник - пятница</strong></th> <td>09:00 до 19:00</td></tr><tr> <th><strong>Суббота</strong></th> <td>10:00 до 15:00</td></tr></table> </div><div class="offices__balloon-inner-row"> <h5>Функционал</h5> <div class="offices__balloon-features"> <img src="img/features-1.svg" class="offices__balloon-features-icon"/> <img src="img/features-2.svg" class="offices__balloon-features-icon"/> </div></div></div>'
        },
        {
            type: 'bankomats',
            cash: true,
            allDay: false,
            coords: [55.776266, 49.140724],
            content:
                '<div class="offices__balloon-inner"> <button class="offices__balloon-close"> <svg width="20" height="20" aria-hidden="true" class="icon-cross"> <use xlink:href="#cross"/> </svg> </button> <div class="offices__balloon-inner-row"> <h5>Адрес</h5> <p><strong>Казань, улица Декабристов, д.183</strong></p><p>ДО "Декабристов"</p></div><div class="offices__balloon-inner-row"> <h5>Время работы</h5> <table> <tr> <th><strong>Понедельник - пятница</strong></th> <td>09:00 до 19:00</td></tr><tr> <th><strong>Суббота</strong></th> <td>10:00 до 15:00</td></tr></table> </div><div class="offices__balloon-inner-row"> <h5>Функционал</h5> <div class="offices__balloon-features"> <img src="img/features-1.svg" class="offices__balloon-features-icon"/> <img src="img/features-2.svg" class="offices__balloon-features-icon"/> <img src="img/features-1.svg" class="offices__balloon-features-icon"/> </div></div></div>'
        },
        {
            type: 'partners',
            cash: false,
            allDay: false,
            coords: [55.748973, 49.104675],
            content:
                '<div class="offices__balloon-inner"> <button class="offices__balloon-close"> <svg width="20" height="20" aria-hidden="true" class="icon-cross"> <use xlink:href="#cross"/> </svg> </button> <div class="offices__balloon-inner-row"> <h5>Адрес</h5> <p><strong>Казань, улица Декабристов, д.183</strong></p><p>ДО "Декабристов"</p></div><div class="offices__balloon-inner-row"> <h5>Время работы</h5> <table> <tr> <th><strong>Понедельник - пятница</strong></th> <td>09:00 до 19:00</td></tr><tr> <th><strong>Суббота</strong></th> <td>10:00 до 15:00</td></tr></table> </div><div class="offices__balloon-inner-row"> <h5>Функционал</h5> <div class="offices__balloon-features"> <img src="img/features-1.svg" class="offices__balloon-features-icon"/> <img src="img/features-2.svg" class="offices__balloon-features-icon"/> </div></div></div>'
        },
        {
            type: 'terminals',
            cash: true,
            allDay: true,
            coords: [55.744519, 49.218315],
            content:
                '<div class="offices__balloon-inner"> <button class="offices__balloon-close"> <svg width="20" height="20" aria-hidden="true" class="icon-cross"> <use xlink:href="#cross"/> </svg> </button> <div class="offices__balloon-inner-row"> <h5>Адрес</h5> <p><strong>Казань, улица Декабристов, д.183</strong></p><p>ДО "Декабристов"</p></div><div class="offices__balloon-inner-row"> <h5>Время работы</h5> <table> <tr> <th><strong>Понедельник - пятница</strong></th> <td>09:00 до 19:00</td></tr><tr> <th><strong>Суббота</strong></th> <td>10:00 до 15:00</td></tr></table> </div><div class="offices__balloon-inner-row"> <h5>Функционал</h5> <div class="offices__balloon-features"> <img src="img/features-1.svg" class="offices__balloon-features-icon"/> <img src="img/features-2.svg" class="offices__balloon-features-icon"/> </div></div></div>'
        }
    ];
    map.controls.add('zoomControl', {
        position: {
            left: 'auto',
            right: 20,
            bottom: 40,
            top: 'auto'
        }
    });
    var objectManager = new ymaps.ObjectManager({
        clusterize: false,
        gridSize: 128,
        clusterIconLayout: 'default#pieChart',
        clusterHasBalloon: false,
        geoObjectOpenBalloonOnClick: false
    });
    map.geoObjects.add(objectManager);


    var allDayCheckbox = document.querySelector('.catalog__filters-checkmarks-input[name="allday"]');
    var cashCheckbox = document.querySelector('.catalog__filters-checkmarks-input[name="cash"]');


    var regimeCheckboxes = [allDayCheckbox, cashCheckbox]

    var filterObjects = function filterObjects() {

        if (allCheckbox.checked) {
            objectManager.setFilter(function(object) {
                // console.log({
                //     allDayCheckbox: allDayCheckbox.checked,
                //     cashCheckbox: cashCheckbox.checked,
                //     object,
                //     allDay: object.properties.allDay,
                //     cash: object.properties.cash
                // })
                if (allDayCheckbox.checked && !object.properties.allDay) {
                    return false;
                }
                if (cashCheckbox.checked && !object.properties.cash) {
                    return false;
                }
                return true;
            })
        } else {
            objectManager.setFilter(function(object) {
                var activeCheckboxesNames = checkboxes
                .filter(function(checkbox) {
                    return checkbox.checked;
                })
                .map(function(checkbox) {
                    return checkbox.name;
                });
                if (activeCheckboxesNames.includes(object.properties.type)) {
                    if (allDayCheckbox.checked && !object.properties.allDay) {
                        return false;
                    }
                    if (cashCheckbox.checked && !object.properties.cash) {
                        return false;
                    }
                    return true;
                } else {
                    return false;
                }
            })
        }
    };

    var filterAccordions = function() {
        var accordions = Array.prototype.slice.call(document.querySelectorAll('.offices__list-view-accordion'));

        accordions.forEach(function(accordion) {
            if (allDayCheckbox.checked && !accordion.hasAttribute('data-allday')) {
                accordion.classList.add('hidden');
                return;
            }
            if (cashCheckbox.checked && !accordion.hasAttribute('data-cash')) {
                accordion.classList.add('hidden');
                return;
            }
            accordion.classList.remove('hidden');
        });

        console.log('Filtered accordions', accordions)
    }

    var filterListViewItems = function filterListViewItems() {
        var items = Array.prototype.slice.call(document.querySelectorAll('.offices__list-view-group'));

        if (allCheckbox.checked) {
            items.forEach(function(item) {
                return item.classList.remove('hidden');
            });
        } else {
            var activeCheckboxesNames = checkboxes
                .filter(function(checkbox) {
                    return checkbox.checked;
                })
                .map(function(checkbox) {
                    return checkbox.name;
                });
            items.forEach(function(item) {
                var type = item.getAttribute('data-type');

                if (activeCheckboxesNames.includes(type)) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            }); // console.log('Active checkboxes for list view', activeCheckboxesNames);
        }
    };

    filterObjects();
    filterListViewItems();
    filterAccordions();
    console.log('Hello', checkboxes);

    var handleChange = function handleChange(event) {
        var checkedBoxes = checkboxes.filter(function(checkbox) {
            return checkbox.checked;
        });
        var allChecked = allCheckbox.checked;
        var targetIsAllCheckbox = event.target === allCheckbox;
        console.log('Checkbox changed', {
            checkedBoxes: checkedBoxes,
            allChecked: allChecked,
            targetIsAllCheckbox: targetIsAllCheckbox
        });

        if (targetIsAllCheckbox && allChecked && checkedBoxes.length) {
            checkboxes.forEach(function(box) {
                return (box.checked = false);
            });
        } else if (!targetIsAllCheckbox && allChecked && checkedBoxes.length) {
            allCheckbox.checked = false;
        } else if (!targetIsAllCheckbox && !allChecked && !checkedBoxes.length) {
            allCheckbox.checked = true;
        } else if (targetIsAllCheckbox && !allChecked && !checkedBoxes.length) {
            allCheckbox.checked = true;
        }

        filterObjects();
        filterListViewItems();
        filterAccordions();
    };

    checkboxes.forEach(function(element) {
        return element.addEventListener('change', handleChange);
    });
    allCheckbox.addEventListener('change', handleChange);


    regimeCheckboxes.forEach(function(checkbox) {
        if (checkbox) {
            checkbox.addEventListener('change', handleChange)
        }
       
    })
    mainMapData.forEach(function(item) {
        var objectToAdd = {
            id: item.coords.join('-'),
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: item.coords
            },
            options: _objectSpread({}, mapPinImages[item.type]),
            properties: {
                type: item.type,
                allDay: item.allDay,
                cash: item.cash,
                balloonContent: item.content
            }
        };
        objectManager.add(objectToAdd);
    });
    innerMapElements.forEach(function(mapElement) {
        var lat = mapElement.getAttribute('data-lat');
        var lng = mapElement.getAttribute('data-lng');
        var type = mapElement.getAttribute('data-type');
        var innerMapInstance = new ymaps.Map(mapElement, {
            center: [lat, lng],
            zoom: 12,
            controls: []
        });
        var placemark = new ymaps.Placemark([lat, lng], {}, _objectSpread({}, mapPinImages[type]));
        innerMapInstance.geoObjects.add(placemark);
    });
    var suggestView = new ymaps.SuggestView('suggest', {
        results: 7
    });
    objectManager.objects.events.add(['click'], function(e) {
        var objectId = e.get('objectId');
        var baloonContent = objectManager.objects.getById(objectId).properties.balloonContent;

        if (baloonContent) {
            balloonContainer.innerHTML = baloonContent;
            var button = balloonContainer.querySelector('button');
            button.addEventListener('click', function(event) {
                event.preventDefault();
                balloonContainer.innerHTML = '';
            });
        }
    });
    suggestView.events.add('select', function(e) {
        var suggestion = e.get('item');
        ymaps.geocode(suggestion.value).then(
            function(res) {
                var firstGeoObject = res.geoObjects.get(0);
                var coords = firstGeoObject.geometry.getCoordinates();
              

                map.setCenter(coords, 15);
            },
            function(err) {
                console.error(err);
            }
        );
    });
}
