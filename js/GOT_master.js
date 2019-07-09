(() => {
	console.log("fired!");

	//variable stack -> get the shields/sigils first
	const sigils = document.querySelectorAll('.sigilContainer'),
		lightBox = document.querySelector('.lightbox'),
		closeButton = document.querySelector('.close-lightbox'),
		houseVideo = document.querySelector('.house-video');

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

	sigils.forEach(sigil => sigil.addEventListener("click", popLightBox));
	closeButton.addEventListener("click", closeLightBox);

	houseVideo.addEventListener('ended', closeLightBox);
})();