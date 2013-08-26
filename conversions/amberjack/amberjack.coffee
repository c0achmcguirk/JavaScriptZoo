#
# * first cut: 17. Oct 2006
# * Amberjack 0.9 - Site Tour Creator - Simple. Free. Open Source.
# *
# * $Id: amberjack.js,v 1.17 2007/02/09 20:46:24 aya Exp $
# *
# * Copyright (C) 2006 Arash Yalpani <arash@yalpani.de>
# *
# * This library is free software; you can redistribute it and/or
# * modify it under the terms of the GNU Lesser General Public
# * License as published by the Free Software Foundation; either
# * version 2.1 of the License, or (at your option) any later version.
# *
# * This library is distributed in the hope that it will be useful,
# * but WITHOUT ANY WARRANTY; without even the implied warranty of
# * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
# * Lesser General Public License for more details.
#
# * You should have received a copy of the GNU Lesser General Public
# * License along with this library; if not, write to the Free Software
# * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301  USA
# 

# Try to be compatible with other browsers
# Only use firebug logging if available
if typeof console is "undefined"
  console = {}
  console.log = ->

###
Capsulates some static helper functions
@author Arash Yalpani

This one is mainly for myself, but you can learn from that.


How this library works -

Hint: to change Amberjack's default behavior, set values
prior to the call to Amberjack.open() (in the wizard's output)

1. Amberjack.open() is called through the HTML code the wizard spit out
you should have includet in your site's template file

2. Amberjack.open()...:

2.1. ... checks for tourId and skinId url param...
2.1.1. ...and stops execution, if no tourId was passed by url
2.2.1. ...and sets skinId to default 'model_t' if none  was
passed by url

2.2. ... reads your web page's DOM structure, searches for the tour
definition (you should have pasted into your site's
template), parses it to create the array 'Amberjack.pages'
and to calculate the tour's params (i.e. number of tour
pages, closeUrl)

2.3. ... fetches control.tpl.js and style.css from
http://amberjack.org/src/stable/skin/<skinname>/
(default setting) OR from your own site, if you have set
Amberjack.BASE_URL's value accordingly

2.4. ... covers your web page's body with a transparent layer (DIV) if
Amberjack.doCoverBody is 'true' which is the default option

3. In step '2.3', I explained that control.tpl.js is fetched from
either amberjack.org or your own server. control.tpl.js is the
template file of a skin and what it does is to call the function
AmberjackControl.open('<div ... </div>') like this. The HTML
inside is the control's template.

3.1. AmberjackControl.open() ...
3.1.1. ... fills the template's placeholders with values
3.1.2. ... creates a DIV for the control
3.1.3. ... fills the DIV's content with the assembled skin
template (see 2.3)
3.1.4. ... hides the control's close button if no closeUrl
was specified through wizard's output and
option 'onCloseClickStay' was not set to true
3.1.4. ... checks for optional Amberjack.ADD_STYLE and
Amberjack.ADD_SCRIPT and post fetches them if set.
You can use this to manipulate tour's behaviour
right after it gets visible. Maximum flexibility!

That's it, basically!
###
AmberjackBase =
  
  ###
  Proxy alerter
  @author Arash Yalpani
  
  @param str Text for alert
  
  @example alert('An error occurred')
  ###
  alert: (str) ->
    alert "Amberjack alert: " + str

  
  ###
  Returns FIRST matching element by tagname
  @author Arash Yalpani
  
  @param tagName name of tags to filter
  @return first matching dom node or false if none exists
  
  @example getByTagName('div') => domNode
  @example getByTagName('notexistent') => false
  ###
  getByTagName: (tagName) ->
    els = document.getElementsByTagName(tagName)
    return els[0]  if els.length > 0
    false

  
  ###
  Returns an array of matching DOM nodes
  @author Arash Yalpani
  
  @param tagName name of tags to filter
  @param attrName name of attribute, matching tags must contain
  @param attrValue value of attribute, matching tags must contain
  @param domNode optional: dom node to start filtering from
  @return Array of matching dom nodes
  
  @example getElementsByTagNameAndAttr('div', 'class', 'highlight') => [domNode1, domNode2, ...]
  ###
  getElementsByTagNameAndAttr: (tagName, attrName, attrValue, domNode) ->
    if domNode
      els = domNode.getElementsByTagName(tagName)
    else
      els = document.getElementsByTagName(tagName)
    return []  if els.length is 0
    _els = []
    i = 0

    while i < els.length
      if attrName is "class"
        classNames = ""
        if els[i].getAttribute("class")
          classNames = els[i].getAttribute("class")
        else
          classNames = els[i].getAttribute("className")  if els[i].getAttribute("className")
        reg = new RegExp("(^| )" + attrValue + "($| )")
        _els.push els[i]  if reg.test(classNames)
      else
        _els.push els[i]  if els[i].getAttribute(attrName) is attrValue
      i++
    _els

  
  ###
  Returns url param value
  @author Arash Yalpani
  
  @param url The url to be queried
  @param paramName The params name
  @return paramName's value or false if param does not exist or is empty
  
  @example getUrlParam('http://localhost/?a=123', 'a') => 123
  @example getUrlParam('http://localhost/?a=123', 'b') => false
  @example getUrlParam('http://localhost/?a=',    'a') => false
  ###
  getUrlParam: (url, paramName) ->
    urlSplit = url.split("?")
    # no query
    return false  unless urlSplit[1]
    urlQuery = urlSplit[1]
    paramsSplit = urlSplit[1].split("&")
    i = 0

    while i < paramsSplit.length
      paramSplit = paramsSplit[i].split("=")
      return (if paramSplit[1] then paramSplit[1] else false)  if paramSplit[0] is paramName
      i++
    false

  
  ###
  Injects javascript or css file into document
  
  @author Arash Yalpani
  
  @param url The JavaScript/CSS file's url
  @param type Either 'script' OR 'style'
  @param onerror Optional: callback handler if loading did not work
  
  @example loadScript('http://localhost/js/dummy.js', function(){alert('could not load')})
  Note that a HEAD tag needs to be existent in the current document
  ###
  postFetch: (url, type, onerror) ->
    if type is "script"
      scriptOrStyle = document.createElement("script")
      scriptOrStyle.type = "text/javascript"
      scriptOrStyle.src = url
    else
      scriptOrStyle = document.createElement("link")
      scriptOrStyle.type = "text/css"
      scriptOrStyle.rel = "stylesheet"
      scriptOrStyle.href = url
    scriptOrStyle.onerror = onerror  if onerror
    head = AmberjackBase.getByTagName("head")
    if head
      head.appendChild scriptOrStyle
      return
    AmberjackBase.alert "head tag is missing"


###
Amberjack Control class
@author Arash Yalpani
###
AmberjackControl =
  
  ###
  Callback handler for template files. Takes template HTML and fills placeholders
  @author Arash Yalpani
  
  @param tplHtml HTML code including Amberjack placeholders
  
  @example AmberjackControl.open('<div>{body}</div>')
  Note that this method should be called directly through control.tpl.js files
  ###
  open: (tplHtml) ->
    urlSplit = false
    urlQuery = false
    tplHtml = tplHtml.replace(/{skinId}/, Amberjack.skinId)
    if Amberjack.pages[Amberjack.pageId].prevUrl
      prevUrl = Amberjack.pages[Amberjack.pageId].prevUrl
      urlSplit = prevUrl.split("?")
      urlQuery = (if urlSplit[1] then urlSplit[1] else false)
      prevUrl += ((if urlQuery then "&" else "?")) + "tourId=" + Amberjack.tourId + ((if Amberjack.skinId then "&skinId=" + Amberjack.skinId else ""))  if Amberjack.urlPassTourParams
      tplHtml = tplHtml.replace(/{prevClick}/, "location.href='" + prevUrl + "';return false;")
      tplHtml = tplHtml.replace(/{prevClass}/, "")
    else
      tplHtml = tplHtml.replace(/{prevClick}/, "return false;")
      tplHtml = tplHtml.replace(/{prevClass}/, "disabled")
    if Amberjack.pages[Amberjack.pageId].nextUrl
      nextUrl = Amberjack.pages[Amberjack.pageId].nextUrl
      urlSplit = nextUrl.split("?")
      urlQuery = (if urlSplit[1] then urlSplit[1] else false)
      # do not append params for exit page (if exit page exists)
      nextUrl += ((if urlQuery then "&" else "?")) + "tourId=" + Amberjack.tourId + ((if Amberjack.skinId then "&skinId=" + Amberjack.skinId else ""))  if Amberjack.urlPassTourParams and (not Amberjack.hasExitPage or Amberjack.pages[nextUrl].nextUrl)
      tplHtml = tplHtml.replace(/{nextClick}/, "location.href='" + nextUrl + "';return false;")
      tplHtml = tplHtml.replace(/{nextClass}/, "")
    else
      tplHtml = tplHtml.replace(/{nextClick}/, "return false;")
      tplHtml = tplHtml.replace(/{nextClass}/, "disabled")
    tplHtml = tplHtml.replace(/{textOf}/, Amberjack.textOf)
    tplHtml = tplHtml.replace(/{textClose}/, Amberjack.textClose)
    tplHtml = tplHtml.replace(/{textPrev}/, Amberjack.textPrev)
    tplHtml = tplHtml.replace(/{textNext}/, Amberjack.textNext)
    tplHtml = tplHtml.replace(/{currPage}/, Amberjack.pageCurrent)
    tplHtml = tplHtml.replace(/{pageCount}/, Amberjack.pageCount)
    tplHtml = tplHtml.replace(/{body}/, AmberjackBase.getElementsByTagNameAndAttr("div", "title", Amberjack.pageId, document.getElementById(Amberjack.tourId))[0].innerHTML)
    div = document.createElement("div")
    div.id = "AmberjackControl"
    div.innerHTML = tplHtml
    document.body.appendChild div
    
    # Amberjack.doHighlight();
    
    # No URL was set AND no click-close-action was configured:
    document.getElementById("ajClose").style.display = "none"  if not Amberjack.closeUrl and not Amberjack.onCloseClickStay
    
    # post fetch a CSS file you can define by setting Amberjack.ADD_STYLE
    # right before the call to Amberjack.open();
    AmberjackBase.postFetch Amberjack.ADD_STYLE, "style"  if Amberjack.ADD_STYLE
    
    # post fetch a script you can define by setting Amberjack.ADD_SCRIPT
    # right before the call to Amberjack.open();
    AmberjackBase.postFetch Amberjack.ADD_SCRIPT, "script"  if Amberjack.ADD_SCRIPT

  
  ###
  Removes AmberjackControl div from DOM
  @author Arash Yalpani
  
  @example AmberjackControl.close()
  ###
  close: ->
    e = document.getElementById("AmberjackControl")
    e.parentNode.removeChild e


###
Amberjack's main class
@author Arash Yalpani
###
Amberjack =
  
  # constants
  BASE_URL: "http://amberjack.org/src/stable/" # do not forget trailing slash!
  
  # explicit attributes
  
  # - set these through url (...&tourId=MyTour&skinId=Safari...)
  # - OR in your tour template right above the call to Amberjack.open()
  tourId: false # mandatory: if not set, tour will not open
  skinId: false # optional: if not set, skin "model_t" will be used
  
  # - set these in your tour template right above the call to Amberjack.open()
  textOf: "of" # text of splitter between "2 of 3"
  textClose: "x" # text of close button
  textPrev: "&laquo;" # text of previous button
  textNext: "&raquo;" # text of next button
  
  # - set set these in your tour template right above the call to Amberjack.open()
  onCloseClickStay: false # set this to 'true', if you want the close button to close tour but remain on current page
  doCoverBody: true # set this to 'false' if you don't want your site's page to be covered
  bodyCoverCloseOnClick: false # set this to 'true', if a click on the body cover should force it to close
  urlPassTourParams: true # set this to false, if you have hard coded the tourId and skinId in your tour
  #     template. the tourId and skindId params will not get passed on prev/next button click
  
  # private attributes - don't touch
  pageId: false
  pages: {}
  pageCount: 0
  hasExitPage: false
  interval: false
  
  ###
  Initializes tour, creates transparent layer and causes AmberjackControl
  to open the skin's template (control.tpl.js) into document. Call this
  manually right after inclusion of this library. Don't forget to pass
  tourId param through URL to show tour!
  
  Iterates child DIVs of DIV.ajTourDef, extracts tour pages
  
  @author Arash Yalpani
  
  @example Amberjack.open()
  Note that a HEAD tag needs to be existent in the current document
  ###
  open: ->
    Amberjack.tourId = (if Amberjack.tourId then Amberjack.tourId else AmberjackBase.getUrlParam(location.href, "tourId"))
    Amberjack.skinId = (if Amberjack.skinId then Amberjack.skinId else AmberjackBase.getUrlParam(location.href, "skinId"))
    # do nothing if tourId is not passed through url
    return  unless Amberjack.tourId
    # set default skinId
    Amberjack.skinId = "model_t"  unless Amberjack.skinId
    tourDef = false
    tourDefElements = AmberjackBase.getElementsByTagNameAndAttr("div", "class", "ajTourDef")
    i = 0
    while i < tourDefElements.length
      tourDef = tourDefElements[i]  if tourDefElements[i].getAttribute("id") is Amberjack.tourId
      i++
    AmberjackBase.alert "DIV with CLASS \"ajTourDef\" and ID \"" + Amberjack.tourId + "\" is not defined"  unless tourDef
    
    # Is there a specified closeUrl (title attribute of DIV.ajTourDef)?
    # Don't show close button if not set
    Amberjack.closeUrl = (if tourDef.getAttribute("title") then tourDef.getAttribute("title") else false)
    children = tourDef.childNodes
    _children = [] # cleaned up version...
    i = 0
    while i < children.length
      continue  if not children[i].tagName or children[i].tagName.toLowerCase() isnt "div"
      _children.push children[i]
      i++
    
    # init tour pages
    i = 0
    while i < _children.length
      Amberjack.pages[_children[i].getAttribute("title")] = {}
      i++
    i = 0
    while i < _children.length
      continue  if not _children[i].tagName or _children[i].tagName.toLowerCase() isnt "div"
      unless _children[i].getAttribute("title")
        AmberjackBase.alert "attribute \"title\" is missing"
        return
      
      # -- start: check for matching page in divs --
      if Amberjack.urlMatch(_children[i].getAttribute("title")) and _children[i].innerHTML isnt ""
        Amberjack.pageCurrent = i + 1
        Amberjack.pageId = _children[i].getAttribute("title")
      
      # -- end: check for matching page in divs --
      Amberjack.pageCount++
      Amberjack.pages[_children[i].getAttribute("title")].prevUrl = _children[i - 1].getAttribute("title")  if i >= 1 and i < _children.length
      Amberjack.pages[_children[i].getAttribute("title")].nextUrl = _children[i + 1].getAttribute("title")  if i < _children.length - 1
      i++
    if _children[i - 1].innerHTML is "" # empty page div reduces pageCount by 1
      Amberjack.pageCount = Amberjack.pageCount - 1
      Amberjack.hasExitPage = true
    AmberjackBase.alert "no matching page in ajTourDef found"  unless Amberjack.pageId
    AmberjackBase.postFetch Amberjack.BASE_URL + "skin/" + Amberjack.skinId.toLowerCase() + "/control.tpl.js", "script"
    AmberjackBase.postFetch Amberjack.BASE_URL + "skin/" + Amberjack.skinId.toLowerCase() + "/style.css", "style"
    Amberjack.coverBody()  if Amberjack.doCoverBody

  
  ###
  Checks if passed href is *included* in current location's href
  @author Arash Yalpani
  
  @param href URL to be matched against
  
  @example Amberjack.urlMatch('http://mysite.com/domains/')
  ###
  urlMatch: (href) ->
    location.href.indexOf(href) isnt -1

  
  ###
  Return height of inner window
  Copied and modified:
  http://www.dynamicdrive.com/forums/archive/index.php/t-10373.html
  
  @author Arash Yalpani
  @example Amberjack.getWindowInnerHeight()
  ###
  getWindowInnerHeight: ->
    yInner = undefined
    if window.innerHeight and window.scrollMaxY
      yInner = window.innerHeight + window.scrollMaxY
    else if document.body.scrollHeight > document.body.offsetHeight # all but Explorer Mac
      yInner = document.body.scrollHeight
    else if document.documentElement and document.documentElement.scrollHeight > document.documentElement.offsetHeight # Explorer 6 strict mode
      yInner = document.documentElement.scrollHeight
    else # Explorer Mac...would also work in Mozilla and Safari
      yInner = document.body.offsetHeight
    windowWidth = undefined
    windowHeight = undefined
    if self.innerHeight # all except Explorer
      windowHeight = self.innerHeight
    else if document.documentElement and document.documentElement.clientHeight # Explorer 6 Strict Mode
      windowHeight = document.documentElement.clientHeight
    # other Explorers
    else windowHeight = document.body.clientHeight  if document.body
    
    # for small pages with total height less then height of the viewport
    (if (yInner < windowHeight) then windowHeight else yInner)

  
  ###
  Creates transparent layer and places it in the document, in front of
  all other layers (through CSS z-index)
  @author Arash Yalpani
  
  @example Amberjack.coverBody()
  ###
  coverBody: ->
    div = document.createElement("div")
    div.id = "ajBodyCover"
    div.style.height = Amberjack.getWindowInnerHeight() + "px"
    if Amberjack.bodyCoverCloseOnClick
      div.onclick = ->
        Amberjack.uncoverBody()
    document.body.appendChild div
    Amberjack.interval = window.setInterval(Amberjack.refreshCover, 2000)

  
  ###
  refreshes transparent layer's height
  @author Arash Yalpani
  
  @example Amberjack.refreshCover()
  ###
  refreshCover: ->
    document.getElementById("ajBodyCover").style.height = Amberjack.getWindowInnerHeight() + "px"

  
  ###
  Removes transparent layer from document
  @author Arash Yalpani
  
  @example Amberjack.uncoverBody()
  ###
  uncoverBody: ->
    window.clearInterval Amberjack.interval
    document.body.removeChild document.getElementById("ajBodyCover")

  
  #
  #  doHighlight: function() {
  #    var body = document.body;
  #    var highlightElements = AmberjackBase.getElementsByTagNameAndAttr('div', 'class', 'ajHighlight', body);
  #    for (i = 0; i < highlightElements.length; i++) {
  #      highlightElements[i].style.border = '3px solid red';
  #      highlightElements[i].style.backgroundColor = '#fee';
  #    }
  #  },
  #  
  
  ###
  Gets called, whenever the user clicks on the close button of Amberjack control
  @author Arash Yalpani
  
  @example Amberjack.close()
  ###
  close: ->
    if Amberjack.onCloseClickStay
      AmberjackControl.close()
      Amberjack.uncoverBody()  if Amberjack.doCoverBody
      return null
    window.location.href = Amberjack.closeUrl  if Amberjack.closeUrl
    null
