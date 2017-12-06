function toogleNav() {
	var sideNav = document.getElementById("sideNavContent").style.width;
	if (sideNav == "0px") {
		openNav();
	} else {
		closeNav();
	}
}

/* Set the width of the side navigation to 250px */
function openNav() {
	document.getElementById("sideNavContent").style.width = "250px";
	document.getElementById("noteContainer").style.marginLeft = "250px";
}	

/* Set the width of the side navigation to 0 */
function closeNav() {
	document.getElementById("sideNavContent").style.width = "0px";
	document.getElementById("noteContainer").style.marginLeft = "0px";
}

function cleanFeild() {
	document.getElementById("cleanField").value = '';
}