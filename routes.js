import React from 'react'
import {BrowserRouter,Route,Switch,Redirect} from 'react-router-dom'
import {isAuthenticated} from './services/auth'
import SignUp from './pages/SignUp'
import App from './pages/App'

const PrivateRoute = ({component:Component,...rest}) =>(
  <Route {...rest} render={
    props => isAuthenticated()?
    (<Component {...props} />): (<Redirect to={{pathname:'/', state:{ from:props.location }}} />)
    } />
)

const Routes = ()=>(
  <BrowserRouter>
    <Switch>
         <Route exact path="/" component={() =>  <h1>Login</h1>} />
         <Route  path="/signup" component={SignUp} />
         <PrivateRoute path="/app" component={  App} />
         <Route exact path="*" component={() =>  <h1>Page not found</h1>} />
    </Switch>
  </BrowserRouter>
)

export default Routes;