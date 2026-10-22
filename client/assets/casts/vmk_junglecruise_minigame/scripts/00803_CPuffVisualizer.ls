-- Script
property m_rSprite
property m_veLastScr
property m_ar_frames

on construct me
  m_rSprite = sprite(reserveSprite(me.getID()))
  m_rSprite.member = VOID
  m_rSprite.loc = point(0, 0)
  t_ar_frames = getVariableValue("Smoke")
  m_ar_frames = me.CreateMemberListFromLoop(t_ar_frames)
  return 1
end
on deconstruct me
  releaseSprite(m_rSprite.spriteNum)
  return 1
end
on update me
  tAge = me.getObject().GetParam("Age")
  tScale = me.getObject().GetParam("Scale")
  tFrame = tAge
  if tFrame > m_ar_frames.count then
    tFrame = m_ar_frames.count
  end if
  tPuffFrame = m_ar_frames[tFrame]
  t_veScr = me.getObject().GetScrPos()
  if m_veLastScr <> t_veScr then
    t_fXs = t_veScr.x
    t_fYs = t_veScr.y
    t_fZs = t_veScr.z
    m_rSprite.locH = t_fXs
    m_rSprite.locV = t_fYs
    m_rSprite.locZ = t_fZs
    m_veLastScr = t_veScr
  end if
  if m_rSprite.member <> tPuffFrame then
    m_rSprite.member = tPuffFrame
  end if
  tWidth = m_rSprite.member.image.width * tScale
  if m_rSprite.width <> tWidth then
    m_rSprite.width = tWidth
  end if
  tHeight = m_rSprite.member.image.height * tScale
  if m_rSprite.height <> tHeight then
    m_rSprite.height = tHeight
  end if
end
on CreateMemberListFromLoop me, _loop
  tMemList = []
  repeat with tMemName in _loop
    tMem = getMember(tMemName)
    if tMem <> 0 then
      tMemList.append(tMem)
      next repeat
    end if
    put "CAnimalManager: Could not find animation member from loop"
  end repeat
  return tMemList
end