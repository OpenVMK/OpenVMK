-- Script
property pCache

on construct me
  pCache = [:]
  return 1
end
on parse me, tFieldName
  if memberExists(tFieldName) then
    if listp(pCache[tFieldName]) then
      tdata = pCache[tFieldName]
    else
      if tFieldName contains ".window" then
        tdata = me.parse_window(tFieldName)
        pCache[tFieldName] = tdata
      else
        if tFieldName contains ".element" then
          tdata = me.parse_element(tFieldName)
          pCache[tFieldName] = tdata
        else
          if tFieldName contains ".room" then
            tdata = me.parse_visual(tFieldName)
          else
            if tFieldName contains ".visual" then
              tdata = me.parse_visual(tFieldName)
              pCache[tFieldName] = tdata
            end if
          end if
        end if
      end if
    end if
  else
    return error(me, "Member not found:" && tFieldName, #parse)
  end if
  return tdata.duplicate()
end
on parse_window me, tFieldName
  tdata = member(getResourceManager().getmemnum(tFieldName)).text
  tXML = CreateXML(member(getResourceManager().getmemnum(tFieldName)).text)
  tNumberTypes = [#locH, #locV, #locZ, #ink, #blend, #width, #height, #wordWrap, #fontSize, #fixedLineSpace, #fontStyle]
  tSymbolTypes = [#media, #type, #strech]
  tLayDefinition = [:]
  if tXML.Search("TYPE", "version", 1) then
    tLayDefinition[#version] = [tXML[1][#param]["number"]]
  end if
  if tXML.Search("TYPE", "rect", 1) then
    tLayDefinition[#rect] = [value(tXML[1][#param]["string"])]
  end if
  if tXML.Search("TYPE", "roomdata", 1) then
    tLayDefinition[#roomdata] = [tXML[1][#param]["string"]]
  end if
  if tXML.Search("TYPE", "border", 1) then
    tLayDefinition[#border] = [value(tXML[1][#param]["string"])]
  end if
  if tXML.Search("TYPE", "clientrect", 1) then
    tLayDefinition[#clientrect] = [value(tXML[1][#param]["string"])]
  end if
  if tXML.Search("TYPE", "elements", 1) then
    tLayDefinition[#elements] = []
    repeat with t = 1 to tXML.count()
      tElem = tXML[t]
      tList = [:]
      repeat with p = 1 to tElem[#param].count
        tKey = symbol(tElem[#param].getPropAt(p))
        tParam = tElem[#param][p]
        if tNumberTypes.getPos(tKey) <> 0 then
          tParam = value(tParam)
        else
          if tSymbolTypes.getPos(tKey) <> 0 then
            tParam = symbol(tParam)
          end if
        end if
        tList.addProp(tKey, tParam)
      end repeat
      tLayDefinition[#elements].add(tList)
    end repeat
  end if
  tElements = [:]
  repeat with tElem in tLayDefinition[#elements]
    if voidp(tElem[#id]) then
      tSymbol = "null"
    else
      tSymbol = tElem.id
    end if
    if voidp(tElements[tSymbol]) then
      tElements[tSymbol] = []
    end if
    tElements[tSymbol].add(tElem)
  end repeat
  tResMgr = getResourceManager()
  repeat with tElem in tLayDefinition[#elements]
    if stringp(tElem[#txtColor]) then
      tElem[#txtColor] = rgb(tElem[#txtColor])
    end if
    if stringp(tElem[#txtBgColor]) then
      tElem[#txtBgColor] = rgb(tElem[#txtBgColor])
    end if
    if voidp(tElem[#color]) then
      tElem[#color] = "#000000"
    end if
    if voidp(tElem[#bgColor]) then
      tElem[#bgColor] = "#FFFFFF"
    end if
    tElem[#color] = rgb(tElem[#color])
    tElem[#bgColor] = rgb(tElem[#bgColor])
    tPalette = tElem[#palette]
    if stringp(tPalette) then
      if not tResMgr.exists(tPalette && "Duplicate") then
        tPalMemNum = tResMgr.getmemnum(tPalette)
        if tPalMemNum > 0 then
          member(tPalMemNum).duplicate(tResMgr.createMember(tPalette && "Duplicate", #palette))
        else
          tResMgr.createMember(tPalette && "Duplicate", #palette)
          error(me, "Palette member missing:" && tPalette, #parse_window)
        end if
      end if
      tElem[#palette] = tPalette && "Duplicate"
    end if
    if tElem[#type] = "text" then
      tFontStruct = getStructVariable("struct.font.plain")
      if voidp(tElem[#wordWrap]) then
        tElem[#wordWrap] = 1
      end if
      if voidp(tElem[#alignment]) then
        tElem[#alignment] = #left
      end if
      if voidp(tElem[#font]) then
        tElem[#font] = tFontStruct.getaProp(#font)
      end if
      if voidp(tElem[#fontSize]) then
        tElem[#fontSize] = tFontStruct.getaProp(#fontSize)
      end if
      if voidp(tElem[#fontStyle]) then
        tElem[#fontStyle] = tFontStruct.getaProp(#fontStyle)
      end if
      if voidp(tElem[#txtColor]) then
        tElem[#txtColor] = tFontStruct.getaProp(#color)
      end if
      if voidp(tElem[#txtBgColor]) then
        tElem[#txtBgColor] = rgb(255, 255, 255)
      end if
      if voidp(tElem[#fixedLineSpace]) then
        tElem[#fixedLineSpace] = tElem[#fontSize]
      end if
    end if
    if not voidp(tElem[#strech]) then
      tElem[#scaleH] = #fixed
      tElem[#scaleV] = #fixed
      case tElem[#strech] of
        #moveH:
          tElem[#scaleH] = #move
        #moveV:
          tElem[#scaleV] = #move
        #strechH:
          tElem[#scaleH] = #scale
        #strechV:
          tElem[#scaleV] = #scale
        #centerH:
          tElem[#scaleH] = #center
        #centerV:
          tElem[#scaleV] = #center
        #moveHV:
          tElem[#scaleH] = #move
          tElem[#scaleV] = #move
        #strechHV:
          tElem[#scaleH] = #scale
          tElem[#scaleV] = #scale
        #centerHV:
          tElem[#scaleH] = #center
          tElem[#scaleV] = #center
        #moveHstrechV:
          tElem[#scaleH] = #move
          tElem[#scaleV] = #scale
        #moveVstrechH:
          tElem[#scaleH] = #scale
          tElem[#scaleV] = #move
        #moveHcenterV:
          tElem[#scaleH] = #move
          tElem[#scaleV] = #center
        #moveVcenterH:
          tElem[#scaleH] = #center
          tElem[#scaleV] = #move

      end case
      tElem.deleteProp(#strech)
    end if
  end repeat
  if tLayDefinition[#rect].count = 0 then
    tRect = rect(10000, 10000, -10000, -10000)
    repeat with tElement in tElements
      repeat with tItem in tElement
        if tItem.locH < tRect[1] then
          tRect[1] = tItem.locH
        end if
        if tItem.locV < tRect[2] then
          tRect[2] = tItem.locV
        end if
        if tItem.locH + tItem.width > tRect[3] then
          tRect[3] = tItem.locH + tItem.width
        end if
        if tItem.locV + tItem.height > tRect[4] then
          tRect[4] = tItem.locV + tItem.height
        end if
      end repeat
    end repeat
    tLayDefinition[#rect].add(tRect)
    repeat with tElement in tElements
      repeat with tItem in tElement
        tItem.locH = tItem.locH - tRect[1]
        tItem.locV = tItem.locV - tRect[2]
      end repeat
    end repeat
  else
    tList = tLayDefinition[#rect][1]
    tLayDefinition[#rect][1] = rect(tList[1], tList[2], tList[3], tList[4])
  end if
  tOffX = tLayDefinition[#rect][1][1]
  tOffY = tLayDefinition[#rect][1][2]
  tLayDefinition[#rect][1] = tLayDefinition[#rect][1] - [tOffX, tOffY, tOffX, tOffY]
  if tLayDefinition[#border].count = 0 then
    if tLayDefinition[#clientrect].count > 0 then
      tClientRect = tLayDefinition[#clientrect][1]
      tWinWidth = tLayDefinition[#rect][1][3]
      tWinHeight = tLayDefinition[#rect][1][4]
      tBorder = [tClientRect[1], tClientRect[2], tWinWidth - tClientRect[3], tWinHeight - tClientRect[4]]
      tLayDefinition[#border].add(tBorder)
    else
      tLayDefinition[#border].add([0, 0, 0, 0])
    end if
  end if
  tLayDefinition[#elements] = tElements
  return tLayDefinition
end
on parse_element me, tFieldName
  tProps = [:]
  tdata = member(getResourceManager().getmemnum(tFieldName)).text
  repeat with f = 1 to tdata.line.count
    tLine = tdata.line[f]
    if tLine.char[1] <> "#" then
      if length(tLine) > 1 then
        tvalue = value(tLine)
        tProps.addProp(tvalue[#state], tvalue)
      end if
    end if
  end repeat
  return tProps
end
on parse_visual me, tFieldName
  tdata = member(getResourceManager().getmemnum(tFieldName)).text
  tXML = CreateXML(member(getResourceManager().getmemnum(tFieldName)).text)
  tLayDefinition = [:]
  if tXML.Search("TYPE", "version", 1) then
    tLayDefinition[#version] = [tXML[1][#param]["number"]]
  end if
  if tXML.Search("TYPE", "rect", 1) then
    tLayDefinition[#rect] = [value(tXML[1][#param]["string"])]
  end if
  if tXML.Search("TYPE", "roomdata", 1) then
    tLayDefinition[#roomdata] = [tXML[1][#param]["string"]]
  end if
  if tXML.Search("TYPE", "elements", 1) then
    tLayDefinition[#elements] = []
    repeat with t = 1 to tXML.count()
      tElem = tXML[t]
      tList = [:]
      repeat with p = 1 to tElem[#param].count
        tList.addProp(symbol(tElem[#param].getPropAt(p)), tElem[#param][p])
      end repeat
      tLayDefinition[#elements].add(tList)
    end repeat
  end if
  if voidp(tLayDefinition[#version]) then
    error(me, "Old visualizer definition:" && tFieldName, #parse_room)
    repeat with tElem in tLayDefinition[#elements]
      if tElem[#media] = #field or tElem[#media] = #text then
        tElem[#txtColor] = tElem[#color]
        tElem[#txtBgColor] = tElem[#bgColor]
        tElem[#color] = "#000000"
        tElem[#bgColor] = "#FFFFFF"
      end if
      tElem.deleteProp(#foreColor)
      tElem.deleteProp(#backColor)
    end repeat
  end if
  repeat with tElem in tLayDefinition[#elements]
    if voidp(tElem[#color]) then
      tElem[#color] = "#000000"
    end if
    if voidp(tElem[#bgColor]) then
      tElem[#bgColor] = "#FFFFFF"
    end if
    if tElem[#type] = "button" then
      tElem[#Active] = 1
    end if
  end repeat
  return [#name: tLayDefinition[#name], #roomdata: tLayDefinition[#roomdata], #rect: tLayDefinition[#rect], #elements: tLayDefinition[#elements]]
end