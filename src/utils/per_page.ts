import { mobileCheck } from "./detect_mobile";

let PER_PAGE:number;
if(mobileCheck()) {
	PER_PAGE = 4
} else {
	PER_PAGE = 8;
}

export default PER_PAGE;