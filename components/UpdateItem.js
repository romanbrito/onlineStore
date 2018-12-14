import React, {Component} from 'react';
import {Mutation, Query} from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import Form from './styles/Form';
import formatMoney from '../lib/formatMoney';
import ErrorMessage from './ErrorMessage';

const SINGLE_ITEM_QUERY = gql`
    query SINGLE_ITEM_QUERY($id: ID!) {
        Item (id: $id) {
            id
            title
            price
            description
        }
    }
`;

const UPDATE_ITEM_MUTATION = gql`
    mutation UPDATE_ITEM_MUTATION(
    $id: ID!
    $title: String
    $description: String
    $price: Int
    ) {
        updateItem(
            id: $id
            title: $title
            description: $description
            price: $price
        ) {
            id
            title
            description
            price
        }
    }
`;

class UpdateItem extends Component {
  state = {};

  // function for input change
  handleChange = event => {
    const {name, type, value} = event.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({[name]: val})
  };

  updateItem = async (event, updateItemMutation) => {
    event.preventDefault();
    console.log('Updating Item');
    console.log(this.state);
    const res = await updateItemMutation({
      variables: {
        id: this.props.id,
        ...this.state,
      },
    });
    console.log('Updated');
  };

  render() {
    return (
      <Query query={SINGLE_ITEM_QUERY} variables={{id: this.props.id}}>
        {({data, loading}) => {
          if (loading) return <p>Loading...</p>;
          if (!data.Item) return <p>No Item Found for id {this.props.id}</p>;
          return (
            <Mutation mutation={UPDATE_ITEM_MUTATION} variables={this.state}>
              {/*(mutationfunction, payload) => {}*/}
              {(updateItem, {loading, error, called}) => (
                <Form
                  onSubmit={event => this.updateItem(event, updateItem)}
                >
                  <ErrorMessage error={error}/>
                  <fieldset disabled={loading} aria-busy={loading}>
                    <label htmlFor="title">
                      Title
                      <input
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Title"
                        required
                        defaultValue={data.Item.title}
                        onChange={this.handleChange}
                      />
                    </label>
                    <label htmlFor="price">
                      Price
                      <input
                        type="number"
                        id="price"
                        name="price"
                        placeholder="Price"
                        required
                        defaultValue={data.Item.price}
                        onChange={this.handleChange}
                      />
                    </label>
                    <label htmlFor="description">
                      Description
                      <textarea
                        id="description"
                        name="description"
                        placeholder="Enter A Description"
                        required
                        defaultValue={data.Item.description}
                        onChange={this.handleChange}
                      />
                    </label>
                    <button type="submit">Sav{loading ? 'ing' : 'e'} Changes</button>
                  </fieldset>
                </Form>
              )}
            </Mutation>
          )
        }}
      </Query>
    );
  }
}

UpdateItem.propTypes = {};

export default UpdateItem;
export {UPDATE_ITEM_MUTATION};
