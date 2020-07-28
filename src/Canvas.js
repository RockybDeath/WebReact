import * as React from "react";
import ReactDOM from 'react-dom';
export class Canvas extends React.Component{
    constructor(props) {
        super(props);
        this.clicCanvas=this.clicCanvas.bind(this);
        this.createCanvas=this.createCanvas.bind(this);
        this.state = {
            R: 1,
            canvas: 0,
            context: 0,
            debug: "false"
        };
    }
    clicCanvas() {
        // var elem = document.getElementById("canvas1");
        var br = this.state.canvas.getBoundingClientRect();
        var left = br.left;
        var top = br.top;
        var event = window.event;
        var x = event.clientX-left;
        var y = event.clientY-top;
        let width=this.state.canvas.width;
        x=(x-150)/130*this.state.R; y=(150-y)/130*this.state.R;
        // this.createCanvas(x.toFixed(3), y.toFixed(3), this.state.R, "true");
        // this.props.updateData(x.toFixed(3), y.toFixed(3), this.state.R, "true");
        const data={ "X":x,
            "Y": y, "R":this.state.R};
        fetch("http://localhost:20850/send",{
            method:"Post",
            headers:{
                'Content-Type': 'application/json',
                "Authorization": "Basic "+localStorage.getItem("Token")
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
            .then( (result) => {
                this.createCanvas(x.toFixed(3), y.toFixed(3), this.state.R, result.hit);
                this.props.updateData(x.toFixed(3), y.toFixed(3), this.state.R, result.hit);
            }, (error) => {
                console.log(error.status + ' ' + error.responseText);
            });



        // this.createCanvas(x,y,this.state.R,"true");
        // this.props.updateData(x,y,this.state.R,"true");
        // this.зкщ.baby.AddRow(x,y,this.state.R,"true");
        //Rows.push([x,y,this.state.R,"true"]);s
        //this.props.children.AddRow(x,y,this.state.R,"true");
    }
    createCanvas(x, y, r, isArea){
        //let canvas = document.getElementById("canvas1"), context = canvas.getContext("2d");
        // if (this.state.debug ==="false") {
        //     this.drawCanwas(this.state.R);
        //     this.setState({
        //         debug: "true"
        //     });
        // }
        let width=this.state.canvas.width;
        this.state.context.beginPath();
        this.state.context.rect(150 + ((x / r) * 130)-2, 150 - ((y / r) * 130)-2, 4, 4);
        this.state.context.closePath();
        if(isArea === "true"){
            this.state.context.strokeStyle = "yellow";
            this.state.context.fillStyle = "yellow";
        } else if(isArea === "redraw"){
            this.state.context.strokeStyle = "grey";
            this.state.context.fillStyle = "grey";
        }
        else {
            this.state.context.strokeStyle = "red";
            this.state.context.fillStyle = "red";
        }
        this.state.context.fill();
        this.state.context.stroke();
    }
    drawCanwas(r){
        //очистка
        let canvas = document.getElementById("canvas1"), context = canvas.getContext("2d");
        this.setState({
            canvas: canvas,
            context: context,
            debug: "true"
        });
        context.clearRect(0, 0, canvas.width, canvas.height);
        let width=canvas.width;
        this.setState({R:r});
        //прямоугольник
        context.beginPath();
        context.rect(150, 150, 130, -130);
        context.closePath();
        context.strokeStyle = "blue";
        context.fillStyle = "blue";
        context.fill();
        context.stroke();

        // сектор
        context.beginPath();
        context.moveTo(150, 150);
        context.arc(150, 150, 65, -Math.PI/2, -Math.PI, true);
        context.closePath();
        context.strokeStyle = "blue";
        context.fillStyle = "blue";
        context.fill();
        context.stroke();

        //треугольник
        context.beginPath();
        context.moveTo(215, 150);
        context.lineTo(150, 150);
        context.lineTo(150, 280);
        context.lineTo(215, 150);
        context.closePath();
        context.strokeStyle = "blue";
        context.fillStyle = "blue";
        context.fill();
        context.stroke();

        //отрисовка осей
        context.beginPath();
        context.font = "10px Verdana";
        context.moveTo(150, 0); context.lineTo(150, 300);
        context.moveTo(150, 0); context.lineTo(145, 15);
        context.moveTo(150, 0); context.lineTo(155, 15);
        context.fillText("Y", 160, 10);
        context.moveTo(0, 150); context.lineTo(300, 150);
        context.moveTo(300, 150); context.lineTo(285, 145);
        context.moveTo(300, 150); context.lineTo(285, 155);
        context.fillText("X", 290, 135);

        // деления X
        context.moveTo(145, 20); context.lineTo(155, 20); context.fillText(r, 160, 20);
        context.moveTo(145, 85); context.lineTo(155, 85); context.fillText((r / 2), 160, 78);
        context.moveTo(145, 215); context.lineTo(155, 215); context.fillText(-(r / 2), 160, 215);
        context.moveTo(145, 280); context.lineTo(155, 280); context.fillText(-r, 160, 280);
        // деления Y
        context.moveTo(20, 145); context.lineTo(20, 155); context.fillText(-r, 20, 170);
        context.moveTo(85, 145); context.lineTo(85, 155); context.fillText(-(r / 2), 70, 170);
        context.moveTo(215, 145); context.lineTo(215, 155); context.fillText((r / 2), 215, 170);
        context.moveTo(280, 145); context.lineTo(280, 155); context.fillText(r, 280, 170);

        context.closePath();
        context.strokeStyle = "black";
        context.fillStyle = "black";
        context.stroke();
    }
    render(){
        return(
            <canvas id="canvas1"  width="300" height="300" onClick={this.clicCanvas}></canvas>
        )
    }
}