-- Script
property m_mp_sSet_ar_sCasts

on construct this
  if variableExists("CastList") then
    t_mp_sSet_ar_sCasts = getVariableValue("CastList")
    t_sFilePath = getVariable("clothes_filepath", "vmk_clothes/vmk_avatar_")
    if listp(t_mp_sSet_ar_sCasts) then
      m_mp_sSet_ar_sCasts = [:]
      repeat with i = 1 to t_mp_sSet_ar_sCasts.count
        t_ar_data = t_mp_sSet_ar_sCasts[i]
        t_sID = t_mp_sSet_ar_sCasts.getPropAt(i)
        t_ar_AlteredData = []
        repeat with e = 1 to t_ar_data.count
          t_ar_AlteredData.add(t_sFilePath & t_ar_data[e])
        end repeat
        m_mp_sSet_ar_sCasts.addProp(t_sID, t_ar_AlteredData)
      end repeat
    end if
  else
    m_mp_sSet_ar_sCasts = [:]
    error(this, "Cloth asset cast index not found!", #construct)
  end if
end
on deconstruct this
  m_mp_sSet_ar_sCasts = VOID
end
on GetByTypeCode this, a_iClothTypeCode
  t_ar_sCasts = m_mp_sSet_ar_sCasts[string(a_iClothTypeCode)]
  if voidp(t_ar_sCasts) then
    t_ar_sCasts = []
  end if
  return [#param: ["CASTS": t_ar_sCasts]]
end