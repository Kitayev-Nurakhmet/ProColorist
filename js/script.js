{// Оптимизированный JavaScript для мобильных устройств
	document.addEventListener('DOMContentLoaded', function () {
		const menuBtn = document.querySelector('.header-nav__btn');
		const navList = document.querySelector('.header-nav__list');

		menuBtn.addEventListener('click', function () {
			// Переключаем класс active у меню
			navList.classList.toggle('active');

			// Переключаем класс active у кнопки
			this.classList.toggle('active');
		});

		// Закрываем меню при клике на ссылку
		document.querySelectorAll('.header-nav__link').forEach(link => {
			link.addEventListener('click', () => {
				navList.classList.remove('active');
				menuBtn.classList.remove('active');
			});
		});
	});
}

{
	let items = document.querySelectorAll('.reviews-slider .reviews-slider__item');
	let next = document.getElementById('next');
	let prev = document.getElementById('prev');
	const dotsContainer = document.getElementById('dots');

	let active = 3;

	function loadShow() {
		let stt = 0;

		// Активная карточка
		items[active].style.transform = `none`;
		items[active].style.zIndex = 1;
		items[active].style.filter = "none";
		items[active].style.opacity = 1;

		// Справа от активной
		for (let i = active + 1; i < items.length; i++) {
			stt++;
			if (stt > 2) {
				items[i].style.opacity = 0;
				items[i].style.transform = 'translateX(1000px)';
			} else {
				items[i].style.transform = `translateX(${120 * stt}px) scale(${1 - 0.2 * stt}) perspective(16px) rotateY(-1deg)`;
				items[i].style.zIndex = -stt;
				items[i].style.filter = "blur(5px)";
				items[i].style.opacity = 0.6;
			}
		}

		// Слева от активной
		stt = 0;
		for (let i = active - 1; i >= 0; i--) {
			stt++;
			if (stt > 2) {
				items[i].style.opacity = 0;
				items[i].style.transform = 'translateX(-1000px)';
			} else {
				items[i].style.transform = `translateX(${-120 * stt}px) scale(${1 - 0.2 * stt}) perspective(16px) rotateY(1deg)`;
				items[i].style.zIndex = -stt;
				items[i].style.filter = "blur(5px)";
				items[i].style.opacity = 0.6;
			}
		}

		updateDots();
	}

	// Генерация точек
	items.forEach((_, index) => {
		const dot = document.createElement('span');
		dot.addEventListener('click', () => {
			active = index;
			loadShow();
		});
		dotsContainer.appendChild(dot);
	});

	// Обновление активной точки
	function updateDots() {
		const dots = dotsContainer.querySelectorAll('span');
		dots.forEach((dot, index) => {
			dot.classList.toggle('active', index === active);
		});
	}

	// Навигация стрелками
	prev.onclick = function () {
		active++;
		if (active >= items.length) active = 0;
		loadShow();
	};

	next.onclick = function () {
		active--;
		if (active < 0) active = items.length - 1;
		loadShow();
	};

	// Автоматическая смена
	setInterval(() => {
		active++;
		if (active >= items.length) active = 0;
		loadShow();
	}, 10000);

	// Первая загрузка
	loadShow();
}


{
	// Плавный скролл
	document.querySelectorAll('a[href^="#"]').forEach(anchor => {
		anchor.addEventListener('click', function (e) {
			e.preventDefault();

			const targetId = this.getAttribute('href');
			if (targetId === '#') return;

			const targetElement = document.querySelector(targetId);
			if (targetElement) {
				window.scrollTo({
					top: targetElement.offsetTop - 80,
					behavior: 'smooth'
				});
			}
		});
	});

	// Фиксированный хедер
	const header = document.querySelector('.header');
	window.addEventListener('scroll', function () {
		if (window.scrollY > 50) {
			header.classList.add('scrolled');
		} else {
			header.classList.remove('scrolled');
		}
	});
}


// Адаптация к изменению размера экрана
window.addEventListener('resize', updateCarousel);

// Оптимизация тапов для мобильных
document.querySelectorAll('button, a, input, [tabindex]').forEach(el => {
	el.style.cursor = 'pointer';
	el.addEventListener('touchstart', function () {
		this.style.transform = 'scale(0.98)';
	});
	el.addEventListener('touchend', function () {
		this.style.transform = 'scale(1)';
	});
});