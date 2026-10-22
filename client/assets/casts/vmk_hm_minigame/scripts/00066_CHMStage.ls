-- Movie Script
property m_ar_items
property m_sVisual
property m_sMusicName
property m_ar_rRattlers
property m_ar_hauntedfurniture
property m_p_CollisionEngine

on construct me
  m_ar_rRattlers = [:]
  m_ar_hauntedfurniture = []
  m_p_CollisionEngine = VOID
  t_s_FurnitureItems = getText("hm.furniture")
  if listp(value(t_s_FurnitureItems)) then
    m_ar_hauntedfurniture = value(t_s_FurnitureItems)
  end if
  return 1
end
on deconstruct me
  if getObject("HMCollisionEngine") <> 0 then
    removeObject("HMCollisionEngine")
  end if
  me.removeRattlers()
  return 1
end
on removeRattlers me
  repeat with t_rattler in m_ar_rRattlers
    removeObject(t_rattler.getID())
  end repeat
  m_ar_rRattlers = [:]
end
on CreateCollisionEngine me
  if getObject("HMCollisionEngine") <> 0 then
    removeObject("HMCollisionEngine")
  end if
  m_p_CollisionEngine = createObject("HMCollisionEngine", "CCollisionEngine")
  m_p_CollisionEngine.parseRoom()
end
on getCollisionEngine me
  return m_p_CollisionEngine
end
on load me, a_sName, i_iVersion
  m_sMusicName = EMPTY
  put "CHMStage.Load()" && a_sName
  if a_sName contains ".xml" then
    t_rXML = CreateXML(member(a_sName).text)
  else
    t_rXML = CreateXML(member("stage." & a_sName & ".xml").text)
  end if
  if t_rXML.Search("type", "HAUNTED_MANSION", 0) then
    t_iVersion = value(t_rXML.GetParam("VERSION"))
    t_bVersionOK = 0
    if t_iVersion = i_iVersion then
      put "Stage versions MATCH client:" && t_iVersion && "server:" && i_iVersion
      t_bVersionOK = 1
    else
      put "Stage MisMatch client:" && t_iVersion && "server:" && i_iVersion
    end if
    if t_rXML.Search("type", "ITEMS", 1) then
      m_ar_items = []
      tCount = t_rXML.count()
      repeat with i = 1 to tCount
        tItem = t_rXML[i]
        m_ar_items.append(tItem)
      end repeat
    end if
    if t_rXML.Search("type", "ROOM", 1) then
      m_sVisual = t_rXML.GetParam("NAME")
    else
      m_sVisual = EMPTY
    end if
    if t_rXML.Search("type", "MUSIC", 1) then
      m_sMusicName = t_rXML.GetParam("PLAY")
    else
      m_sMusicName = EMPTY
    end if
  else
    put "Haunted Mansion stage-file, in incorrect format!"
  end if
  createTimeout("hmstartroomsound", 1000, #startSound, me.getID(), VOID, 1)
end
on startSound me
  executeMessage("StopRoomSound")
  executeMessage("LoadRoomSound", m_sMusicName)
end
on SwitchToRoom me
  if m_sVisual <> EMPTY then
    executeMessage(#room_switch, m_sVisual)
  end if
end
on rattle me, t_sRef, i_iCoffinAction
  tPos = m_ar_rRattlers.findPos(t_sRef)
  if tPos <> 0 then
    m_ar_rRattlers[tPos].setState(#rattle, i_iCoffinAction)
  end if
end
on tremble me, t_sRef
  tPos = m_ar_rRattlers.findPos(t_sRef)
  if tPos <> 0 then
    m_ar_rRattlers[tPos].setState(#tremble)
  end if
end
on getARattler me
  if m_ar_rRattlers.count > 0 then
    t_rattler = m_ar_rRattlers[1]
    m_ar_rRattlers.deleteAt(1)
    return t_rattler
  else
    return 0
  end if
end
on DumpFurni me, a_rContext
  put "DUMPING FURNI"
  if voidp(a_rContext) then
    return error(me, "Room context not available!", #DumpFurni)
  end if
  t_editorMode = getThread("HauntedMansionEditor")
  if t_editorMode <> 0 then
    me.hideAnimationNodes()
    me.hideVortex()
  else
    me.hideVortex()
  end if
  m_ar_rRattlers = [:]
  t_rXMLElement = CreateXML(getMember("room.object.element.xml").text)
  t_rXMLElement.Search("type", "NODE")
  t_rFurniMap = getThread("room").component.m_rFurniMap
  t_delim = the itemDelimiter
  the itemDelimiter = ","
  repeat with i = 1 to m_ar_items.count
    tItem = m_ar_items[i]
    t_iRef = tItem[#param]["REF"]
    t_iTypeCode = tItem[#param]["CODE"]
    t_iCategory = 1
    t_iPlaceRef = tItem[#param]["TILE"]
    t_sItemName = tItem[#param]["NAME"]
    t_sPos = tItem[#param]["POS"]
    if not voidp(t_sPos) then
      t_vPos = vector(float(t_sPos.item[1]), float(t_sPos.item[2]), float(t_sPos.item[3]))
    end if
    t_rStruct = t_rFurniMap.GetByTypeCode(t_iTypeCode)
    t_ar_iParams = []
    t_iDir = tItem[#param]["DIR"]
    t_iState = 0
    t_rXMLElement.SetParam("REF", string(t_iRef))
    t_rXMLElement.SetParam("TYPE", string(t_iTypeCode))
    t_rXMLElement.SetParam("DIR", string(t_iDir))
    t_rXMLElement.SetParam("STATE", string(t_iState))
    t_rXMLElement.SetParam("STRUCT", t_rStruct)
    t_rXMLElement.SetParam("HAUNTEDMANSION_TYPE", tItem.type)
    t_bDoorOK = 0
    if tItem.type = "DOOR" then
      if not voidp(t_sItemName) then
        if t_sItemName.length > 0 then
          t_bDoorOK = 1
        end if
      end if
    end if
    if t_bDoorOK then
      t_rXMLElement.SetParam("HM_NAME", t_sItemName)
    else
      t_param = t_rXMLElement.GetParam("HM_NAME")
      t_rXMLElement.SetParam("HM_NAME", EMPTY)
      if t_param <> 0 then
        t_rXMLElement.RemParam("HM_NAME")
      end if
    end if
    t_rTile = a_rContext._AccessIndexed(t_iPlaceRef, "tile")
    if objectp(t_rTile) then
      t_iStack = 0
      t_rCopy = t_rTile
      repeat while 1
        if t_rCopy.GetCount() > 0 then
          t_rCopy = t_rCopy[1]
          t_iStack = t_iStack + 1
          next repeat
        end if
        exit repeat
      end repeat
      t_editorMode = getThread("HauntedMansionEditor")
      if t_editorMode = 0 then
        case tItem.type of
          "DOOR":
          "LOOP":
            next repeat

        end case
      end if
      if a_rContext._CreateIndexed(t_iRef, "element", t_rXMLElement) then
        if a_rContext._AccessIndexed(t_iRef, "element").GetFactor().SetToTileStack(t_rTile, t_iStack) then
          t_rObj = a_rContext._AccessIndexed(t_iRef, "element")
          t_rObj.GetFactor().setState(t_iState)
          getObject("RoomItemAssetManager").LoadCastLibsForItem(t_rObj)
          if tItem.type = "COFFIN" then
            tRattler = createObject(#random, "CHMCoffinRattler")
            tRattler.LinkTo(t_rObj, t_rTile)
            m_ar_rRattlers[string(t_iRef)] = tRattler
          else
            if tItem.type = "DOOR" then
              t_rLinkObj = t_rObj
              getThread("hauntedmansiongame").getComponent().createDoor(t_iRef, t_sItemName, t_rLinkObj)
            else
            end if
          end if
          repeat with t_rBlk in t_rObj.GetFactor().GetBlocks()
            t_rBlk.SetParam("CLASS", "hmblock")
          end repeat
        else
          error(me, "Failed to set item into a tile!", #DumpFurni)
        end if
      end if
      next repeat
    end if
    error(me, "Referred tile not found:" && t_iPlaceRef, #DumpFurni)
  end repeat
end
on hideDoors me
  tRoomContext = getThread(#room).getComponent()._AccessRoom()
  repeat with i = 1 to 10
    tAnimName = "door" & i
    tNode = tRoomContext.Search("NAME", tAnimName)
    if tNode <> 0 then
      tSprite = tNode.GetVisual().getSprite()
      if tSprite <> sprite(0) then
        tSprite.visible = 0
      end if
    end if
  end repeat
end
on hideVortex me
  tRoomContext = getThread(#room).getComponent()._AccessRoom()
  repeat with i = 1 to 10
    tAnimName = "hm_vortex_" & i
    tNode = tRoomContext.Search("NAME", tAnimName)
    if tNode <> 0 then
      tSprite = tNode.GetVisual().getSprite()
      if tSprite <> sprite(0) then
        tSprite.visible = 0
      end if
    end if
  end repeat
end
on hideAnimationNodes me
  m_ar_animations = []
  tRoomContext = getThread(#room).getComponent()._AccessRoom()
  if not voidp(tRoomContext) then
    repeat with i = 1 to 15
      tAnimName = "vmk_anim_" & i
      tNode = tRoomContext.Search("NAME", tAnimName)
      if tNode <> 0 then
        tSprite = tNode.GetVisual().getSprite()
        if tSprite <> sprite(0) then
          m_ar_animations.append(tSprite)
        end if
        next repeat
      end if
      exit repeat
    end repeat
  else
    put "ERROR! No room loaded yet"
  end if
  repeat with tSprite in m_ar_animations
    if tSprite <> 0 then
      tSprite.visible = 0
    end if
  end repeat
end