-- Script
property m_rRattler

on construct me
  m_rRattler = VOID
  return 1
end
on deconstruct me
  if not voidp(m_rRattler) then
    removeObject(m_rRattler.getID())
  end if
  return 1
end
on move me
end
on setup me
  t_rattler = getThread("hauntedmansiongame").getComponent().m_rStage.getARattler()
  if t_rattler <> 0 then
    m_rRattler = t_rattler
  end if
end
on rattle me, i_iCoffinAction
  if voidp(m_rRattler) then
    me.setup()
  end if
  if not voidp(m_rRattler) then
    m_rRattler.setState(#rattle, i_iCoffinAction)
  end if
end
on tremble me
  if voidp(m_rRattler) then
    me.setup()
  end if
  if not voidp(m_rRattler) then
    m_rRattler.setState(#tremble)
  end if
end
on GetRattler me
  return m_rRattler
end