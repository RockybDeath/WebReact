import * as React from "react";
import ReactDOM from 'react-dom';
import {TableManagement} from "./Table";
import {Canvas} from "./Canvas";
import {browserHistory} from "react-router";
import "./st.css";
const xMin=-3; const xMax=3;
export class Radio extends React.Component{
    constructor(props) {
        super(props);
        this.checkValue=this.checkValue.bind(this);
        this.Send=this.Send.bind(this);
        this.Load=this.Load.bind(this);
		this.DrawAll=this.DrawAll.bind(this);
        this.Click2=this.Click2.bind(this);
        this.Click1=this.Click1.bind(this);
        this.updateData=this.updateData.bind(this);
        this.updateGraphic=this.updateGraphic.bind(this);
        this.checkR=this.checkR.bind(this);
        this.logout=this.logout.bind(this);
        // this.uty=this.uty.bind(this);
        this.state = {
            click1: false,
            click2: false,
            click3: false,
            x: 0,
            y: 0,
            R: 0,
            Hit: "true",
            name: "Все хорошо :)",
            access: "false",
            draw: "false"
        };
    }
	componentDidMount(){
        fetch("http://localhost:20850/access",{
            method:"Post",
            headers:{
                "Authorization": "Basic "+localStorage.getItem("Token"),
            }
        }).then(res => res.json())
            .then( (result) => { if(result.status===403) browserHistory.push("/login");
            }, (error) => {
                browserHistory.push("/login");
            });
    }
    checkValue(event){
        if (!(isNaN(Number(event.target.value.replace(',','.'))) || event.target.value.replace(',','.')< xMin || event.target.value.replace(',','.')>xMax || event.target.value==="")){
            this.setState({
                click3: true,
                y: event.target.value
            })
        } else{
            this.setState({
                click3: false
            })
        }
    }
    checkR(R){
        if(R>0) {
            this.setState({
                name: "Все хорошо :)"
            });
            return true
        }
        else {
            this.setState({
                name: "Выберите другой радиус",
                click2: false
            });
            return false;
        }
    }
    Click1(event){
        this.setState({click1: true, x:event.target.value})
    }
    Click2(event){
        if(this.checkR(event.target.value)) {
            this.setState({click2: true, R: event.target.value});
            this.refs.child.drawCanwas(event.target.value);
            this.refs.baby.updatePoints(event.target.value);
            // $.ajax({
            //     type:"Get",
            //     url: "http://localhost:8080/myLab4/redraw",
            //     data:{
            //         R: this.state.R
            //     },
            //     datatype:"json",
            //     success: function(result) {
            //         var json=JSON.parse(result);
            //         json.forEach(result => this.refs.child.createCanvas(result.x, result.y, result.R, result.Hit));
            //     },
            //     error: function(jqXHR, textStatus, errorThrown) {
            //         console.log(jqXHR.status + ' ' + jqXHR.responseText);
            //     }
            // });
            this.setState({
                name: "Все хорошо :)"
            });
        }
    }
    Send(){
        if (this.state.click1===true && this.state.click2===true && this.state.click3===true) {
            const data={ "X":this.state.x,
                "Y": this.state.y, "R": this.state.R};
            fetch("http://localhost:20850/send",{
                method:"Post",
                headers:{
                    'Content-Type': 'application/json',
                    "Authorization": "Basic "+localStorage.getItem("Token")
                },
                body: JSON.stringify(data)
            }).then(res => res.json())
                .then( (result) => { if(result.error==="false") {
                    this.refs.child.createCanvas(this.state.x, this.state.y, this.state.R, result.hit);
                    this.refs.baby.AddRow(this.state.x, this.state.y, this.state.R, result.hit);
                }
                else this.setState({
                        name: "Ошибка валидации"
                    })
                }, (error) => {
                    console.log(error.status + ' ' + error.responseText);
                });
            this.setState({
                name: "Все хорошо :)"
            })
        }
        else {
            this.setState({
                name: "Введите Y от -3 до 3. Проверьте что выбрали X и R"
            })
        }
    }
    // uty(){
    //     this.refs.baby.AddRow(this.state.x,this.state.y,this.state.R,this.state.Hit)
    // }
    updateData = (x,y,R,Hit) => {
        this.refs.baby.AddRow(x,y,R,Hit);
        this.setState({
            name: "Все хорошо :)"
        })
    };
    updateGraphic = (x,y,R,Hit) =>{
        this.refs.child.createCanvas(x,y,R,Hit);
    };
    logout(){
        // window.history.pushState(null,"Регистрация", "/login.html");
        // this.props.updateData(2);
        //browserHistory.push("/login");
         fetch("http://localhost:20850/exit",{
            method:"Post",
            headers:{
                "Authorization": "Basic "+localStorage.getItem("Token"),
             },
         }).then(res => res.json())
             .then( (result) => { localStorage.clear();
                 //window.history.replaceState(null,"Регистрация", "/bloodgr/red.html");
				 browserHistory.push("/login");
                 //this.props.updateData(2);
             }, (error) => {
                 console.log(error.status + ' ' + error.responseText);
             });
    }
	DrawAll(){
		if(this.checkR(this.state.R))
		this.refs.baby.updatePoints(this.state.R);

	}
    Load(){
        if(this.state.draw === "false") {
            this.refs.child.drawCanwas(1);
            this.setState({
                draw: "true",
				R:1
            })
        }
        this.refs.baby.Addpoints();
    }
    validate = () => {
        this.setState({
            name: "Ошибка валидации"
        })
    };
    render(){
        return (
            <div id={"wanwas"}>
                <div>
                    <Canvas ref={"child"} updateData={this.updateData} />
                </div>
                <div align={"center"}>Parameter X<br></br>
                    <label>-3
                        <input type="radio" name="radio1" value={"-3"} onClick={this.Click1}/>
                    </label>
                    <label>-2
                        <input type="radio" name="radio1" value={"-2"} onClick={this.Click1}/>
                    </label>
                    <label>-1
                        <input type="radio" name="radio1" value={"-1"} onClick={this.Click1}/>
                    </label>
                    <label>0
                        <input type="radio" name="radio1" value={"0"} onClick={this.Click1}/>
                    </label>
                    <label>1
                        <input type="radio" name="radio1" value={"1"} onClick={this.Click1}/>
                    </label>
                    <label>2
                        <input type="radio" name="radio1" value={"2"} onClick={this.Click1}/>
                    </label>
                    <label>3
                        <input type="radio" name="radio1" value={"3"} onClick={this.Click1}/>
                    </label>
                </div>
                <div align={"center"}>
                    <label>Parameter Y<br></br>
                        <input type="text" onChange={this.checkValue}/>
                    </label>
                </div>
                <div align={"center"}>Parameter R<br></br>
                    <label>-3
                        <input type="radio" name="radio2" value={"-3"} onClick={this.Click2}/>
                    </label>
                    <label>-2
                        <input type="radio" name="radio2" value={"-2"} onClick={this.Click2}/>
                    </label>
                    <label>-1
                        <input type="radio" name="radio2" value={"-1"} onClick={this.Click2}/>
                    </label>
                    <label>0
                        <input type="radio" name="radio2" value={"0"} onClick={this.Click2}/>
                    </label>
                    <label>1
                        <input type="radio" name="radio2" value={"1"} onClick={this.Click2}/>
                    </label>
                    <label>2
                        <input type="radio" name="radio2" value={"2"} onClick={this.Click2}/>
                    </label>
                    <label>3
                        <input type="radio" name="radio2" value={"3"} onClick={this.Click2}/>
                    </label>
                </div>
                <div align={"center"}>
                    <input type="button" value={"Отправить"} onClick={this.Send}/>
                    <input type="button" value={"Выйти"} onClick={this.logout}/>
                    <input type="button" value={"Загрузить"} onClick={this.Load}/>
					<input type="button" value={"Показать все"} onClick={this.DrawAll}/>
                    <p>{this.state.name}</p>
                </div>
                <div id={"scroll"}>
                    <TableManagement ref={"baby"} updateData={this.updateGraphic}/>
                </div>
            </div>
        );
    }
}