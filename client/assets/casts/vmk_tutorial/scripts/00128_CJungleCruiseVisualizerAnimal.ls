-- Script
property m_rSprite
property m_ar_graphics
property m_veLastScr

on construct me
  m_ar_graphics = []
  m_rSprite = sprite(reserveSprite(me.getID()))
  m_rSprite.ink = 36
  return 1
end
on deconstruct me
  releaseSprite(m_rSprite.spriteNum)
  return 1
end
on update me
  tEntryFrames = me.getObject().GetParam("Entry")
  tLoopFrames = me.getObject().GetParam("Loop")
  tLeaveFrames = me.getObject().GetParam("Leave")
  tFrameNum = me.getObject().GetParam("FrameNum")
  tstate = me.getObject().GetParam("State")
  tFlip = me.getObject().GetParam("Flip")
  tScale = me.getObject().GetParam("Scale")
  tPos = me.getObject().GetScrPos()
  case tstate of
    #entry:
      if tFrameNum > tEntryFrames.count then
        tFrameNum = tEntryFrames.count
      end if
      tNewMember = tEntryFrames[tFrameNum]
    #loop:
      if tFrameNum > tLoopFrames.count then
        tFrameNum = tFrameNum mod tLoopFrames.count + 1
      end if
      tNewMember = tLoopFrames[tFrameNum]
    #leave:
      if tFrameNum > tLeaveFrames.count then
        tFrameNum = tLeaveFrames.count
      end if
      tNewMember = tLeaveFrames[tFrameNum]

  end case
  if m_rSprite.member <> tNewMember then
    m_rSprite.member = tNewMember
  end if
  t_veScr = tPos
  if m_veLastScr <> t_veScr then
    t_fXs = t_veScr.x
    t_fYs = t_veScr.y
    t_fZs = t_veScr.z
    m_rSprite.locH = t_fXs
    m_rSprite.locV = t_fYs
    m_rSprite.locZ = t_fZs
    m_veLastScr = t_veScr
  end if
  tOrgWidth = m_rSprite.member.image.width
  tOrgHeight = m_rSprite.member.image.height
  m_rSprite.width = tOrgWidth * tScale
  m_rSprite.height = tOrgHeight * tScale
  m_rSprite.flipH = tFlip
end
on getSprite me
  return m_rSprite
end