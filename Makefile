
tar:
	cd ..; tar cf koboweather/koboweather.tar koboweather/Makefile koboweather/package.json koboweather/code koboweather/settings.json koboweather/rawimage

display: rawimage/display.raw

rawimage/display.raw: assemble.json
	code/forejson
	code/assemble

stuff:
	code/make-svg-from-text
	code/make-svg-from-svg
	code/make-png-from-svg
	code/make-raw
