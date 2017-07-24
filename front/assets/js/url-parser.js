function getTechName() {
	var url = new URL(window.location.href);
	return url.searchParams.get("techName");	
}
