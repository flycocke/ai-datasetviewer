//{"status":true,"code":0,"message":"success","data":{"model_type":"classify","result":[["5",0,36,0,37,0.6]]}}
const example_json = {
  url: 'http://gddfile.diikoo.com/upload/demo/2022/11/brWOr490!666_1000.jpeg',
  model_type: 'classify',
  result: [
    ["5",0,36,0,37,0.6]
  ]
}

export const classify = () => {

  try {
    const { url, result } = example_json
    const data:any[] = []
    for (const o of result) {
      const [label, a, b, c, d,e] = o
      const w = 120
      const h = 80
      const x = 0
      const y = 0
      data.push({
        label,
        rectData: [x, y, w, h,a, b, c, d,e],
        type: 'CustomRectClassify'
      })
    }
    return {
      url, data
    }
  } catch (e) {

  }
}
