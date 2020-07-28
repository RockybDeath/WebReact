import * as React from "react";
import ReactDOM from 'react-dom';
export class TableManagement extends React.Component{
    constructor(props) {
        super(props);
        this.updatePoints=this.updatePoints.bind(this);
        this.AddRow=this.AddRow.bind(this);
        this.Addpoints=this.Addpoints.bind(this);
        this.state={
            head_names:["X", "Y", "R", "Hit"],
            rows:[]
        }
    }
    AddRow(x,y,R,Hit){
        let newRows=this.state.rows;
		let x1=parseFloat(x).toFixed(3);
		let y1=parseFloat(y).toFixed(3);
        newRows.push([x1,y1,R,Hit]);
        this.setState({rows:newRows});
        // Rows.push([x,y,R,Hit]);
    }
    updatePoints(r){
        let newRows=this.state.rows;
        newRows.map(point => { if (point[2] === r) this.props.updateData(point[0],point[1],point[2],point[3]);
        else {
            this.props.updateData(point[0],point[1],point[2],"redraw");
        }
        });
    }
    Addpoints(){
        fetch("http://localhost:20850/load",{
            method:"Post",
            headers:{
                "Authorization": "Basic "+localStorage.getItem("Token")
            }
        }).then(res => res.json())
            .then( (result) => {
                result.map( point => this.AddRow(point.X,point.Y,point.R, point.hit));
                // this.setState({
                //     rows: result
                // });
            }, (error) => {
                console.log(error.status + ' ' + error.responseText);
            });
        // $.ajax({
        //     type:"Get",
        //     url: "http://localhost:8080/myLab4/load",
        //     success: function(result) {
        //         var json=JSON.parse(result);
        //         this.setState({
        //             rows: json
        //         });
        //         json.forEach(point => this.props.updateGraphic(point.x,point.y,point.R,point.Hit));
        //     },
        //     error: function(jqXHR, textStatus, errorThrown) {
        //         console.log(jqXHR.status + ' ' + jqXHR.responseText);
        //     }
        // });
    }
    render(){
        return(
            <div>
                <Table  head={this.state.head_names} rows={this.state.rows}/>
                <hr/>
            </div>
        )
    }
}
class Table extends React.Component{
    render(){
        return(
            <table className={"superTable"}>
                <thead>
                {this.genHead()}
                </thead>
                <tbody>
                {this.genRow()}
                </tbody>
            </table>
        )
    }
    genHead(){
        var head=this.props.head;
        return head.map(function (v,i) {
            return (
                <th id={"super"} key={'th'+i}>{v}</th>
            )
        })
    }
    genRow(){
        var rows=this.props.rows;
        return rows.map(function (v,i) {
            var tmp=v.map(function (v2,j) {
                return(
                    <td id={"super1"} key={'td'+i+'_'+j}>
                        {v2}
                    </td>
                )
            });
            return(
                <tr id={"super2"} key={'tr'+i}>
                    {tmp}
                </tr>
            )
        });
    }
}