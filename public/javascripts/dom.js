var $ = window.$ = function (sel, ctx) {
  return document.querySelector(sel);
}

$.set = function(el, opts) {
  if(opts.text) el.appendChild(document.createTextNode(opts.text)) ;
  if(opts.classList) opts.classList.forEach(c => el.classList.add(c))
  if(opts.style) Object.keys(opts.style).forEach(k => el.style[k] = opts.style[k]);
  if(opts.children) opts.children.forEach(ch => el.appendChild(ch));
  if(opts.attrs) Object.keys(opts.attrs).forEach(k => el.setAttribute(k, opts.attrs[k]))
  if(opts.on) Object.keys(opts.on).forEach(k => {
    el.addEventListener(opts.on[k], opts.on[k].callback, opts.on[k].capture || false)
  });
}

$.cEl = function (tag, opts) {
  var el = document.createElement(tag);
  $.set(el, opts);

  return el;
}

$.cFrag = function(children) {
  var el = document.createDocumentFragment();
  if(children) children.forEach(ch => el.appendChild(ch));

  return el;
}

$.append = function (el, ref, pos) {
   pos = (pos || "bottom").toLowerCase();

  if (pos === "top") {
    if (!ref.childNodes.length) return ref.appendChild(el);
    return ref.insertBefore(el, ref.firstChild);
  }
  else if (pos === "bottom") {
    return ref.appendChild(el);
  }
  else if (pos === "before") {
    return ref.parentNode.insertBefore(el, ref);
  }
  else if (pos === "after") {
    if (!ref.nextElementSibling) return ref.parentNode.appendChild(el);
    return ref.parentNode.insertBefore(el, ref.nextElementSibling);
  }
  else if (pos === "replace") {
    return ref.parentNode.replaceChild(el, ref);
  }
  else {
    throw new Error('Unknown position specified. Expected "top", "bottom", "before", "after" or "replace".');
  };

};

$.appendHTML = function(el, textHTML, pos) {
  pos = (pos || "afterbegin").toLowerCase();
  if(["beforebegin", "afterbegin", "beforeend", "afterend"].indexOf(pos) > -1) {
    el.insertAdjacentHTML(pos, textHTML);
  } else {
    throw new Error('Unknown position specified. Expected "beforebegin", "afterbegin", "beforeend" or "afterend".');
  }
}

$.fetch = window.fetch ? window.fetch.bind(window) : ajax;

function ajax() {
}
