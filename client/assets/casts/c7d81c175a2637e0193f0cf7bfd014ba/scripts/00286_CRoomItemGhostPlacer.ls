-- Script
property m_iUpdateType

on select this
  if the doubleClick then
    t_iRef = integer(this.getObject().GetParam("REF"))
    getConnection("VMK").send("UseItem", [#int: t_iRef, #int: 0])
    return callAncestor(#select, this)
  end if
end
on update this
  if voidp(m_iUpdateType) then
    t_iType = value(this.getObject().GetParam("TYPE"))
    case t_iType of
      4006:
        m_iUpdateType = #ghost_1_update
      4007:
        m_iUpdateType = #ghost_2_update
      4008:
        m_iUpdateType = #ghost_3_update

    end case
  else
    executeMessage(m_iUpdateType, this.getObject())
  end if
end