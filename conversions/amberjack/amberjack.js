if (typeof console == 'undefined') {
    console = {};
    console.log = function () {
    };
}

var AmberjackBase = {
    /**
    * Proxy alerter
    * @author Arash Yalpani
    *
    * @param str Text for alert
    *
    * @example alert('An error occurred')
    */
    alert: function (str) {
        alert('Amberjack alert: ' + str);
    },
    /**
    * Returns FIRST matching element by tagname
    * @author Arash Yalpani
    *
    * @param tagName name of tags to filter
    * @return first matching dom node or false if none exists
    *
    * @example getByTagName('div') => domNode
    * @example getByTagName('notexistent') => false
    */
    getByTagName: function (tagName) {
        var els = document.getElementsByTagName(tagName);
        if (els.length > 0) {
            return els[0];
        }

        return false;
    },
    /**
    * Returns an array of matching DOM nodes
    * @author Arash Yalpani
    *
    * @param tagName name of tags to filter
    * @param attrName name of attribute, matching tags must contain
    * @param attrValue value of attribute, matching tags must contain
    * @param domNode optional: dom node to start filtering from
    * @return Array of matching dom nodes
    *
    * @example getElementsByTagNameAndAttr('div', 'class', 'highlight') => [domNode1, domNode2, ...]
    */
    getElementsByTagNameAndAttr: function (tagName, attrName, attrValue, domNode) {
        if (domNode) {
            var els = domNode.getElementsByTagName(tagName);
        } else {
            els = document.getElementsByTagName(tagName);
        }

        if (els.length === 0) {
            return [];
        }

        var _els = [];
        for (var i = 0; i < els.length; i++) {
            if (attrName == 'class') {
                var classNames = '';
                var el = els[i];
                if (el.getAttribute('class')) {
                    classNames = el.getAttribute('class');
                } else {
                    if (el.getAttribute('className')) {
                        classNames = el.getAttribute('className');
                    }
                }

                var reg = new RegExp('(^| )' + attrValue + '($| )');
                if (reg.test(classNames)) {
                    _els.push(el);
                }
            } else {
                if (el.getAttribute(attrName) == attrValue) {
                    _els.push(el);
                }
            }
        }

        return _els;
    },
    /**
    * Returns url param value
    * @author Arash Yalpani
    *
    * @param url The url to be queried
    * @param paramName The params name
    * @return paramName's value or false if param does not exist or is empty
    *
    * @example getUrlParam('http://localhost/?a=123', 'a') => 123
    * @example getUrlParam('http://localhost/?a=123', 'b') => false
    * @example getUrlParam('http://localhost/?a=',    'a') => false
    */
    getUrlParam: function (url, paramName) {
        var urlSplit = url.split('?');
        if (!urlSplit[1]) {
            return false;
        }

        var urlQuery = urlSplit[1];
        var paramsSplit = urlSplit[1].split('&');
        for (var i = 0; i < paramsSplit.length; i++) {
            var paramSplit = paramsSplit[i].split('=');
            if (paramSplit[0] == paramName) {
                if (paramSplit[1]) {
                    return paramSplit[1];
                } else {
                    return false;
                }
                // return paramSplit[1] ? paramSplit[1] : false;
            }
        }

        return false;
    },
    /**
    * Injects javascript or css file into document
    *
    * @author Arash Yalpani
    *
    * @param url The JavaScript/CSS file's url
    * @param type Either 'script' OR 'style'
    * @param onerror Optional: callback handler if loading did not work
    *
    * @example loadScript('http://localhost/js/dummy.js', function(){alert('could not load')})
    * Note that a HEAD tag needs to be existent in the current document
    */
    postFetch: function (url, type, onerror) {
        if (type === 'script') {
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = url;
            if (onerror) {
                script.onerror = onerror;
            }
        } else {
            var theStyle = document.createElement('link');
            theStyle.type = 'text/css';
            theStyle.rel = 'stylesheet';
            theStyle.href = url;
            if (onerror) {
                theStyle.onerror = onerror;
            }
        }

        var head = AmberjackBase.getByTagName('head');
        if (head) {
            if (!!script) {
                head.appendChild(script);
            }

            if (!!theStyle) {
                head.appendChild(theStyle);
            }

            return;
        }

        AmberjackBase.alert('head tag is missing');
    }
};

var AmberjackControl = {
    /**
    * Callback handler for template files. Takes template HTML and fills placeholders
    * @author Arash Yalpani
    *
    * @param tplHtml HTML code including Amberjack placeholders
    *
    * @example AmberjackControl.open('<div>{body}</div>')
    * Note that this method should be called directly through control.tpl.js files
    */
    open: function (tplHtml) {
        var urlSplit = false;
        var urlQuery = false;
        tplHtml = tplHtml.replace(/{skinId}/, Amberjack.skinId);
        if (Amberjack.pages[Amberjack.pageId].prevUrl) {
            var prevUrl = Amberjack.pages[Amberjack.pageId].prevUrl;
            urlSplit = prevUrl.split('?');
            urlQuery = urlSplit[1] ? urlSplit[1] : false;
            if (Amberjack.urlPassTourParams) {
                prevUrl += (urlQuery ? '&' : '?') + 'tourId=' + Amberjack.tourId + (Amberjack.skinId ? '&skinId=' + Amberjack.skinId : '');
            }

            tplHtml = tplHtml.replace(/{prevClick}/, "location.href='" + prevUrl + "';return false;");
            tplHtml = tplHtml.replace(/{prevClass}/, '');
        } else {
            tplHtml = tplHtml.replace(/{prevClick}/, 'return false;');
            tplHtml = tplHtml.replace(/{prevClass}/, 'disabled');
        }

        if (Amberjack.pages[Amberjack.pageId].nextUrl) {
            var nextUrl = Amberjack.pages[Amberjack.pageId].nextUrl;
            urlSplit = nextUrl.split('?');
            urlQuery = urlSplit[1] ? urlSplit[1] : false;
            if (Amberjack.urlPassTourParams && (!Amberjack.hasExitPage || Amberjack.pages[nextUrl].nextUrl)) {
                nextUrl += (urlQuery ? '&' : '?') + 'tourId=' + Amberjack.tourId + (Amberjack.skinId ? '&skinId=' + Amberjack.skinId : '');
            }

            tplHtml = tplHtml.replace(/{nextClick}/, "location.href='" + nextUrl + "';return false;");
            tplHtml = tplHtml.replace(/{nextClass}/, '');
        } else {
            tplHtml = tplHtml.replace(/{nextClick}/, 'return false;');
            tplHtml = tplHtml.replace(/{nextClass}/, 'disabled');
        }

        tplHtml = tplHtml.replace(/{textOf}/, Amberjack.textOf);
        tplHtml = tplHtml.replace(/{textClose}/, Amberjack.textClose);
        tplHtml = tplHtml.replace(/{textPrev}/, Amberjack.textPrev);
        tplHtml = tplHtml.replace(/{textNext}/, Amberjack.textNext);
        tplHtml = tplHtml.replace(/{currPage}/, Amberjack.pageCurrent);
        tplHtml = tplHtml.replace(/{pageCount}/, Amberjack.pageCount.toString());

        tplHtml = tplHtml.replace(/{body}/, AmberjackBase.getElementsByTagNameAndAttr('div', 'title', Amberjack.pageId, document.getElementById(Amberjack.tourId))[0].innerHTML);

        var div = document.createElement('div');
        div.id = 'AmberjackControl';
        div.innerHTML = tplHtml;

        document.body.appendChild(div);

        if (!Amberjack.closeUrl && !Amberjack.onCloseClickStay) {
            document.getElementById('ajClose').style.display = 'none';
        }

        if (Amberjack.ADD_STYLE) {
            AmberjackBase.postFetch(Amberjack.ADD_STYLE, 'style');
        }

        if (Amberjack.ADD_SCRIPT) {
            AmberjackBase.postFetch(Amberjack.ADD_SCRIPT, 'script');
        }
    },
    /**
    * Removes AmberjackControl div from DOM
    * @author Arash Yalpani
    *
    * @example AmberjackControl.close()
    */
    close: function () {
        var e = document.getElementById('AmberjackControl');
        e.parentNode.removeChild(e);
    }
};

var Amberjack = {
    // constants
    BASE_URL: 'http://amberjack.org/src/stable/',
    // explicit attributes
    // - set these through url (...&tourId=MyTour&skinId=Safari...)
    // - OR in your tour template right above the call to Amberjack.open()
    tourId: false,
    skinId: false,
    // - set these in your tour template right above the call to Amberjack.open()
    textOf: 'of',
    textClose: 'x',
    textPrev: '&laquo;',
    textNext: '&raquo;',
    // - set set these in your tour template right above the call to Amberjack.open()
    onCloseClickStay: false,
    doCoverBody: true,
    bodyCoverCloseOnClick: false,
    urlPassTourParams: true,
    //     template. the tourId and skindId params will not get passed on prev/next button click
    // private attributes - don't touch
    pageId: false,
    pages: {},
    pageCount: 0,
    hasExitPage: false,
    interval: false,
    /**
    * Initializes tour, creates transparent layer and causes AmberjackControl
    * to open the skin's template (control.tpl.js) into document. Call this
    * manually right after inclusion of this library. Don't forget to pass
    * tourId param through URL to show tour!
    *
    * Iterates child DIVs of DIV.ajTourDef, extracts tour pages
    *
    * @author Arash Yalpani
    *
    * @example Amberjack.open()
    * Note that a HEAD tag needs to be existent in the current document
    */
    open: function () {
        Amberjack.tourId = Amberjack.tourId ? Amberjack.tourId : AmberjackBase.getUrlParam(location.href, 'tourId');
        Amberjack.skinId = Amberjack.skinId ? Amberjack.skinId : AmberjackBase.getUrlParam(location.href, 'skinId');

        if (!Amberjack.tourId) {
            return;
        }

        if (!Amberjack.skinId) {
            Amberjack.skinId = 'model_t';
        }

        //var tourDef = false;
        var tourDefElements = AmberjackBase.getElementsByTagNameAndAttr('div', 'class', 'ajTourDef');
        for (var i = 0; i < tourDefElements.length; i++) {
            if (tourDefElements[i].getAttribute('id') == Amberjack.tourId) {
                var tourDef = tourDefElements[i];
            }
        }

        if (!tourDef) {
            AmberjackBase.alert('DIV with CLASS "ajTourDef" and ID "' + Amberjack.tourId + '" is not defined');
        }

        // Is there a specified closeUrl (title attribute of DIV.ajTourDef)?
        // Don't show close button if not set
        Amberjack.closeUrl = tourDef.getAttribute('title') ? tourDef.getAttribute('title') : false;

        var children = tourDef.childNodes;
        var _children = [];
        for (i = 0; i < children.length; i++) {
            if (!children[i].tagName || children[i].tagName.toLowerCase() != 'div') {
                continue;
            }
            _children.push(children[i]);
        }

        for (i = 0; i < _children.length; i++) {
            Amberjack.pages[_children[i].getAttribute('title')] = {};
        }

        for (i = 0; i < _children.length; i++) {
            if (!_children[i].tagName || _children[i].tagName.toLowerCase() != 'div') {
                continue;
            }

            if (!_children[i].getAttribute('title')) {
                AmberjackBase.alert('attribute "title" is missing');
                return;
            }

            if (Amberjack.urlMatch(_children[i].getAttribute('title')) && _children[i].innerHTML !== '') {
                Amberjack.pageCurrent = (i + 1).toString();
                Amberjack.pageId = _children[i].getAttribute('title');
            }

            // -- end: check for matching page in divs --
            Amberjack.pageCount++;
            if (i >= 1 && i < _children.length) {
                Amberjack.pages[_children[i].getAttribute('title')].prevUrl = _children[i - 1].getAttribute('title');
            }
            if (i < _children.length - 1) {
                Amberjack.pages[_children[i].getAttribute('title')].nextUrl = _children[i + 1].getAttribute('title');
            }
        }

        if (_children[i - 1].innerHTML === '') {
            Amberjack.pageCount = Amberjack.pageCount - 1;
            Amberjack.hasExitPage = true;
        }

        if (!Amberjack.pageId) {
            AmberjackBase.alert('no matching page in ajTourDef found');
        }

        AmberjackBase.postFetch(Amberjack.BASE_URL + 'skin/' + Amberjack.skinId.toLowerCase() + '/control.tpl.js', 'script');
        AmberjackBase.postFetch(Amberjack.BASE_URL + 'skin/' + Amberjack.skinId.toLowerCase() + '/style.css', 'style');

        if (Amberjack.doCoverBody) {
            Amberjack.coverBody();
        }
    },
    /**
    * Checks if passed href is *included* in current location's href
    * @author Arash Yalpani
    *
    * @param href URL to be matched against
    *
    * @example Amberjack.urlMatch('http://mysite.com/domains/')
    */
    urlMatch: function (href) {
        return (location.href.indexOf(href) != -1);
    },
    /**
    * Return height of inner window
    * Copied and modified:
    * http://www.dynamicdrive.com/forums/archive/index.php/t-10373.html
    *
    * @author Arash Yalpani
    * @example Amberjack.getWindowInnerHeight()
    */
    getWindowInnerHeight: function () {
        var yInner;

        if (window.innerHeight && this.scrollMaxY) {
            yInner = window.innerHeight + this.scrollMaxY;
        } else if (document.body.scrollHeight > document.body.offsetHeight) {
            yInner = document.body.scrollHeight;
        } else if (document.documentElement && document.documentElement.scrollHeight > (document.documentElement).offsetHeight) {
            yInner = document.documentElement.scrollHeight;
        } else {
            yInner = document.body.offsetHeight;
        }

        var windowWidth, windowHeight;
        if (self.innerHeight) {
            windowHeight = self.innerHeight;
        } else if (document.documentElement && document.documentElement.clientHeight) {
            windowHeight = document.documentElement.clientHeight;
        } else if (document.body) {
            windowHeight = document.body.clientHeight;
        }

        // for small pages with total height less then height of the viewport
        return (yInner < windowHeight) ? windowHeight : yInner;
    },
    /**
    * Creates transparent layer and places it in the document, in front of
    * all other layers (through CSS z-index)
    * @author Arash Yalpani
    *
    * @example Amberjack.coverBody()
    */
    coverBody: function () {
        var div = document.createElement('div');
        div.id = 'ajBodyCover';

        div.style.height = Amberjack.getWindowInnerHeight() + 'px';

        if (Amberjack.bodyCoverCloseOnClick) {
            div.onclick = function () {
                Amberjack.uncoverBody();
            };
        }

        document.body.appendChild(div);
        Amberjack.interval = window.setInterval(Amberjack.refreshCover, 2000);
    },
    /**
    * refreshes transparent layer's height
    * @author Arash Yalpani
    *
    * @example Amberjack.refreshCover()
    */
    refreshCover: function () {
        document.getElementById('ajBodyCover').style.height = Amberjack.getWindowInnerHeight() + 'px';
    },
    /**
    * Removes transparent layer from document
    * @author Arash Yalpani
    *
    * @example Amberjack.uncoverBody()
    */
    uncoverBody: function () {
        window.clearInterval(Amberjack.interval);
        document.body.removeChild(document.getElementById('ajBodyCover'));
    },
    /*
    doHighlight: function() {
    var body = document.body;
    var highlightElements = AmberjackBase.getElementsByTagNameAndAttr('div', 'class', 'ajHighlight', body);
    for (i = 0; i < highlightElements.length; i++) {
    highlightElements[i].style.border = '3px solid red';
    highlightElements[i].style.backgroundColor = '#fee';
    }
    },
    */
    /**
    * Gets called, whenever the user clicks on the close button of Amberjack control
    * @author Arash Yalpani
    *
    * @example Amberjack.close()
    */
    close: function () {
        if (Amberjack.onCloseClickStay) {
            AmberjackControl.close();
            if (Amberjack.doCoverBody) {
                Amberjack.uncoverBody();
            }
            return null;
        }

        if (Amberjack.closeUrl) {
            window.location.href = Amberjack.closeUrl;
        }
        return null;
    }
};
