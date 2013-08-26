# Conversions

These are some conversions of a few well-known JavaScript libraries to CoffeeScript and TypeScript. I timed the work to get an idea of what it would take to convert a legacy JavaScript application to either CoffeeScript or TypeScript.

You'll find the source for each in the folders underneath this directory.

I downloaded the original JavaScript file to the files as:

    amberjack\amberjack.orig.js
    typeface\typeface.orig.js

## Conversion Process: CoffeeScript

I installed the `js2coffee`` node.js package:

    $> npm install -g js2coffee
    
*(If you don't have the node package manager installed on your machine, download the installer [here](http://nodejs.org/download/).)*

Then I converted the .js file to CoffeeScript using the command:

    $> js2coffee amberjack\amberjack.orig.js > amberjack\amberjack.coffee
    
I opened the new .coffee file and tried to compile it to JavaScript again. If it worked (it did on the first try for both files) I stopped timing the task.

## Conversion Process: TypeScript

To my knowledge there is no package similar to `js2coffee` for TypeScript (i.e. there isn't a `js2typescript` program). So a conversion from JavaScript to TypeScript is much more involved.

**I converted to TypeScript manually**

In both examples I had to fix several errors until the TypeScript compiler was happy with the `.ts` file. The typeface.js conversion to around **35 minutes** and the amberjack.js conversion took around **1 hour, 13 minutes**.

# Recommendation

I emphatically do **NOT** recommend users convert legacy applications to TypeScript. It took me nearly two hours for around 1,000 lines of JavaScript code.