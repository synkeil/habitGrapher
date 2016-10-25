function $(mainSelector, subSelector) {
  // seting up shorthands
  let mainS = mainSelector || null;
  let subS = subSelector || null;
  const main = [];
  const sub = [];
  let mainCount = [];
  let subCount = [];
  const selected = [];
  let count = 0;
  let a = 0;
  let b = 0;
  let c = 0;
  let d = 0;
  let f = 0;
  let g = 0;
  let i = 0;
  let temp;

  (() => {
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
        for (a = 0; a < mainCount.length; a += 1) {
          main.push(document.getElementsByClassName(mainS)[a]);
        }
        break;
      default:
        mainCount = document.getElementsByTagName(mainS.toUpperCase());
        for (b = 0; b < mainCount.length; b += 1) {
          main.push(document.getElementsByTagName(mainS)[b]);
        }
    }
    if (subS === null) {
      for (c = 0; c < main.length; c += 1) {
        selected.push(main[c]);
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
        for (d = 0; d < subCount.length; d += 1) {
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
        for (f = 0; f < main.childNodes.length; f += 1) {
          if (main.childNodes[f].tagName !== undefined) {
            if (main.childNodes[f].tagName === subS) {
              sub[count] = main.childNodes[f];
              count += 1;
            }
          }
        }
    }
    for (g = 0; g < sub.length; g += 1) {
      selected[g] = sub[g];
    }
    return selected;
  })();

  this.dom = function returnDomElement() {
    const toSelect = main[0];
    return toSelect;
  };

  this.eq = function atIndex(...theArgs) {
    const iM = theArgs.length > 0 && theArgs[0] !== undefined ? theArgs[0] : null;

    (() => {
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
    selected.map(
      (x) => {
        temp = x;
        temp.setAttribute(atr, val);
        return selected;
      }
    );
    return this;
  };

  this.get = function returnSelectedArray() {
    return selected;
  };

  // set the css of the iQ in the form of "color:blue;width:125px"
  this.css = function setStyle(style) {
    selected.map(
      (x) => {
        temp = x;
        temp.style.cssText = style;
        return selected;
      }
    );
    return this;
  };

  this.addClass = function addClassToElement(toAdd) {
    selected.map(
      (x) => {
        temp = x;
        temp.classList.add(toAdd);
        return selected;
      }
    );
    return this;
  };

  this.removeClass = function removeClassFromElement(toRemove) {
    selected.map(
      (x) => {
        temp = x;
        temp.classList.remove(toRemove);
        return selected;
      }
    );
    return this;
  };

  // returns the content of iQ if a is empty, else sets it to a
  this.html = function setContentAbsolutly(...theArgs) {
    a = theArgs.length > 0 && theArgs[0] !== undefined ? theArgs[0] : null;

    if (a === null) {
      return selected.innerHTML;
    }
    selected.map(
      (x) => {
        temp = x;
        temp.innerHTML = a;
        return selected;
      }
    );
    return this;
  };

  this.val = function returnElemValue(...theArgs) {
    a = theArgs.length > 0 && theArgs[0] !== undefined ? theArgs[0] : null;

    if (a === null) {
      return selected[0].value;
    }
    selected.map(
      (x) => {
        temp = x;
        temp.value = a;
        return selected;
      }
    );
    return this;
  };

  // adds an event listener in the form of element.addEventListener(type, listener);
  this.listen = function addEvent(evnt, func) {
    selected.map(
      (x) => {
        temp = x;
        temp.addEventListener(evnt, func);
        return selected;
      }
    );
    return this;
  };

  // add your code to the html of iQ
  this.append = function addContentToExisting(code) {
    selected.map(
      (x) => {
        temp = x;
        temp.innerHTML += code;
        return selected;
      }
    );
    return this;
  };

  this.ajax = function getAndPost(...theArgs) {
    const options = theArgs.length > 0 && theArgs[0] !== undefined ? theArgs[0] : {};

    const url = options.url || alert('You need to specify a url');
    const method = options.methods || 'GET';
    const data = options.data || '';

    const xmlhttp = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');

    if (method === 'POST') {
      xmlhttp.open('POST', url, true);
      xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xmlhttp.send(data);
    } else {
      xmlhttp.onreadystatechange = function whenChangeHappen() {
        if (xmlhttp.readyState === XMLHttpRequest.DONE) {
          if (xmlhttp.status === 200) {
            for (i = 0; i < selected.length; i += 1) {
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
