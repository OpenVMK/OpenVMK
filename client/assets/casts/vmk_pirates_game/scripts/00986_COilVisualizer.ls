-- Script
property m_sprite
property m_ar_rFireAnim
property m_ar_mp_Flames

on construct me
  m_sprite = sprite(reserveSprite(me.getID()))
  m_sprite.member = VOID
  m_sprite.locZ = -45
  m_sprite.loc = point(0, 0)
  m_sprite.member = member("oilspill")
  m_sprite.width = m_sprite.member.width
  m_sprite.height = m_sprite.member.height
  t_ar_sFireAnim = ["fire_01", "fire_02", "fire_03", "fire_04", "fire_05", "fire_06", "fire_07", "fire_08", "fire_09", "fire_10", "fire_11", "fire_12", "fire_13", "fire_14", "fire_15"]
  m_ar_rFireAnim = []
  repeat with tFrame in t_ar_sFireAnim
    m_ar_rFireAnim.append(getMember(tFrame))
  end repeat
  m_ar_mp_Flames = []
  repeat with i = 1 to 3
    m_ar_mp_Flames.append([#Spr: sprite(reserveSprite(me.getID())), #frame: random(t_ar_sFireAnim.count)])
  end repeat
  return 1
end
on deconstruct me
  releaseSprite(m_sprite.spriteNum)
  repeat with t_mp_flame in m_ar_mp_Flames
    releaseSprite(t_mp_flame.Spr.spriteNum)
  end repeat
  return 1
end
on update me
  tAge = me.getObject().GetParam("Age")
  ttype = me.getObject().GetParam("Type")
  tPos = me.getObject().GetParam("WorldPosition")
  repeat with t_mp_flame in m_ar_mp_Flames
    t_mp_flame.Spr.member = m_ar_rFireAnim[t_mp_flame.frame]
    t_mp_flame.Spr.width = t_mp_flame.Spr.member.width
    t_mp_flame.Spr.height = t_mp_flame.Spr.member.height
    t_mp_flame.frame = t_mp_flame.frame + 1
    if t_mp_flame.frame > m_ar_rFireAnim.count then
      t_mp_flame.frame = 1
    end if
  end repeat
  tloc = ProjectAxonometricPosition(point(tPos.x, tPos.y))
  m_sprite.loc = tloc
  m_ar_mp_Flames[1].Spr.loc = tloc + point(0, -10)
  m_ar_mp_Flames[2].Spr.loc = tloc + point(15, -5)
  m_ar_mp_Flames[3].Spr.loc = tloc + point(-18, -2)
  me.SprZToScreenSpace([m_sprite], 0)
  me.SprZToScreenSpace([m_ar_mp_Flames[1].Spr, m_ar_mp_Flames[2].Spr, m_ar_mp_Flames[3].Spr], 1)
end