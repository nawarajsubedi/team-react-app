import React, { useRef, useEffect } from 'react';
import { update } from 'jdenticon';  // Correct named import from jdenticon


interface JdenticonProps {
  name: string;
  width?: string;
  height?: string;
  className?: string;  // Add className as an optional prop
}

const Jdenticon: React.FC<JdenticonProps> = ({ name, width = '32px', height = '32px', className }) => {
  const icon = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (icon.current) {
      update(icon.current, name);  // Update the SVG with the new name
    }
  }, [name]);

  return (
    <svg ref={icon} width={width} height={height} className={className} />  // Apply className to the SVG element
  );
}

export default Jdenticon;