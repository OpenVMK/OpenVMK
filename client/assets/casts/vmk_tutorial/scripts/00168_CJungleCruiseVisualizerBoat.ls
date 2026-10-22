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
property m_i_FlashBlend
property m_bInitialized

on construct me
  m_i_FlashBlend = 0
  tList = ["reflection1", "wake1", "hull1_straight", "hull1_straight_mask", "hull1_left", "hull1_left_mask", "hull1_right", "hull1_right_mask"]
  repeat with tMemName in tList
    getMember(tMemName).useAlpha = 1
  end repeat
  tList = ["reflection3", "wake3", "hull3_straight", "hull3_straight_mask", "hull3_left", "hull3_left_mask", "hull3_right", "hull3_right_mask"]
  repeat with tMemName in tList
    getMember(tMemName).useAlpha = 1
  end repeat
  tList = ["blue1_straight", "grey1_straight", "yellow1_straight", "red1_straight", "blue1_left", "grey1_left", "yellow1_left", "red1_left", "blue1_right", "grey1_right", "yellow1_right", "red1_right"]
  repeat with tMemName in tList
    getMember(tMemName).useAlpha = 1
  end repeat
  tList = ["blue3_straight", "grey3_straight", "yellow3_straight", "red3_straight", "blue3_left", "grey3_left", "yellow3_left", "red3_left", "blue3_right", "grey3_right", "yellow3_right", "red3_right"]
  repeat with tMemName in tList
    getMember(tMemName).useAlpha = 1
  end repeat
  tList = ["straight", "left", "right"]
  repeat with tdir in [1, 3]
    repeat with tFrame in tList
      tHullMem = [#member: getMember("hull" & tdir & "_" & tFrame)]
      tRoofMem = [#member: getMember("grey" & tdir & "_" & tFrame)]
      tUnionList = [tHullMem, tRoofMem]
      tNewRegpoint = point(0, 0)
      tImg = me.createUnionImageFromMemberList(tUnionList, tNewRegpoint, [#createMask: 1, #fillColor: rgb("#FF0000")])
      tMemName = "Boat" & tdir & "_" & tFrame & ".red"
      createMember(tMemName, #bitmap)
      tNuMem = getMember(tMemName)
      tNuMem.image = tImg
      tNuMem.regPoint = tNewRegpoint
    end repeat
  end repeat
  m_ar_graphicsBoatUpStraight = [[#member: getMember("reflection1"), #ink: 33, #avata: 0], [#member: getMember("wake1"), #ink: 33, #avata: 0], [#member: getMember("hull1_straight"), #ink: 0, #avata: 0], [#member: getMember("tempAvatarImage"), #ink: 0, #avata: 1], [#member: getMember("hull1_straight_mask"), #ink: 0, #avata: 0], [#member: VOID, #ink: VOID, #avata: 0, #canopy: 1], [#member: getMember("Boat1_straight.red"), #ink: 0, #avata: 0]]
  m_ar_graphicsBoatUpLeft = [[#member: getMember("reflection1"), #ink: 33, #avata: 0], [#member: getMember("wake1"), #ink: 33, #avata: 0], [#member: getMember("hull1_left"), #ink: 0, #avata: 0], [#member: getMember("tempAvatarImage"), #ink: 0, #avata: 1], [#member: getMember("hull1_left_mask"), #ink: 0, #avata: 0], [#member: VOID, #ink: VOID, #avata: 0, #canopy: 1], [#member: getMember("Boat1_left.red"), #ink: 0, #avata: 0]]
  m_ar_graphicsBoatUpRight = [[#member: getMember("reflection1"), #ink: 33, #avata: 0], [#member: getMember("wake1"), #ink: 33, #avata: 0], [#member: getMember("hull1_right"), #ink: 0, #avata: 0], [#member: getMember("tempAvatarImage"), #ink: 0, #avata: 1], [#member: getMember("hull1_right_mask"), #ink: 0, #avata: 0], [#member: VOID, #ink: VOID, #avata: 0, #canopy: 1], [#member: getMember("Boat1_right.red"), #ink: 0, #avata: 0]]
  m_ar_graphicsCanopyUpStraight = [[#member: getMember("blue1_straight"), #ink: 0], [#member: getMember("grey1_straight"), #ink: 0], [#member: getMember("yellow1_straight"), #ink: 0], [#member: getMember("red1_straight"), #ink: 0]]
  m_ar_graphicsCanopyUpLeft = [[#member: getMember("blue1_left"), #ink: 0], [#member: getMember("grey1_left"), #ink: 0], [#member: getMember("yellow1_left"), #ink: 0], [#member: getMember("red1_left"), #ink: 0]]
  m_ar_graphicsCanopyUpRight = [[#member: getMember("blue1_right"), #ink: 0], [#member: getMember("grey1_right"), #ink: 0], [#member: getMember("yellow1_right"), #ink: 0], [#member: getMember("red1_right"), #ink: 0]]
  m_graphicsSpotUp = [#member: getMember("ur_spot"), #ink: 33]
  m_ar_graphicsBoatDownStraight = [[#member: getMember("reflection3"), #ink: 33, #avata: 0], [#member: getMember("wake3"), #ink: 33, #avata: 0], [#member: getMember("hull3_straight"), #ink: 0, #avata: 0], [#member: VOID, #ink: VOID, #avata: 0, #canopy: 1], [#member: getMember("tempAvatarImage"), #ink: 0, #avata: 1], [#member: getMember("hull3_straight_mask"), #ink: 0, #avata: 0], [#member: getMember("Boat3_straight.red"), #ink: 0, #avata: 0]]
  m_ar_graphicsBoatDownLeft = [[#member: getMember("reflection3"), #ink: 33, #avata: 0], [#member: getMember("wake3"), #ink: 33, #avata: 0], [#member: getMember("hull3_left"), #ink: 0, #avata: 0], [#member: VOID, #ink: VOID, #avata: 0, #canopy: 1], [#member: getMember("tempAvatarImage"), #ink: 0, #avata: 1], [#member: getMember("hull3_left_mask"), #ink: 0, #avata: 0], [#member: getMember("Boat3_left.red"), #ink: 0, #avata: 0]]
  m_ar_graphicsBoatDownRight = [[#member: getMember("reflection3"), #ink: 33, #avata: 0], [#member: getMember("wake3"), #ink: 33, #avata: 0], [#member: getMember("hull3_right"), #ink: 0, #avata: 0], [#member: VOID, #ink: VOID, #avata: 0, #canopy: 1], [#member: getMember("tempAvatarImage"), #ink: 0, #avata: 1], [#member: getMember("hull3_right_mask"), #ink: 0, #avata: 0], [#member: getMember("Boat3_right.red"), #ink: 0, #avata: 0]]
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
  m_bInitialized = 0
  return 1
end
on deconstruct me
  repeat with tSprite in m_rSprites
    releaseSprite(tSprite.spriteNum)
  end repeat
  return 1
end
on collisionNotification me, _type, _collisionType, _collisionObject
  m_i_FlashBlend = 100
end
on update me
  if m_i_FlashBlend > 0 then
    m_i_FlashBlend = m_i_FlashBlend - 5
  end if
  repeat with tSprite in m_rSprites
    tSprite.member = VOID
  end repeat
  t_vPosition = me.getObject().GetScrPos()
  t_sDirection = me.getObject().GetParam("Direction")
  t_iColor = me.getObject().GetParam("Color")
  t_bSpotOn = me.getObject().GetParam("SpotOn")
  t_bAvatarOn = me.getObject().GetParam("AvatarOn")
  t_fSteer = me.getObject().GetParam("Steer")
  if not m_bInitialized then
    tNewRegpoint = point(0, 0)
    tList = m_ar_graphicsBoatUpStraight.duplicate()
    tList.deleteAt(tList.count)
    tImg = me.createUnionImageFromMemberList(tList, tNewRegpoint)
    tMemName = "Boat.up.straight"
    createMember(tMemName, #bitmap)
    tNuMem = getMember(tMemName)
    tNuMem.image = tImg
    tNuMem.regPoint = tNewRegpoint
    m_bInitialized = 1
  end if
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
    tBlend = 100
    if not voidp(t_ar_graphics[i].member) then
      if t_ar_graphics[i].member.name contains ".red" then
        tBlend = m_i_FlashBlend
      end if
    end if
    if not t_ar_graphics[i].getaProp(#canopy) then
      if m_rSprites[i].member <> t_ar_graphics[i].member then
        m_rSprites[i].member = t_ar_graphics[i].member
      end if
      if m_rSprites[i].ink <> t_ar_graphics[i].ink then
        m_rSprites[i].ink = t_ar_graphics[i].ink
      end if
      if t_ar_graphics[i].getaProp(#avata) then
        m_rSprites[i].width = integer(m_rSprites[i].member.image.width * 0.75)
        m_rSprites[i].height = integer(m_rSprites[i].member.image.height * 0.75)
        if not t_bAvatarOn then
          m_rSprites[i].member = VOID
        end if
      end if
      m_rSprites[i].blend = tBlend
    else
      m_rSprites[i].member = t_ar_canopy[t_iColor].member
      m_rSprites[i].ink = t_ar_canopy[t_iColor].ink
    end if
    if m_rSprites[i].locH <> integer(t_vPosition.x) then
      m_rSprites[i].locH = t_vPosition.x
    end if
    if m_rSprites[i].locV <> integer(t_vPosition.y) then
      m_rSprites[i].locV = t_vPosition.y
    end if
    if m_rSprites[i].locZ <> integer(t_vPosition.z) then
      m_rSprites[i].locZ = t_vPosition.z
    end if
  end repeat
  if t_bSpotOn then
    m_rSprites[t_ar_graphics.count + 2].member = t_spot.member
    m_rSprites[t_ar_graphics.count + 2].ink = t_spot.ink
    if m_rSprites[t_ar_graphics.count + 2].locZ <> integer(t_vPosition.z) then
      m_rSprites[t_ar_graphics.count + 2].locZ = t_vPosition.z
    end if
    m_rSprites[t_ar_graphics.count + 2].loc = point(t_vPosition.x, t_vPosition.y)
  end if
end
on createUnionImageFromMemberList me, i_ar_list, _setRegpoint, i_ar_props
  tProps = [#createMask: 0, #fillColor: rgb("#000000")]
  tCheck = [#createMask, #fillColor]
  if not voidp(i_ar_props) and listp(i_ar_props) then
    repeat with tProp in tCheck
      if not voidp(i_ar_props.findPos(tProp)) then
        tProps[tProp] = i_ar_props[tProp]
      end if
    end repeat
  end if
  tUnionList = []
  repeat with tCheckMem in i_ar_list
    if voidp(tCheckMem.member) then
      next repeat
    end if
    tUnionList.append(tCheckMem)
  end repeat
  tMaskList = []
  tUnion = rect(0, 0, 0, 0)
  repeat with tImage in tUnionList
    tMem = tImage.member
    tOffsetRect = tMem.rect - rect(tMem.regPoint, tMem.regPoint)
    tUnion = tUnion.union(tOffsetRect)
    tMaskList.append(tMem.image.extractAlpha())
  end repeat
  tNewRegpoint = -1 * point(tUnion.left, tUnion.top)
  _setRegpoint.locH = tNewRegpoint.locH
  _setRegpoint.locV = tNewRegpoint.locV
  tBlack = image(tUnion.width, tUnion.height, 32)
  tBlack.fill(tBlack.rect, [#shapeType: #rect, #lineSize: 0, #color: rgb("#000000")])
  tMaskImg = image(tUnion.width, tUnion.height, 8, #grayscale)
  repeat with i = 1 to tMaskList.count
    tDeltaRegpoint = tNewRegpoint - tUnionList[i].member.regPoint
    tMaskImg.copyPixels(tBlack, tBlack.rect, tBlack.rect, [#maskImage: tMaskList[i], #maskOffset: tDeltaRegpoint])
  end repeat
  tImg = image(tUnion.width, tUnion.height, 32)
  if tProps.createMask then
    tImg.fill(tImg.rect, [#shapeType: #rect, #lineSize: 0, #color: tProps.fillColor])
  else
    repeat with i = 1 to tUnionList.count
      tDeltaRegpoint = tNewRegpoint - tUnionList[i].member.regPoint
      tImg.copyPixels(tUnionList[i].member.image, tUnionList[i].member.image.rect + rect(tDeltaRegpoint, tDeltaRegpoint), tUnionList[i].member.image.rect, [#maskImage: tMaskList[i]])
    end repeat
  end if
  tImg.setAlpha(tMaskImg)
  tImg.useAlpha = 1
  return tImg
end