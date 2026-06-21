export type WorkFlowMode2={

id:string,
position:{x:number,y:number},
data:{
label:string,
icon:any,
bg:string,
color:string
}


}

export type WorkFlowMode={

id:string,
position:{x:number,y:number},
data:{label:string}

}

export type nodeProps={

id:string;
source:string;
target:string

}