
import { fabric } from 'fabric'
// import { isEmpty } from 'ramda';
// (fabric as any).Rect.prototype.controls.deleteControl = new (fabric as any).Control({
//   x: 0.5,
//   y: -0.5,
//   offsetY: 16,
//   cursorStyle: 'pointer',
//   mouseUpHandler: () => {
//     console.log(1)
//   },
//   visible: true,
//   render: function (ctx:any, left:any, top:any, styleOverride:any, fabricObject:any) {
//     const size = (this as any).cornerSize;
//     ctx.save();
//     ctx.translate(left, top);
//     const text = ctx.measureText(this.label).width;
//     ctx.fillStyle = this.fill;
//     ctx.fillRect(-size / 2, -size / 2, text, 22);

//     ctx.fillStyle = '#fff';
//     ctx.font = `${20 / (this.scaleY * this.scaleY)} Microsoft YaHei`;

//     // eslint-disable-next-line no-sparse-arrays
//     ctx.fillText(this.label, -size / 2, -size / 2);

//     ctx.restore();
//   },
//   cornerSize: 24
// });

export const CustomTextBox = fabric.util.createClass(fabric.Rect, {

  type: 'CustomTextBox',

  initialize: function (element: any, options: any) {
    this.callSuper('initialize', element, options);
    options && this.set('label', options.label || '');
  },

  toObject: function () {
    return fabric.util.object.extend(this.callSuper('toObject'), {
      label: this.get('label'),
      hasControls: this.get('hasControls'),
      hasBorders: this.get('hasBorders'),
      selectable: this.get('selectable'),
      transparentCorners: this.get('transparentCorners'),
      objectCaching: this.get('objectCaching'),
    });
  },

  _render: function (ctx: any) {
    this.callSuper('_render', ctx);
    const w = - (this.width) / 2;
    const h = this.height / 2;
    let fontSize = this.height * 0.7;
    
    // 这个坐标有问题的，这个是正确写法，多边形也要改的
    const matrix = ctx.getTransform()
    const zoomx = matrix?.a || 1
    const zoomy = matrix?.d || 1
   

    ctx.scale(1 / zoomx, 1 / zoomy);
    fontSize = fontSize*zoomx
    ctx.font = `${fontSize}px Microsoft YaHei`;
    const text = ctx.measureText(this.label).width;
    ctx.fillStyle = this.fill;

    ctx.save();
    
    const rw = text
    const rh = fontSize
    //ctx.fillRect(w * zoomx, h * zoomy, rw, rh);
    // ctx.setTransform(1 / this.scaleX, 0, 0, 1 / this.scaleY, 0, 0)
    ctx.fillStyle = '#000';
    ctx.fillText(this.label, w * zoomx + fontSize/1.2, h * zoomy - fontSize/3);
    ctx.font = `${fontSize*zoomx}px Microsoft YaHei`;
    ctx.restore();
  }
});
