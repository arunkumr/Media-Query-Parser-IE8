# Media-Query-Parser-IE8
JQuery based media Query parser for IE8

The script parses all media queries in the document and creates a ```style``` tag containing the css code for the current viewport width.

Use this script only if you:

  - You already use Jquery as part of your project.
  - You only want to support IE8 with this script.
  - You are feeling adventorous and want to try something new
  - You created a responsive website with neat features possibly with bootstrap as your framework and finally the requirement reads support is required for IE8.

Otherwise you are better of with [Respond.js]

This script is very much new and i have made several assumptions,may not have followed best practices during it's creation so usage is adviced only with caution, however you are welcome to come up with suggestions and edits.



Usage:(To prevent reflow recommend adding this and Jquery to the last of  ```<head>```)
```
<!--[if lt IE 9 ]>
    <script type="text/javascript" src="IE8Respond.js"></script>
<![endif]-->
```



Also if you would like to disable responsiveness in this script modify the second line of this script to:
```
//Configuration
var nonResponsive = true;
```

And to redraw the page only after resize is complete, set the variable value resizeEnd as true(recommended for better performance):
```
var resizeEnd = true;
```




[Respond.js]:https://github.com/scottjehl/Respond

