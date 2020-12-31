import React, {Component} from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import * as actions from '../../store/actions/index';
import Loading from '../../components/UI/Spinner/Spinner';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {updateObject,checkValidity} from '../../shared/utility';
import './Auth.css';

class Auth extends Component {
    state = {
        controls: {
            email:{
                elementType:"input",
                elementConfig: {
                    type:"email",
                    placeholder:" Your Email",
                },
                value:"",
                validation: {
                    required:true,
                    isEmail:true
                },
                valid:false,
                touched:false
            },
            password:{
                elementType:"input",
                elementConfig: {
                    type:"password",
                    placeholder:" Your Password",
                },
                value:"",
                validation: {
                    required:true,
                    minLength:6
                },
                valid:false,
                touched:false
            },
        },
        isSignUp:true
    }

    componentDidMount() {
        if(!this.props.buildingBurger && this.props.authRedirectPath !== "/") {
            this.props.onSetAuthRedirectPath();
        }
    }
    

    inputChangedHandler = (event,controlName) => {
        const updatedControls = updateObject(this.state.controls,{
            [controlName]:updateObject(this.state.controls[controlName],{
                value:event.target.value,
                valid:checkValidity(event.target.value,this.state.controls[controlName].validation),
                touched:true
            })
        });
        this.setState({controls:updatedControls})
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value,this.state.isSignUp)
    }

    switchedAuthModeHandler = () => {
        this.setState(prevState => {
            return {isSignUp:!prevState.isSignUp};
        })
    }


    render() {
        let formElementsArray = [];
        for(let key in this.state.controls) {
            formElementsArray.push({
                id:key,
                config:this.state.controls[key]
            });
        }

        let authRedirect = null;
        if(this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath}/>
        }


        let form = formElementsArray.map(formElement => {
            return <Input
                        elementType={formElement.config.elementType} 
                        elementConfig={formElement.config.elementConfig}
                        key={formElement.id}
                        value={formElement.config.value}
                        changed={(event) => this.inputChangedHandler(event,formElement.id)}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        invalid={!formElement.config.valid}
                    />
     
            
        })
        if(this.props.loading) {
            form = <Loading/>
        }
        let errorMessage = null;
        if(this.props.error) {
            errorMessage = <p>{this.props.error.message}</p>
        }
        return(
            <div className="Auth">
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">Submit</Button>
                   
                </form>
                <Button
                        btnType="Danger"
                        clicked={this.switchedAuthModeHandler}
                    >
                        SWITCH TO {this.state.isSignUp ? "SIGNUP" : "SIGNIN"}
                    </Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading:state.auth.loading,
        error:state.auth.error,
        isAuthenticated:state.auth.token !== null,
        buildingBurger:state.burgerBuilder.building,
        authRedirectPath:state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth:(email,password, isSignUp) => dispatch(actions.auth(email,password,isSignUp)),
        onSetAuthRedirectPath:() => dispatch(actions.setAuthRedirectPath("/"))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Auth);