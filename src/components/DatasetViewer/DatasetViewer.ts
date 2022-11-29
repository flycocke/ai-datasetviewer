
import { fabric } from 'fabric'
import { isEmpty } from 'lodash'
import { drawData, disableAnyFuck, setDropAndScale } from './utils'
/**
 * 奇怪的需求
 */

class DatasetViewer {
  config: DatasetViewer_V1.DatasetViewerConfig | null = null;
  fbIns: DatasetViewer_V1.FbIns = null;
  canvasInstance: HTMLCanvasElement|null = null;
  parentNode: HTMLElement|null;
  imgIns: HTMLImageElement|null = null;

  constructor (config: DatasetViewer_V1.DatasetViewerConfig) {
    const { canvasInstance } = config;

    if (!canvasInstance) {
      throw (new Error('canvasInstance 不存在'))
    }
    if (!canvasInstance.parentNode) {
      throw (new Error('parentNode 不存在'))
    }
    this.canvasInstance = canvasInstance;
    const parentNode = canvasInstance.parentNode as HTMLElement
    this.parentNode = parentNode;
    this.config = config;
  }

  resetConfig = (config: Pick<DatasetViewer_V1.DatasetViewerConfig, 'url' | 'data' | 'opreationsConfig' |'isDraw'>) => {
    if (this.config) {
      this.config = Object.assign(this.config, config)
    } else {
      throw (new Error('config is losed'))
    }
  }

  resize = () => {
    this.setMatrix()
  }

  setMatrix = () => {
    if (this.config === null) {
      throw new Error('config can not empty')
    }

    if (!this.parentNode) {
      throw new Error('canvas parentNode not fuond')
    }

    if (!this.imgIns) {
      throw new Error('img not fuond')
    }

    if (!this.fbIns) {
      throw new Error('img not fuond')
    }

    const width = this.imgIns.naturalWidth;

    const height = this.imgIns.naturalHeight;

    this.fbIns.setBackgroundImage(
      this.config.url,
      this.fbIns.renderAll.bind(this.fbIns),
      {
        width,
        height,
        // originX: 'center',
        // originY: 'top'
      }
    );

    // 设置画布宽高
    this.fbIns.setWidth((this.parentNode).offsetWidth).setHeight((this.parentNode).offsetHeight)
    // 设置矩阵适应画布大小,如果图片超级大
    const matrix = this.fbIns.viewportTransform

    if (matrix) {
      // 先直接 看看直接设定宽度为容器宽度
      matrix[0] = (this.parentNode).offsetWidth / width;
      matrix[3] = (this.parentNode).offsetWidth / width;
      // if ((canvasContainer.current).offsetWidth < (this).naturalWidth) {
      //   matrix[0] = (canvasContainer.current).offsetWidth / (this).naturalWidth;
      //   matrix[3] = (canvasContainer.current).offsetWidth / (this).naturalWidth;
      // }

      const tran = matrix[0]
      // 如果此时图高度比容器大，就继续转一手高度为最大，宽度忽略
      if (height * tran > (this.parentNode).offsetHeight) {
        matrix[0] = (this.parentNode).offsetHeight / (height * tran) * tran;
        matrix[3] = (this.parentNode).offsetHeight / (height * tran) * tran;
      }

      // if ((canvasContainer.current).offsetWidth > (this).naturalWidth) {
      //   matrix[0] = (canvasContainer.current).offsetWidth / (this).naturalWidth;
      //   matrix[3] = (canvasContainer.current).offsetWidth / (this).naturalWidth;
      // }

      // 缩放后剧中显示，估计大佬也要求这玩意
      const _tran = matrix[3]
      const _width = width * _tran;
      const _height = height * _tran;
      const tranX = ((this.parentNode).offsetWidth - _width) / 2
      const tranY = ((this.parentNode).offsetHeight - _height) / 2
      matrix[4] = tranX
      matrix[5] = tranY
      this.fbIns.viewportTransform = matrix

      const data = this.config.data
      // 然而实际上后端返回的啥我也暂时不清楚，有毒
      if (data && !isEmpty(data)) {
        for (const o of data) {
          drawData(this.fbIns, o)
        }
      }
      this.fbIns.renderAll();
    }
  }

  setFabricOpreations = () => {
    if (this.config?.opreationsConfig?.zoom) {
      console.log('this.config?.opreationsConfig?.zoom', this.config?.opreationsConfig?.zoom)
      // const myCtx = new Fb(fbctx)
      try {
        disableAnyFuck(this.fbIns as any)
        setDropAndScale(this.fbIns as any)
      } catch (e) {
        console.error(e)
      }
    }
  }

  init = (callback: Function) => {
    try {
      if (this.config === null) {
        throw new Error('config can not empty')
      }

      if (!this.parentNode) {
        throw new Error('canvas parentNode not fuond')
      }
      const image = new Image()
      // image.setAttribute('crossOrigin', 'anonymous');

      image.src = this.config.url;

      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const _this: DatasetViewer = this;

      if (this.fbIns) {
        this.fbIns.dispose();
        this.fbIns = null
      }
      if (this.config.opreationsConfig?.zoom && this.fbIns === null) {
        this.fbIns = new fabric.Canvas(this.canvasInstance, {
          preserveObjectStacking: true,
          controlsAboveOverlay: true,
          allowTouchScrolling: true
        })
      } else {
        this.fbIns = new fabric.StaticCanvas(this.canvasInstance)
      }
      image.onload = function () {
        const imgIns: HTMLImageElement = (this as any);
        _this.imgIns = imgIns;

        _this.setMatrix()
        _this.setFabricOpreations()
        callback?.call(this,imgIns)
      }
    } catch (e) {
      console.error(e)
    }
  }
}

export default DatasetViewer
