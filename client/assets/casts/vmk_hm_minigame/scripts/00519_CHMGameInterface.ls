-- Script
property m_rGameEngine
property m_rAvatar
property m_bActive
property m_prepared
property m_mp_keyStatus
property m_mp_dirTable
property m_ar_iKeyTable
property m_iLastDirection
property m_iMovementCounter
property m_iMoveState
property m_iActionState
property m_iControlMethod
property m_ar_directions
property m_sKickWarningDlg
property m_ar_roundResults
property m_ar_Windows
property m_bActionActive

on construct me
  m_iLastDirection = VOID
  m_rAvatar = VOID
  m_prepared = 0
  m_bActive = 0
  m_bActionActive = 0
  m_iControlMethod = #keyboard
  m_iMovementCounter = 0
  m_iMoveState = #stopped
  m_iActionState = 0
  m_ar_directions = [0, 1, 2, 3, 4, 5, 6, 7]
  t_iConfig = me.getMyClientKeyConfiguration()
  case t_iConfig of
    1:
      m_ar_directions = [0, 1, 2, 3, 4, 5, 6, 7]
    2:
      m_ar_directions = [7, 0, 1, 2, 3, 4, 5, 6, 7]

  end case
  m_ar_iKeyTable = [:]
  m_ar_iKeyTable[#left] = 123
  m_ar_iKeyTable[#right] = 124
  m_ar_iKeyTable[#up] = 126
  m_ar_iKeyTable[#down] = 125
  m_ar_iKeyTable[#Action] = 48
  m_sKickWarningDlg = "HMG Kickout Timer"
  m_ar_roundResults = []
  m_ar_Windows = [:]
  m_ar_Windows["UI"] = VOID
  m_ar_Windows["GameOver"] = VOID
  m_ar_Windows["Results"] = VOID
  m_ar_Windows["Keys"] = VOID
  m_ar_Windows["Waiting"] = VOID
  m_ar_Windows["GetReady"] = VOID
  m_ar_Windows["Notice"] = VOID
  m_ar_Windows.sort()
  if textExists("hm.furniture") then
    t_ar_iListOfItems = value(getText("hm.furniture"))
    if listp(t_ar_iListOfItems) then
      t_rLoader = getObject("RoomItemAssetManager")
      repeat with t_iType in t_ar_iListOfItems
        t_rLoader.LoadCastLibsForType(t_iType)
      end repeat
    end if
  end if
  return 1
end
on deconstruct me
  if m_prepared then
    me.UnprepareInterface()
  end if
  return 1
end
on PrepareInterface me
  put "CHMGameInterface::PrepareInterface - begin"
  m_rGameEngine = getThread("minigame").getComponent()
  m_ar_roundResults = []
  m_mp_keyStatus = [-1, 0, 0]
  m_prepared = 1
  m_bActionActive = 0
  receiveUpdate(me.getID())
end
on UnprepareInterface me
  m_prepared = 0
  me.HideIdleKickWarning()
  removeUpdate(me.getID())
  repeat with i = 1 to m_ar_Windows.count
    m_rWindow = m_ar_Windows[i]
    if not (m_ar_Windows.getPropAt(i) = "GameOver") then
      if objectp(m_rWindow) then
        removeObject(m_rWindow.getID())
      end if
    end if
  end repeat
end
on setActive me, i_bActive
  m_bActive = i_bActive
end
on GetActive me
  return m_bActive
end
on GetGameEngine me
  return m_rGameEngine
end
on GetRoundResults me
  if m_ar_roundResults.count > 0 then
    return m_ar_roundResults[the count of m_ar_roundResults]
  else
    return []
  end if
end
on SetRoundResults me, i_ar_roundResults
  m_ar_roundResults.append(i_ar_roundResults)
end
on GetMoveDirections me
  return m_ar_directions
end
on SetMoveDirections me, i_ar_directions
  m_ar_directions = i_ar_directions
end
on GetTotalGhosts me, a_iTeam
  t_iGhosts = 0
  repeat with t_ar_roundResults in m_ar_roundResults
    case a_iTeam of
      1:
        t_iGhosts = t_iGhosts + t_ar_roundResults[2]
      2:
        t_iGhosts = t_iGhosts + t_ar_roundResults[3]

    end case
  end repeat
  return t_iGhosts
end
on ShowWindow me, t_sWindow, i_rParam
  tPos = m_ar_Windows.findPos(t_sWindow)
  if voidp(tPos) then
    return error(me, "HMG, no such window", #ShowWindow)
  end if
  t_rWindow = m_ar_Windows[t_sWindow]
  case t_sWindow of
    "UI":
    "Results":
    "GetReady":
      me.HideWindow("Waiting")
    "GameOver":
      me.HideWindow("Results")
    "Waiting":
      me.HideWindow("Results")
    "Keys":
    "Notice":
      me.HideWindow("Notice")

  end case
  if objectp(t_rWindow) then
    t_rWindow.Init(me, i_rParam)
    t_rWindow.show()
  else
    t_rWindow = createObject("HMG WindowContainer " & t_sWindow, "CHMWindow" & t_sWindow)
    t_rWindow.Init(me, i_rParam)
    t_rWindow.show()
    m_ar_Windows[t_sWindow] = t_rWindow
  end if
end
on HideWindow me, t_sWindow
  t_rWindow = me.HMGGetWindow(t_sWindow)
  if objectp(t_rWindow) then
    t_rWindow.hide()
  end if
end
on HMGGetWindow me, t_sWindow
  return m_ar_Windows.getaProp(t_sWindow)
end
on update me
  if me.getComponent().GameActive() then
    me.KeyboardScan()
  end if
end
on ShowIdleKickWarning me, a_iTime
  me.HideIdleKickWarning()
  if not DialogWindowExists(m_sKickWarningDlg) then
    createDialogWindow(me.getID(), m_sKickWarningDlg, 1)
  end if
  tDialog = getObject(m_sKickWarningDlg)
  tDialog.show()
  t_sTxt = getText("hmgame.kickouttimer_text_1") && a_iTime && getText("hmgame.kickouttimer_text_2")
  t_sTitle = getText("hmgame.kickouttimer_title")
  t_sBtn = getText("hmgame.kickouttimer_btnOK")
  t_sTxt = getText("hmg.dialog.kick.text1") && a_iTime && getText("hmg.dialog.kick.text2")
  t_sTitle = getText("hmg.dialog.kick.title")
  t_sBtn = getText("hmg.dialog.kick.ok")
  tDialog.setText(t_sTxt, t_sTitle, t_sBtn)
end
on HideIdleKickWarning me
  if DialogWindowExists(m_sKickWarningDlg) then
    removeDialogWindow(m_sKickWarningDlg)
  end if
end
on initAvatar me, t_bAgain
  m_rAvatar = VOID
  t_rMyPlayer = me.GetMyAvatar()
  if objectp(t_rMyPlayer) then
    t_rObj = getThread("room").getComponent()._AccessRoom()._AccessIndexed(t_rMyPlayer.GetParam("Owner"), "avatar")
    if objectp(t_rObj) then
      m_rAvatar = t_rObj.GetVisual()
    end if
  end if
end
on GetMyAvatar me
  t_ar_myObjects = getObject(#minigame_component).GetMyObjects()
  if t_ar_myObjects.count = 0 then
    return VOID
  else
    return t_ar_myObjects[1]
  end if
end
on KeyboardScan me
  if m_bActive then
    if voidp(m_rAvatar) then
      me.initAvatar(1)
    end if
    t_rMyPlayer = me.GetMyAvatar()
    if objectp(t_rMyPlayer) then
      t_rStatus = t_rMyPlayer.GetVisual().GetStatus()
    end if
    case m_iControlMethod of
      #mouse:
        t_ar_actions = me.ReadKeys()
        if t_ar_actions[1] <> -1 then
          m_iControlMethod = #keyboard
          if objectp(t_rStatus) then
            t_rStatus.changeControlMethod(m_iControlMethod)
          end if
        else
          t_ar_actions = me.ReadMouse()
        end if
      otherwise:
        if me.checkMouseAction() then
          m_iControlMethod = #mouse
          t_ar_actions = me.ReadKeys()
          if objectp(t_rStatus) then
            t_rStatus.changeControlMethod(m_iControlMethod)
          end if
        else
          t_ar_actions = me.ReadKeys()
        end if

    end case
    tDirection = t_ar_actions[1]
    if m_iControlMethod = #mouse then
      t_iDistance = t_ar_actions[3]
      if m_iLastDirection <> tDirection then
        if objectp(t_rStatus) then
          t_rStatus.setArrowStatus(m_iLastDirection, tDirection, m_iControlMethod)
        end if
        if t_iDistance < 10 then
          if not voidp(m_rAvatar) and tDirection > -1 then
            m_rAvatar.Actions([tDirection, tDirection, 0, 0, 0, 0, 0, 0, 0, 0])
          end if
          executeMessage(#SendMinigameAction, 4, [])
          m_iMoveState = #stopped
        else
          if t_iDistance < 32 then
            if not voidp(m_rAvatar) and tDirection > -1 then
              m_rAvatar.Actions([tDirection, tDirection, 0, 0, 0, 0, 0, 0, 0, 0])
            end if
            executeMessage(#SendMinigameAction, 3, [m_iLastDirection])
            m_iMoveState = #turn
          else
            executeMessage(#SendMinigameAction, 7, [tDirection])
            m_iMoveState = #move
          end if
        end if
        m_iLastDirection = tDirection
      end if
    else
      if m_iControlMethod = #keyboard then
        case m_iMoveState of
          #stopped:
            if tDirection <> -1 then
              m_iMoveState = #turn
              m_iLastDirection = tDirection
              me.KeyboardScan()
            end if
          #turn:
            if tDirection = -1 then
              if not voidp(m_rAvatar) and m_iLastDirection > -1 then
                m_rAvatar.Actions([m_iLastDirection, m_iLastDirection, 0, 0, 0, 0, 0, 0, 0, 0])
              end if
              executeMessage(#SendMinigameAction, 3, [m_iLastDirection])
              m_iMoveState = #stopped
              m_iMovementCounter = 0
            else
              if m_iLastDirection <> tDirection then
                m_iLastDirection = tDirection
              end if
              m_iMovementCounter = m_iMovementCounter + 1
              if m_iMovementCounter > 5 then
                m_iMoveState = #move
                m_mp_keyStatus = [-1, 0, 0]
                m_iLastDirection = -1
                me.KeyboardScan()
              end if
            end if
          #move:
            if t_ar_actions <> m_mp_keyStatus then
              if m_iLastDirection <> tDirection then
                if objectp(t_rStatus) then
                  t_rStatus.setArrowStatus(m_iLastDirection, tDirection, m_iControlMethod)
                end if
                if tDirection = -1 then
                  executeMessage(#SendMinigameAction, 4, [])
                  m_iMoveState = #stopped
                  m_iMovementCounter = 0
                else
                  if not voidp(m_rAvatar) and tDirection > -1 then
                    m_rAvatar.Actions([tDirection, tDirection, 0, 0, 0, 0, 0, 0, 0, 0])
                  end if
                  executeMessage(#SendMinigameAction, 7, [tDirection])
                  m_iRotationalDirection = tDirection
                end if
              end if
              m_iLastDirection = tDirection
            end if
            m_mp_keyStatus = t_ar_actions

        end case
      end if
    end if
    if t_ar_actions[2] then
      if t_ar_actions[2] <> m_iActionState then
        if objectp(t_rMyPlayer) then
          if not t_rMyPlayer.GetFactor().getPossessed() then
            if not m_bActionActive then
              me.startAction()
            end if
          else
            me.stopAction()
          end if
        else
          me.stopAction()
        end if
      end if
    end if
    m_iActionState = t_ar_actions[2]
  end if
end
on stopAction me
  if m_bActionActive then
    executeMessage(#SendMinigameAction, 8, [])
  end if
  m_bActionActive = 0
end
on startAction me
  executeMessage("PlayInterfaceSound", "vacuumcleaner-is-used")
  removeTimeout("hmg_stop_action")
  createTimeout("hmg_stop_action", 1000, #stopAction, me.getID(), VOID, 1)
  if not m_bActionActive then
    executeMessage(#SendMinigameAction, 2, [])
  end if
  m_bActionActive = 1
end
on checkMouseAction me
  if _mouse.mouseDown then
    if _mouse.mouseH > 0 and _mouse.mouseH < 800 then
      if _mouse.mouseV > 0 and _mouse.mouseV < 560 then
        return 1
      end if
    end if
  end if
  return 0
end
on ReadMouse me
  t_action = _key.keyPressed(48)
  if voidp(m_rAvatar) then
    return [-1, t_action or the controlDown of _key or the shiftDown of _key, 0]
  else
    if voidp(m_rAvatar.m_rCanvasSpr) then
      return [-1, t_action or the controlDown of _key or the shiftDown of _key, 0]
    end if
  end if
  t_pAvatarPos = m_rAvatar.m_rCanvasSpr.loc
  t_vAvatarPos = vector(t_pAvatarPos.locH, t_pAvatarPos.locV, 0)
  t_vMousePos = vector(_mouse.mouseH, _mouse.mouseV, 0)
  t_vDirection = t_vMousePos - t_vAvatarPos
  t_iLength = t_vDirection.length
  t_vDirection.normalize()
  t_vZero = vector(0, -1, 0)
  ang = t_vDirection.angleBetween(t_vZero)
  t_vCross = t_vDirection.cross(t_vZero)
  if t_vCross.z < 0 then
    a = ang
  else
    a = 360 - ang
  end if
  t_iDir = integer(a + 22) / 45
  if t_iDir < 0 then
    t_iDir = 7
  end if
  if t_iDir > 7 then
    t_iDir = 0
  end if
  t_ar_dirMap = [0, 1, 2, 3, 4, 5, 6, 7]
  t_iDir = t_ar_dirMap[t_iDir + 1]
  return [t_iDir, t_action or the controlDown of _key or the shiftDown of _key, t_iLength]
end
on ReadKeys me
  t_left = 0
  t_up = 0
  t_right = 0
  t_down = 0
  t_action = 0
  t_bNumPad = 1
  case 1 of
    _key.keyPressed(91):
      t_iDir = 0
    _key.keyPressed(92):
      t_iDir = 1
    _key.keyPressed(88):
      t_iDir = 2
    _key.keyPressed(85):
      t_iDir = 3
    _key.keyPressed(84):
      t_iDir = 4
    _key.keyPressed(83):
      t_iDir = 5
    _key.keyPressed(86):
      t_iDir = 6
    _key.keyPressed(89):
      t_iDir = 7
    otherwise:
      t_bNumPad = 0
      t_up = _key.keyPressed(m_ar_iKeyTable.up) * 1
      t_right = _key.keyPressed(m_ar_iKeyTable.right) * 2
      t_down = _key.keyPressed(m_ar_iKeyTable.down) * 4
      t_left = _key.keyPressed(m_ar_iKeyTable.left) * 8
      t_iState = t_up + t_right + t_down + t_left
      case t_iState of
        0:
          t_iDir = -1
        1:
          t_iDir = 1
        2:
          t_iDir = 3
        3:
          t_iDir = 2
        4:
          t_iDir = 5
        5:
          t_iDir = -1
        6:
          t_iDir = 4
        7:
          t_iDir = 3
        8:
          t_iDir = 7
        9:
          t_iDir = 0
        10:
          t_iDir = -1
        11:
          t_iDir = 1
        12:
          t_iDir = 6
        13:
          t_iDir = 7
        14:
          t_iDir = 5
        15:
          t_iDir = -1
        otherwise:
          t_iDir = -1

      end case
      if t_iDir > -1 then
        t_iDir = m_ar_directions[t_iDir + 1]
      end if

  end case
  t_action = _key.keyPressed(m_ar_iKeyTable.Action)
  return [t_iDir, t_action or the controlDown of _key or the shiftDown of _key, t_bNumPad]
end
on getMyClientKeyConfiguration me
  t_ar_config = me._getClientKeyConfiguration()
  t_sPlayerName = getObject(#session).get("name")
  if t_sPlayerName <> 0 then
    return t_ar_config[t_sPlayerName]
  end if
  return 1
end
on setClientKeyConfiguration me, t_iState
  t_ar_config = me._getClientKeyConfiguration()
  t_sPlayerName = getObject(#session).get("name")
  if t_sPlayerName <> 0 then
    t_ar_config[t_sPlayerName] = t_iState
    setPref("vmk_hmg", string(t_ar_config))
  end if
end
on _getClientKeyConfiguration me
  t_ar_config = [:]
  t_sPref = getPref("vmk_hmg")
  t_bAllowTutorials = 1
  if stringp(t_sPref) then
    t_ar_config = value(t_sPref)
  end if
  return t_ar_config
end
on fixAntialisingImgElement me, t_sGameInterfaceWindow, tElemName, forceupdate, defaultImage, bDebug
  tWndObj = getWindow(t_sGameInterfaceWindow)
  if tWndObj <> 0 then
    tElem = tWndObj.getElement(tElemName)
    if tElem <> 0 then
      tElem.pParams.deleteProp(#ink)
      tElem.pParams.deleteProp(#color)
      tElem.pParams.deleteProp(#bgColor)
      tSprite = tElem.getProperty(#sprite)
      if tSprite <> 0 then
        tSprite.foreColor = 255
        tSprite.bgColor = tElem.pFontData[#bgColor]
        tSprite.ink = 36
      end if
      if not voidp(defaultImage) then
        tElem.feedImage(defaultImage)
      end if
      if forceupdate then
        tElem.render()
      end if
    end if
  end if
end
on SetNumber me, t_sWndName, tElemName, tmember
  tmember = member(tmember)
  if tmember.number <= 0 then
    return 0
  end if
  tWndObj = getWindow(t_sWndName)
  if tWndObj <> 0 then
    tElem = tWndObj.getElement(tElemName)
    if tElem <> 0 then
      tSprite = tElem.getProperty(#sprite)
      if tSprite <> 0 then
        tSprite.ink = 36
        tSprite.member.image = tmember.image
        tSprite.member.regPoint = tmember.regPoint
        tSprite.width = tmember.width
        tSprite.height = tmember.height
      end if
    end if
  end if
end
on fixAntialisingTextElement me, i_sWndName, tElemName, forceupdate, setText, bDebug, a_rColor
  tWndObj = getWindow(i_sWndName)
  if tWndObj <> 0 then
    tElem = tWndObj.getElement(tElemName)
    if tElem <> 0 then
      if not voidp(a_rColor) then
        put "Change color"
        tElem.pFontData[#color] = a_rColor
      end if
      tElem.pParams.deleteProp(#ink)
      tElem.pParams.deleteProp(#color)
      tElem.pParams.deleteProp(#bgColor)
      tSprite = tElem.getProperty(#sprite)
      if tSprite <> 0 then
        tSprite.foreColor = 255
        tSprite.bgColor = tElem.pFontData[#bgColor]
        tSprite.ink = 36
      end if
      if not voidp(setText) then
        tElem.setText(setText)
      end if
      if forceupdate then
        tElem.render()
      end if
    end if
  end if
end
on setButtonState me, t_sWindowTitle, t_elemName, t_state
  tWndObj = getWindow(t_sWindowTitle)
  if tWndObj <> 0 then
    t_Elem = tWndObj.getElement(t_elemName)
    if t_Elem <> 0 then
      case t_state of
        1:
          t_Elem.setProperty(#cursor, ["cursor.finger", "cursor.finger.mask"])
          t_Elem.Activate()
        0:
          t_Elem.setProperty(#cursor, #arrow)
          t_Elem.deactivate()

      end case
    end if
  end if
end