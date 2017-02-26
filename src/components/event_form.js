import React, { Component } from 'react';
import Geosuggest from 'react-geosuggest';
import { reduxForm } from 'redux-form';
import * as actions from '../actions';

class EventForm extends Component {

  constructor(props){
    super(props)

    this.state = { location: ''}
  }

  handleFormSubmit(formProps){
    this.props.createEvent(formProps, this.state.location)
    this.props.onClose();
  }

  onSuggestSelect(suggest){
    this.setState({location: suggest.location});
  }

  render(){
    const { handleSubmit, fields: { title, description, address }} = this.props;

    return(
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className="form-group">
          <label>Title:</label>
          <input className="form-control" {...title}/>
        </fieldset>
        <fieldset className="form-group">
          <label>Address:</label>
          <Geosuggest
            inputClassName="form-control"
            onSuggestSelect={this.onSuggestSelect.bind(this)}
            {...address}
          />
        </fieldset>
        <fieldset className="form-group">
          <label>Description:</label>
          <textarea className="form-control" {...description}/>
        </fieldset>
        <button action="submit" className="btn btn-primary"> Add Event! </button>
      </form>
    );
  }

}



export default reduxForm({
  form: 'addEvent',
  fields: [ 'title', 'description', 'address' ]
}, null, actions)(EventForm)
