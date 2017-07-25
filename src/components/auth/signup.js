import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import * as actions from '../../actions'

class Signup extends Component {
  handleFormSubmit({ email, password }) {
    // call action creator to sign up user
    this.props.signupUser({ email, password })
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
            <input className="form-control" {...field.input} />
            {field.meta.touched && field.meta.error && <div className="error">{field.meta.error}</div>}
          </fieldset>
        } />

        <Field name="password" component={field => {
          console.log(field)
          return (
            <fieldset className="form-group">
              <label>Password:</label>
              <input className="form-control" type="password" {...field.input} />
              {field.meta.touched && field.meta.error && <div className="error">{field.meta.error}</div>}
            </fieldset>
          )
        }} />

        <Field name="passwordConfirm" component={field =>
          <fieldset className="form-group">
            <label>Confirm Password:</label>
            <input className="form-control" type="password" {...field.input} />
            {field.meta.touched && field.meta.error && <div className="error">{field.meta.error}</div>}
          </fieldset>
        } />

        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Sign up</button>
      </form>
    )
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error }
}

const ConnectedSignup = connect(mapStateToProps, actions)(Signup)

function validate(formProps) {
  const errors = {}

  if (!formProps.email) {
    errors.email = 'Please enter an email'
  }

  if (!formProps.password) {
    errors.password = 'Please enter a password'
  }

  if (!formProps.passwordConfirm) {
    errors.passwordConfirm = 'Please enter a password confirmation'
  }

  if (formProps.password !== formProps.passwordConfirm) {
    errors.password = 'Passwords must match'
  }

  return errors
}

export default reduxForm({
  form: 'signup',
  validate
})(ConnectedSignup)