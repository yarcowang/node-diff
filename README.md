Simple Diff Utilities
=====================
This is a diff utility function to do simple diff for text. Both for client end and server end(node.js).

**This project is licensed under BSD/GPL**

How to install
--------------
For client end, you just need to download scripts in client/ directory. require that file and use it like normal function.

For server end, you could use npm to install it.

How to use
----------
**Client End**

* require the file
  
  ```<script src="client/diff.js"></script>```
  
* use it like normal function

  ```var ret = diff(left, right, options);```
  
  
**Server Side(NodeJs)**

* require the file

  ```var diff = require('diff');```
  
* save as in client end

More info
----------
**```prototype = array diff(string left, string right, object options)```**

* param **left**, original text
* param **right**, text to compare with
* param **options** should be {max: &lt;integer>, ret: &lt;integer>}
  * **max** distance checking. more for accurate, small for speed, default is 40
  * **ret** return style, should be one of 0,1,2
    * 0 for return equal lineno
    * 1 for return diff lineno
    * 2 for return html version of the diff result. diff line will be tagged as &lt;span class="diff diff-remove/diff-add">&lt;/span>
    
Sugguestion
-----------
You could contact <yarco.wang@gmail.com> for this extension.
Or for programming related things, whatever.

This guy currently works in Wiredcraft.com. So you could also get him by <yarco@wiredcraft.com>

All rights reserved by human.