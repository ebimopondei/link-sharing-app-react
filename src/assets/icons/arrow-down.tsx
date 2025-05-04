import { ReactNode } from "react";
import { SVGIcons } from "../../types/icons";

const ArrowDownIcon = ({ width=24, fill='none'} : SVGIcons):ReactNode => {
    const svgMarkup = `
    <svg xmlns="http://www.w3.org/2000/svg" width=${width} height=${width} fill=${fill} viewBox="0 0 14 9"><path stroke="#633CFF" stroke-width="2" d="m1 1 6 6 6-6"/></svg>
    `;
  
    return (
      <div dangerouslySetInnerHTML={{ __html: svgMarkup }} />
    );
  };
  
  export default ArrowDownIcon;
  