//@flow
import React, {Component} from 'react'

import Denodeify from 'es6-denodeify'
const denodeify = Denodeify(Promise)

type Props = {
  label: string,
  action?: mixed
}

type State = {
  enabled: boolean
}

class TransformButton extends Component<void, Props, State> {
  props: Props
  state: State

  constructor(props :Props){
    super(props)
    this.state = { enabled: true }
  }

  render(){
    return (
      <button
        className={this.props.label +' transform'}
        onClick={this.props.action}
      >
        {this.props.label}
      </button>
    )
  }
}

export default TransformButton
