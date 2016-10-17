import * as React from 'react'
import { connect } from 'react-redux'
import { addSnippet } from '../actions'
import { ISnippet } from './Snippet'

interface SnippetFormProps {
  dispatch?: (action: any) => void
}

class SnippetForm extends React.Component<SnippetFormProps, ISnippet> {
  constructor() {
    super()
    this.state = { title: '', body: '' }
  }

  handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    this.props.dispatch(addSnippet({
      title: this.state.title,
      body:  this.state.body
    }))
    this.setState({ title: '', body: '' })
  }

  handleChangeFor(slot: string) {
    return (event: any) => {
      this.setState({ [slot]: event.target.value } as ISnippet)
    }
  }

  render() {
    return (
      <form onSubmit={ this.handleSubmit.bind(this) }>
        <input type="text" placeholder="Snippet title"
               value={ this.state.title }
               onChange={ this.handleChangeFor('title') } />
        <textarea placeholder="Snippet body"
                  value={ this.state.body }
                  onChange={ this.handleChangeFor('body') }/>
        <input type="submit" value="Save" />
      </form>
    )
  }
}

export default connect()(SnippetForm)
