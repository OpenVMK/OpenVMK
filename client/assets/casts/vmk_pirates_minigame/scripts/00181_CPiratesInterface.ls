-- Script
property m_broadsideActive
property m_blinkTimer
property m_blinkFrame
property m_rNavigationTargetSprite
property m_navigatableCursor
property m_shootableCursor
property m_rGraphicCursorSprite
property m_rPrepareSplashBgSprite
property m_rPrepareSplashSprite
property m_prepared
property m_ar_lastClicks
property m_lastShoot
property m_shootDelay
property m_dblClickDelay
property m_piratesBar
property m_lasthealth
property m_lastammo
property m_sMidStageWndTitle
property m_sGameStartString
property m_sEndGameDialog
property m_keydownscript
property m_mousedownscript
property m_myShip
property m_sPreGameWndTitle
property m_mp_shootState
property m_iShootPntrDelay
property m_lastRedScore
property m_lastBlueScore
property m_rTimerDisplay
property m_bKeyIsDown
property m_prepareLastShow
property m_sKickWarningDlg
property m_iTimerBelow30
global g_profInterface
global g_gfxCbNormal
global g_gfxCbRed
global g_gfxCbWhite
global g_gfxCbFire
global g_gfxPickupAmmo
global g_gfxPickupHealth

on construct me
  m_prepared = 0
  m_ar_lastClicks = []
  m_piratesBar = VOID
  m_lasthealth = 0
  m_lastammo = 0
  m_lastRedScore = 0
  m_lastBlueScore = 0
  m_sMidStageWndTitle = "PiratesMidstage"
  m_sGameStartString = EMPTY
  m_sEndGameDialog = "PiratesEndGame"
  m_sPreGameWndTitle = "PiratesPreGame"
  m_lastShoot = the milliSeconds
  m_shootDelay = getVariableValue("interface.shootdelay")
  m_dblClickDelay = getVariableValue("interface.dblclickdelay")
  m_iShootPntrDelay = getVariableValue("interface.shootpntrdelay")
  m_keydownscript = EMPTY
  m_mousedownscript = EMPTY
  m_mp_shootState = [#state: #none, #time: the milliSeconds]
  m_rTimerDisplay = VOID
  m_sKickWarningDlg = "PiratesKickWarning"
  return 1
end
on deconstruct me
  if m_prepared then
    me.UnprepareRoom()
  end if
  return 1
end
on UncompressGraphics me
  temp = getMember("sunk0000").image
  temp = getMember("sunk0020").image
  temp = getMember("sunk0045").image
  temp = getMember("sunk0070").image
  temp = getMember("sunk0090").image
  temp = getMember("sunk0110").image
  temp = getMember("sunk0130").image
  temp = getMember("sunk0155").image
  temp = getMember("sunk0180").image
  temp = getMember("sunk0205").image
  temp = getMember("sunk0225").image
  temp = getMember("sunk0245").image
  temp = getMember("sunk0265").image
  temp = getMember("sunk0295").image
  temp = getMember("sunk0320").image
  temp = getMember("sunk0340").image
  repeat with i = 0 to 35
    n = i * 10
    tsNumber = "0"
    if n < 100 then
      tsNumber = tsNumber & "0"
    end if
    if n < 10 then
      tsNumber = tsNumber & "0"
    end if
    tsNumber = tsNumber & n
    temp = getMember("ship" & tsNumber).image
    temp = getMember("redsail" & tsNumber).image
    temp = getMember("bluesail" & tsNumber).image
  end repeat
  temp = getMember("cannonball_shrapnel").image
  temp = getMember("cannonball_invincible").image
  temp = getMember("cannonball_broadside").image
  temp = getMember("health.pickup").image
  temp = getMember("ammo.pickup").image
  temp = getMember("moonbeam").image
  repeat with tFrame in getVariableValue("puff").framelist
    temp = getMember(tFrame).image
  end repeat
  repeat with tFrame in getVariableValue("explosion").framelist
    temp = getMember(tFrame).image
  end repeat
  repeat with tFrame in getVariableValue("splash").framelist
    temp = getMember(tFrame).image
  end repeat
  t_ar_sFireAnim = ["fire_01", "fire_02", "fire_03", "fire_04", "fire_05", "fire_06", "fire_07", "fire_08", "fire_09", "fire_10", "fire_11", "fire_12", "fire_13", "fire_14", "fire_15"]
  repeat with tFrame in t_ar_sFireAnim
    temp = getMember(tFrame).image
  end repeat
  temp = getMember("oilspill").image
  temp = getMember("arrow.blue_10").image
  temp = getMember("arrow.blue_25").image
  temp = getMember("arrow.blue_40").image
  temp = getMember("arrow.blue_55").image
  temp = getMember("arrow.blue_70").image
  temp = getMember("arrow.blue_85").image
  temp = getMember("arrow.blue_100").image
  temp = getMember("arrow.red_10").image
  temp = getMember("arrow.red_25").image
  temp = getMember("arrow.red_40").image
  temp = getMember("arrow.red_55").image
  temp = getMember("arrow.red_70").image
  temp = getMember("arrow.red_85").image
  temp = getMember("arrow.red_100").image
end
on PrepareRoom me
  executeMessage(#HidePPSInterface)
  me.UncompressGraphics()
  g_gfxCbFire = getMember("cannonball_shrapnel")
  g_gfxCbWhite = getMember("cannonball_invincible")
  g_gfxCbRed = getMember("cannonball_broadside")
  g_gfxCbNormal = getMember("cannonball")
  g_gfxPickupAmmo = getMember("ammo.pickup")
  g_gfxPickupHealth = getMember("health.pickup")
  m_lastClick = VOID
  m_navigatableCursor = getMember("can_move")
  m_shootableCursor = getMember("can_move_and_shoot")
  m_rNavigationTargetSprite = sprite(reserveSprite(me.getID()))
  m_rNavigationTargetSprite.member = getMember("heading_towards")
  m_rNavigationTargetSprite.locZ = getVariableValue("window.default.locz") - 102
  m_rNavigationTargetSprite.loc = point(1000, 1000)
  m_rNavigationTargetSprite.ink = 36
  m_rGraphicCursorSprite = sprite(reserveSprite(me.getID()))
  m_rGraphicCursorSprite.member = VOID
  m_rGraphicCursorSprite.locZ = getVariableValue("window.default.locz") - 102
  m_rGraphicCursorSprite.ink = 36
  m_rPrepareSplashBgSprite = sprite(reserveSprite(me.getID()))
  m_rPrepareSplashBgSprite.member = VOID
  m_rPrepareSplashBgSprite.ink = 33
  m_rPrepareSplashBgSprite.locZ = getVariableValue("window.default.locz") - 2
  m_rPrepareSplashBgSprite.loc = point((the stage).image.width / 2, (the stage).image.height / 2)
  m_rPrepareSplashSprite = sprite(reserveSprite(me.getID()))
  m_rPrepareSplashSprite.member = VOID
  m_rPrepareSplashSprite.locZ = getVariableValue("window.default.locz") - 1
  m_rPrepareSplashSprite.loc = point((the stage).image.width / 2, (the stage).image.height / 2)
  executeMessage(#ui_hide)
  m_piratesBar = createObject("Pirates Chat", "CPiratesMessageBar")
  m_piratesBar.showMessageBar()
  m_piratesBar.setEditable(0)
  m_rTimerDisplay = createObject("Pirates Timer Display", "CTimerDisplay")
  m_iTimerBelow30 = 0
  m_mousedownscript = the mouseDownScript
  set the mouseDownScript to "PiratesMouseDown"
  receiveUpdate(me.getID())
  m_myShip = VOID
  m_mp_shootState = [#state: #none, #time: the milliSeconds]
  m_bKeyIsDown = 0
  m_prepared = 1
end
on UnprepareRoom me
  set the mouseDownScript to m_mousedownscript
  removeUpdate(me.getID())
  executeMessage(#ui_show)
  releaseSprite(m_rNavigationTargetSprite.spriteNum)
  releaseSprite(m_rGraphicCursorSprite.spriteNum)
  releaseSprite(m_rPrepareSplashSprite.spriteNum)
  releaseSprite(m_rPrepareSplashBgSprite.spriteNum)
  removeObject(m_piratesBar.getID())
  if not voidp(m_rTimerDisplay) then
    removeObject(m_rTimerDisplay.getID())
  end if
  if me.MidstageWindowExists() then
    me.RemoveMidstageWindow()
  end if
  if DialogWindowExists(m_sKickWarningDlg) then
    removeDialogWindow(m_sKickWarningDlg)
  end if
  m_prepared = 0
end
on ShowPreGame me
  if windowExists(m_sPreGameWndTitle) then
    removeWindow(m_sMidStageWndTitle)
  end if
  createWindow(m_sPreGameWndTitle, "vmk_pirates_modal.window")
  tWndObj = getWindow(m_sPreGameWndTitle)
  tWnd = getWindow(m_sPreGameWndTitle)
  tWnd.merge("pirates_start.window")
  tWnd.center()
  tWnd.getElement("pirates.dialog.hd").hide()
end
on HidePreGame me
  removeWindow(m_sPreGameWndTitle)
end
on DisplayStageEnd me, a_sTitle, a_ar_sPlayers, a_ar_iScores, a_ar_iTeamScores, a_iCountStart
  if windowExists(m_sMidStageWndTitle) then
    removeWindow(m_sMidStageWndTitle)
  end if
  createWindow(m_sMidStageWndTitle, "vmk_pirates_modal.window")
  tWndObj = getWindow(m_sMidStageWndTitle)
  tWnd = getWindow(m_sMidStageWndTitle)
  tWnd.merge("pirates_stageend.window")
  tWnd.getElement("pirates.dialog.hd").hide()
  tWnd.getElement("player1").setText(a_ar_sPlayers[1])
  tWnd.getElement("player2").setText(a_ar_sPlayers[2])
  tWnd.getElement("player3").setText(a_ar_sPlayers[3])
  tWnd.getElement("player4").setText(a_ar_sPlayers[4])
  tWnd.getElement("player5").setText(a_ar_sPlayers[5])
  tWnd.getElement("player6").setText(a_ar_sPlayers[6])
  tWnd.getElement("player7").setText(a_ar_sPlayers[7])
  tWnd.getElement("player8").setText(a_ar_sPlayers[8])
  tWnd.getElement("player1score").setText(a_ar_iScores[1])
  tWnd.getElement("player2score").setText(a_ar_iScores[2])
  tWnd.getElement("player3score").setText(a_ar_iScores[3])
  tWnd.getElement("player4score").setText(a_ar_iScores[4])
  tWnd.getElement("player5score").setText(a_ar_iScores[5])
  tWnd.getElement("player6score").setText(a_ar_iScores[6])
  tWnd.getElement("player7score").setText(a_ar_iScores[7])
  tWnd.getElement("player8score").setText(a_ar_iScores[8])
  tWnd.getElement("team1score").setText(a_ar_iTeamScores[1])
  tWnd.getElement("team2score").setText(a_ar_iTeamScores[2])
  tWndObj.center()
end
on DisplayGameEnd me, a_sTitle, a_ar_sPlayers, a_ar_iScores, a_ar_iTeamScores, a_iTimeRemaining, a_iWinner
  if windowExists(m_sMidStageWndTitle) then
    removeWindow(m_sMidStageWndTitle)
  end if
  createWindow(m_sMidStageWndTitle, "vmk_pirates_modal.window")
  tWndObj = getWindow(m_sMidStageWndTitle)
  tWnd = getWindow(m_sMidStageWndTitle)
  tWnd.merge("vmk_pirates_winner.window")
  case a_iWinner of
    1:
      tWnd.getElement("winner.blue").hide()
      tWnd.getElement("winner.red").show()
    2:
      tWnd.getElement("winner.red").hide()
      tWnd.getElement("winner.blue").show()

  end case
  if m_myShip.GetParam("Team") = a_iWinner then
    me.getComponent().GetSoundPlayer().PlayVoiceOver(#OwnTeamWins)
  else
    me.getComponent().GetSoundPlayer().PlayVoiceOver(#OtherTeamWins)
  end if
  tWnd.getElement("pirates.dialog.hd").hide()
  tWnd.getElement("player1").setText(a_ar_sPlayers[1])
  tWnd.getElement("player2").setText(a_ar_sPlayers[2])
  tWnd.getElement("player3").setText(a_ar_sPlayers[3])
  tWnd.getElement("player4").setText(a_ar_sPlayers[4])
  tWnd.getElement("player5").setText(a_ar_sPlayers[5])
  tWnd.getElement("player6").setText(a_ar_sPlayers[6])
  tWnd.getElement("player7").setText(a_ar_sPlayers[7])
  tWnd.getElement("player8").setText(a_ar_sPlayers[8])
  tWnd.getElement("player1score").setText(a_ar_iScores[1])
  tWnd.getElement("player2score").setText(a_ar_iScores[2])
  tWnd.getElement("player3score").setText(a_ar_iScores[3])
  tWnd.getElement("player4score").setText(a_ar_iScores[4])
  tWnd.getElement("player5score").setText(a_ar_iScores[5])
  tWnd.getElement("player6score").setText(a_ar_iScores[6])
  tWnd.getElement("player7score").setText(a_ar_iScores[7])
  tWnd.getElement("player8score").setText(a_ar_iScores[8])
  tWnd.getElement("team1score").setText(a_ar_iTeamScores[1])
  tWnd.getElement("team2score").setText(a_ar_iTeamScores[2])
  tWndObj.center()
  me.getComponent().GetSoundPlayer().PlayFanfare()
end
on RemoveMidstageWindow me
  removeWindow(m_sMidStageWndTitle)
end
on MidstageWindowExists me
  return windowExists(m_sMidStageWndTitle)
end
on DisplayEndGameVictoryNotification me, a_bWinner
end
on ShowPrepare me, a_iTimeRemaining
  m_rPrepareSplashBgSprite.member = member("pirates.start.bg")
  if a_iTimeRemaining < 5 then
    if a_iTimeRemaining > 3 then
      m_rPrepareSplashSprite.member = member("pirates.start.3")
      if m_prepareLastShow <> 3 then
        me.getComponent().GetSoundPlayer().PlayCountDown(1)
      end if
      m_prepareLastShow = 3
    else
      if a_iTimeRemaining > 2 then
        m_rPrepareSplashSprite.member = member("pirates.start.2")
        if m_prepareLastShow <> 2 then
          me.getComponent().GetSoundPlayer().PlayCountDown(2)
        end if
        m_prepareLastShow = 2
      else
        if a_iTimeRemaining > 1 then
          m_rPrepareSplashSprite.member = member("pirates.start.1")
          if m_prepareLastShow <> 1 then
            me.getComponent().GetSoundPlayer().PlayCountDown(3)
          end if
          m_prepareLastShow = 1
        else
          if a_iTimeRemaining >= 0 then
            m_rPrepareSplashSprite.member = member("pirates.start.fight")
            if m_prepareLastShow <> 0 then
              me.getComponent().GetSoundPlayer().PlayCountDown(4)
            end if
            m_prepareLastShow = 0
          else
            m_prepareLastShow = 5
          end if
        end if
      end if
    end if
  end if
end
on HidePrepare me
  m_rPrepareSplashBgSprite.member = VOID
  m_rPrepareSplashSprite.member = VOID
end
on GetMyShip me
  t_ar_myObjects = getObject(#minigame_component).GetMyObjects()
  if t_ar_myObjects.count = 0 then
    return VOID
  else
    return t_ar_myObjects[1]
  end if
end
on SetMyShip me, a_rMyShip
  m_myShip = a_rMyShip
end
on SetTimerDisplay me, a_iSecondsLeft
  if not m_iTimerBelow30 and a_iSecondsLeft <= 30 then
    me.getComponent().GetSoundPlayer().PlayVoiceOver(#TimeLow)
    m_iTimerBelow30 = 1
  end if
  if a_iSecondsLeft > 30 then
    m_iTimerBelow30 = 0
  end if
  m_rTimerDisplay.show(a_iSecondsLeft)
end
on HideTimerDisplay me
  m_rTimerDisplay.hide()
end
on HideNavigationTarget me
  m_rNavigationTargetSprite.loc = point(-1000, -1000)
end
on enableExitButton me, a_bVisible
  m_piratesBar.enableExitButton(a_bVisible)
end
on dialogWindowEvent me, t_dialogName, t_dialogEvent
end
on ShowIdleKickWarning me, a_iTime
  if not DialogWindowExists(m_sKickWarningDlg) then
    createDialogWindow(me.getID(), m_sKickWarningDlg, 1)
  end if
  tDialog = getObject(m_sKickWarningDlg)
  tDialog.show()
  tDialog.setText(getText("pirates.kickouttimer_text_1") && a_iTime && getText("pirates.kickouttimer_text_2"), getText("pirates.kickouttimer_title"), getText("pirates.kickouttimer_btnOK"))
end
on HideIdleKickWarning me
  if DialogWindowExists(m_sKickWarningDlg) then
    removeDialogWindow(m_sKickWarningDlg)
  end if
end
on HandleKeyDown me, a_iDirection
  if not voidp(m_myShip) then
    if m_myShip.GetParam("Ammo") > 0 then
      if a_iDirection < 0 then
        if m_mp_shootState.state = #left then
          if the milliSeconds - m_lastShoot >= m_shootDelay then
            executeMessage(#SendMinigameAction, 4, [0])
            m_lastShoot = the milliSeconds
            me.getComponent().GetSoundPlayer().PlayVoiceOverSeldom(#fire)
          end if
        else
          if m_mp_shootState.state <> #left then
            me.getComponent().GetSoundPlayer().PlayPreshoot()
          end if
          m_mp_shootState.state = #left
          if not voidp(m_myShip) then
            m_myShip.GetVisual().MarkShoot(#left)
          end if
        end if
        m_mp_shootState.time = the milliSeconds
      else
        if a_iDirection > 0 then
          if m_mp_shootState.state = #right then
            if the milliSeconds - m_lastShoot >= m_shootDelay then
              executeMessage(#SendMinigameAction, 4, [1])
              m_lastShoot = the milliSeconds
              me.getComponent().GetSoundPlayer().PlayVoiceOverSeldom(#fire)
            end if
          else
            if m_mp_shootState.state <> #right then
              me.getComponent().GetSoundPlayer().PlayPreshoot()
            end if
            m_mp_shootState.state = #right
            if not voidp(m_myShip) then
              m_myShip.GetVisual().MarkShoot(#right)
            end if
          end if
          m_mp_shootState.time = the milliSeconds
        end if
      end if
    else
      me.getComponent().GetSoundPlayer().PlayVoiceOver(#OutOfAmmo)
    end if
  end if
  if not timeoutExists("HideIdleWarning") then
    createTimeout("HideIdleWarning", 700, #HideIdleKickWarning, me.getID(), VOID, 1)
  end if
end
on mouseDown me, a_loc
  if me.getComponent().GameOn() then
    if a_loc.inside(rect(0, 0, (the stage).image.width, (the stage).image.height - 34)) then
      m_ar_lastClicks.append([#loc: a_loc, #time: the milliSeconds])
    end if
  end if
end
on update me
  tt = the milliSeconds
  case 1 of
    keyPressed(123):
      t_direction = -1
    keyPressed(124):
      t_direction = 1
    otherwise:
      t_direction = 0

  end case
  if t_direction <> 0 then
    if not m_bKeyIsDown then
      me.HandleKeyDown(t_direction)
      m_bKeyIsDown = 1
    end if
  else
    m_bKeyIsDown = 0
  end if
  if windowExists(m_sPreGameWndTitle) then
  end if
  if voidp(m_myShip) then
    m_myShip = me.GetMyShip()
  end if
  if tt - m_mp_shootState.time > m_iShootPntrDelay and m_mp_shootState.state <> #none then
    m_myShip.GetVisual().MarkShoot(#none)
    m_mp_shootState.state = #none
  end if
  if not voidp(m_myShip) then
    tAmmo = m_myShip.GetParam("Ammo")
    tHealth = m_myShip.GetParam("Health")
    if tAmmo <> m_lastammo then
      m_piratesBar.setAmmoindicator(tAmmo)
    end if
    if tHealth <> m_lasthealth then
      m_piratesBar.setHealthIndicator(tHealth)
    end if
    m_lastammo = tAmmo
    m_lasthealth = tHealth
  end if
  tScoreBoard = getThread("minigame").getComponent().GetObjectsByCode(9)
  if tScoreBoard.count = 1 then
    tRedScore = tScoreBoard[1].GetFactor().GetTeam1Score()
    tBlueScore = tScoreBoard[1].GetFactor().GetTeam2Score()
    if tRedScore <> m_lastRedScore then
      m_piratesBar.setRedScore(tRedScore)
    end if
    if tBlueScore <> m_lastBlueScore then
      m_piratesBar.setBlueScore(tBlueScore)
    end if
    m_lastRedScore = tRedScore
    m_lastBlueScore = tBlueScore
  end if
  if not voidp(m_myShip) then
    tCurPoint = intvector(InverseAxonometricPosition(the mouseLoc).locH, InverseAxonometricPosition(the mouseLoc).locV, 0)
    if (m_piratesBar.getBroadsideStatus() or m_myShip.GetFactor().IsShootable(tCurPoint)) and tt - m_lastShoot > m_shootDelay then
      if m_rGraphicCursorSprite.member <> m_shootableCursor then
        m_rGraphicCursorSprite.member = m_shootableCursor
      end if
    else
      if m_rGraphicCursorSprite.member <> m_navigatableCursor then
        m_rGraphicCursorSprite.member = m_navigatableCursor
      end if
    end if
    m_rGraphicCursorSprite.loc = the mouseLoc
    m_myShip.GetVisual().MarkMyShip(1)
    m_myShip.GetFactor().MarkMyShip(1)
    if m_myShip.GetParam("Ammo") > 0 then
      if tt - m_lastShoot <= m_shootDelay then
        m_myShip.GetVisual().SetReloadStatus(float(tt - m_lastShoot) / float(m_shootDelay))
      else
        m_myShip.GetVisual().SetReloadStatus(1.0)
      end if
    else
      m_myShip.GetVisual().SetReloadStatus(0.0)
    end if
  end if
  if me.getComponent().GameOn() then
    if m_ar_lastClicks.count > 0 then
      if the milliSeconds - m_ar_lastClicks[1].time > m_dblClickDelay then
        repeat while m_ar_lastClicks.count > 0
          if m_ar_lastClicks.count > 1 then
            me.dblClick(m_ar_lastClicks[2].loc)
            m_ar_lastClicks.deleteAt(1)
            m_ar_lastClicks.deleteAt(1)
            next repeat
          end if
          me.singleClick(m_ar_lastClicks[1].loc)
          m_ar_lastClicks.deleteAt(1)
        end repeat
        m_ar_lastClicks = []
      end if
      if not timeoutExists("HideIdleWarning") then
        createTimeout("HideIdleWarning", 700, #HideIdleKickWarning, me.getID(), VOID, 1)
      end if
    end if
  end if
  g_profInterface = the milliSeconds - tt
end
on dblClick me, a_loc
  tTarget = InverseAxonometricPosition(a_loc)
  if not voidp(m_myShip) then
    if not m_myShip.GetFactor().IsFloatingWreck() and m_myShip.getObject().GetParam("Ammo") > 0 and the milliSeconds - m_lastShoot >= m_shootDelay then
      tDirectionVector = m_myShip.GetFactor().GetDirectionVector()
      tPos = m_myShip.GetParam("WorldPosition")
      tTestVector = vector(tTarget.locH, tTarget.locV, 0) - vector(tPos.x, tPos.y, tPos.z)
      tCross = tDirectionVector.cross(tTestVector)
      if tCross.z > 0.0 then
        executeMessage(#SendMinigameAction, 4, [1])
        if not voidp(m_myShip) then
          m_myShip.GetVisual().MarkShoot(#right)
        end if
        m_mp_shootState.state = #right
        m_mp_shootState.time = the milliSeconds
      else
        executeMessage(#SendMinigameAction, 4, [0])
        if not voidp(m_myShip) then
          m_myShip.GetVisual().MarkShoot(#left)
        end if
        m_mp_shootState.state = #left
        m_mp_shootState.time = the milliSeconds
      end if
      m_lastShoot = the milliSeconds
      me.getComponent().GetSoundPlayer().PlayVoiceOverSeldom(#fire)
    end if
    if m_myShip.GetFactor().IsFloatingWreck() then
      me.getComponent().GetSoundPlayer().PlayVoiceOver(#BlowShip)
      executeMessage(#SendMinigameAction, 6, [])
    end if
  end if
end
on singleClick me, a_loc
  tTarget = InverseAxonometricPosition(a_loc)
  if not voidp(m_myShip) then
    tdata = []
    tdata.append(integer(tTarget.locH))
    tdata.append(integer(tTarget.locV))
    executeMessage(#SendMinigameAction, 1, tdata)
    me.getComponent().GetSoundPlayer().PlayAcknowledge()
    me.getComponent().GetSoundPlayer().PlayVoiceOverSeldom(#Acknowledge)
  end if
  m_rNavigationTargetSprite.loc = a_loc
end