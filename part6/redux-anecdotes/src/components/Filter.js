import { connect, useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../reducers/filterReducer';

const style = {
  marginBottom: 10,
};

const Filter = (props) => {
  const filter = props.filter;
  const handleChange = (e) => {
    props.setFilter(e.target.value);
  };

  return (
    <div className='ui form' style={style}>
      <div className='field'>
        <label>Filter</label>
        <input value={filter} onChange={handleChange} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    filter: state.filter,
  };
};

export default connect(mapStateToProps, { setFilter })(Filter);
