import React from 'react'
import * as d3 from 'd3'

const Arc = ({data, index, createArc, colors}) => {
  console.log('data', data)
  return (
    <g key={index} className="arc">
      <path className="arc" d={createArc(data)} fill={colors(index)} />
      <text
        transform={`translate(${createArc.centroid(data)})`}
        textAnchor="middle"
        alignmentBaseline="middle"
        fill="white"
        fontSize="10"
      >
        {data.name}
      </text>
    </g>
  )
}
const pieChart = props => {
  const createPie = d3
    .pie()
    .value(d => d.totalTime)
    .sort(null)
  const data = createPie(props.data)
  const createArc = d3
    .arc()
    .innerRadius(props.innerRadius)
    .outerRadius(props.outerRadius)
  const colors = d3.scaleOrdinal(d3.schemeCategory10)
  return (
    <div>
      <svg width={props.width} height={props.height}>
        <g transform={`translate(${props.outerRadius} ${props.outerRadius})`}>
          {data.map((d, i) => {
            return (
              <Arc
                key={data.name}
                data={d}
                index={i}
                createArc={createArc}
                colors={colors}
              />
            )
          })})}
        </g>
      </svg>
    </div>
  )
}

export default pieChart
