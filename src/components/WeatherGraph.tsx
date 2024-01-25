import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const WeatherGraph = ({ weatherData }:any) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (weatherData) {
      drawGraph();
    }
  }, [weatherData]);

  const kelvinToCelsius = (kelvin) => {
    return kelvin - 273.15;
  };

  const drawGraph = () => {
    const margin = { top: 20, right: 20, bottom: 50, left: 70 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;
    d3.select(chartRef.current).select('svg').remove();

    const svg = d3
      .select(chartRef.current)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const data = [
      { label: 'Yesterday', temperature: kelvinToCelsius(weatherData.yesterday.temp), humidity: weatherData.yesterday.humidity },
      { label: 'Today', temperature: kelvinToCelsius(weatherData.today.main.temp), humidity: weatherData.today.main.humidity },
      { label: 'Tomorrow', temperature: kelvinToCelsius(weatherData.tomorrow.temp.day), humidity: weatherData.tomorrow.humidity },
    ];

    const xScale = d3.scaleBand().domain(data.map((d) => d.label)).range([0, width]).padding(0.2);
    const yTemperatureScale = d3.scaleLinear().domain([0, d3.max(data, (d) => d.temperature)]).range([height, 0]);
    const yHumidityScale = d3.scaleLinear().domain([0, d3.max(data, (d) => d.humidity)]).range([height, 0]);

    svg.append('g').attr('transform', `translate(0, ${height})`).call(d3.axisBottom(xScale));

    const temperatureLine = d3
      .line()
      .x((d) => xScale(d.label) + xScale.bandwidth() / 2)
      .y((d) => yTemperatureScale(d.temperature));

    svg.append('path').data([data]).attr('d', temperatureLine).attr('fill', 'none').attr('stroke', '#69b3a2');

    svg
      .selectAll('.dot')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', 'dot')
      .attr('cx', (d) => xScale(d.label) + xScale.bandwidth() / 2)
      .attr('cy', (d) => yTemperatureScale(d.temperature))
      .attr('r', 5)
      .style('fill', '#69b3a2');

    svg
      .selectAll('.text-label')
      .data(data)
      .enter()
      .append('text')
      .attr('class', 'text-label')
      .attr('x', (d) => xScale(d.label) + xScale.bandwidth() / 2)
      .attr('y', (d) => yTemperatureScale(d.temperature) - 10)
      .style('text-anchor', 'middle')
      .style('font-weight', (d) => (d.label === 'Today' ? 'bold' : 'normal'))
      .text((d) => `${d.temperature.toFixed(2)} °C`);

    svg.append('g').call(d3.axisLeft(yTemperatureScale)).append('text').attr('transform', 'rotate(-90)').attr('y', 6).attr('dy', '-3em').attr('text-anchor', 'end').attr('fill', '#69b3a2').text('Temperature (°C)');
  };

  return <div ref={chartRef} ></div>;
};

export default WeatherGraph;



