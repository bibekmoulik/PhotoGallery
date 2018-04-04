var photoIndex = 24;
var initPhotoIndex = photoIndex;
var imagePath = "https://bibekmoulik.github.io/gallery/images/";
var zoomIndex = 1.0;
var sliderTimer;

function funcLoad()
{
	container = document.getElementById("container");
	
	while(parseInt(photoIndex) > 0)
	{
			var id = pad(photoIndex,10);
			var srcPath = imagePath + id + ".jpg";
			
			var figure = document.createElement("figure");
			figure.id = "Fig_" + id;
			figure.className = "photo";
			var rotation = Math.random() * 41 - 10;
			figure.style.transform = "rotateZ(" + rotation + "deg)";
			
			var image = document.createElement("img");
			image.name = "photo";
			image.className = "poloroid";
			image.id = id;
			image.src = srcPath;
			image.setAttribute("onclick","zoomIn('" + id + "');");
			
			figure.appendChild(image);
			setFigCaption(image,figure);
			
			container.appendChild(figure);
			photoIndex = photoIndex - 1;
	}
}

function pad(str,max)
{
	str = str.toString();
	return str.length < max ? pad("0" + str, max) : str;
}

function zoomIn(id)
{
	document.getElementById("modal01").style.display = "block";
	photoIndex = parseInt(id);
	setImage(imagePath + id + ".jpg");
}

function plusDivs(n)
{
	photoIndex = photoIndex + n;
	var photos = document.getElementsByName("photo");
	
	if (photoIndex > photos.length){
		photoIndex = 1;
	}
	
	if (photoIndex < 1){
		photoIndex = photos.length
	}
	
	var arrIndex = photos.length - photoIndex;
	setImage(photos[arrIndex].src);
}

function closeScreen()
{
	document.getElementById("modal01").style.display = "none";
	document.getElementsByTagName("body")[0].style.overflow = "auto";
}

function setImage(sourcePath)
{
	var screen = document.getElementById("screen");
	screen.style.visibility = "hidden";
	screen.removeChild(document.getElementById("screenImg"));
	
	var image = document.createElement("img");
	image.id = "screenImg";
	image.className = "w3-screenImg";
	image.src = sourcePath;
	
	var screen_ratio = screen.offsetWidth/screen.offsetHeight;
	var image_ratio = image.width/image.height;
	
	if (image_ratio < screen_ratio)
	{
		if (image.height > image.width)
		{
			image.style.height = "100%";
			image.style.width = "auto";
		}
		else
		{
			image.style.width = "100%";
			image.style.height = "auto";
		}
	}
	else
	{
		if (image.height > image.width)
		{
			image.style.width = "100%";
			image.style.height = "auto";
		}
		else
		{
			image.style.height = "100%";
			image.style.width = "auto";
		}
	}
	
	document.getElementById("descriptionSpan").innerHTML = "";
	screen.appendChild(image);
	
	setImageDesc(image);
	
	screen.style.visibility = "visible";
	
	document.getElementsByTagName("body")[0].style.overflow =  "hidden";
}

function setImageDesc(image)
{
	document.getElementById("descriptionSpan").style.display = "none";
	
	var description = "";
	EXIF.getData(image, function() {
		description = EXIF.pretty(image);
		if (description && description != "")
		{
			document.getElementById("descriptionSpan").innerHTML = description;
			document.getElementById("descriptionSpan").style.display = "block";
		}
	});
}

function setFigCaption(image,figure)
{
	var description = "";
	EXIF.getData(image, function() {
		description = EXIF.getTitle(image);
		if (description && description != "")
		{
			figure.title = description;
		}
	});
}

/* BEGINNING OF SLIDE SHOW FUNCTIONS */

function previousImage()
{
	stopSlideShow();
	plusDivs(1);
	startSlideShow();
	pauseSlideShow();
}

function startSlideShow()
{
	document.getElementById("modal01").style.display = "none";
	
	document.getElementById("pauseSlideShow").style.display = "inline-block";
	document.getElementById("resumeSlideShow").style.display = "none";
	document.getElementById("stopSlideShow").style.display = "inline-block";
	document.getElementById("restartSlideShow").style.display = "inline-block";
	
	var screenImg = document.getElementById("screenImg");
	document.getElementById("slideDesc").style.display = "none";
	
	var description = "";
	EXIF.getData(screenImg, function() {
		description = EXIF.getTitle(screenImg);
		if (description && description != "")
		{
			document.getElementById("slideDesc").innerText = description;
			document.getElementById("slideDesc").style.display = "block";
		}
	});
	
	var slideScreen = document.getElementById("slideScreen");
	slideScreen.style.backgroundImage = "url('" + screenImg.src + "')";
	slideScreen.style.display = "block";
	plusDivs(-1);
	sliderTimer = setTimeout(startSlideShow, 3000);
}

function stopSlideShow()
{
	document.getElementById("pauseSlideShow").style.display = "inline-block";
	document.getElementById("resumeSlideShow").style.display = "inline-block";
	document.getElementById("stopSlideShow").style.display = "inline-block";
	document.getElementById("restartSlideShow").style.display = "inline-block";
	
	clearTimeout(sliderTimer);
	plusDivs(1);
	document.getElementById("slideScreen").style.display = "none";
	
	document.getElementById("modal01").style.display = "block";
}

function pauseSlideShow()
{
	document.getElementById("pauseSlideShow").style.display = "none";
	document.getElementById("resumeSlideShow").style.display = "inline-block";
	document.getElementById("stopSlideShow").style.display = "inline-block";
	document.getElementById("restartSlideShow").style.display = "inline-block";
	
	clearTimeout(sliderTimer);
}

function resumeSlideShow()
{
	startSlideShow();
}

function restartSlideShow()
{
	stopSlideShow();
	zoomIn(pad(initPhotoIndex,10));
	startSlideShow();
}

function nextImage()
{
	stopSlideShow();
	plusDivs(-1);
	startSlideShow();
	pauseSlideShow();
}

function togglePause()
{
	if (document.getElementById("resumeSlideShow").style.display == "none")
	{
		pauseSlideShow();
	}
	else
	{
		resumeSlideShow();
	}
}

/* END OF SLIDE SHOW FUNCTIONS */


document.addEventListener('keydown', function(event) {
	if(document.getElementById("slideScreen").style.display == "block")
	{
		switch(event.key)
		{
			case "ArrowRight"	: nextImage(); break;
			case "ArrowLeft"	: previousImage(); break;
			case "Escape"		: stopSlideShow(); break;
			case " "			: togglePause(); break;
		}
	}
	else if(document.getElementById("modal01").style.display == "block")
	{
		switch(event.key)
		{
			case "ArrowRight"	: plusDivs(-1); break;
			case "ArrowLeft"	: plusDivs(1); break;
			case "Escape"		: closeScreen(); break;
		}
	}
}, false);

document.addEventListener('mousewheel', function(event) {
	if(document.getElementById("modal01").style.display == "block")
	{
		/* if ((event.wheelDelta > 0) && (zoomIndex < 2.5)) {zoomIndex = zoomIndex + 0.1;}		
		if ((event.wheelDelta < 0) && (zoomIndex > 0.3)) {zoomIndex = zoomIndex - 0.1;}
		document.getElementById("screenImg").style.transform = "scale("+zoomIndex+")"; */
		
		if (event.wheelDelta > 0) {plusDivs(1)}
		if (event.wheelDelta < 0) {plusDivs(-1)}
	}
}, false);

(function() {
    var idlefunction = function() {
        // when mouse is idle
		if(document.getElementById("slideScreen").style.display == "block")
		{
			document.getElementById("slideShowButtons").style.display = "none";
			document.getElementById("slideCloseButtons").style.display = "none";
		}
        }, idletimer,
        idlestart = function() {idletimer = setTimeout(idlefunction,3000);},
        idlebreak = function() {
			clearTimeout(idletimer);
			idlestart();
			document.getElementById("slideShowButtons").style.display = "block";
			document.getElementById("slideCloseButtons").style.display = "block";
			};
    if (window.addEventListener)
        document.documentElement.addEventListener("mousemove",idlebreak,true);
    else
        document.documentElement.attachEvent("onmousemove",idlebreak,true);
})();


var SourceX, TargetX;

/* Events fired on the drag target */
document.ondragstart = function(event) {
	if (event.target.id == "screenImg"){
		SourceX = event.screenX;
	}
};

/* Events fired on the drop target */
document.ondragover = function(event) {
	event.preventDefault();
};

document.ondrop = function(event) {
	if (SourceX){
    	TargetX = event.screenX;
        if (SourceX > TargetX) {plusDivs(1);}
        if (SourceX < TargetX) {plusDivs(-1);}
	}
};
