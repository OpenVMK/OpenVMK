-- Script
property m_ar_teams
property m_iStatus
property m_iBarTime
property m_iPossessStartTime
property m_ar_arrows
property m_iDelayedStartTime

on construct me
  m_iStatus = #normal
  m_ar_teams = [:]
  m_ar_teams.sort()
  m_iBarTime = 10000.0
  m_iPossessStartTime = 0
  m_iDelayedStartTime = 0
  m_ar_arrows = []
  return 1
end
on deconstruct me
  repeat with team in m_ar_teams
    releaseSprite(team[1].spriteNum)
    if team.count > 1 then
      if team[2].ilk = #member then
        removeMember(team[2].name)
        next repeat
      end if
      if team[2].ilk = #sprite then
        releaseSprite(team[2].spriteNum)
      end if
    end if
  end repeat
  repeat with t_rArrow in m_ar_arrows
    releaseSprite(t_rArrow.spriteNum)
  end repeat
  return 1
end
on setStatus me, i_iStatus, i_iTime
  m_iStatus = i_iStatus
  case m_iStatus of
    #possessed:
      m_iPossessStartTime = the milliSeconds
      m_iBarTime = 10000.0
    #delayed:
      m_iDelayedStartTime = the milliSeconds
      m_iBarTime = 5000.0

  end case
  if not voidp(i_iTime) then
    m_iBarTime = i_iTime
  end if
end
on GetStatus me
  return m_iStatus
end
on changeControlMethod me, a_iControlMethod
  case a_iControlMethod of
    #mouse:
      t_sControls = "mouse"
      m_ar_arrows[m_ar_arrows.count].visible = 1
    #keyboard:
      t_sControls = "key"
      m_ar_arrows[m_ar_arrows.count].visible = 0
    otherwise:
      t_sControls = "key"
      m_ar_arrows[m_ar_arrows.count].visible = 0

  end case
  repeat with i = 1 to m_ar_arrows.count - 1
    tmember = member("arrow_" & t_sControls & "_b_" & i - 1)
    m_ar_arrows[i].member = tmember
    m_ar_arrows[i].width = tmember.image.width
    m_ar_arrows[i].height = tmember.image.height
  end repeat
end
on setArrowStatus me, a_iLastDirection, a_iNewDirection, a_iControlMethod
  case a_iControlMethod of
    #mouse:
      t_sControls = "mouse"
      m_ar_arrows[m_ar_arrows.count].visible = 1
    #keyboard:
      t_sControls = "key"
      m_ar_arrows[m_ar_arrows.count].visible = 0
    otherwise:
      t_sControls = "key"
      m_ar_arrows[m_ar_arrows.count].visible = 0

  end case
  if a_iLastDirection > -1 then
    m_ar_arrows[a_iLastDirection + 1].member = member("arrow_" & t_sControls & "_b_" & a_iLastDirection)
    m_ar_arrows[a_iLastDirection + 1].width = m_ar_arrows[a_iLastDirection + 1].member.width
    m_ar_arrows[a_iLastDirection + 1].height = m_ar_arrows[a_iLastDirection + 1].member.height
  end if
  if a_iNewDirection > -1 then
    m_ar_arrows[a_iNewDirection + 1].member = member("arrow_" & t_sControls & "_w_" & a_iNewDirection)
    m_ar_arrows[a_iNewDirection + 1].width = m_ar_arrows[a_iNewDirection + 1].member.width
    m_ar_arrows[a_iNewDirection + 1].height = m_ar_arrows[a_iNewDirection + 1].member.height
  end if
end
on Init me, avatarName, i_iTeam
  t_sOwnName = getObject(#session).get("name")
  if t_sOwnName = avatarName then
    repeat with i = 0 to 7
      t_rSprite = sprite(reserveSprite(me.getID()))
      t_rSprite.member = VOID
      t_rSprite.loc = point(-1000, -1000)
      t_rSprite.locZ = 0
      t_rSprite.ink = 36
      t_rSprite.member = member("arrow_key_b_" & i)
      t_rSprite.width = member("arrow_key_b_" & i).image.width
      t_rSprite.height = member("arrow_key_b_" & i).image.height
      m_ar_arrows.append(t_rSprite)
    end repeat
    t_rSprite = sprite(reserveSprite(me.getID()))
    t_rSprite.member = VOID
    t_rSprite.loc = point(-1000, -1000)
    t_rSprite.locZ = 0
    t_rSprite.ink = 36
    t_rSprite.member = member("ring")
    t_rSprite.width = member("ring").image.width
    t_rSprite.height = member("ring").image.height
    t_rSprite.visible = 0
    m_ar_arrows.append(t_rSprite)
    t_rSprite = sprite(reserveSprite(me.getID()))
    t_rSprite.member = VOID
    t_rSprite.loc = point(-1000, -1000)
    t_rSprite.locZ = 0
    t_rSprite.ink = 36
    if i_iTeam = 1 then
      t_rSprite.member = member("hm_arrow_green")
    else
      t_rSprite.member = member("hm_arrow_purple")
    end if
    t_rSprite.width = t_rSprite.member.image.width
    t_rSprite.height = t_rSprite.member.image.height
    m_ar_teams[#arrow] = [t_rSprite]
  end if
  t_rMember = member(createMember(avatarName & "_name.status", #text))
  t_rMember.fontSize = 12
  t_rMember.font = "Arial"
  t_rMember.text = avatarName
  t_rMember.color = rgb("#efefef")
  t_rMember.alignment = #center
  t_rMember.rect = rect(0, 0, 100, 16)
  t_rMember.regPoint = point(50, 0)
  t_rSprite = sprite(reserveSprite(me.getID()))
  t_rSprite.member = VOID
  t_rSprite.loc = point(-1000, -1000)
  t_rSprite.locZ = 0
  t_rSprite.ink = 36
  t_rSprite.member = t_rMember
  t_rSprite.width = t_rSprite.member.image.width
  t_rSprite.height = t_rSprite.member.image.height
  m_ar_teams[#name] = [t_rSprite, t_rMember]
  t_rSprite = sprite(reserveSprite(me.getID()))
  t_rSprite.member = VOID
  t_rSprite.loc = point(-1000, -1000)
  t_rSprite.locZ = 0
  t_rSprite.ink = 36
  t_rSprite.member = member("hm_status_bar")
  t_rSprite.width = t_rSprite.member.image.width
  t_rSprite.height = t_rSprite.member.image.height
  t_rSpriteColor = sprite(reserveSprite(me.getID()))
  t_rSpriteColor.member = VOID
  t_rSpriteColor.loc = point(-1000, -1000)
  t_rSpriteColor.locZ = 0
  t_rSpriteColor.ink = 36
  if i_iTeam = 1 then
    t_rSpriteColor.member = member("hm_status_purple")
  else
    t_rSpriteColor.member = member("hm_status_green")
  end if
  t_rSprite.visible = 0
  t_rSpriteColor.visible = 0
  m_ar_teams[#bar] = [t_rSprite, t_rSpriteColor]
end
on updatePosition me, a_iLoc
  t_pNameDelta = point(0, 70)
  t_pBarDelta = point(0, 60)
  t_pArrowDelta = point(0, 80)
  if m_iStatus = #possessed then
    t_pNameDelta = t_pNameDelta + point(0, 10)
    t_pArrowDelta = t_pArrowDelta + point(0, 10)
    t_iTimePossessed = (1.0 * the milliSeconds - m_iPossessStartTime) / m_iBarTime
    if t_iTimePossessed > 1 then
      t_iTimePossessed = 1
    end if
    if m_ar_teams.count > 1 then
      tW = m_ar_teams.bar[1].width
      m_ar_teams.bar[1].visible = 1
      m_ar_teams.bar[1].loc = point(a_iLoc.x - tW / 2, a_iLoc.y) - t_pBarDelta
      m_ar_teams.bar[1].locZ = a_iLoc.z + 10003
      m_ar_teams.bar[2].visible = 1
      m_ar_teams.bar[2].loc = m_ar_teams.bar[1].loc + point(1, 1)
      m_ar_teams.bar[2].locZ = a_iLoc.z + 10004
      m_ar_teams.bar[2].width = t_iTimePossessed * (tW - 2)
      m_ar_teams.bar[2].height = 2
    end if
  else
    if m_iStatus = #delayed then
      t_pNameDelta = t_pNameDelta + point(0, 10)
      t_pArrowDelta = t_pArrowDelta + point(0, 10)
      t_iTimeDelayed = (1.0 * the milliSeconds - m_iDelayedStartTime) / m_iBarTime
      if t_iTimeDelayed > 1 then
        t_iTimeDelayed = 1
      end if
      if m_ar_teams.count > 1 then
        tW = m_ar_teams.bar[1].width
        m_ar_teams.bar[1].visible = 1
        m_ar_teams.bar[1].loc = point(a_iLoc.x - tW / 2, a_iLoc.y) - t_pBarDelta
        m_ar_teams.bar[1].locZ = a_iLoc.z + 10003
        m_ar_teams.bar[2].visible = 1
        m_ar_teams.bar[2].loc = m_ar_teams.bar[1].loc + point(1, 1)
        m_ar_teams.bar[2].locZ = a_iLoc.z + 10004
        m_ar_teams.bar[2].width = t_iTimeDelayed * (tW - 2)
        m_ar_teams.bar[2].height = 2
      end if
    else
      m_ar_teams.bar[1].visible = 0
      m_ar_teams.bar[2].visible = 0
    end if
  end if
  if m_ar_teams.count > 0 then
    m_ar_teams.name[1].loc = point(a_iLoc.x, a_iLoc.y) - t_pNameDelta
    m_ar_teams.name[1].locZ = a_iLoc.z + 10001
  end if
  if m_ar_teams.count > 2 then
    m_ar_teams.arrow[1].loc = point(a_iLoc.x, a_iLoc.y) - t_pArrowDelta
    m_ar_teams.arrow[1].locZ = a_iLoc.z + 10002
    repeat with i = 1 to m_ar_arrows.count
      t_rArrow = m_ar_arrows[i]
      t_rArrow.loc = point(a_iLoc.x, a_iLoc.y)
      t_rArrow.locZ = a_iLoc.z - 1
    end repeat
  end if
end