import { ReactNode } from "react";
import { SVGIcons } from "../../types/icons";

const DragAndDrop = ({ width=24, fill='none'} : SVGIcons):ReactNode => {
    const svgMarkup = `
    <svg xmlns="http://www.w3.org/2000/svg" width=${width} height=${width/2} fill=${fill} viewBox="0 0 12 6"><path fill="#737373" d="M0 0h12v1H0zM0 5h12v1H0z"/></svg>
    `;
  
    return (
      <div dangerouslySetInnerHTML={{ __html: svgMarkup }} />
    );
  };
  
  export default DragAndDrop;
  