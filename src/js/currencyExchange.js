export default function() {

	let timerProgress,
			timer,
			minuteBlock,
			secondBlock,
			timeDefault,
			time = timeDefault,
			timeHour,
			timeMinute,
			timeSecond,
			timerInterval;

	function timerCounter() {
		if ( time > 0 ) {
			time--;
			timeHour = parseInt(time / 60 / 60);
			timeMinute = parseInt( ( time - ( timeHour * 60 * 60 ) ) / 60 );
			timeSecond = time - ( timeHour * 60 * 60 ) - ( timeMinute * 60 );
			minuteBlock.innerText = timeMinute;
			timeSecond.toString().length < 2 ? secondBlock.innerText = '0' + timeSecond : secondBlock.innerText = timeSecond;
			timerProgress.style.width = `${( timeDefault - time ) / timeDefault * 100}%`
		}
		else {
			initTimer();
			openModal('#exc-rate-change')
		}
	};

	function initTimer() {
		timerProgress = document.querySelector('.actual-course-progressbar span');
		timer = document.querySelector('.timer');
		minuteBlock = timer.querySelector('.minutes');
		secondBlock = timer.querySelector('.seconds');
		timeDefault = parseInt(timer.getAttribute('data-time'));
		time = timeDefault;
		timeHour = 0;
		timeMinute = 0;
		timeSecond = 0;
		clearInterval(timerInterval);
		timerCounter();
		timerInterval = setInterval(timerCounter, 1000);
	};

	if ( document.querySelector('.timer') ) {
		initTimer()
	}

	$('.select-location-group').each(function() {
		let ths = $(this);
		ths.find('.selected-location').on('click', function() {
			ths.toggleClass('opened')
		});
		ths.find('.select-location-item').on('click', function() {
			ths.find('.select-location-item').removeClass('active');
			$(this).addClass('active');
			ths.find('.selected-location').removeClass('muted').text($(this).find('.select-location-item-main').text());
			ths.removeClass('opened')
		});
	});

	$(document).on('click', function(e) {
		if ( !$(e.target).closest('.select-location-group').length ) {
			$('.select-location-group').removeClass('opened')
		}
	});

	function officesMapInit() {

		let officesMap = new ymaps.Map('offices-map', {
			center: [55.796554, 49.104752],
			zoom: 12,
			controls: []
		});

		let officesList = [
			{
				type: 'offices',
				cash: true,
				allDay: false,
				coords: [55.831082, 49.079644],
				content: [
					'<div class="offices__balloon-inner">',
						'<button type="button" class="offices__balloon-close">',
							'<svg width="20" height="20" aria-hidden="true" class="icon-cross"><use xlink:href="#cross"/></svg>',
						'</button>',
						'<div class="offices__balloon-inner-row">',
							'<h5>Адрес</h5>',
							'<p><strong>Казань, улица Декабристов, д.183</strong></p>',
							'<p>ДО "Декабристов"</p>',
						'</div>',
						'<div class="offices__balloon-inner-row">',
							'<h5>Время работы</h5>',
							'<table>',
								'<tr>',
									'<th><strong>Понедельник - пятница</strong></th>',
									'<td>09:00 до 19:00</td>',
								'</tr>',
								'<tr>',
									'<th><strong>Суббота</strong></th>',
									'<td>10:00 до 15:00</td>',
								'</tr>',
							'</table>',
						'</div>',
						'<div class="offices__balloon-select">',
							'<button type="button" class="offices__balloon-select-btn">Выбрать</button>',
						'</div>',
					'</div>'
				].join('')
			},
			{
				type: 'offices',
				cash: true,
				allDay: true,
				coords: [55.815159, 49.101276],
				content: [
					'<div class="offices__balloon-inner">',
						'<button type="button" class="offices__balloon-close">',
							'<svg width="20" height="20" aria-hidden="true" class="icon-cross"><use xlink:href="#cross"/></svg>',
						'</button>',
						'<div class="offices__balloon-inner-row">',
							'<h5>Адрес</h5>',
							'<p><strong>Казань, улица Декабристов, д.183</strong></p>',
							'<p>ДО "Декабристов"</p>',
						'</div>',
						'<div class="offices__balloon-inner-row">',
							'<h5>Время работы</h5>',
							'<table>',
								'<tr>',
									'<th><strong>Понедельник - пятница</strong></th>',
									'<td>09:00 до 19:00</td>',
								'</tr>',
								'<tr>',
									'<th><strong>Суббота</strong></th>',
									'<td>10:00 до 15:00</td>',
								'</tr>',
							'</table>',
						'</div>',
						'<div class="offices__balloon-select">',
							'<button type="button" class="offices__balloon-select-btn">Выбрать</button>',
						'</div>',
					'</div>'
				].join('')
			},
			{
				type: 'offices',
				cash: false,
				allDay: true,
				coords: [55.812957, 49.183735],
				content: [
					'<div class="offices__balloon-inner">',
						'<button type="button" class="offices__balloon-close">',
							'<svg width="20" height="20" aria-hidden="true" class="icon-cross"><use xlink:href="#cross"/></svg>',
						'</button>',
						'<div class="offices__balloon-inner-row">',
							'<h5>Адрес</h5>',
							'<p><strong>Казань, улица Декабристов, д.183</strong></p>',
							'<p>ДО "Декабристов"</p>',
						'</div>',
						'<div class="offices__balloon-inner-row">',
							'<h5>Время работы</h5>',
							'<table>',
								'<tr>',
									'<th><strong>Понедельник - пятница</strong></th>',
									'<td>09:00 до 19:00</td>',
								'</tr>',
								'<tr>',
									'<th><strong>Суббота</strong></th>',
									'<td>10:00 до 15:00</td>',
								'</tr>',
							'</table>',
						'</div>',
						'<div class="offices__balloon-select">',
							'<button type="button" class="offices__balloon-select-btn">Выбрать</button>',
						'</div>',
					'</div>'
				].join('')
			},
			{
				type: 'offices',
				cash: false,
				allDay: true,
				coords: [55.79474, 49.114071],
				content: [
					'<div class="offices__balloon-inner">',
						'<button type="button" class="offices__balloon-close">',
							'<svg width="20" height="20" aria-hidden="true" class="icon-cross"><use xlink:href="#cross"/></svg>',
						'</button>',
						'<div class="offices__balloon-inner-row">',
							'<h5>Адрес</h5>',
							'<p><strong>Казань, улица Декабристов, д.183</strong></p>',
							'<p>ДО "Декабристов"</p>',
						'</div>',
						'<div class="offices__balloon-inner-row">',
							'<h5>Время работы</h5>',
							'<table>',
								'<tr>',
									'<th><strong>Понедельник - пятница</strong></th>',
									'<td>09:00 до 19:00</td>',
								'</tr>',
								'<tr>',
									'<th><strong>Суббота</strong></th>',
									'<td>10:00 до 15:00</td>',
								'</tr>',
							'</table>',
						'</div>',
						'<div class="offices__balloon-select">',
							'<button type="button" class="offices__balloon-select-btn">Выбрать</button>',
						'</div>',
					'</div>'
				].join('')
			},
			];

		let objectManagerList = new ymaps.ObjectManager({
			clusterize: false,
			gridSize: 128,
			clusterIconLayout: 'default#pieChart',
			clusterHasBalloon: false,
			geoObjectOpenBalloonOnClick: false
		});
    officesMap.geoObjects.add(objectManagerList);

		officesList.forEach(function(item) {
			let mapAddOBJ = {
				id: item.coords.join('-'),
				type: 'Feature',
				geometry: {
					type: 'Point',
					coordinates: item.coords
				},
				options: _objectSpread({}, {
					iconLayout: 'default#image',
          iconImageHref: 'img/map-pins/office.svg',
          iconImageSize: window.matchMedia('(min-width: 769px)').matches ? [25, 37] : [25, 37],
          iconImageOffset: window.matchMedia('(min-width: 769px)').matches ? [-12.5, -37] : [-25, -74]
				}),
				properties: {
					type: item.type,
					allDay: item.allDay,
					cash: item.cash,
					balloonContent: item.content
				}
			};
			objectManagerList.add(mapAddOBJ);
		});

		let balloonContainerMain = $('.offices-map-ballon');

		let prevObject = false;

		objectManagerList.objects.events.add('click', function(e) {
			let objectId = e.get('objectId');
			let baloonContent = objectManagerList.objects.getById(objectId).properties.balloonContent;

			if (baloonContent) {
				balloonContainerMain.html(baloonContent);
				let button = balloonContainerMain.find('.offices__balloon-close');
				button.on('click', function(event) {
					event.preventDefault();
					balloonContainerMain.html('');
				});
				balloonContainerMain.find('.offices__balloon-select-btn').on('click', function(a) {
					a.preventDefault();
					if ( prevObject != false ) {
						objectManagerList.objects.setObjectOptions(prevObject, {
							iconImageHref: 'img/map-pins/office.svg'
						});
					}
					objectManagerList.objects.setObjectOptions(e.get('objectId'), {
						iconImageHref: 'img/map-pins/office-active.svg'
					});
					prevObject = e.get('objectId');
					balloonContainerMain.html('');
					let currLoc = objectId.split('-');
					officesMap.panTo([parseFloat(objectId.split('-')[0]), parseFloat(objectId.split('-')[1])]);
				});
			}
		});

	}

	ymaps.ready(officesMapInit);

	$('.open-map').on('click', function(e) {
		e.preventDefault();
		$('.map-slide-container').slideToggle(400)
	});

	let baseValute = $('.curexc-valute-type-from').val(),
			baseValuteCoef = {},
			currCoef = 1;

	function getBaseValuteCoef(base) {
		valuteJSON.forEach(arr => {
			if ( arr.base === base ) {
				baseValuteCoef = arr.coef
			}
		});
		let currToValute = $('.curexc-valute-type-to').val();
		currCoef = baseValuteCoef[currToValute];
	}getBaseValuteCoef(baseValute);

	$('.curexc-valute-type-from').on('change', function() {
		getBaseValuteCoef($(this).val());
		setTimeout(() => {
			$('.curexc-value-from').trigger('change')
		}, 10)
	});

	$('.curexc-valute-type-to').on('change', function() {
		currCoef = baseValuteCoef[$(this).val()];
		setTimeout(() => {
			$('.curexc-value-from').trigger('change')
		}, 10)
	});

	$('.curexc-value-from').on('change', function() {
		setTimeout(() => {
			let currVal = (parseFloat($(this).val()) * currCoef).toFixed(0);
			$('.curexc-value-to + .range-slider__element-wrapper .range-slider__amount').val(currVal);
			// $('.curexc-value-to + .range-slider__element-wrapper .range-slider__element')[0].noUiSlider.setHandle(null, currVal)
		}, 10)
	});

	$('.curexc-value-to').on('change', function() {
		let thisVal = parseFloat($(this).val());
		$('.curexc-value-from + .range-slider__element-wrapper .range-slider__amount').val((thisVal / currCoef).toFixed(0))
	});

	$('.curexc-next').on('click', function(e) {
		e.preventDefault();
		let act = $('.application__form-steps-layer.active'),
				step = parseInt(act.data('step'));
		if ( $(this).hasClass('check-phone') ) {
			openModal('#application-code-2')
		}
		else {
			nextStep(step + 1);
		}
	});

	$('.curexc-prev').on('click', function(e) {
		e.preventDefault();
		let act = $('.application__form-steps-layer.active'),
				step = parseInt(act.data('step'));
		if ( step != 1  ) {
			nextStep(step - 1)
		}
	})

	$('.curexc-first-step').on('click', function(e) {
		nextStep(1);
	})

	function nextStep(i) {
		$('.application__steps-new-list-item').removeClass('active');
		$('.application__steps-new-list-item').eq(i - 1).addClass('active');
		$('.application__form-steps-layer').removeClass('active');
		$(`.application__form-steps-layer[data-step="${i}"]`).addClass('active');
		if ( i == 1 ) {
			$('.curexc-total').removeClass('active');
			$('.curexc-footer-checkboxes').removeClass('active');
			$('.curexc-prev').removeClass('active');
			$('.curexc-first-step').removeClass('active');
			$('.curexc-right').show();
			$('.curexc-to-main').removeClass('active');
			$('.curexc-next').removeClass('hide').removeClass('check-phone');
			$('.curexc-form').css('--progress', '33.33333%');
		}
		else if ( i == 2 ) {
			$('.curexc-total').addClass('active');
			$('.curexc-footer-checkboxes').addClass('active');
			$('.curexc-prev').addClass('active');
			$('.curexc-first-step').removeClass('active');
			$('.curexc-right').show();
			$('.curexc-to-main').removeClass('active');
			$('.curexc-next').removeClass('hide').addClass('check-phone');
			$('.curexc-form').css('--progress', '66.66666%');
		}
		else if ( i == 3 ) {
			$('.curexc-total').addClass('active');
			$('.curexc-footer-checkboxes').removeClass('active');
			$('.curexc-prev').removeClass('active');
			$('.curexc-first-step').addClass('active');
			$('.curexc-right').hide();
			$('.curexc-to-main').addClass('active');
			$('.curexc-next').addClass('hide').removeClass('check-phone');
			$('.curexc-form').css('--progress', '100%');
			setTimeout(() => {
				openModal('#reminder')
			}, 1000)
		}
	}

	$('.js-curexc-next-step').on('click', function(e) {
		e.preventDefault();
		nextStep(3)
	});

}