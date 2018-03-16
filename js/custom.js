var photoIndex = 5;
var imagePath = "https://bibekmoulik.github.io/PhotoGallery/images/";

function funcLoad()
{
	container = document.getElementById("container");
	
	while(parseInt(photoIndex) > 0)
	{
		var id = pad(photoIndex,10);
		var srcPath = imagePath + id + ".jpg";
		var image = document.createElement("img");
		image.name = "photo";
		image.id = id;
		image.src = srcPath;
		image.setAttribute("onclick","zoomIn('" + srcPath + "','" + id + "');");
		image.className = "w3-thumbnail-Img";
		container.appendChild(image);
		photoIndex = photoIndex - 1;
	}
}

function pad(str,max)
{
	str = str.toString();
	return str.length < max ? pad("0" + str, max) : str;
}

function zoomIn(photoSrc,slideIndex)
{
	document.getElementById("modal01").style.display = "block";
	photoIndex = parseInt(slideIndex);
	setImage(photoSrc);
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
	displayBoard.removeChild(document.getElementById("largeScreen"));
	
	var image = document.createElement("img");
	image.id = "largeScreen";
	image.className = "w3-largeScreen";
	image.src = sourcePath;
	
	displayBoard.appendChild(image);
	
	var ImgFile = document.getElementById("largeScreen");
	EXIF.getData(ImgFile, function() {
		document.getElementById("descriptionSpan").innerText = ImgFile.iptcdata.caption;
	});
}
