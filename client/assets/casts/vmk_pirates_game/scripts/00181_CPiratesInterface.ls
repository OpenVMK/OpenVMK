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
property m_lastRedGold
property m_lastBlueGold
property m_lastRedVault
property m_lastBlueVault
property m_iLastTeam1Wins
property m_iLastTeam2Wins
property m_rTimerDisplay
property m_bKeyIsDown
property m_prepareLastShow
property m_sKickWarningDlg
property m_iTimerBelow30
property m_bMessageBarInitialized
property m_iGameMode
property m_iBootResetTimer
global g_profInterface
global g_gfxCbNormal
global g_gfxCbGolden
global g_gfxCbRed
global g_gfxCbWhite
global g_gfxCbFire
global g_gfxPickupAmmo
global g_gfxPickupAmmoGolden
global g_gfxPickupHealth
global g_gfxPickupFlag1
global g_gfxPickupFlag2

on construct me
  put getSpriteManager().pTotalSprList.count && getSpriteManager().pFreeSprList.count
  m_prepared = 0
  m_bMessageBarInitialized = 0
  m_ar_lastClicks = []
  m_piratesBar = VOID
  m_lasthealth = 0
  m_lastammo = 0
  m_iGameMode = 0
  m_lastRedGold = 0
  m_lastBlueGold = 0
  m_lastRedVault = 0
  m_lastBlueVault = 0
  m_iLastTeam1Wins = 0
  m_iLastTeam2Wins = 0
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
  if windowExists(m_sPreGameWndTitle) then
    removeWindow(m_sPreGameWndTitle)
  end if
  if windowExists(m_sMidStageWndTitle) then
    removeWindow(m_sMidStageWndTitle)
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
  g_gfxCbGolden = getMember("cannonball_golden")
  g_gfxPickupAmmo = getMember("ammo.pickup")
  g_gfxPickupAmmoGolden = getMember("golden.pickup")
  g_gfxPickupHealth = getMember("health.pickup")
  g_gfxPickupFlag1 = getMember("flag.pickup.1")
  g_gfxPickupFlag2 = getMember("flag.pickup.2")
  m_lastClick = VOID
  m_navigatableCursor = getMember("can_move")
  m_shootableCursor = getMember("can_move_and_shoot")
  m_rNavigationTargetSprite = sprite(reserveSprite(me.getID()))
  m_rNavigationTargetSprite.member = getMember("heading_towards")
  m_rNavigationTargetSprite.locZ = getVariableValue("window.default.locz") - 102
  m_rNavigationTargetSprite.loc = point(1000, 1000)
  m_rNavigationTargetSprite.ink = 36
  m_rNavigationTargetSprite.width = getMember("heading_towards").image.width
  m_rNavigationTargetSprite.height = getMember("heading_towards").image.height
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
  m_bMessageBarInitialized = 0
  m_iTimerBelow30 = 0
  m_mousedownscript = the mouseDownScript
  set the mouseDownScript to "PiratesMouseDown"
  receiveUpdate(me.getID())
  m_myShip = VOID
  m_mp_shootState = [#state: #none, #time: the milliSeconds]
  m_bKeyIsDown = 0
  m_iBootResetTimer = the milliSeconds
  m_prepared = 1
end
on UnprepareRoom me
  if m_prepared then
    set the mouseDownScript to m_mousedownscript
    removeUpdate(me.getID())
    executeMessage(#ui_show)
    releaseSprite(m_rNavigationTargetSprite.spriteNum)
    releaseSprite(m_rGraphicCursorSprite.spriteNum)
    releaseSprite(m_rPrepareSplashSprite.spriteNum)
    releaseSprite(m_rPrepareSplashBgSprite.spriteNum)
    me.RemoveMessageBar()
    if not voidp(m_rTimerDisplay) then
      removeObject(m_rTimerDisplay.getID())
    end if
    if me.MidstageWindowExists() then
      me.RemoveMidstageWindow()
    end if
    me.HideIdleKickWarning()
    m_prepared = 0
  end if
end
on showMessageBar me
  if not m_bMessageBarInitialized then
    m_piratesBar.showMessageBar()
    m_piratesBar.setEditable(0)
  end if
  m_piratesBar.SetTimerDisplay(180)
end
on initMessageBar me
  m_piratesBar.setRedScore(0)
  m_piratesBar.setBlueScore(0)
  m_piratesBar.setRedVault(0)
  m_piratesBar.setBlueVault(0)
  m_piratesBar.SetTeam1Wins(0, 0)
  m_piratesBar.showVault(m_myShip.GetParam("Team"))
  m_bMessageBarInitialized = 1
end
on RemoveMessageBar me
  if objectp(m_piratesBar) then
    removeObject(m_piratesBar.getID())
    m_piratesBar = VOID
  end if
end
on ShowPreGame me
  if windowExists(m_sPreGameWndTitle) then
    return 1
  end if
  createWindow(m_sPreGameWndTitle, "vmk_pirates_modal.window")
  tWndObj = getWindow(m_sPreGameWndTitle)
  tWnd = getWindow(m_sPreGameWndTitle)
  tWnd.merge("pirates_start.window")
  tWnd.center()
  tWnd.getElement("pirates.dialog.hd").hide()
  tWnd.getElement("pirates.dialog.hd").hide()
  t_rElem = tWnd.getElement("pirates.storyline.image")
  if objectp(t_rElem) then
    t_rElem.hide()
  end if
end
on showStoryLine me, a_sStage
  tWnd = getWindow(m_sPreGameWndTitle)
  if objectp(tWnd) then
    t_rElem = tWnd.getElement("pirates.storyline.image")
    if objectp(t_rElem) then
      t_rSprite = t_rElem.getProperty(#sprite)
      case 1 of
        a_sStage contains "level1":
          t_rSprite.member = member("storyline.level1")
          t_rElem.show()
        a_sStage contains "level2":
          t_rSprite.member = member("storyline.level2")
          t_rElem.show()
        a_sStage contains "level3":
          t_rSprite.member = member("storyline.level3")
          t_rElem.show()

      end case
    end if
  end if
end
on HidePreGame me
  removeWindow(m_sPreGameWndTitle)
end
on DisplayStageEnd me, a_sTitle, a_ar_stagevictoryparams, a_ar_sPlayers, a_ar_iScores, a_ar_iVaults, a_ar_iTeamScores, a_ar_iTeamWins, a_iCountStart, a_ar_bDeadPlayers
  a_iWinner = a_ar_stagevictoryparams[1]
  t_iTeam1Score = a_ar_stagevictoryparams[2]
  t_iTeam2Score = a_ar_stagevictoryparams[3]
  t_iLastStage = a_ar_stagevictoryparams[4]
  t_iTeam1FlagBonus = a_ar_stagevictoryparams[5]
  t_iTeam2FlagBonus = a_ar_stagevictoryparams[6]
  t_iGameCancelled = a_ar_stagevictoryparams[7]
  t_iWinningBonus = a_ar_stagevictoryparams[8]
  t_iEndInfo = a_ar_stagevictoryparams[9]
  if windowExists(m_sMidStageWndTitle) then
    removeWindow(m_sMidStageWndTitle)
  end if
  createWindow(m_sMidStageWndTitle, "vmk_pirates_modal.window")
  tWndObj = getWindow(m_sMidStageWndTitle)
  tWnd = getWindow(m_sMidStageWndTitle)
  t_iGameMode = me.getComponent().GetGameMode()
  case t_iGameMode of
    1:
      tWnd.merge("pirates_stageend_ctf.window")
    2:
      tWnd.merge("pirates_stageend_lms.window")
    otherwise:
      tWnd.merge("pirates_stageend.window")

  end case
  tWnd.getElement("pirates.dialog.hd").hide()
  t_sWinner = EMPTY
  case a_iWinner of
    1:
      t_sWinner = getText("pirates.team.1")
      if t_iGameMode = 1 then
        me.changeImageInElement(tWnd, "ctf.bonus.portroyal", member("ctf.stagebonus.portroyal"))
      else
        if t_iGameMode = 2 then
          me.changeImageInElement(tWnd, "lms.bonus.portroyal", member("lms.bonus"))
        end if
      end if
    2:
      t_sWinner = getText("pirates.team.2")
      if t_iGameMode = 1 then
        me.changeImageInElement(tWnd, "ctf.bonus.pirates", member("ctf.stagebonus.pirates"))
      else
        if t_iGameMode = 2 then
          me.changeImageInElement(tWnd, "lms.bonus.pirates", member("lms.bonus"))
        end if
      end if

  end case
  tWnd.getElement("stagewinner").setText(convertToHigherCase(t_sWinner) && getText("pirates.win.stage"))
  t_sEndInfo = replaceChunks(getText("pirates.endinfo." & t_iEndInfo), "%teamName%", t_sWinner)
  tWnd.getElement("endinfo").setText(t_sEndInfo)
  tWnd.getElement("player1").setText(a_ar_sPlayers[1])
  tWnd.getElement("player2").setText(a_ar_sPlayers[2])
  tWnd.getElement("player3").setText(a_ar_sPlayers[3])
  tWnd.getElement("player4").setText(a_ar_sPlayers[4])
  tWnd.getElement("player5").setText(a_ar_sPlayers[5])
  tWnd.getElement("player6").setText(a_ar_sPlayers[6])
  tWnd.getElement("player7").setText(a_ar_sPlayers[7])
  tWnd.getElement("player8").setText(a_ar_sPlayers[8])
  if t_iGameMode = 1 then
    if not (a_ar_sPlayers[1] = EMPTY) then
      tWnd.getElement("player1vault").setText(a_ar_iScores[1])
    end if
    if not (a_ar_sPlayers[2] = EMPTY) then
      tWnd.getElement("player2vault").setText(a_ar_iScores[2])
    end if
    if not (a_ar_sPlayers[3] = EMPTY) then
      tWnd.getElement("player3vault").setText(a_ar_iScores[3])
    end if
    if not (a_ar_sPlayers[4] = EMPTY) then
      tWnd.getElement("player4vault").setText(a_ar_iScores[4])
    end if
    if not (a_ar_sPlayers[5] = EMPTY) then
      tWnd.getElement("player5vault").setText(a_ar_iScores[5])
    end if
    if not (a_ar_sPlayers[6] = EMPTY) then
      tWnd.getElement("player6vault").setText(a_ar_iScores[6])
    end if
    if not (a_ar_sPlayers[7] = EMPTY) then
      tWnd.getElement("player7vault").setText(a_ar_iScores[7])
    end if
    if not (a_ar_sPlayers[8] = EMPTY) then
      tWnd.getElement("player8vault").setText(a_ar_iScores[8])
    end if
    if not (a_ar_sPlayers[1] = EMPTY) then
      tWnd.getElement("player1bonus").setText(t_iTeam1FlagBonus)
    end if
    if not (a_ar_sPlayers[2] = EMPTY) then
      tWnd.getElement("player2bonus").setText(t_iTeam1FlagBonus)
    end if
    if not (a_ar_sPlayers[3] = EMPTY) then
      tWnd.getElement("player3bonus").setText(t_iTeam1FlagBonus)
    end if
    if not (a_ar_sPlayers[4] = EMPTY) then
      tWnd.getElement("player4bonus").setText(t_iTeam1FlagBonus)
    end if
    if not (a_ar_sPlayers[5] = EMPTY) then
      tWnd.getElement("player5bonus").setText(t_iTeam2FlagBonus)
    end if
    if not (a_ar_sPlayers[6] = EMPTY) then
      tWnd.getElement("player6bonus").setText(t_iTeam2FlagBonus)
    end if
    if not (a_ar_sPlayers[7] = EMPTY) then
      tWnd.getElement("player7bonus").setText(t_iTeam2FlagBonus)
    end if
    if not (a_ar_sPlayers[8] = EMPTY) then
      tWnd.getElement("player8bonus").setText(t_iTeam2FlagBonus)
    end if
    tWnd.getElement("teamvault.portroyal").setText(a_ar_iTeamScores[1])
    tWnd.getElement("teamvault.pirates").setText(a_ar_iTeamScores[2])
  else
    if t_iGameMode = 2 then
      if not (a_ar_sPlayers[1] = EMPTY) then
        tWnd.getElement("player1score").setText(a_ar_iScores[1])
      end if
      if not (a_ar_sPlayers[2] = EMPTY) then
        tWnd.getElement("player2score").setText(a_ar_iScores[2])
      end if
      if not (a_ar_sPlayers[3] = EMPTY) then
        tWnd.getElement("player3score").setText(a_ar_iScores[3])
      end if
      if not (a_ar_sPlayers[4] = EMPTY) then
        tWnd.getElement("player4score").setText(a_ar_iScores[4])
      end if
      if not (a_ar_sPlayers[5] = EMPTY) then
        tWnd.getElement("player5score").setText(a_ar_iScores[5])
      end if
      if not (a_ar_sPlayers[6] = EMPTY) then
        tWnd.getElement("player6score").setText(a_ar_iScores[6])
      end if
      if not (a_ar_sPlayers[7] = EMPTY) then
        tWnd.getElement("player7score").setText(a_ar_iScores[7])
      end if
      if not (a_ar_sPlayers[8] = EMPTY) then
        tWnd.getElement("player8score").setText(a_ar_iScores[8])
      end if
      if not (a_ar_sPlayers[1] = EMPTY) then
        tWnd.getElement("player1vault").setText(a_ar_iVaults[1])
      end if
      if not (a_ar_sPlayers[2] = EMPTY) then
        tWnd.getElement("player2vault").setText(a_ar_iVaults[2])
      end if
      if not (a_ar_sPlayers[3] = EMPTY) then
        tWnd.getElement("player3vault").setText(a_ar_iVaults[3])
      end if
      if not (a_ar_sPlayers[4] = EMPTY) then
        tWnd.getElement("player4vault").setText(a_ar_iVaults[4])
      end if
      if not (a_ar_sPlayers[5] = EMPTY) then
        tWnd.getElement("player5vault").setText(a_ar_iVaults[5])
      end if
      if not (a_ar_sPlayers[6] = EMPTY) then
        tWnd.getElement("player6vault").setText(a_ar_iVaults[6])
      end if
      if not (a_ar_sPlayers[7] = EMPTY) then
        tWnd.getElement("player7vault").setText(a_ar_iVaults[7])
      end if
      if not (a_ar_sPlayers[8] = EMPTY) then
        tWnd.getElement("player8vault").setText(a_ar_iVaults[8])
      end if
    end if
  end if
  tWnd.getElement("score.portroyal").setText(a_ar_iTeamWins[1])
  tWnd.getElement("score.pirates").setText(a_ar_iTeamWins[2])
  repeat with i = 1 to a_ar_bDeadPlayers.count
    t_bDead = a_ar_bDeadPlayers[i]
    if t_bDead then
      me.changeImageInElement(tWnd, "player" & i & ".dead", member("tombstone.icon"))
      t_rElem = tWnd.getElement("player" & i)
      if objectp(t_rElem) then
        t_rElem.getProperty(#sprite).blend = 50
      end if
    end if
  end repeat
  updateStage()
  tWndObj.center()
end
on DisplayGameEnd me, a_sTitle, a_ar_stagevictoryparams, a_ar_sPlayers, a_ar_iScores, a_ar_iVaults, a_ar_iTeamScores, a_ar_iTeamWins, a_iTimeRemaining
  a_iWinner = a_ar_stagevictoryparams[1]
  t_iTeam1Score = a_ar_stagevictoryparams[2]
  t_iTeam2Score = a_ar_stagevictoryparams[3]
  t_iLastStage = a_ar_stagevictoryparams[4]
  t_iTeam1FlagBonus = a_ar_stagevictoryparams[5]
  t_iTeam2FlagBonus = a_ar_stagevictoryparams[6]
  t_iGameCancelled = a_ar_stagevictoryparams[7]
  t_iWinningBonus = a_ar_stagevictoryparams[8]
  t_iEndInfo = a_ar_stagevictoryparams[9]
  if windowExists(m_sMidStageWndTitle) then
    removeWindow(m_sMidStageWndTitle)
  end if
  createWindow(m_sMidStageWndTitle, "vmk_pirates_modal.window")
  tWndObj = getWindow(m_sMidStageWndTitle)
  tWnd = getWindow(m_sMidStageWndTitle)
  t_iGameMode = me.getComponent().GetGameMode()
  case t_iGameMode of
    1:
      tWnd.merge("pirates_gameend_ctf.window")
    2:
      tWnd.merge("pirates_gameend_lms.window")
    otherwise:
      tWnd.merge("vmk_pirates_winner.window")

  end case
  t_sWinner = EMPTY
  case a_iWinner of
    1:
      t_sWinner = getText("pirates.team.1")
      if t_iGameMode = 1 then
        me.changeImageInElement(tWnd, "ctf.bonus.portroyal", member("ctf.gamebonus.portroyal"))
      else
        if t_iGameMode = 2 then
          me.changeImageInElement(tWnd, "lms.bonus.portroyal", member("lms.bonus"))
        end if
      end if
    2:
      t_sWinner = getText("pirates.team.2")
      if t_iGameMode = 1 then
        me.changeImageInElement(tWnd, "ctf.bonus.pirates", member("ctf.gamebonus.pirates"))
      else
        if t_iGameMode = 2 then
          me.changeImageInElement(tWnd, "lms.bonus.pirates", member("lms.bonus"))
        end if
      end if

  end case
  tWnd.getElement("gamewinner").setText(convertToHigherCase(t_sWinner) && getText("pirates.win.game"))
  t_sEndInfo = replaceChunks(getText("pirates.endinfo." & t_iEndInfo), "%teamName%", t_sWinner)
  tWnd.getElement("endinfo").setText(t_sEndInfo)
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
  if t_iGameMode = 1 then
    if not (a_ar_sPlayers[1] = EMPTY) then
      tWnd.getElement("player1vault").setText(a_ar_iScores[1])
    end if
    if not (a_ar_sPlayers[2] = EMPTY) then
      tWnd.getElement("player2vault").setText(a_ar_iScores[2])
    end if
    if not (a_ar_sPlayers[3] = EMPTY) then
      tWnd.getElement("player3vault").setText(a_ar_iScores[3])
    end if
    if not (a_ar_sPlayers[4] = EMPTY) then
      tWnd.getElement("player4vault").setText(a_ar_iScores[4])
    end if
    if not (a_ar_sPlayers[5] = EMPTY) then
      tWnd.getElement("player5vault").setText(a_ar_iScores[5])
    end if
    if not (a_ar_sPlayers[6] = EMPTY) then
      tWnd.getElement("player6vault").setText(a_ar_iScores[6])
    end if
    if not (a_ar_sPlayers[7] = EMPTY) then
      tWnd.getElement("player7vault").setText(a_ar_iScores[7])
    end if
    if not (a_ar_sPlayers[8] = EMPTY) then
      tWnd.getElement("player8vault").setText(a_ar_iScores[8])
    end if
    if not (a_ar_sPlayers[1] = EMPTY) then
      tWnd.getElement("player1bonus").setText(t_iTeam1FlagBonus)
    end if
    if not (a_ar_sPlayers[2] = EMPTY) then
      tWnd.getElement("player2bonus").setText(t_iTeam1FlagBonus)
    end if
    if not (a_ar_sPlayers[3] = EMPTY) then
      tWnd.getElement("player3bonus").setText(t_iTeam1FlagBonus)
    end if
    if not (a_ar_sPlayers[4] = EMPTY) then
      tWnd.getElement("player4bonus").setText(t_iTeam1FlagBonus)
    end if
    if not (a_ar_sPlayers[5] = EMPTY) then
      tWnd.getElement("player5bonus").setText(t_iTeam2FlagBonus)
    end if
    if not (a_ar_sPlayers[6] = EMPTY) then
      tWnd.getElement("player6bonus").setText(t_iTeam2FlagBonus)
    end if
    if not (a_ar_sPlayers[7] = EMPTY) then
      tWnd.getElement("player7bonus").setText(t_iTeam2FlagBonus)
    end if
    if not (a_ar_sPlayers[8] = EMPTY) then
      tWnd.getElement("player8bonus").setText(t_iTeam2FlagBonus)
    end if
    tWnd.getElement("teamvault.portroyal").setText(a_ar_iTeamScores[1])
    tWnd.getElement("teamvault.pirates").setText(a_ar_iTeamScores[2])
  else
    if t_iGameMode = 2 then
      if not (a_ar_sPlayers[1] = EMPTY) then
        tWnd.getElement("player1vault").setText(a_ar_iScores[1] + a_ar_iVaults[1])
      end if
      if not (a_ar_sPlayers[2] = EMPTY) then
        tWnd.getElement("player2vault").setText(a_ar_iScores[2] + a_ar_iVaults[2])
      end if
      if not (a_ar_sPlayers[3] = EMPTY) then
        tWnd.getElement("player3vault").setText(a_ar_iScores[3] + a_ar_iVaults[3])
      end if
      if not (a_ar_sPlayers[4] = EMPTY) then
        tWnd.getElement("player4vault").setText(a_ar_iScores[4] + a_ar_iVaults[4])
      end if
      if not (a_ar_sPlayers[5] = EMPTY) then
        tWnd.getElement("player5vault").setText(a_ar_iScores[5] + a_ar_iVaults[5])
      end if
      if not (a_ar_sPlayers[6] = EMPTY) then
        tWnd.getElement("player6vault").setText(a_ar_iScores[6] + a_ar_iVaults[6])
      end if
      if not (a_ar_sPlayers[7] = EMPTY) then
        tWnd.getElement("player7vault").setText(a_ar_iScores[7] + a_ar_iVaults[7])
      end if
      if not (a_ar_sPlayers[8] = EMPTY) then
        tWnd.getElement("player8vault").setText(a_ar_iScores[8] + a_ar_iVaults[8])
      end if
      if t_iWinningBonus > 0 then
        case a_iWinner of
          1:
            if not (a_ar_sPlayers[1] = EMPTY) then
              tWnd.getElement("player1bonus").setText(t_iWinningBonus && "+")
            end if
            if not (a_ar_sPlayers[2] = EMPTY) then
              tWnd.getElement("player2bonus").setText(t_iWinningBonus && "+")
            end if
            if not (a_ar_sPlayers[3] = EMPTY) then
              tWnd.getElement("player3bonus").setText(t_iWinningBonus && "+")
            end if
            if not (a_ar_sPlayers[4] = EMPTY) then
              tWnd.getElement("player4bonus").setText(t_iWinningBonus && "+")
            end if
          2:
            if not (a_ar_sPlayers[5] = EMPTY) then
              tWnd.getElement("player5bonus").setText(t_iWinningBonus && "+")
            end if
            if not (a_ar_sPlayers[6] = EMPTY) then
              tWnd.getElement("player6bonus").setText(t_iWinningBonus && "+")
            end if
            if not (a_ar_sPlayers[7] = EMPTY) then
              tWnd.getElement("player7bonus").setText(t_iWinningBonus && "+")
            end if
            if not (a_ar_sPlayers[8] = EMPTY) then
              tWnd.getElement("player8bonus").setText(t_iWinningBonus && "+")
            end if

        end case
      end if
    end if
  end if
  tWnd.getElement("score.portroyal").setText(a_ar_iTeamWins[1])
  tWnd.getElement("score.pirates").setText(a_ar_iTeamWins[2])
  updateStage()
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
  m_rPrepareSplashBgSprite.width = member("pirates.start.bg").image.width
  m_rPrepareSplashBgSprite.height = member("pirates.start.bg").image.height
  if a_iTimeRemaining < 5 then
    if a_iTimeRemaining > 3 then
      m_rPrepareSplashSprite.member = member("pirates.start.3")
      m_rPrepareSplashSprite.width = member("pirates.start.3").image.width
      m_rPrepareSplashSprite.height = member("pirates.start.3").image.height
      if m_prepareLastShow <> 3 then
        me.getComponent().GetSoundPlayer().PlayCountDown(1)
      end if
      m_prepareLastShow = 3
    else
      if a_iTimeRemaining > 2 then
        m_rPrepareSplashSprite.member = member("pirates.start.2")
        m_rPrepareSplashSprite.width = member("pirates.start.2").image.width
        m_rPrepareSplashSprite.height = member("pirates.start.2").image.height
        if m_prepareLastShow <> 2 then
          me.getComponent().GetSoundPlayer().PlayCountDown(2)
        end if
        m_prepareLastShow = 2
      else
        if a_iTimeRemaining > 1 then
          m_rPrepareSplashSprite.member = member("pirates.start.1")
          m_rPrepareSplashSprite.width = member("pirates.start.1").image.width
          m_rPrepareSplashSprite.height = member("pirates.start.1").image.height
          if m_prepareLastShow <> 1 then
            me.getComponent().GetSoundPlayer().PlayCountDown(3)
          end if
          m_prepareLastShow = 1
        else
          if a_iTimeRemaining >= 0 then
            m_rPrepareSplashSprite.member = member("pirates.start.fight")
            m_rPrepareSplashSprite.width = member("pirates.start.fight").image.width
            m_rPrepareSplashSprite.height = member("pirates.start.fight").image.height
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
  m_piratesBar.SetTimerDisplay(a_iSecondsLeft)
end
on HideTimerDisplay me
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
  if the milliSeconds - m_iBootResetTimer > 2000 then
    if not DialogWindowExists(m_sKickWarningDlg) then
      createDialogWindow(me.getID(), m_sKickWarningDlg, 1)
    end if
    tDialog = getObject(m_sKickWarningDlg)
    tDialog.show()
    tDialog.setText(getText("pirates.kickouttimer_text_1") && a_iTime && getText("pirates.kickouttimer_text_2"), getText("pirates.kickouttimer_title"), getText("pirates.kickouttimer_btnOK"))
  else
    if DialogWindowExists(m_sKickWarningDlg) then
      removeDialogWindow(m_sKickWarningDlg)
    end if
  end if
end
on HideIdleKickWarning me
  if DialogWindowExists(m_sKickWarningDlg) then
    removeDialogWindow(m_sKickWarningDlg)
  end if
  m_iBootResetTimer = the milliSeconds
end
on HandleKeyDown me, a_iDirection
  if objectp(m_myShip) then
    if a_iDirection = 2 then
      if m_myShip.GetFactor().isCarryingFlag() then
        executeMessage(#SendMinigameAction, 8, [])
      end if
    else
      if m_myShip.GetParam("Ammo").count > 0 then
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
            m_myShip.GetVisual().MarkShoot(#left)
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
              m_myShip.GetVisual().MarkShoot(#right)
            end if
            m_mp_shootState.time = the milliSeconds
          end if
        end if
      else
        me.getComponent().GetSoundPlayer().PlayVoiceOver(#OutOfAmmo)
      end if
    end if
  end if
  if not timeoutExists("HideIdleWarning") then
    createTimeout("HideIdleWarning", 700, #HideIdleKickWarning, me.getID(), VOID, 1)
  end if
end
on mouseDown me, a_loc
  if me.getComponent().gameOn() then
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
    keyPressed(125):
      t_direction = 2
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
  if objectp(m_myShip) and not m_bMessageBarInitialized then
    me.initMessageBar()
  end if
  if tt - m_mp_shootState.time > m_iShootPntrDelay and m_mp_shootState.state <> #none then
    if objectp(m_myShip) then
      m_myShip.GetVisual().MarkShoot(#none)
    end if
    m_mp_shootState.state = #none
  end if
  if not voidp(m_myShip) then
    tAmmo = m_myShip.GetParam("Ammo")
    tHealth = m_myShip.GetParam("Health")
    if tAmmo.count <> m_lastammo then
      m_piratesBar.setAmmoindicator(tAmmo)
    end if
    if tHealth <> m_lasthealth then
      m_piratesBar.setHealthIndicator(tHealth)
    end if
    m_lastammo = tAmmo.count
    m_lasthealth = tHealth
  end if
  tScoreBoard = getThread("minigame").getComponent().GetObjectsByCode(9)
  if tScoreBoard.count = 1 then
    if objectp(tScoreBoard[1].GetFactor()) then
      t_iGameMode = me.getComponent().GetGameMode()
      tRedGold = 0
      tRedVault = 0
      tBlueGold = 0
      tBlueVault = 0
      if t_iGameMode = 1 then
        tRedGold = tScoreBoard[1].GetFactor().GetTeam1Gold()
        tBlueGold = tScoreBoard[1].GetFactor().GetTeam2Gold()
        tRedVault = tScoreBoard[1].GetFactor().GetTeam1Score() + tRedGold
        tBlueVault = tScoreBoard[1].GetFactor().GetTeam2Score() + tBlueGold
        if tRedGold <> m_lastRedGold then
          m_piratesBar.setRedScore(tRedGold)
        end if
        if tBlueGold <> m_lastBlueGold then
          m_piratesBar.setBlueScore(tBlueGold)
        end if
        if tRedVault <> m_lastRedVault then
          m_piratesBar.setRedVault(tRedVault)
        end if
        if tBlueVault <> m_lastBlueVault then
          m_piratesBar.setBlueVault(tBlueVault)
        end if
      else
        if not voidp(m_myShip) then
          tRedGold = m_myShip.GetParam("Gold")
          tRedVault = m_myShip.GetParam("Score")
        end if
        if tRedGold <> m_lastRedGold then
          m_piratesBar.setRedScore(tRedGold)
        end if
        if tRedVault <> m_lastRedVault then
          m_piratesBar.setRedVault(tRedVault)
        end if
      end if
      m_lastRedGold = tRedGold
      m_lastBlueGold = tBlueGold
      m_lastRedVault = tRedVault
      m_lastBlueVault = tBlueVault
      t_iTeam1Wins = tScoreBoard[1].GetFactor().GetTeam1Wins()
      t_iTeam2Wins = tScoreBoard[1].GetFactor().GetTeam2Wins()
      if t_iTeam1Wins <> m_iLastTeam1Wins then
        m_piratesBar.SetTeam1Wins(t_iTeam1Wins, t_iTeam2Wins)
      end if
      if t_iTeam2Wins <> m_iLastTeam2Wins then
        m_piratesBar.SetTeam2Wins(t_iTeam2Wins, t_iTeam1Wins)
      end if
      m_iLastTeam1Wins = t_iTeam1Wins
      m_iLastTeam2Wins = t_iTeam2Wins
    end if
  end if
  if not voidp(m_myShip) then
    tCurPoint = intvector(InverseAxonometricPosition(the mouseLoc).locH, InverseAxonometricPosition(the mouseLoc).locV, 0)
    if (m_piratesBar.getBroadsideStatus() or m_myShip.GetFactor().IsShootable(tCurPoint)) and tt - m_lastShoot > m_shootDelay then
      if m_rGraphicCursorSprite.member <> m_shootableCursor then
        m_rGraphicCursorSprite.member = m_shootableCursor
        m_rGraphicCursorSprite.width = m_shootableCursor.width
        m_rGraphicCursorSprite.height = m_shootableCursor.height
      end if
    else
      if m_rGraphicCursorSprite.member <> m_navigatableCursor then
        m_rGraphicCursorSprite.member = m_navigatableCursor
        m_rGraphicCursorSprite.width = m_navigatableCursor.width
        m_rGraphicCursorSprite.height = m_navigatableCursor.height
      end if
    end if
    m_rGraphicCursorSprite.loc = the mouseLoc
    m_myShip.GetVisual().MarkMyShip(1)
    m_myShip.GetFactor().MarkMyShip(1)
    if m_myShip.GetParam("Ammo").count > 0 then
      if tt - m_lastShoot <= m_shootDelay then
        m_myShip.GetVisual().SetReloadStatus(float(tt - m_lastShoot) / float(m_shootDelay))
      else
        m_myShip.GetVisual().SetReloadStatus(1.0)
      end if
    else
      m_myShip.GetVisual().SetReloadStatus(0.0)
    end if
  end if
  if me.getComponent().gameOn() then
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
    if not m_myShip.GetFactor().IsFloatingWreck() and m_myShip.getObject().GetParam("Ammo").count > 0 and the milliSeconds - m_lastShoot >= m_shootDelay then
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
on changeImageInElement me, tWndObj, tElemName, tmember
  if objectp(tWndObj) then
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