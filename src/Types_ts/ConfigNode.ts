import { MdEmail } from "react-icons/md";
import { LuClock3 } from "react-icons/lu";
import { GoGitBranch } from "react-icons/go";
import type { NodeConfigType } from "./node";

export const ConfigNode:NodeConfigType={

Email:{

icon:MdEmail,
bg: "bg-purple-100",
color: "text-purple-600",

},

Delay:{

icon: LuClock3,
bg: "bg-orange-100",
color: "text-orange-600",

},

"Condition":{

icon: GoGitBranch,
bg: "bg-green-100",
color: "text-green-600",

}


}