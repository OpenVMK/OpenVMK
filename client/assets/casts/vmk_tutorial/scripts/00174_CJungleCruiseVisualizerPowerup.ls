-- Script
property m_rSprite
property m_veLastScr

on construct me
  m_rSprite = sprite(reserveSprite(me.getID()))
  return 1
end
on deconstruct me
  releaseSprite(m_rSprite.spriteNum)
  return 1
end
on update me
  tPos = me.getObject().GetScrPos()
  ttype = me.getObject().GetParam("Type")
  case ttype of
    #fuel:
      m_rSprite.member = getMember("gasoline_pickup")
    #film:
      m_rSprite.member = getMember("film_pickup")

  end case
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
end
on getSprite me
  return m_rSprite
end