var photoIndex = 5;
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
			image.id = id;
			image.src = srcPath;
			image.setAttribute("onclick","zoomIn('" + id + "');");
			figure.appendChild(image);
			
			var figcaption = document.createElement("figcaption");
			setFigCaption(image,figcaption);
			figcaption.id = "Caption_" + id;
			figure.appendChild(figcaption);
			
			figure.setAttribute("onmouseover","showFigCaption('" + id + "')");
			figure.setAttribute("onmouseout","hideFigCaption('" + id + "')");
			
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
	displayBoard.style.display = "none";
	displayBoard.removeChild(document.getElementById("largeScreen"));
	
	var image = document.createElement("img");
	image.id = "largeScreen";
	image.className = "w3-largeScreen";
	image.src = sourcePath;
	
	document.getElementById("descriptionSpan").innerText = "";
	displayBoard.appendChild(image);
	
	setImageDesc(image);
	
	displayBoard.style.display = "block";
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

function setFigCaption(image,figcaption)
{
	figcaption.style.display = "none";
	
	var description = "";
	EXIF.getData(image, function() {
		description = image.iptcdata.caption;
		if (description && description != "")
		{
			figcaption.innerText = description;
		}
	});
}

function showFigCaption(id)
{
	document.getElementById("Caption_" + id).style.position = "absolute";
	document.getElementById("Caption_" + id).style.display = "block";
	document.getElementById("Fig_" + id).style.zIndex = "2";
}

function hideFigCaption(id)
{
	document.getElementById("Caption_" + id).style.position = "relative";
	document.getElementById("Caption_" + id).style.display = "none";
	document.getElementById("Fig_" + id).style.zIndex = "0";
}
