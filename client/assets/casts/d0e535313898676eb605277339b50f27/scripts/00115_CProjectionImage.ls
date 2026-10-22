-- Script
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
property m_mp_FigureData
property m_ar_FigureSetNumbers
property m_sSex
property m_ar_rSetContents

on construct this
  m_ar_BodyPartObjects = VOID
  m_ar_AvatarData = VOID
  m_mp_AllSets = getVariable("AllAvailableSets", VOID)
  m_ar_FigureColorList = getVariableValue("ColorList", VOID)
  m_ar_FigureSetNumbers = getVariableValue("SetNumbers")
  m_ar_rSetContents = getVariableValue("SetContents")
  m_sSex = "M"
  return 1
end
on deconstruct this
  return 1
end
on ParseFigure this, a_arAvatarData
  t_ar_SetList = a_arAvatarData
  if t_ar_SetList.count > 0 then
    t_mp_MyFigure = [:]
    repeat with i = 1 to t_ar_SetList.count
      if i mod 2 then
        t_s_PartNum = string(t_ar_SetList[i])
        if t_ar_SetList[i] <> -1 then
          t_ar_PartData = this.getFigureSets(t_s_PartNum)
          t_s_PartName = t_ar_PartData[1]
          t_mp_partMems = m_mp_AllSets[t_s_PartName][t_s_PartNum][1]
          t_mp_MyFigure[t_s_PartName] = [:]
          t_mp_MyFigure[t_s_PartName]["SetID"] = t_s_PartNum
          t_mp_MyFigure[t_s_PartName]["Figure"] = t_mp_partMems
        else
          t_mp_MyFigure["ht"] = [:]
          t_mp_MyFigure["ht"]["SetID"] = t_s_PartNum
          t_mp_MyFigure["ht"]["Figure"] = ["ht": -1]
        end if
        next repeat
      end if
      if t_ar_SetList[i] <> -1 then
        t_mp_MyFigure[t_s_PartName]["Color"] = m_ar_FigureColorList[string(t_ar_SetList[i])]
        next repeat
      end if
      t_mp_MyFigure["ht"]["Color"] = "EEEEEE"
    end repeat
    m_mp_FigureData = t_mp_MyFigure
    return this.CreateFigure()
  else
    return error(this, "Wrong kind of figure data: " && t_ar_SetList, #ParseMyFigure)
  end if
end
on CreateFigure this
  tProps = m_mp_FigureData
  m_mp_FlipList = [0, 1, 2, 3, 4, 3, 2, 1]
  if voidp(m_ar_BodyPartObjects) then
    m_ar_BodyPartObjects = [:]
  end if
  t_mpPartIndex = ["tr": [:], "lh": [:], "ls": [:], "ch": [:], "ch2": [:], "rh": [:], "rs": [:], "hd": [:], "fc": [:], "ey": [:], "hr": [:], "ht": [:]]
  repeat with i = 1 to tProps.count
    tDirection = 4
    tAction = "std"
    repeat with e = 1 to tProps[i]["Figure"].count
      t_sPart = tProps[i]["Figure"].getPropAt(e)
      if t_mpPartIndex.findPos(t_sPart) > 0 then
        t_mpPartIndex[t_sPart].addProp(#figure, tProps[i]["Figure"][e])
        t_mpPartIndex[t_sPart].addProp(#color, tProps[i]["Color"])
      end if
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
    t_iPos = m_ar_BodyPartObjects.findPos(tPart)
    if voidp(t_iPos) then
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
      next repeat
    end if
    tTempPartObj = m_ar_BodyPartObjects[t_iPos]
    tTempPartObj.Define(tPart, tmodel, tColor, tDirection, tAction, this)
  end repeat
  return this.DrawProjection()
end
on getFigureSets me, a_iPartNum
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
      t_sSetContents = m_ar_rSetContents[t_SetName]
      t_mp_list = []
      t_mp_list.add(t_SetName)
      t_mp_list.add(t_sSetContents)
      t_mp_list.add(t_sSex)
      return t_mp_list
    else
      return error(me, "No such figure set available: " && a_iPartNum, #getFigureSets)
    end if
  end if
end
on DrawProjection this
  if not voidp(m_ar_BodyPartObjects) then
    t_HumanImg = image(200, 300, 32)
    t_ImgAlpha = image(200, 300, 8, #grayscale)
    t_HumanImg.fill(t_HumanImg.rect, rgb(255, 250, 123))
    t_mpList = ["tr", "lh", "ls", "ch", "ch2", "rh", "rs", "hd", "fc", "ey", "hr", "ht"]
    this.getPartImg(t_mpList, t_HumanImg)
    this.getPartAlpha(t_mpList, t_ImgAlpha)
    t_HumanImg.setAlpha(t_ImgAlpha)
    tWidth = 90
    tHeight = 100
    t_PrewImg = image(tWidth, tHeight, 32)
    tdestrect = t_PrewImg.rect - t_HumanImg.rect * 2
    tMargins = rect(0, -50, 0, 10)
    tdestrect = rect(0, tdestrect.bottom + 210, t_HumanImg.width * 2, t_PrewImg.rect.bottom + 100)
    t_PrewImg.copyPixels(t_HumanImg, tdestrect, t_HumanImg.rect)
    return t_PrewImg
  end if
end
on getPartImg this, tPartList, t_Img
  if tPartList.ilk <> #list then
    tPartList = [tPartList]
  end if
  repeat with tPart in tPartList
    call(#copyPicture, [m_ar_BodyPartObjects[tPart]], t_Img, 4, "std")
  end repeat
end
on getPartAlpha this, tPartList, tImg
  if tPartList.ilk <> #list then
    tPartList = [tPartList]
  end if
  repeat with tPart in tPartList
    call(#copyAlpha, [m_ar_BodyPartObjects[tPart]], tImg, 4, "std")
  end repeat
end