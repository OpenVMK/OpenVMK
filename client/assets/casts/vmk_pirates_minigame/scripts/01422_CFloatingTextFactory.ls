-- Script
property m_rWriter
property m_ar_rSprFloats
property m_iFloatSpeed
property m_iFloatFade

on construct me
  m_iFloatSpeed = 3
  m_iFloatFade = 4
  m_ar_rSprFloats = []
  m_rWriter = VOID
  tPlain = getStructVariable("struct.font.plain")
  tMetrics = [#font: tPlain.getaProp(#font), #fontStyle: tPlain.getaProp(#fontStyle), #color: rgb(250, 250, 250), #bgColor: rgb(0, 51, 102), #fixedLineSpace: 15]
  createWriter("PiratesFloatWriter", tMetrics)
  m_rWriter = getWriter("PiratesFloatWriter")
  return 1
end
on deconstruct me
  removeWriter("PiratesFloatWriter")
  repeat with tSpr in m_ar_rSprFloats
    removeMember(tSpr.member.name)
    releaseSprite(tSpr.spriteNum)
  end repeat
  return 1
end
on CreateNewFloat me, a_sText, a_pLoc
  tNewSprite = sprite(reserveSprite(me.getID()))
  if tNewSprite.spriteNum <> 0 then
    tmember = member(createMember("Float" & the milliSeconds, #bitmap))
    tmember.image = m_rWriter.render(a_sText)
    tNewSprite.member = tmember
    tNewSprite.ink = 36
    tNewSprite.loc = a_pLoc
    m_ar_rSprFloats.append(tNewSprite)
  else
    error(me, "Can't reserve sprite for new floating text", #CreateNewFloat)
  end if
end
on update me
  t_ar_newFloats = []
  repeat with tSpr in m_ar_rSprFloats
    tSpr.loc = point(tSpr.loc.locH, tSpr.loc.locV - m_iFloatSpeed)
    if tSpr.blend - m_iFloatFade > 0 then
      t_ar_newFloats.append(tSpr)
      tSpr.blend = tSpr.blend - m_iFloatFade
      next repeat
    end if
    removeMember(tSpr.member.name)
    releaseSprite(tSpr.spriteNum)
  end repeat
  m_ar_rSprFloats = t_ar_newFloats
end