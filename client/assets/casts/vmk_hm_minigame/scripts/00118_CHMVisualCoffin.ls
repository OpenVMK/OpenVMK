-- Script
property m_rSprite

on construct me
  return 1
end
on deconstruct me
  return 1
end
on update me
  t_rattler = me.getObject().GetFactor().GetRattler()
  if not voidp(t_rattler) then
    case t_rattler.GetState() of
      #tremble:
        t_rattler.tremble()
      #rattle:
        t_rattler.rattle()

    end case
  end if
end