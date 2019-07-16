(() => {
	console.log("fired!");

	//variable stack -> get the shields/sigils first
	const sigils = document.querySelectorAll('.sigilContainer'),
		lightBox = document.querySelector('.lightbox'),
		closeButton = document.querySelector('.close-lightbox'),
		houseVideo = document.querySelector('.house-video'),
		bannerImages = document.querySelector('#houseImages');
	
	function popLightBox() {
		//debug this so far and make sure the event handling works
		//debugger;
		

		//make lightbox show up
		lightBox.classList.add('show-lightbox');

		houseVideo.play();
	}

	function closeLightBox(event) {
		event.preventDefault();
		//make lightbox close
		lightBox.classList.remove('show-lightbox');
		houseVideo.currentTime = 0;
		houseVideo.pause();
	}

	function animateBanners() {
		// we need an offset that we can multiply by to animate
		// our banner to the left and make the active one show up
		
		let offset = 600
			multiplier = this.dataset.offset; //this is the data-offset custom data attribute
			//on each of the sigils
		console.log((offset * multiplier) + "px");

		//move banners to left using product of math
		bannerImages.style.right = `${offset * multiplier + "px"}`;

		//debugger;

	}

	//sigils.forEach(sigil => sigil.addEventListener("click", popLightBox));
	
	sigils.forEach(sigil => sigil.addEventListener("click", animateBanners));

	closeButton.addEventListener("click", closeLightBox);

	houseVideo.addEventListener('ended', closeLightBox);
})();