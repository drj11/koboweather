
tar:
	cd ..; tar cf koboweather/koboweather.tar koboweather/package.json koboweather/code koboweather/settings.json koboweather/rawimage

stuff:
	code/make-svg-from-text
	code/make-svg-from-svg
	code/make-png-from-svg
	code/make-raw
