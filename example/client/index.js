import React, { Component } from "react";
import { render } from "react-dom";
import TypeAhead from "type-ahead";

class App extends Component {
  render() {
    return (
      <div>
        <TypeAhead
          apiUrl={__SERVER_URL__}
          numResults={20}
          delayTime={200}
          delayType="throttle"
        >
          {results =>
            results.map(result => {
              return <div key={result}>{result}</div>;
            })
          }
        </TypeAhead>
      </div>
    );
  }
}

render(<App />, document.getElementById("app"));
