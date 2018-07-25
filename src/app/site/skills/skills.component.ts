import { Component, OnInit } from '@angular/core';

declare let $: any;
declare let d3: any;

@Component({
  selector: 'na-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {
  label: any;

  constructor() { }

  ngOnInit() {
    this.label = $("#label");

    let label = this.label,
        width = $("#mindmap").width(),
        height = 900;

    let svg = d3.select("#mindmap").append("svg")
      .attr("width", width)
      .attr("height", height);

    d3.select(window).on('resize', resize);

    function resize() {
      width = $("#mindmap").width();
      svg.attr("width", width);
      force.size([width, height]).start();
    }

    let force = d3.layout.force()
      .size([width, height])
      .friction(0.9)
      .distance(80)
      .charge(-250)
      .gravity(0.07);

    d3.json("assets/data/skills.json", function(error, json) {
      if (error) throw error;

      let nodes = [],
          links = [],
          backendIndex, nodejsIndex;

      // Парсим иерархию из массивов
      (function collectAllNodes (thisArray, parent) {
        for (let i = 0; i < thisArray.length; i++) {
          // Связи
          if (i !== 0 && parent !== null) links.push({target: parent, source: nodes.length});

          switch (Object.prototype.toString.call(thisArray[i])) {
            case '[object Array]':
              collectAllNodes(thisArray[i], nodes.length); // Массивы парсим дальше
              break;

            case '[object Object]':
              if (thisArray[i].name === "Backend") backendIndex = nodes.length;
              if (thisArray[i].name === "Node.js") nodejsIndex = nodes.length;

              nodes.push(thisArray[i]); // Объекты добавляем в набор узлов
              break;

            case '[object String]':
              nodes.push({name: thisArray[i], w: 32, h: 32}); // Строки добавляем со стандартными параметрами
              break;
          }
        }
      })(json, null);

      // соединяем ноду с бэкендом
      links.push({target: nodejsIndex, source: backendIndex});

      force
        .nodes(nodes)
        .links(links)
        .start();

      let link = svg.selectAll(".link")
        .data(links)
        .enter().append("line")
          .attr("class", "link");

      let node = svg.selectAll(".node")
        .data(nodes)
        .enter().append("g")
          .attr("class", "node")
          .call(force.drag);

      node.append("image")
        .attr("xlink:href", function(d) {
          return "assets/images/skills/" + d.name.toLowerCase().replace(/\s/g,"_") + ".png"
        })
        .attr("x", function(d){return - d.w / 2})
        .attr("y", function(d){return - d.h / 2})
        .attr("width", function(d){return d.w})
        .attr("height", function(d){return d.h});

      // подсказка по брендам
      node.on("mouseover", (d) => {
        label.text(d.name);
        label.stop().fadeIn(100);
      });
      node.on("mouseleave", (d) => {
        label.stop().fadeOut(100);
        label.text();
      });

      force.on("tick", function() {
        link.attr("x1", function(d) { return d.target.x; })
            .attr("y1", function(d) { return d.target.y; })
            .attr("x2", function(d) { return d.source.x; })
            .attr("y2", function(d) { return d.source.y; });

        node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
      });
    });
  }

  changeLabelPosition(e) {
    // console.log("Координаты курсора: ", e.offsetX, e.offsetY);
    // console.log(this.label);
    this.label.css({
		  left: e.offsetX + 20,
      top: e.offsetY - this.label.innerHeight() / 2,
    });
  }
}