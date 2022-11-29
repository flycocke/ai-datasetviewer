
// 禁止一切操作
export const disableAnyFuck = (ctx: DatasetViewer_V1.FabricCtx) => {
  // ctx.skipTargetFind = true
  ctx.selection = false
}

const judgePcOrMove = () => {
  try {
    document.createEvent('TouchEvent'); return true;
  } catch (e) {
    return false;
  }
}
// 获取坐标之间的举例
const getDistance = function (start:any, stop:any) {
  return Math.hypot(stop.x - start.x, stop.y - start.y);
};
// 开启拖拽+缩放
export const setDropAndScale = (ctx: DatasetViewer_V1.FabricCtx) => {
  if (judgePcOrMove()) {
    // 移动端适配事件

    ctx.on('mouse:down', (opt: any) => {
      const changedTouches = opt.e.changedTouches;
      ctx.isDragging = true;
      ctx.selection = false;
      ctx.lastPosX = changedTouches[0].clientX;
      ctx.lastPosY = changedTouches[0].clientY;
    });

    ctx.on('mouse:up', () => {
      if (ctx.viewportTransform) {
        ctx.setViewportTransform(ctx.viewportTransform); // 得记录下来，画东西得转回来fuck
      }

      ctx.isDragging = false;
      ctx.selection = true;

      (ctx as any).firstTouch = null;
      (ctx as any).secondTouch = null
    });

    ctx.on('mouse:move', (opt: any) => {
      if (ctx.isDragging) {
        const changedTouches = opt.e.changedTouches

        if (changedTouches.length === 1) {
          // const e = opt.e;
          const vpt = ctx.viewportTransform;
          if (vpt) {
            vpt[4] += changedTouches[0].clientX - ctx.lastPosX;
            vpt[5] += changedTouches[0].clientY - ctx.lastPosY;
          }

          ctx.requestRenderAll();
          ctx.lastPosX = changedTouches[0].clientX;
          ctx.lastPosY = changedTouches[0].clientY;
        }

        if (changedTouches.length >= 2) {
          // 狗日的应该是缩放

          const [point1, point2] = changedTouches

          if (!(ctx as any).firstTouch && !(ctx as any).secondTouch) {
            (ctx as any).firstTouch = point1;
            (ctx as any).secondTouch = point2
          } else {
            // 双指缩放比例计算
            const zoom = getDistance({
              x: point1.clientX,
              y: point1.clientY
            }, {
              x: point2.clientX,
              y: point2.clientY
            })

            const firstTouch = (ctx as any).firstTouch
            const secondTouch = (ctx as any).secondTouch

            const zoom1 = getDistance({
              x: firstTouch.clientX,
              y: firstTouch.clientY
            }, {
              x: secondTouch.clientX,
              y: secondTouch.clientY
            })
            let _zoom = zoom / zoom1

            if (_zoom > 10) {
              _zoom = 10
            }

            if (_zoom < 0.1) {
              _zoom = 0.1
            }
            _zoom *= 0.399

            ctx.zoomToPoint({ x: (ctx.width as number) / 2, y: (ctx.height as number) / 2 }, _zoom)
            opt.e.preventDefault();
            opt.e.stopPropagation();
          }
        }
      }
    });
  } else {
    ctx.on('mouse:wheel', (opt: any) => {
      console.log(11)
      const delta = opt.e.deltaY;
      let zoom = ctx.getZoom();
      // console.warn(0.999 ** delta, 'zoomzoom')
      zoom *= 0.999 ** delta;
      if (zoom > 20) zoom = 20;
      if (zoom < 0.1) zoom = 0.1;
      // ctx.setZoom(zoom);
      ctx.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom)
      opt.e.preventDefault();
      opt.e.stopPropagation();
    })

    ctx.on('mouse:down', (opt: any) => {
      const evt = opt.e;
      // if (evt.altKey === true) {

      // }
      ctx.isDragging = true;
      ctx.selection = false;
      ctx.lastPosX = evt.clientX;
      ctx.lastPosY = evt.clientY;
    });

    ctx.on('mouse:move', (opt: any) => {
      if (ctx.isDragging) {
        const e = opt.e;
        const vpt = ctx.viewportTransform;
        if (vpt) {
          vpt[4] += e.clientX - ctx.lastPosX;
          vpt[5] += e.clientY - ctx.lastPosY;
        }

        ctx.requestRenderAll();
        ctx.lastPosX = e.clientX;
        ctx.lastPosY = e.clientY;
      }
    });

    ctx.on('mouse:up', () => {
      if (ctx.viewportTransform) {
        ctx.setViewportTransform(ctx.viewportTransform); // 得记录下来，画东西得转回来fuck
      }

      ctx.isDragging = false;
      ctx.selection = true;
    });
  }
}
