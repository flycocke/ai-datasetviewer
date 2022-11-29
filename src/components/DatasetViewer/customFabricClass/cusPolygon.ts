
import { fabric } from 'fabric'
import { isEmpty } from 'lodash';
export const CustomPolygon = fabric.util.createClass(fabric.Polygon, {

  type: 'CustomPolygon',

  initialize: function (element: any, options: any) {
    this.callSuper('initialize', element, options);
    options && this.set('label', options.label || '');
  },

  // 应该需要带上编辑信息？
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
    if (isEmpty(this.label)) {
      this.callSuper('_render', ctx);
      return
    }
    this.callSuper('_render', ctx);
    const w = -this.width / 2;
    const h = -this.height / 2
    ctx.font = `${20}px Microsoft YaHei`;

    const text = ctx.measureText(this.label).width;

    ctx.fillStyle = this.fill;
    // 这个坐标有问题的，这个是正确写法，多边形也要改的
    const matrix = ctx.getTransform()
    const zoomx = matrix?.a || 1
    const zoomy = matrix?.d || 1
    ctx.save();

    ctx.scale(1 / zoomx, 1 / zoomy);
    const rw = text
    const rh = 22
    ctx.fillRect(w * zoomx, h * zoomy - 23, rw, rh);

    // ctx.setTransform(1 / this.scaleX, 0, 0, 1 / this.scaleY, 0, 0)
    ctx.fillStyle = '#fff';
    ctx.fillText(this.label, w * zoomx, (h) * zoomy - 3);

    ctx.restore();
  }
});
