let like = document.querySelector(".like-button");
let dislike = document.querySelector(".dislike-button");
let changeImage = () => {
	like.classList.toggle("unfill");
	dislike.classList.add("unfill");
};
let changeImageDislike = () => {
	dislike.classList.toggle("unfill");
	like.classList.add("unfill");
};

let loadSong = () => {
	let songHtml = "";
	song.forEach((song, index) => {
		songHtml += `
						<div class="song">
						<div class="song-${index}">
          	<div class="fade">
            <div onclick="removeHidden()" class="play-button-container" data-index="${index}"> <img class="play-icon" src="images/play-icon-ong-removebg-preview.png"
                alt="icon" height="21px" width="18px">
            </div>
            <div class="three-dots">
              <div class="dots"></div>
              <div class="dots"></div>
              <div class="dots"></div>
            </div>
            <img class="song-${index}-img" src="${song.cover}"
              alt="home" title="home" height="150px" width="150px">
          </div>
          <div class="song-name">
            ${song.name}
          </div>
          <div class="artist-name">
            ${song.artist}
          </div>
        </div></div>`;
	});
	document.querySelector(".song-container").innerHTML = songHtml;
};
loadSong();

let songObject = {
	audio: undefined,
	songIndex: undefined,
	songDetail: undefined,
	song_slider: document.querySelector(".song-slider"),

	playSong: function (song, songContainer) {
		if (this.audio) {
			this.audio.pause();
		}
		this.songIndex = songContainer.dataset.index;
		this.songDetail = song[this.songIndex];
		this.audio = new Audio(this.songDetail.location);
		this.audio.play();
	},

	setNameCover: function () {
		document.querySelector(
			".song-info-image-section"
		).innerHTML = `<img class="song-info-image" src="${this.songDetail.cover}" alt="">`;
		document.querySelector(
			".song-info-name"
		).innerHTML = `${this.songDetail.name.toUpperCase()}<br>${
			this.songDetail.artist
		}`;
	},

	setTrackLength: function () {
		let trackDurMin = Math.floor(this.songDetail.length / 60);
		let trackDurSec = Math.floor(this.songDetail.length - trackDurMin * 60);
		if (trackDurSec < 10) {
			trackDurSec = "0" + trackDurSec;
		}
		document.querySelector(
			".trackDuration"
		).innerHTML = `/ ${trackDurMin}:${trackDurSec}`;
	},

	sliderUp: function () {
		this.audio.currentTime = this.song_slider.value;
	},

	timerUpdate: function () {
		document.querySelector(".song-slider").max = this.songDetail.length;

		setInterval(() => {
			let currentMin = Math.floor(this.audio.currentTime / 60);
			let currentSec = Math.floor(
				this.audio.currentTime - currentMin * 60
			);
			if (currentSec < 10) {
				currentSec = "0" + currentSec;
			}
			document.querySelector(
				".currentDuration"
			).innerHTML = `${currentMin}:${currentSec}`;
		}, 1000);
	},

	songPlay: function () {
		this.audio.play();
		document.querySelector(".pause").classList.toggle("hidden");
		document.querySelector(".play").classList.toggle("hidden");
	},

	songPause: function () {
		this.audio.pause();
		document.querySelector(".pause").classList.toggle("hidden");
		document.querySelector(".play").classList.toggle("hidden");
	},
};

document.querySelectorAll(".play-button-container").forEach((songContainer) => {
	songContainer.addEventListener("click", () => {
		songObject.playSong(song, songContainer);

		songObject.setNameCover();

		songObject.setTrackLength();

		songObject.sliderUp();

		songObject.timerUpdate();
	});
});

function removeHidden() {
	document.querySelector(".player").classList.remove("hidden");
}

document.querySelector(".play").addEventListener("click", () => {
	songObject.songPlay();
});
document.querySelector(".pause").addEventListener("click", () => {
	songObject.songPause();
});
