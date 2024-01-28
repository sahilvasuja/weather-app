


import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { WeatherGraphProps } from './weatherInterfaces';

const WeatherGraph: React.FC<WeatherGraphProps> = ({ weatherData }) => {
  // const chartRef = useRef(null);
  const chartRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    if (weatherData) {
      drawGraph();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [weatherData]);

  const handleResize = () => {
    if (chartRef.current) {
      drawGraph();
    }
  };

  const kelvinToCelsius = (kelvin: number) => {
    return kelvin - 273.15;
  };

  const drawGraph = () => {
    const margin = { top: 30, right: 20, bottom: 50, left: 40 };
    const height = 400 - margin.top - margin.bottom;
    const baseWidthPercentage = 90; // Adjust this percentage as needed

    // Dynamically calculate width based on container size with a larger base width
    const containerWidth = (chartRef.current as HTMLElement)?.clientWidth+250 ;
    const baseWidth = (baseWidthPercentage / 100) * containerWidth;
    const width = Math.min(containerWidth, baseWidth) - margin.left - margin.right;
  
    d3.select(chartRef.current).select('svg').remove();
    if (!weatherData) {
      return;
    } else {
      const svg = d3
        .select(chartRef.current)
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

      const data = [
        { label: 'Yesterday', temperature: kelvinToCelsius(weatherData.yesterday.temp), humidity: weatherData.yesterday.humidity },
        { label: 'Today', temperature: kelvinToCelsius(weatherData?.today?.main.temp || 0), humidity: weatherData?.today?.main.humidity },
        { label: 'Tomorrow', temperature: kelvinToCelsius(weatherData.tomorrow.temp.day), humidity: weatherData.tomorrow.humidity },
      ];

      const xScale = d3.scaleBand().domain(data.map((d) => d.label)).range([0, width]).padding(0.2);
      const yTemperatureScale = d3.scaleLinear().domain([0, d3.max(data, (d) => d.temperature) || 0]).range([height, 0]);
      // const yHumidityScale = d3.scaleLinear().domain([0, d3.max(data, (d) => d.humidity) || 0]).range([height, 0]);

      svg.append('g').attr('transform', `translate(0, ${height})`).call(d3.axisBottom(xScale));

      const temperatureLine = d3
        .line<{ label: string; temperature: number }>()
        .x((d) => xScale(d.label)! + xScale.bandwidth() / 2)
        .y((d) => yTemperatureScale(d.temperature));

      svg.append('path').data([data]).attr('d', temperatureLine).attr('fill', 'none').attr('stroke', '#69b3a2');

      svg
        .selectAll('.dot')
        .data(data)
        .enter()
        .append('circle')
        .attr('class', 'dot')
        .attr('cx', (d) => xScale(d.label)! + xScale.bandwidth() / 2)
        .attr('cy', (d) => yTemperatureScale(d.temperature))
        .attr('r', 5)
        .style('fill', '#69b3a2');

      svg
        .selectAll('.text-label')
        .data(data)
        .enter()
        .append('text')
        .attr('class', 'text-label')
        .attr('x', (d) => (xScale(d.label) ?? 0) + xScale.bandwidth() / 2)
        .attr('y', (d) => yTemperatureScale(d.temperature) - 10)
        .style('text-anchor', 'middle')
        .style('font-weight', (d) => (d.label === 'Today' ? 'bold' : 'normal'))
        .text((d) => `${d.temperature.toFixed(2)} °C`);

      svg.append('g').call(d3.axisLeft(yTemperatureScale)).append('text').attr('transform', 'rotate(-90)').attr('y', 6).attr('dy', '-3em').attr('text-anchor', 'end').attr('fill', '#69b3a2').text('Temperature (°C)');

      // const humidityLine = d3
      //   .line<{ label: string; humidity: number }>()
      //   .x((d) => xScale(d.label)! + xScale.bandwidth() / 2)
      //   .y((d) => yHumidityScale(d.humidity));

      // svg.append('path').data([data]).attr('d', humidityLine).attr('fill', 'none').attr('stroke', '#ff8c00');

      // svg
      //   .selectAll('.humidity-dot')
      //   .data(data)
      //   .enter()
      //   .append('circle')
      //   .attr('class', 'humidity-dot')
      //   .attr('cx', (d) => xScale(d.label)! + xScale.bandwidth() / 2)
      //   .attr('cy', (d) => yHumidityScale(d.humidity))
      //   .attr('r', 5)
      //   .style('fill', '#ff8c00');

      // svg
      //   .selectAll('.humidity-label')
      //   .data(data)
      //   .enter()
      //   .append('text')
      //   .attr('class', 'humidity-label')
      //   .attr('x', (d) => (xScale(d.label) ?? 0) + xScale.bandwidth() / 2)
      //   .attr('y', (d) => yHumidityScale(d.humidity) + 15)
      //   .style('text-anchor', 'middle')
      //   .style('font-weight', (d) => (d.label === 'Today' ? 'bold' : 'normal'))
      //   .text((d) => `${d.humidity.toFixed(2)} %`);

      // svg.append('g').attr('transform', 'translate(' + width + ', 0)').call(d3.axisRight(yHumidityScale)).append('text').attr('transform', 'rotate(-90)').attr('y', 6).attr('dy', '2em').attr('text-anchor', 'end').attr('fill', '#ff8c00').text('Humidity (%)');
    }
  };

  return <div ref={chartRef as React.RefObject<HTMLDivElement>}></div>;

};

export default WeatherGraph;
