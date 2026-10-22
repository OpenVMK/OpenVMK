-- Behavior
on RecordSpriteAnim a_iSprite, a_iStart, a_iEnd, a_ptCenter
  t_iFloatPrec = the floatPrecision
  set the floatPrecision to 3
  if voidp(a_ptCenter) then
    go(a_iStart)
    a_ptCenter = sprite(a_iSprite).loc
  end if
  t_ar_rFrames = []
  t_ar_sMembers = []
  repeat with t_iFrame = a_iStart to a_iEnd
    go(t_iFrame)
    t_rSprite = sprite(a_iSprite)
    t_rMember = t_rSprite.member
    t_iMember = t_ar_sMembers.getPos(t_rMember.name)
    if t_iMember < 1 then
      t_ar_sMembers.add(t_rMember.name)
      t_iMember = t_ar_sMembers.count
    end if
    t_rFrame = [:]
    t_rFrame.setaProp(#member, t_iMember)
    t_rFrame.setaProp(#offset, t_rSprite.loc - a_ptCenter)
    t_rFrame.setaProp(#blend, t_rSprite.blend)
    t_rFrame.setaProp(#ink, t_rSprite.ink)
    t_rFrame.setaProp(#flipH, t_rSprite.flipH)
    t_rFrame.setaProp(#flipV, t_rSprite.flipV)
    t_rFrame.setaProp(#scale, [float(t_rSprite.width) / float(t_rMember.width), float(t_rSprite.height) / float(t_rMember.height)])
    t_ar_rFrames.add(t_rFrame)
  end repeat
  t_rOutput = [#version: 0, #members: t_ar_sMembers, #frames: t_ar_rFrames]
  t_sOutput = string(t_rOutput)
  set the floatPrecision to t_iFloatPrec
  return t_sOutput
end