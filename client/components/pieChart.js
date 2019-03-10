import React from 'react'
import * as d3 from 'd3'

const Arc = ({data, index, createArc, colors}) => {
  console.log(colors(index))
  return (
    <g key={data.data.name} className="arc">
      <path className="arc" d={createArc(data)} fill={colors(index)} />
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
  const legendItemSize = 18
  const legendSpacing = 4
  return (
    <div>
      <svg width={props.width} height={props.height}>
        <g transform={`translate(${props.outerRadius} ${props.outerRadius})`}>
          {data.map((d, i) => {
            return (
              <Arc
                key={d.data.name}
                data={d}
                index={i}
                createArc={createArc}
                colors={colors}
              />
            )
          })}

          {data.map((dataItem, index) => {
            let height = legendItemSize + legendSpacing
            let offset = height * data.length / 2
            let x = legendItemSize * -3
            let y = index * height - offset
            return (
              <g
                key={dataItem.name}
                className="legend"
                transform={`translate(${x}, ${y})`}
              >
                <rect
                  width={legendItemSize}
                  height={legendItemSize}
                  fill={colors(index)}
                />
                <text
                  className="legendtexts"
                  x={legendItemSize + legendSpacing}
                  y={legendItemSize - legendSpacing}
                >
                  {dataItem.data.name}
                </text>
              </g>
            )
          })}
        </g>
        }}
      </svg>
    </div>
  )
}

export default pieChart
