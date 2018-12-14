import UpdateItem from '../components/UpdateItem';

// props.query was exposed in _app.js, withRouter works as well
const Update = props => (
  <div>
    <UpdateItem id={props.query.id}/>
  </div>
);

export default Update;