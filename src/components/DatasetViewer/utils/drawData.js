import { fabric } from "fabric";
import { CustomPolygon } from "../customFabricClass/cusPolygon";
import { CustomRect } from "../customFabricClass/cusRect";
import { CustomTextBox } from "../customFabricClass/cusTextBox";
import randomColor from "randomcolor"; // import the script

// 初始化自定义多边形，后续反序列化的关键
fabric.CustomPolygon = CustomPolygon;
fabric.CustomPolygon.fromObject = function (object, callback) {
  callback(new fabric.CustomPolygon(object.points, object));
};

fabric.CustomRect = CustomRect;
fabric.CustomRect.fromObject = function (object, callback) {
  callback(new fabric.CustomRect(object));
};

fabric.CustomTextBox = CustomTextBox;
fabric.CustomTextBox.fromObject = function (object, callback) {
  callback(new fabric.CustomTextBox(object));
};

const defaultRect = {
  strokeWidth: 1,
  objectCaching: false,
  selectable: false,
  transparentCorners: false,
  hasControls: true,
  hasBorders: false,
  lockScalingX: true,
  lockScalingY: true,
  lockMovementX: true,
  lockScalingFlip: true,
  lockMovementY: true,
  lockRotation: true,
  strokeUniform: true,
  noScaleCache: false,
};

export const drawData = (ctx, data) => {
  const { type, label, points, rectData, stroke, fill } = data;
  let [_stroke, _fill] = [null, null];
  if (!stroke) {
    // label不一定存在
    const defualt_stroke = randomColor({
      seed: label || type,
      format: "rgba",
      luminosity: "bright",
      alpha: 1,
    });

    const fillColorList = defualt_stroke.split(",");
    fillColorList.pop();
    fillColorList.push("0.2)");
    const default_fill = fillColorList.join();

    _stroke = defualt_stroke;
    _fill = default_fill;
  } else {
    _stroke = stroke;
    _fill = fill;
  }

  if (type === undefined) {
    console.error("data.type 不存在");
  }
  // 自定义矩形
  if (type === "CustomRect") {
    const [left, top, width, height] = rectData;
    const rect = new CustomRect({
      left,
      top,
      width,
      height,
      fill: _fill,
      stroke: _stroke,
      label,
      ...defaultRect,

      cornerStyle: "circle",
    });
    rect.setControlsVisibility({
      tl: false, // top-left
      mt: false, // middle-top
      tr: false, // top-right
      ml: false, // middle-left
      mr: false, // middle-right
      bl: false, // bottom-left
      mb: false, // middle-bottom
      br: false, // bottom-right
      mtr: false,
    });
    // 初始化rect
    ctx.add(rect);
  }
  // 绘固定的图在左上角
  if (type === "CustomRectClassify") {
    const [left, top, width, height] = rectData;
    const rect = new CustomTextBox({
      left,
      top,
      width,
      height,
      fill: _fill,
      stroke: _stroke,
      label,
      ...defaultRect,

      cornerStyle: "circle",
    });
    rect.setControlsVisibility({
      tl: false, // top-left
      mt: false, // middle-top
      tr: false, // top-right
      ml: false, // middle-left
      mr: false, // middle-right
      bl: false, // bottom-left
      mb: false, // middle-bottom
      br: false, // bottom-right
      mtr: false,
    });
    // 初始化rect
    ctx.add(rect);
  }

  // 目前多边形和这折线还没有用的上，搞不好以后也用不上
  if (type === "polyline") {
    const line = new fabric.Polyline(points, {
      stroke: _stroke,
      strokeWidth: 1,
      // perPixelTargetFind: true,
      // transparentCorners: true,
      opacity: 1,
      // hasBorders: false,
      hasControls: false,
      hasBorders: false,
      // fill: 'transparent',
      selectable: false,

      objectCaching: false,
      transparentCorners: false,
    });
    ctx.add(line);
  }

  if (type === "CustomPolygon") {
    const polylgon = new CustomPolygon(points, {
      stroke: _stroke,
      strokeWidth: 1,
      // perPixelTargetFind: true,
      // transparentCorners: true,
      opacity: 1,
      // hasBorders: false,
      hasControls: true,
      hasBorders: false,
      // fill: 'transparent',
      selectable: false,
      fill: _fill,
      objectCaching: false,
      transparentCorners: false,
      // padding: 25,
      // hasFill: 'red',
      label,
    });

    ctx.add(polylgon);
  }
};
