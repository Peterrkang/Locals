import React, { Component } from 'react';
import Geosuggest from 'react-geosuggest';
import { reduxForm } from 'redux-form';
import * as actions from '../actions';

class EventForm extends Component {

  constructor(props){
    super(props);
    this.state = { location: ''};
  }

  handleFormSubmit(formProps){
    this.props.createEvent(formProps, this.state.location);
    this.props.onClose();
  }

  onSuggestSelect(suggest){
    this.setState({location: suggest.location});
  }

  render(){
    const { handleSubmit, fields: { title, description, address }} = this.props;
    return(
      <form className="event-form" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className="form-group">
          <label>Title:</label>
          <input className="form-control" {...title}/>
          {title.touched && title.error && <div className="error">{title.error}</div>}
        </fieldset>
        <fieldset className="form-group">
          <label>Address:</label>
          <Geosuggest
            inputClassName="form-control"
            onSuggestSelect={this.onSuggestSelect.bind(this)}
            {...address}
          />
          {address.touched && address.error && <div className="error">{address.error}</div>}
        </fieldset>
        <fieldset className="form-group">
          <label>Description:</label>
          <textarea className="form-control" {...description}/>
          {description.touched && description.error && <div className="error">{description.error}</div>}
        </fieldset>
        <button action="submit" className="btn btn-primary"> Add Event! </button>
      </form>
    );
  }

}

function validate(formProps) {
  const errors = {};
  if (!formProps.title) {
    errors.title = 'Please Enter a title';
  }
  if (!formProps.address) {
    errors.address = 'Please Enter an address';
  }
  if (!formProps.description) {
    errors.description = 'Please Enter a description';
  }
  return errors;
}



export default reduxForm({
  form: 'addEvent',
  fields: [ 'title', 'description', 'address' ],
  validate
}, null, actions)(EventForm)
