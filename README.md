JavaScriptZoo
=============

A VS 2012 Project for comparing CoffeeScript and TypeScript.

Purpose
-------
This project was created to compare [CoffeeScript](http://www.coffeescript.org) and [TypeScript](http://www.typescriptlang.org/) in a Visual Studio 2012 solution. There are several branches in this git project, each branch compares a different feature of the languages.

Links
-----
- [Prezi Presentation](http://prezi.com/zkhsz49ownaw/coffeescript-vs-typescript/?kw=view-zkhsz49ownaw&rc=ref-15215083). I gave this presentation in February 2013. It's goes along with this source code.
- [ASP.NET and Web Tools 2012.2 Update](http://www.asp.net/downloads). Needed for CoffeeScript support in your IDE and also has some new bangin' features for web tooling in your IDE.
- [Install TypeScript](http://typescript.codeplex.com/). Follow the instructions here to get TypeScript installed into VS 2012. **Warning** As of August 2013 There are some major problems with the 0.9.X releases of TypeScript (See [the comments here](http://typescript.codeplex.com/releases/view/102929)). I highly recommend using the 0.8.3.1 release (March 29), which is sort of hidden [here](http://download.microsoft.com/download/2/F/F/2FFA1FBA-97CA-4FFB-8ED7-A4AE06398948/TypeScriptSetup.0.8.3.1.msi).
- [Solve TypeScript Install Issue](http://bit.ly/QGb6q5). If TypeScript doesn't work in Visual Studio yet, follow the instructions found at the link to the left.
- [VS 2012 Web Essentials Extension](http://visualstudiogallery.msdn.microsoft.com/6ed4c78f-a23e-49ad-b5fd-369af0c2107f) This extension gives you the split screen effect and can compile and minimize your TypeScript/CoffeeScript.
- [CodeSchool CoffeeScript Test](http://coffeescript.codeschool.com/). A Sip of CoffeeScript. Take the free test (module 1) to see how well you can do.

Troubleshooting
---------------
If:

- **TypeScript isn't highlighted in Visual Studio**<br>First make sure you've installed TypeScript from the link above. If that doesn't fix it, follow the instructions in [this StackOverflow post](http://bit.ly/QGb6q5) for forcing TypeScript to install.
- **You have a split screen when editing TypeScript or CoffeeScript files**<br>
Maybe you like the split screen, or perhaps you'd like to shut it off? You can do this in Visual Studio Options, under Web Essentials.
- **Mindscape Web Workbench is fighting with Web Essentials**<br>
I recommend *disabling* Mindscape Web Workbench to use Web Essentials. There are a few features that Mindscape provides that I prefer to Web Essentials, but the two extensions don't play well together. It works better if you only run Web Essentials.
- **Your tsc.exe process hangs and/or uses gigs of RAM**<br>
You most likely installed one of the 0.9.X versions of TypeScript. Roll back to version 0.8.3.1, which is a hard to find download. I'll be nice and give you a direct link: [TypeScript 0.8.3.1](http://download.microsoft.com/download/2/F/F/2FFA1FBA-97CA-4FFB-8ED7-A4AE06398948/TypeScriptSetup.0.8.3.1.msi).
- **CoffeeScript is not highlighted in Visual Studio**<br>
Make sure you install the latest tooling update for Visual Studio [ASP.NET and Web Tools 2012.2 Update](http://www.asp.net/downloads). Just run the Web Installer and choose what you need to install. You *don't need to install the Azure stuff* if you don't want to.

Branches
--------
The following branches exist in this project. Here are brief descriptions of each.

- **01-Assignment** Shows how you assign values to variables in both languages.
- **02-Conditions** If/Else blocks
- **03-Whitespace** CoffeeScript is sensitive to whitespace, TypeScript is not.
- **04-StronglyTyped** See how TypeScript strongly types variables, CoffeeScript is like JavaScript--it doesn't care.
- **05-Functions** CoffeeScript has a unique function syntax. TypeScript is a little more familiar.
- **06-DefaultParameters** Both CoffeeScript and TypeScript permit you to have default parameter values.
- **07-Arrays** See how CoffeeScript and TypeScript handle arrays.
- **08-Classes** You can't look at TypeScript or CoffeeScript and ignore classes. See how they work.
- **08-Splats** Do you find yourself needing to handle a variable number of parameters? Splats to the rescue.
- **09-Intellisense** This branch shows how TypeScript helps you find errors that would be missed by CoffeeScript.
- **10-Interfaces** JavaScript and CoffeeScript do not have them, but TypeScript does.
- **15-ExistenceOperator** CoffeeScript gives you some nice operators to make for readable code.
- **16-Comprehensions** One of CoffeeScripts greatest strengths.
- **17-Hoisting** CoffeeScript properly "hoists" the varaible declaration to the top of the function block. TypeScript doesn't.
- **18-SkinnyAndFatArrows** _this_ can cause problems. See how CoffeeScript can handle it compared to TypeScript.

