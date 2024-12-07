import React from "react";
import type { SVGProps } from "react";

export function LearnerIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1rem"
      height="1rem"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M1.818 5.272a.75.75 0 0 1 .91.546l.382 1.528a6.71 6.71 0 0 0 4.975 4.904H16a4.124 4.124 0 0 1 4.096 3.642l.649 5.52a.75.75 0 1 1-1.49.176l-.65-5.52A2.624 2.624 0 0 0 16 13.75H7.918l-.08-.018A8.21 8.21 0 0 1 1.654 7.71l-.382-1.528a.75.75 0 0 1 .545-.91"
        clipRule="evenodd"
      ></path>
      <path
        fill="currentColor"
        d="M8 13.75V18c0 1.886 0 2.828.586 3.414S10.114 22 12 22s2.828 0 3.414-.586S16 19.886 16 18v-4.25z"
        opacity={0.5}
      ></path>
      <circle cx={12} cy={6} r={4} fill="currentColor"></circle>
    </svg>
  );
}