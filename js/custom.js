var photoIndex = 21;
var imagePath = "https://bibekmoulik.github.io/gallery/images/";

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
}

function setImage(sourcePath)
{
	var displayBoard = document.getElementById("displayBoard");
	displayBoard.style.visibility = "hidden";
	displayBoard.removeChild(document.getElementById("screenImg"));
	
	var image = document.createElement("img");
	image.id = "screenImg";
	image.className = "w3-screenImg";
	image.src = sourcePath;
	
	var displayBoard_ratio = displayBoard.offsetWidth/displayBoard.offsetHeight;
	var image_ratio = image.width/image.height;
	
	if (image_ratio < displayBoard_ratio)
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
	
	document.getElementById("descriptionSpan").innerText = "";
	displayBoard.appendChild(image);
	
	setImageDesc(image);
	
	displayBoard.style.visibility = "visible";
}

function setImageDesc(image)
{
	document.getElementById("descriptionSpan").style.display = "none";
	
	var description = "";
	EXIF.getData(image, function() {
		description = image.iptcdata.caption;
		if (description && description != "")
		{
			document.getElementById("descriptionSpan").innerText = description;
			document.getElementById("descriptionSpan").style.display = "block";
		}
	});
}

function setFigCaption(image,figure)
{
	var description = "";
	EXIF.getData(image, function() {
		description = image.iptcdata.caption;
		if (description && description != "")
		{
			figure.title = description;
		}
	});
}

document.addEventListener('keydown', function(event) {
	if(document.getElementById("modal01").style.display == "block")
	{
		switch(event.key)
		{
			case "ArrowRight"	: plusDivs(-1); break;
			case "ArrowLeft"	: plusDivs(1); break;
			case "Escape"		: closeScreen(); break;
		}
	}
}, false);
