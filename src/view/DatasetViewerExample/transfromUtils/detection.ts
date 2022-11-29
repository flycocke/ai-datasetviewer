const example_json = {
  url: 'http://gddfile.diikoo.com/upload/demo/2022/11/l7KnZ941!1080_719.jpg',
  model_type: 'detection',
  result: [
    ["face_mask",500,114,708,409,0.84]
  ]

}

export const detection = () => {
  try {
    const { url, result } = example_json

    const data:any[] = []
    for (const o of result) {
      const [label, x, y, x1, y1] = o
      const w = (x1 as number) - (x as number)
      const h = (y1 as number) - (y as number)
      data.push({
        label,
        rectData: [x, y, w, h],
        type: 'CustomRect'
      })
    }
    return {
      url, data
    }
  } catch (e) {

  }
}
