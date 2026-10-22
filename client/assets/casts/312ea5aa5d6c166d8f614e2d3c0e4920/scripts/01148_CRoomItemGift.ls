-- Script
property m_obj_GiftHandler

on construct me
  if objectExists("GiftHandler") then
    m_obj_GiftHandler = getObject("GiftHandler")
  else
    m_obj_GiftHandler = createObject("GiftHandler", "CRoomItemGiftHandler")
  end if
end
on OpenFromInventory this, a_iRef
  getConnection("VMK").send("ReadGiftMessage", [#int: 1, #int: a_iRef])
  if objectp(m_obj_GiftHandler) then
    m_obj_GiftHandler.SetModal(1)
    m_obj_GiftHandler.SetGiftItem(a_iRef, this)
  end if
end
on select this
  if the doubleClick then
    t_iRef = integer(this.getObject().GetParam("REF"))
    getConnection("VMK").send("UseItem", [#int: t_iRef, #int: 0])
    if objectp(m_obj_GiftHandler) then
      m_obj_GiftHandler.SetGiftItem(t_iRef, this)
    end if
  end if
end