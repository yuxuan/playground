import React, { Component } from 'react';
import {Layer, Circle, Stage, Line} from 'react-konva';
import Konva from 'konva';

class ClockFace extends React.Component {
    stage=null;
    constructor(...args) {
      super(...args);
      this.state = {
          circle: {
            x:100,
            y:100,
            color: 'green',
          }, 
          line:{
              x:100,
              y:100,
          },       
      };
      this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        this.setState((prevState)=>{
            Object.assign(prevState.circle, { color: Konva.Util.getRandomColor() });
            return prevState;
        });
    }
    componentDidMount() {
        // log Konva.Circle instance
        console.log(this.refs.stage);
        const layer = this.refs.layer;
        const circle = this.refs.circle;
        this.setState((prevState)=>{
            Object.assign(prevState.circle, { x: layer.getWidth()/2, y: layer.getHeight()/2});
            Object.assign(prevState.line, { x: layer.getWidth()/2, y: layer.getHeight()/2});
            return prevState;
        });
    }
    render() {
        return (
            <Stage ref='stage' width={400} height={400}>
                <Layer ref='layer'>
                    <Circle
                        ref='circle'
                        x={this.state.circle.x} y={this.state.circle.y} width={250} height={250}
                        fill={this.state.circle.color}
                        onClick={this.handleClick}
                    />
                    <Line ref='line' x={this.state.line.x} y={this.state.line.y} 
                        points={[ 0, 0, -125 * Math.sin(this.props.angle), -125 * Math.cos(this.props.angle),]}
                        stroke='red'/>
                </Layer>
            </Stage>
                
        );
    }
}

class Clock extends Component {
    anglePerSec = -Math.PI/30;
    constructor(props) {
        super(props);
        this.state = {
            time: '',
            angle: 0,
        }
    }

    getTime() {
        return new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds();
    }
    getSecond() {
        return new Date().getSeconds();
    }
    
    componentWillMount() {
        this.setState({
            time: this.getTime(),
            angle: this.getSecond() * this.anglePerSec
        });

    }
    componentDidMount() {
        this.interval = setInterval(() => {
            this.setState((prevState) => {
                let state = {...{ time:this.getTime(), angle: this.getSecond() * this.anglePerSec } }
                return state;
            })
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }
    
    render() {
        return (
        <div>
            <div>{this.state.time}</div>
            <ClockFace angle={this.state.angle}/>
        </div>
        )
    }
}

export default Clock;