function navigateToPage(pageId) {
	var pages = document.querySelectorAll('.sm64coopdx-page');
	pages.forEach(function (page) {
		page.style.display = (page.id === pageId) ? 'block' : 'none';
	});
	window.scrollTo({
		top: 0,
		left: 0,
		behavior: 'smooth'
	});
}

const svgUrls = [
	'https://mario.wiki.gallery/images/f/fb/PN_Quick_Draw_image_Mario_bw.svg',
	'https://mario.wiki.gallery/images/7/77/PN_Quick_Draw_image_Luigi_bw.svg',
	'https://mario.wiki.gallery/images/6/6e/PN_Quick_Draw_image_Peach_bw.svg',
	'https://mario.wiki.gallery/images/f/fa/PN_Quick_Draw_image_DK_bw.svg',
	'https://mario.wiki.gallery/images/a/a1/PN_Quick_Draw_image_Yoshi_bw.svg',
	'https://mario.wiki.gallery/images/4/4c/PN_Quick_Draw_image_Bowser_bw.svg',
	'https://mario.wiki.gallery/images/8/89/PN_Quick_Draw_image_Goomba_bw.svg',
	'https://mario.wiki.gallery/images/0/00/PN_Quick_Draw_image_Boo_bw.svg',
	'https://mario.wiki.gallery/images/a/a2/PN_Quick_Draw_image_Cheep_bw.svg',
	'https://mario.wiki.gallery/images/f/fe/PN_Quick_Draw_image_Bob-Omb_bw.svg',
	'https://mario.wiki.gallery/images/4/46/PN_Quick_Draw_image_Super_Mushroom_bw.svg',
	'https://mario.wiki.gallery/images/3/36/PN_Quick_Draw_image_Coin_bw.svg',
	'https://mario.wiki.gallery/images/c/c9/PN_Quick_Draw_image_Star_bw.svg',
	'https://mario.wiki.gallery/images/a/aa/PN_Quick_Draw_image_Fire_Flower_bw.svg',
	'https://mario.wiki.gallery/images/b/be/PN_Quick_Draw_image_Koopa_Shell_bw.svg',
	'https://mario.wiki.gallery/images/7/78/PN_Quick_Draw_image_Yoshi_Egg_bw.svg'
];

function rndI(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function loadAndModifySVG(svgUrl, callback) {
	fetch(svgUrl)
		.then(response => response.text())
		.then(svgData => {
			let parser = new DOMParser();
			let doc = parser.parseFromString(svgData, "image/svg+xml");
			let svgElement = doc.documentElement;
			if (!svgElement.getAttribute('viewBox') && svgElement.hasAttribute('width') && svgElement.hasAttribute('height')) {
				let width = svgElement.getAttribute('width').replace(/px/, '');
				let height = svgElement.getAttribute('height').replace(/px/, '');
				svgElement.setAttribute('viewBox', `0 0 ${width} ${height}`);
			}

			let size = rndI(100, 300);
			svgElement.setAttribute('width', size + 'px');
			svgElement.setAttribute('height', size + 'px');
			svgElement.setAttribute('preserveAspectRatio', 'xMidYMid meet');

			let elementsWithFill = svgElement.querySelectorAll('[fill]');
			let colorRndR = rndI(0, 255);
			let colorRndG = rndI(0, 255);
			let colorRndB = rndI(0, 255);
			let colorRndA = (rndI(20, 70) / 100.0);

			elementsWithFill.forEach((element, index) => {
				let fillValue = element.getAttribute('fill').toUpperCase();
				if (fillValue === '#FFF' || fillValue === '#FFFFFF' || fillValue === "NONE") {
					element.setAttribute('fill', 'rgba(0, 0, 0, 0)');
				} else {
					element.setAttribute('fill', 'rgba(' + colorRndR + ', ' + colorRndG + ', ' + colorRndB + ', ' + colorRndA + ')');
				}
			});

			callback(svgElement);
		}).catch(error => console.error('Error loading the SVG:', error));
}

function createRandomSVG() {
	let randomSvgUrl = svgUrls[rndI(0, svgUrls.length - 1)];
	loadAndModifySVG(randomSvgUrl, svgElement => {
		let wrappingElement = document.createElement("li");
		wrappingElement.style.left = (rndI(-30, 100) + "vw");
		wrappingElement.style.width = ((rndI(500, 3000) / 200.0) + "vh");
		wrappingElement.style.height = wrappingElement.style.width;
		wrappingElement.style.background = "none";
		let delayRnd = rndI(0, 30);
		wrappingElement.style["-moz-animation-delay"] = (delayRnd + "s");
		wrappingElement.style["-webkit-animation-delay"] = (delayRnd + "s");
		wrappingElement.style["-o-animation-delay"] = (delayRnd + "s");
		wrappingElement.style["-ms-animation-delay"] = (delayRnd + "s");
		wrappingElement.style["-khtml-animation-delay"] = (delayRnd + "s");
		wrappingElement.style["animation-delay"] = (delayRnd + "s");
		let durationRnd = rndI(20, 60);
		wrappingElement.style["-moz-animation-duration"] = (durationRnd + "s");
		wrappingElement.style["-webkit-animation-duration"] = (durationRnd + "s");
		wrappingElement.style["-o-animation-duration"] = (durationRnd + "s");
		wrappingElement.style["-ms-animation-duration"] = (durationRnd + "s");
		wrappingElement.style["-khtml-animation-duration"] = (durationRnd + "s");
		wrappingElement.style["animation-duration"] = (durationRnd + "s");
		wrappingElement.appendChild(svgElement);
		document.getElementById("idsvglist").appendChild(wrappingElement);
	});
}

window.addEventListener("load", function () {
	for (let index = 0; index < rndI(75, 150); index++) {
		createRandomSVG();
	}
});

for (let i = 0; i < rndI(75, 150); i++) {
	createRandomSVG();
}

$(function () {
	var body = $('#starshine'),
		template = $('.template.shine'),
		stars = 100,
		sparkle = 20;


	var size = 'small';
	var createStar = function () {
		template.clone().removeAttr('id').css({
			top: (Math.random() * 95) + '%',
			left: (Math.random() * 95) + '%',
			webkitAnimationDelay: (Math.random() * sparkle) + 's',
			mozAnimationDelay: (Math.random() * sparkle) + 's'
		}).addClass(size).appendTo(body);
	};

	for (var i = 0; i < stars; i++) {
		if (i % 2 === 0) {
			size = 'small';
		} else if (i % 3 === 0) {
			size = 'medium';
		} else {
			size = 'large';
		}

		createStar();
	}
});

document.addEventListener('DOMContentLoaded', function () {
	const imgElement = document.getElementById('shineimg');
	let clickAmount = 0;
	let passesAmount = 0;
	let clicksAmountMax = 16;

	imgElement.addEventListener('click', function () {
		clickAmount++;
		if (clickAmount >= clicksAmountMax) {
			clickAmount = 0;
			passesAmount++;
			let audio = new Audio(passesAmount < 2 ? 'sm64correctsolution.mp3' : passesAmount < 3 ? 'nsmbdslevelclear.mp3' : passesAmount < 4 ? 'mamamia.mp3' : 'sm64koopasmessage.mp3');
			audio.onended = function () {
				if (passesAmount < 2) {
					window.open('https://uploads.ungrounded.net/ruffle_wrapper/ruffleembed.html?v=1.0.67&useloader=1&browsermode=mobile&props=%7B%22ruffle%22:%22/ruffle_wrapper/lib/ruffle.js%22,%22public_path%22:%22/ruffle_wrapper/lib/%22,%22swf%22:%22https://uploads.ungrounded.net/498000/498969_Super_Mario_63__2009_.swf%22,%22width%22:99999,%22height%22:99999,%22icon%22:%22https://picon.ngfiles.com/498000/flash_498969_card.png%22,%22warnOnUnsupportedContent%22:false%7D', '_blank');
				} else if (passesAmount < 3) {
					window.open('https://ipodtouch0218.itch.io/nsmb-mariovsluigi', '_blank');
				} else if (passesAmount < 4) {
					window.open('https://www.youtube.com/watch?v=CPJcaGWoO2c', '_blank');
				} else {
					window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
				}
			};
			audio.play().catch(function (e) {
				console.error("Audio file sm64correctsolution.mp3 could not be played back:", e);
			});
		}
	});
});

window.scrollTo({
	top: 0,
	left: 0,
	behavior: 'smooth'
});
