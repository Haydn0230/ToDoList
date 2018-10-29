// import { Route, Redirect } from 'react-router-dom';
// import React from 'react';
// import store from '../store';
// import { RenderPropWrapper } from './RenderPropWrapper';
// import { connect } from 'react-redux';

// const ProtectedRoute = ({ component: Component, ...rest }) => (
//     <RenderPropWrapper>
//         {({ isAuth }) => (
//             <Route render={props => isAuth ? <Component {...props} /> : <Redirect to='/Login' />}
//                 {...rest} />
//         )}
//     </RenderPropWrapper>
// )


// const mapStateToProps = (state, ownProps ) => {
//     return ({
//       userId: state.userId,
//       projectId:state.projectId,
//       isAuth:state.isAuth,
//       cookies:state.cookies,
//       navigation: ownProps.history
//     });
//   };
  
//   export default connect(mapStateToProps)(ProtectedRoute)