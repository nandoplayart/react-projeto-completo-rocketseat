import React,{Component} from 'react'
import {Link, withRouter} from 'react-router-dom';
//import Logo from '../../assets/airbnb-logo.svg';
import {Form, Container} from './styles';

class SignUp extends Component{
  state ={
    username:'',
    email:'',
    password:'',
    error:''
  }

  handleSignUp = async e =>{
     e.preventDefault();
     const {username,email,password}  = this.state
     if(!username || !email || !password){
        this.setState({error:'Preencha todos os dados para se cadastrar'})
     }else{
       try{
         //await api.post('/users', {username,email,password});
         //history só esta disponivel devido ao withRouter
         this.props.history.push('/app'); 
       }catch(err){
         console.log(err)
         this.setState({error:'Ocorreu um erro ao registrar sua conta. T.T'})
       }
     }
  }

  render(){
    return (
      <Container>
          <Form onSubmit={this.handleSignUp}>
            
              {this.state.error && <p>{this.state.error}</p> }    
              <input type="text" placeholder="Nome do usuário" onChange={ e => this.setState({username:e.target.value})} />

              <input type="email" placeholder="Endereço de e-mail" onChange={ e => this.setState({email:e.target.value})} />

              <input type="password" placeholder="Senha" onChange={ e => this.setState({password:e.target.value})} />

              <button type="submit">Cadastrar grátis</button>
              <hr/>
              <Link to="/">Fazer login</Link>

          </Form>
      </Container>
    )
  }
}

export default withRouter(SignUp);