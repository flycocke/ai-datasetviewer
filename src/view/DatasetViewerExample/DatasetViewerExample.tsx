import DatasetViewer from '@src/components/DatasetViewer'
import { useEffect, useRef } from 'react'
import { pose_detection, detection, car_pose_detection, segment, classify } from './transfromUtils'

import './DatasetViewerExample.less'

const DatasetViewerExample = () => {
  const canvas = useRef<HTMLCanvasElement|null>(null)

  const viewer = useRef<DatasetViewer|null>(null)

  useEffect(() => {
    if (canvas.current) {
      // 需要拿到父容器信息，因为待会需要设置矩阵来自适应图片大小
      const { url, data }: any = detection()
      viewer.current = new DatasetViewer({
        canvasInstance: canvas.current,
        url,
        data,
        opreationsConfig: {
          zoom: true
        }
      })

      viewer.current.init(function(){
        console.log("完毕")
      })
    }

    window.addEventListener('resize', () => {
      // 防抖
      viewer.current?.init(function(){
        console.log("完毕")
      })
    })
  }, [])

  const handleTestDetection = () => {
    const { url, data }: any = detection()
    viewer.current?.resetConfig({
      url,
      data,
      opreationsConfig: {
        zoom: true
      }
    })
    viewer.current?.init(function(){
      console.log("完毕")
    })
  }

  const handleTestPose = () => {
    const { url, data } :any = pose_detection()
    viewer.current?.resetConfig({
      url,
      data: data || [],
      opreationsConfig: {
        zoom: true
      }
    })
    viewer.current?.init(function(){
      console.log("完毕")
    })
  }

  const handleTest_car_pose_detection = () => {
    const { url, data }: any = car_pose_detection()
    console.log(data)
    viewer.current?.resetConfig({
      url,
      data: data || [],
      opreationsConfig: {
        zoom: true
      }
    })
    viewer.current?.init(function(){
      console.log("完毕")
    })
  }

  const handleTestSegment = async () => {
    const { url, data }: any = await segment()

    viewer.current?.resetConfig({
      url,
      data: data || [],
      opreationsConfig: {
        zoom: true
      }
    })
    viewer.current?.init(function(){
      console.log("完毕")
    })
  }

  const handleTestClassify = () => {
    const { url, data }: any = classify()
    viewer.current?.resetConfig({
      url,
      data: data,
      opreationsConfig: {
        zoom: true
      }
    })
    viewer.current?.init(function(){
      console.log("完毕")
    })
  }

  return (
    <div className='shadow-lg m-2 DatasetViewerExample'>
      <div className='w-200 flex justify-center items-center flex-col'>
        <div className='btn_item mb-10 p-5' onClick={handleTestDetection}>目标检测</div>
        <div className='btn_item mb-10 p-5' onClick={handleTestClassify}>分类（这个绝对定位个标签就行了，没必要画）</div>
        <div className='btn_item mb-10 p-5' onClick={handleTest_car_pose_detection}>car_pose_detection</div>
        <div className='btn_item mb-10 p-5' onClick={handleTestSegment}>通用分割</div>
        <div className='btn_item mb-10 p-5' onClick={handleTestPose}>姿态检测</div>
      </div>

      <div className='canvas_wrap'>
        <canvas ref={canvas} className='canvas' />
      </div>

    </div>
  )
}

export default DatasetViewerExample
