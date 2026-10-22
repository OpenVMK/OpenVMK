-- Script
property m_rEngine
property m_rWindow
property m_iOwnPlayer
property m_iMaxTricks
property m_iTimePerTurn
property m_kGameMode
property m_sIndicator
property m_sSound

on construct this
  m_iOwnPlayer = 0
  m_iMaxTricks = 0
  m_iTimePerTurn = 30
  m_kGameMode = #none
  m_sIndicator = getUniqueID()
  createObject(m_sIndicator, "CCheckersGameSelectedPieceIndicator")
  m_sSound = getUniqueID()
  createObject(m_sSound, "CSoundObject")
  return 1
end
on deconstruct this
  if DialogWindowExists("CheckersIdleWarning") then
    removeDialogWindow("CheckersIdleWarning")
  end if
  if DialogWindowExists("CheckersTricksUsedWarning") then
    removeDialogWindow("CheckersTricksUsedWarning")
  end if
  if objectExists(m_sSound) then
    getObject(m_sSound).setLoopCount(0)
    getObject(m_sSound).StopSound()
    removeObject(m_sSound)
  end if
  if objectExists(m_sIndicator) then
    removeObject(m_sIndicator)
  end if
  if objectp(m_rWindow) then
    removeWindow(m_rWindow.getID())
    m_rWindow = VOID
  end if
  unregisterMessage("ResetRoomSound", this.getID())
  m_rEngine = VOID
  m_iOwnPlayer = 0
  return 1
end
on SetGameMode this, a_kMode
  if m_kGameMode = #none then
    m_kGameMode = a_kMode
    if a_kMode = #play then
      this.ShowInterface()
    end if
  else
    error(this, "Game mode already assigned!", #SetGameMode)
  end if
end
on GetGameMode this
  return m_kGameMode
end
on SetGameEngine this, a_rEngine
  m_rEngine = a_rEngine
  getObject(m_sIndicator).SetGameEngine(a_rEngine)
end
on GetGameEngine this
  return m_rEngine
end
on SetMaxTricks this, a_iMaxTricks
  m_iMaxTricks = a_iMaxTricks
end
on GetMaxTricks this
  return m_iMaxTricks
end
on SetTimePerTurn this, a_iTimePerTurn
  m_iTimePerTurn = a_iTimePerTurn
end
on GetTimePerTurn this
  return m_iTimePerTurn
end
on AddPlayer this, a_iAvatar, a_sName, a_iIndex
  if objectp(m_rWindow) then
    t_iPlayer = a_iIndex
    if a_sName = getObject(#session).get("name") then
      m_iOwnPlayer = t_iPlayer
    end if
    t_rElem = m_rWindow.getElement("player" & t_iPlayer)
    if objectp(t_rElem) then
      t_rElem.setText(a_sName)
    end if
    t_rElem = m_rWindow.getElement("player" & t_iPlayer & ".level")
    if objectp(t_rElem) then
      t_rElem.setText(EMPTY)
    end if
    t_rElem = m_rWindow.getElement("player" & t_iPlayer & ".score")
    if objectp(t_rElem) then
      t_rElem.setText(EMPTY)
    end if
    repeat with i = 1 to 12
      m_rWindow.getElement("player" & t_iPlayer & ".piece" & i).setProperty(#visible, 0)
      m_rWindow.getElement("player" & t_iPlayer & ".piece" & i).setProperty(#blend, 100)
    end repeat
  end if
end
on RemovePlayer this, a_iAvatarRef
end
on ShowInterface this
  t_sWnd = getUniqueID()
  if createWindow(t_sWnd, "vmk_checkers_ingame.window") then
    m_rWindow = getWindow(t_sWnd)
    m_rWindow.registerClient(this.getID())
    m_rWindow.registerProcedure(#EventProc, this.getID(), #mouseUp)
    m_rWindow.moveTo(0, 0)
  else
    error(this, "Failed to create window!", #ShowInterface)
    exit
  end if
  repeat with i = 1 to 2
    t_rPlayer = m_rEngine.GetPlayerDataByIndex(i)
    if not voidp(t_rPlayer) then
      t_rElem = m_rWindow.getElement("player" & i)
      if objectp(t_rElem) then
        t_rElem.setText(t_rPlayer[#name])
      end if
      t_rElem = m_rWindow.getElement("player" & i & ".level")
      if objectp(t_rElem) then
        t_rElem.setText(t_rPlayer[#level])
      end if
      t_rElem = m_rWindow.getElement("player" & i & ".score")
      if objectp(t_rElem) then
        t_rElem.setText(t_rPlayer[#score])
      end if
      t_rElem = m_rWindow.getElement("player" & i & ".giveup")
      if objectp(t_rElem) then
        t_rElem.setProperty(#visible, 0)
      end if
      repeat with j = 1 to 12
        m_rWindow.getElement("player" & i & ".piece" & j).setProperty(#visible, 0)
        m_rWindow.getElement("player" & i & ".piece" & j).setProperty(#blend, 100)
      end repeat
      if t_rPlayer[#name] = getObject(#session).get("name") then
        m_iOwnPlayer = i
      end if
    end if
  end repeat
end
on HideInterface this
  if objectp(m_rWindow) then
    removeWindow(m_rWindow.getID())
    m_rWindow = VOID
  end if
end
on NotifyGameStart this, a_bIsNewGame
  if objectp(m_rWindow) then
    i = 1
    repeat while 1
      t_rPlayer = m_rEngine.GetPlayerDataByIndex(i)
      if voidp(t_rPlayer) then
        exit repeat
      end if
      put "Player:" && t_rPlayer
      t_rElem = m_rWindow.getElement("player" & i)
      if objectp(t_rElem) then
        t_rElem.setText(t_rPlayer[#name])
      end if
      t_rElem = m_rWindow.getElement("player" & i & ".level")
      if objectp(t_rElem) then
        t_rElem.setText(t_rPlayer[#level])
      end if
      t_rElem = m_rWindow.getElement("player" & i & ".score")
      if objectp(t_rElem) then
        t_rElem.setText(t_rPlayer[#score])
      end if
      i = i + 1
    end repeat
  end if
  if a_bIsNewGame then
    t = createObject(getUniqueID(), "CCheckersGameDialog")
    t.open("vmk_checkers_gamestart.window")
    t.delay(5000, #Destroy)
  end if
  if getObject(#session).get("music") then
    t_rSound = getObject(m_sSound)
    if objectp(t_rSound) then
      t_rSound.Define("checkers-game-loop")
      t_rSound.SetSoundType("music")
      t_rSound.setLoopCount(1000)
      t_rSound.PlaySound()
    end if
  end if
  registerMessage("ResetRoomSound", this.getID(), #_ResetSounds)
end
on NotifyGameEnd this, a_iWinnerRef
  t_rSound = getObject(m_sSound)
  if objectp(t_rSound) then
    t_rSound.StopSound()
  end if
  unregisterMessage("ResetRoomSound", this.getID())
  t_iIndex = m_rEngine.GetPlayerIndexByAvatarRef(a_iWinnerRef)
  t = createObject(getUniqueID(), "CCheckersGameDialog")
  t.delay(5000, #Destroy)
  case t_iIndex of
    -1, 0:
      t.open("vmk_checkers_gameover_draw.window")
    1:
      t.open("vmk_checkers_gameover_blue.window")
    2:
      t.open("vmk_checkers_gameover_red.window")

  end case
  if m_iOwnPlayer = a_iWinnerRef or m_kGameMode = #watch then
    executeMessage("PlayFxSound", "checkers-win")
  else
    executeMessage("PlayFxSound", "checkers-loose")
  end if
end
on ShowTurn this, a_iAvatarRef
  if objectp(m_rWindow) then
    i = 1
    repeat while 1
      t_rElem = m_rWindow.getElement("player" & i & ".hilite")
      if objectp(t_rElem) then
        t_rElem.setProperty(#blend, 0)
        i = i + 1
        next repeat
      end if
      exit repeat
    end repeat
    t_iPlayer = m_rEngine.GetPlayerIndexByAvatarRef(a_iAvatarRef)
    t_bMyTurn = m_iOwnPlayer = t_iPlayer
    m_rWindow.getElement("quitturn").setProperty(#visible, 0)
    if t_iPlayer > 0 then
      m_rWindow.getElement("player" & t_iPlayer & ".hilite").setProperty(#blend, 100)
      m_rWindow.getElement("player" & t_iPlayer & ".giveup").setProperty(#visible, t_bMyTurn)
    end if
  end if
  getObject(m_sIndicator).ShowPosition(VOID, VOID)
end
on showmessage this, a_sText
  if objectp(m_rWindow) then
    m_rWindow.getElement("info.text").setText(a_sText)
  end if
end
on UpdateAllowedMoves this, a_mp_iPiece_ar_iTiles, a_bClearPrevious, a_bContinuedTurn
  if objectp(m_rWindow) then
    m_rWindow.getElement("quitturn").setProperty(#visible, a_bContinuedTurn)
  end if
end
on update this, a_iAvatarRef, a_iCapturedPieces, a_iSecondsRemaining, a_iMaxNumOfTricks, a_iTricksUsed
  if objectp(m_rWindow) then
    t_iPlayer = m_rEngine.GetPlayerIndexByAvatarRef(a_iAvatarRef)
    if t_iPlayer > 0 then
      m_rWindow.getElement("player" & t_iPlayer & ".timer").setText(string(a_iSecondsRemaining))
      t_rElem = m_rWindow.getElement("player" & t_iPlayer & ".timer.bar")
      t_iWidth = t_rElem.getProperty(#width)
      t_iHeight = t_rElem.getProperty(#height)
      t_rSprite = t_rElem.getProperty(#sprite)
      t_iState = float(a_iSecondsRemaining) / m_iTimePerTurn
      t_rColor = rgb(integer((1.0 - t_iState) * 255), integer(t_iState * 255), 32)
      t_rSprite.width = t_iState * 90
      t_rSprite.bgColor = t_rColor
      repeat with j = 1 to 12
        m_rWindow.getElement("player" & t_iPlayer & ".piece" & j).setProperty(#visible, j <= a_iCapturedPieces)
      end repeat
      repeat with j = 1 to a_iMaxNumOfTricks
        m_rWindow.getElement("player" & t_iPlayer & ".trick" & j).setProperty(#visible, j > a_iTricksUsed)
      end repeat
    end if
  end if
end
on EventProc this, a_kEvent, a_sElement, a_ptOffset, a_sWindow
  put a_sElement
  case a_sElement of
    "player" & m_iOwnPlayer & ".giveup":
      getConnection("VMK").send(950, [#integer: m_rEngine.m_iGameID, #integer: 1, #integer: 0])
    "quitturn":
      getConnection("VMK").send(950, [#integer: m_rEngine.m_iGameID, #integer: 3, #integer: 0])

  end case
  return 1
end
on IdleWarning this
  if not DialogWindowExists("CheckersIdleWarning") then
    t = createDialogWindow(this.getID(), "CheckersIdleWarning", 1, 0)
    t.setText(getText("checkers.idle.warning.title"), getText("checkers.idle.warning"), "Ok", "foo")
    t.show()
  end if
end
on IdleWarningCancel this
  if DialogWindowExists("CheckersIdleWarning") then
    removeDialogWindow("CheckersIdleWarning")
  end if
end
on MaxTricksUsedWarning this, a_iMaxTricks
  if not DialogWindowExists("CheckersTricksUsedWarning") then
    t = createDialogWindow(this.getID(), "CheckersTricksUsedWarning", 1, 0)
    t.setText(getText("checkers.max.tricks.used.title"), replaceChunks(getText("checkers.max.tricks.used"), "/$", string(a_iMaxTricks)), "Ok", "foo")
    t.show()
  end if
end
on _ResetSounds this
  t_bMusic = getObject(#session).get("music")
  t_bEffects = getObject(#session).get("fx")
  t_iVolume = getObject(#session).get("volume")
  t_rSound = getObject(m_sSound)
  if objectp(t_rSound) then
    if t_bMusic then
      t_rSound.Define("checkers-game-loop")
      t_rSound.SetSoundType("music")
      t_rSound.setLoopCount(1000)
      t_rSound.PlaySound()
    else
      t_rSound.StopSound()
    end if
  end if
end