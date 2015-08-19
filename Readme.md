# salita - santskrit transliteration

## Installation

With node.js:

````bash
$ npm install salita-component
````
or with [component](http://github.com/component/component)

````bash
$ component install mbykov/salita
````

Or as standalone version:

````html
<script src="salita.js"></script>
````

## API

````javascript
var salita = require('salita');
salita.slp2sa('satyAnfta').should.equal('सत्यानृत');
salita.sa2slp('सत्यानृत').should.equal('satyAnfta');
````

````javascript
salita.iast2sa('satyAnfta').should.equal('सत्यानृत');
salita.sa2iast('सत्यानृत').should.equal('satyAnfta');
````


View more examples in [test suite](https://github.com/mbykov/salita/tree/master/test/node)

## Running node tests

````bash
$ make test
````

## Running browser tests

open text/index.html

## License

  GNU GPL
