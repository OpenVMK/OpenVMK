-- Behavior
on getCleanWordList input
  t_output = replaceChars(input, numToChar(10), numToChar(13))
  return convertToLowerCase(t_output)
end