import React, { Component } from "react";
import PropTypes from "prop-types";
import { throttle, debounce } from "throttle-debounce";

export default class ReactTypeahead extends Component {
  static propTypes = {
    apiUrl: PropTypes.string.isRequired,
    numResults: PropTypes.number.isRequired,
    delayType: PropTypes.oneOf(["debouce", "throttle"]).isRequired,
    delayTime: PropTypes.number.isRequired
  };

  static defaultProps = {
    numResults: 20,
    delayType: "throttle",
    delayTime: 100
  };

  constructor(props) {
    super(props);
    let delayFunc = throttle;
    if (this.props.delayType === "debounce") {
      delayFunc = debounce;
    }
    this.updateResults = delayFunc(
      props.delayTime,
      this.updateResults.bind(this)
    );
    this.input = React.createRef();
    this.state = {
      results: []
    };
  }

  updateResults() {
    fetch(
      `${this.props.apiUrl}?search=${this.input.current.value}&numResults=${
        this.props.numResults
      }`
    )
      .then(response => response.json())
      .then(json => {
        this.setState({ results: json });
      });
  }

  render() {
    return (
      <div>
        <input onChange={this.updateResults} ref={this.input} />
        {this.props.children(this.state.results)}
      </div>
    );
  }
}
