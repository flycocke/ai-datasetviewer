
declare namespace DatasetViewer_V1 {
    interface FabricCtx extends fabric.Canvas {
        isDragging: boolean;
        lastPosX: any;
        lastPosY: any
    }

    type DataItem = {
        type: string,
        label?: string,
        points?: Array<{x:number, y:number}>,
        stroke?: string,
        fill?: string,
        rectData?: Array<number>,
        drawPoint?:boolean
    }

    type OpreationsConfig = {
        zoom: boolean
    }

    interface DatasetViewerConfig {

        canvasInstance: HTMLCanvasElement;
        url: string;

        data: Array<DataItem>,
        isDraw?: boolean;
        opreationsConfig?: OpreationsConfig,
        // parrentNode: HTMLElement | null;
    }

    type FbIns = fabric.Canvas | fabric.StaticCanvas | null
}
