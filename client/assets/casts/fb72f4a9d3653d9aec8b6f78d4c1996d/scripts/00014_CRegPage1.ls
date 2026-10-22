-- Script
property m_rWindow
property m_bBoyState
property m_bGirlState
property m_sSex
property m_rRegAvBuilderMain
property m_ar_BodyPartList
property m_ar_BodyPartObjects
property m_mp_AllSets
property m_ar_FigureColorList
property m_ar_FigureSetNumbers
property m_ar_SetContents
property m_ar_PropsToServer
property m_ar_AvatarData
property m_ar_availableSets
property m_bDataGathered
property m_CurrentHairCol
property m_CurrentSkinCol
property m_bCanWearHat
property m_NoHat_Img
property m_ar_RoomList
property m_iSelectedRoom
property m_iSelectedRoomId
property m_rComponentsPage
property m_sActiveName

on construct this
  m_ar_PropsToServer = [:]
  m_ar_availableSets = VOID
  m_mp_AllSets = []
  m_mp_AvatarInstances = [:]
  m_ar_BodyPartList = []
  m_ar_BodyPartObjects = [:]
  m_rWindow = VOID
  m_bBoyState = 1
  m_bGirlState = 0
  m_bDataGathered = 1
  m_sSex = "M"
  m_CurrentHairCol = VOID
  m_CurrentSkinCol = VOID
  m_ar_RoomList = VOID
  m_iSelectedRoom = 1
  m_rComponentsPage = VOID
  m_sActiveName = EMPTY
  m_sTimerId = EMPTY
  this.DumpSetlists()
  m_ar_SetContents = ["hr": ["hr"], "hd": ["tr", "ey", "fc", "hd", "lh", "rh", "llg", "rlg"], "ch": ["ch", "ch2", "ls", "rs"], "pn": ["lpn", "rpn"], "sh": ["lsh", "rsh"], "ht": ["ht"]]
  m_NoHat_Img = member(getmemnum("nohats.preview")).image
  return 1
end
on deconstruct this
  if objectp(m_rWindow) then
    this.Purge(m_rWindow)
  end if
  return 1
end
on DumpSetlists this
  t_objFigureSetLoader = getObject("figsetLoader")
  if objectp(t_objFigureSetLoader) then
    t_bISready = t_objFigureSetLoader.IsReady()
    if t_bISready then
      if timeoutExists("RegAvatarSetTimer") then
        removeTimeout("RegAvatarSetTimer")
      end if
      m_ar_FigureColorList = getVariableValue("ColorList")
      m_ar_FigureSetNumbers = getVariableValue("SetNumbers")
      this.parseAllFigureData()
      this.updateStats()
    else
      if not timeoutExists("RegAvatarSetTimer") then
        createTimeout("RegAvatarSetTimer", 500, #DumpSetlists, this.getID(), VOID, 0)
      end if
    end if
  end if
end
on merge this, a_rWindow
  executeMessage(#login_hide)
  m_rWindow = a_rWindow
  m_rWindow.merge("vmk_reg_step1.window")
  if m_rWindow.elementExists("reg.boy") then
    t_Img = member(getmemnum("button.checkbox." & m_bBoyState)).image
    if not voidp(t_Img) then
      m_rWindow.getElement("reg.boy").feedImage(t_Img)
    end if
  end if
  if m_rWindow.elementExists("reg.girl") then
    t_img2 = member(getmemnum("button.checkbox." & m_bGirlState)).image
    if not voidp(t_img2) then
      m_rWindow.getElement("reg.girl").feedImage(t_img2)
    end if
  end if
  if m_rWindow.elementExists("reg.username.input") then
    m_rWindow.getElement("reg.username.input").setFocus(1)
  end if
  m_rWindow.getElement("set.nohats.info").setProperty(#blend, 0)
  this.GenerateNames()
  return 1
end
on Purge this, a_rWindow
  if objectp(m_rWindow) then
    m_rWindow = VOID
    return a_rWindow.unmerge()
  else
    return 1
  end if
end
on updateStats this
  if textExists("reg.page1.url") then
    t_sTrackingURL = getText("reg.page1.url")
    t_iRandom = random(the milliSeconds)
    t_sNetThing = replaceChunks(t_sTrackingURL, "randomNumber", t_iRandom)
    if t_sTrackingURL.ilk = #string then
      t_ID = preloadNetThing(t_sNetThing)
    end if
  else
    return 0
  end if
end
on DataGathered this
  return m_bDataGathered
end
on update this, a_mp_kType_mp_iRef_rItem, a_kAlteredCategory
  m_ar_AvatarData = a_mp_kType_mp_iRef_rItem
  if objectp(m_rWindow) then
    case a_kAlteredCategory of
      "AvailableSets":
        this.parseAvailableSets()
        if m_ar_AvatarData.findPos("GuestRoomList") > 0 then
          m_ar_RoomList = m_ar_AvatarData["GuestRoomList"]
          this.ChangeRoomSelection(1)
        end if
      "ChangeAvatar":
        this.ParseFigure(m_ar_AvatarData["ChangeAvatar"])
      "AvatarData":
        this.ParseMyAvatar(m_ar_AvatarData["AvatarData"])
      "GuestRoomList":
        m_ar_RoomList = m_ar_AvatarData["GuestRoomList"]
        this.ChangeRoomSelection(1)
      "AvatarCreated":
        m_bDataGathered = 1
      "AvatarNames":
        this._SuggestNames()
      "GeneratedNames":
        this._PopulateNameList(m_ar_AvatarData["GeneratedNames"])
      otherwise:
        this.parseAvailableSets()

    end case
  end if
end
on _SuggestNames
  t_ar_nameList = m_ar_AvatarData["AvatarNames"]
  t_sTxt = EMPTY
  if t_ar_nameList.count > 0 then
    repeat with i = 1 to t_ar_nameList.count
      t_sTxt = t_sTxt & TAB & t_ar_nameList[i]
    end repeat
  end if
  if m_rWindow.elementExists("reg.username.taken.hd") then
    m_rWindow.getElement("reg.username.taken.hd").setProperty(#visible, 1)
  end if
  if m_rWindow.elementExists("reg.username.list.hd") then
    m_rWindow.getElement("reg.username.list.hd").setProperty(#visible, 1)
  end if
  if m_rWindow.elementExists("reg.username.list") then
    m_rWindow.getElement("reg.username.list").setText(t_sTxt)
  end if
end
on _ChooseSex this, a_iSex
  if a_iSex = 0 then
    a_iSex = "M"
  else
    a_iSex = "F"
  end if
  if m_sSex = a_iSex then
    return 1
  end if
  if m_rWindow.elementExists("reg.boy") and m_rWindow.elementExists("reg.girl") then
    case a_iSex of
      "M":
        m_bBoyState = not m_bBoyState
        m_bGirlState = 0
        t_Img = member(getmemnum("button.checkbox." & m_bBoyState)).image
        if not voidp(t_Img) then
          m_rWindow.getElement("reg.boy").feedImage(t_Img)
        end if
        t_img2 = member(getmemnum("button.checkbox." & m_bGirlState)).image
        if not voidp(t_img2) then
          m_rWindow.getElement("reg.girl").feedImage(t_img2)
        end if
        m_sSex = "M"
        this.parseAvailableSets()
      "F":
        m_bGirlState = not m_bGirlState
        m_bBoyState = 0
        t_Img = member(getmemnum("button.checkbox." & m_bGirlState)).image
        if not voidp(t_Img) then
          m_rWindow.getElement("reg.girl").feedImage(t_Img)
        end if
        t_img2 = member(getmemnum("button.checkbox." & m_bBoyState)).image
        if not voidp(t_img2) then
          m_rWindow.getElement("reg.boy").feedImage(t_img2)
        end if
        m_sSex = "F"
        this.parseAvailableSets()

    end case
  end if
end
on parseAllFigureData this
  m_mp_AllSets = getVariableValue("AllAvailableSets")
end
on getFigureSets this, a_iPartNum
  if listp(m_ar_FigureSetNumbers) then
    t_SetName = VOID
    if a_iPartNum = -1 then
      t_SetName = "ht"
      t_sSex = m_sSex
    end if
    t_iCount = m_ar_FigureSetNumbers.count - 1
    if t_SetName <> "ht" then
      repeat with i = 1 to t_iCount
        i_value1 = m_ar_FigureSetNumbers.getPropAt(i)
        i_value2 = m_ar_FigureSetNumbers.getPropAt(i + 1)
        i_value1 = value(i_value1)
        i_value2 = value(i_value2)
        case 1 of
          i_value1 = a_iPartNum:
            t_SetName = m_ar_FigureSetNumbers[i][1]
            t_sSex = m_ar_FigureSetNumbers[i][2]
          i_value2 = a_iPartNum:
            t_SetName = m_ar_FigureSetNumbers[i + 1][1]
            t_sSex = m_ar_FigureSetNumbers[i + 1][2]
          i_value1 < a_iPartNum and a_iPartNum < i_value2:
            t_SetName = m_ar_FigureSetNumbers[i][1]
            t_sSex = m_ar_FigureSetNumbers[i][2]
          a_iPartNum > i_value2:
            t_SetName = m_ar_FigureSetNumbers[i + 1][1]
            t_sSex = m_ar_FigureSetNumbers[i + 1][2]

        end case
      end repeat
    end if
    if not voidp(t_SetName) then
      t_sSetContents = m_ar_SetContents[t_SetName]
      t_mp_list = []
      t_mp_list.add(t_SetName)
      t_mp_list.add(t_sSetContents)
      t_mp_list.add(t_sSex)
      return t_mp_list
    else
      return error(this, "No such figure set available: " && a_iPartNum, #getFigureSets)
    end if
  end if
end
on parseAvailableSets this
  if listp(m_ar_AvatarData) then
    t_ar_availableSets1 = m_ar_AvatarData["AvailableSets"][m_sSex]
    t_ar_availableSets = [:]
    repeat with i = 1 to t_ar_availableSets1.count
      t_iSetID = t_ar_availableSets1[i]
      t_mp_DataList = this.getFigureSets(t_iSetID)
      if not listp(t_mp_DataList) then
        exit
      end if
      if t_ar_availableSets.findPos(t_mp_DataList[1]) then
        t_ar_availableSets[t_mp_DataList[1]].add(t_iSetID)
        next repeat
      end if
      t_ar_availableSets[t_mp_DataList[1]] = []
      t_ar_availableSets[t_mp_DataList[1]].add(t_iSetID)
    end repeat
    m_ar_availableSets = t_ar_availableSets
    if t_ar_availableSets.findPos("ht") <> VOID then
      t_ar_availableSets["ht"].add(-1)
    end if
    this.ParseMyAvatar(m_ar_AvatarData["AvailableSets"]["Default_" & m_sSex])
    this.CreateFigure()
  else
  end if
end
on CreateFigure this
  tProps = m_ar_PropsToServer
  m_mp_FlipList = [0, 1, 2, 3, 4, 3, 2, 1]
  m_ar_BodyPartObjects = [:]
  t_mpPartIndex = ["tr": [:], "llg": [:], "lsh": [:], "lpn": [:], "rlg": [:], "rsh": [:], "rpn": [:], "lh": [:], "ls": [:], "ch": [:], "ch2": [:], "rh": [:], "rs": [:], "hd": [:], "fc": [:], "ey": [:], "hr": [:], "ht": [:]]
  repeat with i = 1 to tProps.count
    tDirection = 4
    tAction = "std"
    repeat with e = 1 to tProps[i]["Figure"].count
      t_sPart = tProps[i]["Figure"].getPropAt(e)
      t_mpPartIndex[t_sPart].addProp(#figure, tProps[i]["Figure"][e])
      t_mpPartIndex[t_sPart].addProp(#color, tProps[i]["Color"])
    end repeat
  end repeat
  repeat with f = 1 to t_mpPartIndex.count
    tPart = t_mpPartIndex.getPropAt(f)
    tmodel = t_mpPartIndex[f].figure
    if t_mpPartIndex[f].color <> -1 and t_mpPartIndex[f].color <> VOID then
      tColor = rgb(t_mpPartIndex[f].color)
      if tPart = "hr" then
        m_CurrentHairCol = t_mpPartIndex[f].color
      end if
      if tPart = "hd" then
        m_CurrentSkinCol = t_mpPartIndex[f].color
      end if
    else
      t_mpPartIndex[f].color = -1
    end if
    t_sName = tPart
    case t_sName of
      "llg", "rlg", "lsh", "rsh", "lpn", "rpn":
        t_sName = "lg"
      "ls":
        t_sName = "llg"
      "rs":
        t_sName = "rlg"

    end case
    t_sObjectName = "CBodypartClass_" & t_sName
    if memberExists(t_sObjectName) then
      tTempPartObj = createObject(#temp, t_sObjectName)
    else
      tTempPartObj = createObject(#temp, "CBodypartClass")
    end if
    tTempPartObj.Define(tPart, tmodel, tColor, tDirection, tAction, this)
    m_ar_BodyPartObjects.addProp(tPart, tTempPartObj)
  end repeat
  this.updateFigurePreview()
  this.updateAllPrewIcons()
  return 1
end
on changePart this, a_iPartName, a_iDirection
  if m_ar_availableSets.findPos(a_iPartName) = VOID then
    return 0
  end if
  t_iCurrentSet = value(m_ar_PropsToServer[a_iPartName]["SetID"])
  if not voidp(t_iCurrentSet) then
    t_arSetList = m_ar_availableSets[a_iPartName]
    t_iMyPos = t_arSetList.findPos(t_iCurrentSet)
    t_iSetCount = m_ar_availableSets[a_iPartName].count
    t_iNewPos = t_iMyPos + a_iDirection
    case 1 of
      t_iNewPos <= 0:
        t_iNewSet = t_arSetList[t_arSetList.count]
      t_iNewPos > t_iSetCount:
        t_iNewSet = t_arSetList[1]
      otherwise:
        t_iNewSet = t_arSetList[t_iNewPos]

    end case
  end if
  t_mpMySet = m_mp_AllSets[a_iPartName][string(t_iNewSet)]
  m_ar_PropsToServer[a_iPartName]["SetID"] = t_iNewSet
  m_ar_PropsToServer[a_iPartName]["Figure"] = t_mpMySet[1]
  m_ar_PropsToServer[a_iPartName]["Color"] = t_mpMySet[2][1]
  if a_iPartName = "hr" then
    if m_CurrentHairCol <> VOID then
      if t_mpMySet[2].findPos(m_CurrentHairCol) then
        m_ar_PropsToServer[a_iPartName]["Color"] = m_CurrentHairCol
      end if
    end if
  end if
  if a_iPartName = "hd" then
    if m_CurrentSkinCol <> VOID then
      if t_mpMySet[2].findPos(m_CurrentSkinCol) then
        m_ar_PropsToServer[a_iPartName]["Color"] = m_CurrentSkinCol
      end if
    end if
  end if
  if a_iPartName = "hr" then
    m_bCanWearHat = getThread(#AvatarFactory).component.GetHatList(t_iNewSet)
    if m_bCanWearHat then
      m_rWindow.getElement("part.ht.preview").setProperty(#blend, 100)
      m_rWindow.getElement("change.ht.1").setProperty(#blend, 100)
      m_rWindow.getElement("change.ht.-1").setProperty(#blend, 100)
      m_rWindow.getElement("set.nohats.info").setProperty(#blend, 0)
    else
      m_rWindow.getElement("part.ht.preview").setProperty(#blend, 30)
      m_rWindow.getElement("change.ht.1").setProperty(#blend, 30)
      m_rWindow.getElement("change.ht.-1").setProperty(#blend, 30)
      m_rWindow.getElement("set.nohats.info").setProperty(#blend, 100)
      tTempPartObj = m_ar_BodyPartObjects["ht"]
      tTempPartObj.Define("ht", 0, 0, 4, "std", this)
      if not voidp(m_NoHat_Img) then
        t_Img = m_NoHat_Img.duplicate()
        m_rWindow.getElement("part.ht.preview").feedImage(t_Img)
      end if
      if not voidp(m_ar_PropsToServer) then
        m_ar_PropsToServer["ht"]["SetID"] = -1
        m_ar_PropsToServer["ht"]["Color"] = -1
        m_ar_PropsToServer["ht"]["Figure"] = ["ht": -1]
      end if
    end if
  end if
  this.updateFigurePreview()
  this.updateAllPrewIcons()
  repeat with i = 1 to m_ar_PropsToServer[a_iPartName]["Figure"].count
    t_mpList = m_ar_PropsToServer[a_iPartName]["Figure"]
    this.setPartModel(t_mpList.getPropAt(i), t_mpList[i])
    this.setPartColor(t_mpList.getPropAt(i), m_ar_PropsToServer[a_iPartName]["Color"])
  end repeat
  if a_iPartName = "ht" and m_ar_PropsToServer["ht"]["SetID"] <> -1 then
    this.CreateFigure()
  end if
  return 1
end
on ChangeColor this, a_iPartName, a_iDirection
  t_iCurrentSet = value(m_ar_PropsToServer[a_iPartName]["SetID"])
  t_iCurrentCol = m_ar_PropsToServer[a_iPartName]["Color"]
  if not voidp(t_iCurrentSet) then
    t_mpMySet = m_mp_AllSets[a_iPartName][string(t_iCurrentSet)]
    t_arColorList = t_mpMySet[2]
    t_iMyPos = t_arColorList.findPos(t_iCurrentCol)
    t_iSetCount = t_arColorList.count
    t_iNewPos = t_iMyPos + a_iDirection
    case 1 of
      t_iNewPos <= 0:
        t_iNewColor = t_arColorList[t_arColorList.count]
      t_iNewPos > t_iSetCount:
        t_iNewColor = t_arColorList[1]
      otherwise:
        t_iNewColor = t_arColorList[t_iNewPos]

    end case
  end if
  repeat with i = 1 to t_mpMySet[1].count
    this.setPartColor(t_mpMySet[1].getPropAt(i), t_iNewColor)
  end repeat
  m_ar_PropsToServer[a_iPartName]["Color"] = t_iNewColor
  if a_iPartName = "hr" then
    m_CurrentHairCol = t_iNewColor
  end if
  if a_iPartName = "hd" then
    m_CurrentSkinCol = t_iNewColor
  end if
  this.updateFigurePreview()
  this.updateAllPrewIcons()
  return 1
end
on changeFigurePart this, ar_mp_partList
  repeat with i = 1 to ar_mp_partList.count
    this.setPartModel(ar_mp_partList.getPropAt(i), ar_mp_partList[i])
  end repeat
end
on updateFigurePreview this
  if not voidp(m_ar_BodyPartObjects) then
    if m_rWindow.elementExists("human.preview.img") then
      t_HumanImg = image(120, 300, 32)
      t_ImgAlpha = image(120, 300, 8, #grayscale)
      t_HumanImg.fill(t_HumanImg.rect, rgb(255, 175, 0))
      t_mpList = ["tr", "llg", "lsh", "lpn", "rlg", "rsh", "rpn", "lh", "ls", "ch", "ch2", "rh", "rs", "hd", "fc", "ey", "hr", "ht"]
      this.getPartImg(t_mpList, t_HumanImg)
      this.getPartAlpha(t_mpList, t_ImgAlpha)
      t_HumanImg.setAlpha(t_ImgAlpha)
      tWidth = t_HumanImg.width
      tHeight = t_HumanImg.height
      t_PrewImg = image(tWidth, tHeight, 32)
      tdestrect = t_PrewImg.rect - t_HumanImg.rect * 2
      tMargins = rect(0, -15, 0, -15)
      tdestrect = rect(0, tdestrect.bottom, t_HumanImg.width * 2, t_PrewImg.rect.bottom) + tMargins
      t_PrewImg.copyPixels(t_HumanImg, tdestrect, t_HumanImg.rect)
      m_rWindow.getElement("human.preview.img").feedImage(t_PrewImg)
    end if
  end if
end
on updateAllPrewIcons this
  t_mpList = ["hr", "hd", "ch", "pn", "sh", "ht"]
  repeat with tPart in t_mpList
    t_mp_FigureData = m_ar_PropsToServer[tPart]
    if not voidp(t_mp_FigureData["Color"]) then
      this.updatePartColorPreview(tPart, t_mp_FigureData["Color"])
    end if
    case tPart of
      "hd":
        tTemp = ["hd": t_mp_FigureData["Figure"]["hd"], "ey": t_mp_FigureData["Figure"]["ey"], "fc": t_mp_FigureData["Figure"]["fc"]]
        this.updatePartPreview(tPart, tTemp)
      "ch":
        tTemp = ["ls": t_mp_FigureData["Figure"]["ls"], "ch": t_mp_FigureData["Figure"]["ch"], "rs": t_mp_FigureData["Figure"]["rs"], "ch2": t_mp_FigureData["Figure"]["ch2"]]
        this.updatePartPreview(tPart, tTemp)
      "ht":
        if t_mp_FigureData["Figure"]["ht"] = -1 then
          t_Img = m_NoHat_Img.duplicate()
          m_rWindow.getElement("part.ht.preview").feedImage(t_Img)
        else
          if not voidp(t_mp_FigureData["Figure"]) then
            this.updatePartPreview(tPart, t_mp_FigureData["Figure"])
          end if
        end if
        t_sHairSetID = m_ar_PropsToServer["hr"]["SetID"]
        if not voidp(t_sHairSetID) then
          m_bCanWearHat = getThread(#AvatarFactory).component.GetHatList(t_sHairSetID)
          if m_bCanWearHat then
            m_rWindow.getElement("part.ht.preview").setProperty(#blend, 100)
            m_rWindow.getElement("change.ht.1").setProperty(#blend, 100)
            m_rWindow.getElement("change.ht.-1").setProperty(#blend, 100)
            m_rWindow.getElement("set.nohats.info").setProperty(#blend, 0)
          else
            m_rWindow.getElement("part.ht.preview").setProperty(#blend, 30)
            m_rWindow.getElement("change.ht.1").setProperty(#blend, 30)
            m_rWindow.getElement("change.ht.-1").setProperty(#blend, 30)
            m_rWindow.getElement("set.nohats.info").setProperty(#blend, 100)
          end if
        end if
      otherwise:
        if not voidp(t_mp_FigureData["Figure"]) then
          this.updatePartPreview(tPart, t_mp_FigureData["Figure"])
        end if

    end case
  end repeat
end
on updatePartPreview this, tPart, a_mp_ChangingPartList
  tElemID = "part." & tPart & ".preview"
  tWndObj = m_rWindow
  tElem = tWndObj.getElement(tElemID)
  if not voidp(m_ar_BodyPartObjects) and tElem <> 0 then
    tTempPartImg = image(200, 200, 32)
    t_ImgAlpha = image(200, 200, 8, #grayscale)
    t_mp_ChangingParts = []
    repeat with i = 1 to a_mp_ChangingPartList.count
      t_mp_ChangingParts.add(a_mp_ChangingPartList.getPropAt(i))
      this.setPartModel(a_mp_ChangingPartList.getPropAt(i), a_mp_ChangingPartList[i])
    end repeat
    this.getPartImg(t_mp_ChangingParts, tTempPartImg)
    this.getPartAlpha(t_mp_ChangingParts, t_ImgAlpha)
    tTempPartImg.setAlpha(t_ImgAlpha)
    tTempPartImg = tTempPartImg.trimWhiteSpace()
    tElem.feedImage(tTempPartImg)
  end if
end
on flipImage this, tImg_a
  tImg_b = image(tImg_a.width, tImg_a.height, 32)
  tQuad = [point(tImg_a.width, 0), point(0, 0), point(0, tImg_a.height), point(tImg_a.width, tImg_a.height)]
  tImg_b.copyPixels(tImg_a, tQuad, tImg_a.rect)
  return tImg_b
end
on updatePartColorPreview this, tPart, a_sColor
  if a_sColor <> 0 and a_sColor <> -1 then
    tColor = rgb(a_sColor)
  end if
  tElemID = "part.color." & tPart & ".preview"
  if voidp(tColor) then
    tColor = rgb(255, 255, 255)
  end if
  tWndObj = m_rWindow
  if tWndObj.elementExists(tElemID) then
    tWndObj.getElement(tElemID).getProperty(#sprite).bgColor = tColor
  else
  end if
end
on setPartColor this, tPart, a_sColor
  if a_sColor <> 0 and a_sColor <> -1 then
    tColor = rgb(a_sColor)
  else
    tColor = rgb(255, 255, 255)
  end if
  if not voidp(m_ar_BodyPartObjects) then
    call(#setColor, m_ar_BodyPartObjects[tPart], tColor)
  end if
  this.updateFigurePreview()
  this.updateAllPrewIcons()
end
on setPartModel this, tPart, tmodel
  if not voidp(m_ar_BodyPartObjects) then
    call(#setModel, m_ar_BodyPartObjects[tPart], tmodel)
  end if
end
on ParseMyAvatar this, tMsg
  m_ar_PropsToServer = this.ParseFigure(tMsg)
end
on ParseFigure this, tMsg
  t_ar_SetList = tMsg
  if t_ar_SetList.count > 0 then
    t_mp_MyFigure = [:]
    repeat with i = 1 to t_ar_SetList.count
      if i mod 2 then
        if t_ar_SetList[i] <> -1 then
          t_s_PartNum = string(t_ar_SetList[i])
          t_ar_PartData = this.getFigureSets(t_s_PartNum)
          t_s_PartName = t_ar_PartData[1]
          t_sSex = t_ar_PartData[3]
          t_mp_partMems = m_mp_AllSets[t_s_PartName][t_s_PartNum][1]
          t_mp_MyFigure[t_s_PartName] = [:]
          t_mp_MyFigure[t_s_PartName]["SetID"] = t_s_PartNum
          t_mp_MyFigure[t_s_PartName]["Figure"] = t_mp_partMems
        else
          t_mp_MyFigure["ht"] = [:]
          t_mp_MyFigure["ht"]["SetID"] = -1
          t_mp_MyFigure["ht"]["Figure"] = ["ht": -1]
        end if
        next repeat
      end if
      if t_ar_SetList[i] <> -1 then
        t_mp_MyFigure[t_s_PartName]["Color"] = m_ar_FigureColorList[string(t_ar_SetList[i])]
        next repeat
      end if
      t_mp_MyFigure["ht"]["Color"] = -1
    end repeat
    return t_mp_MyFigure
  else
    return error(this, "Wrong kind of figure data: " && t_ar_SetList, #ParseMyFigure)
  end if
end
on getPartImg this, tPartList, tImg
  if tPartList.ilk <> #list then
    tPartList = [tPartList]
  end if
  repeat with tPart in tPartList
    call(#copyPicture, [m_ar_BodyPartObjects[tPart]], tImg, 3, "std")
  end repeat
end
on getPartAlpha this, tPartList, tImg
  if tPartList.ilk <> #list then
    tPartList = [tPartList]
  end if
  repeat with tPart in tPartList
    call(#copyAlpha, [m_ar_BodyPartObjects[tPart]], tImg, 3, "std")
  end repeat
end
on _GatherData this
  t_txt = VOID
  if objectp(m_rWindow) then
    if m_sActiveName <> EMPTY then
      t_txt = m_sActiveName
    else
      t_iMaxlength = 18
      t_iMinlength = 4
      tElem = m_rWindow.getElement("reg.username.input")
      t_txt = tElem.getText()
      if tElem <> 0 then
        if tElem.pMember.text.char.count > t_iMaxlength then
          tElem.pMember.text = tElem.pMember.char[1..t_iMaxlength]
          t = createDialogWindow(this.getID(), "CheckNameLength", 1, 1)
          t.show()
          t_sMsg = getText("reg.name.toolong")
          t.setText(t_sMsg, "Error", "OK")
          return 1
        else
          if tElem.pMember.text.char.count < t_iMinlength then
            t = createDialogWindow(this.getID(), "CheckNameLength", 1, 1)
            t.show()
            t_sMsg = getText("reg.name.tooshort")
            t.setText(t_sMsg, "Error", "OK")
            return 1
          end if
        end if
      end if
    end if
    t_mp_dataToServer = [:]
    t_mp_dataToServer.addProp(#string, t_txt)
    getObject(#session).set("name", t_txt)
    if m_sSex = "M" then
      t_iSex = 0
    else
      t_iSex = 1
    end if
    t_mp_dataToServer.addProp(#int, t_iSex)
    repeat with i = 1 to m_ar_PropsToServer.count
      t_sColor = m_ar_PropsToServer[i]["Color"]
      if t_sColor = -1 then
        t_iLocinColorList = -1
      else
        repeat with f = 1 to m_ar_FigureColorList.count
          if m_ar_FigureColorList[f] = t_sColor then
            t_iLocinColorList = m_ar_FigureColorList.getPropAt(f)
          end if
        end repeat
      end if
      t_mp_dataToServer.addProp(#int, value(m_ar_PropsToServer[i]["SetID"]))
      if m_ar_PropsToServer[i]["SetID"] = -1 then
        t_mp_dataToServer.addProp(#int, -1)
        next repeat
      end if
      t_mp_dataToServer.addProp(#int, value(t_iLocinColorList))
    end repeat
    t_iSelectedRoom = m_ar_RoomList[m_iSelectedRoom]
    t_mp_dataToServer.addProp(#int, m_iSelectedRoomId)
    getConnection("VMK").send("CreateAvatar", t_mp_dataToServer)
  else
    t = createDialogWindow(this.getID(), "CheckName", 1, 1)
    t.show()
    t_sMsg = getText("reg.name.wrong")
    t.setText(t_sMsg, "Error", "OK")
    return 0
  end if
end
on ChangeRoomSelection this, a_iDir
  if listp(m_ar_RoomList) then
    t_iListCount = m_ar_RoomList.count
    m_iSelectedRoom = m_iSelectedRoom + a_iDir
    case 1 of
      m_iSelectedRoom > t_iListCount:
        m_iSelectedRoom = 1
      m_iSelectedRoom = 0:
        m_iSelectedRoom = t_iListCount

    end case
    m_iSelectedRoomId = m_ar_RoomList[m_iSelectedRoom]
    t_sMemName = "reg.roomstyle." & m_iSelectedRoomId
    if memberExists(t_sMemName) then
      m_rWindow.getElement("reg.roomstyle").feedImage(getMember(t_sMemName).image)
    else
      put "Missing :" && t_sMemName
    end if
    t_sTxt = getText("ROOM." & m_iSelectedRoomId & ".NAME")
    m_rWindow.getElement("reg.roomstyle.hd").setText(t_sTxt)
  end if
end
on ShowConfirmName this
  if objectp(m_rWindow) then
    if m_sActiveName <> EMPTY then
      t_sTxt = m_sActiveName
      t = createDialogWindow(this.getID(), "ConfirmAvatarName", 2, 1)
      t.show()
      t_sHd = getText("reg.confirm.name.hd")
      t_sTxt = replaceChunks(getText("reg.confirm.generated.name"), "%avatarName%", m_sActiveName)
      t.setText(t_sTxt, t_sHd, getText("reg.name.cancel"), getText("reg.name.ok"))
      exit
    end if
    t_iMaxlength = 18
    t_iMinlength = 4
    tElem = m_rWindow.getElement("reg.username.input")
    if tElem <> 0 then
      t_txt = tElem.getText()
      if tElem.pMember.text.char.count > t_iMaxlength then
        tElem.pMember.text = tElem.pMember.char[1..t_iMaxlength]
        t = createDialogWindow(this.getID(), "CheckNameLength", 1, 1)
        t.show()
        t_sMsg = getText("reg.name.toolong")
        t.setText(t_sMsg, "Error", "OK")
        return 1
      else
        if tElem.pMember.text.char.count < t_iMinlength then
          t = createDialogWindow(this.getID(), "CheckNameLength", 1, 1)
          t.show()
          t_sMsg = getText("reg.name.tooshort")
          t.setText(t_sMsg, "Error", "OK")
          return 1
        else
          t = createDialogWindow(this.getID(), "ConfirmAvatarName", 2, 1)
          t.show()
          t_sHd = getText("reg.confirm.name.hd")
          t_sTxt = getText("reg.confirm.name")
          t.setText(t_sTxt, t_sHd, getText("reg.name.cancel"), getText("reg.name.ok"))
        end if
      end if
    end if
  end if
end
on _PopulateNameList this, a_ar_Names
  if objectp(m_rWindow) then
    t_rClientElement = m_rWindow.getElement("reg.namelist")
    t_rComponentsPage = createObject(getUniqueID(), "CUIComponentPage")
    t_rComponentsPage.setSize(t_rClientElement.pOwnW, t_rClientElement.pOwnH)
    t_rComponentsPage.setColor(rgb("#ffc513"))
    repeat with i = 1 to a_ar_Names.count
      t_rComponent = t_rComponentsPage.addComponent("component.registration.xml")
      t_rComponent.GetLayout(1).setEvent(string(a_ar_Names[i]))
      t_rComponent.GetLayout(1).setText(a_ar_Names[i])
      t_rComponent.GetLayout(1).SetTextColor(rgb(250, 250, 250))
    end repeat
    m_rComponentsPage = t_rComponentsPage
    t_rImg = m_rComponentsPage.render()
    t_rClientElement.feedImage(t_rImg)
  end if
end
on GenerateNames this
  getConnection("VMK").send("GenarateNames")
end
on GetActiveName this, a_sName
  m_sActiveName = a_sName
  if objectp(m_rComponentsPage) then
    if objectp(m_rWindow) then
      m_rComponentsPage.setActive(m_sActiveName)
      t_rClientElement = m_rWindow.getElement("reg.namelist")
      t_rImg = m_rComponentsPage.render()
      t_rClientElement.feedImage(t_rImg)
      m_rWindow.getElement("reg.username.input").setText(EMPTY)
    end if
  end if
end
on InactivateNameSelector this
  m_rComponentsPage.inActivate(m_sActiveName)
  m_sActiveName = EMPTY
  t_rClientElement = m_rWindow.getElement("reg.namelist")
  t_rImg = m_rComponentsPage.render()
  t_rClientElement.feedImage(t_rImg)
end
on dialogWindowEvent this, t_dialogName, t_dialogEvent
  if t_dialogName = "CheckName" then
    t_txt = m_rWindow.getElement("reg.username.input").getText()
    m_rWindow.getElement("reg.username.input").setText(t_txt)
  end if
  if t_dialogName = "ConfirmAvatarName" then
    if t_dialogEvent = #dialogOK then
      this._GatherData()
    end if
  end if
end
on _EventProc this, a_kEvent, a_sElem, a_vParam
  case 1 of
    a_sElem = "reg.boy":
      this._ChooseSex(0)
    a_sElem = "reg.girl":
      this._ChooseSex(1)
    a_sElem = "reg.morenames.button":
      this.GenerateNames()
    a_sElem = "reg.namelist":
      t_ar_event = [#found: 0, #event: EMPTY, #client: VOID, #route: [:]]
      m_rComponentsPage.EventProc(a_vParam, t_ar_event)
      if t_ar_event.found then
        this.GetActiveName(t_ar_event.event)
      end if
    a_sElem contains "color" and a_sElem contains "change":
      tTempDelim = the itemDelimiter
      the itemDelimiter = "."
      tPart = a_sElem.item[2]
      tButtonType = a_sElem.item[a_sElem.item.count]
      the itemDelimiter = tTempDelim
      this.ChangeColor(tPart, tButtonType)
      return 1
    a_sElem contains "change":
      tTempDelim = the itemDelimiter
      the itemDelimiter = "."
      tPart = a_sElem.item[2]
      tButtonType = a_sElem.item[a_sElem.item.count]
      the itemDelimiter = tTempDelim
      this.changePart(tPart, tButtonType)
      return 1
    a_sElem = "reg.next.button":
      this.ChangeRoomSelection(1)
    a_sElem = "reg.previous.button":
      this.ChangeRoomSelection(-1)

  end case
  if a_kEvent = #keyDown then
    case a_sElem of
      "reg.username.input":
        case the keyCode of
          123, 124, 125, 126:
            pass()
          117, 51:
            pass()
          36:
            return 1
          49:
            return 1
          otherwise:
            this.InactivateNameSelector()
            t_sValidKeys = " abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!?.-_" & QUOTE
            t_iAscii = charToNum(the key)
            t_bAllow = 0
            if t_sValidKeys contains the key or t_sValidKeys = EMPTY then
              t_bAllow = 1
            end if
            if not t_bAllow then
              t = createDialogWindow(this.getID(), "CharNotAllowed", 1, 1)
              t.show()
              t_sMsg = getText("reg.char.not.allowed")
              t.setText(t_sMsg, "Error", "OK")
              return 1
            end if
            t_txt = m_rWindow.getElement("reg.username.input").getText()
            t_iMaxlength = 18
            tElem = m_rWindow.getElement(a_sElem)
            if tElem <> 0 then
              if tElem.pMember.text.char.count >= t_iMaxlength then
                tElem.pMember.text = tElem.pMember.char[1..t_iMaxlength]
                t = createDialogWindow(this.getID(), "CheckNameLength", 1, 1)
                t.show()
                t_sMsg = getText("reg.name.toolong")
                t.setText(t_sMsg, "Error", "OK")
                return 1
              end if
            end if

        end case

    end case
  end if
end