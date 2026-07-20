import { MdEmail } from "react-icons/md";
import { LuClock3 } from "react-icons/lu";
import { GoGitBranch } from "react-icons/go";
import { MdSms } from "react-icons/md";
import {
  
  MdOutlineSms,
  MdStorage,
  MdSecurity,
} from "react-icons/md";

import {
  LuFileText,
  LuDatabase,
} from "react-icons/lu";


import {
  FaBell,
  FaGlobe,
} from "react-icons/fa6";

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

},

"SMS":{

icon: MdSms,
bg: "bg-purple-100",
color: "text-purple-600",

},

Storage:{

icon:MdStorage,
bg: "bg-green-100",
color: "text-green-600",

},

"Security":{

icon: MdSecurity,
bg: "bg-yellow-100",
color: "text-yellow-600",

},

"Clock":{

icon: LuClock3,
bg: "bg-blue-100",
color: "text-blue-600",

},

File:{

icon: LuFileText,
bg: "bg-orange-100",
color: "text-orange-600",

},

"Database":{

icon: LuDatabase,
bg: "bg-yellow-100",
color: "text-yellow-600",

},

"Bell":{

icon: FaBell,
bg: "bg-orange-100",
color: "text-orange-600",

}


}