-- Script
property m_sConfigurationWindowID
property m_ar_configuration
property m_ar_tiles
property m_ar_directions
property m_iDir
property m_vLoc
property m_bReady
property m_rTileMember
property m_bShowTiles
property m_ar_radiobuttons
property m_iRef
property m_ar_oldConfiguration
property m_iRoomType

on construct this
  registerObject(getUniqueID(), this)
  m_ar_configuration = ["f": 3, "fr": 0, "r": 2, "br": 1, "b": 1, "bl": 1, "l": 2, "fl": 0]
  m_ar_directions = []
  m_ar_directions.append(vector(1, 0, 0))
  m_ar_directions.append(vector(1, 1, 0))
  m_ar_directions.append(vector(0, 1, 0))
  m_ar_directions.append(vector(-1, 1, 0))
  m_ar_directions.append(vector(-1, 0, 0))
  m_ar_directions.append(vector(-1, -1, 0))
  m_ar_directions.append(vector(0, -1, 0))
  m_ar_directions.append(vector(1, -1, 0))
  m_bReady = 0
  m_bShowTiles = 0
  t_rContext = getThread(#room).component._AccessRoom()
  t_sTileSize = t_rContext.GetParam("TILESIZE")
  m_rTileMember = getMember("proximity_marker_" & t_sTileSize)
  m_sConfigurationWindowID = "vmk_darkride_item_configuration"
  m_iRoomType = #private
  if getObject(#session).exists("RoomType") then
    m_iRoomType = getObject(#session).get("RoomType")
  end if
  m_ar_radiobuttons = []
  m_ar_tiles = []
  return 1
end
on deconstruct this
  this.hideTiles()
  unregisterObject(this.getID())
  return callAncestor(#deconstruct, this)
end
on update me
  if m_iRoomType = #private then
    if m_bShowTiles then
      t_rItem = me.getObject()
      t_iDir = t_rItem.GetParam("DIR")
      if t_iDir <> m_iDir then
        m_bReady = 0
      end if
      if not m_bReady then
        me.initTiles()
      end if
      t_vLoc = me.getObject().GetScrPos()
      if t_vLoc <> m_vLoc then
        me.moveTiles(t_vLoc)
        m_vLoc = t_vLoc
      end if
    end if
  end if
  return callAncestor(#update, me)
end
on initTiles me
  t_rItem = me.getObject()
  if objectp(t_rItem) then
    m_iDir = t_rItem.GetParam("DIR")
    t_ar_directions = me.getCurrentDirections()
    me.showTiles(me.GetSurroundingBlocks(t_ar_directions))
    m_bReady = 1
  end if
end
on select me
  t_ar_roomProperties = [#owner: EMPTY]
  if objectp(getThread(#RoomInfo)) then
    t_ar_roomProperties = getThread(#RoomInfo).getComponent().getRoomDesc()
  end if
  t_bAllow = 0
  if m_iRoomType = #private then
    t_sName = EMPTY
    if getObject(#session).exists("name") then
      t_sName = getObject(#session).get("name")
    end if
    t_bAllow = t_ar_roomProperties.getaProp(#owner) = t_sName
  else
  end if
  if t_bAllow then
    m_bShowTiles = 1
    m_bReady = 0
    t_iRef = integer(me.getObject().GetParam("REF"))
    getConnection("VMK").send("UseItem", [#int: t_iRef, #int: 0])
  else
    t_rEventProcessor = getObject("RoomEventProcessor")
    if t_rEventProcessor <> 0 then
      t_rEventProcessor.reset()
    end if
  end if
end
on Unselect me
  m_bShowTiles = 0
  me.hideTiles()
  return callAncestor(#Unselect, me)
end
on GetSurroundingBlocks me, t_ar_directions
  a_rContext = getThread("room").getComponent()._AccessRoom()
  t_iTileSize = value(a_rContext.GetParam("TILESIZE"))
  t_vObjectOffset = me.getObject().GetAbsPos()
  t_ar_vLocations = []
  repeat with t_rBlk in me.getObject().GetFactor().GetBlocks()
    t_rBlkPos = t_rBlk.GetAbsPos()
    repeat with i = 1 to m_ar_configuration.count
      t_iAmount = m_ar_configuration[i]
      if t_iAmount > 0 then
        repeat with j = 1 to t_iAmount
          t_iDir = t_ar_directions[i] * j
          t_vNewLoc = t_rBlkPos + t_iTileSize * t_iDir - t_vObjectOffset
          t_scrPos = AbsToScr(t_vNewLoc)
          if t_ar_vLocations.getOne(t_scrPos) = 0 then
            t_ar_vLocations.append(t_scrPos)
          end if
        end repeat
      end if
    end repeat
  end repeat
  return t_ar_vLocations
end
on moveTiles me, a_vLoc
  a_rContext = getThread("room").getComponent()._AccessRoom()
  t_iLocZ = 0
  t_rContext = getThread(#room).component._AccessRoom()
  t_rBg = a_rContext.Search("CLASS", "default")
  if objectp(t_rBg) then
    t_veOff = t_rBg.GetScrPos()
    t_iLocZ = t_veOff.z
  end if
  repeat with t_rTile in m_ar_tiles
    t_veScr = a_vLoc + t_rTile.offset
    t_rTile.sprite.locH = t_veScr.x
    t_rTile.sprite.locV = t_veScr.y
    t_rTile.sprite.locZ = t_iLocZ + 1
  end repeat
end
on showTiles me, a_ar_vPositions
  me.hideTiles()
  repeat with t_veScr in a_ar_vPositions
    t_rSprite = sprite(reserveSprite())
    t_rSprite.member = m_rTileMember
    t_rSprite.width = t_rSprite.member.width
    t_rSprite.height = t_rSprite.member.height
    t_ar_tile = [#offset: t_veScr, #sprite: t_rSprite]
    m_ar_tiles.append(t_ar_tile)
  end repeat
  me.moveTiles(me.getObject().GetScrPos())
end
on hideTiles me
  repeat while m_ar_tiles.count > 0
    t_rTile = m_ar_tiles[1]
    releaseSprite(t_rTile[#sprite].spriteNum)
    m_ar_tiles.deleteAt(1)
  end repeat
  m_ar_tiles = []
end
on getCurrentDirections me
  t_ar_directions = m_ar_configuration.duplicate()
  t_iDir = value(me.getObject().GetParam("DIR"))
  t_iBaseIndex = 1
  case t_iDir of
    3:
      t_iBaseIndex = 0
    5:
      t_iBaseIndex = 2
    7:
      t_iBaseIndex = 4
    1:
      t_iBaseIndex = 6

  end case
  repeat with i = 1 to m_ar_directions.count
    t_ar_directions[i] = me.getTrialDirection(t_iBaseIndex, i + 0)
  end repeat
  return t_ar_directions
end
on getTrialDirection me, t_iOldDir, t_iRotDir
  t_newPos = t_iOldDir + t_iRotDir
  if t_newPos < 1 then
    t_newPos = m_ar_directions.count
  end if
  if t_newPos > m_ar_directions.count then
    t_newPos = t_newPos mod m_ar_directions.count
  end if
  return m_ar_directions[t_newPos]
end
on updateCurrentConfiguration me, a_ar_Configuration
  repeat with i = 1 to a_ar_Configuration.count
    t_sProp = a_ar_Configuration.getPropAt(i)
    t_iValue = value(a_ar_Configuration[i])
    m_ar_configuration[t_sProp] = t_iValue
  end repeat
end
on CurrentItemConfiguration me, t_iRef, a_ar_Configuration
  me.updateCurrentConfiguration(a_ar_Configuration)
end
on ItemConfiguration me, t_iRef, a_ar_Configuration
  me.updateCurrentConfiguration(a_ar_Configuration)
  m_iRef = t_iRef
  me.createItemConfigurationDialog(t_iRef, a_ar_Configuration)
end
on ItemConfigurationUsed me, t_iRef, t_iStatus, a_ar_Params
  t_sText = t_iRef && t_iStatus && a_ar_Params.string
  t = createDialogWindow(me.getID(), "item_configuration_used", 1, 1)
  t.setText(t_sText, "Item Configuration Used", "OK")
  t.show()
end
on createItemConfigurationDialog me, i_iRef, a_ar_Configuration
  m_ar_oldConfiguration = m_ar_configuration
  t_ar_windowDescriptions = ["vmk_basic.window", "dark_ride_configuration.window"]
  if getWindow(m_sConfigurationWindowID) <> 0 then
    removeWindow(m_sConfigurationWindowID)
  end if
  t_bSuccess = createWindow(m_sConfigurationWindowID, VOID, 0, 0, #modal)
  if t_bSuccess then
    t_rWindow = getWindow(m_sConfigurationWindowID)
    repeat with t_sWinDesc in t_ar_windowDescriptions
      t_bSuccess = t_rWindow.merge(t_sWinDesc)
    end repeat
    t_rWindow.center()
    repeat with i = 1 to a_ar_Configuration.count
      t_sDir = a_ar_Configuration.getPropAt(i)
      t_iDir = a_ar_Configuration[i]
      me.activateDirection(t_sDir, t_iDir)
    end repeat
    t_rWindow.getElement("basic.window.title").setText(getText("item.configuration.darkride.title"))
    t_rWindow.registerClient(me.getID())
    t_rWindow.registerProcedure(#_ConfigurationEventProc, me.getID(), #mouseUp)
    return m_sConfigurationWindowID
  end if
end
on _ConfigurationEventProc me, a_kEvent, a_sElemID, a_vParam
  tWndObj = getWindow(m_sConfigurationWindowID)
  if a_kEvent = #mouseUp then
    case a_sElemID of
      "darkride.dir.f.0", "darkride.dir.f.1", "darkride.dir.f.2", "darkride.dir.f.3", "darkride.dir.f.4", "darkride.dir.f.5":
        me.clickRadioButton("f", a_sElemID)
      "darkride.dir.r.0", "darkride.dir.r.1", "darkride.dir.r.2", "darkride.dir.r.3", "darkride.dir.r.4", "darkride.dir.r.5":
        me.clickRadioButton("r", a_sElemID)
      "darkride.dir.b.0", "darkride.dir.b.1", "darkride.dir.b.2", "darkride.dir.b.3", "darkride.dir.b.4", "darkride.dir.b.5":
        me.clickRadioButton("b", a_sElemID)
      "darkride.dir.l.0", "darkride.dir.l.1", "darkride.dir.l.2", "darkride.dir.l.3", "darkride.dir.l.4", "darkride.dir.l.5":
        me.clickRadioButton("l", a_sElemID)
      "darkride.dir.fl.0", "darkride.dir.fl.1":
        me.clickRadioButton("fl", a_sElemID)
      "darkride.dir.fr.0", "darkride.dir.fr.1":
        me.clickRadioButton("fr", a_sElemID)
      "darkride.dir.br.0", "darkride.dir.br.1":
        me.clickRadioButton("br", a_sElemID)
      "darkride.dir.bl.0", "darkride.dir.bl.1":
        me.clickRadioButton("bl", a_sElemID)
      "btn.ok":
        t_ar_data = [:]
        t_ar_data.addProp(#int, m_iRef)
        t_ar_data.addProp(#int, m_ar_configuration.count)
        repeat with i = 1 to m_ar_configuration.count
          t_sDir = m_ar_configuration.getPropAt(i)
          t_sValue = string(m_ar_configuration[i])
          t_ar_data.addProp(#str, t_sDir)
          t_ar_data.addProp(#str, t_sValue)
        end repeat
        getConnection("VMK").send("ConfigureItem", t_ar_data)
        removeWindow(m_sConfigurationWindowID)
      "close", "btn.cancel":
        removeWindow(m_sConfigurationWindowID)
        m_ar_configuration = m_ar_oldConfiguration
        m_bReady = 0
      "help":
        executeMessage(#open_help_page, "help.stuff.darkride", 1)
      otherwise:
        put a_sElemID

    end case
  end if
end
on activateDirection me, a_sDir, a_iNum
  tWndObj = getWindow(m_sConfigurationWindowID)
  t_iNum = 1
  repeat while 1
    a_sElemID = "darkride.dir." & a_sDir & "." & t_iNum
    t_rElem = tWndObj.getElement(a_sElemID)
    if objectp(t_rElem) then
      t_rElem.setProperty(#blend, 0)
      t_iNum = t_iNum + 1
      next repeat
    end if
    exit repeat
  end repeat
  t_iNum = 1
  repeat with t_iNum = 1 to a_iNum
    a_sElemID = "darkride.dir." & a_sDir & "." & t_iNum
    t_rElem = tWndObj.getElement(a_sElemID)
    if objectp(t_rElem) then
      t_rElem.setProperty(#blend, 100)
    end if
  end repeat
end
on clickRadioButton me, a_sDir, a_sElemID
  t_iLen = a_sElemID.length
  t_iValue = value(a_sElemID.char[t_iLen..t_iLen])
  if m_ar_configuration[a_sDir] = t_iValue then
    t_iValue = 0
  end if
  m_ar_configuration[a_sDir] = t_iValue
  m_bShowTiles = 1
  m_bReady = 0
  me.activateDirection(a_sDir, t_iValue)
end
on dialogWindowEvent me, t_dialogName, t_dialogEvent, t_rdata
  put "Dialog used" && t_dialogName
  case t_dialogName of
    "current_item_configuration":
      case t_dialogEvent of
        #Ok:
        #cancel:
        "help":

      end case
    "Item Configuration":
      case t_dialogEvent of
        #Ok:
        #cancel:
        "help":

      end case
    "item_configuration_used":
      case t_dialogEvent of
        #Ok:
        #cancel:
        "help":

      end case

  end case
  removeDialogWindow(t_dialogName)
end