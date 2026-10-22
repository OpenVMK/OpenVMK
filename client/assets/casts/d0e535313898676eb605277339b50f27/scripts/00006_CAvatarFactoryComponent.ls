-- Script
property m_ar_PropsToServer
property m_ar_FigureColorList
property m_ar_FigureSetNumbers
property m_ar_rSetContents
property m_sSex
property m_sName
property m_sSlogan
property m_ar_availableSets
property m_mp_AllSets
property m_ar_MyAvatar
property m_mp_AvatarBuilderData
property m_ar_HatList
property m_mp_AvatarInstances
property m_mp_ClothesPreviewImages
property m_iRenderTimer
property m_bClothesRendered
property m_bMinigameRunning
property m_sMiniGameRunning
property m_mp_AvatarImageResource
property m_objFigureSetLoader
property m_rClothAssetManager
property m_objAnimator
property m_bAvatarImageClothesReady

on construct this
  m_ar_PropsToServer = [:]
  m_ar_availableSets = [:]
  m_mp_AllSets = []
  m_mp_AvatarInstances = [:]
  m_ar_MyAvatar = VOID
  m_ar_HatList = VOID
  m_objFigureSetLoader = VOID
  m_mp_AvatarBuilderData = [:]
  m_mp_ClothesPreviewImages = VOID
  m_iRenderTimer = 0
  m_bClothesRendered = 0
  m_mp_AvatarImageResource = [:]
  m_objAnimator = createObject("AvatarAnimation", "CAvatarAnimator")
  createObject("ClothesPreviewRenderer", "CClothesThumbHandler")
  m_ar_rSetContents = ["hr": ["hr"], "hd": ["tr", "ey", "fc", "hd", "lh", "rh", "llg", "rlg"], "ch": ["ch", "ch2", "ls", "rs"], "pn": ["lpn", "rpn"], "sh": ["lsh", "rsh"], "ht": ["ht"]]
  setVariable("SetContents", m_ar_rSetContents)
  registerMessage("CreateAvatar", this.getID(), #CreateAvatar)
  registerMessage("RandomAvatar", this.getID(), #createRandomAvat)
  registerMessage("CatalogAvatar", this.getID(), #createCatPreview)
  registerMessage("GetAvatarImage", this.getID(), #GetAvatarImage)
  registerMessage(#Initialize, this.getID(), #AllCastsDone)
  registerMessage(#MinigameState, this.getID(), #MinigameStateChange)
  registerMessage("AddAvatarPieceImage", this.getID(), #AddAvatarImagePiece)
  m_sSex = "M"
  m_ObjList = []
  return 1
end
on deconstruct this
  removeObject("AvatarClothAssetManager")
  m_rClothAssetManager = VOID
  unregisterMessage("CreateAvatar")
  unregisterMessage("RandomAvatar")
  unregisterMessage("CatalogAvatar")
  unregisterMessage("GetAvatarImage")
  unregisterMessage(#Initialize, this.getID())
  unregisterMessage(#MinigameState, this.getID())
  if objectp(m_objAnimator) then
    removeObject(m_objAnimator.getID())
  end if
  if objectp("ClothesPreviewRenderer") then
    removeObject("ClothesPreviewRenderer")
  end if
  return 1
end
on CreatetClothAssetManager this
  if objectExists("AvatarClothAssetManager") then
    m_rClothAssetManager = getObject("AvatarClothAssetManager")
  else
    m_rClothAssetManager = createObject("AvatarClothAssetManager", "CAvatarClothAssetManager")
  end if
  if variableExists("body_part_cast") then
    t_sBodyPartCastName = getVariable("body_part_cast")
    if castExists(t_sBodyPartCastName) then
      m_rClothAssetManager.AddCastContentsToImageCache(castLib(t_sBodyPartCastName))
    end if
  else
    put "body_part_cast not configured!!"
  end if
  if variableExists("magic_clothes_cast") then
    t_sMagicClothesCastName = getVariable("magic_clothes_cast")
    if castExists(t_sMagicClothesCastName) then
      m_rClothAssetManager.AddCastContentsToImageCache(castLib(t_sMagicClothesCastName))
    end if
  else
    put "magic_clothes_cast not configured!!"
  end if
end
on GetClothAssetManager this
  return m_rClothAssetManager
end
on AllCastsDone this
  m_objFigureSetLoader = createObject("figsetLoader", "CAvatarFigureSetLoader")
  createTimeout("AvatarSetTimer", 600, #DumpSetlists, this.getID(), VOID, 0)
end
on DumpSetlists this
  if objectp(m_objFigureSetLoader) then
    t_bISready = m_objFigureSetLoader.IsReady()
    if t_bISready then
      t = the milliSeconds
      if timeoutExists("AvatarSetTimer") then
        removeTimeout("AvatarSetTimer")
      end if
      m_ar_FigureColorList = getVariableValue("ColorList")
      m_ar_FigureSetNumbers = getVariableValue("SetNumbers")
      this.parseAllFigureData()
      t = the milliSeconds - t
      put "Avatar data parsed:" && t
    end if
  end if
end
on getAvailableSets this
  getConnection(getVariable("main.connection.id", "VMK")).send("GETFIGURELIST")
end
on getSetsNewAvatar this
  getConnection(getVariable("main.connection.id", "VMK")).send("GETAVATARSETS")
end
on parseAllFigureData me
  t_ar_FigureParts = getVariableValue("SetList")
  if listp(t_ar_FigureParts) then
    t_ar_FigureParts.addProp("45100", [[90, 0, 0, 0], [1]])
    t_ar_FigureParts.addProp("45101", [[92, 0, 0, 0], [1]])
    t_ar_FigureParts.addProp("47100", [[90, 90], [1]])
    t_ar_FigureParts.addProp("48100", [[0, 0], [1]])
  end if
  t_ar_FigureParts2 = [:]
  m_mp_ClothesPreviewImages = [:]
  if listp(t_ar_FigureParts) then
    repeat with i = 1 to t_ar_FigureParts.count
      t_iSetNum = t_ar_FigureParts.getPropAt(i)
      case 1 of
        t_iSetNum = -1:
          t_sSetName = "ht"
          t_mp_SetMems = ["ht"]
        t_iSetNum >= 20000 and t_iSetNum < 21000, t_iSetNum >= 30000 and t_iSetNum < 31000, t_iSetNum >= 40000 and t_iSetNum < 41000:
          t_sSetName = "hr"
          t_mp_SetMems = ["hr"]
        t_iSetNum >= 21000 and t_iSetNum < 22000, t_iSetNum >= 31000 and t_iSetNum < 32000, t_iSetNum >= 41000 and t_iSetNum < 42000:
          t_sSetName = "ht"
          t_mp_SetMems = ["ht"]
        t_iSetNum >= 22000 and t_iSetNum < 24000, t_iSetNum >= 32000 and t_iSetNum < 34000, t_iSetNum >= 42000 and t_iSetNum < 44000:
          t_sSetName = "hd"
          t_mp_SetMems = ["tr", "ey", "fc", "hd", "lh", "rh", "llg", "rlg"]
        t_iSetNum >= 24000 and t_iSetNum < 26000, t_iSetNum >= 34000 and t_iSetNum < 36000, t_iSetNum >= 44000 and t_iSetNum < 46000:
          t_sSetName = "ch"
          t_mp_SetMems = ["ch", "ch2", "ls", "rs"]
        t_iSetNum >= 26000 and t_iSetNum < 28000, t_iSetNum >= 36000 and t_iSetNum < 38000, t_iSetNum >= 46000 and t_iSetNum < 48000:
          t_sSetName = "pn"
          t_mp_SetMems = ["lpn", "rpn"]
        t_iSetNum >= 28000 and t_iSetNum < 30000, t_iSetNum >= 38000 and t_iSetNum < 40000, t_iSetNum >= 48000:
          t_sSetName = "sh"
          t_mp_SetMems = ["lsh", "rsh"]

      end case
      t_mp_setMembers = [:]
      t_ar_FigurePartIds = t_ar_FigureParts[i][1]
      repeat with e = 1 to t_mp_SetMems.count
        if t_mp_SetMems.count = t_ar_FigurePartIds.count then
          t_mp_setMembers.addProp(t_mp_SetMems[e], t_ar_FigurePartIds[e])
          next repeat
        end if
        return error(me, "Wrong amount of members is set No: " && t_iSetNum, #parseAllFigureData)
      end repeat
      t_ar_ColorList = []
      t_ar_SetColors = value(t_ar_FigureParts[i][2])
      repeat with f = 1 to t_ar_SetColors.count
        t_iColorNum = t_ar_SetColors[f]
        if t_iColorNum = 0 then
          t_mp_ColorList = [0]
          next repeat
        end if
        if voidp(m_ar_FigureColorList.findPos(string(t_iColorNum))) then
          return error(me, "Nosuch ID in colour list: " && t_iColorNum, #parseAllFigureData)
        end if
        t_sColor = m_ar_FigureColorList[string(t_iColorNum)]
        t_ar_ColorList.add(t_sColor)
      end repeat
      if t_ar_FigureParts2.findPos(t_sSetName) = 0 then
        t_ar_FigureParts2.addProp(t_sSetName, [:])
        t_ar_FigureParts2[t_sSetName].addProp(t_iSetNum, [t_mp_setMembers])
        t_ar_FigureParts2[t_sSetName][t_iSetNum].add(t_ar_ColorList)
        next repeat
      end if
      t_ar_FigureParts2[t_sSetName].addProp(t_iSetNum, [t_mp_setMembers])
      t_ar_FigureParts2[t_sSetName][t_iSetNum].add(t_ar_ColorList)
    end repeat
    if t_ar_FigureParts2.findPos("ht") then
      t_ar_FigureParts2["ht"].addProp(-1, [["ht": -1], [-1]])
    end if
    m_mp_AllSets = t_ar_FigureParts2.duplicate()
    createVariable("AllAvailableSets", m_mp_AllSets)
  else
    return error(me, "Figure list corrupted!!", #parseAllFigureData)
  end if
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
on SetHatList me, a_ar_HatList
  m_ar_HatList = a_ar_HatList
end
on GetHatList me, a_iHairID
  if stringp(a_iHairID) then
    a_iHairID = value(a_iHairID)
  end if
  if not voidp(m_ar_HatList) then
    if m_ar_HatList.findPos(a_iHairID) = VOID then
      return 1
    else
      return 0
    end if
  else
    return 0
  end if
end
on parseAvailableSets me, ar_data
  if listp(ar_data) then
    t_ar_availableSets1 = ar_data
    t_ar_availableSets1.add("-1")
    t_ar_availableSets = [:]
    repeat with i = 1 to t_ar_availableSets1.count
      t_iSetNum = string(t_ar_availableSets1[i])
      case 1 of
        t_iSetNum = -1:
          t_sSetName = "ht"
        t_iSetNum >= 20000 and t_iSetNum < 21000, t_iSetNum >= 30000 and t_iSetNum < 31000, t_iSetNum >= 40000 and t_iSetNum < 41000:
          t_sSetName = "hr"
        t_iSetNum >= 21000 and t_iSetNum < 22000, t_iSetNum >= 31000 and t_iSetNum < 32000, t_iSetNum >= 41000 and t_iSetNum < 42000:
          t_sSetName = "ht"
        t_iSetNum >= 22000 and t_iSetNum < 24000, t_iSetNum >= 32000 and t_iSetNum < 34000, t_iSetNum >= 42000 and t_iSetNum < 44000:
          t_sSetName = "hd"
        t_iSetNum >= 24000 and t_iSetNum < 26000, t_iSetNum >= 34000 and t_iSetNum < 36000, t_iSetNum >= 44000 and t_iSetNum < 46000:
          t_sSetName = "ch"
        t_iSetNum >= 26000 and t_iSetNum < 28000, t_iSetNum >= 36000 and t_iSetNum < 38000, t_iSetNum >= 46000 and t_iSetNum < 48000:
          t_sSetName = "pn"
        t_iSetNum >= 28000 and t_iSetNum < 30000, t_iSetNum >= 38000 and t_iSetNum < 40000, t_iSetNum >= 48000:
          t_sSetName = "sh"

      end case
      if t_ar_availableSets.findPos(t_sSetName) > 0 then
        t_mp_SetContent = m_mp_AllSets[t_sSetName][t_iSetNum]
        t_ar_availableSets[t_sSetName].addProp(t_iSetNum, t_mp_SetContent)
        next repeat
      end if
      t_ar_availableSets.addProp(t_sSetName, [:])
      t_mp_SetContent = m_mp_AllSets[t_sSetName][t_iSetNum]
      t_ar_availableSets[t_sSetName].addProp(t_iSetNum, t_mp_SetContent)
    end repeat
    if m_mp_AvatarBuilderData.findPos("AvailableSets") then
      m_mp_AvatarBuilderData["AvailableSets"] = t_ar_availableSets
    else
      m_mp_AvatarBuilderData.addProp("AvailableSets", t_ar_availableSets)
    end if
    me.interface.AvailableSetsReceived(m_mp_AvatarBuilderData)
  else
    return error(me, "Available set list is corrupted: " && ar_data, #parseAvailableSets)
  end if
end
on ParseMyAvatar me, tMsg
  m_ar_MyAvatar = me.ParseFigure(tMsg)
  m_ar_PropsToServer = m_ar_MyAvatar
  if m_mp_AvatarBuilderData.findPos("MyAvatar") then
    m_mp_AvatarBuilderData["MyAvatar"] = m_ar_MyAvatar
  else
    m_mp_AvatarBuilderData.addProp("MyAvatar", m_ar_MyAvatar)
  end if
  me.interface.AvatarDataReceived(m_mp_AvatarBuilderData)
end
on ParseFigure me, tMsg
  t_ar_SetList = tMsg
  if t_ar_SetList.count > 0 then
    t_mp_MyFigure = [:]
    repeat with i = 1 to t_ar_SetList.count
      if i mod 2 then
        t_s_PartNum = string(t_ar_SetList[i])
        if t_ar_SetList[i] <> -1 then
          t_ar_PartData = me.getFigureSets(t_s_PartNum)
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
    return t_mp_MyFigure
  else
    return error(me, "Wrong kind of figure data: " && t_ar_SetList, #ParseMyFigure)
  end if
end
on MinigameStateChange me, a_sState, a_sGameName
  case a_sState of
    #running:
      m_bMinigameRunning = 1
      m_sMiniGameRunning = a_sGameName
    otherwise:
      m_bMinigameRunning = 0
      m_sMiniGameRunning = VOID

  end case
end
on CreateAvatar me, a_mp_DataList
  t_mp_data = me.ParseFigure(a_mp_DataList.input)
  t_Obj = a_mp_DataList.Output
  t_rObj = getThread(#room).component._AccessRoom()
  if objectp(t_rObj) then
    t_iTileSize = t_rObj.GetParam("TILESIZE")
  end if
  if m_bMinigameRunning and t_iTileSize = 16 then
    createVariable("avatarHeight", 160)
    createVariable("avatarWidth", 100)
  else
    createVariable("avatarHeight", 160)
    createVariable("avatarWidth", 80)
  end if
  if objectp(t_Obj) then
    t_Obj.ResetClothesSituation()
    t_Obj.Define(t_mp_data)
  else
    t_ObjAvatar = a_mp_DataList.avatar
    t_ClsPartObj = createObject(#temp, "CAvatarFactor")
    t_ClsPartObj.SetMiniGameState(m_bMinigameRunning, m_sMiniGameRunning)
    t_ClsPartObj.Define(t_mp_data)
    t_ClsPartObj.SetAvatarInfo(t_ObjAvatar)
    a_mp_DataList[#Output] = t_ClsPartObj
  end if
end
on GetAvatarImage me, a_mp_DataList
  if objectp(m_objAnimator) and listp(a_mp_DataList) then
    m_bAvatarImageClothesReady = 0
    t_Img = VOID
    t_ar_DataList = a_mp_DataList[#figure]
    t_ar_Dirs = a_mp_DataList[#Dir]
    t_iHandAction = a_mp_DataList[#act][1]
    t_iFeetAction = a_mp_DataList[#act][2]
    t_mp_data = me.ParseFigure(t_ar_DataList)
    t_mp_LoadableClothes = [:]
    repeat with i = 1 to t_ar_DataList.count
      t_iID = t_ar_DataList[i]
      if t_iID < 21000 or t_iID > 21999 and t_iID < 24000 or t_iID > 29999 and t_iID < 31000 or t_iID > 31999 and t_iID < 34000 or t_iID > 39999 and t_iID < 41000 or t_iID > 41999 and t_iID < 44000 then
        next repeat
      end if
      t_mp_LoadableClothes.addProp(t_iID, VOID)
    end repeat
    t_mp_Data1 = [#client: me.getID(), #method: #AvatarImageClothesDone]
    executeMessage("GetClothThumbnail", t_mp_LoadableClothes, t_mp_Data1)
  end if
  if m_bAvatarImageClothesReady then
    t_mp_data = [#outlook: t_ar_DataList, #tilesize: 32]
    m_objAnimator.Define(t_mp_data)
    t_mp_data2 = [#head: t_ar_Dirs[1], #body: t_ar_Dirs[2], #emoticon: 0, #LeftHand: t_iHandAction, #RightHand: t_iHandAction, #legs: t_iFeetAction, #magic: 0]
    t_Img = m_objAnimator.SetAction(t_mp_data2)
    a_mp_DataList[#Output] = t_Img
    return 1
  else
    me.delay(200, #GetAvatarImage)
  end if
end
on AvatarImageClothesDone me, a_mp_Data
  m_bAvatarImageClothesReady = 1
end
on createRandomAvat me, a_mp_DataList
  if listp(a_mp_DataList) then
    t_mp_DataList = []
    t_iAct = a_mp_DataList[#input][1]
    t_iHdDir = a_mp_DataList[#input][2]
    t_ibdDir = a_mp_DataList[#input][3]
    t_setList = m_mp_AllSets
    t_iCount = t_setList.count
    repeat with i = 1 to t_iCount
      t_sSet = t_setList[i].getPropAt(random(t_setList[i].count))
      t_mp_DataList.add(value(t_sSet))
      t_arColorList = t_setList[i][t_sSet][2]
      t_sColor = random(t_arColorList.count)
      t_mp_DataList.add(t_sColor)
    end repeat
    t_mp_data = me.ParseFigure(t_mp_DataList)
    t_ClsPartObj = createObject(#temp, "CAvatarClass")
    t_ClsPartObj.Define(t_mp_data)
    t_arActionList = [t_iHdDir, t_ibdDir, 0, 2, 1, 0, 0, t_iAct, 0]
    t_ClsPartObj.Action(t_arActionList)
    t_Img = VOID
    repeat while t_Img = VOID
      t_Img = t_ClsPartObj.updatePreviewImage()
      if not voidp(t_Img) then
        exit repeat
      end if
    end repeat
    a_mp_DataList[#Output] = t_Img
    return 1
  else
    return error(me, "Avatar data not defined! ", #createRandomAvat)
  end if
end