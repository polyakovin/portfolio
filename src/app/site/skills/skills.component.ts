import { Component, OnInit, ViewChild } from '@angular/core';
import { select, layout } from 'd3';
import { CommonService } from '../../common.service';
import skillsData from '../../../assets/data/skills.json';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {
  title = {
    ru: 'Любимые инструменты',
    en: 'Favourite tools',
  };
  @ViewChild('mindmapElement') mindmapElement;
  @ViewChild('labelElement') labelElement;
  label;
  mindmap;
  isLabelShown = false;
  labelPostion = {
    top: 0,
    left: 0,
  };

  constructor(
    public common: CommonService
  ) {}

  ngOnInit() {
    this.label = this.labelElement.nativeElement;
    this.makeForceDiagram(skillsData);
  }

  makeForceDiagram(skills) {
    this.mindmap = select(this.mindmapElement.nativeElement);
    const svg = this.mindmap.append('svg');
    const force = layout.force();
    const [nodes, links] = this.createNodesAndLinks(skills);
    this.setupForceDiagram(force, nodes, links);
    this.watchGraphSize(svg, force);
    const link = this.drawLinks(svg, links);
    const node = this.drawNodes(svg, nodes, force);
    this.appendIconsToNodes(node);
    this.addTooltips(node);
    this.animateForceDiagramOnTick(force, link, node);
  }

  createNodesAndLinks(skills) {
    const [nodes, links, nodejsIndex, backendIndex] = this.parseSkillsToNodesAndLinks(skills);

    links.push({
      target: nodejsIndex,
      source: backendIndex
    });

    return [nodes, links];
  }

  parseSkillsToNodesAndLinks(skills, parent = null, nodes = [], links = [], backendIndex?, nodejsIndex?) {
    for (let i = 0; i < skills.length; i++) {
      const currentObject = skills[i];
      const currentObjectType = Object.prototype.toString.call(currentObject);

      if (i !== 0 && parent !== null) {
        links.push({
          target: parent,
          source: nodes.length
        });
      }

      switch (currentObjectType) {
        case '[object String]':
          nodes.push({
            name: currentObject,
            w: 32,
            h: 32
          });
          break;

        case '[object Object]':
          if (currentObject.name === 'Node.js') {
            nodejsIndex = nodes.length;
          }
          if (currentObject.name === 'Backend') {
            backendIndex = nodes.length;
          }
          nodes.push(currentObject);
          break;

        case '[object Array]':
          const [
            innerNodes,
            innerLinks,
            innerNodejsIndex,
            innerBackendIndex
          ] = this.parseSkillsToNodesAndLinks(currentObject, nodes.length, nodes, links, backendIndex, nodejsIndex);
          nodes = innerNodes;
          links = innerLinks;
          nodejsIndex = innerNodejsIndex;
          backendIndex = innerBackendIndex;
          break;
      }
    }

    return [nodes, links, nodejsIndex, backendIndex];
  }

  setupForceDiagram(force, nodes, links) {
    force
      .friction(0.9)
      .distance(80)
      .charge(-250)
      .gravity(0.07)
      .nodes(nodes)
      .links(links);
  }

  watchGraphSize(svg, force) {
    this.setGraphSize(svg, force);
    select(window).on('resize', () => {
      if (location.pathname === '/') {
        this.setGraphSize(svg, force);
      }
    });
  }

  setGraphSize(svg, force) {
    const mindmapWidth = this.mindmap[0][0].offsetWidth;
    const mindmapHeight = 770;

    svg
      .attr('width', mindmapWidth)
      .attr('height', mindmapHeight);

    force
      .size([mindmapWidth, mindmapHeight])
      .start();
  }

  drawLinks(svg, links) {
    return svg.selectAll('.link')
      .data(links)
      .enter().append('line')
        .attr('style', 'stroke: #ccc');
  }

  drawNodes(svg, nodes, force) {
    return svg.selectAll('.node')
      .data(nodes)
      .enter().append('g')
        .attr('style', 'cursor: move')
        .call(force.drag);
  }

  appendIconsToNodes(node) {
    node.append('image')
      .attr('xlink:href', d => 'assets/images/skills/' + d.name.toLowerCase().replace(/\s/g, '_') + '.png')
      .attr('x', d => -d.w / 2)
      .attr('y', d => -d.h / 2)
      .attr('width', d => d.w)
      .attr('height', d => d.h);
  }

  addTooltips(node) {
    node
      .on('mouseover', d => {
        this.label.innerHTML = d.name;
        this.isLabelShown = true;
      })
      .on('mouseleave', () => {
        this.isLabelShown = false;
      });
  }

  animateForceDiagramOnTick(force, link, node) {
    force.on('tick', () => {
      link.attr('x1', d => d.target.x)
          .attr('y1', d => d.target.y)
          .attr('x2', d => d.source.x)
          .attr('y2', d => d.source.y);

      node.attr('transform', d => 'translate(' + d.x + ', ' + d.y + ')');
    });
  }

  changeLabelPosition({offsetX: x, offsetY: y}) {
    this.labelPostion.left = x + 20;
    this.labelPostion.top = y - this.label.offsetHeight / 2;
  }
}
