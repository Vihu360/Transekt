import { FC } from "react";

interface Props {
  src: string;
  color?: string;
}

interface SVGDictionary {
  //@ts-expect-error - Index signature allows dynamic string keys
  [key: string]: (color: string) => JSX.Element;
}

const SVGS: SVGDictionary = {
  arrowDown: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M6 9l6 6l6 -6" />
    </svg>
  ),
};

const SVGComponent: FC<Props> = ({ src, color }) => {
  const svgToRender = SVGS[src];
  if (!svgToRender) {
    return <div>SVG not found</div>;
  }

  return <>{svgToRender(color || "#000000")}</>;
};

export default SVGComponent;