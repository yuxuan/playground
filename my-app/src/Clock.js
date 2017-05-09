import React, { Component } from 'react';
import {Layer, Circle, Stage, Line} from 'react-konva';
import Konva from 'konva';

const Pointer = (props) => {
    return (
        <Line x={props.x} y={props.y} 
                points={[ 0, 0, -125 * Math.sin(props.angle), -125 * Math.cos(props.angle),]}
                stroke={ props.color || 'red' }/>
    );
}

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
                    <Pointer x={this.state.line.x} y={this.state.line.y} angle={this.props.hourAngle} color='blue'/>
                    <Pointer x={this.state.line.x} y={this.state.line.y} angle={this.props.minAngle} color='yellow'/>
                    <Pointer x={this.state.line.x} y={this.state.line.y} angle={this.props.secAngle} color='red' />
                </Layer>
            </Stage>
                
        );
    }
}

class Clock extends Component {
    secAnglePerSec= -2*Math.PI/60;
    minAnglePerSec = -2*Math.PI/(60*60);
    hourAnglePerSec = -2*Math.PI/(3600*60*12);
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

    getSeconds() {
        return new Date().getSeconds();
    }

    getMinutes() {
        return new Date().getMinutes();
    }

    getHours() {
        return new Date().getHours();
    }

    getPointersAngle() {
        let secAngle = this.getSeconds() * this.secAnglePerSec;
        let minAngle = (this.getMinutes() * 60 + this.getSeconds()) * this.minAnglePerSec;
        let hourAngle = (this.getHours() * 60 + this.getMinutes() * 60 + this.getSeconds()) * this.hourAnglePerSec;
        return { secAngle, minAngle, hourAngle, }
    }
    
    componentWillMount() {
        this.setState({ time: this.getTime(), ...this.getPointersAngle() });

    }
    componentDidMount() {
        this.interval = setInterval(() => {
            this.setState((prevState) => {
                let state = {...{ time:this.getTime(), ...this.getPointersAngle() } }
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
            <ClockFace secAngle={this.state.secAngle} minAngle={this.state.minAngle} hourAngle={this.state.hourAngle}/>
        </div>
        )
    }
}

export default Clock;