# React Typeahead

**WIP**

React Typeahead is a simple typeahead component for React.

## Installation

```sh
npm install -S @jdlehman/react-typeahead
```

## Example Usage

```js
import React from "react";
import ReactTypeahead from "@jdlehman/react-typeahead";

function MyComponent({typeaheadUrl}) {
  return (
    <div>
      <ReactTypeahead apiUrl="https://determined-limpet.glitch.me" numResults={20} delayType="throttle" delayTime={100}>
        {results => {
          return results.map(result => <div key={result.id}>{result.value}</div>)
        }}
      </ReactTypeahead>
    </div>
  )
}
```

Check out the working example in the `example` directory (with a working server).

## Props

`apiUrl`: expects a URL to the typeahead API. This will be a `GET` request with `search` and `numResults` query parameters and returns a JSON array of results. These results can be any data type, strings, objects, etc.

`numResults`: this is the number of results to return from the typeahead API. Defaults to `20`

`delayType`: sets the method to avoid hitting the server on every change to the input, `debounce` or `throttle`. Defaults to `throttle`

`delayTime`: the time in milliseconds to throttle or debounce. Defaults to `200`

`children`: this component expects a [`render prop`](https://reactjs.org/docs/render-props.html) on children. Or in other words, the sole child to this component is a function that receives the typeahead results as an argument. This enables any custom rendering or styling to be done easily.
