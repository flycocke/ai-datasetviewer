import randomColor from 'randomcolor'

const example_json = {
  url: 'https://s3.local.cdn.desauto.net/storage-ic5rlt/2022/05/24/547c731b46c55ce5c0b31f1d2651f0697cb51461.jpg',
  model_type: 'cityscapes_segment',
  result: 'data:image/png;base64,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'

}

// const mixin = () => {
//   console.log('')
// }

export const segment = async () => {
  console.log('segment')
  const { url, result } = example_json

  const color_map:{
    [index:number]:number[]
  } = {

  }

  const raw_img = new Image();

  raw_img.crossOrigin = 'anonymous';

  const result_img = new Image();

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d', { willReadFrequently: true });

  raw_img.src = url;

  // 原始数据的像素矩阵
  const raw_matrix: Uint8ClampedArray | undefined = await new Promise(function (resolve, reject) {
    try {
      raw_img.onload = function () {
        canvas.width = raw_img.naturalWidth
        canvas.height = raw_img.naturalHeight
        const imgIns: HTMLImageElement = (this as any);
        ctx?.clearRect(0, 0, raw_img.naturalWidth, raw_img.naturalHeight)
        ctx?.drawImage(raw_img, 0, 0, imgIns.naturalWidth, imgIns.naturalHeight);
        const imageData = ctx?.getImageData(0, 0, imgIns.naturalWidth, imgIns.naturalHeight);
        console.log(imageData)
        resolve(imageData?.data)
      }
    } catch (e) {
      reject(e)
    }
  })

  result_img.src = result;
  // 结果数据的像素矩阵 Uint8ClampedArray
  const res_matrix: Uint8ClampedArray | undefined = await new Promise(function (resolve, reject) {
    try {
      result_img.onload = function () {
        const imgIns: HTMLImageElement = (this as any);
        ctx?.clearRect(0, 0, result_img.naturalWidth, result_img.naturalHeight)
        ctx?.drawImage(result_img, 0, 0, imgIns.naturalWidth, imgIns.naturalHeight);

        const imageData = ctx?.getImageData(0, 0, imgIns.naturalWidth, imgIns.naturalHeight);

        // const data = imageData?.data;
        resolve(imageData?.data)
      }
    } catch (e) {
      console.error(e)
      reject(e)
    }
  })

  // 如果存在就开始对比
  if (raw_matrix && res_matrix) {
    for (let i = 0; i < res_matrix.length; i += 4) {
      const start = res_matrix[i]
      if (start !== 0) {
        let color = [0, 0, 0]
        if (color_map[start]) {
          color = color_map[start]
        } else {
          // 傻缺库，返回的是数组
          color = randomColor({
            seed: start,
            format: 'rgbArray',
            luminosity: 'bright',
            alpha: 1
          }) as any
          color_map[start] = color
        }
        raw_matrix[i] = raw_matrix[i] + color[0] / 2
        raw_matrix[i + 1] = raw_matrix[i + 1] + color[1] / 2
        raw_matrix[i + 2] = raw_matrix[i + 1] + color[2] / 2
      }
    }
    ctx?.clearRect(0, 0, raw_img.naturalWidth, raw_img.naturalHeight)

    const new_imageData = new ImageData(raw_matrix, raw_img.naturalWidth, raw_img.naturalHeight, { colorSpace: 'srgb' })

    ctx?.putImageData(new_imageData, 0, 0);

    return {
      url: canvas.toDataURL('image/jpg', 1), data: []
    }
  }

  return {
    url, data: []
  }
}
