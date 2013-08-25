###
typeface.js, version 0.15 | typefacejs.neocracy.org

Copyright (c) 2008 - 2009, David Chester davidchester@gmx.net

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
###
(->
  _typeface_js =
    faces: {}
    loadFace: (typefaceData) ->
      familyName = typefaceData.familyName.toLowerCase()
      @faces[familyName] = {}  unless @faces[familyName]
      @faces[familyName][typefaceData.cssFontWeight] = {}  unless @faces[familyName][typefaceData.cssFontWeight]
      face = @faces[familyName][typefaceData.cssFontWeight][typefaceData.cssFontStyle] = typefaceData
      face.loaded = true

    log: (message) ->
      return  if @quiet
      message = "typeface.js: " + message
      if @customLogFn
        @customLogFn message
      else window.console.log message  if window.console and window.console.log

    pixelsFromPoints: (face, style, points, dimension) ->
      pixels = points * parseInt(style.fontSize) * 72 / (face.resolution * 100)
      pixels *= style.fontStretchPercent  if dimension is "horizontal" and style.fontStretchPercent
      pixels

    pointsFromPixels: (face, style, pixels, dimension) ->
      points = pixels * face.resolution / (parseInt(style.fontSize) * 72 / 100)
      points *= style.fontStretchPercent  if dimension is "horizontal" and style.fontStretchPrecent
      points

    cssFontWeightMap:
      normal: "normal"
      bold: "bold"
      400: "normal"
      700: "bold"

    cssFontStretchMap:
      "ultra-condensed": 0.55
      "extra-condensed": 0.77
      condensed: 0.85
      "semi-condensed": 0.93
      normal: 1
      "semi-expanded": 1.07
      expanded: 1.15
      "extra-expanded": 1.23
      "ultra-expanded": 1.45
      default: 1

    fallbackCharacter: "."
    configure: (args) ->
      configurableOptionNames = ["customLogFn", "customClassNameRegex", "customTypefaceElementsList", "quiet", "verbose", "disableSelection"]
      i = 0

      while i < configurableOptionNames.length
        optionName = configurableOptionNames[i]
        if args[optionName]
          if optionName is "customLogFn"
            unless typeof args[optionName] is "function"
              throw "customLogFn is not a function"
            else
              @customLogFn = args.customLogFn
          else
            this[optionName] = args[optionName]
        i++

    getTextExtents: (face, style, text) ->
      extentX = 0
      extentY = 0
      horizontalAdvance = undefined
      textLength = text.length
      i = 0

      while i < textLength
        glyph = (if face.glyphs[text.charAt(i)] then face.glyphs[text.charAt(i)] else face.glyphs[@fallbackCharacter])
        letterSpacingAdjustment = @pointsFromPixels(face, style, style.letterSpacing)
        
        # if we're on the last character, go with the glyph extent if that's more than the horizontal advance
        extentX += (if i + 1 is textLength then Math.max(glyph.x_max, glyph.ha) else glyph.ha)
        extentX += letterSpacingAdjustment
        horizontalAdvance += glyph.ha + letterSpacingAdjustment
        i++
      x: extentX
      y: extentY
      ha: horizontalAdvance

    pixelsFromCssAmount: (cssAmount, defaultValue, element) ->
      matches = `undefined`
      if cssAmount is "normal"
        defaultValue
      else if matches = cssAmount.match(/([\-\d+\.]+)px/)
        matches[1]
      else
        
        # thanks to Dean Edwards for this very sneaky way to get IE to convert 
        # relative values to pixel values
        pixelAmount = undefined
        leftInlineStyle = element.style.left
        leftRuntimeStyle = element.runtimeStyle.left
        element.runtimeStyle.left = element.currentStyle.left
        unless cssAmount.match(/\d(px|pt)$/)
          element.style.left = "1em"
        else
          element.style.left = cssAmount or 0
        pixelAmount = element.style.pixelLeft
        element.style.left = leftInlineStyle
        element.runtimeStyle.left = leftRuntimeStyle
        pixelAmount or defaultValue

    capitalizeText: (text) ->
      text.replace /(^|\s)[a-z]/g, (match) ->
        match.toUpperCase()


    getElementStyle: (e) ->
      if window.getComputedStyle
        window.getComputedStyle e, ""
      else e.currentStyle  if e.currentStyle

    getRenderedText: (e) ->
      browserStyle = @getElementStyle(e.parentNode)
      inlineStyleAttribute = e.parentNode.getAttribute("style")
      inlineStyleAttribute = inlineStyleAttribute.cssText  if inlineStyleAttribute and typeof (inlineStyleAttribute) is "object"
      if inlineStyleAttribute
        inlineStyleDeclarations = inlineStyleAttribute.split(/\s*\;\s*/)
        inlineStyle = {}
        i = 0

        while i < inlineStyleDeclarations.length
          declaration = inlineStyleDeclarations[i]
          declarationOperands = declaration.split(/\s*\:\s*/)
          inlineStyle[declarationOperands[0]] = declarationOperands[1]
          i++
      style =
        color: browserStyle.color
        fontFamily: browserStyle.fontFamily.split(/\s*,\s*/)[0].replace(/(^"|^'|'$|"$)/g, "").toLowerCase()
        fontSize: @pixelsFromCssAmount(browserStyle.fontSize, 12, e.parentNode)
        fontWeight: @cssFontWeightMap[browserStyle.fontWeight]
        fontStyle: (if browserStyle.fontStyle then browserStyle.fontStyle else "normal")
        fontStretchPercent: @cssFontStretchMap[(if inlineStyle and inlineStyle["font-stretch"] then inlineStyle["font-stretch"] else "default")]
        textDecoration: browserStyle.textDecoration
        lineHeight: @pixelsFromCssAmount(browserStyle.lineHeight, "normal", e.parentNode)
        letterSpacing: @pixelsFromCssAmount(browserStyle.letterSpacing, 0, e.parentNode)
        textTransform: browserStyle.textTransform

      face = undefined
      face = @faces[style.fontFamily][style.fontWeight][style.fontStyle]  if @faces[style.fontFamily] and @faces[style.fontFamily][style.fontWeight]
      text = e.nodeValue
      if e.previousSibling and e.previousSibling.nodeType is 1 and e.previousSibling.tagName isnt "BR" and @getElementStyle(e.previousSibling).display.match(/inline/)
        text = text.replace(/^\s+/, " ")
      else
        text = text.replace(/^\s+/, "")
      if e.nextSibling and e.nextSibling.nodeType is 1 and e.nextSibling.tagName isnt "BR" and @getElementStyle(e.nextSibling).display.match(/inline/)
        text = text.replace(/\s+$/, " ")
      else
        text = text.replace(/\s+$/, "")
      text = text.replace(/\s+/g, " ")
      if style.textTransform and style.textTransform isnt "none"
        switch style.textTransform
          when "capitalize"
            text = @capitalizeText(text)
          when "uppercase"
            text = text.toUpperCase()
          when "lowercase"
            text = text.toLowerCase()
      unless face
        excerptLength = 12
        textExcerpt = text.substring(0, excerptLength)
        textExcerpt += "..."  if text.length > excerptLength
        fontDescription = style.fontFamily
        fontDescription += " " + style.fontWeight  unless style.fontWeight is "normal"
        fontDescription += " " + style.fontStyle  unless style.fontStyle is "normal"
        @log "couldn't find typeface font: " + fontDescription + " for text \"" + textExcerpt + "\""
        return
      words = text.split(/\b(?=\w)/)
      containerSpan = document.createElement("span")
      containerSpan.className = "typeface-js-vector-container"
      wordsLength = words.length
      i = 0

      while i < wordsLength
        word = words[i]
        vector = @renderWord(face, style, word)
        if vector
          containerSpan.appendChild vector.element
          unless @disableSelection
            selectableSpan = document.createElement("span")
            selectableSpan.className = "typeface-js-selected-text"
            wordNode = document.createTextNode(word)
            selectableSpan.appendChild wordNode
            selectableSpan.style.marginLeft = -1 * (vector.width + 1) + "px"  unless @vectorBackend is "vml"
            selectableSpan.targetWidth = vector.width
            
            #selectableSpan.style.lineHeight = 1 + 'px';
            if @vectorBackend is "vml"
              vector.element.appendChild selectableSpan
            else
              containerSpan.appendChild selectableSpan
        i++
      containerSpan

    renderDocument: (callback) ->
      unless callback
        callback = (e) ->
          e.style.visibility = "visible"
      elements = document.getElementsByTagName("*")
      elementsLength = elements.length
      i = 0

      while i < elements.length
        if elements[i].className.match(/(^|\s)typeface-js(\s|$)/) or elements[i].tagName.match(/^(H1|H2|H3|H4|H5|H6)$/)
          @replaceText elements[i]
          callback elements[i]  if typeof callback is "function"
        i++
      if @vectorBackend is "vml"
        
        # lamely work around IE's quirky leaving off final dynamic shapes
        dummyShape = document.createElement("v:shape")
        dummyShape.style.display = "none"
        document.body.appendChild dummyShape

    replaceText: (e) ->
      childNodes = []
      childNodesLength = e.childNodes.length
      i = 0

      while i < childNodesLength
        @replaceText e.childNodes[i]
        i++
      if e.nodeType is 3 and e.nodeValue.match(/\S/)
        parentNode = e.parentNode
        return  if parentNode.className is "typeface-js-selected-text"
        renderedText = @getRenderedText(e)
        if parentNode.tagName is "A" and @vectorBackend is "vml" and @getElementStyle(parentNode).display is "inline"
          
          # something of a hack, use inline-block to get IE to accept clicks in whitespace regions
          parentNode.style.display = "inline-block"
          parentNode.style.cursor = "pointer"
        parentNode.style.display = "inline-block"  if @getElementStyle(parentNode).display is "inline"
        if renderedText
          if parentNode.replaceChild
            parentNode.replaceChild renderedText, e
          else
            parentNode.insertBefore renderedText, e
            parentNode.removeChild e
          renderedText.innerHTML = renderedText.innerHTML  if @vectorBackend is "vml"
          childNodesLength = renderedText.childNodes.length
          i = undefined

          while i < childNodesLength
            
            # do our best to line up selectable text with rendered text
            e = renderedText.childNodes[i]
            e = e.childNodes[0]  if e.hasChildNodes() and not e.targetWidth
            if e and e.targetWidth
              letterSpacingCount = e.innerHTML.length
              wordSpaceDelta = e.targetWidth - e.offsetWidth
              letterSpacing = wordSpaceDelta / (letterSpacingCount or 1)
              letterSpacing = Math.ceil(letterSpacing)  if @vectorBackend is "vml"
              e.style.letterSpacing = letterSpacing + "px"
              e.style.width = e.targetWidth + "px"
            i++

    applyElementVerticalMetrics: (face, style, e) ->
      style.lineHeight = @pixelsFromPoints(face, style, face.lineHeight)  if style.lineHeight is "normal"
      cssLineHeightAdjustment = style.lineHeight - @pixelsFromPoints(face, style, face.lineHeight)
      e.style.marginTop = Math.round(cssLineHeightAdjustment / 2) + "px"
      e.style.marginBottom = Math.round(cssLineHeightAdjustment / 2) + "px"

    vectorBackends:
      canvas:
        _initializeSurface: (face, style, text) ->
          extents = @getTextExtents(face, style, text)
          canvas = document.createElement("canvas")
          canvas.innerHTML = text  if @disableSelection
          canvas.height = Math.round(@pixelsFromPoints(face, style, face.lineHeight))
          canvas.width = Math.round(@pixelsFromPoints(face, style, extents.x, "horizontal"))
          @applyElementVerticalMetrics face, style, canvas
          canvas.style.marginRight = Math.round(@pixelsFromPoints(face, style, extents.x - extents.ha, "horizontal")) + "px"  if extents.x > extents.ha
          ctx = canvas.getContext("2d")
          pointScale = @pixelsFromPoints(face, style, 1)
          ctx.scale pointScale * style.fontStretchPercent, -1 * pointScale
          ctx.translate 0, -1 * face.ascender
          ctx.fillStyle = style.color
          context: ctx
          canvas: canvas

        _renderGlyph: (ctx, face, char, style) ->
          glyph = face.glyphs[char]
          
          #this.log.error("glyph not defined: " + char);
          return @renderGlyph(ctx, face, @fallbackCharacter, style)  unless glyph
          if glyph.o
            outline = undefined
            if glyph.cached_outline
              outline = glyph.cached_outline
            else
              outline = glyph.o.split(" ")
              glyph.cached_outline = outline
            outlineLength = outline.length
            i = 0

            while i < outlineLength
              action = outline[i++]
              switch action
                when "m"
                  ctx.moveTo outline[i++], outline[i++]
                when "l"
                  ctx.lineTo outline[i++], outline[i++]
                when "q"
                  cpx = outline[i++]
                  cpy = outline[i++]
                  ctx.quadraticCurveTo outline[i++], outline[i++], cpx, cpy
                when "b"
                  x = outline[i++]
                  y = outline[i++]
                  ctx.bezierCurveTo outline[i++], outline[i++], outline[i++], outline[i++], x, y
          if glyph.ha
            letterSpacingPoints = (if style.letterSpacing and style.letterSpacing isnt "normal" then @pointsFromPixels(face, style, style.letterSpacing) else 0)
            ctx.translate glyph.ha + letterSpacingPoints, 0

        _renderWord: (face, style, text) ->
          surface = @initializeSurface(face, style, text)
          ctx = surface.context
          canvas = surface.canvas
          ctx.beginPath()
          ctx.save()
          chars = text.split("")
          charsLength = chars.length
          i = 0

          while i < charsLength
            @renderGlyph ctx, face, chars[i], style
            i++
          ctx.fill()
          if style.textDecoration is "underline"
            ctx.beginPath()
            ctx.moveTo 0, face.underlinePosition
            ctx.restore()
            ctx.lineTo 0, face.underlinePosition
            ctx.strokeStyle = style.color
            ctx.lineWidth = face.underlineThickness
            ctx.stroke()
          element: ctx.canvas
          width: Math.floor(canvas.width)

      vml:
        _initializeSurface: (face, style, text) ->
          shape = document.createElement("v:shape")
          extents = @getTextExtents(face, style, text)
          shape.style.width = shape.style.height = style.fontSize + "px"
          shape.style.marginLeft = "-1px" # this seems suspect...
          shape.style.marginRight = @pixelsFromPoints(face, style, extents.x - extents.ha, "horizontal") + "px"  if extents.x > extents.ha
          @applyElementVerticalMetrics face, style, shape
          resolutionScale = face.resolution * 100 / 72
          shape.coordsize = (resolutionScale / style.fontStretchPercent) + "," + resolutionScale
          shape.coordorigin = "0," + face.ascender
          shape.style.flip = "y"
          shape.fillColor = style.color
          shape.stroked = false
          shape.path = "hh m 0," + face.ascender + " l 0," + face.descender + " "
          shape

        _renderGlyph: (shape, face, char, offsetX, style, vmlSegments) ->
          glyph = face.glyphs[char]
          unless glyph
            @log "glyph not defined: " + char
            @renderGlyph shape, face, @fallbackCharacter, offsetX, style
            return
          vmlSegments.push "m"
          if glyph.o
            outline = undefined
            outlineLength = undefined
            if glyph.cached_outline
              outline = glyph.cached_outline
              outlineLength = outline.length
            else
              outline = glyph.o.split(" ")
              outlineLength = outline.length
              i = 0

              while i < outlineLength
                switch outline[i++]
                  when "q"
                    outline[i] = Math.round(outline[i++])
                    outline[i] = Math.round(outline[i++])
                  when "m", "l"
                    outline[i] = Math.round(outline[i++])
                    outline[i] = Math.round(outline[i++])
              glyph.cached_outline = outline
            prevX = undefined
            prevY = undefined
            i = 0

            while i < outlineLength
              action = outline[i++]
              x = Math.round(outline[i++]) + offsetX
              y = Math.round(outline[i++])
              switch action
                when "m"
                  vmlSegments.push "xm ", x, ",", y
                when "l"
                  vmlSegments.push "l ", x, ",", y
                when "q"
                  cpx = outline[i++] + offsetX
                  cpy = outline[i++]
                  cp1x = Math.round(prevX + 2.0 / 3.0 * (cpx - prevX))
                  cp1y = Math.round(prevY + 2.0 / 3.0 * (cpy - prevY))
                  cp2x = Math.round(cp1x + (x - prevX) / 3.0)
                  cp2y = Math.round(cp1y + (y - prevY) / 3.0)
                  vmlSegments.push "c ", cp1x, ",", cp1y, ",", cp2x, ",", cp2y, ",", x, ",", y
                when "b"
                  cp1x = Math.round(outline[i++]) + offsetX
                  cp1y = outline[i++]
                  cp2x = Math.round(outline[i++]) + offsetX
                  cp2y = outline[i++]
                  vmlSegments.push "c ", cp1x, ",", cp1y, ",", cp2x, ",", cp2y, ",", x, ",", y
              prevX = x
              prevY = y
          vmlSegments.push "x e"
          vmlSegments

        _renderWord: (face, style, text) ->
          offsetX = 0
          shape = @initializeSurface(face, style, text)
          letterSpacingPoints = (if style.letterSpacing and style.letterSpacing isnt "normal" then @pointsFromPixels(face, style, style.letterSpacing) else 0)
          letterSpacingPoints = Math.round(letterSpacingPoints)
          chars = text.split("")
          vmlSegments = []
          i = 0

          while i < chars.length
            char = chars[i]
            vmlSegments = @renderGlyph(shape, face, char, offsetX, style, vmlSegments)
            offsetX += face.glyphs[char].ha + letterSpacingPoints
            i++
          if style.textDecoration is "underline"
            posY = face.underlinePosition - (face.underlineThickness / 2)
            vmlSegments.push "xm ", 0, ",", posY
            vmlSegments.push "l ", offsetX, ",", posY
            vmlSegments.push "l ", offsetX, ",", posY + face.underlineThickness
            vmlSegments.push "l ", 0, ",", posY + face.underlineThickness
            vmlSegments.push "l ", 0, ",", posY
            vmlSegments.push "x e"
          
          # make sure to preserve trailing whitespace
          shape.path += vmlSegments.join("") + "m " + offsetX + " 0 l " + offsetX + " " + face.ascender
          element: shape
          width: Math.floor(@pixelsFromPoints(face, style, offsetX, "horizontal"))

    setVectorBackend: (backend) ->
      @vectorBackend = backend
      backendFunctions = ["renderWord", "initializeSurface", "renderGlyph"]
      i = 0

      while i < backendFunctions.length
        backendFunction = backendFunctions[i]
        this[backendFunction] = @vectorBackends[backend]["_" + backendFunction]
        i++

    initialize: ->
      
      # quit if this function has already been called
      return  if arguments_.callee.done
      
      # flag this function so we don't do the same thing twice
      arguments_.callee.done = true
      
      # kill the timer
      clearInterval _typefaceTimer  if window._typefaceTimer
      @renderDocument (e) ->
        e.style.visibility = "visible"


  
  # IE won't accept real selectors...
  typefaceSelectors = [".typeface-js", "h1", "h2", "h3", "h4", "h5", "h6"]
  if document.createStyleSheet
    styleSheet = document.createStyleSheet()
    i = 0

    while i < typefaceSelectors.length
      selector = typefaceSelectors[i]
      styleSheet.addRule selector, "visibility: hidden"
      i++
    styleSheet.addRule ".typeface-js-selected-text", "-ms-filter: \t\t\t\"Chroma(color=black) \t\t\tprogid:DXImageTransform.Microsoft.MaskFilter(Color=white) \t\t\tprogid:DXImageTransform.Microsoft.MaskFilter(Color=blue) \t\t\talpha(opacity=30)\" !important; \t\tcolor: black; \t\tfont-family: Modern; \t\tposition: absolute; \t\twhite-space: pre; \t\tfilter: alpha(opacity=0) !important;"
    styleSheet.addRule ".typeface-js-vector-container", "position: relative"
  else if document.styleSheets
    unless document.styleSheets.length
      (->
        
        # create a stylesheet if we need to
        styleSheet = document.createElement("style")
        styleSheet.type = "text/css"
        document.getElementsByTagName("head")[0].appendChild styleSheet
      )()
    styleSheet = document.styleSheets[0]
    document.styleSheets[0].insertRule typefaceSelectors.join(",") + " { visibility: hidden; }", styleSheet.cssRules.length
    document.styleSheets[0].insertRule ".typeface-js-selected-text { \t\t\tcolor: rgba(128, 128, 128, 0); \t\t\topacity: 0.30; \t\t\tposition: absolute; \t\t\tfont-family: Arial, sans-serif; \t\t\twhite-space: pre \t\t}", styleSheet.cssRules.length
    try
      
      # set selection style for Mozilla / Firefox
      document.styleSheets[0].insertRule ".typeface-js-selected-text::-moz-selection { background: blue; }", styleSheet.cssRules.length
    try
      
      # set styles for browsers with CSS3 selectors (Safari, Chrome)
      document.styleSheets[0].insertRule ".typeface-js-selected-text::selection { background: blue; }", styleSheet.cssRules.length
    
    # most unfortunately, sniff for WebKit's quirky selection behavior
    document.styleSheets[0].insertRule ".typeface-js-vector-container { position: relative }", styleSheet.cssRules.length  if /WebKit/i.test(navigator.userAgent)
  backend = (if window.CanvasRenderingContext2D or document.createElement("canvas").getContext then "canvas" else (if !!(window.attachEvent and not window.opera) then "vml" else null))
  if backend is "vml"
    document.namespaces.add "v", "urn:schemas-microsoft-com:vml", "#default#VML"
    styleSheet = document.createStyleSheet()
    styleSheet.addRule "v\\:shape", "display: inline-block;"
  _typeface_js.setVectorBackend backend
  window._typeface_js = _typeface_js
  if /WebKit/i.test(navigator.userAgent)
    _typefaceTimer = setInterval(->
      _typeface_js.initialize()  if /loaded|complete/.test(document.readyState)
    , 10)
  if document.addEventListener
    window.addEventListener "DOMContentLoaded", (->
      _typeface_js.initialize()
    ), false
  
  #@cc_on @
  
  #@if (@_win32)
  #
  #document.write("<script id=__ie_onload_typeface defer src=//:><\/script>");
  #var script = document.getElementById("__ie_onload_typeface");
  #script.onreadystatechange = function() {
  #	if (this.readyState == "complete") {
  #		_typeface_js.initialize(); 
  #	}
  #};
  #
  #/*@end @
  try
    console.log "initializing typeface.js"
)()
