// fetch("http://localhost:20850/can",{
//     method:"Post",
//     headers:{
//         "Authorization": "Basic "+sessionStorage.getItem("Token"),
//     }
// }).then(res => res.json())
//     .then( (result) => {
//         sessionStorage.clear();
//     }, (error) => {
//         sessionStorage.clear();
//     });

import * as React from "react";
import ReactDOM from 'react-dom';
import {browserHistory} from "react-router";
const xMin=-3; const xMax=3;
export class LikeButton extends React.Component {
    constructor(props) {
        super(props);
        this.Back=this.Back.bind(this);
        this.RegisterError=this.RegisterError.bind(this);
        this.state = {
            liked: false,
            name: ""
        };
    }
    CheckNick(nick) {
        return !(nick == null || nick === "" || nick === " " || typeof nick === "undefined");
    }
	componentDidMount(){
        fetch("http://localhost:20850/access",{
            method:"Post",
            headers:{
                "Authorization": "Basic "+localStorage.getItem("Token"),
            }
        }).then(res => res.json())
            .then( (result) => { if(result.status===403) browserHistory.push("/login");
			else browserHistory.push("/app");
            }, (error) => {
                browserHistory.push("/login");
            });
    }
    RestApiSign(){
        // window.history.pushState(null,"Главная страница", "/main.html");
        // this.props.updateData(1);
        //             this.props.updateData(1);
        // browserHistory.push("/app");
        if(this.CheckNick(document.getElementById("Nickname").value)&&
           this.CheckNick(document.getElementById("Password").value)){
            const data={ "Nickname":document.getElementById("Nickname").value,
               "Password": document.getElementById("Password").value};
            fetch("http://localhost:20850/login",{
                method:"Post",
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then(res => res.json())
                .then( (result) => { if(result.may==="true") {
                    localStorage.setItem("Token",result.token);
                    // window.history.replaceState(null,"Главная страница", "/bloodgr/main.html");
                   //this.props.updateData(1);
				   browserHistory.push("/app");
               }
               else this.Back("Неверное имя или пароль");
                }, (error) => {
                    console.log(error.status + ' ' + error.responseText);
                });
        }
         else this.setState({
             name: "Заполните поля адекватно"
         });
    }
    RegisterError(){
        this.setState({
            name:"Регистрация не удалась"
        })
    }
    RestApiRegister(){
        if(this.CheckNick(document.getElementById("Nickname").value)&&
            this.CheckNick(document.getElementById("Password").value)) {
            const data={ "Nickname":document.getElementById("Nickname").value,
            "Password": document.getElementById("Password").value};
            fetch("http://localhost:20850/register",{
                method:"Post",
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
                        }).then(res => res.json())
                .then( (result) => { if(result.may==="true") this.Back("Регистрация прошла успешно");
                    else this.RegisterError();
                }, (error) => {
                    console.log(error.status + ' ' + error.responseText);
                })
        }
        else this.setState({
            name: "Заполните поля адекватно"
        });
    }
    Register(){
        this.setState({
            liked: true,
            name: ""
        })
    }
    Back(x) {
        this.setState({
            liked:false,
            name: x
        })
    }
    render() {
        if( this.state.liked===true){
            return (
                <div>
                    <h2 id={"header"}>
                        Вариант 20226.Кудымов Валерий и Алексей Вансович.Группа P3202.
                    </h2>
                <div id={"wrapper"}>
                    <h1>Register</h1>
                    <div id={"signin"}>
                        <input autoComplete="off" id="Nickname" type="text" placeholder="Give me your name"/>
                        <input autoComplete="off" id="Password" type="text" placeholder="Give me your password"/>
                        {/*<input autoComplete="off" id="Mail" type="text" placeholder="Give me your mail"/>*/}
                    {/*<button onClick={() => this.Back()}>*/}
                    {/*    Назад*/}
                    {/*</button>*/}
                    <button onClick={() => this.RestApiRegister()}>
                        &#xf0da;
                    </button>
                    <p><a onClick={() => this.Back("")}>Back</a> </p>
                    <p id={"Error"}>{this.state.name}</p>
                    </div>
                </div>
                    </div>
            )
        }
        return(
            <div>
                <h2 id={"header"}>
                    Вариант 20226.Кудымов Валерий и Алексей Вансович.Группа P3202.
                </h2>
            <div id={"wrapper"}>
                <h1>Sign in</h1>
                <div id={"signin"}>
                <input autoComplete="off" id="Nickname" type="text" placeholder="Give me your name"/>
                    <input autoComplete="off" id="Password" type="password" placeholder="Give me your password"/>
            <button onClick={() => this.RestApiSign()}>
                &#xf0da;
            </button>
                {/*<button onClick={() => this.Register()}>*/}
                {/*    Register*/}
                {/*</button>*/}
                <p><a onClick={() => this.Register()}>Register</a> </p>
                <p id={"Error"}>{this.state.name}</p>
                </div>
            </div>
            </div>
        );
    }
}
