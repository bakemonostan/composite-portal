import { IconProps } from "./types";

export default function CardContractorsIcon({
  fill = "#E7C205",
  width = 16,
  height = 19,
}: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 7C12 12.33 4 12.33 4 7H6C6 9.67 10 9.67 10 7M16 16V19H0V16C0 13.33 5.33 12 8 12C10.67 12 16 13.33 16 16ZM14.1 16C14.1 15.36 10.97 13.9 8 13.9C5.03 13.9 1.9 15.36 1.9 16V17.1H14.1M8.5 0C8.78 0 9 0.22 9 0.5V3.5H10V1C10.7077 1.32752 11.3006 1.86019 11.7019 2.52889C12.1031 3.19758 12.294 3.97142 12.25 4.75C12.25 4.75 12.95 4.89 13 6H3C3 4.89 3.75 4.75 3.75 4.75C3.70595 3.97142 3.89693 3.19758 4.29814 2.52889C4.69936 1.86019 5.29229 1.32752 6 1V3.5H7V0.5C7 0.22 7.22 0 7.5 0"
        fill={fill}
      />
    </svg>
  );
}
