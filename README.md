# Roll20 Macro Encoder
A tool written in Typescript to automatically encode HTML entities in Roll20 macros. Allows for more easily nesting drop downs within macros.

## Usage

```JavaScript
var macro = 
`?{Level: 
    |Level 1, 
        ?{Single Target?|Yes, [[3d4 + 3]] |No,
            ?{Number of targets?
            |1, 
                ?{Missiles to 1st Target|1, [[1d4+1]] + "A1" |2, [[2d4+2]] + "A2" |3, [[3d4+3]] + "A3" } 
            |2, 
                ?{Missiles to 1st Target|1, [[1d4+1]] + "A1" |2, [[2d4+2]] + "A2" |3, [[3d4+3]] + "A3" } 
                ?{Missiles to 2nd Target|1, [[1d4+1]] + "B1" |2, [[2d4+2]] + "B2" |3, [[3d4+3]] + "B3" } 
            |3, 
                ?{Missiles to 1st Target|1, [[1d4+1]] + "A1" |2, [[2d4+2]] + "A2" |3, [[3d4+3]] + "A3" } 
                ?{Missiles to 2nd Target|1, [[1d4+1]] + "B1" |2, [[2d4+2]] + "B2" |3, [[3d4+3]] + "B3" } 
                ?{Missiles to 3rd Target|1, [[1d4+1]] + "C1" |2, [[2d4+2]] + "C2" |3, [[3d4+3]] + "C3" } 
            }
        }
    |Level 2, 
        ?{Single Target?|Yes, [[4d4+4]]|No,
            ?{Number of targets?
            |1, 
                ?{Missiles to 1st Target|1, [[1d4+1]] |2, [[2d4+2]] |3, [[3d4+3]] |4, [[4d4+4]] } 
            |2, 
                ?{Missiles to 1st Target|1, [[1d4+1]] |2, [[2d4+2]] |3, [[3d4+3]] |4, [[4d4+4]] } 
                ?{Missiles to 2nd Target|1, [[1d4+1]] |2, [[2d4+2]] |3, [[3d4+3]] |4, [[4d4+4]] } 
            |3, 
                ?{Missiles to 1st Target|1, [[1d4+1]] |2, [[2d4+2]] |3, [[3d4+3]] |4, [[4d4+4]] } 
                ?{Missiles to 2nd Target|1, [[1d4+1]] |2, [[2d4+2]] |3, [[3d4+3]] |4, [[4d4+4]] } 
                ?{Missiles to 3rd Target|1, [[1d4+1]] |2, [[2d4+2]] |3, [[3d4+3]] |4, [[4d4+4]] } 
            |4, 
                ?{Missiles to 1st Target|1, [[1d4+1]] |2, [[2d4+2]] |3, [[3d4+3]] |4, [[4d4+4]] } 
                ?{Missiles to 2nd Target|1, [[1d4+1]] |2, [[2d4+2]] |3, [[3d4+3]] |4, [[4d4+4]] } 
                ?{Missiles to 3rd Target|1, [[1d4+1]] |2, [[2d4+2]] |3, [[3d4+3]] |4, [[4d4+4]] } 
                ?{Missiles to 4th Target|1, [[1d4+1]] |2, [[2d4+2]] |3, [[3d4+3]] |4, [[4d4+4]] } 
            }
        }
    }`;
console.log(new MacroEncoder.parse(macro));
```
Outputs:
```
?{Level: 
    |Level 1, 
        ?{Single Target?&#124;Yes&#44; [[3d4 + 3]] &#124;No&#44;
            ?{Number of targets?
            &amp;#124;1&amp;#44; 
                ?{Missiles to 1st Target&amp;amp;#124;1&amp;amp;#44; [[1d4+1]] + "A1" &amp;amp;#124;2&amp;amp;#44; [[2d4+2]] + "A2" &amp;amp;#124;3&amp;amp;#44; [[3d4+3]] + "A3" &amp;amp;#125; 
            &amp;#124;2&amp;#44; 
                ?{Missiles to 1st Target&amp;amp;#124;1&amp;amp;#44; [[1d4+1]] + "A1" &amp;amp;#124;2&amp;amp;#44; [[2d4+2]] + "A2" &amp;amp;#124;3&amp;amp;#44; [[3d4+3]] + "A3" &amp;amp;#125; 
                ?{Missiles to 2nd Target&amp;amp;#124;1&amp;amp;#44; [[1d4+1]] + "B1" &amp;amp;#124;2&amp;amp;#44; [[2d4+2]] + "B2" &amp;amp;#124;3&amp;amp;#44; [[3d4+3]] + "B3" &amp;amp;#125; 
            &amp;#124;3&amp;#44; 
                ?{Missiles to 1st Target&amp;amp;#124;1&amp;amp;#44; [[1d4+1]] + "A1" &amp;amp;#124;2&amp;amp;#44; [[2d4+2]] + "A2" &amp;amp;#124;3&amp;amp;#44; [[3d4+3]] + "A3" &amp;amp;#125; 
                ?{Missiles to 2nd Target&amp;amp;#124;1&amp;amp;#44; [[1d4+1]] + "B1" &amp;amp;#124;2&amp;amp;#44; [[2d4+2]] + "B2" &amp;amp;#124;3&amp;amp;#44; [[3d4+3]] + "B3" &amp;amp;#125; 
                ?{Missiles to 3rd Target&amp;amp;#124;1&amp;amp;#44; [[1d4+1]] + "C1" &amp;amp;#124;2&amp;amp;#44; [[2d4+2]] + "C2" &amp;amp;#124;3&amp;amp;#44; [[3d4+3]] + "C3" &amp;amp;#125; 
            &amp;#125;
        &#125;
    |Level 2, 
        ?{Single Target?&#124;Yes&#44; [[4d4+4]]&#124;No&#44;
            ?{Number of targets?
            &amp;#124;1&amp;#44; 
                ?{Missiles to 1st Target&amp;amp;#124;1&amp;amp;#44; [[1d4+1]] &amp;amp;#124;2&amp;amp;#44; [[2d4+2]] &amp;amp;#124;3&amp;amp;#44; [[3d4+3]] &amp;amp;#124;4&amp;amp;#44; [[4d4+4]] &amp;amp;#125; 
            &amp;#124;2&amp;#44; 
                ?{Missiles to 1st Target&amp;amp;#124;1&amp;amp;#44; [[1d4+1]] &amp;amp;#124;2&amp;amp;#44; [[2d4+2]] &amp;amp;#124;3&amp;amp;#44; [[3d4+3]] &amp;amp;#124;4&amp;amp;#44; [[4d4+4]] &amp;amp;#125; 
                ?{Missiles to 2nd Target&amp;amp;#124;1&amp;amp;#44; [[1d4+1]] &amp;amp;#124;2&amp;amp;#44; [[2d4+2]] &amp;amp;#124;3&amp;amp;#44; [[3d4+3]] &amp;amp;#124;4&amp;amp;#44; [[4d4+4]] &amp;amp;#125; 
            &amp;#124;3&amp;#44; 
                ?{Missiles to 1st Target&amp;amp;#124;1&amp;amp;#44; [[1d4+1]] &amp;amp;#124;2&amp;amp;#44; [[2d4+2]] &amp;amp;#124;3&amp;amp;#44; [[3d4+3]] &amp;amp;#124;4&amp;amp;#44; [[4d4+4]] &amp;amp;#125; 
                ?{Missiles to 2nd Target&amp;amp;#124;1&amp;amp;#44; [[1d4+1]] &amp;amp;#124;2&amp;amp;#44; [[2d4+2]] &amp;amp;#124;3&amp;amp;#44; [[3d4+3]] &amp;amp;#124;4&amp;amp;#44; [[4d4+4]] &amp;amp;#125; 
                ?{Missiles to 3rd Target&amp;amp;#124;1&amp;amp;#44; [[1d4+1]] &amp;amp;#124;2&amp;amp;#44; [[2d4+2]] &amp;amp;#124;3&amp;amp;#44; [[3d4+3]] &amp;amp;#124;4&amp;amp;#44; [[4d4+4]] &amp;amp;#125; 
            &amp;#124;4&amp;#44; 
                ?{Missiles to 1st Target&amp;amp;#124;1&amp;amp;#44; [[1d4+1]] &amp;amp;#124;2&amp;amp;#44; [[2d4+2]] &amp;amp;#124;3&amp;amp;#44; [[3d4+3]] &amp;amp;#124;4&amp;amp;#44; [[4d4+4]] &amp;amp;#125; 
                ?{Missiles to 2nd Target&amp;amp;#124;1&amp;amp;#44; [[1d4+1]] &amp;amp;#124;2&amp;amp;#44; [[2d4+2]] &amp;amp;#124;3&amp;amp;#44; [[3d4+3]] &amp;amp;#124;4&amp;amp;#44; [[4d4+4]] &amp;amp;#125; 
                ?{Missiles to 3rd Target&amp;amp;#124;1&amp;amp;#44; [[1d4+1]] &amp;amp;#124;2&amp;amp;#44; [[2d4+2]] &amp;amp;#124;3&amp;amp;#44; [[3d4+3]] &amp;amp;#124;4&amp;amp;#44; [[4d4+4]] &amp;amp;#125; 
                ?{Missiles to 4th Target&amp;amp;#124;1&amp;amp;#44; [[1d4+1]] &amp;amp;#124;2&amp;amp;#44; [[2d4+2]] &amp;amp;#124;3&amp;amp;#44; [[3d4+3]] &amp;amp;#124;4&amp;amp;#44; [[4d4+4]] &amp;amp;#125; 
            &amp;#125;
        &#125;
    }
```
