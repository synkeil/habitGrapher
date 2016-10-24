function $(mainSelector, subSelector) {
  // seting up shorthands
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
        // gets rid of the . in front of the class
        mainS = mainS.slice(1);
        // gets the htmlCollection into mainCount
        mainCount = document.getElementsByClassName(mainS);
        for (var a = 0; a < mainCount.length; a += 1) {
          main[a] = document.getElementsByClassName(mainS)[a];
        }
        break;
      default:
        mainCount = document.getElementsByTagName(mainS.toUpperCase());
        for (var b = 0; b < mainCount.length; b += 1) {
          main[b] = document.getElementsByTagName(mainS)[b];
        }
    }
    if (subS === null) {
      for (var c = 0; c < main.length; c += 1) {
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
        // gets rid of the . in front of the class
        subS = subS.slice(1);
        // gets the htmlCollection into subCount
        subCount = main.childNodes;
        for (var d = 0; d < subCount.length; d += 1) {
          if (main.childNodes[d].className !== undefined) {
            if (main.childNodes[d].className.split(' ').indexOf(subS) !== null) {
              sub[count] = main.childNodes[d];
              count += 1;
            }
          }
        }
        break;
      default:
        subCount = main.childNodes;
        subS = subS.toUpperCase();
        for (var f = 0; f < main.childNodes.length; f += 1) {
          if (main.childNodes[f].tagName !== undefined) {
            if (main.childNodes[f].tagName === subS) {
              sub[count] = main.childNodes[f];
              count += 1;
            }
          }
        }
    }
    for (var g = 0; g < sub.length; g += 1) {
      selected[g] = sub[g];
    }
    return selected;
  })();

  this.dom = function returnDomElement() {
    main = main[0];
    selected = main;
    return selected;
  };

  this.eq = function atIndex() {
    var iM = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

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

  this.attr = function setAttribut(atr, val) {
    for (var i = 0; i < selected.length; i += 1) {
      selected[i].setAttribute(atr, val);
    }
    return this;
  };

  this.get = function returnSelectedArray() {
    return selected;
  };

  // set the css of the iQ in the form of "color:blue;width:125px"
  this.css = function setStyle(style) {
    for (var i = 0; i < selected.length; i += 1) {
      selected[i].style.cssText = style;
    }
    return this;
  };

  this.addClass = function addClassToElement(toAdd) {
    for (var i = 0; i < selected.length; i += 1) {
      selected[i].classList.add(toAdd);
    }
    return this;
  };

  this.removeClass = function removeClassFromElement(toRemove) {
    for (var i = 0; i < selected.length; i += 1) {
      selected[i].classList.remove(toRemove);
    }
    return this;
  };

  // returns the content of iQ if a is empty, else sets it to a
  this.html = function setContentAbsolutly() {
    var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    if (a === null) {
      return selected.innerHTML;
    }
    for (var i = 0; i < selected.length; i += 1) {
      selected[i].innerHTML = a;
    }
    return this;
  };

  this.val = function returnElemValue() {
    var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    if (a === null) {
      return selected[0].value;
    }
    for (var i = 0; i < selected.length; i += 1) {
      selected[i].value = a;
    }
    return this;
  };

  // adds an event listener in the form of element.addEventListener(type, listener);
  this.listen = function addEventListener(evnt, func) {
    for (var i = 0; i < selected.length; i += 1) {
      selected[i].addEventListener(evnt, func);
    }
    return this;
  };

  // add your code to the html of iQ
  this.append = function addContentToExisting(code) {
    for (var i = 0; i < selected.length; i += 1) {
      selected[i].innerHTML += code;
    }
    return this;
  };

  this.ajax = function getAndPost() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var url = options.url || alert('You need to specify a url');
    var method = options.methods || 'GET';
    var data = options.data || '';

    var xmlhttp = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');

    if (method === 'POST') {
      xmlhttp.open('POST', url, true);
      xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xmlhttp.send(data);
    } else {
      xmlhttp.onreadystatechange = function whenChangeHappen() {
        if (xmlhttp.readyState === XMLHttpRequest.DONE) {
          if (xmlhttp.status === 200) {
            for (var i = 0; i < selected.length; i += 1) {
              selected[i].innerHTML += xmlhttp.response;
            }
          } else if (xmlhttp.status === 400) {
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
