import React, { Component } from 'react'
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form'
import * as actions from '../../actions'

class Signin extends Component {
  handleFormSubmit({ email, password }) {
    this.props.signinUser({ email, password })
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      )
    }
  }

  render() {
    const { handleSubmit } = this.props

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <Field name="email" component={field =>
          <fieldset className="form-group">
            <label>Email:</label>
            <input type="text" className="form-control" {...field.input} />
          </fieldset>
        } />

        <Field name="password" component={field =>
          <fieldset className="form-group">
            <label>Password:</label>
            <input type="password" className="form-control" {...field.input} />
          </fieldset>
        } />

        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Sign in</button>
      </form>
    )
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error }
}

const ConnectedSignin = connect(mapStateToProps, actions)(Signin);

export default reduxForm({
  form: 'signin'
})(ConnectedSignin)