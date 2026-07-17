import type { CSSProperties } from "react";

export type WorkFlowMode2={

id:string,
position:{x:number,y:number},
data:{
label:string,
type:string,
description:string
},
style?: CSSProperties;


}

export type WorkFlowMode={

id:string,
position:{x:number,y:number},
data:{label:string,type:string,description:string},
style?: CSSProperties;

}

export type nodeProps={

id:string;
source:string;
target:string

}




export type NodeConfigType = {

[key:string]:{

icon:React.ElementType,
bg:string,
color:string

}

}