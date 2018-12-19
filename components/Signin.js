import React, {Component} from 'react';
import {Mutation} from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import ErrorMessage from './ErrorMessage';
import {CURRENT_USER_QUERY} from './User';

const SIGNIN_MUTATION = gql`
    mutation SIGNIN_MUTATION(
    $email: String!
    $password: String!
    ) {
        signin(
            email: $email
            password: $password
        ) {
            id
            email
        }
    }
`;

class Signin extends Component {
  state = {
    password: '',
    email: ''
  };

  saveToState = event => {
    this.setState({[event.target.name]: event.target.value})
  };

  render() {
    return (
      <Mutation
        mutation={SIGNIN_MUTATION}
        variables={this.state}
        refetchQueries={[
          {query: CURRENT_USER_QUERY} //, variables if there were any
        ]}
      >
        {(signup, {error, loading}) => {

          return (
            <Form
              method="post"
              onSubmit={async e => {
                e.preventDefault();
                const res = await signup();
                // Force a reload of all the current queries now that the user is logged in
                // client.cache.reset().then(() => {
                //   redirect({}, '/')
                // });

                this.setState({name: '', email: '', password: ''});
              }}>
              <fieldset disabled={loading} aria-busy={loading}>
                <h2>Sign into your account</h2>
                <ErrorMessage error={error}/>
                <label htmlFor="email">
                  email
                  <input type="email" name="email" placeholder="email" value={this.state.email}
                         onChange={this.saveToState}/>
                </label>
                <label htmlFor="password">
                  password
                  <input type="password" name="password" placeholder="password" value={this.state.password}
                         onChange={this.saveToState}/>
                </label>

                <button type="submit">Sign In!</button>
              </fieldset>
            </Form>
          );
        }}
      </Mutation>
    );
  }
}

export default Signin;
