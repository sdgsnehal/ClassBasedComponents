import { Fragment, useState, useEffect , Component } from 'react';

import Users from './Users';
import classes from './UserFinder.module.css';
import UsersContext  from '../store/user-context';
import ErrorBoundary from './ErrorBoundary'
const DUMMY_USERS = [
       { id: 'u1', name: 'Max' },
       { id: 'u2', name: 'Manuel' },
       { id: 'u3', name: 'Julie' },
     ];
class UserFinder extends Component {
    static contextType = UsersContext;
  constructor() {
    super();
    this.state = {
      filteredUsers: DUMMY_USERS,
      searchTerm: "",
    };
  }
  componentDidMount(){
    this.setState({filteredUsers:this.context.users});

  }
  componentDidUpdate(prevProps,prevState) {
    if(prevState.searchTerm !== this.state.searchTerm){
        this.setState({
            filteredUsers: DUMMY_USERS.filter((user) =>
              user.name.includes(this.state.searchTerm)
            ),
          });

    }
    
  }
  searchChangeHandler(event) {
    this.setState({ searchTerm: event.target.value });
  }
  render() {
    return (
      <Fragment>
        <UsersContext.Consumer>


        </UsersContext.Consumer>
        <input type="search" onChange={this.searchChangeHandler.bind(this)} />
        <ErrorBoundary>
        <Users users={this.state.filteredUsers} />
        </ErrorBoundary>
      </Fragment>
    );
  }
}
// const UserFinder = () => {
//   const [filteredUsers, setFilteredUsers] = useState(DUMMY_USERS);
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     setFilteredUsers(
//       DUMMY_USERS.filter((user) => user.name.includes(searchTerm))
//     );
//   }, [searchTerm]);

//   const searchChangeHandler = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   return (
//     <Fragment>
//       <input type='search' onChange={searchChangeHandler} />
//       <Users users={filteredUsers} />
//     </Fragment>
//   );
// };

export default UserFinder;