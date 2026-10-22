-- Script
property m_rSprites
property m_ar_graphicsBoatUpStraight
property m_ar_graphicsBoatUpLeft
property m_ar_graphicsBoatUpRight
property m_ar_graphicsCanopyUpStraight
property m_ar_graphicsCanopyUpLeft
property m_ar_graphicsCanopyUpRight
property m_graphicsSpotUp
property m_ar_graphicsBoatDownStraight
property m_ar_graphicsBoatDownLeft
property m_ar_graphicsBoatDownRight
property m_ar_graphicsCanopyDownStraight
property m_ar_graphicsCanopyDownLeft
property m_ar_graphicsCanopyDownRight
property m_graphicsSpotDown
property m_iMemnumAvatarVisualizer

on construct me
  getMember("reflection1").useAlpha = 1
  getMember("wake1").useAlpha = 1
  getMember("hull1_straight").useAlpha = 1
  getMember("hull1_straight_mask").useAlpha = 1
  getMember("hull1_left").useAlpha = 1
  getMember("hull1_left_mask").useAlpha = 1
  getMember("hull1_right").useAlpha = 1
  getMember("hull1_right_mask").useAlpha = 1
  getMember("reflection3").useAlpha = 1
  getMember("wake3").useAlpha = 1
  getMember("hull3_straight").useAlpha = 1
  getMember("hull3_straight_mask").useAlpha = 1
  getMember("hull3_left").useAlpha = 1
  getMember("hull3_left_mask").useAlpha = 1
  getMember("hull3_right").useAlpha = 1
  getMember("hull3_right_mask").useAlpha = 1
  getMember("blue1_straight").useAlpha = 1
  getMember("grey1_straight").useAlpha = 1
  getMember("yellow1_straight").useAlpha = 1
  getMember("red1_straight").useAlpha = 1
  getMember("blue1_left").useAlpha = 1
  getMember("grey1_left").useAlpha = 1
  getMember("yellow1_left").useAlpha = 1
  getMember("red1_left").useAlpha = 1
  getMember("blue1_right").useAlpha = 1
  getMember("grey1_right").useAlpha = 1
  getMember("yellow1_right").useAlpha = 1
  getMember("red1_right").useAlpha = 1
  getMember("blue3_straight").useAlpha = 1
  getMember("grey3_straight").useAlpha = 1
  getMember("yellow3_straight").useAlpha = 1
  getMember("red3_straight").useAlpha = 1
  getMember("blue3_left").useAlpha = 1
  getMember("grey3_left").useAlpha = 1
  getMember("yellow3_left").useAlpha = 1
  getMember("red3_left").useAlpha = 1
  getMember("blue3_right").useAlpha = 1
  getMember("grey3_right").useAlpha = 1
  getMember("yellow3_right").useAlpha = 1
  getMember("red3_right").useAlpha = 1
  m_iMemnumAvatarVisualizer = createMember(getUniqueID(), #bitmap)
  m_ar_graphicsBoatUpStraight = [[#member: getMember("reflection1"), #ink: 33, #avata: 0], [#member: getMember("wake1"), #ink: 33, #avata: 0], [#member: getMember("hull1_straight"), #ink: 0, #avata: 0], [#member: member(m_iMemnumAvatarVisualizer), #ink: 0, #avata: 1], [#member: getMember("hull1_straight_mask"), #ink: 0, #avata: 0], [#member: VOID, #ink: VOID, #avata: 0, #canopy: 1]]
  m_ar_graphicsBoatUpLeft = [[#member: getMember("reflection1"), #ink: 33, #avata: 0], [#member: getMember("wake1"), #ink: 33, #avata: 0], [#member: getMember("hull1_left"), #ink: 0, #avata: 0], [#member: member(m_iMemnumAvatarVisualizer), #ink: 0, #avata: 1], [#member: getMember("hull1_left_mask"), #ink: 0, #avata: 0], [#member: VOID, #ink: VOID, #avata: 0, #canopy: 1]]
  m_ar_graphicsBoatUpRight = [[#member: getMember("reflection1"), #ink: 33, #avata: 0], [#member: getMember("wake1"), #ink: 33, #avata: 0], [#member: getMember("hull1_right"), #ink: 0, #avata: 0], [#member: member(m_iMemnumAvatarVisualizer), #ink: 0, #avata: 1], [#member: getMember("hull1_right_mask"), #ink: 0, #avata: 0], [#member: VOID, #ink: VOID, #avata: 0, #canopy: 1]]
  m_ar_graphicsCanopyUpStraight = [[#member: getMember("blue1_straight"), #ink: 0], [#member: getMember("grey1_straight"), #ink: 0], [#member: getMember("yellow1_straight"), #ink: 0], [#member: getMember("red1_straight"), #ink: 0]]
  m_ar_graphicsCanopyUpLeft = [[#member: getMember("blue1_left"), #ink: 0], [#member: getMember("grey1_left"), #ink: 0], [#member: getMember("yellow1_left"), #ink: 0], [#member: getMember("red1_left"), #ink: 0]]
  m_ar_graphicsCanopyUpRight = [[#member: getMember("blue1_right"), #ink: 0], [#member: getMember("grey1_right"), #ink: 0], [#member: getMember("yellow1_right"), #ink: 0], [#member: getMember("red1_right"), #ink: 0]]
  m_graphicsSpotUp = [#member: getMember("ur_spot"), #ink: 33]
  m_ar_graphicsBoatDownStraight = [[#member: getMember("reflection3"), #ink: 33, #avata: 0], [#member: getMember("wake3"), #ink: 33, #avata: 0], [#member: getMember("hull3_straight"), #ink: 0, #avata: 0], [#member: VOID, #ink: VOID, #avata: 0, #canopy: 1], [#member: member(m_iMemnumAvatarVisualizer), #ink: 0, #avata: 1], [#member: getMember("hull3_straight_mask"), #ink: 0, #avata: 0]]
  m_ar_graphicsBoatDownLeft = [[#member: getMember("reflection3"), #ink: 33, #avata: 0], [#member: getMember("wake3"), #ink: 33, #avata: 0], [#member: getMember("hull3_left"), #ink: 0, #avata: 0], [#member: VOID, #ink: VOID, #avata: 0, #canopy: 1], [#member: member(m_iMemnumAvatarVisualizer), #ink: 0, #avata: 1], [#member: getMember("hull3_left_mask"), #ink: 0, #avata: 0]]
  m_ar_graphicsBoatDownRight = [[#member: getMember("reflection3"), #ink: 33, #avata: 0], [#member: getMember("wake3"), #ink: 33, #avata: 0], [#member: getMember("hull3_right"), #ink: 0, #avata: 0], [#member: VOID, #ink: VOID, #avata: 0, #canopy: 1], [#member: member(m_iMemnumAvatarVisualizer), #ink: 0, #avata: 1], [#member: getMember("hull3_right_mask"), #ink: 0, #avata: 0]]
  m_ar_graphicsCanopyDownStraight = [[#member: getMember("blue3_straight"), #ink: 0], [#member: getMember("grey3_straight"), #ink: 0], [#member: getMember("yellow3_straight"), #ink: 0], [#member: getMember("red3_straight"), #ink: 0]]
  m_ar_graphicsCanopyDownLeft = [[#member: getMember("blue3_left"), #ink: 0], [#member: getMember("grey3_left"), #ink: 0], [#member: getMember("yellow3_left"), #ink: 0], [#member: getMember("red3_left"), #ink: 0]]
  m_ar_graphicsCanopyDownRight = [[#member: getMember("blue3_right"), #ink: 0], [#member: getMember("grey3_right"), #ink: 0], [#member: getMember("yellow3_right"), #ink: 0], [#member: getMember("red3_right"), #ink: 0]]
  m_graphicsSpotDown = [#member: getMember("dr_spot"), #ink: 33]
  m_rSprites = []
  repeat with tmember in m_ar_graphicsBoatUpStraight
    tSprite = sprite(reserveSprite(me.getID()))
    m_rSprites.append(tSprite)
  end repeat
  m_rSprites.append(sprite(reserveSprite(me.getID())))
  m_rSprites.append(sprite(reserveSprite(me.getID())))
  return 1
end
on deconstruct me
  repeat with tSprite in m_rSprites
    releaseSprite(tSprite.spriteNum)
  end repeat
  removeMember(member(m_iMemnumAvatarVisualizer).name)
  return 1
end
on SetAvatarImage me, a_rImage
  member(m_iMemnumAvatarVisualizer).image = a_rImage
  member(m_iMemnumAvatarVisualizer).regPoint = point(73, 116)
end
on update me
  repeat with tSprite in m_rSprites
    tSprite.member = VOID
  end repeat
  t_vPosition = me.getObject().GetScrPos()
  t_sDirection = me.getObject().GetParam("Direction")
  t_iColor = me.getObject().GetParam("Color")
  t_bSpotOn = me.getObject().GetParam("SpotOn")
  t_bAvatarOn = me.getObject().GetParam("AvatarOn")
  t_fSteer = me.getObject().GetParam("Steer")
  t_ar_graphics = []
  t_ar_canopy = []
  t_ar_spot = VOID
  case t_sDirection of
    "up":
      if t_fSteer <= -1.44999992847443 then
        t_ar_graphics = m_ar_graphicsBoatUpLeft
        t_ar_canopy = m_ar_graphicsCanopyUpLeft
        t_spot = m_graphicsSpotUp
      else
        if t_fSteer >= 1.44999992847443 then
          t_ar_graphics = m_ar_graphicsBoatUpRight
          t_ar_canopy = m_ar_graphicsCanopyUpRight
          t_spot = m_graphicsSpotUp
        else
          t_ar_graphics = m_ar_graphicsBoatUpStraight
          t_ar_canopy = m_ar_graphicsCanopyUpStraight
          t_spot = m_graphicsSpotUp
        end if
      end if
    "down":
      if t_fSteer <= -1.44999992847443 then
        t_ar_graphics = m_ar_graphicsBoatDownLeft
        t_ar_canopy = m_ar_graphicsCanopyDownLeft
        t_spot = m_graphicsSpotDown
      else
        if t_fSteer >= 1.44999992847443 then
          t_ar_graphics = m_ar_graphicsBoatDownRight
          t_ar_canopy = m_ar_graphicsCanopyDownRight
          t_spot = m_graphicsSpotDown
        else
          t_ar_graphics = m_ar_graphicsBoatDownStraight
          t_ar_canopy = m_ar_graphicsCanopyDownStraight
          t_spot = m_graphicsSpotDown
        end if
      end if

  end case
  tStartZ = t_vPosition.z - t_ar_graphics.count - 3
  repeat with i = 1 to t_ar_graphics.count
    if not t_ar_graphics[i].getaProp(#canopy) then
      m_rSprites[i].member = t_ar_graphics[i].member
      m_rSprites[i].width = m_rSprites[i].member.width
      m_rSprites[i].height = m_rSprites[i].member.height
      m_rSprites[i].ink = t_ar_graphics[i].ink
      m_rSprites[i].locZ = tStartZ + i
      m_rSprites[i].loc = point(t_vPosition.x, t_vPosition.y)
      if t_ar_graphics[i].getaProp(#avata) then
        m_rSprites[i].width = integer(m_rSprites[i].member.image.width * 0.75)
        m_rSprites[i].height = integer(m_rSprites[i].member.image.height * 0.75)
        if not t_bAvatarOn then
          m_rSprites[i].member = VOID
        end if
      end if
      next repeat
    end if
    m_rSprites[i].member = t_ar_canopy[t_iColor].member
    m_rSprites[i].width = m_rSprites[i].member.width
    m_rSprites[i].height = m_rSprites[i].member.height
    m_rSprites[i].ink = t_ar_canopy[t_iColor].ink
    m_rSprites[i].locZ = tStartZ + i
    m_rSprites[i].loc = point(t_vPosition.x, t_vPosition.y)
  end repeat
  if t_bSpotOn then
    i = t_ar_graphics.count + 2
    m_rSprites[i].member = t_spot.member
    m_rSprites[i].width = m_rSprites[i].member.width
    m_rSprites[i].height = m_rSprites[i].member.height
    m_rSprites[i].ink = t_spot.ink
    m_rSprites[i].locZ = t_vPosition.z
    m_rSprites[i].loc = point(t_vPosition.x, t_vPosition.y)
  end if
end