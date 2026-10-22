-- Movie Script
property m_obj_ScreenDrawObject

on construct me
  m_obj_ScreenDrawObject = VOID
  return 1
end
on deconstruct me
  return 1
end
on ShowScreen me, a_iAvatarRef
  t_rContext = getThread(#room).component._AccessRoom()
  if objectp(t_rContext) then
    t_rObj = t_rContext._AccessIndexed(a_iAvatarRef, "avatar")
    t_ar_OutlookData = t_rObj.GetVisual().GetOutlook()
    if listp(t_ar_OutlookData) then
      if objectp(m_obj_ScreenDrawObject) then
        t_Img = m_obj_ScreenDrawObject.ParseFigure(t_ar_OutlookData)
      else
        m_obj_ScreenDrawObject = createObject(#temp, "CProjectionImage")
        t_Img = m_obj_ScreenDrawObject.ParseFigure(t_ar_OutlookData)
      end if
    end if
    if not voidp(t_Img) then
      me.interface.ShowProjection(t_Img)
    else
      put "Screen Image missing !!"
    end if
  end if
end