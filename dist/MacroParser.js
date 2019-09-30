"use strict";
//Escapes "}", ",", "|" in macros
Object.defineProperty(exports, "__esModule", { value: true });
class MacroParser {
    constructor(macroString) {
        this.currentIndex = 0;
        this.entityStackDepth = -1;
        //characters representing calls. These should never be encoded.
        this.callCharacters = ["%", "@", "#"];
        this.controlCharacters = this.callCharacters.concat(["{", "}", "|", ","]);
        this.macroString = macroString;
        this.macroElements = [...this.macroString];
    }
    parse() {
        var stack = [];
        while (this.peek() !== undefined) {
            this.readTo(this.controlCharacters);
            if (this.current() === "{") {
                if (this.peek(-1) === "?") {
                    stack.push("?");
                    this.entityStackDepth = this.entityStackDepth + 1;
                }
                stack.push("{");
            }
            else {
                var c = this.current();
                if (this.callCharacters.indexOf(c) !== -1) {
                    //Do not encode calls ( [@#%]{.+})
                    this.readTo(["}"]);
                    c = this.next();
                }
                if (c === "}") {
                    stack.pop();
                    if (stack[stack.length - 1] === "?") {
                        stack.pop();
                        this.entityStackDepth = this.entityStackDepth - 1;
                    }
                }
                // pipes (|) and close braces (}) need to be html-entity stacked at different depths.
                console.log("Encoded at " + (c === "}" ? this.entityStackDepth + 1 : this.entityStackDepth) + ": " + c);
                this.encodeCurrent((c === "}" ? this.entityStackDepth + 1 : this.entityStackDepth));
            }
            this.next();
        }
        return this.macroElements.join("");
    }
    /**
     * @description Peek forwards or backwards within the macro.
     * @param n Optional. The number of elements to peek backwards or forwards. Defaults to 1.
     */
    peek(n) {
        n = (n !== undefined ? n : 1);
        if (this.macroElements[this.currentIndex + n] === undefined) {
            return undefined;
        }
        return this.macroElements[this.currentIndex + n];
    }
    /**
     * @description Get the current value at the current position in the macro.
     */
    current() {
        if (this.macroElements[this.currentIndex] === undefined)
            return undefined;
        return this.macroElements[this.currentIndex];
    }
    /**
     * @description Go to the next element in the macro.
     */
    next() {
        //console.log("next is: " + (this.macroChars[this.currentIndex + 1] || "undefined"));
        if (this.macroElements[this.currentIndex] === undefined)
            return undefined;
        this.currentIndex = this.currentIndex + 1;
        var c = this.macroElements[this.currentIndex];
        return c;
    }
    /**
     * @description Encode & | { } , to html enitities.
     * @param entityStackDepth How much to over-encode any html entities.
     */
    encodeCurrent(entityStackDepth) {
        //console.log(this.encode(this.current() as string, this.scopeLevel));
        if (this.current() !== undefined)
            this.macroElements[this.currentIndex] = this.encode(this.current(), entityStackDepth);
    }
    /**
     * Go to the previous element in the macro.
     */
    previous() {
        if (this.macroElements[this.currentIndex] === undefined)
            return undefined;
        var c = this.macroElements[this.currentIndex];
        this.currentIndex = this.currentIndex - 1;
        return c;
    }
    /**
     * @description Reads to a particular character, and returns the characters read up to that point (including the stoppped at character). Although the array allows elements longer than 1, behaviour of the function is udnefined for these inputs.
     * @param {Array<string>} chars characters to stop reading at.
     */
    readTo(chars) {
        var out = "";
        //console.log("this.readTo() called.");
        var c = this.current();
        while (c !== undefined) {
            //console.log(c + " added to readTo output.");
            out += c;
            if (chars.indexOf(c) !== -1) {
                //console.log(out);
                return out;
            }
            c = this.next();
        }
        return out;
    }
    /**
     * @description Encodes &, ,, } and | in a string;
     * @param s The string to encode
     * @param n Optional. The number of times to over-encode the string (extra escaping required by macros).
     */
    encode(s, n) {
        if (n === undefined) {
            n = 1;
        }
        if (n > 0) {
            var s = s
                .replace(/&/g, "&amp;")
                .replace(/}/g, "&#125;")
                .replace(/\|/g, "&#124;")
                .replace(/,/g, "&#44;");
            return this.encode(s, n - 1);
        }
        else {
            return s;
        }
    }
}
exports.MacroParser = MacroParser;
