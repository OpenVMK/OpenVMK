-- Script
property m_bSelected
property m_rClientItem

on deconstruct this
  unregisterMessage("teleport_selected", this.getID())
  unregisterMessage("teleport_unselected", this.getID())
  m_rClientItem = VOID
end
on SetClientItem this, a_rItem
  m_bSelected = 0
  m_rClientItem = a_rItem
  registerMessage("teleport_selected", this.getID(), #PairedItemSelected)
  registerMessage("teleport_unselected", this.getID(), #PairedItemUnselected)
end
on GetClientItem this
  return m_rClientItem
end
on PairedItemSelected this, a_iOtherID
  if m_rClientItem.valid then
    t_ar_vParams = m_rClientItem.getObject().GetParam("PARAMS")
    if ilk(t_ar_vParams, #list) then
      if a_iOtherID = t_ar_vParams[3] then
        m_rClientItem.getObject().GetVisual().SetCustomHighlighters(1, #teleportpair)
        m_bSelected = 1
      end if
    end if
  else
    removeObject(this.getID())
  end if
end
on PairedItemUnselected this, a_iOtherID
  if m_rClientItem.valid then
    t_ar_vParams = m_rClientItem.getObject().GetParam("PARAMS")
    if m_bSelected then
      m_rClientItem.getObject().GetVisual().SetCustomHighlighters(0)
      m_bSelected = 0
    end if
    if ilk(t_ar_vParams, #list) then
      if a_iOtherID = t_ar_vParams[3] then
        m_rClientItem.getObject().GetVisual().SetCustomHighlighters(0)
      end if
    end if
  else
    removeObject(this.getID())
  end if
end