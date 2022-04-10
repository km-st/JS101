/*
  a function that returns the sum of two numbers
 
  START

  # Given two input num1 and num1

  PRINT num1 + num2

  END
*/

/*
  a function that takes an array of strings, and returns a string that is all those strings concatenated together

  START

  # Given an array of string called "strings"

  SET concatenatedString = ""
  SET interator = 0
  
  WHILE iterator <= length of strings - 1
    SET currentString = string[iterator]
    SET concatenatedString += string
    
  PRINT concatenatedString
  
  END
*/

/*
  a method that takes an array of integers, and returns a new array with every other element from the original array, starting with the first element. For instance:

  START

  # Given a collection of integers called "integers"

  SET interator = 0
  SET returnArray = []
  
  WHILE iterator <= length of numbers - 1
    SET currentNumber = value within numbers collection at space "iterator"
    IF iterator is odd 
      push currentNumber to returnArray array
    ELSE
      skip to the next iteration

  PRINT returnArray

  END
*/

/*
  a function that determines the index of the 3rd occurrence of a given character in a string. For instance, if the given character is 'x' and the string is 'axbxcdxex', the function should return 6 (the index of the 3rd 'x'). If the given character does not occur at least 3 times, return null.

  START

  # Given a string "string" and a character to search for called "character"

  SET iterator = 0
  SET stringArray = array of "string" invidividual characters
  SET numberOfInstances = 0
  
  WHILE iterator <= length of stringArray - 1
    SET currentCharacter = value within numbers collection at space "iterator"
    IF currentCharacter === "character" AND numberOfInstances <= 2, increment numberOfIstances by 1
    ELSE IF currentCharacter === "character" AND numberOfInstances === 2 
      PRINT iterator
    ELSE skip to the next iteration

  PRINT returnArray

  END
*/

/*
  a function that takes two arrays of numbers and returns the result of merging the arrays. The elements of the first array should become the elements at the even indexes of the returned array, while the elements of the second array should becoome the elements at the odd indexes.

  START

  # Given a two arrays "array1" and "array2"

  SET totalLength = length of array1 + length of array2
  SET firstArrayIndex = 0
  SET secondArrayIndex = 0
  SET iterator = 0
  SET mergedArray = []
  
  WHILE iterator <= length of stringArray - 1
    IF iterator is even 
      mergedArray[iterator] = firstArray[firstArrayIndex]
      increment firstArrayIndex by 1
      increment iterator
    ELSE IF iterator is odd 
      mergedArray[iterator] = secondArray[secondArrayIndex]
      increment secondArrayIndex by 1
      increment iterator

  PRINT mergedArray

  END
*/

console.log(helloWorld);
