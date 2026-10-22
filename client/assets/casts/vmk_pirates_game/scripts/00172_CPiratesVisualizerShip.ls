-- Movie Script
property m_rSprites
property m_ar_shipMembers
property m_ar_sailMembers
property m_ar_shootpntrMembers
property m_ar_dirToIndex
property m_ar_sunkMembers
property m_ar_sunkDirToIndex
property m_flashMember
property m_bMyShip
property m_iMyTeam
property m_ar_rMyShipRed
property m_ar_rMyShipBlue
property m_rOwnerDisplayMember
property m_bOwnerWritten
property m_rMGE
property m_yShootMark
property m_fReloadStatus
property m_sPlayerName
property m_vLocalPosition
property m_maxDiff
property m_fLastTime
property m_vVelocity
property m_fMaxVelocityChange
property m_shakeProtection
property m_unshake
property m_lastGraphic
property m_lastVelocity
property m_maxAcceleration
property m_sineOffset1
property m_sineOffset2
property m_MOVEBIT
property m_SLOWBIT
property m_SHOOTBIT
property m_DESTROYEDBIT
property m_FLOATINGWRECKBIT
property m_INVINCIBILITYBIT
property m_CARRYINGOWNFLAGBIT
property m_ROWINGBOATBIT
property m_CARRYINGENEMYFLAGBIT
property m_carryingFlag
property m_rowingBoat
property m_iType
property m_iTeam
property m_iGold
property m_iSailColor
property m_ar_rowboatMembers
property m_ar_rowboatsailMembers
property m_ar_rowboatdirToIndex
property m_iRowboatCounter
property m_ar_rFlags
global g_profShipVisualizerAcc

on construct me
  m_rSprites = []
  m_ar_rFlags = [getMember("flag.picked.1"), getMember("flag.picked.2")]
  m_rSprites[1] = sprite(getSpriteManager().reserveSprite(me.getID()))
  m_rSprites[1].member = VOID
  m_rSprites[1].ink = 36
  m_rSprites[1].locZ = -50
  m_rSprites[2] = sprite(getSpriteManager().reserveSprite(me.getID()))
  m_rSprites[2].member = VOID
  m_rSprites[2].locZ = -49
  m_rSprites[2].ink = 41
  m_rSprites[2].bgColor = rgb("#FFEFBE")
  m_rSprites[2].color = rgb("#000000")
  m_rSprites[3] = VOID
  m_rSprites[4] = sprite(getSpriteManager().reserveSprite(me.getID()))
  m_rSprites[4].member = VOID
  m_rSprites[4].ink = 36
  m_rSprites[4].locZ = -48
  m_rSprites[5] = sprite(getSpriteManager().reserveSprite(me.getID()))
  m_rSprites[5].member = VOID
  m_rSprites[5].ink = 36
  m_rSprites[5].locZ = -48
  m_rSprites[6] = sprite(getSpriteManager().reserveSprite(me.getID()))
  m_rSprites[6].member = VOID
  m_rSprites[6].ink = 36
  m_rSprites[6].locZ = -48
  m_rSprites[7] = sprite(getSpriteManager().reserveSprite(me.getID()))
  m_rSprites[7].member = VOID
  m_rSprites[7].ink = 36
  m_rSprites[7].locZ = -48
  m_ar_shipMembers = []
  m_ar_sailMembers = [[], [], [], []]
  m_ar_shootpntrMembers = []
  t_rObject = me.getObject()
  if objectp(t_rObject) then
    t_iType = me.getObject().GetParam("Type")
  end if
  m_iGold = 0
  if voidp(t_iType) then
    m_iType = 1
  else
    m_iType = t_iType
  end if
  m_iTeam = 1
  repeat with i = 0 to 35
    n = i * 10
    tsNumber = EMPTY
    if n < 100 then
      tsNumber = tsNumber & "0"
    end if
    if n < 10 then
      tsNumber = tsNumber & "0"
    end if
    tsNumber = tsNumber & n
    t_sName = "ship" & "_" & m_iType & "_" & tsNumber
    t_rMember = getMember(t_sName)
    m_ar_shipMembers.append(t_rMember)
    m_ar_sailMembers[1].append(getMember("sail" & "_" & m_iType & "_" & tsNumber))
    m_ar_sailMembers[2].append(getMember("sail" & "_" & m_iType & "_" & tsNumber))
    m_ar_shootpntrMembers.append(getMember("shoot0" & tsNumber))
  end repeat
  m_ar_sunkMembers = []
  m_ar_sunkMembers[1] = getMember("sunk0000")
  m_ar_sunkMembers[2] = getMember("sunk0020")
  m_ar_sunkMembers[3] = getMember("sunk0045")
  m_ar_sunkMembers[4] = getMember("sunk0070")
  m_ar_sunkMembers[5] = getMember("sunk0090")
  m_ar_sunkMembers[6] = getMember("sunk0110")
  m_ar_sunkMembers[7] = getMember("sunk0130")
  m_ar_sunkMembers[8] = getMember("sunk0155")
  m_ar_sunkMembers[9] = getMember("sunk0180")
  m_ar_sunkMembers[10] = getMember("sunk0205")
  m_ar_sunkMembers[11] = getMember("sunk0225")
  m_ar_sunkMembers[12] = getMember("sunk0245")
  m_ar_sunkMembers[13] = getMember("sunk0265")
  m_ar_sunkMembers[14] = getMember("sunk0295")
  m_ar_sunkMembers[15] = getMember("sunk0320")
  m_ar_sunkMembers[16] = getMember("sunk0340")
  m_ar_sunkDirToIndex = []
  repeat with i = 1 to 22
    m_ar_sunkDirToIndex[i] = 1
  end repeat
  repeat with i = 23 to 45
    m_ar_sunkDirToIndex[i] = 2
  end repeat
  repeat with i = 46 to 67
    m_ar_sunkDirToIndex[i] = 3
  end repeat
  repeat with i = 68 to 90
    m_ar_sunkDirToIndex[i] = 4
  end repeat
  repeat with i = 91 to 112
    m_ar_sunkDirToIndex[i] = 5
  end repeat
  repeat with i = 113 to 135
    m_ar_sunkDirToIndex[i] = 6
  end repeat
  repeat with i = 136 to 157
    m_ar_sunkDirToIndex[i] = 7
  end repeat
  repeat with i = 158 to 180
    m_ar_sunkDirToIndex[i] = 8
  end repeat
  repeat with i = 181 to 202
    m_ar_sunkDirToIndex[i] = 9
  end repeat
  repeat with i = 203 to 225
    m_ar_sunkDirToIndex[i] = 10
  end repeat
  repeat with i = 226 to 247
    m_ar_sunkDirToIndex[i] = 11
  end repeat
  repeat with i = 248 to 270
    m_ar_sunkDirToIndex[i] = 12
  end repeat
  repeat with i = 271 to 292
    m_ar_sunkDirToIndex[i] = 13
  end repeat
  repeat with i = 293 to 315
    m_ar_sunkDirToIndex[i] = 14
  end repeat
  repeat with i = 316 to 337
    m_ar_sunkDirToIndex[i] = 15
  end repeat
  repeat with i = 338 to 360
    m_ar_sunkDirToIndex[i] = 16
  end repeat
  m_ar_dirToIndex = []
  repeat with i = 1 to 360
    tIndex = (i - 5) / 10 + 1
    if tIndex > 5 * 36 then
      tIndex = tIndex - 5 * 36
    end if
    if tIndex > 4 * 36 then
      tIndex = tIndex - 4 * 36
    end if
    if tIndex > 3 * 36 then
      tIndex = tIndex - 3 * 36
    end if
    if tIndex > 2 * 36 then
      tIndex = tIndex - 2 * 36
    end if
    if tIndex > 36 then
      tIndex = tIndex - 36
    end if
    if tIndex < 1 then
      tIndex = 36 - tIndex
    end if
    m_ar_dirToIndex.append(tIndex)
  end repeat
  m_iRowboatCounter = 1
  m_ar_rowboatMembers = []
  m_ar_rowboatsailMembers = []
  m_ar_rowboatdirToIndex = []
  t_iAngle = 0
  t_iDivisions = 8
  repeat with i = 1 to t_iDivisions
    t_sAngle = t_iAngle
    if t_iAngle < 10 then
      t_sAngle = "0" & t_sAngle
    end if
    if t_iAngle < 100 then
      t_sAngle = "0" & t_sAngle
    end if
    t_animation = []
    t_sailanimation = []
    repeat with k = 0 to 3
      t_sMemName = "ship_4_" & t_sAngle & "_" & k
      t_animation.append(getMember(t_sMemName))
      t_sMemName = "ship_4_sail_" & t_sAngle & "_" & k
      t_sailanimation.append(getMember(t_sMemName))
    end repeat
    m_ar_rowboatMembers.append(t_animation)
    m_ar_rowboatsailMembers.append(t_sailanimation)
    t_iAngle = t_iAngle + 360 / t_iDivisions
  end repeat
  repeat with i = 0 to 359
    t_index = i / 45 + 0.5
    m_ar_rowboatdirToIndex[i + 1] = t_index
  end repeat
  m_fReloadStatus = 1.0
  m_flashMember = getMember("red1")
  m_ar_rMyShipRed = [getMember("arrow.red_10"), getMember("arrow.red_25"), getMember("arrow.red_40"), getMember("arrow.red_55"), getMember("arrow.red_70"), getMember("arrow.red_85"), getMember("arrow.red_100")]
  m_ar_rMyShipBlue = [getMember("arrow.blue_10"), getMember("arrow.blue_25"), getMember("arrow.blue_40"), getMember("arrow.blue_55"), getMember("arrow.blue_70"), getMember("arrow.blue_85"), getMember("arrow.blue_100")]
  m_bMyShip = 0
  m_vLocalPosition = VOID
  m_maxAcceleration = 180
  m_maxDiff = 750
  m_sineOffset1 = 0.0
  m_sineOffset2 = 0.0
  m_MOVEBIT = 1
  m_SLOWBIT = 2
  m_SHOOTBIT = 3
  m_DESTROYEDBIT = 4
  m_FLOATINGWRECKBIT = 5
  m_INVINCIBILITYBIT = 6
  m_CARRYINGOWNFLAGBIT = 7
  m_ROWINGBOATBIT = 8
  m_CARRYINGENEMYFLAGBIT = 9
  m_carryingFlag = 0
  m_shakeProtection = getVariableValue("visual.shipshakeprotection")
  m_unshake = 1
  m_lastGraphic = [VOID, VOID]
  m_rOwnerDisplayMember = member(createMember("ShipOwner" & getThread("piratesminigame").getComponent().GetNewReference(), #bitmap))
  m_bOwnerWritten = 0
  m_sPlayerName = EMPTY
  m_rMGE = getThread("minigame").getComponent()
  return 1
end
on deconstruct me
  repeat with tSprite in m_rSprites
    if not voidp(tSprite) then
      getSpriteManager().releaseSprite(tSprite.spriteNum)
    end if
  end repeat
  removeMember(m_rOwnerDisplayMember.name)
  return 1
end
on updateConstants me
  t_iType = integer(me.getObject().GetParam("Type"))
  if t_iType > 0 then
    if m_iType <> t_iType then
      m_iType = t_iType
      me.updateShipType()
    end if
  end if
  t_iTeam = integer(me.getObject().GetParam("Team"))
  if t_iTeam > 1 then
    m_iTeam = t_iTeam
    me.updateSailType(t_iTeam)
  end if
end
on updateShipType me
  m_ar_shipMembers = []
  m_ar_sailMembers = [[], [], [], []]
  repeat with i = 0 to 35
    n = i * 10
    tsNumber = EMPTY
    if n < 100 then
      tsNumber = tsNumber & "0"
    end if
    if n < 10 then
      tsNumber = tsNumber & "0"
    end if
    tsNumber = tsNumber & n
    t_sName = "ship" & "_" & m_iType & "_" & tsNumber
    t_rMember = getMember(t_sName)
    m_ar_shipMembers.append(t_rMember)
    m_ar_sailMembers[1].append(getMember("sail" & "_" & m_iType & "_" & tsNumber))
    m_ar_sailMembers[2].append(getMember("sail" & "_" & m_iType & "_" & tsNumber))
  end repeat
end
on updateSailType me, tTeam
  case tTeam of
    1:
      t_sColor = "#FFEFBE"
    2:
      t_sColor = "#564b70"
    otherwise:
      t_sColor = "#FFEFBE"

  end case
  m_rSprites[2].bgColor = rgb(t_sColor)
end
on SetGraphic me, a_iMyObject, a_iDir, a_iTeam
  tFloatingWreck = TestBit(a_iMyObject.GetParam("State"), m_FLOATINGWRECKBIT)
  tDestroyed = TestBit(a_iMyObject.GetParam("State"), m_DESTROYEDBIT)
  tRowBoat = TestBit(a_iMyObject.GetParam("State"), m_ROWINGBOATBIT)
  tNewGraphic = []
  if tFloatingWreck then
    tNewGraphic[1] = m_ar_sunkMembers[m_ar_sunkDirToIndex[a_iDir]]
    tNewGraphic[2] = VOID
  else
    if tRowBoat then
      tNewGraphic[1] = m_ar_rowboatMembers[m_ar_rowboatdirToIndex[a_iDir]][m_iRowboatCounter]
      tNewGraphic[2] = m_ar_rowboatsailMembers[m_ar_rowboatdirToIndex[a_iDir]][m_iRowboatCounter]
      m_iRowboatCounter = m_iRowboatCounter + 1
      if m_iRowboatCounter > 4 then
        m_iRowboatCounter = 1
      end if
    else
      tNewGraphic[1] = m_ar_shipMembers[m_ar_dirToIndex[a_iDir]]
      tNewGraphic[2] = m_ar_sailMembers[a_iTeam][m_ar_dirToIndex[a_iDir]]
    end if
  end if
  case m_yShootMark of
    #left:
      tShootDir = AdjustDirection(a_iDir, -90)
      if tShootDir < 1 then
        tShootDir = 360
      end if
      tNewMember = m_ar_shootpntrMembers[m_ar_dirToIndex[tShootDir]]
      if m_unshake >= m_shakeProtection and m_rSprites[6].member <> tNewMember then
        m_rSprites[6].member = tNewMember
        m_rSprites[6].width = m_rSprites[6].member.width
        m_rSprites[6].height = m_rSprites[6].member.height
      end if
    #right:
      tShootDir = AdjustDirection(a_iDir, 90)
      if tShootDir < 1 then
        tShootDir = 360
      end if
      tNewMember = m_ar_shootpntrMembers[m_ar_dirToIndex[tShootDir]]
      if m_unshake >= m_shakeProtection and m_rSprites[6].member <> tNewMember then
        m_rSprites[6].member = tNewMember
        m_rSprites[6].width = m_rSprites[6].member.width
        m_rSprites[6].height = m_rSprites[6].member.height
      end if
    #none:
      if not voidp(m_rSprites[6].member) then
        m_rSprites[6].member = VOID
      end if

  end case
  if tNewGraphic[1] <> m_lastGraphic[1] and tNewGraphic[2] <> m_lastGraphic[2] then
    if m_unshake >= m_shakeProtection then
      if m_rSprites[1].member <> tNewGraphic[1] then
        m_rSprites[1].member = tNewGraphic[1]
        m_rSprites[1].width = m_rSprites[1].member.width
        m_rSprites[1].height = m_rSprites[1].member.height
      end if
      if m_rSprites[2].member <> tNewGraphic[2] then
        m_rSprites[2].member = tNewGraphic[2]
        m_rSprites[2].width = m_rSprites[2].member.width
        m_rSprites[2].height = m_rSprites[2].member.height
      end if
      m_unshake = 1
    end if
    m_unshake = m_unshake + 1
  end if
  m_lastGraphic[1] = m_rSprites[1].member
  m_lastGraphic[2] = m_rSprites[2].member
  if not tFloatingWreck and tDestroyed then
    if not voidp(m_rSprites[1].member) then
      m_rSprites[1].member = VOID
    end if
    if not voidp(m_rSprites[2].member) then
      m_rSprites[2].member = VOID
    end if
  end if
end
on ProcessPosition me
  if voidp(m_vLocalPosition) then
    m_vLocalPosition = me.getObject().GetParam("WorldPosition")
    m_lastVelocity = me.getObject().GetParam("Velocity")
  else
    tPos = me.getObject().GetParam("WorldPosition")
    tDiff = tPos.substract(m_vLocalPosition)
    tNeedChange = tDiff.substract(m_lastVelocity)
    if tNeedChange.length() > m_maxAcceleration then
      tNeedChange.normalize()
      tVelocity = m_lastVelocity.add(tNeedChange.multiply(m_maxAcceleration))
    else
      tVelocity = tDiff
    end if
    tVelocity = tVelocity.multiply(90).divide(100)
    m_lastVelocity = tVelocity
    m_vLocalPosition = m_vLocalPosition.add(tVelocity)
  end if
end
on flash me, a_pLoc
end
on MarkMyShip me, a_bVal
  m_bMyShip = a_bVal
  m_iMyTeam = me.getObject().GetParam("Team")
end
on MarkShoot me, a_ySide
  m_yShootMark = a_ySide
  m_unshake = m_shakeProtection
end
on SetReloadStatus me, a_fStatus
  m_fReloadStatus = a_fStatus
  if m_fReloadStatus >= 1.0 then
    m_fReloadStatus = 1.0
  end if
end
on update me
  tTime = the milliSeconds
  tMyObject = me.getObject()
  tLastMove = tMyObject.GetParam("LastMove")
  tDt = (tTime - tLastMove) / 1000.0
  tPos = tMyObject.GetParam("WorldPosition")
  tdir = tMyObject.GetParam("Direction") + 1
  tTeam = tMyObject.GetParam("Team")
  tstate = tMyObject.GetParam("State")
  tVelocity = tMyObject.GetParam("Velocity")
  t_iGameMode = getThread("piratesminigame").getComponent().GetGameMode()
  tCarryingFlag = TestBit(tstate, m_CARRYINGOWNFLAGBIT) or TestBit(tstate, m_CARRYINGENEMYFLAGBIT)
  tRowingBoat = TestBit(tstate, m_ROWINGBOATBIT)
  if t_iGameMode = 2 then
    t_iGold = me.getObject().GetParam("Gold")
    if t_iGold <> m_iGold then
      m_iGold = t_iGold
      m_bOwnerWritten = 0
    end if
  end if
  if tdir > 360 then
    tdir = 360
  end if
  if tdir < 1 then
    tdir = 1
  end if
  me.SetGraphic(tMyObject, tdir, tTeam)
  if voidp(m_vLocalPosition) then
    m_vLocalPosition = tPos
  end if
  if m_rMGE.getSyncState() then
    m_vLocalPosition = tPos
    m_vLocalPosition = m_vLocalPosition.add(tVelocity.multiply(tDt / m_rMGE.GetSubturnSpacing()))
  else
    m_vLocalPosition = m_vLocalPosition
  end if
  m_sineOffset2 = m_sineOffset2 + 1.23999989032745
  if m_sineOffset2 > 2.0 * PI then
    m_sineOffset2 = 0.0
  end if
  tWaveOffset = sin(m_vLocalPosition.x / 2300 + m_sineOffset2) * 100
  tRotation = sin(m_sineOffset1)
  tloc = ProjectAxonometricPosition(point(m_vLocalPosition.x + tWaveOffset, m_vLocalPosition.y + tWaveOffset))
  tInvincible = TestBit(tstate, m_INVINCIBILITYBIT)
  m_rSprites[1].loc = tloc
  m_rSprites[1].rotation = tRotation
  m_rSprites[2].loc = tloc
  m_rSprites[2].rotation = tRotation
  if tInvincible then
    m_rSprites[1].blend = 50
    m_rSprites[2].blend = 50
  else
    m_rSprites[1].blend = 100
    m_rSprites[2].blend = 100
  end if
  if m_bMyShip then
    tmember = VOID
    if m_iMyTeam = 1 then
      tOffset = integer(m_fReloadStatus * m_ar_rMyShipRed.count)
      if tOffset < 1 then
        tOffset = 1
      end if
      tmember = m_ar_rMyShipRed[tOffset]
    else
      tOffset = integer(m_fReloadStatus * m_ar_rMyShipBlue.count)
      if tOffset < 1 then
        tOffset = 1
      end if
      tmember = m_ar_rMyShipBlue[tOffset]
    end if
    if m_rSprites[4].member <> tmember then
      m_rSprites[4].member = tmember
      m_rSprites[4].width = m_rSprites[4].member.width
      m_rSprites[4].height = m_rSprites[4].member.height
    end if
    m_rSprites[4].loc = point(tloc.locH, tloc.locV - 55)
  end if
  if not m_bOwnerWritten then
    t_bNameOK = 1
    tWrName = "ShipNameWriter" & getThread("piratesminigame").getComponent().GetNewReference()
    tPlain = getStructVariable("struct.font.plain")
    tMetrics = [#font: tPlain.getaProp(#font), #fontStyle: tPlain.getaProp(#fontStyle), #color: rgb(250, 250, 250), #bgColor: rgb(0, 0, 0), #fixedLineSpace: 15]
    createWriter(tWrName, tMetrics)
    tWriter = getWriter(tWrName)
    tOwner = me.getObject().GetParam("Owner")
    tImg = image(0, 0, 8)
    if tOwner <> -1 then
      t_rList = m_rMGE.GetParticipantlist().getaProp(tOwner)
      if listp(t_rList) then
        tName = t_rList[#name]
      else
        tName = EMPTY
        t_bNameOK = 0
      end if
    else
      t_sPiratesName = getText("pirates_computer_player_name")
      case integer(tTeam) of
        1:
          t_sPiratesName = getText("pirates_computer_player_name.1")
        2:
          t_sPiratesName = getText("pirates_computer_player_name.2")

      end case
      tName = t_sPiratesName
    end if
    if t_iGameMode = 2 then
      t_iGold = me.getObject().GetParam("Gold")
      tName = tName & RETURN & t_iGold
    end if
    tImg = tWriter.render(tName)
    m_rOwnerDisplayMember.image = tImg
    m_rSprites[5].member = m_rOwnerDisplayMember
    m_rSprites[5].width = m_rSprites[5].member.width
    m_rSprites[5].height = m_rSprites[5].member.height
    m_sPlayerName = tName
    removeWriter(tWrName)
    if t_bNameOK then
      m_bOwnerWritten = 1
    end if
  end if
  if t_iGameMode = 1 then
    if tCarryingFlag <> m_carryingFlag then
      m_carryingFlag = tCarryingFlag
      if tCarryingFlag then
        t_iFlagIndex = 0
        if TestBit(tstate, m_CARRYINGOWNFLAGBIT) then
          case m_iTeam of
            1:
              t_iFlagIndex = 1
            2:
              t_iFlagIndex = 2

          end case
        end if
        if TestBit(tstate, m_CARRYINGENEMYFLAGBIT) then
          case m_iTeam of
            1:
              t_iFlagIndex = 2
            2:
              t_iFlagIndex = 1

          end case
        end if
        if t_iFlagIndex > 0 then
          if not (m_rSprites[7].member = m_ar_rFlags[t_iFlagIndex]) then
            m_rSprites[7].member = m_ar_rFlags[t_iFlagIndex]
            m_rSprites[7].width = m_rSprites[7].member.width
            m_rSprites[7].height = m_rSprites[7].member.height
          end if
        else
          if not (m_rSprites[7].member = VOID) then
            m_rSprites[7].member = VOID
          end if
        end if
      else
        if not (m_rSprites[7].member = VOID) then
          m_rSprites[7].member = VOID
        end if
      end if
    end if
  end if
  m_rSprites[5].loc = point(tloc.locH, tloc.locV - 55)
  m_rSprites[7].loc = point(tloc.locH - 35, tloc.locV - 55)
  tFloatingWreck = TestBit(tstate, m_FLOATINGWRECKBIT)
  tDestroyed = TestBit(tstate, m_DESTROYEDBIT)
  if not tFloatingWreck and tDestroyed then
    if not voidp(m_rSprites[4].member) then
      m_rSprites[4].member = VOID
    end if
    if not voidp(m_rSprites[5].member) then
      m_rSprites[5].member = VOID
    end if
  end if
  if tFloatingWreck or tDestroyed then
    if not voidp(m_rSprites[6].member) then
      m_rSprites[6].member = VOID
    end if
  end if
  m_rSprites[6].loc = tloc
  me.SprZToScreenSpace([m_rSprites[1], m_rSprites[2], m_rSprites[6]], 0)
  me.SprZToFixed([m_rSprites[4], m_rSprites[5]], vector(500, 500, 10000))
  m_rSprites[6].locZ = m_rSprites[6].locZ - 1
  m_rSprites[2].locZ = m_rSprites[1].locZ + 1
  g_profShipVisualizerAcc = g_profShipVisualizerAcc + (the milliSeconds - tTime)
end
on getRealLoc me
  return the loc of m_rSprites[1]
end
on getPlayerName me
  return m_sPlayerName
end