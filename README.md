# Parse Query Generator

This software is meant to be used with `parse-server`. It lets you write 
an object and get an equivalent `Parse.Query` in Javascript.

## Examples

```js
// es6+
import { ParseQueryGen } from 'parse-query-gen';

// es5
const ParseQueryGen = require('parse-query-gen').ParseQueryGen;

// use
const query = ParseQueryGen.gen({
  className: 'MyClass',
  equalTo: {
    active: true,
    awesome: 'absolutely',
  }
});

// now your code...
query.find().then(...)
```

## Supported keys

```ts
interface IParams {
  className?: string; 
  equalTo?: {[key:string]: any}; // example: { great: true }
  containedIn?: {[key:string]: any};
  notEqualTo?: {[key:string]: any}; 
  lessThan?: {[key:string]: any};
  greaterThan?: {[key:string]: any}; 
  containsAll?: {[key:string]: any};  
  include?: string[];
  descending?: string[]; 
  ascending?: string[]; 
  query?: any;
  matches?: {[key:string]: any;}; 
  select?: string[];
}
```

## Credits

Developed by Juan Camilo Guarín Peñaranda,  
Otherwise SAS, Colombia  
2017

## License 

MIT.

## Support us on Patreon
[![patreon](./repo/patreon.png)](https://patreon.com/owsas)
