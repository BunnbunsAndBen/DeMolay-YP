function $(id) {
	if (id.startsWith(".")) {
		return document.getElementsByClassName(id.substring(1));
	} else {
		return document.getElementById(id);
	}
}

var rootUrl = "https://yp.manitoudemolay.org/media/";
var useMirror = false;
var mirrorRootUrl = "https://bunnbuns.net/assets/media/demolay/";

var tempUrl = rootUrl;

function switchUrl() {
    if(useMirror) {
        rootUrl = mirrorRootUrl;
    } else {
        rootUrl = tempUrl;
    }
}

switchUrl();

function closeFullscreen() {
	if (document.exitFullscreen) {
		document.exitFullscreen();
	} else if (document.webkitExitFullscreen) {
		/* Safari */
		document.webkitExitFullscreen();
	} else if (document.msExitFullscreen) {
		/* IE11 */
		document.msExitFullscreen();
	}
}

var chapter = null;
var vid = $("video");

function setVolume(val) {
	vid.volume = val / 100;
	if (val < 1) {
		$("vol").innerHTML = "volume_off";
	} else {
		$("vol").innerHTML = "volume_up";
	}
}

var ogVolume = vid.volume * 100;
$("vol-control").value = ogVolume;

var muted = false;
function mute() {
	if (!muted) {
		muted = true;
		ogVolume = vid.volume * 100;
		setVolume(0);
		$("vol").innerHTML = "volume_off";
		$("vol-control").value = 0;
	} else {
		muted = false;
		setVolume(ogVolume);
		$("vol-control").value = ogVolume;
	}
}

function overlayState(classSelect, display) {
	const all = $(classSelect);
	for (var i = 0; i < all.length; i++) {
		all[i].style.display = display;
	}
}

function hideAllOverlays() {
	overlayState(".overlayBtn", "none");
}

function showNotice(text) {
	$("overlay-notice").innerHTML = text;
	$("overlay-notice").style.display = "";
	setTimeout(function () {
		$("overlay-notice").style.display = "none";
	}, 2500);
}

home();

function home() {
	vid.removeAttribute("controls");
	if (chapter == null || chapter != 2) {
		vid.src = rootUrl + "Vts%2001%200-1.mp4";
	}
	chapter = "home";
	vid.currentTime = 61;
	vid.pause();

	hideAllOverlays();
	overlayState(".home", "");
}

function go(ch) {
	hideAllOverlays();
	vid.removeAttribute("controls");
	if (ch == 1) {
		overlayState(".back", "");
		overlayState(".first", "");
		if (chapter != 1) {
			vid.src = rootUrl + "Vts%2002%200-1.mp4";
		}
		chapter = 1;
		vid.currentTime = 61;
	} else if (ch == 2) {
		if (chapter != 2 || chapter != "home") {
			vid.src = rootUrl + "Vts%2001%200-1.mp4";
		}
		overlayState(".back", "");
		overlayState(".second", "");
		chapter = 2;
		vid.currentTime = 31;
	} else {
		vid.setAttribute("controls", "controls");
		hideAllOverlays();
		if (ch == 3) {
			chapter = 3;
			vid.src = rootUrl + "Video%20Ts-10.mp4";
		} else if (ch == 4) {
			chapter = 4;
			vid.src = rootUrl + "Video%20Ts-7.mp4";
		} else if (ch == 5) {
			chapter = 5;
			vid.src = rootUrl + "Video%20Ts-13.mp4";
		} else if (ch == 6) {
			chapter = 6;
			vid.src = rootUrl + "Video%20Ts-4.mp4";
		} else if (ch == 7) {
			chapter = 7;
			vid.src = rootUrl + "Video%20Ts-1.mp4";
		} else if (ch == 8) {
			chapter = 8;
			vid.src = rootUrl + "Video%20Ts-22.mp4";
		} else if (ch == 9) {
			chapter = 9;
			vid.src = rootUrl + "Video%20Ts-16.mp4";
		} else if (ch == 10) {
			chapter = 10;
			vid.src = rootUrl + "Video%20Ts-19.mp4";
		}
	}
	if (ch == "lang") {
		showNotice(
			'<span class="material-icons">warning</span><span>Not&nbsp;Avalible</span>'
		);
		vid.removeAttribute("controls");
		overlayState(".home", "");
	} else {
		vid.play();
	}
}

vid.addEventListener("timeupdate", function () {
	if (this.currentTime > 60 && chapter != "home" && chapter == 2) {
		go(2);
	} else if (this.currentTime > 91 && chapter == 1) {
		go(1);
	}
});

vid.addEventListener("ended", function () {
	closeFullscreen();
	if (chapter > 2) {
		if (chapter < 8) {
			go(1);
		} else if (chapter >= 8) {
			go(2);
		} else {
			home();
		}
	}
});
