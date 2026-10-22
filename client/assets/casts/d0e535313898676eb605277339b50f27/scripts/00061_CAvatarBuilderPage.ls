-- Script
property m_rWindow
property m_ar_MyAvatar
property m_ar_availableSets
property m_ar_BodyPartObjects
property m_ar_PropsToServer
property m_mp_AllSets
property m_ar_FigureColorList
property m_rSloganField
property m_bSloganOk
property m_sSlogan
property m_bCanWearHat
property m_CurrentHairCol
property m_CurrentSkinCol
property m_NoHat_Img
property m_rHumanImgBgClr
property m_rPreviewImgBgClr
property m_sMiniGameName

on construct this
  m_rWindow = VOID
  m_bDataGathered = 0
  m_ar_AvatarData = VOID
  m_rSloganField = VOID
  m_sSlogan = VOID
  m_bSloganOk = 0
  m_ar_PropsToServer = VOID
  m_CurrentHairCol = VOID
  m_CurrentSkinCol = VOID
  m_NoHat_Img = member(getmemnum("nohats.preview")).image
  m_rHumanImgBgClr = rgb(39, 86, 146)
  m_rPreviewImgBgClr = rgb(255, 255, 255)
  m_mp_AllSets = getVariable("AllAvailableSets", VOID)
  m_ar_FigureColorList = getVariableValue("ColorList")
  registerMessage(#MinigameState, this.getID(), #MinigameStateChange)
  return 1
end
on deconstruct this
  if objectp(m_rWindow) then
    this.Purge(m_rWindow)
  end if
  return 1
end
on MinigameStateChange me, a_sState, a_sGameName
  m_sMiniGameName = a_sGameName
end
on merge this, a_rWindow
  m_rWindow = a_rWindow
  if objectp(m_rWindow) then
    m_rWindow.merge("vmk_set_avatar.window")
    t_ar_elements = ["change.ht.-1", "part.ht.preview", "change.ht.1", "change.hr.-1", "part.hr.preview", "change.hr.1", "change.hd.-1", "part.hd.preview", "change.hd.1", "change.ch.-1", "part.ch.preview", "change.ch.1", "change.pn.-1", "part.pn.preview", "change.pn.1", "change.sh.-1", "part.sh.preview", "change.sh.1", "human.preview.img", "change.hr.color.-1", "part.color.hr.preview", "change.hr.color.1", "change.hd.color.-1", "part.color.hd.preview", "change.hd.color.1", "set.myslogan.hd", "set.myslogan", "set.imready.button", "set.nohats.info", "back2"]
    if objectp(m_rWindow) then
      repeat with i = 1 to t_ar_elements.count
        t_sElemName = t_ar_elements[i]
        if m_rWindow.elementExists(t_sElemName) then
          m_rWindow.getElement(t_sElemName).setProperty(#visible, 0)
        end if
      end repeat
    end if
    t_sWndName = m_rWindow.getProperty(#title)
    m_rWindow.getElement("set.nohats.info").setProperty(#visible, 0)
    m_rSloganField = CreateCannedField(t_sWndName, "set.myslogan")
    if m_rWindow.elementExists("loadingscreen") then
      t_Img = m_rWindow.getElement("loadingscreen").getProperty(#image)
      t_Img.fill(t_Img.rect, rgb(39, 86, 146))
    end if
    m_rSloganField.setAllowFreeWords(0)
    m_rSloganField.setAllowFriendNames(0)
    return 1
  end if
end
on Purge this, a_rWindow
  if objectp(m_rWindow) then
    m_rWindow = VOID
    m_rSloganField = VOID
    return a_rWindow.unmerge()
  else
    return 1
  end if
end
on update this, a_mp_kType_mp_iRef_rItem, a_kAlteredCategory
  case a_kAlteredCategory of
    "MyAvatar":
      m_ar_MyAvatar = a_mp_kType_mp_iRef_rItem[a_kAlteredCategory]
      m_ar_PropsToServer = m_ar_MyAvatar
      this.CreateFigure()
      this.ShowHideClothesChoosers()
    "AvailableSets":
      m_ar_availableSets = a_mp_kType_mp_iRef_rItem[a_kAlteredCategory]
      this.ShowHideClothesChoosers()
      this.updateFigurePreview()
      this.updateAllPrewIcons()
    "SloganChanged":
      this.SloganChanged()
    "avatar", #avatar, "Avatar":
      if not voidp(a_mp_kType_mp_iRef_rItem) then
        if a_mp_kType_mp_iRef_rItem.findPos("MyAvatar") > 0 then
          m_ar_MyAvatar = a_mp_kType_mp_iRef_rItem["MyAvatar"]
          m_ar_PropsToServer = m_ar_MyAvatar
          this.CreateFigure()
        end if
        if a_mp_kType_mp_iRef_rItem.findPos("AvailableSets") > 0 then
          m_ar_availableSets = a_mp_kType_mp_iRef_rItem["AvailableSets"]
        end if
        this.ShowHideClothesChoosers()
      end if

  end case
end
on CreateFigure this
  if objectp(m_rWindow) then
    m_sSlogan = getObject(#session).get("Slogan")
    t_rElem = m_rWindow.getElement("set.myslogan")
    if objectp(t_rElem) then
      t_rElem.setText(m_sSlogan)
    end if
    tProps = this.getFigureData()
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
  end if
end
on changePart this, a_iPartName, a_iDirection
  if listp(m_ar_availableSets) then
    if m_ar_availableSets.findPos(a_iPartName) = VOID then
      return 0
    end if
    t_iCurrentSet = m_ar_MyAvatar[a_iPartName]["SetID"]
    if not voidp(t_iCurrentSet) then
      t_arSetList = m_ar_availableSets[a_iPartName]
      t_iMyPos = t_arSetList.findPos(t_iCurrentSet)
      t_iSetCount = t_arSetList.count
      t_iNewPos = integer(t_iMyPos + a_iDirection)
      case 1 of
        t_iNewPos <= 0:
          t_iNewPos = t_iSetCount
        t_iNewPos > t_iSetCount:
          t_iNewPos = 1

      end case
    end if
    t_mpMySet = t_arSetList[t_iNewPos]
    t_iSetID = t_arSetList.getPropAt(t_iNewPos)
    m_ar_MyAvatar[a_iPartName]["SetID"] = t_iSetID
    m_ar_MyAvatar[a_iPartName]["Figure"] = t_mpMySet[1]
    m_ar_MyAvatar[a_iPartName]["Color"] = t_mpMySet[2][1]
    if a_iPartName = "hr" then
      if m_CurrentHairCol <> VOID then
        if t_mpMySet[2].findPos(m_CurrentHairCol) then
          m_ar_MyAvatar[a_iPartName]["Color"] = m_CurrentHairCol
        end if
      end if
    end if
    if a_iPartName = "hd" then
      if m_CurrentSkinCol <> VOID then
        if t_mpMySet[2].findPos(m_CurrentSkinCol) then
          m_ar_MyAvatar[a_iPartName]["Color"] = m_CurrentSkinCol
        end if
      end if
    end if
    if a_iPartName = "hr" then
      m_bCanWearHat = getThread(#AvatarFactory).component.GetHatList(t_iSetID)
      if m_bCanWearHat then
        if objectp(m_rWindow) then
          m_rWindow.getElement("part.ht.preview").setProperty(#blend, 100)
          m_rWindow.getElement("change.ht.1").setProperty(#blend, 100)
          m_rWindow.getElement("change.ht.-1").setProperty(#blend, 100)
          m_rWindow.getElement("set.nohats.info").setProperty(#blend, 0)
        end if
      else
        if objectp(m_rWindow) then
          m_rWindow.getElement("part.ht.preview").setProperty(#blend, 30)
          m_rWindow.getElement("change.ht.1").setProperty(#blend, 30)
          m_rWindow.getElement("change.ht.-1").setProperty(#blend, 30)
          m_rWindow.getElement("set.nohats.info").setProperty(#blend, 100)
        end if
        tTempPartObj = m_ar_BodyPartObjects["ht"]
        tTempPartObj.Define("ht", 0, 0, 4, "std", this)
        if objectp(m_rWindow) then
          if not voidp(m_NoHat_Img) then
            t_Img = m_NoHat_Img.duplicate()
            m_rWindow.getElement("part.ht.preview").feedImage(t_Img)
          end if
        end if
        if not voidp(m_ar_PropsToServer) then
          m_ar_PropsToServer["ht"]["SetID"] = -1
          m_ar_PropsToServer["ht"]["Color"] = -1
          m_ar_PropsToServer["ht"]["Figure"] = ["ht": -1]
        end if
      end if
    end if
    this.ShowHideColorChoosers(a_iPartName, t_mpMySet)
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
  end if
end
on ShowHideColorChoosers this, a_sPart, a_mpMySet
  if objectp(m_rWindow) then
    t_sElemName = "change." & a_sPart & ".color."
    if a_mpMySet[2].count = 1 then
      if m_rWindow.elementExists(t_sElemName & 1) then
        m_rWindow.getElement(t_sElemName & 1).setProperty(#visible, 0)
      end if
      if m_rWindow.elementExists(t_sElemName & -1) then
        m_rWindow.getElement(t_sElemName & -1).setProperty(#visible, 0)
      end if
    else
      if m_rWindow.elementExists(t_sElemName & 1) then
        m_rWindow.getElement(t_sElemName & 1).setProperty(#visible, 1)
      end if
      if m_rWindow.elementExists(t_sElemName & -1) then
        m_rWindow.getElement(t_sElemName & -1).setProperty(#visible, 1)
      end if
    end if
  end if
end
on ShowHideClothesChoosers this
  if objectp(m_rWindow) then
    t_mp_Sets = getVariableValue("SetContents")
    if listp(m_ar_availableSets) then
      repeat with i = 1 to m_ar_availableSets.count
        t_sID = m_ar_availableSets.getPropAt(i)
        t_sElemName = "change." & t_sID & "."
        if m_ar_availableSets[i].count < 2 then
          if m_rWindow.elementExists(t_sElemName & 1) then
            m_rWindow.getElement(t_sElemName & 1).setProperty(#visible, 0)
          end if
          if m_rWindow.elementExists(t_sElemName & -1) then
            m_rWindow.getElement(t_sElemName & -1).setProperty(#visible, 0)
          end if
          next repeat
        end if
        if m_rWindow.elementExists(t_sElemName & 1) then
          m_rWindow.getElement(t_sElemName & 1).setProperty(#visible, 1)
        end if
        if m_rWindow.elementExists(t_sElemName & -1) then
          m_rWindow.getElement(t_sElemName & -1).setProperty(#visible, 1)
        end if
      end repeat
      if m_ar_availableSets.findPos("ht") = VOID then
        t_sElmName = "change.ht."
        if m_rWindow.elementExists(t_sElmName & 1) then
          m_rWindow.getElement(t_sElmName & 1).setProperty(#visible, 0)
        end if
        if m_rWindow.elementExists(t_sElmName & -1) then
          m_rWindow.getElement(t_sElmName & -1).setProperty(#visible, 0)
        end if
      end if
    end if
  end if
end
on getPartImg this, tPartList, t_Img
  if tPartList.ilk <> #list then
    tPartList = [tPartList]
  end if
  if m_sMiniGameName = "vmks" then
    t_iDir = 4
  else
    t_iDir = 3
  end if
  repeat with tPart in tPartList
    call(#copyPicture, [m_ar_BodyPartObjects[tPart]], t_Img, t_iDir, "std")
  end repeat
end
on getPartAlpha this, tPartList, tImg
  if tPartList.ilk <> #list then
    tPartList = [tPartList]
  end if
  if m_sMiniGameName = "vmks" then
    t_iDir = 4
  else
    t_iDir = 3
  end if
  repeat with tPart in tPartList
    call(#copyAlpha, [m_ar_BodyPartObjects[tPart]], tImg, t_iDir, "std")
  end repeat
end
on setPartModel this, tPart, tmodel
  if not voidp(m_ar_BodyPartObjects) then
    call(#setModel, m_ar_BodyPartObjects[tPart], tmodel)
  end if
end
on ChangeColor this, a_iPartName, a_iDirection
  t_iCurrentSet = m_ar_MyAvatar[a_iPartName]["SetID"]
  t_iCurrentCol = m_ar_MyAvatar[a_iPartName]["Color"]
  if not voidp(t_iCurrentSet) then
    t_mpMySet = m_ar_availableSets[a_iPartName][string(t_iCurrentSet)]
    t_arColorList = t_mpMySet[2]
    t_iMyPos = t_arColorList.findPos(t_iCurrentCol)
    t_iSetCount = t_arColorList.count
    t_iNewPos = t_iMyPos + a_iDirection
    case 1 of
      t_iNewPos <= 0:
        t_iNewPos = t_iSetCount
      t_iNewPos > t_iSetCount:
        t_iNewPos = 1

    end case
  end if
  t_iNewColor = t_arColorList[t_iNewPos]
  repeat with i = 1 to t_mpMySet[1].count
    this.setPartColor(t_mpMySet[1].getPropAt(i), t_iNewColor)
  end repeat
  m_ar_MyAvatar[a_iPartName]["Color"] = t_iNewColor
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
on updatePartColorPreview this, tPart, a_sColor
  if objectp(m_rWindow) then
    if a_sColor <> 0 and a_sColor <> -1 then
      tColor = rgb(a_sColor)
    else
      tColor = rgb(255, 255, 255)
    end if
    tElemID = "part.color." & tPart & ".preview"
    if voidp(tColor) then
      tColor = rgb(255, 255, 255)
    end if
    if m_rWindow.elementExists(tElemID) then
      m_rWindow.getElement(tElemID).getProperty(#sprite).bgColor = tColor
    end if
  end if
end
on updatePartPreview this, tPart, a_mp_ChangingPartList
  if objectp(m_rWindow) then
    tElemID = "part." & tPart & ".preview"
    tElem = m_rWindow.getElement(tElemID)
    if not voidp(m_ar_BodyPartObjects) and tElem <> 0 then
      tTempPartImg = image(200, 200, 32)
      t_mp_ChangingParts = []
      repeat with i = 1 to a_mp_ChangingPartList.count
        t_mp_ChangingParts.add(a_mp_ChangingPartList.getPropAt(i))
        this.setPartModel(a_mp_ChangingPartList.getPropAt(i), a_mp_ChangingPartList[i])
      end repeat
      this.getPartImg(t_mp_ChangingParts, tTempPartImg)
      tTempPartImg = tTempPartImg.trimWhiteSpace()
      tElem.feedImage(tTempPartImg)
    end if
  end if
end
on updateAllPrewIcons this
  if objectp(m_rWindow) then
    if m_rWindow.elementExists("set.myslogan") then
      m_rWindow.getElement("set.myslogan").setFocus(1)
    end if
    t_mpList = ["hr", "hd", "ch", "pn", "sh", "ht"]
    repeat with tPart in t_mpList
      t_mp_FigureData = this.getFigureData()[tPart]
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
              this.setWindowElementProperty("part.ht.preview", #blend, 100)
              this.setWindowElementProperty("change.ht.1", #blend, 100)
              this.setWindowElementProperty("change.ht.-1", #blend, 100)
              this.setWindowElementProperty("set.nohats.info", #blend, 0)
            else
              this.setWindowElementProperty("part.ht.preview", #blend, 30)
              this.setWindowElementProperty("change.ht.1", #blend, 30)
              this.setWindowElementProperty("change.ht.-1", #blend, 30)
              this.setWindowElementProperty("set.nohats.info", #blend, 100)
            end if
          end if
        otherwise:
          if not voidp(t_mp_FigureData["Figure"]) then
            this.updatePartPreview(tPart, t_mp_FigureData["Figure"])
          end if

      end case
    end repeat
  end if
end
on setWindowElementProperty this, a_sElem, a_kProperty, a_kValue
  if objectp(m_rWindow) then
    t_rElem = m_rWindow.getElement(a_sElem)
    if objectp(t_rElem) then
      t_rElem.setProperty(a_kProperty, a_kValue)
    end if
  end if
end
on updateFigurePreview this
  if objectp(m_rWindow) then
    if not voidp(m_ar_BodyPartObjects) then
      if m_rWindow.elementExists("human.preview.img") then
        t_HumanImg = image(100, 300, 32)
        t_ImgAlpha = image(100, 300, 8, #grayscale)
        t_HumanImg.fill(t_HumanImg.rect, m_rHumanImgBgClr)
        if m_ar_PropsToServer["ht"]["SetID"] = -1 then
          t_mpList = ["tr", "llg", "lsh", "lpn", "rlg", "rsh", "rpn", "lh", "ls", "ch", "ch2", "rh", "rs", "hd", "fc", "ey", "hr"]
        else
          t_mpList = ["tr", "llg", "lsh", "lpn", "rlg", "rsh", "rpn", "lh", "ls", "ch", "ch2", "rh", "rs", "hd", "fc", "ey", "hr", "ht"]
        end if
        this.getPartImg(t_mpList, t_HumanImg)
        this.getPartAlpha(t_mpList, t_ImgAlpha)
        t_HumanImg.setAlpha(t_ImgAlpha)
        tWidth = t_HumanImg.width
        tHeight = t_HumanImg.height
        t_PrewImg = image(tWidth, tHeight, 32)
        tdestrect = t_PrewImg.rect - t_HumanImg.rect * 2
        if m_sMiniGameName = "vmks" then
          tMargins = rect(0, -33, 0, -33)
        else
          tMargins = rect(0, -15, 0, -15)
        end if
        tdestrect = rect(0, tdestrect.bottom, t_HumanImg.width * 2, t_PrewImg.rect.bottom) + tMargins
        t_PrewImg.copyPixels(t_HumanImg, tdestrect, t_HumanImg.rect)
        m_rWindow.getElement("human.preview.img").feedImage(t_PrewImg)
      end if
    end if
  end if
end
on flipImage this, tImg_a
  tImg_b = image(tImg_a.width, tImg_a.height, 32)
  tQuad = [point(tImg_a.width, 0), point(0, 0), point(0, tImg_a.height), point(tImg_a.width, tImg_a.height)]
  tImg_b.copyPixels(tImg_a, tQuad, tImg_a.rect)
  return tImg_b
end
on getFigureData this, a_sData, a_sSetName
  if voidp(a_sData) then
    return m_ar_PropsToServer
  end if
  case a_sData of
    "SetID":
      if voidp(a_sSetName) then
        return error(this, "Set name missing!", #getFigureData)
      end if
      return m_ar_PropsToServer[a_sSetName]["SetID"]
    "Color":
      if voidp(a_sSetName) then
        return error(this, "Set name missing!", #getFigureData)
      end if
      return m_ar_PropsToServer[a_sSetName]["Color"]
    "Figure":
      if voidp(a_sSetName) then
        return error(this, "Set name missing!", #getFigureData)
      end if
      return m_ar_PropsToServer[a_sSetName]["Figure"]

  end case
end
on parseToServerFormat this
  t_mp_dataToServer = [:]
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
    t_mp_dataToServer.addProp(#integer, value(m_ar_PropsToServer[i]["SetID"]))
    if m_ar_PropsToServer[i]["SetID"] = -1 then
      t_mp_dataToServer.addProp(#integer, -1)
      next repeat
    end if
    t_mp_dataToServer.addProp(#integer, value(t_iLocinColorList))
  end repeat
  if t_mp_dataToServer.count > 0 then
    getConnection(getVariable("main.connection.id", "VMK")).send("CHANGEFIGURE", t_mp_dataToServer)
  end if
end
on SetUpMySlogan this
  if objectp(m_rWindow) then
    t_sSlogan = m_rWindow.getElement("set.myslogan").getText()
    m_rSloganField.setAllowEmpty(1)
    if t_sSlogan <> m_sSlogan then
      if m_rSloganField.CheckContent() then
        t_sTxt = m_rSloganField.GetContent()
        if stringp(t_sTxt) then
          t_sTxt = ParseCannedText(t_sTxt)
        end if
        t_mp_MsgToServer = [:]
        tCannedBlock = TransformCannedToMsg(t_sTxt)
        repeat with i = 1 to tCannedBlock.count
          tKey = tCannedBlock.getPropAt(i)
          tvalue = tCannedBlock[i]
          t_mp_MsgToServer.addProp(tKey, tvalue)
        end repeat
        getConnection(getVariable("main.connection.id", "VMK")).send("ChangeSlogan", t_mp_MsgToServer)
        executeMessage("close_AvatarBuilder")
      else
        t_sMsg = getText("set.check.slogan")
        t = createDialogWindow(this.getID(), "CheckSlogan", 1, 1)
        t.show()
        t.setText(t_sMsg, "Error", "OK")
      end if
    else
      executeMessage("close_AvatarBuilder")
    end if
  end if
end
on SloganChanged this
  t_sMsg = getText("set.slogan.changed")
  t = createDialogWindow(this.getID(), "SloganChanged", 1, 0)
  t.show()
  t.setText(t_sMsg, "Slogan changed", "OK")
end
on dialogWindowEvent this, a_sDialogName, a_sDialogEvent
  case a_sDialogName of
    "SloganChanged":
      executeMessage("close_AvatarBuilder")
      removeDialogWindow("SloganChanged")
    "CheckSlogan":
      m_rSloganField.CheckWord()
      removeDialogWindow("CheckSlogan")

  end case
end
on _EventProc this, a_kEvent, a_sElem, a_vParam
  if a_kEvent = #mouseUp then
    case 1 of
      a_sElem = "set.imready.button":
        m_rSloganField.updateContent()
        this.parseToServerFormat()
        this.SetUpMySlogan()
        return 1
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

    end case
  end if
  if a_kEvent = #keyDown then
    if a_sElem = "set.myslogan" then
      case the keyCode of
        123, 124, 125, 126:
          m_rSloganField.updateContent()
          pass()
        117, 51:
          m_rSloganField.updateContent()
          pass()
        36:
          t_pass = m_rSloganField.CheckContent()
          if t_pass then
            m_bSloganOk = 1
            return 1
          end if
        49:
          tElem = m_rWindow.getElement(a_sElem)
          tSelection = tElem.pMember.selection
          tCharcount = tElem.pMember.text.char.count
          if tCharcount > 0 then
            if tElem.pMember.text.char[tSelection[2]] = " " then
              return 1
            end if
            if tSelection[2] + 1 <= tCharcount then
              if tElem.pMember.text.char[tSelection[2] + 1] = " " then
                tSelection[1] = tSelection[1] + 1
                tSelection[2] = tSelection[2] + 1
                tElem.pMember.selection = tSelection
                return 1
              end if
            end if
          end if
          t_pass = m_rSloganField.CheckContent()
          if t_pass then
            m_rSloganField.updateContent()
          end if
        otherwise:
          if not m_rSloganField.updateContent() then
            return 1
          end if
          tValidKeys = "abcdefghijlkmnopqrstuvwxyz0123456789_-=+?!@<>:.,'*/()[]\#;" & QUOTE
          tAscii = charToNum(the key)
          t_allow = 0
          if tAscii > 31 and tAscii < 128 then
            if tValidKeys contains the key or tValidKeys = EMPTY then
              t_allow = 1
            end if
          end if
          if not t_allow then
            return 1
          end if

      end case
      t_iMaxlength = 80
      tElem = m_rWindow.getElement(a_sElem)
      if tElem <> 0 then
        if tElem.pMember.text.char.count >= t_iMaxlength then
          tElem.pMember.text = tElem.pMember.char[1..t_iMaxlength]
          t = createDialogWindow(this.getID(), "CheckSloganLength", 1, 1)
          t.show()
          t_sMsg = getText("reg.slogan.toolong")
          t.setText(t_sMsg, "Error", "OK")
          return 1
        end if
      end if
    end if
  else
    if a_kEvent = #keyUp then
      if a_sElem = "set.myslogan" then
        if m_rSloganField <> 0 then
          case the keyCode of
            36, 49:
            otherwise:
              m_rSloganField.CheckWord()

          end case
        end if
      end if
    end if
  end if
end