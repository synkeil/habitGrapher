function iQ(mainSelector, subSelector) {

	var mainS = mainSelector || null;
	var subS = subSelector || null;
	var main = [];
	var sub = [];
	var mainCount = [];
	var subCount = [];
	var selected = [];
	var count = 0;

	(function () {
		switch (mainS.charAt(0)) {
			case '#':
				mainS = mainS.slice(1);
				main[0] = document.getElementById(mainS);
				break;
			case '.':
				//gets rid of the . in front of the class
				mainS = mainS.slice(1);
				//gets the htmlCollection into mainCount
				mainCount = document.getElementsByClassName(mainS);
				for (var a = 0; a < mainCount.length; ++a) {
					main[a] = document.getElementsByClassName(mainS)[a];
				}
				break;
			default:
				mainCount = document.getElementsByTagName(mainS.toUpperCase());
				for (var b = 0; b < mainCount.length; ++b) {
					main[b] = document.getElementsByTagName(mainS)[b];
				}
		}
		if (subS === null) {
			for (var c = 0; c < main.length; ++c) {
				selected[c] = main[c];
			}
			return selected;
		}

		switch (subS.charAt(0)) {
			case '#':
				subS = subS.slice(1);
				sub[0] = document.getElementById(subS);
				break;
			case '.':
				//gets rid of the . in front of the class
				subS = subS.slice(1);
				//gets the htmlCollection into subCount
				subCount = main.childNodes;
				for (var d = 0; d < subCount.length; ++d) {
					if (main.childNodes[d].className === undefined) {
						continue;
					}
					if (main.childNodes[d].className.split(" ").indexOf(subS) !== null) {
						sub[count] = main.childNodes[d];
						count++;
					}
				}
				break;
			default:
				subCount = main.childNodes;
				subS = subS.toUpperCase();
				for (var f = 0; f < main.childNodes.length; ++f) {
					if (main.childNodes[f].tagName === undefined) {
						continue;
					}
					if (main.childNodes[f].tagName == subS) {
						sub[count] = main.childNodes[f];
						count++;
					}
				}
		}
		for (var g = 0; g < sub.length; ++g) {
			selected[g] = sub[g];
		}
		return selected;
	})();

	this.dom = function () {
		main = main[0];
		selected = main;
		return selected;
	};

	this.eq = function (iM) {
		iM = iM || null;
		(function () {
			if (iM !== null) {
				selected[0] = selected[iM - 1];
				selected.splice(1, selected.length - 1);
				return selected[0];
			}
			return selected;
		})();
		return this;
	};

	this.attr = function (atr, val) {
		for (var i = 0; i < selected.length; i++) {
			selected[i].setAttribute(atr, val);
		}
		return this;
	};

	this.get = function () {
		return selected;
	};

	//set the css of the iQ in the form of "color:blue;width:125px"
	this.css = function (style) {
		for (var i = 0; i < selected.length; ++i) {
			selected[i].style.cssText = style;
		}
		return this;
	};

	this.addClass = function (toAdd) {
		for (var i = 0; i < selected.length; ++i) {
			selected[i].classList.add(toAdd);
		}
		return this;
	};

	this.removeClass = function (toRemove) {
		for (var i = 0; i < selected.length; ++i) {
			selected[i].classList.remove(toRemove);
		}
		return this;
	};

	//returns the content of iQ if a is empty, else sets it to a
	this.html = function (a) {
		a = a || null;
		if (a === null) {
			return selected.innerHTML;
		}
		for (var i = 0; i < selected.length; ++i) {
			selected[i].innerHTML = a;
		}
		return this;
	};

	this.val = function (a) {
		a = a || null;
		if (a === null) {
			return selected[0].value;
		}
		for (var i = 0; i < selected.length; ++i) {
			selected[i].value = a;
		}
		return this;
	};

	//adds an event listener in the form of element.addEventListener(type, listener);
	this.listen = function (evnt, func) {
		for (var i = 0; i < selected.length; ++i) {
			selected[i].addEventListener(evnt, func);
		}
		return this;
	};

	// add your code to the html of iQ
	this.append = function (code) {
		for (var i = 0; i < selected.length; ++i) {
			selected[i].innerHTML += code;
		}
		return this;
	};

	this.ajax = function (options) {

		options = options || {};
		var url = options.url || alert('You need to specify a url');
		var method = options.methods || 'GET';
		var data = options.data || '';

		var xmlhttp = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");

		if (method === 'POST') {

			xmlhttp.open('POST', url, true);
			xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			xmlhttp.send(data);
		} else {

			xmlhttp.onreadystatechange = function () {
				if (xmlhttp.readyState == XMLHttpRequest.DONE) {
					if (xmlhttp.status == 200) {
						for (var i = 0; i < selected.length; ++i) {
							selected[i].innerHTML += xmlhttp.response;
						}
					} else if (xmlhttp.status == 400) {
						alert('page does not exist on the server.');
					} else {
						alert('something went wrong.');
					}
				}
				return this;
			};

			xmlhttp.open('GET', url, true);
			xmlhttp.send(data);
		}
	};

	return this;
}

const tick = function clock() {
	let accumulator = sum => (n => sum += n);
	let x = accumulator(1);
	console.log(x(5));
	accumulator(3);
	console.log(x(2.3));
}
