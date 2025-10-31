import { useCallback, useEffect, useRef } from "react";

/**
 * Hook to autosize textarea height.
 *
 * The trick to resize is to first set its height to 0 and then set it back to scroll height.
 * Reference: https://stackoverflow.com/a/25621277/7699841
 *
 * @example // Tailwind CSS
 * const textareaRef = useAutosizeTextareaHeight({ value });
 * <textarea ref={textareaRef} className="resize-none overflow-hidden"/>
 */
export const useAutosizeTextareaHeight = ({ 
  value: _value,
  minRows 
}: { 
  value: string;
  minRows?: number;
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const resizeHeight = useCallback(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      // Reset height to calculate scrollHeight correctly
      textarea.style.height = "0px";
      const scrollHeight = textarea.scrollHeight;
      
      // If minRows is provided, calculate minimum height
      let minHeight = 0;
      if (minRows) {
        // Get computed styles to calculate line height accurately
        const computedStyle = window.getComputedStyle(textarea);
        const lineHeight = parseFloat(computedStyle.lineHeight) || 20;
        const paddingTop = parseFloat(computedStyle.paddingTop) || 12;
        const paddingBottom = parseFloat(computedStyle.paddingBottom) || 12;
        minHeight = (lineHeight * minRows) + paddingTop + paddingBottom;
      }
      
      // Set height to the larger of scrollHeight or minHeight
      textarea.style.height = `${Math.max(scrollHeight, minHeight)}px`;
    }
  }, [minRows]);

  // Resize height when value changes
  useEffect(() => {
    resizeHeight();
  }, [resizeHeight]);

  // Resize height when viewport resizes
  useEffect(() => {
    window.addEventListener("resize", resizeHeight);
    return () => window.removeEventListener("resize", resizeHeight);
  }, [resizeHeight]);

  return textareaRef;
};
