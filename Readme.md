###Syllabus
[![build status](https://secure.travis-ci.org/rootslab/syllabus.png?branch=master)](http://travis-ci.org/rootslab/syllabus) 
[![NPM version](https://badge.fury.io/js/syllabus.png)](http://badge.fury.io/js/syllabus)

[![NPM](https://nodei.co/npm/syllabus.png?downloads=true&stars=true)](https://nodei.co/npm/syllabus/)

[![NPM](https://nodei.co/npm-dl/syllabus.png)](https://nodei.co/npm/syllabus/)

> **_Syllabus_**, a collection of mix-ins for __Redis__ commands, builded upon __[Sermone](https://github.com/rootslab/sermone)__.

###Install

```bash
$ npm install syllabus [-g]
// clone repo
$ git clone git@github.com:rootslab/syllabus.git
```

> __require__ returns an hash/obj.

```javascript
var Syllabus  = require( 'syllabus' );
```

###Run Tests

```bash
$ cd syllabus/
$ npm test
```

###Sample Usage

> See [examples](example/).


###Properties, Methods

> Arguments within [ ] are optional.

```javascript

Syllabus : {
    info : function ( String cmd ) { .. }
    , stick : function ( [ Boolean enable ] ) { .. }
    , commands : { .. }
}
```

------------------------------------------------------------------------


### MIT License

> Copyright (c) 2014 &lt; Guglielmo Ferri : 44gatti@gmail.com &gt;

> Permission is hereby granted, free of charge, to any person obtaining
> a copy of this software and associated documentation files (the
> 'Software'), to deal in the Software without restriction, including
> without limitation the rights to use, copy, modify, merge, publish,
> distribute, sublicense, and/or sell copies of the Software, and to
> permit persons to whom the Software is furnished to do so, subject to
> the following conditions:

> __The above copyright notice and this permission notice shall be
> included in all copies or substantial portions of the Software.__

> THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
> EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
> MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
> IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
> CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
> TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
> SOFTWARE OR THE USE OR OTHER DEALINGS IN T