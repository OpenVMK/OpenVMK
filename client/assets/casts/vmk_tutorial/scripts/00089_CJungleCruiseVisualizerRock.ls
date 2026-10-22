-- Script
property m_b_Inited
property m_rSprite

on construct me
  m_rSprite = sprite(reserveSprite(me.getID()))
  m_rSprite.ink = 36
  m_b_Inited = 0
  return 1
end
on deconstruct me
  releaseSprite(m_rSprite.spriteNum)
  return 1
end
on update me
  if not m_b_Inited then
    tPos = me.getObject().GetScrPos()
    m_rSprite.member = getMember("jc_hazard_01")
    m_rSprite.locZ = tPos.z - 150
    m_rSprite.loc = point(tPos.x, tPos.y)
    m_b_Inited = 1
  end if
  tEntryFrames = me.getObject().GetParam("Entry")
  tLoopFrames = me.getObject().GetParam("Loop")
  tLeaveFrames = me.getObject().GetParam("Leave")
  tFrameNum = me.getObject().GetParam("FrameNum")
  tstate = me.getObject().GetParam("State")
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
    tOrgWidth = m_rSprite.member.image.width
    tOrgHeight = m_rSprite.member.image.height
    m_rSprite.width = tOrgWidth
    m_rSprite.height = tOrgHeight
  end if
end
on getSprite me
  return m_rSprite
end