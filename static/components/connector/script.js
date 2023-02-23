const svgLink = "http://www.w3.org/2000/svg";

const length = 128;
const padding = 8;
const mid = length / 2;
const double = padding * 3;
const midTop = (length - double) / 2;
const midBottom = midTop + padding * 3;
const start = padding;
const startDouble = start + double;
const end = length - padding;

const midEndToStartStartPath = `M ${mid} ${end} L ${start} ${start}`;
const endStartToMidEndPath = `M ${end} ${start} L ${mid} ${end}`;
const startMidToEndMidPath = `M ${start} ${mid} L ${end} ${mid}`;
const midEndToStartStartDoublePath = `M ${midTop} ${end} L ${start} ${start} M ${midBottom} ${end} L ${startDouble} ${start}`;
const midEndToStartStartDoubleAnimationPath = `M ${midBottom} ${end} L ${startDouble} ${start} M ${start} ${start} L ${midTop} ${end}`;
const startMidToEndMidDoublePath = `M ${start} ${midTop} L ${end} ${midTop} M ${start} ${midBottom} L ${end} ${midBottom}`;
const startMidToEndMidDoubleAnimationPath = `M ${start} ${midBottom} L ${end} ${midBottom} M ${end} ${midTop} L ${start} ${midTop}`;
const endMidTopToStartMidTopPath = `M ${end} ${midTop} L ${start} ${midTop}`;
const startMidBottomToEndMidBottomPath = `M ${start} ${midBottom} L ${end} ${midBottom}`;

class ConnectorElement extends HTMLElement {
  static get observedAttributes() {
    return ["render"];
  }

  connectedCallback() {
    const divEl = document.createElement("div");
    divEl.style.width = length + "px";
    divEl.style.height = length + "px";
    divEl.setAttribute("class", "connector");

    const svgEl = document.createElementNS(svgLink, "svg");
    svgEl.style.display = "block";
    svgEl.style.width = length + "px";
    svgEl.style.height = length + "px";
    svgEl.setAttribute("viewBox", "0 0 " + length + " " + length);

    const defsEl = document.createElementNS(svgLink, "defs");

    const markerEl = document.createElementNS(svgLink, "marker");
    markerEl.setAttribute("id", "arrow");
    markerEl.setAttribute("orient", "auto-start-reverse");
    markerEl.setAttribute("viewBox", "0 0 " + padding + " " + padding);
    markerEl.setAttribute("markerWidth", padding);
    markerEl.setAttribute("markerHeight", padding);
    markerEl.setAttribute("refX", padding / 4);
    markerEl.setAttribute("refY", padding / 8);

    const markerPathEl = document.createElementNS(svgLink, "path");
    markerPathEl.setAttribute(
      "d",
      "M 0 0 L " +
        padding / 4 +
        " " +
        padding / 8 +
        " " +
        "L 0 " +
        padding / 4 +
        " Z"
    );

    const rectEl = document.createElementNS(svgLink, "rect");
    rectEl.style.width = "100%";
    rectEl.style.height = "100%";
    rectEl.setAttribute("fill", "#FBFAF5");

    markerEl.append(rectEl);
    markerEl.append(markerPathEl);

    defsEl.append(markerEl);

    const pathAnimateEl = document.createElementNS(svgLink, "path");

    defsEl.append(pathAnimateEl);

    const pathAnimateSecondEl = document.createElementNS(svgLink, "path");

    defsEl.append(pathAnimateSecondEl);

    svgEl.append(defsEl);

    const pathEl = document.createElementNS(svgLink, "path");
    pathEl.setAttribute("class", "line");
    pathEl.setAttribute("marker-end", "url(#arrow)");

    svgEl.append(pathEl);

    const pathSecondEl = document.createElementNS(svgLink, "path");
    pathSecondEl.setAttribute("class", "line");
    pathSecondEl.setAttribute("marker-end", "url(#arrow)");

    svgEl.append(pathSecondEl);

    const gEl = document.createElementNS(svgLink, "g");
    gEl.style.display = "none";

    const animateMotionEl = document.createElementNS(svgLink, "animateMotion");

    animateMotionEl.setAttribute("dur", "2.5s");
    animateMotionEl.setAttribute("begin", "");

    animateMotionEl.onend = () => {
      gEl.style.display = "none";
    };

    const mpathEl = document.createElementNS(svgLink, "mpath");

    animateMotionEl.append(mpathEl);

    gEl.append(animateMotionEl);

    const circleEl = document.createElementNS(svgLink, "circle");

    gEl.append(circleEl);

    const textEl = document.createElementNS(svgLink, "text");

    textEl.setAttribute("class", "text");
    textEl.setAttribute("text-anchor", "middle");
    textEl.setAttribute("alignment-baseline", "middle");

    gEl.append(textEl);

    const gSecondEl = document.createElementNS(svgLink, "g");
    gSecondEl.style.display = "none";

    const animateMotionSecondEl = document.createElementNS(
      svgLink,
      "animateMotion"
    );

    animateMotionSecondEl.setAttribute("dur", "2.5s");
    animateMotionSecondEl.setAttribute("begin", "");

    animateMotionSecondEl.onbegin = () => {
      gSecondEl.style.display = "inline";
      gEl.style.display = "inline";
      animateMotionEl.beginElement();
    };

    animateMotionSecondEl.onend = () => {
      gSecondEl.style.display = "none";
      document.getElementById(this.getAttribute("cue")).beginElement();
    };

    const mpathSecondEl = document.createElementNS(svgLink, "mpath");

    animateMotionSecondEl.append(mpathSecondEl);

    gSecondEl.append(animateMotionSecondEl);

    const circleSecondEl = document.createElementNS(svgLink, "circle");

    gSecondEl.append(circleSecondEl);

    const textSecondEl = document.createElementNS(svgLink, "text");

    textSecondEl.setAttribute("class", "text");
    textSecondEl.setAttribute("text-anchor", "middle");
    textSecondEl.setAttribute("alignment-baseline", "middle");

    gSecondEl.append(textSecondEl);

    svgEl.append(gEl);
    svgEl.append(gSecondEl);

    divEl.append(svgEl);

    this.append(divEl);
  }

  render() {
    const svgEl = this.getElementsByTagName("svg")[0];

    const gEl = svgEl.getElementsByTagName("g")[1];
    const gSecondEl = svgEl.getElementsByTagName("g")[0];

    gSecondEl.style.display = "none";

    const type = this.getAttribute("type");
    let text = this.getAttribute("text");
    if (text) text = text.split(",");
    else text = [];
    let color = this.getAttribute("color");
    if (color) color = color.split(",");
    else color = [];

    const defsEl = svgEl.getElementsByTagName("defs")[0];

    const pathAnimateEl = defsEl.getElementsByTagName("path")[1];
    pathAnimateEl.setAttribute("id", type + "AnimatePath");

    const pathAnimateSecondEl = defsEl.getElementsByTagName("path")[2];
    pathAnimateSecondEl.setAttribute("id", type + "AnimatePathSecond");
    pathAnimateSecondEl.setAttribute("d", "M 0 0 L 0 0");

    const animateMotionEl = gEl.getElementsByTagName("animateMotion")[0];
    animateMotionEl.setAttribute("id", type);
    animateMotionEl.setAttribute("begin", this.getAttribute("begin"));

    const mpathEl = animateMotionEl.getElementsByTagName("mpath")[0];
    mpathEl.setAttributeNS(
      "http://www.w3.org/1999/xlink",
      "xlink:href",
      "#" + type + "AnimatePath"
    );

    const circleEl = gEl.getElementsByTagName("circle")[0];
    if (color.length > 0) circleEl.setAttribute("fill", color[0]);
    else circleEl.setAttribute("fill", "#ff0000");
    if (text.length == 0) circleEl.setAttribute("r", "8");
    else circleEl.setAttribute("r", "24");

    const textEl = gEl.getElementsByTagName("text")[0];
    if (text.length > 0) textEl.textContent = text[0];
    else textEl.textContent = "";

    const animateSecondMotionEl =
      gSecondEl.getElementsByTagName("animateMotion")[0];
    animateSecondMotionEl.setAttribute("begin", this.getAttribute("begin"));

    const mpathSecondEl =
      animateSecondMotionEl.getElementsByTagName("mpath")[0];
    mpathSecondEl.setAttributeNS(
      "http://www.w3.org/1999/xlink",
      "xlink:href",
      "#" + type + "AnimatePathSecond"
    );

    const circleSecondEl = gSecondEl.getElementsByTagName("circle")[0];
    if (color.length > 1) circleSecondEl.setAttribute("fill", color[1]);
    else circleSecondEl.setAttribute("fill", "#ff0000");
    circleSecondEl.setAttribute("r", "0");

    const textSecondEl = gSecondEl.getElementsByTagName("text")[0];
    if (text.length > 1) textSecondEl.textContent = text[1];
    else textSecondEl.textContent = "";

    let pathEl = svgEl.getElementsByTagName("path")[3];
    pathEl.setAttribute("marker-start", "");
    pathEl.setAttribute("stroke-dasharray", "");
    pathEl.setAttribute("class", "line");
    pathEl.style.display = "inline";

    let pathSecondEl = svgEl.getElementsByTagName("path")[4];
    pathSecondEl.setAttribute("class", "line");
    pathSecondEl.style.display = "none";

    switch (type) {
      case "midEndToStartStart":
        pathEl.setAttribute("d", midEndToStartStartPath);
        pathAnimateEl.setAttribute("d", midEndToStartStartPath);
        break;
      case "endStartToMidEnd":
        pathEl.setAttribute("d", endStartToMidEndPath);
        pathAnimateEl.setAttribute("d", endStartToMidEndPath);
        break;
      case "startMidToEndMid":
        pathEl.setAttribute("d", startMidToEndMidPath);
        pathAnimateEl.setAttribute("d", startMidToEndMidPath);
        break;
      case "midEndToStartStartDouble":
        pathEl.setAttribute("marker-start", "url(#arrow)");
        pathEl.setAttribute("d", midEndToStartStartDoublePath);
        pathAnimateEl.setAttribute("d", midEndToStartStartDoubleAnimationPath);
        break;
      case "startMidToEndMidDouble":
        pathEl.setAttribute("marker-start", "url(#arrow)");
        pathEl.setAttribute("d", startMidToEndMidDoublePath);
        pathAnimateEl.setAttribute("d", startMidToEndMidDoubleAnimationPath);
        break;
      case "startMidToEndMidTwoWayDataBind":
        circleEl.setAttribute("r", "0");
        pathEl.setAttribute("marker-start", "url(#arrow)");
        pathEl.setAttribute("stroke-dasharray", "2, 2");
        pathEl.classList.add("animated-line-alternate");
        pathEl.setAttribute("d", startMidToEndMidPath);
        break;
      case "startMidToEndMidDoubleStream":
        pathSecondEl.style.display = "inline";
        circleSecondEl.setAttribute("r", "24");
        pathEl.classList.add("line-blue");
        pathSecondEl.classList.add("line-blue");
        pathEl.setAttribute("stroke-dasharray", "2, 2");
        pathSecondEl.setAttribute("stroke-dasharray", "2, 2");
        pathEl.classList.add("animated-line-reverse");
        pathSecondEl.classList.add("animated-line-reverse");
        pathEl.setAttribute("d", startMidBottomToEndMidBottomPath);
        pathSecondEl.setAttribute("d", endMidTopToStartMidTopPath);
        pathAnimateEl.setAttribute("d", startMidBottomToEndMidBottomPath);
        pathAnimateSecondEl.setAttribute("d", endMidTopToStartMidTopPath);
        break;
      case "none":
        pathEl.style.display = "none";
        circleEl.setAttribute("r", "0");
        break;
    }
  }

  attributeChangedCallback() {
    this.render();
  }
}

customElements.define("connector-element", ConnectorElement);
