import Icon from "@ant-design/icons";
import type { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";

const Arrow = () => (
  <svg
    width="2rem"
    height="2rem"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4.67154 5.99959C4.9323 5.74067 5.35336 5.74141 5.6132 6.00125L8.19653 8.58458L10.7863 6.00048C11.0461 5.74125 11.4668 5.74148 11.7263 6.00099C11.986 6.26071 11.986 6.68179 11.7263 6.94151L8.90364 9.76414C8.51312 10.1547 7.87995 10.1547 7.48943 9.76414L4.66987 6.94459C4.40872 6.68344 4.40947 6.25981 4.67154 5.99959Z"
      fill="currentColor"
    ></path>
  </svg>
);
const ArrowDown = () => (
  <svg
    data-type="monochrome"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="20"
    height="20"
    fill="none"
  >
    <g fill="currentColor">
      <path d="M4.68451 8.05853C4.99693 7.74611 5.50346 7.74611 5.81588 8.05853L12.0002 14.2428L18.1845 8.05853C18.4969 7.74611 19.0035 7.74611 19.3159 8.05853C19.6283 8.37095 19.6283 8.87748 19.3159 9.1899L12.5659 15.9399C12.2535 16.2523 11.7469 16.2523 11.4345 15.9399L4.68451 9.1899C4.37209 8.87748 4.37209 8.37095 4.68451 8.05853Z"></path>
    </g>
  </svg>
);
const Filter = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    color="#000000"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M3.21276 3H20.7908C21.0224 3.00036 21.249 3.06709 21.4437 3.19228C21.6385 3.31746 21.7933 3.49586 21.8898 3.70633C21.9863 3.9168 22.0204 4.15052 21.9882 4.37979C21.9559 4.60903 21.8586 4.82422 21.7079 4.99987C21.7078 4.9999 21.7078 4.99993 21.7078 4.99996L14.6509 13.2222C14.6492 13.224 14.6476 13.2259 14.646 13.2278C14.6388 13.236 14.6346 13.2464 14.6342 13.2573V19.3615C14.6348 19.513 14.5994 19.6625 14.5309 19.7977C14.4621 19.9336 14.3619 20.0511 14.2386 20.1405C14.1152 20.2298 13.9724 20.2885 13.8218 20.3116C13.6713 20.3346 13.5174 20.3215 13.373 20.2731C13.373 20.2731 13.373 20.2732 13.373 20.2731L10.0191 19.1572L10.0163 19.1562C9.82518 19.0916 9.65936 18.9682 9.54254 18.8037C9.42647 18.6403 9.36467 18.4445 9.36583 18.2441V13.2555C9.36554 13.2445 9.36142 13.2339 9.35415 13.2255L9.3513 13.2222L2.29222 4.99996C2.29221 4.99996 2.29222 4.99997 2.29222 4.99996C2.14116 4.82402 2.04377 4.60838 2.01166 4.37872C1.97956 4.14905 2.01407 3.91499 2.11109 3.70436C2.20812 3.49373 2.36358 3.31539 2.559 3.19053C2.75421 3.0658 2.9811 2.99967 3.21276 3ZM20.7039 4.25012H3.29608L10.2986 12.4065C10.5012 12.6401 10.6138 12.9384 10.6159 13.2477L10.6159 13.2521V18.0382L13.3841 18.9593V13.2521C13.3841 13.2498 13.3841 13.2476 13.3841 13.2454C13.3874 12.9362 13.5009 12.6384 13.7043 12.4056L20.7039 4.25012Z"
      fill="currentColor"
    ></path>
  </svg>
);
const Warning = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    // xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 20 17"
    data-type="monochrome"
    width="1em"
    height="1em"
    fill="none"
    className="t1c2rggp error"
  >
    <defs>
      <path id="warning_svg__a" d="M0 20h20V0H0z"></path>
    </defs>
    <g fill="none" fill-rule="evenodd" transform="translate(0 -1)">
      <mask id="warning_svg__b" fill="#fff">
        <use href="#warning_svg__a"></use>
      </mask>
      <path
        fill="currentColor"
        d="M11.715 2.797l7.268 12.112a2 2 0 01-1.715 3.03H2.732a2 2 0 01-1.715-3.03L8.285 2.797a2 2 0 013.43 0z"
        mask="url(#warning_svg__b)"
      ></path>
      <circle
        cx="10"
        cy="14.5"
        r="1"
        fill="#FFF"
        mask="url(#warning_svg__b)"
      ></circle>
      <rect
        width="2"
        height="5"
        x="9"
        y="7"
        fill="#FFF"
        mask="url(#warning_svg__b)"
        rx="1"
      ></rect>
    </g>
  </svg>
);
const PlusManage = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    stroke="white"
    stroke-width="2"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M12 3.30005C12.3866 3.30005 12.7 3.61345 12.7 4.00005V20C12.7 20.3867 12.3866 20.7001 12 20.7001C11.6134 20.7001 11.3 20.3867 11.3 20V4.00005C11.3 3.61345 11.6134 3.30005 12 3.30005Z"
      fill="currentColor"
    ></path>
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M20.7 12C20.7 12.3866 20.3866 12.7 20 12.7L3.99995 12.7C3.61335 12.7 3.29995 12.3866 3.29995 12C3.29995 11.6134 3.61335 11.3 3.99995 11.3L20 11.3C20.3866 11.3 20.7 11.6134 20.7 12Z"
      fill="currentColor"
    ></path>
  </svg>
);
const UploadImage = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="53"
    height="39"
    viewBox="0 0 53 39"
  >
    <g fill="none" fill-rule="evenodd" stroke="none" stroke-width="1">
      <g stroke="#FF8800" stroke-width="2" transform="translate(-255 -179)">
        <g transform="translate(132 122)">
          <path d="M150.631 87.337c-5.755 0-10.42-4.534-10.42-10.127 0-5.593 4.665-10.127 10.42-10.127s10.42 4.534 10.42 10.127c0 5.593-4.665 10.127-10.42 10.127m10.42-24.755l-2.315-4.501h-16.21l-2.316 4.5h-11.579s-4.631 0-4.631 4.502v22.505c0 4.5 4.631 4.5 4.631 4.5h41.684s4.631 0 4.631-4.5V67.083c0-4.501-4.631-4.501-4.631-4.501h-9.263z"></path>
        </g>
      </g>
    </g>
  </svg>
);
const LetterI = () => (
  <svg
    data-type="monochrome"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="16"
    height="16"
    fill="none"
  >
    <g fill="currentColor">
      <path d="M2.2998 11.7C2.2998 6.55043 6.47524 2.375 11.6248 2.375C16.7744 2.375 20.9498 6.55043 20.9498 11.7C20.9498 16.8496 16.7744 21.025 11.6248 21.025C6.47524 21.025 2.2998 16.8496 2.2998 11.7ZM11.6248 3.775C7.24844 3.775 3.6998 7.32363 3.6998 11.7C3.6998 16.0764 7.24844 19.625 11.6248 19.625C16.0012 19.625 19.5498 16.0764 19.5498 11.7C19.5498 7.32363 16.0012 3.775 11.6248 3.775Z"></path>
      <path d="M9.6123 10.3875C9.6123 10.0009 9.92571 9.6875 10.3123 9.6875H11.8123C12.1989 9.6875 12.5123 10.0009 12.5123 10.3875V15.825C12.5123 16.2116 12.1989 16.525 11.8123 16.525C11.4257 16.525 11.1123 16.2116 11.1123 15.825V11.0875H10.3123C9.92571 11.0875 9.6123 10.7741 9.6123 10.3875Z"></path>
      <path d="M9.0498 16.0125C9.0498 15.6259 9.36321 15.3125 9.7498 15.3125H13.8748C14.2614 15.3125 14.5748 15.6259 14.5748 16.0125C14.5748 16.3991 14.2614 16.7125 13.8748 16.7125H9.7498C9.36321 16.7125 9.0498 16.3991 9.0498 16.0125Z"></path>
      <path d="M11.625 6.16797C11.384 6.16797 11.1483 6.23945 10.9479 6.37337C10.7475 6.50728 10.5913 6.69763 10.499 6.92032C10.4068 7.14302 10.3826 7.38807 10.4297 7.62448C10.4767 7.8609 10.5928 8.07806 10.7632 8.24851C10.9337 8.41895 11.1508 8.53503 11.3872 8.58205C11.6236 8.62908 11.8687 8.60494 12.0914 8.5127C12.3141 8.42045 12.5044 8.26424 12.6384 8.06382C12.7723 7.8634 12.8438 7.62776 12.8438 7.38672C12.8438 7.06349 12.7153 6.75349 12.4868 6.52493C12.2582 6.29637 11.9482 6.16797 11.625 6.16797V6.16797Z"></path>
    </g>
  </svg>
);
const ArrowInput = ({ id }: any) => {
  return (
    <svg
      data-type="monochrome"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="none"
      id={id}
    >
      <g fill="currentColor">
        <path
          id={id}
          d="M12.4495 14.8316C12.2013 15.0561 11.7987 15.0561 11.5505 14.8316L6.18623 9.98133C6.0044 9.81692 5.95001 9.56967 6.04841 9.35486C6.14682 9.14006 6.37864 9 6.63578 9L17.3642 9C17.6214 9 17.8532 9.14006 17.9516 9.35487C18.05 9.56967 17.9956 9.81693 17.8138 9.98133L12.4495 14.8316Z"
        ></path>
      </g>
    </svg>
  );
};
const ArrowInputNormal = () => {
  return (
    <svg
      data-type="monochrome"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="none"
    >
      <g fill="currentColor">
        <path d="M12.4495 14.8316C12.2013 15.0561 11.7987 15.0561 11.5505 14.8316L6.18623 9.98133C6.0044 9.81692 5.95001 9.56967 6.04841 9.35486C6.14682 9.14006 6.37864 9 6.63578 9L17.3642 9C17.6214 9 17.8532 9.14006 17.9516 9.35487C18.05 9.56967 17.9956 9.81693 17.8138 9.98133L12.4495 14.8316Z"></path>
      </g>
    </svg>
  );
};
const Facebook = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10.0005 1.66797C5.3988 1.66797 1.66797 5.32786 1.66797 9.84202C1.66797 13.9213 4.71464 17.3024 8.6988 17.918V12.2054H6.58214V9.84202H8.6988V8.0411C8.6988 5.99084 9.94297 4.86025 11.8455 4.86025C12.7571 4.86025 13.7121 5.01966 13.7121 5.01966V7.02986H12.6588C11.6255 7.02986 11.3021 7.66096 11.3021 8.3076V9.84038H13.6113L13.2421 12.2037H11.3021V17.9163C15.2863 17.304 18.333 13.9221 18.333 9.84202C18.333 5.32786 14.6021 1.66797 10.0005 1.66797Z"
      fill="#2561CF"
    ></path>
  </svg>
);
const Star = () => (
  <svg
    data-type="monochrome"
    viewBox="0 0 18 18"
    xmlns="http://www.w3.org/2000/svg"
    width="13px"
    height="13px"
    fill="none"
  >
    <path
      fill="currentColor"
      d="M9 14.5l-5.29 2.781 1.01-5.89L.44 7.219l5.915-.86L9 1l2.645 5.36 5.915.859-4.28 4.172 1.01 5.89z"
      fill-rule="evenodd"
    ></path>
  </svg>
);
const Google = () => (
  <svg
    width="21"
    height="20"
    viewBox="0 0 21 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M19.2992 10.1951C19.2992 9.47569 19.2395 8.95069 19.1102 8.40625H10.7031V11.6534H15.6379C15.5384 12.4604 15.0012 13.6757 13.8072 14.4923L13.7905 14.601L16.4487 16.6133L16.6328 16.6312C18.3242 15.1048 19.2992 12.859 19.2992 10.1951Z"
      fill="#4285F4"
    ></path>
    <path
      d="M10.7042 18.75C13.1219 18.75 15.1515 17.9722 16.634 16.6306L13.8084 14.4916C13.0522 15.0069 12.0374 15.3666 10.7042 15.3666C8.33635 15.3666 6.32663 13.8403 5.61022 11.7306L5.50522 11.7393L2.74122 13.8296L2.70508 13.9278C4.17754 16.7861 7.2021 18.75 10.7042 18.75Z"
      fill="#34A853"
    ></path>
    <path
      d="M5.61025 11.7322C5.42122 11.1878 5.31182 10.6044 5.31182 10.0016C5.31182 9.39881 5.42122 8.8155 5.6003 8.27106L5.59529 8.15511L2.79666 6.03125L2.7051 6.07381C2.09823 7.25994 1.75 8.59191 1.75 10.0016C1.75 11.4113 2.09823 12.7432 2.7051 13.9294L5.61025 11.7322Z"
      fill="#FBBC05"
    ></path>
    <path
      d="M10.7042 4.63331C12.3856 4.63331 13.5198 5.34303 14.1665 5.93612L16.6936 3.525C15.1416 2.11528 13.1219 1.25 10.7042 1.25C7.2021 1.25 4.17754 3.21387 2.70508 6.07218L5.60028 8.26944C6.32664 6.15972 8.33636 4.63331 10.7042 4.63331Z"
      fill="#EB4335"
    ></path>
  </svg>
);

const Bar = () => (
  <svg
    width="24"
    height="25"
    viewBox="0 0 24 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_5847_24383)">
      <path
        d="M4 18.5H20C20.55 18.5 21 18.05 21 17.5C21 16.95 20.55 16.5 20 16.5H4C3.45 16.5 3 16.95 3 17.5C3 18.05 3.45 18.5 4 18.5ZM4 13.5H20C20.55 13.5 21 13.05 21 12.5C21 11.95 20.55 11.5 20 11.5H4C3.45 11.5 3 11.95 3 12.5C3 13.05 3.45 13.5 4 13.5ZM3 7.5C3 8.05 3.45 8.5 4 8.5H20C20.55 8.5 21 8.05 21 7.5C21 6.95 20.55 6.5 20 6.5H4C3.45 6.5 3 6.95 3 7.5Z"
        fill="#222222"
      ></path>
    </g>
    <defs>
      <clipPath id="clip0_5847_24383">
        <rect
          width="24"
          height="24"
          fill="white"
          transform="translate(0 0.5)"
        ></rect>
      </clipPath>
    </defs>
  </svg>
);

const Bell = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_5790_635)">
      <g clip-path="url(#clip1_5790_635)">
        <path
          d="M19.4045 18.7012H4.58447C4.33116 18.6997 4.08267 18.6319 3.86373 18.5044C3.64479 18.377 3.46306 18.1945 3.33662 17.975C3.21018 17.7555 3.14344 17.5067 3.14307 17.2534C3.14269 17.0001 3.20868 16.7511 3.33447 16.5312C4.25656 14.6713 4.68036 12.6039 4.56447 10.5312V9.75119C4.56208 8.76941 4.75587 7.79705 5.13447 6.89119C5.50399 5.9826 6.05527 5.15909 6.75447 4.47119C7.44834 3.77705 8.27473 3.22952 9.18447 2.86119C10.0896 2.48125 11.0629 2.29067 12.0445 2.30119C14.0179 2.33276 15.8994 3.14096 17.2809 4.55055C18.6624 5.96015 19.4326 7.8575 19.4245 9.83119V10.5012C19.3053 12.5742 19.7293 14.6423 20.6545 16.5012C20.7789 16.7226 20.8442 16.9723 20.8442 17.2262C20.8442 17.4801 20.7789 17.7298 20.6545 17.9512C20.5307 18.1738 20.3494 18.359 20.1295 18.4874C19.9096 18.6159 19.6591 18.6828 19.4045 18.6812V18.7012ZM11.9945 3.70119C11.2051 3.70057 10.4234 3.85571 9.69411 4.15773C8.96481 4.45974 8.30228 4.90269 7.74447 5.46119C7.17636 6.03386 6.72767 6.71369 6.42447 7.46119C6.13287 8.1891 5.98679 8.9671 5.99447 9.75119V9.75119V10.5012C6.11944 12.8302 5.62973 15.1512 4.57447 17.2312L19.4345 17.3012C18.4083 15.1855 17.914 12.8513 17.9945 10.5012V9.83119C18 8.22614 17.3737 6.68338 16.251 5.53633C15.1283 4.38928 13.5993 3.73008 11.9945 3.70119V3.70119Z"
          fill="currentColor"
        ></path>
        <path
          d="M11.9945 22.4508C11.5081 22.4529 11.0261 22.3585 10.5764 22.1731C10.1267 21.9877 9.71819 21.715 9.37453 21.3708C8.68295 20.6741 8.29475 19.7324 8.29453 18.7508V18.0008C8.29453 17.8151 8.36827 17.6371 8.49955 17.5058C8.63083 17.3745 8.80887 17.3008 8.99452 17.3008C9.18018 17.3008 9.35822 17.3745 9.4895 17.5058C9.62078 17.6371 9.69452 17.8151 9.69452 18.0008V18.7508C9.69584 19.3609 9.9364 19.9461 10.3645 20.3808C10.8081 20.7912 11.3902 21.0192 11.9945 21.0192C12.5989 21.0192 13.181 20.7912 13.6245 20.3808C14.0526 19.9461 14.2932 19.3609 14.2945 18.7508V18.0008C14.2945 17.8151 14.3683 17.6371 14.4995 17.5058C14.6308 17.3745 14.8089 17.3008 14.9945 17.3008C15.1802 17.3008 15.3582 17.3745 15.4895 17.5058C15.6208 17.6371 15.6945 17.8151 15.6945 18.0008V18.7508C15.6958 19.237 15.601 19.7188 15.4156 20.1683C15.2301 20.6178 14.9576 21.0262 14.6138 21.37C14.2699 21.7139 13.8615 21.9863 13.412 22.1718C12.9625 22.3573 12.4808 22.4521 11.9945 22.4508Z"
          fill="currentColor"
        ></path>
      </g>
    </g>
    <defs>
      <clipPath id="clip0_5790_635">
        <rect width="24" height="24" fill="white"></rect>
      </clipPath>
      <clipPath id="clip1_5790_635">
        <rect
          width="17.71"
          height="20.15"
          fill="white"
          transform="translate(3.14453 2.30078)"
        ></rect>
      </clipPath>
    </defs>
  </svg>
);

const Chat = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M3.7499 4.34844C3.71012 4.34844 3.67197 4.36424 3.64384 4.39237C3.61571 4.4205 3.5999 4.45866 3.5999 4.49844V15.2422L6.33529 13.0318C6.44205 12.9455 6.57515 12.8984 6.7124 12.8984H15.7499C15.7897 12.8984 15.8278 12.8826 15.856 12.8545C15.8841 12.8264 15.8999 12.7882 15.8999 12.7484V4.49844C15.8999 4.45865 15.8841 4.4205 15.856 4.39237C15.8278 4.36424 15.7897 4.34844 15.7499 4.34844H3.7499ZM2.79531 3.54384C3.04848 3.29067 3.39186 3.14844 3.7499 3.14844H15.7499C16.1079 3.14844 16.4513 3.29067 16.7045 3.54384C16.9577 3.79702 17.0999 4.1404 17.0999 4.49844V12.7484C17.0999 13.1065 16.9577 13.4499 16.7045 13.703C16.4513 13.9562 16.1079 14.0984 15.7499 14.0984H6.92453L3.37701 16.9651C3.19721 17.1104 2.94992 17.1395 2.74132 17.0399C2.53271 16.9402 2.3999 16.7296 2.3999 16.4984V4.49844C2.3999 4.14039 2.54213 3.79702 2.79531 3.54384Z"
      fill="#222222"
    ></path>
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M15.8999 8.24844C15.8999 7.91707 16.1685 7.64844 16.4999 7.64844H20.2499C20.6079 7.64844 20.9513 7.79067 21.2045 8.04384C21.4577 8.29702 21.5999 8.6404 21.5999 8.99844V20.9984C21.5999 21.2296 21.4671 21.4402 21.2585 21.5399C21.0499 21.6395 20.8026 21.6104 20.6228 21.4651L17.0753 18.5984H8.2499C7.89186 18.5984 7.54848 18.4562 7.29531 18.203C7.04213 17.9499 6.8999 17.6065 6.8999 17.2484V13.4984C6.8999 13.1671 7.16853 12.8984 7.4999 12.8984C7.83127 12.8984 8.0999 13.1671 8.0999 13.4984V17.2484C8.0999 17.2882 8.11571 17.3264 8.14384 17.3545C8.17197 17.3826 8.21012 17.3984 8.2499 17.3984H17.2874C17.4247 17.3984 17.5578 17.4455 17.6645 17.5318L20.3999 19.7422V8.99844C20.3999 8.95865 20.3841 8.9205 20.356 8.89237C20.3278 8.86424 20.2897 8.84844 20.2499 8.84844H16.4999C16.1685 8.84844 15.8999 8.57981 15.8999 8.24844Z"
      fill="#222222"
    ></path>
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M6.7998 7.23047C6.7998 6.95433 6.99168 6.73047 7.22838 6.73047H12.3712C12.6079 6.73047 12.7998 6.95433 12.7998 7.23047C12.7998 7.50661 12.6079 7.73047 12.3712 7.73047H7.22838C6.99168 7.73047 6.7998 7.50661 6.7998 7.23047Z"
      fill="#222222"
    ></path>
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M6.7998 10.2305C6.7998 9.95433 6.99168 9.73047 7.22838 9.73047H12.3712C12.6079 9.73047 12.7998 9.95433 12.7998 10.2305C12.7998 10.5066 12.6079 10.7305 12.3712 10.7305H7.22838C6.99168 10.7305 6.7998 10.5066 6.7998 10.2305Z"
      fill="#222222"
    ></path>
  </svg>
);
const Cart = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M5.38278 7.30078H18.6172C19.8276 7.30078 20.8486 8.20207 20.9987 9.4031L22.2487 19.4031C22.4277 20.8355 21.3108 22.1008 19.8672 22.1008H4.13278C2.68918 22.1008 1.57225 20.8355 1.75131 19.4031L3.00131 9.4031C3.15144 8.20207 4.1724 7.30078 5.38278 7.30078ZM5.38278 8.70078H18.6172C19.1215 8.70078 19.5469 9.07632 19.6095 9.57675L20.8595 19.5767C20.9341 20.1736 20.4687 20.7008 19.8672 20.7008H4.13278C3.53128 20.7008 3.06589 20.1736 3.1405 19.5767L4.3905 9.57675C4.45305 9.07632 4.87845 8.70078 5.38278 8.70078Z"
      fill="currentColor"
    ></path>
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M12 4.2C10.3713 4.2 9.05105 5.46639 9.05105 7.02857V10.8C9.05105 11.1314 8.77099 11.4 8.42552 11.4C8.08005 11.4 7.79999 11.1314 7.79999 10.8V7.02857C7.79999 4.80365 9.68039 3 12 3C14.3196 3 16.2 4.80365 16.2 7.02857V10.8C16.2 11.1314 15.9199 11.4 15.5745 11.4C15.229 11.4 14.9489 11.1314 14.9489 10.8V7.02857C14.9489 5.46639 13.6286 4.2 12 4.2Z"
      fill="currentColor"
    ></path>
  </svg>
);
const MangeShop = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.28571 2C5.14907 2 4.05898 2.45153 3.25526 3.25526C2.45153 4.05898 2 5.14907 2 6.28571V17.7143C2 18.8509 2.45153 19.941 3.25526 20.7447C4.05898 21.5485 5.14907 22 6.28571 22H17.7143C18.8509 22 19.941 21.5485 20.7447 20.7447C21.5485 19.941 22 18.8509 22 17.7143V6.28571C22 5.14907 21.5485 4.05898 20.7447 3.25526C19.941 2.45153 18.8509 2 17.7143 2H6.28571ZM3.42857 6.28571C3.42857 5.52795 3.72959 4.80123 4.26541 4.26541C4.80123 3.72959 5.52795 3.42857 6.28571 3.42857H17.7143C18.472 3.42857 19.1988 3.72959 19.7346 4.26541C20.2704 4.80123 20.5714 5.52795 20.5714 6.28571V17.7143C20.5714 18.472 20.2704 19.1988 19.7346 19.7346C19.1988 20.2704 18.472 20.5714 17.7143 20.5714H6.28571C5.52795 20.5714 4.80123 20.2704 4.26541 19.7346C3.72959 19.1988 3.42857 18.472 3.42857 17.7143V6.28571Z"
      fill="currentColor"
    ></path>
    <rect x="6" y="7" width="3" height="3" rx="1.5" fill="currentColor"></rect>
    <path
      d="M12 8.5C12 8.08579 12.3358 7.75 12.75 7.75H17.25C17.6642 7.75 18 8.08579 18 8.5C18 8.91421 17.6642 9.25 17.25 9.25H12.75C12.3358 9.25 12 8.91421 12 8.5Z"
      fill="currentColor"
    ></path>
    <rect x="6" y="14" width="3" height="3" rx="1.5" fill="currentColor"></rect>
    <path
      d="M12 15.5C12 15.0858 12.3358 14.75 12.75 14.75H17.25C17.6642 14.75 18 15.0858 18 15.5C18 15.9142 17.6642 16.25 17.25 16.25H12.75C12.3358 16.25 12 15.9142 12 15.5Z"
      fill="currentColor"
    ></path>
  </svg>
);
const UploadNew = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    data-type="monochrome"
    viewBox="0 0 23.228 23.227"
    width="1em"
    height="1em"
    fill="none"
  >
    <path
      d="M13.288 0a.759.759 0 110 1.518H3.396a1.88 1.88 0 00-1.877 1.877v16.438a1.88 1.88 0 001.877 1.877h16.437a1.88 1.88 0 001.877-1.877V9.488a.76.76 0 011.518 0v10.344a3.399 3.399 0 01-3.395 3.395H3.396A3.4 3.4 0 010 19.832V3.395A3.4 3.4 0 013.396 0zm6.022.21c.273-.1.564-.078.835-.038.276.042.57.205.83.461l.54.54 1.117 1.117c.24.24.394.497.46.766a1.68 1.68 0 01-.4 1.545l-.058.062c-.344.352-.7.707-1.048 1.05l-.631.63-6.33 6.328-.488.493-.038.04c-.307.31-.621.628-.939.932-.153.148-.339.219-.619.236l-3.014.184h-.03a.719.719 0 01-.484-.218c-.158-.156-.249-.358-.24-.543l.135-3.097c.016-.253.095-.443.248-.598l.157-.16.003-.002.082-.081 5.416-5.415a719.16 719.16 0 011.747-1.745l1.68-1.682c.144-.146.27-.275.397-.396a1.8 1.8 0 01.672-.408zm.493 1.428l-.221.219c-.153.151-.306.305-.457.456l-.536.537-8.151 8.152-.086 1.957 1.906-.115.312-.312.226-.224.05-.049.385-.38 8.401-8.403-1.211-1.209a8.233 8.233 0 01-.172-.175l-.027-.029c-.065-.068-.13-.137-.2-.206l-.22-.219z"
      fill="currentColor"
    ></path>
  </svg>
);
const UserAvatar = () => (
  <svg
    height="24"
    viewBox="0 0 32 32"
    width="24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="m16 8a5 5 0 1 0 5 5 5 5 0 0 0 -5-5zm0 8a3 3 0 1 1 3-3 3.0034 3.0034 0 0 1 -3 3z" />
    <path d="m16 2a14 14 0 1 0 14 14 14.0158 14.0158 0 0 0 -14-14zm-6 24.3765v-1.3765a3.0033 3.0033 0 0 1 3-3h6a3.0033 3.0033 0 0 1 3 3v1.3765a11.8989 11.8989 0 0 1 -12 0zm13.9925-1.4507a5.0016 5.0016 0 0 0 -4.9925-4.9258h-6a5.0016 5.0016 0 0 0 -4.9925 4.9258 12 12 0 1 1 15.985 0z" />
    <path d="m0 0h32v32h-32z" fill="none" />
  </svg>
);
const Plus = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 21"
  >
    <g fill="none" fill-rule="evenodd" stroke="none" stroke-width="1">
      <g fill="#FF8800" transform="translate(-161 -428)">
        <g transform="translate(132 398)">
          <g transform="translate(16.648 17.048)">
            <g transform="rotate(-180 16.142 16.838)">
              <rect
                width="2.643"
                height="19.82"
                x="8.588"
                y="0"
                rx="1.321"
              ></rect>
              <path
                d="M9.91 0c.73 0 1.321.592 1.321 1.321v17.177a1.321 1.321 0 01-2.643 0V1.321C8.588.591 9.18 0 9.91 0z"
                transform="rotate(90 9.91 9.91)"
              ></path>
            </g>
          </g>
        </g>
      </g>
    </g>
  </svg>
);
const FasterSell = () => (
  <svg
    data-type="monochrome"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="20"
    height="20"
    fill="none"
  >
    <path
      d="M18.7655 6.85008L20.846 7.43909C21.3774 7.58953 21.6862 8.14227 21.5358 8.67367L18.6349 18.9201C18.4845 19.4515 17.9317 19.7603 17.4003 19.6099L7.15393 16.709C6.62253 16.5586 6.3137 16.0058 6.46415 15.4744L7.05316 13.3939M14.2014 5.55796L12.6801 5.12725L10.5996 4.53824C10.0682 4.3878 9.51544 4.69662 9.36499 5.22802L8.77598 7.30853L8.34528 8.82987"
      stroke="currentColor"
      stroke-width="1.4"
    ></path>
    <g fill="currentColor">
      <path d="M13.0649 7.72267C12.9649 8.0961 13.1865 8.47994 13.5599 8.58C13.9333 8.68005 14.3171 8.45845 14.4172 8.08502L13.0649 7.72267ZM16.9286 8.75795C16.8286 9.13138 17.0502 9.51521 17.4236 9.61527C17.797 9.71533 18.1809 9.49372 18.2809 9.1203L16.9286 8.75795ZM14.4172 8.08502L15.1937 5.18724L13.8414 4.8249L13.0649 7.72267L14.4172 8.08502ZM17.7051 5.86017L16.9286 8.75795L18.2809 9.1203L19.0574 6.22252L17.7051 5.86017ZM16.7858 4.268C17.4793 4.45383 17.8909 5.16667 17.7051 5.86017L19.0574 6.22252C19.4433 4.78216 18.5885 3.30165 17.1482 2.91571L16.7858 4.268ZM15.1937 5.18724C15.3795 4.49374 16.0923 4.08218 16.7858 4.268L17.1482 2.91571C15.7078 2.52977 14.2273 3.38454 13.8414 4.8249L15.1937 5.18724Z"></path>
      <path d="M11.5 9.27422C11.8866 9.27422 12.2 8.96082 12.2 8.57422C12.2 8.18762 11.8866 7.87422 11.5 7.87422V9.27422ZM3.5 7.87422C3.1134 7.87422 2.8 8.18762 2.8 8.57422C2.8 8.96082 3.1134 9.27422 3.5 9.27422V7.87422ZM11.5 7.87422H3.5V9.27422H11.5V7.87422Z"></path>
      <path d="M9 11.7742C9.3866 11.7742 9.7 11.4608 9.7 11.0742C9.7 10.6876 9.3866 10.3742 9 10.3742V11.7742ZM2 10.3742C1.6134 10.3742 1.3 10.6876 1.3 11.0742C1.3 11.4608 1.6134 11.7742 2 11.7742V10.3742ZM9 10.3742H2V11.7742H9V10.3742Z"></path>
      <path d="M15 14.2742C15.3866 14.2742 15.7 13.9608 15.7 13.5742C15.7 13.1876 15.3866 12.8742 15 12.8742V14.2742ZM11 12.8742C10.6134 12.8742 10.3 13.1876 10.3 13.5742C10.3 13.9608 10.6134 14.2742 11 14.2742V12.8742ZM15 12.8742H11V14.2742H15V12.8742Z"></path>
      <path d="M8 14.2742C8.3866 14.2742 8.7 13.9608 8.7 13.5742C8.7 13.1876 8.3866 12.8742 8 12.8742V14.2742ZM4 12.8742C3.6134 12.8742 3.3 13.1876 3.3 13.5742C3.3 13.9608 3.6134 14.2742 4 14.2742V12.8742ZM8 12.8742H4V14.2742H8V12.8742Z"></path>
    </g>
  </svg>
);
const ChangePost = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9.14743 20H5.24129C4.91642 19.9918 4.60652 19.8617 4.37325 19.6354C4.14005 19.4061 4.00605 19.0944 4 18.7674V15.0609C4.00067 14.8971 4.0331 14.735 4.09548 14.5835C4.15825 14.4315 4.2496 14.293 4.36457 14.1755L14.1126 4.37543C14.2281 4.2559 14.367 4.16136 14.5205 4.09766C14.6745 4.0332 14.8397 4 15.0066 4C15.1735 4 15.3388 4.0332 15.4927 4.09766C15.6463 4.16136 15.7852 4.2559 15.9007 4.37543L19.5291 8.0038C19.6453 8.11683 19.7381 8.25168 19.8022 8.40063C19.8662 8.54958 19.9003 8.70971 19.9023 8.87183C19.9009 9.03838 19.8685 9.2032 19.8069 9.35793C19.738 9.51337 19.6409 9.65465 19.5204 9.77458L9.58144 19.783C9.52722 19.8463 9.46089 19.8981 9.38636 19.9353C9.31182 19.9726 9.23059 19.9946 9.14743 20ZM15.0414 5.24346L5.20656 15.0349V18.698L8.90438 18.7414L18.6697 8.96731L15.0414 5.24346Z"
      fill="currentColor"
    ></path>
    <path
      d="M18.9125 20.0004H9.14717C8.98602 20.0004 8.83147 19.9364 8.71752 19.8224C8.60357 19.7085 8.53955 19.5539 8.53955 19.3928C8.53955 19.2316 8.60357 19.0771 8.71752 18.9631C8.83147 18.8492 8.98602 18.7852 9.14717 18.7852H18.9125C19.0737 18.7852 19.2282 18.8492 19.3422 18.9631C19.4561 19.0771 19.5202 19.2316 19.5202 19.3928C19.5202 19.5539 19.4561 19.7085 19.3422 19.8224C19.2282 19.9364 19.0737 20.0004 18.9125 20.0004Z"
      fill="currentColor"
    ></path>
  </svg>
);

const HiddenEye = () => (
  <svg
    data-type="monochrome"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="16"
    height="16"
    fill="none"
  >
    <g fill="currentColor">
      <path d="M20.25 20.9981C20.1515 20.9983 20.0539 20.979 19.9629 20.9412C19.8719 20.9035 19.7893 20.8481 19.7198 20.7783L3.2198 4.2783C3.08509 4.1365 3.01109 3.94769 3.0136 3.75212C3.0161 3.55655 3.0949 3.36969 3.23321 3.23139C3.37151 3.09309 3.55836 3.01428 3.75393 3.01178C3.94951 3.00928 4.13832 3.08327 4.28011 3.21798L20.7801 19.718C20.8849 19.8229 20.9563 19.9565 20.9852 20.1019C21.0141 20.2474 20.9993 20.3981 20.9425 20.5351C20.8858 20.6721 20.7897 20.7892 20.6665 20.8716C20.5432 20.954 20.3982 20.9981 20.25 20.9981V20.9981ZM11.984 17.9981C10.0392 17.9981 8.16371 17.4225 6.40965 16.2872C4.81261 15.256 3.37496 13.7789 2.25183 12.0216V12.0178C3.18652 10.6786 4.21027 9.54611 5.30996 8.63299C5.31991 8.62467 5.32802 8.61438 5.33379 8.60277C5.33956 8.59115 5.34285 8.57847 5.34347 8.56552C5.34409 8.55257 5.34201 8.53963 5.33737 8.52752C5.33273 8.51541 5.32563 8.5044 5.31652 8.49517L4.38277 7.56283C4.36618 7.5461 4.34389 7.53623 4.32035 7.53519C4.29682 7.53415 4.27375 7.54201 4.25574 7.5572C3.08761 8.54158 2.0034 9.74908 1.01761 11.1628C0.848014 11.4063 0.754608 11.6946 0.749266 11.9912C0.743924 12.2879 0.826888 12.5794 0.987615 12.8288C2.22558 14.7661 3.81886 16.3978 5.59449 17.5467C7.59371 18.8419 9.74527 19.4981 11.984 19.4981C13.1924 19.4944 14.3923 19.2953 15.5371 18.9085C15.5522 18.9033 15.5658 18.8944 15.5765 18.8826C15.5872 18.8708 15.5947 18.8564 15.5983 18.8409C15.602 18.8254 15.6015 18.8092 15.5972 18.7938C15.5928 18.7785 15.5845 18.7646 15.5732 18.7533L14.5617 17.7417C14.5384 17.719 14.5096 17.7028 14.4781 17.6945C14.4466 17.6863 14.4136 17.6864 14.3821 17.6949C13.5987 17.8966 12.793 17.9985 11.984 17.9981V17.9981ZM23.0081 11.1825C21.7678 9.26439 20.1586 7.63502 18.3548 6.47017C16.3593 5.18017 14.1562 4.49814 11.984 4.49814C10.7884 4.50026 9.60169 4.70357 8.47355 5.09955C8.45852 5.10478 8.44507 5.11375 8.43446 5.12561C8.42386 5.13748 8.41645 5.15185 8.41293 5.16737C8.40941 5.18289 8.40991 5.19906 8.41436 5.21433C8.41882 5.22961 8.42709 5.24351 8.4384 5.2547L9.44855 6.26486C9.47207 6.28798 9.50127 6.30448 9.5332 6.31271C9.56513 6.32094 9.59867 6.3206 9.63043 6.31173C10.3978 6.10416 11.1891 5.99872 11.984 5.99814C13.8914 5.99814 15.7612 6.5808 17.5411 7.73252C19.1681 8.78252 20.6226 10.2581 21.7486 11.9981C21.7494 11.9992 21.7498 12.0005 21.7498 12.0019C21.7498 12.0032 21.7494 12.0046 21.7486 12.0056C20.9312 13.2923 19.917 14.4427 18.7429 15.4149C18.7329 15.4231 18.7247 15.4334 18.7188 15.4451C18.7129 15.4567 18.7096 15.4694 18.7089 15.4825C18.7083 15.4955 18.7103 15.5085 18.715 15.5206C18.7196 15.5328 18.7267 15.5439 18.7359 15.5531L19.6687 16.4855C19.6852 16.5022 19.7074 16.512 19.7308 16.5132C19.7542 16.5143 19.7772 16.5066 19.7953 16.4916C21.0487 15.4362 22.1337 14.1957 23.0128 12.8128C23.1682 12.5692 23.2503 12.286 23.2495 11.997C23.2486 11.708 23.1649 11.4253 23.0081 11.1825V11.1825Z"></path>
      <path d="M12 7.5C11.6629 7.49982 11.3269 7.53756 10.9983 7.6125C10.9817 7.61595 10.9663 7.62383 10.9538 7.63531C10.9414 7.64679 10.9322 7.66144 10.9274 7.6777C10.9226 7.69395 10.9223 7.71121 10.9265 7.72763C10.9307 7.74405 10.9393 7.75901 10.9514 7.77094L16.229 13.0472C16.241 13.0592 16.2559 13.0678 16.2723 13.0721C16.2888 13.0763 16.306 13.076 16.3223 13.0712C16.3385 13.0663 16.3532 13.0572 16.3647 13.0447C16.3761 13.0323 16.384 13.0169 16.3875 13.0003C16.5377 12.3413 16.5376 11.6568 16.3871 10.9979C16.2365 10.3389 15.9395 9.72228 15.5179 9.19385C15.0964 8.66542 14.5613 8.23874 13.9522 7.9455C13.3432 7.65226 12.6759 7.49999 12 7.5V7.5ZM7.77091 10.9528C7.75899 10.9408 7.74402 10.9322 7.7276 10.9279C7.71118 10.9237 7.69392 10.924 7.67767 10.9289C7.66141 10.9337 7.64676 10.9428 7.63528 10.9553C7.6238 10.9677 7.61592 10.9831 7.61247 10.9997C7.44248 11.7424 7.46382 12.516 7.67451 13.2482C7.88519 13.9803 8.27832 14.647 8.81704 15.1857C9.35577 15.7245 10.0224 16.1176 10.7546 16.3283C11.4868 16.539 12.2604 16.5603 13.0031 16.3903C13.0197 16.3869 13.0351 16.379 13.0475 16.3675C13.06 16.356 13.0691 16.3414 13.0739 16.3251C13.0787 16.3089 13.0791 16.2916 13.0748 16.2752C13.0706 16.2588 13.062 16.2438 13.05 16.2319L7.77091 10.9528Z"></path>
    </g>
  </svg>
);
const ArrowBack = () => (
  <svg
    data-type="monochrome"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="20"
    height="20"
    fill="none"
  >
    <g fill="currentColor">
      <path d="M12.0034 4.68353C12.3158 4.99595 12.3158 5.50248 12.0034 5.8149L6.61907 11.1992H19.3127C19.7545 11.1992 20.1127 11.5574 20.1127 11.9992C20.1127 12.441 19.7545 12.7992 19.3127 12.7992H6.61907L12.0034 18.1835C12.3158 18.496 12.3158 19.0025 12.0034 19.3149C11.691 19.6273 11.1844 19.6273 10.872 19.3149L4.12201 12.5649C3.80959 12.2525 3.80959 11.746 4.12201 11.4335L10.872 4.68353C11.1844 4.37111 11.691 4.37111 12.0034 4.68353Z"></path>
    </g>
  </svg>
);
const Search = () => (
  <svg
    data-type="monochrome"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    fill="none"
  >
    <g fill="currentColor">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M5.88351 3.65974C7.20956 2.7737 8.76857 2.30078 10.3634 2.30078C12.5019 2.30092 14.5529 3.15051 16.0651 4.66269C17.5773 6.17487 18.4269 8.22579 18.427 10.3643C18.427 11.9592 17.9541 13.5182 17.068 14.8443C16.182 16.1703 14.9226 17.2038 13.4492 17.8142C11.9758 18.4245 10.3545 18.5842 8.79027 18.273C7.22609 17.9619 5.78929 17.1939 4.66158 16.0662C3.53387 14.9385 2.76588 13.5017 2.45475 11.9375C2.14361 10.3733 2.3033 8.752 2.91361 7.27857C3.52393 5.80514 4.55746 4.54578 5.88351 3.65974ZM10.3634 3.70078C12.1307 3.7009 13.8255 4.403 15.0751 5.65264C16.3248 6.90228 17.0269 8.59712 17.027 10.3644M10.3634 3.70078C9.04548 3.70079 7.75712 4.0916 6.66131 4.8238C5.56549 5.556 4.7114 6.59672 4.20704 7.81433C3.70269 9.03194 3.57073 10.3718 3.82785 11.6644C4.08496 12.957 4.71961 14.1443 5.65153 15.0762C6.58345 16.0082 7.77079 16.6428 9.0634 16.8999C10.356 17.157 11.6958 17.0251 12.9135 16.5207C14.1311 16.0164 15.1718 15.1623 15.904 14.0665C16.6362 12.9707 17.027 11.6823 17.027 10.3644"
      ></path>
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M15.3623 15.3613C15.6356 15.0879 16.0788 15.0879 16.3522 15.3613L21.4949 20.5039C21.7682 20.7773 21.7682 21.2205 21.4949 21.4939C21.2215 21.7672 20.7783 21.7672 20.5049 21.4939L15.3623 16.3512C15.0889 16.0779 15.0889 15.6346 15.3623 15.3613Z"
      ></path>
    </g>
  </svg>
);
const ArrowRight = () => (
  <svg
    data-type="monochrome"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    fill="none"
  >
    <g fill="currentColor">
      <path d="M8.05951 4.68353C8.37193 4.37111 8.87846 4.37111 9.19088 4.68353L15.9409 11.4335C16.2533 11.746 16.2533 12.2525 15.9409 12.5649L9.19088 19.3149C8.87846 19.6273 8.37193 19.6273 8.05951 19.3149C7.74709 19.0025 7.74709 18.496 8.05951 18.1835L14.2438 11.9992L8.05951 5.8149C7.74709 5.50248 7.74709 4.99595 8.05951 4.68353Z"></path>
    </g>
  </svg>
);
const DeleteFilter = () => (
  <svg
    data-type="monochrome"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    fill="none"
  >
    <g fill="currentColor">
      <path d="M6.25483 6.33003C6.5282 6.05666 6.97141 6.05666 7.24478 6.33003L11.9998 11.0851L16.7548 6.33003C17.0282 6.05666 17.4714 6.05666 17.7448 6.33003C18.0181 6.60339 18.0181 7.04661 17.7448 7.31997L12.9898 12.075L17.7448 16.83C18.0181 17.1034 18.0181 17.5466 17.7448 17.82C17.4714 18.0933 17.0282 18.0933 16.7548 17.82L11.9998 13.0649L7.24478 17.82C6.97141 18.0933 6.5282 18.0933 6.25483 17.82C5.98146 17.5466 5.98146 17.1034 6.25483 16.83L11.0099 12.075L6.25483 7.31997C5.98146 7.04661 5.98146 6.60339 6.25483 6.33003Z"></path>
    </g>
  </svg>
);
export const SidebarMenu = (props: any) => <Icon component={Bar} {...props} />;
export const PlusIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={Plus} {...props} />
);
export const ArrowRightIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={ArrowRight} {...props} />
);
export const DeleteFilterIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={DeleteFilter} {...props} />
);
export const SearchIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={Search} {...props} />
);
export const ArrowBackIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={ArrowBack} {...props} />
);
export const HiddenEyeIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={HiddenEye} {...props} />
);
export const ChangePostIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={ChangePost} {...props} />
);
export const FasterSellIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={FasterSell} {...props} />
);
export const WarningIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={Warning} {...props} />
);
export const ArrowDownIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={ArrowDown} {...props} />
);
export const ArrowIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={Arrow} {...props} />
);
export const PlusManageIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={PlusManage} {...props} />
);
export const UserAvatarIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={UserAvatar} {...props} />
);
export const UploadImageIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={UploadImage} {...props} />
);
export const BarIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={Bar} {...props} />
);

export const FilterIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={Filter} {...props} />
);
export const BellIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={Bell} {...props} />
);
export const FacebookIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={Facebook} {...props} />
);
export const StarIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={Star} {...props} />
);
export const LetterIIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={LetterI} {...props} />
);
export const GoogleIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={Google} {...props} />
);
export const ChatIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={Chat} {...props} />
);
export const CartIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={Cart} {...props} />
);
export const MangeShopIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={MangeShop} {...props} />
);
export const UploadNewIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={UploadNew} {...props} />
);
export const ArrowInputNormalIcon = (
  props: Partial<CustomIconComponentProps>
) => <Icon component={ArrowInputNormal} {...props} />;
export const ArrowInputIcon = (props: Partial<CustomIconComponentProps>) => (
  <ArrowInput {...props} />
);
