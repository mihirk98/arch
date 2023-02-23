const blocksEl = document.getElementById("blocks");

const modelBlockEl = document.createElement("block-element");
modelBlockEl.setAttribute("color", "#F47174");
modelBlockEl.setAttribute("title", "model");
modelBlockEl.style.gridArea = "1 / 2";

const logicBlockEl = document.createElement("block-element");
logicBlockEl.setAttribute("color", "#71B6F4");
logicBlockEl.setAttribute("title", "logic");
logicBlockEl.style.gridArea = "3 / 3";

const viewBlockEl = document.createElement("block-element");
viewBlockEl.setAttribute("color", "#71F4B0");
viewBlockEl.setAttribute("title", "view");
viewBlockEl.style.gridArea = "3 / 1";

const logicToModelConnectorEl = document.createElement("connector-element");
logicToModelConnectorEl.style.gridArea = "2 / 3";

const modelToViewConnectorEl = document.createElement("connector-element");
modelToViewConnectorEl.style.gridArea = "2 / 1";

const viewToLogicConnectorEl = document.createElement("connector-element");
viewToLogicConnectorEl.style.gridArea = "3 / 2";

blocksEl.append(modelBlockEl);
blocksEl.append(viewBlockEl);
blocksEl.append(logicBlockEl);

blocksEl.append(logicToModelConnectorEl);
blocksEl.append(modelToViewConnectorEl);
blocksEl.append(viewToLogicConnectorEl);

mvc();

function render() {
  logicToModelConnectorEl.setAttribute("begin", "0s");
  modelToViewConnectorEl.setAttribute("begin", "");
  viewToLogicConnectorEl.setAttribute("begin", "");
  logicToModelConnectorEl.setAttribute(
    "render",
    logicToModelConnectorEl.hasAttribute("render")
      ? !logicToModelConnectorEl.getAttribute("render")
      : true
  );
  modelToViewConnectorEl.setAttribute(
    "render",
    modelToViewConnectorEl.hasAttribute("render")
      ? !modelToViewConnectorEl.getAttribute("render")
      : true
  );
  viewToLogicConnectorEl.setAttribute(
    "render",
    viewToLogicConnectorEl.hasAttribute("render")
      ? !viewToLogicConnectorEl.getAttribute("render")
      : true
  );
}

// Initialise Page

function mvc() {
  logicBlockEl.setAttribute("text", "<u>controller</u>");
  logicToModelConnectorEl.setAttribute("type", "midEndToStartStart");
  modelToViewConnectorEl.setAttribute("type", "endStartToMidEnd");
  viewToLogicConnectorEl.setAttribute("type", "startMidToEndMid");
  logicToModelConnectorEl.setAttribute("cue", "endStartToMidEnd");
  modelToViewConnectorEl.setAttribute("cue", "startMidToEndMid");
  viewToLogicConnectorEl.setAttribute("cue", "midEndToStartStart");
  render();
}

function mvp() {
  logicBlockEl.setAttribute("text", "<u>presenter</u>");
  logicToModelConnectorEl.setAttribute("type", "midEndToStartStartDouble");
  modelToViewConnectorEl.setAttribute("type", "none");
  viewToLogicConnectorEl.setAttribute("type", "startMidToEndMidDouble");
  logicToModelConnectorEl.setAttribute("cue", "startMidToEndMidDouble");
  modelToViewConnectorEl.setAttribute("cue", "startMidToEndMidDouble");
  viewToLogicConnectorEl.setAttribute("cue", "midEndToStartStartDouble");
  render();
}

function mvvm() {
  logicBlockEl.setAttribute("text", "<u>viewModel</u>");
  logicToModelConnectorEl.setAttribute("type", "midEndToStartStartDouble");
  modelToViewConnectorEl.setAttribute("type", "none");
  viewToLogicConnectorEl.setAttribute("type", "startMidToEndMidTwoWayDataBind");
  logicToModelConnectorEl.setAttribute("cue", "midEndToStartStartDouble");
  modelToViewConnectorEl.setAttribute("cue", "midEndToStartStartDouble");
  viewToLogicConnectorEl.setAttribute("cue", "midEndToStartStartDouble");
  render();
}

// Set Generic Archs

const selectMVCEl = document.getElementById("mvc");
const selectMVPEl = document.getElementById("mvp");
const selectMVVMEl = document.getElementById("mvvm");

function select() {
  setGeneric();
  selectMVCEl.selectedIndex = 0;
  selectMVPEl.selectedIndex = 0;
  selectMVVMEl.selectedIndex = 0;
  let option = document.getElementById("select").value;
  switch (option) {
    case "mvc":
      selectMVCEl.style.display = "block";
      selectMVPEl.style.display = "none";
      selectMVVMEl.style.display = "none";
      mvc();
      break;
    case "mvp":
      selectMVCEl.style.display = "none";
      selectMVPEl.style.display = "block";
      selectMVVMEl.style.display = "none";
      mvp();
      break;
    case "mvvm":
      selectMVCEl.style.display = "none";
      selectMVPEl.style.display = "none";
      selectMVVMEl.style.display = "block";
      mvvm();
      break;
  }
}

function setGeneric() {
  logicBlockEl.setAttribute("text", "");
  modelBlockEl.setAttribute("text", "");
  viewBlockEl.setAttribute("text", "");
  logicToModelConnectorEl.setAttribute("text", "");
  modelToViewConnectorEl.setAttribute("text", "");
  viewToLogicConnectorEl.setAttribute("text", "");
  logicToModelConnectorEl.setAttribute("color", "");
  modelToViewConnectorEl.setAttribute("color", "");
  viewToLogicConnectorEl.setAttribute("color", "");
}

// Generic Select

function mvcSelect() {
  let option = document.getElementById("mvc").value;
  switch (option) {
    case "generic":
      setGeneric();
      mvc();
      break;
    case "redux":
      mvcRedux();
      break;
  }
}

function mvcRedux() {
  modelBlockEl.setAttribute("text", "store<br>reducer");
  logicToModelConnectorEl.setAttribute("text", "action");
  viewToLogicConnectorEl.setAttribute("text", "event");
  modelToViewConnectorEl.setAttribute("text", "state");
  logicToModelConnectorEl.setAttribute("color", "#71B6F4");
  viewToLogicConnectorEl.setAttribute("color", "#71F4B0");
  modelToViewConnectorEl.setAttribute("color", "#F47174");
  render();
}

// MVC Select

function mvpSelect() {}

// MVP Select

function mvvmSelect() {
  let option = document.getElementById("mvvm").value;
  switch (option) {
    case "generic":
      setGeneric();
      mvvm();
      break;
    case "bloc":
      mvvmBloc();
      break;
  }
}

function mvvmBloc() {
  logicBlockEl.setAttribute("text", "<u>viewModel</u><br>bloc");
  viewToLogicConnectorEl.setAttribute("type", "startMidToEndMidDoubleStream");
  viewToLogicConnectorEl.setAttribute("text", "event,state");
  viewToLogicConnectorEl.setAttribute("color", "#71F4B0,#71B6F4");
  logicToModelConnectorEl.setAttribute("cue", "startMidToEndMidDoubleStream");
  modelToViewConnectorEl.setAttribute("cue", "startMidToEndMidDoubleStream");
  viewToLogicConnectorEl.setAttribute("cue", "midEndToStartStartDouble");
  render();
}

// MVVM Select
