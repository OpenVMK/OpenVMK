-- Script
on construct this
  this.m_sThumbRenderMessage = "GetPinThumbnail"
  this.m_sPrevRenderMEssage = "GetPinPreview"
  if objectp(this.m_rGridRenderer) then
    removeObject(this.m_rGridRenderer.getID())
  end if
  this.m_rGridRenderer = createObject(getUniqueID(), ["CGenericThumbnailGrid", "CCatPinThumbnailGrid"])
  return 1
end
on dialogWindowEvent this, a_sDialogName, a_sDialogEvent
  if a_sDialogName = "ConfirmBuy" then
    case a_sDialogEvent of
      #dialogOK:
        if integerp(this.m_iPos) and integerp(this.m_iId) then
          getConnection(getVariable("main.connection.id", "VMK")).send(17, [#int: this.m_iPos, #int: this.m_iId])
          getConnection(getVariable("main.connection.id", "VMK")).send("RequestBalance")
        else
          put "No item defined"
        end if
      #dialogCancel:

    end case
  end if
end
on ShowThumbs this, a_mp_rItems
  this.m_iGridItemCount = a_mp_rItems.count
  t_mp_iType_rThumb = [:]
  t_iOffset = this.m_iGridItemOffset + 1
  t_iLast = min(t_iOffset + 9, a_mp_rItems.count)
  repeat with i = t_iOffset to t_iLast
    t_iCode = a_mp_rItems[i].code
    if not voidp(a_mp_rItems[i].getaProp(#param)) then
      if not voidp(a_mp_rItems[i].getaProp(#param).getaProp("ic")) then
        t_iCode = a_mp_rItems[i].getaProp(#param).getaProp("ic")
      end if
    end if
    t_mp_iType_rThumb.addProp(t_iCode, VOID)
  end repeat
  t_iTotalPages = (this.m_iGridItemCount - 1) / 9 + 1
  t_iCurrentPage = this.m_iGridItemOffset / 9 + 1
  t_sText = getText("cat.page", EMPTY)
  t_sText = replaceChunks(t_sText, "%P", string(t_iCurrentPage))
  t_sText = replaceChunks(t_sText, "%C", string(t_iTotalPages))
  this.m_rWndObj.getElement("catalog.itemspage").setText(t_sText)
  this.m_bLoadingThumbnails = 1
  this.m_rGridLoadAnim.SetBufferElement(this.m_rWndObj.getElement("thumbs.grid.b"))
  receiveUpdate(this.m_rGridLoadAnim.getID())
  if t_mp_iType_rThumb.count > 0 then
    executeMessage(this.m_sThumbRenderMessage, t_mp_iType_rThumb, [#client: this.getID(), #method: #_ThumbsRenderedCbk])
  else
    this._ThumbsRenderedCbk([:])
  end if
end