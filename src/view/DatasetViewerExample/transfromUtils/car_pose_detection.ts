import randomcolor from 'randomcolor'

const example_json = {
  url: 'https://s3.local.cdn.desauto.net/storage-ic5rlt/2022/08/12/0b02942268a110d26342047c9b8a6b70260c2411.png',
  model_type: 'car_pose_detection',
  result: [
    [
      591.5080261230469,
      374.7766342163086,
      943.9295654296875,
      557.5894775390625,
      0.8957778005713379,
      0,
      958.0030517578125,
      400.5970458984375,
      801.1041870117188,
      384.2738342285156,
      784.2406311035156,
      563.3496551513672,
      940.5552062988281,
      571.6593475341797,
      726.2838592529297,
      378.11226654052734,
      593.6526031494141,
      363.73265075683594,
      579.2779541015625,
      503.16156005859375,
      712.068420410162,
      512.8574523925781,
      0.9298104047775269,
      0.9586799740791321,
      0.950249433517456,
      0.924545168876648,
      0.9664979577064514,
      0.9380337595939636,
      0.9484283924102783,
      0.9711739420890808
    ],
    [
      1219.6024475097656,
      619.6165008544922,
      1767.188232421875,
      888.6292419433594,
      0.8875222088754384,
      0,
      1814.933898927812,
      671.6404724121094,
      1623.2867431640625,
      654.7665710449219,
      1595.329658789062,
      908.205139161562,
      1790.9496459960938,
      886.5240783691406,
      1383.0205993652344,
      613.7099761962891,
      1199.884094238812,
      594.9764099121094,
      1179.3788452148438,
      773.454162597652,
      1363.341796875,
      770.6964111328125,
      0.8560987710952759,
      0.9117252230644226,
      0.8242859244346619,
      0.7938621044158936,
      0.9583591818809509,
      0.9169778823852539,
      0.9037706255912781,
      0.954139769077301
    ],
    [
      377.3785400390625,
      293.5751953125,
      659.7100524902344,
      451.3457794189453,
      0.8607743145854272,
      0,
      578.6791076660156,
      310.4696502685547,
      520.9647674560547,
      307.4583435058594,
      514.2247924804688,
      439.67152404785156,
      572.349426265312,
      440.80169677734375,
      487.98321533203125,
      306.6181640625,
      465.70033264160156,
      302.69799041748047,
      460.54742431640625,
      423.3067932128906,
      482.7176971435547,
      425.30987548828125,
      0.9497985243797302,
      0.9678801894187927,
      0.9641039967536926,
      0.948440670967102,
      0.9731719493865967,
      0.9539209008216858,
      0.9552093148231506,
      0.9725783467292786
    ],
    [
      851.7044677734375,
      410.1364288330078,
      1329.01318359375,
      707.4127349853516,
      0.7739443455980677,
      0,
      854.4163513183594,
      414.1273956298828,
      1041.897033694062,
      437.97752380371094,
      1019.0468444824219,
      613.9985046386719,
      829.8780212402344,
      605.6981506347656,
      1134.7696838378906,
      425.2020263671875,
      1373.4583740234375,
      458.3762969970703,
      1341.3826904296875,
      710.947998046875,
      1099.396545411562,
      712.6853942871094,
      0.8694676160812378,
      0.9355505108833313,
      0.9430341124534607,
      0.8906964063644409,
      0.9376033544540405,
      0.892017662525177,
      0.8588220477104187,
      0.8683873414993286
    ],
    [
      2.2004384994506836,
      139.5980987548828,
      66.40334701538086,
      227.18305206298828,
      0.7513685804194026,
      0,
      70.29005813598633,
      157.58697509765625,
      4.885372638702393,
      153.71019744873047,
      6.667573928833008,
      223.44600677490234,
      65.771484375,
      226.70752716064453,
      69.46585464477539,
      158.36875534057617,
      1.3564739227294922,
      155.06602478027344,
      -2.092766761779785,
      212.1859359741211,
      69.01961517333984,
      215.24791717529297,
      0.6685574650764465,
      0.6341935396194458,
      0.5378209948539734,
      0.5808441042900085,
      0.6084604263305664,
      0.6082280278205872,
      0.5345174670219421,
      0.5405340194702148
    ],
    [
      101.98125457763672,
      179.92537307739258,
      207.89092254638672,
      229.29961395263672,
      0.40714948415733687,
      0,
      205.29103088378906,
      189.24126434326172,
      155.32280731201172,
      187.55390167236328,
      153.72740936279297,
      225.37474822998047,
      203.63987731933594,
      226.3655548095703,
      154.2814178466797,
      185.6587371826172,
      176.7140350341797,
      184.0151252746582,
      175.3355484008789,
      219.26763153076172,
      152.78406143188477,
      220.6244201661562,
      0.9778668284416199,
      0.9801099300384521,
      0.9740214943885803,
      0.9711631536483765,
      0.9786379933357239,
      0.9765146970748901,
      0.9701720476150513,
      0.9727799296379089
    ]
  ]

}

const transformColor = (color: string, alpha: number) => {
  return color.trim().replace(/\s{0,}\d{0,}\.{0,}\d{0,}\)$/, alpha + ')')
}

export const car_pose_detection = () => {
  const { url, result } = example_json

  // 这个可以是多边形来做也可以线条，不过多边形比较好理解一些
  // 算法文档显示是顺时针的方式，总共8个点，但是6个面

  const color = randomcolor({
    seed: url,
    format: 'rgba',
    luminosity: 'bright',
    alpha: 1
  })
  const data: any[] = [];

  for (const o of result) {
    const points_coordinate = o.slice(6, 22)
    console.log()

    const [
      front_top_left_x,
      front_top_left_y,

      front_top_right_x,
      front_top_right_y,

      front_bottom_right_x,
      front_bottom_right_y,

      front_bottom_left_x,
      front_bottom_left_y,

      back_top_left_x,
      back_top_left_y,

      back_top_right_x,
      back_top_right_y,

      back_bottom_right_x,
      back_bottom_right_y,

      back_bottom_left_x,
      back_bottom_left_y

    ] = points_coordinate

    // 组合一下面的坐标
    const surfaces = [
      // 前面的面
      [
        {
          x: front_top_left_x,
          y: front_top_left_y
        },
        {
          x: front_top_right_x,
          y: front_top_right_y
        },
        {
          x: front_bottom_right_x,
          y: front_bottom_right_y
        },
        {
          x: front_bottom_left_x,
          y: front_bottom_left_y
        },

      ],
      // 右边
      [
        {
          x: front_top_right_x,
          y: front_top_right_y
        },
        {
          x: back_top_right_x,
          y: back_top_right_y
        },
        {
          x: back_bottom_right_x,
          y: back_bottom_right_y
        },
        {
          x: front_bottom_right_x,
          y: front_bottom_right_y
        },
      ],

      // 后边
      [
        {
          x: back_top_left_x,
          y: back_top_left_y
        },
        {
          x: back_top_right_x,
          y: back_top_right_y
        },
        {
          x: back_bottom_right_x,
          y: back_bottom_right_y
        },
        {
          x: back_bottom_left_x,
          y: back_bottom_left_y
        },
      ],

      // 左边
      [
        {
          x: back_top_left_x,
          y: back_top_left_y
        },
        {
          x: front_top_left_x,
          y: front_top_left_y
        },
        {
          x: front_bottom_left_x,
          y: front_bottom_left_y
        },
        {
          x: back_bottom_left_x,
          y: back_bottom_left_y
        },
      ],
      // 顶
      [
        {
          x: back_top_left_x,
          y: back_top_left_y
        },
        {
          x: back_top_right_x,
          y: back_top_right_y
        },
        {
          x: front_top_right_x,
          y: front_top_right_y
        },
        {
          x: front_top_left_x,
          y: front_top_left_y
        },
      ],
      // 底面
      [
        {
          x: back_bottom_left_x,
          y: back_bottom_left_y
        },
        {
          x: back_bottom_right_x,
          y: back_bottom_right_y
        },
        {
          x: front_bottom_right_x,
          y: front_bottom_right_y
        },
        {
          x: front_bottom_left_x,
          y: front_bottom_left_y
        },
      ],
    ]

    for (let i = 0; i < surfaces.length; i++) {
      const rData: any = {
        fill: transformColor(color, 0.15), // 迷一样
        stroke: color,
        // x y w h
        points: surfaces[i],
        // labelText: label + (persent === undefined ? '' : '-' + persent)
        // label: '',
        type: 'CustomPolygon'
      }

      data.push(rData)
    }
  }

  return {
    url, data
  }
}
