(() => {
	console.log("fired!");

	//variable stack -> get the shields/sigils first
	const sigils = document.querySelectorAll('.sigilContainer'),
		lightBox = document.querySelector('.lightbox'),
		closeButton = document.querySelector('.close-lightbox'),
		houseVideo = document.querySelector('.house-video'),
		bannerImages = document.querySelector('#houseImages'),
		familyName = document.querySelector('#house-name'),
		houseInfo = document.querySelector('.house-info'),
		backButton = document.querySelector('#back'),
		playButton = document.querySelector('#play'),
		pauseButton = document.querySelector('#pause'),
		forwardButton = document.querySelector('#forward');

	let targetHouse = "";

	const houseData = [ // houseData[0][1]
		["stark", `House Stark of Winterfell is a Great House of Westeros, ruling over the vast region known as the North from their seat in Winterfell. It is one of the oldest lines of Westerosi nobility by far, claiming a line of descent stretching back over eight thousand years. Before the Targaryen conquest, as well as during the War of the Five Kings and Daenerys Targaryen's invasion of Westeros, the leaders of House Stark ruled over the region as the Kings in the North.`], 
		["baratheon", `House Baratheon of Storm's End is a legally extinct Great House of Westeros. A cadet branch was formerly the royal house, but House Lannister now controls the throne. House Baratheon traditionally ruled the Stormlands on the eastern coast of Westeros, aptly named for its frequent storms, from their seat of Storm's End.

House Baratheon became the royal house of the Seven Kingdoms after Robert Baratheon led a rebellion against the Targaryen dynasty. At the end of the rebellion, Robert ascended the Iron Throne as Robert I and married Cersei Lannister after the death of Lyanna Stark.`],
		["lannister", `House Lannister of Casterly Rock is one of the Great Houses of Westeros, one of its richest and most powerful families and oldest dynasties. It is also the current royal house of the Seven Kingdoms following the extinction of House Baratheon of King's Landing, which had been their puppet house anyway.

The Lannisters rule over the Westerlands. Their seat is Casterly Rock, a massive rocky promontory overlooking the Sunset Sea which has had habitations and fortifications built into it over the millennia. They are the Lords Paramount of the Westerlands and Wardens of the West. As the new royal house, they also rule directly over the Crownlands from their seat of the Red Keep in King's Landing, the traditional seat of the royal family.`], 
		["tully", `House Tully of Riverrun is an exiled Great House of Westeros. Its most senior member carried the title of Lord of Riverrun and Lord Paramount of the Trident, until the Red Wedding. The current head is Lord Edmure Tully, son of the late Hoster Tully. The Tully sigil is a silver trout on a red and blue background. Their house words are "Family, Duty, Honor."`],
		["greyjoy", `House Greyjoy of Pyke is one of the Great Houses of Westeros. It rules over the Iron Islands, a harsh and bleak collection of islands off the west coast of Westeros, from the castle at Pyke. The head of the house is the Lord Reaper of Pyke.

House Greyjoy's sigil is traditionally a golden kraken on a black field. Their house words are "We Do Not Sow," although the phrase "What Is Dead May Never Die" is also closely associated with House Greyjoy and their bannermen, as they are associated with the faith of the Drowned God.`], 
		["arryn", `House Arryn of the Eyrie is one of the Great Houses of Westeros. It has ruled over the Vale of Arryn for millennia, originally as the Kings of Mountain and Vale and more recently as Lords Paramount of the Vale and Wardens of the East under the Targaryen kings and Baratheon-Lannister kings. The nominal head of House Arryn is Robin Arryn, the Lord of the Eyrie, with his stepfather Petyr Baelish acting as Lord Protector until he reaches the age of majority.`],

		["frey", `The Freys served as bannermen to House Tully for generations, shoring up their wealth by charging travelers a fee to cross over the Trident River via their castle, The Twins,  Ever ambitious, the family tended to marry up, a tradition encouraged by then Lord of the Crossing, Walder Frey. After ambushing the Stark troops at the wedding,  of his daughter Roslin, Walder Frey assumed the title of Lord Paramount of the Riverlands, though he had to ask the Lannisters for help in re-taking the Tully castle of Riverrun. Walder, and the rest of the Frey men, were murdered by Arya Stark in revenge for the Red Wedding.`],

		["tyrell", `For centuries, the Tyrells served and occasionally intermarried with House Gardener, the ancient family of the King of the Reach. But after the Targaryen conquest eliminated the Gardeners, the Tyrells bent the knee to the Iron Throne – and then rose to become principal house and Warden of the South. They allied with the Lannisters until Cersei Lannister blew the Sept of Baelor, killing Lord Mace, Queen Margaery, and the heir to House Tyrell, Loras. After the death of her grandchildren Olenna Tyrell entered into an alliance with Ellaria Sand in support of the Targaryen cause. House Tyrell was ended by Jamie Lannister, who executed Olenna when his army took Highgarden.`],

		["targaryen", `The Targaryens came from the ancient civilization of Valyria, bringing dragons from the eastern continent and settling on the island of Dragonstone. After a mysterious disaster known as the Doom of Valyria wiped out their homeland and killed most of the world’s dragons, the Targaryens invaded Westeros, becoming the ruling family. Robert’s rebellion eliminated most of the Targaryens and cost them the kingdom. Keenly aware of her birthright, Daenerys Targaryen returned to Westeros after years of exile in Essos. She put her plans to reclaim the Iron Throne on hold to align with Jon Snow against the Army of the Dead.`]
	];

	function backVideo() {
		let backwardTime = houseVideo.currentTime - 10;
		//console.log(backwardTime);

		houseVideo.currentTime = backwardTime;
	}

	//pause video on click
	function pauseVideo() {
		houseVideo.pause();
	}

	function playVideo() {
		houseVideo.play();
	}

	function forwardVideo() {
		let forwardedTime = houseVideo.currentTime + 10;
		//console.log(forwardedTime);

		houseVideo.currentTime = forwardedTime;
	}

	//write other function for custom vi controls (play, volume control, time counter, progress bar scrubber, etc.)

	function animateBanners() {
		// we need an offset that we can multiply by to animate
		// our banner to the left and make the active one show up
		
		let offset = 600,
			multiplier = this.dataset.offset; //this is the data-offset custom data attribute
			//on each of the sigils
		console.log((offset * multiplier) + "px");
		console.log('Banner moved!');

		//move banners to left using product of math
		bannerImages.style.right = `${offset * multiplier + "px"}`;

		// grab a reference to the current vid in the className object
		//debugger;
		// get className property, split it into its separate words (an array), and 
		// then get the last word -> [1] -> that will always be the house name
		let houseName = this.className.split(" ")[1];

		// capitalize first letter with JavaScript string methods
		// converting first letter 
		// housename-uupercase = just gives B
		// slice1 = remove first letter, giv me aratheon of Baratheon
		targetHouse = houseName.charAt(0).toUpperCase() + houseName.slice(1);

		//change the house name on the page at the same time
		//houseName.textContent = "House" + houseData[multiplier];
		familyName.textContent = `House ${houseData[multiplier][0]}`;
		houseInfo.textContent = houseData[multiplier][1];
		//debugger;
		


	}

	function popLightBox() {
		//debug this so far and make sure the event handling works
		//debugger;
		

		//make lightbox show up
		lightBox.classList.add('show-lightbox');

		// use JavaScript string interpolation to build the path to the target video
		//debugger
		let videoPath = `video/House-${targetHouse}.mp4`;

		//load this new video videoPath
		houseVideo.src = videoPath;
		houseVideo.load();
		houseVideo.play();	
	}

	function closeLightBox(event) {
		event.preventDefault();
		//make lightbox close
		lightBox.classList.remove('show-lightbox');
		houseVideo.currentTime = 0;
		houseVideo.pause();
	}

	
	sigils.forEach(sigil => sigil.addEventListener("click", animateBanners));
	//sigils.forEach(sigil => sigil.addEventListener("click", popLightBox));


	closeButton.addEventListener("click", closeLightBox);

	houseVideo.addEventListener('ended', closeLightBox);

	backButton.addEventListener("click", backVideo);

	pauseButton.addEventListener("click", pauseVideo);

	playButton.addEventListener("click", playVideo);

	forwardButton.addEventListener("click", forwardVideo);

	bannerImages.addEventListener('transitionend', popLightBox);

})();
//this.className.split()
//this.className.split(" ")[1] = break apart at space, 1 is 2nd
//"baratheon" 