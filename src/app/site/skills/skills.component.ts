import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../common.service';

declare let $: any;
declare let d3: any;

@Component({
  selector: 'na-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {
  label: any;
  title = {"ru": "Любимые инструменты", "en": "Favourite tools"};

  constructor(
    public common: CommonService
  ) {}

  ngOnInit() {
    const label = this.label = $("#label");
    let svg = d3.select("#mindmap").append("svg");
    let force = d3.layout.force();

    if (this.common.skills.length > 0) {
      makeForceDiagram(this.common.skills);
    } else {
      d3.json("assets/data/skills.json", (error, skills) => {
        if (error) throw error;
        this.common.skills = skills;
        makeForceDiagram(skills);
      });
    }

    function makeForceDiagram(skills) {
      const [nodes, links] = createNodesAndLinks();
      setupForceDiagram();
      watchGraphSize();

      const link = drawLinks();
      const node = drawNodes();
      appendIconsToNodes();
      addTooltips();
      animateForceDiagramOnTick();

      function createNodesAndLinks() {
        const nodes = [];
        const links = [];
        let backendIndex, nodejsIndex;

        parseSkillsToNodesAndLinks(skills, null);
        linkNodeJSAndBackend();

        return [nodes, links];

        function parseSkillsToNodesAndLinks(skills, parent) {
          for (let i = 0; i < skills.length; i++) {
            const currentObject = skills[i];
            const currentObjectType = Object.prototype.toString.call(currentObject);

            addLink(i);
            switch (currentObjectType) {
              case '[object String]':
                addStringAsNode(currentObject);
                break;

              case '[object Object]':
                rememberNodeJSOrBackend(currentObject);
                addNode(currentObject);
                break;

              case '[object Array]':
                parseSkillsToNodesAndLinks(currentObject, nodes.length);
                break;
            }
          }

          function addLink(i) {
            if (i !== 0 && parent !== null) links.push({target: parent, source: nodes.length});
          }

          function addStringAsNode(string) {
            nodes.push({name: string, w: 32, h: 32});
          }

          function addNode(currentObject) {
            nodes.push(currentObject);
          }

          function rememberNodeJSOrBackend(currentObject) {
            if (currentObject.name === "Backend") backendIndex = nodes.length;
            if (currentObject.name === "Node.js") nodejsIndex = nodes.length;
          }
        }

        function linkNodeJSAndBackend() {
          links.push({target: nodejsIndex, source: backendIndex});
        }
      }

      function setupForceDiagram() {
        force
          .friction(0.9)
          .distance(80)
          .charge(-250)
          .gravity(0.07)
          .nodes(nodes)
          .links(links);
      }

      function watchGraphSize() {
        setGraphSize();
        d3.select(window).on('resize', () => {
          if (location.pathname === "/") setGraphSize();
        });

        function setGraphSize() {
          const mindmapWidth = $("#mindmap").width();
          const mindmapHeight = 770;
          svg.attr("width", mindmapWidth).attr("height", mindmapHeight);
          force.size([mindmapWidth, mindmapHeight]).start();
        }
      }

      function drawLinks() {
        return svg.selectAll(".link")
          .data(links)
          .enter().append("line")
            .attr("class", "link");
      }

      function drawNodes() {
        return svg.selectAll(".node")
          .data(nodes)
          .enter().append("g")
            .attr("class", "node")
            .call(force.drag);
      }

      function appendIconsToNodes() {
        node.append("image")
          .attr("xlink:href", d => "assets/images/skills/" + d.name.toLowerCase().replace(/\s/g,"_") + ".png")
          .attr("x", d => -d.w/2)
          .attr("y", d => -d.h/2)
          .attr("width", d => d.w)
          .attr("height", d => d.h);
      }

      function addTooltips() {
        node
          .on("mouseover", d => label.text(d.name).stop().fadeIn(100))
          .on("mouseleave", () => label.stop().fadeOut(100).text());
      }

      function animateForceDiagramOnTick() {
        force.on("tick", () => {
          link.attr("x1", d => d.target.x)
              .attr("y1", d => d.target.y)
              .attr("x2", d => d.source.x)
              .attr("y2", d => d.source.y);

          node.attr("transform", d => "translate(" + d.x + ", " + d.y + ")");
        });
      }
    }
  }

  changeLabelPosition(event) {
    this.label.css({
      left: event.offsetX + 20,
      top: event.offsetY - this.label.innerHeight()/2,
    });
  }
}