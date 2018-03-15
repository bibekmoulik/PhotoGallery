var photoIndex = 5;
//var projectPath = "https://bibekmoulik.github.io/PhotoGallery/images/";

/* document.getElementById("largeScreen").onclick = function() {
	EXIF.getData(this, function() {
		//alert(EXIF.pretty(this));
		document.getElementById("descriptionSpan").innerText = EXIF.getTag(this, "ImageDescription");
	});
} */
/*function showDescription()
{
	EXIF.getData(this, function() {
		alert(EXIF.pretty(this));
	});
	
	var imagePath = projectPath + document.getElementById("largeScreen").src.split('/').pop();
	var rawFile = createXMLHttpObject() ;
	rawFile.open("GET",imagePath,true);
	rawFile.onreadystatechange = function ()
	{
		if(rawFile.readyState == 4)
		{
			if(rawFile.status == 200 || rawFile.status == 0)
			{
				var file = rawFile.response;
				//alert(allText);
				if (file && file.name) 
				{
					EXIF.getData(file, function(){
						//document.getElementById("descriptionSpan").innerText = EXIF.getTag(file, "ImageDescription");
						alert(EXIF.getTag(file, "ImageDescription"));
					});
				}
				//return rawFile;
			}
		}
	}
	rawFile.send(null);
}
*/
function funcLoad()
{
	container = document.getElementById("container");
	
	while(parseInt(photoIndex) > 0)
	{
		var id = pad(photoIndex,10);
		var srcPath = "images/" + id + ".jpg";
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
	document.getElementById("largeScreen").src = photoSrc;
	photoIndex = parseInt(slideIndex);
}

function plusDivs(n)
{
	photoIndex = photoIndex + n;
	var photos = document.getElementsByName("photo");
	
	if (photoIndex > photos.length)
	{
		photoIndex = 1;
	}
	if (photoIndex < 1)
	{
		photoIndex = photos.length
	}
	var arrIndex = photos.length - photoIndex;
	document.getElementById("largeScreen").src = photos[arrIndex].src;
}

function closeScreen()
{
	document.getElementById("modal01").style.display = "none";
}

function createXMLHttpObject()
{
	var xmlhttp=false;
	/* running locally on IE5.5, IE6, IE7 */
	if(location.protocol=="file:")
	{
		if(!xmlhttp)
		{
			try
			{
				xmlhttp=new ActiveXObject("MSXML2.XMLHTTP");
			}
			catch(e)
			{
				xmlhttp=false;
			}
		}
		if(!xmlhttp)
		{
			try
			{
				xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
			}
			catch(e)
			{
				xmlhttp=false;
			}
		}
	}
	/* IE7, Firefox, Safari, Opera...  */
	if(!xmlhttp)
	{
		try
		{
			xmlhttp=new XMLHttpRequest();
		}
		catch(e)
		{
			xmlhttp=false;
		}
	}
	/* IE6 */
	if(typeof ActiveXObject != "undefined")
	{
		if(!xmlhttp)
		{
			try
			{
				xmlhttp=new ActiveXObject("MSXML2.XMLHTTP");
			}
			catch(e)
			{
				xmlhttp=false;
			}
		}
		if(!xmlhttp)
		{
			try
			{
				xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
			}
			catch(e)
			{
				xmlhttp=false;
			}
		}
	}
	/* IceBrowser */
	if(!xmlhttp)
	{
		try
		{
			xmlhttp=createRequest();
		}
		catch(e)
		{
			xmlhttp=false;
		}
	}
	/*if(!xmlhttp)
	{
		alert("Your browser doesn't seem to support XMLHttpRequests.");
	}*/
	return xmlhttp ;
}

function readFile(file)
{
	
}

function getFileName(path)
{
	return path.split('/').pop();
}
