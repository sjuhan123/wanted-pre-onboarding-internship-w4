import { useEffect, useRef } from "react";
import styled from "styled-components";
import * as d3 from "d3";
import { IRegionData, TRegionTimeDataList } from "../../types/region";
import { FILTER_NAME } from "../../constants/filterButtons";

interface TimeSeriesChartProps {
  chartData: TRegionTimeDataList;
  ids?: number[] | string[];
  targetId?: number;
  targetIdHandler: (id: number) => void;
}

const TimeSeriesChart = ({
  chartData,
  ids = [FILTER_NAME.All],
  targetId = 0,
  targetIdHandler,
}: TimeSeriesChartProps) => {
  const times = chartData.map((d) => {
    const dateTimeParts = String(d[0]).split(" ");
    return dateTimeParts[1];
  });
  const data = chartData.map((d) => d[1]);

  const svgRef = useRef(null);

  useEffect(() => {
    const width = 1000;
    const height = 700;
    const marginTop = 30;
    const marginRight = 100;
    const marginBottom = 30;
    const marginLeft = 100;

    const filteredTimes = times.filter((_time, index) => index % 8 === 0);

    const scaleX = d3
      .scaleBand()
      .domain(filteredTimes.map((d) => String(d)))
      .range([marginLeft, width - marginRight])
      .padding(0.5);

    const barScaleX = d3
      .scaleBand()
      .domain(times.map((d) => String(d)))
      .range([marginLeft, width - marginRight])
      .padding(0.5);

    const barScaleY = d3
      .scaleLinear()
      .domain([0, 20000]) // 원하는 범위 설정
      .range([height - marginBottom, marginTop]);

    const areaScaleY = d3
      .scaleLinear()
      .domain([0, 200]) // 원하는 범위 설정
      .range([height - marginBottom, marginTop]);

    const area = d3
      .area<IRegionData>()
      .x((_d, i) => barScaleX(times[i]) as number)
      .y0(height - marginBottom)
      .y1((d) => areaScaleY(Number(d.value_area)));

    // tooltip
    const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "d3-tooltip")
      .style("position", "absolute")
      .style("z-index", "10")
      .style("visibility", "hidden")
      .style("padding", "10px")
      .style("background", "rgba(0,0,0,0.6)")
      .style("border-radius", "4px")
      .style("color", "#fff")
      .text("a simple tooltip");

    // svg
    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height + 50])
      .attr("style", "max-width: 100%; height: auto%;");

    // bar chart
    svg
      .append("g")
      .attr("role", "bar")
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (_d, i) => barScaleX(String(times[i])) as number)
      .attr("y", (d) => barScaleY(d.value_bar))
      .attr("width", barScaleX.bandwidth() + 3)
      .attr("height", (d) => barScaleY(0) - barScaleY(d.value_bar))
      .attr("fill", (d) =>
        d.id === ids[targetId] ? "rgb(0, 188, 212)" : "rgb(87, 123, 241)"
      )
      .on("mouseover", function (_e, d) {
        tooltip
          .html(`<div>id: ${d.id}</div><div>bar: ${d.value_bar}</div>`)
          .style("visibility", "visible");
        d3.select(this).transition().attr("fill", "rgb(0, 188, 212)");
      })
      .on("mousemove", function (e) {
        tooltip
          .style("top", e.pageY - 10 + "px")
          .style("left", e.pageX + 10 + "px");
      })
      .on("mouseout", function (_e, d) {
        if (d.id === ids[targetId]) return;
        tooltip.html(``).style("visibility", "hidden");
        d3.select(this).transition().attr("fill", "rgb(87, 123, 241)");
      })
      .on("click", function (_e, d) {
        const targetId = ids.findIndex((id) => id === d.id);
        tooltip.html(``).style("visibility", "hidden");
        targetIdHandler(targetId);
      });

    // area chart
    svg
      .append("g")
      .attr("role", "area")
      .selectAll("path")
      .data(data)
      .enter()
      .append("path")
      .attr("d", area(data))
      .attr("fill", "orange");

    // x축
    svg
      .append("g")
      .attr("role", "xAxis")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(d3.axisBottom(scaleX) as never)
      .attr("font-size", "0.9rem")
      .attr("font-weight", "light")
      .attr("font-family", "sans-serif")
      .selectAll("text")
      .attr("y", 20);

    // y 좌측축
    svg
      .append("g")
      .attr("role", "yLeftAxis")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(
        d3
          .axisLeft(barScaleY)
          .ticks(5)
          .tickSize(-(width - marginLeft - marginRight)) as never
      )
      .attr("font-size", "0.9rem")
      .attr("font-weight", "light")
      .attr("font-family", "sans-serif")
      .call((g) =>
        g
          .selectAll(".tick line")
          .clone()
          .attr("stroke-opacity", 0.03)
          .attr("x2", width - marginLeft - marginRight)
      )
      .call((g) =>
        g
          .append("text")
          .attr("x", -20)
          .attr("y", 15)
          .attr("font-size", "1rem")
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .text("Bar")
      );

    svg
      .append("g")
      .attr("role", "yRightAxis")
      .attr("transform", `translate(${width - marginRight},0)`)
      .call(d3.axisRight(areaScaleY).ticks(4).tickSize(0) as never)
      .attr("font-size", "0.9rem")
      .attr("font-weight", "light")
      .attr("font-family", "sans-serif")
      .call((g) =>
        g
          .append("text")
          .attr("x", -10)
          .attr("y", 15)
          .attr("font-size", "1rem")
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .text("Area")
      );

    return () => {
      svg.selectAll("*").remove();
      d3.select("body").selectAll(".d3-tooltip").remove();
    };
  }, [data, ids, targetId, targetIdHandler, times]);

  return (
    <Container>
      <SVG ref={svgRef} />
    </Container>
  );
};

export default TimeSeriesChart;

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
`;

const SVG = styled.svg.attrs({
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  xmlnsXlink: "http://www.w3.org/1999/xlink",
})`
  font-size: 24px;
  margin: 12px;
`;
