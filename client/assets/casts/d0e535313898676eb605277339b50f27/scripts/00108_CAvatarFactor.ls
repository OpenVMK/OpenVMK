-- Script
property m_iTileSize
property m_veAvatarLoc
property m_mp_Actions
property m_mp_PartList
property m_ObjRenderer
property m_objMagic
property m_rAvatarSpr
property m_arFlipList
property m_sRenderer
property m_iMyRef
property m_bMinigameRunning
property m_sMiniGameRunning
property m_ObjMagicFx
property m_iCurrentMagic
property m_objVehicle
property m_mp_AvatarData
property m_sMyName
property m_sAvatarName
property m_mp_PartPieces
property m_bAnimating
property m_arClothesSets
property m_bNeededClothesLoaded
property m_ar_ActionData
property m_bAvatarReseted
property m_iResetCounter

on construct me
  m_mp_PartPieces = VOID
  m_mp_Actions = VOID
  m_veAvatarLoc = VOID
  m_rAvatarSpr = VOID
  m_ObjRenderer = VOID
  m_objMagic = VOID
  m_iMyRef = VOID
  m_sRenderer = VOID
  m_ObjMagicFx = VOID
  m_mp_AvatarData = VOID
  m_objVehicle = VOID
  m_mp_PartList = VOID
  m_arClothesSets = VOID
  m_ar_ActionData = VOID
  m_arFlipList = [0, 1, 2, 3, 4, 3, 2, 1]
  m_iCurrentMagic = 0
  m_bMinigameRunning = 0
  m_sMiniGameRunning = EMPTY
  m_bNeededClothesLoaded = 0
  m_bAnimating = 0
  m_iResetCounter = 0
  m_bAvatarReseted = 0
  t_rObj = getThread(#room).component._AccessRoom()
  if objectp(t_rObj) then
    m_iTileSize = t_rObj.GetParam("TILESIZE")
  else
    return 0
  end if
end
on deconstruct me
  if objectp(m_ObjRenderer) then
    m_ObjRenderer.deconstruct()
  end if
  m_mp_Actions = VOID
  m_mp_PartList = VOID
  m_veAvatarLoc = VOID
  m_rAvatarSpr = VOID
  m_ObjRenderer = VOID
  m_objMagic = VOID
  m_iMyRef = VOID
  m_sRenderer = VOID
  m_mp_AvatarData = VOID
  m_objVehicle = VOID
  if objectp(m_ObjMagicFx) then
    removeObject(m_ObjMagicFx.getID())
    m_ObjMagicFx = VOID
  end if
  if objectp(m_objVehicle) then
    removeObject(m_objVehicle.getID())
    m_objVehicle = VOID
  end if
end
on SetSpriteLoc me, a_veScr
  m_veAvatarLoc = a_veScr
end
on SetMiniGameState me, a_bMiniGame, a_sMiniGameName
  m_bMinigameRunning = a_bMiniGame
  m_sMiniGameRunning = a_sMiniGameName
end
on SetAnimatingState me
  m_bAnimating = 1
end
on SetTileSize me, a_iTileSize
  m_iTileSize = a_iTileSize
end
on Define me, a_mp_PartList
  if objectp(m_ObjRenderer) then
    m_ObjRenderer.deconstruct()
  end if
  m_mp_PartPieces = a_mp_PartList
  m_sRenderer = VOID
  m_ObjRenderer = VOID
  if not m_bNeededClothesLoaded then
    if listp(m_mp_PartList) then
      call(#reset, m_mp_PartList)
    end if
  end if
  if m_iCurrentMagic = 20 then
    if listp(m_mp_PartList) then
      call(#reset, m_mp_PartList)
    end if
  end if
  m_arClothesSets = []
  if listp(a_mp_PartList) then
    t_mp_PartList = [:]
    repeat with i = 1 to a_mp_PartList.count
      tColor = a_mp_PartList[i]["Color"]
      tSetID = a_mp_PartList.getPropAt(i)
      colorid = 1
      m_arClothesSets.add(a_mp_PartList[i]["SetID"])
      repeat with e = 1 to a_mp_PartList[i]["Figure"].count
        tPart = a_mp_PartList[i]["Figure"].getPropAt(e)
        tmodel = a_mp_PartList[i]["Figure"][e]
        t_mp_PartList[tPart] = [:]
        t_mp_PartList[tPart].addProp("model", tmodel)
        t_mp_PartList[tPart].addProp("color", tColor)
        t_mp_PartList[tPart].addProp("setid", tSetID)
        t_mp_PartList[tPart].addProp("colorid", 1)
      end repeat
    end repeat
    if not m_bNeededClothesLoaded then
      me.CheckClothesLoaded()
    end if
    if listp(m_mp_PartList) then
      repeat with i = 1 to m_mp_PartList.count
        t_PartObj = m_mp_PartList[i]
        t_sPartSymbol = m_mp_PartList.getPropAt(i)
        if t_sPartSymbol <> "li" and t_sPartSymbol <> "ri" then
          if t_mp_PartList[t_sPartSymbol]["color"].ilk <> #color then
            tColor = rgb(t_mp_PartList[t_sPartSymbol]["color"])
          else
            tColor = t_mp_PartList[t_sPartSymbol]["color"]
          end if
          if tColor.red + tColor.green + tColor.blue > 238 * 3 then
            tColor = rgb("EEEEEE")
          end if
          t_iDir = 1
          if listp(m_mp_AvatarData) then
            case t_sPartSymbol of
              "hr", "hd", "ey", "fc", "ht":
                t_iDir = m_mp_AvatarData.HeadDir
              otherwise:
                t_iDir = m_mp_AvatarData.BodyDir

            end case
          end if
          t_PartObj.Define(t_sPartSymbol, t_mp_PartList[t_sPartSymbol]["model"], tColor, t_iDir, "std")
        end if
      end repeat
      me.update(m_rAvatarSpr)
      return 1
    end if
    t_mp_PartObjects = [:]
    if m_bMinigameRunning and m_sMiniGameRunning = "hauntedmansion" then
      t_ar_Parts = ["hd", "hr", "fc", "ey", "ch", "lpn", "rpn", "ri"]
      t_sBodypartsObjName = "CBodypartClassHauntedMansion"
    else
      t_ar_Parts = ["ht", "hd", "hr", "fc", "ey", "tr", "rh", "ri", "lh", "li", "llg", "rlg", "ls", "rs", "ch", "ch2", "lsh", "rsh", "lpn", "rpn"]
      t_sBodypartsObjName = "CBodypartClass"
    end if
    repeat with i = 1 to t_ar_Parts.count
      t_sPartSymbol = t_ar_Parts[i]
      if voidp(t_mp_PartList[t_sPartSymbol]) then
        t_mp_PartList[t_sPartSymbol] = [:]
      end if
      if voidp(t_mp_PartList[t_sPartSymbol]["model"]) then
        t_mp_PartList[t_sPartSymbol]["model"] = "1"
      end if
      if voidp(t_mp_PartList[t_sPartSymbol]["color"]) then
        t_mp_PartList[t_sPartSymbol]["color"] = rgb("EEEEEE")
      end if
      t_sName = t_ar_Parts[i]
      case t_sName of
        "llg", "rlg", "lsh", "rsh", "lpn", "rpn":
          t_sName = "lg"
        "ls":
          t_sName = "llg"
        "rs":
          t_sName = "rlg"

      end case
      if m_bMinigameRunning and m_sMiniGameRunning = "hauntedmansion" then
        t_PartObj = createObject(#temp, t_sBodypartsObjName)
      else
        t_sObjectName = "CBodypartClass_" & t_sName
        if memberExists(t_sObjectName) then
          t_PartObj = createObject(#temp, t_sObjectName)
        else
          t_PartObj = createObject(#temp, t_sBodypartsObjName)
        end if
      end if
      if stringp(t_mp_PartList[t_sPartSymbol]["color"]) then
        tColor = value("rgb(" & t_mp_PartList[t_sPartSymbol]["color"] & ")")
      end if
      if t_mp_PartList[t_sPartSymbol]["color"].ilk <> #color then
        tColor = rgb(t_mp_PartList[t_sPartSymbol]["color"])
      else
        tColor = t_mp_PartList[t_sPartSymbol]["color"]
      end if
      if tColor.red + tColor.green + tColor.blue > 238 * 3 then
        tColor = rgb("EEEEEE")
      end if
      t_PartObj.Define(t_sPartSymbol, t_mp_PartList[t_sPartSymbol]["model"], tColor, 1, "std")
      t_mp_PartObjects[t_sPartSymbol] = t_PartObj
    end repeat
    m_mp_PartList = t_mp_PartObjects
  end if
end
on CheckClothesLoaded this
  if listp(m_arClothesSets) then
    t_Obj = getThread(#AvatarFactory).component.GetClothAssetManager()
    t_ar_ReadyClothes = []
    repeat with i = 1 to m_arClothesSets.count
      t_iSetNum = m_arClothesSets[i]
      if t_Obj.IsClothReady(t_iSetNum) then
        t_ar_ReadyClothes.add(t_iSetNum)
      end if
    end repeat
    repeat with e = 1 to t_ar_ReadyClothes.count
      t_iSetNum = t_ar_ReadyClothes[e]
      t_iPos = m_arClothesSets.findPos(t_iSetNum)
      if t_iPos > 0 then
        m_arClothesSets.deleteAt(t_iPos)
      end if
    end repeat
    if m_arClothesSets.count = 0 then
      m_bNeededClothesLoaded = 1
      this.Define(m_mp_PartPieces)
      if listp(m_ar_ActionData) then
        this.Action(m_ar_ActionData)
        m_ar_ActionData = VOID
      end if
    end if
  end if
end
on ResetClothesSituation me
  m_bAvatarReseted = 1
  m_bNeededClothesLoaded = 0
end
on Action me, a_Ar_Data
  if not m_bNeededClothesLoaded then
    m_ar_ActionData = a_Ar_Data
  end if
  t_iheadDir = a_Ar_Data[1]
  t_ibdDir = a_Ar_Data[2]
  t_iMagic = a_Ar_Data[10]
  t_iFeet = a_Ar_Data[8]
  t_iTrade = a_Ar_Data[9]
  if a_Ar_Data.count > 10 then
    t_iWeapon = a_Ar_Data[11]
  else
    t_iWeapon = 0
  end if
  if m_arFlipList[t_ibdDir + 1] <> t_ibdDir or t_ibdDir = 4 and t_iheadDir = 5 or t_ibdDir = 0 and t_iheadDir = 7 then
    t_bFlipped = 1
  else
    t_bFlipped = 0
  end if
  if t_iMagic <> 0 then
    if m_iCurrentMagic <> t_iMagic then
      if objectp(m_ObjMagicFx) then
        if objectp(m_ObjRenderer) then
          me.Define(m_mp_PartPieces)
        end if
        removeObject(m_ObjMagicFx.getID())
        m_ObjMagicFx = VOID
      end if
    end if
    if not objectp(m_ObjMagicFx) then
      m_ObjMagicFx = createObject(getUniqueID(), "CMagicFactor")
      if objectp(m_ObjRenderer) then
        m_ObjRenderer.ArrowHide()
      end if
    end if
    m_ObjMagicFx.SetFx(t_iMagic, m_iTileSize, t_bFlipped, t_ibdDir, m_iMyRef, m_sMyName, m_sAvatarName)
    if t_iMagic > 99 then
      m_ObjMagicFx.SetCarPantAction(t_iFeet)
    end if
    if t_iMagic = 16 and m_sMyName = m_sAvatarName then
      executeMessage("DisableDanceButton", 0)
    end if
  else
    if objectp(m_ObjMagicFx) then
      removeObject(m_ObjMagicFx.getID())
      m_ObjMagicFx = VOID
      if objectp(m_ObjRenderer) then
        me.Define(m_mp_PartPieces)
      end if
    end if
  end if
  if t_iMagic = 18 or t_iMagic = 20 then
    me.ShowHideAvatar(1, 0)
  else
    me.ShowHideAvatar(1, 1)
  end if
  if t_iFeet = 5 or t_iFeet = 6 or t_iFeet = 7 or t_iFeet = 8 or t_iFeet = 9 or t_iFeet = 10 or t_iFeet = 11 or t_iFeet = 12 or t_iFeet = 13 then
    if not objectp(m_objVehicle) then
      m_objVehicle = createObject(getUniqueID(), "CAvatarVehicle")
    end if
    m_objVehicle.SetVehicle(t_iFeet, t_ibdDir, m_sMyName, m_sAvatarName)
    me.ShowHideAvatar(1, 0)
    if t_iFeet = 10 or t_iFeet = 11 then
      me.ShowHideAvatar(1, 1)
    end if
  else
    if objectp(m_objVehicle) then
      removeObject(m_objVehicle.getID())
      m_objVehicle = VOID
      me.ShowHideAvatar(1, 1)
    end if
  end if
  m_mp_AvatarData = [:]
  m_mp_AvatarData.addProp(#HeadDir, t_iheadDir)
  m_mp_AvatarData.addProp(#BodyDir, t_ibdDir)
  m_mp_AvatarData.addProp(#emoticon, a_Ar_Data[3])
  m_mp_AvatarData.addProp(#Eyes, a_Ar_Data[4])
  m_mp_AvatarData.addProp(#Mouth, a_Ar_Data[5])
  m_mp_AvatarData.addProp(#LeftHand, a_Ar_Data[6])
  m_mp_AvatarData.addProp(#RightHand, a_Ar_Data[7])
  m_mp_AvatarData.addProp(#Feet, t_iFeet)
  m_mp_AvatarData.addProp(#magic, t_iMagic)
  m_mp_AvatarData.addProp(#tilesize, m_iTileSize)
  m_mp_AvatarData.addProp(#Flipped, t_bFlipped)
  m_mp_AvatarData.addProp(#objects, m_mp_PartList)
  m_mp_AvatarData.addProp(#MyRef, m_iMyRef)
  m_mp_AvatarData.addProp(#MagicObj, m_ObjMagicFx)
  m_mp_AvatarData.addProp(#VehicleObj, m_objVehicle)
  m_mp_AvatarData.addProp(#TradeState, t_iTrade)
  m_mp_AvatarData.addProp(#avatarName, m_sAvatarName)
  m_mp_AvatarData.addProp(#Weapon, t_iWeapon)
  m_iCurrentMagic = t_iMagic
  me.SetAvatarRenderer()
  if objectp(m_ObjRenderer) then
    m_ObjRenderer.Action(m_mp_AvatarData)
  end if
end
on update me, a_rSpr
  if voidp(a_rSpr) then
    exit
  end if
  if voidp(a_rSpr.member) then
    exit
  end if
  if a_rSpr.member.name = EMPTY then
    exit
  end if
  m_rAvatarSpr = a_rSpr
  t_LocH = a_rSpr.locH
  t_LocV = a_rSpr.locV
  t_LocZ = a_rSpr.locZ
  m_veAvatarLoc = vector(t_LocH, t_LocV, t_LocZ)
  if not m_bNeededClothesLoaded then
    me.CheckClothesLoaded()
  end if
  if objectp(m_ObjRenderer) then
    m_ObjRenderer.update(m_veAvatarLoc, m_rAvatarSpr)
  end if
end
on SetAvatarRenderer me
  case 1 of
    m_bAnimating:
      if m_sRenderer <> "animator" then
        m_ObjRenderer = createObject(#temp, "CAvatarAnimatorRenderer")
        m_sRenderer = "animator"
        if objectp(m_ObjRenderer) then
          call(#SetAncestor, m_mp_PartList, m_ObjRenderer)
          m_ObjRenderer.Define(m_mp_AvatarData)
        end if
      end if
    m_bMinigameRunning and m_sMiniGameRunning = "hauntedmansion":
      if m_sRenderer <> "HmGame" then
        m_ObjRenderer = createObject(#temp, "CAvatarClassHauntedMansion")
        m_sRenderer = "HmGame"
        if objectp(m_ObjRenderer) then
          call(#SetAncestor, m_mp_PartList, m_ObjRenderer)
          m_ObjRenderer.Define(m_mp_AvatarData)
        end if
      end if
      exit
    not m_bNeededClothesLoaded:
      if m_sRenderer <> "Loader" then
        m_ObjRenderer = createObject(#temp, "CLoaderAvatarRender")
        m_sRenderer = "Loader"
        t_mp_PartList = [:]
        t_ar_Parts = ["ht", "hd", "hr", "fc", "ey"]
        repeat with i = 1 to t_ar_Parts.count
          t_sPrt = t_ar_Parts[i]
          t_mp_PartList.addProp(t_sPrt, m_mp_PartList[t_sPrt])
        end repeat
        if objectp(m_ObjRenderer) then
          call(#SetAncestor, t_mp_PartList, m_ObjRenderer)
          m_ObjRenderer.Define(m_mp_AvatarData)
        end if
        m_ObjRenderer.render()
      end if
      exit
    otherwise:
      if m_iCurrentMagic = 20 and m_bNeededClothesLoaded then
        if m_sRenderer <> "Swim" then
          m_ObjRenderer = createObject(#temp, "CSwimmerAvatarRender")
          m_sRenderer = "Swim"
          t_mp_PartList = [:]
          t_ar_Parts = ["ht", "hd", "hr", "fc", "ey"]
          repeat with i = 1 to t_ar_Parts.count
            t_sPrt = t_ar_Parts[i]
            t_mp_PartList.addProp(t_sPrt, m_mp_PartList[t_sPrt])
          end repeat
          if objectp(m_ObjRenderer) then
            call(#SetAncestor, t_mp_PartList, m_ObjRenderer)
            m_ObjRenderer.Define(m_mp_AvatarData)
          end if
        end if
        exit
      end if
      if m_sRenderer <> "rooms" then
        m_ObjRenderer = createObject(#temp, "CAvatarRenderer")
        m_sRenderer = "rooms"
        if objectp(m_ObjRenderer) then
          call(#SetAncestor, m_mp_PartList, m_ObjRenderer)
          m_ObjRenderer.Define(m_mp_AvatarData)
        end if
      end if

  end case
  if objectp(m_ObjRenderer) and m_sRenderer = "rooms" and m_bAvatarReseted then
    m_iResetCounter = m_iResetCounter + 1
    m_sRenderer = VOID
    if m_iResetCounter = 3 then
      m_bAvatarReseted = 0
      m_iResetCounter = 0
    end if
  end if
end
on setAnimation me, a_sAnim
  if objectp(m_ObjRenderer) then
    m_ObjRenderer.setAnimation(a_sAnim)
  end if
end
on ShowHideAvatarName me, a_kEvent
  if not m_bMinigameRunning and m_iCurrentMagic <> 16 then
    if objectp(m_ObjRenderer) then
      m_ObjRenderer.ShowName(m_sAvatarName, a_kEvent)
    end if
  end if
end
on SendMouseEvent me, a_kEvent
  if objectp(m_ObjRenderer) then
    m_ObjRenderer.ShowName(m_sAvatarName, a_kEvent)
  end if
end
on ShowArrow me
  if m_iCurrentMagic = 16 then
    executeMessage("close_profile")
    exit
  end if
  if objectp(m_ObjRenderer) then
    m_ObjRenderer.ShowArrow()
  end if
end
on HideArrow me
  if objectp(m_ObjRenderer) then
    m_ObjRenderer.HideArrow()
  end if
  m_bShowArrow = 0
end
on Refresh a_iheadDir, a_iBodyDir
  if objectp(m_ObjRenderer) then
    m_ObjRenderer.Refresh(a_iheadDir, a_iBodyDir)
  end if
end
on ReleaseBeam
  if objectp(m_ObjRenderer) then
    m_ObjRenderer.ReleaseBeam()
  end if
end
on SetAvatarInfo me, a_ObjAvatar
  if objectp(a_ObjAvatar) then
    m_ObjAvatar = a_ObjAvatar
    m_iMyRef = value(a_ObjAvatar.GetParam("REF"))
    m_sMyName = getObject(#session).get("name")
    m_sAvatarName = m_ObjAvatar.GetParam("NAME")
  end if
end
on ShowHideAvatar me, a_bAvatar, a_bSdw
  t_rContext = getThread(#room).component._AccessRoom()
  if objectp(t_rContext) then
    t_rObj = t_rContext._AccessIndexed(m_iMyRef, "avatar")
    if objectp(t_rObj) then
      t_rObjVisual = t_rObj.GetVisual()
      if objectp(t_rObjVisual) then
        t_rObjVisual.visible(a_bAvatar, a_bSdw)
      end if
    end if
  end if
end
on GetShirtColor me
  if objectp(m_ObjRenderer) then
    return m_ObjRenderer.GetShirtColor()
  end if
end
on updatePreviewImage me
  if objectp(m_ObjRenderer) then
    return m_ObjRenderer.updatePreviewImage()
  end if
end
on DrawOnlyHead me, a_iState
  if objectp(m_ObjRenderer) then
    m_ObjRenderer.DrawOnlyHead(a_iState)
  end if
end