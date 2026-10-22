-- Movie Script
property ancestor

on construct me
  registerMessage("GetClothesData", me.getID(), #GetClothesData)
end
on deconstruct me
end
on GetClothesData me, a_mp_Data
  if listp(a_mp_Data) then
    trace(a_mp_Data.Output)
    tItem = getVariableValue("CastList")
    if tItem[a_mp_Data.input] = VOID then
      a_mp_Data.Output = [1, 2, propList(#SetNumber, a_mp_Data.input, #sex, "U", #SetName, "hr")]
    else
      tDelim = the itemDelimiter
      the itemDelimiter = "_"
      t_sSetName = tItem[a_mp_Data.input][1].item[1]
      the itemDelimiter = tDelim
      if t_sSetName = "lpn" or t_sSetName = "rpn" then
        t_sSetName = "pn"
      end if
      a_mp_Data.Output = [1, 2, propList(#SetNumber, a_mp_Data.input, #sex, "U", #SetName, t_sSetName)]
    end if
  end if
end