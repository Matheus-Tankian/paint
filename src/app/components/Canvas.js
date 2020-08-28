import React, { useState, useEffect, useRef } from 'react'
import useWindowSize from './WindowSize'

export default function Canvas(props) {
  const [drawing, setDrawing] = useState(false)
  const [width, setWidth] = useState(window.innerWidth)
  const [height, setHeight] = useState(window.innerHeight)
  
  const canvasRef = useRef()
  const ctx = useRef()
  
  useEffect(() => {
    ctx.current = canvasRef.current.getContext('2d')
  }, [])
  
  const [windowWidth, windowHeight] = useWindowSize(() => {
    setWidth(window.innerWidth)
    setHeight(window.innerHeight)
  })
  
  function handleMouseMove(e) {
    // actual coordinates
    const coords = [
      e.clientX - canvasRef.current.offsetLeft,
      e.clientY - canvasRef.current.offsetTop
    ]
    if (drawing) { 
      ctx.current.lineTo(...coords)
      ctx.current.stroke()
    }
    if (props.handleMouseMove) {
        props.handleMouseMove(...coords)
    }
  }
  function startDrawing(e) {
    ctx.current.lineJoin = 'round'
    ctx.current.lineCap = 'round'
    ctx.current.lineWidth = 10
    ctx.current.strokeStyle = props.color
    ctx.current.beginPath();
    // actual coordinates
    ctx.current.moveTo(
      e.clientX - canvasRef.current.offsetLeft,
      e.clientY - canvasRef.current.offsetTop
    )
    setDrawing(true)
  }
  function stopDrawing() {
    ctx.current.closePath()
    setDrawing(false)
  }
  
  return <canvas
    ref={canvasRef}
    width={props.width || width}
    height={props.height || height}
    onMouseDown={startDrawing}
    onMouseUp={stopDrawing}
    onMouseOut={stopDrawing}
    onMouseMove={handleMouseMove}
  />
}

// export default class Canvas extends React.Component {
//   constructor(props) {
//     super(props)
//     this.canvasRef = React.createRef()
//     this.handleMouseMove = this.handleMouseMove.bind(this)
//     this.handleResize = this.handleResize.bind(this)
//     this.startDrawing = this.startDrawing.bind(this)
//     this.stopDrawing = this.stopDrawing.bind(this)
//     this.state = {
//       drawing: false,
//       height: window.innerHeight,
//       width: window.innerWidth
//     }
//   }
//   componentDidMount() {
//     this.ctx = this.canvasRef.current.getContext('2d')
//     window.addEventListener('resize', this.handleResize);
//   }
//   componentWillUnmount() {
//     window.removeEventListener('resize', this.handleResize)
//   }
//   handleMouseMove(e) {
//     // actual coordinates
//     const coords = [
//       e.clientX - this.canvasRef.current.offsetLeft,
//       e.clientY - this.canvasRef.current.offsetTop
//     ]
//     if (this.state.drawing) { 
//       this.ctx.lineTo(...coords)
//       this.ctx.stroke()
//     }
//     if (this.props.handleMouseMove) {
//         this.props.handleMouseMove(...coords)
//     }
//   }
//   startDrawing(e) {
//     this.ctx.lineJoin = 'round'
//     this.ctx.lineCap = 'round'
//     this.ctx.lineWidth = 10
//     this.ctx.strokeStyle = this.props.color
//     this.ctx.beginPath();
//     // actual coordinates
//     this.ctx.moveTo(
//       e.clientX - this.canvasRef.current.offsetLeft,
//       e.clientY - this.canvasRef.current.offsetTop
//     )
//     this.setState({ drawing: true })
//   }
//   stopDrawing() {
//     this.ctx.closePath()
//     this.setState({ drawing: false })
//   }
//   render() {
//     return (
//       <React.Fragment>
//         <canvas
//           ref={this.canvasRef}
//           width={this.props.width || this.state.width}
//           height={this.props.height || this.state.height}
//           onMouseDown={this.startDrawing}
//           onMouseUp={this.stopDrawing}
//           onMouseOut={this.stopDrawing}
//           onMouseMove={this.handleMouseMove}
//         />
//       </React.Fragment>
//     )
//   }
// }