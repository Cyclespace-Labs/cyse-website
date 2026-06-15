// components/TimelineIcons.tsx
import React from "react";

const color = {
  primary: "#60a5fa",
  secondary: "#3b82f6",
  accent: "#2563eb",
} 

export const GenesisBlockIcon: React.FC<{ className?: string }> = ({
  className,
}) => (
  <svg width="50" height="50" viewBox="0 0 215 215" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M101.709 21.3955C105.624 19.2308 110.376 19.2308 114.291 21.3955L182.291 58.9984C186.431 61.2875 189 65.6445 189 70.3748V144.625C189 149.356 186.431 153.713 182.291 156.002L114.291 193.605C110.376 195.769 105.624 195.769 101.709 193.605L33.709 156.002C29.5695 153.713 27 149.356 27 144.625V70.3748C27 65.6445 29.5694 61.2875 33.709 58.9984L101.709 21.3955Z" stroke="#0E76FD" stroke-width="10" stroke-linecap="round"/>
    <path d="M135 71.6667H81C76.0294 71.6667 72 75.6775 72 80.625V134.375C72 139.323 76.0294 143.333 81 143.333H135C139.971 143.333 144 139.323 144 134.375V80.625C144 75.6775 139.971 71.6667 135 71.6667Z" stroke="#0E76FD" stroke-width="10" stroke-linecap="round"/>
    <path d="M90 98.5417H126" stroke="#0E76FD" stroke-width="10" stroke-linecap="round"/>
    <path d="M90 116.458H117" stroke="#0E76FD" stroke-width="10" stroke-linecap="round"/>
    <path d="M108 53.75C112.971 53.75 117 49.7392 117 44.7916C117 39.8441 112.971 35.8333 108 35.8333C103.029 35.8333 99 39.8441 99 44.7916C99 49.7392 103.029 53.75 108 53.75Z" fill="#0E76FD"/>
    <path d="M108 53.75V71.6667" stroke="#0E76FD" stroke-width="10" stroke-linecap="round"/>
  </svg>

);

export const SmartContractIcon: React.FC<{ className?: string }> = ({
  className,
}) => (
  <svg width="50" height="50" viewBox="0 0 222 222" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M64.75 27.75H138.336C138.601 27.75 138.855 27.8554 139.043 28.0429L166.207 55.2071C166.395 55.3946 166.5 55.649 166.5 55.9142V185C166.5 190.109 162.359 194.25 157.25 194.25H64.75C59.6412 194.25 55.5 190.109 55.5 185V37C55.5 31.8914 59.6412 27.75 64.75 27.75Z" stroke="#0E76FD" stroke-width="10" stroke-linecap="round"/>
    <path d="M138.75 27.75V54.5C138.75 55.0523 139.198 55.5 139.75 55.5H166.5" stroke="#0E76FD" stroke-width="12" stroke-linecap="round"/>
    <path d="M78.625 92.5L92.5 106.375L78.625 120.25" stroke="#0E76FD" stroke-width="10" stroke-linecap="round"/>
    <path d="M106.375 120.25L120.25 92.5" stroke="#0E76FD" stroke-width="10" stroke-linecap="round"/>
    <path d="M78.625 148H143.375" stroke="#0E76FD" stroke-width="10" stroke-linecap="round"/>
    <path d="M78.625 166.5H124.875" stroke="#0E76FD" stroke-width="10" stroke-linecap="round"/>
  </svg>

);

export const DefiProtocolIcon: React.FC<{ className?: string }> = ({
  className,
}) => (
  <svg width="50" height="50" viewBox="0 0 222 222" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M111 194.25C156.978 194.25 194.25 156.978 194.25 111C194.25 65.0223 156.978 27.75 111 27.75C65.0223 27.75 27.75 65.0223 27.75 111C27.75 156.978 65.0223 194.25 111 194.25Z" stroke="#0E76FD" stroke-width="10"/>
    <path d="M111 161.875C139.097 161.875 161.875 139.097 161.875 111C161.875 82.9025 139.097 60.125 111 60.125C82.9025 60.125 60.125 82.9025 60.125 111C60.125 139.097 82.9025 161.875 111 161.875Z" stroke="#0E76FD" stroke-width="10"/>
    <path d="M111 129.5C121.217 129.5 129.5 121.217 129.5 111C129.5 100.783 121.217 92.5 111 92.5C100.783 92.5 92.5 100.783 92.5 111C92.5 121.217 100.783 129.5 111 129.5Z" fill="#0E76FD"/>
    <path d="M111 60.125V27.75" stroke="#0E76FD" stroke-width="10"/>
    <path d="M156.675 88.4502L185 60.125" stroke="#0E76FD" stroke-width="10"/>
    <path d="M156.675 133.55L185 161.875" stroke="#0E76FD" stroke-width="10"/>
    <path d="M111.5 26C117.299 26 122 21.299 122 15.5C122 9.70101 117.299 5 111.5 5C105.701 5 101 9.70101 101 15.5C101 21.299 105.701 26 111.5 26Z" fill="#0E76FD"/>
    <path d="M190.5 68C196.299 68 201 63.299 201 57.5C201 51.701 196.299 47 190.5 47C184.701 47 180 51.701 180 57.5C180 63.299 184.701 68 190.5 68Z" fill="#0E76FD"/>
    <path d="M189.5 175C195.299 175 200 170.299 200 164.5C200 158.701 195.299 154 189.5 154C183.701 154 179 158.701 179 164.5C179 170.299 183.701 175 189.5 175Z" fill="#0E76FD"/>
  </svg>

);

export const SecurityShieldIcon: React.FC<{ className?: string }> = ({
  className,
}) => (
  <svg width="50" height="50" viewBox="0 0 199 199" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M100.765 17.005C99.9438 16.7313 99.0562 16.7313 98.2351 17.005L27.6101 40.5466C25.9767 41.0911 24.875 42.6196 24.875 44.3414V99.5C24.875 140.396 55.9442 170.897 98.504 182.157C99.1546 182.329 99.8454 182.329 100.496 182.157C143.056 170.897 174.125 140.396 174.125 99.5V44.3414C174.125 42.6196 173.023 41.0911 171.39 40.5466L100.765 17.005Z" stroke="#0E76FD" stroke-width="10" stroke-linecap="round"/>
  <path d="M101.983 50.8786C100.405 50.1615 98.5949 50.1615 97.0173 50.8786L57.4132 68.8804C55.2712 69.8541 53.896 71.9898 53.896 74.3426V107.792C53.896 134.054 73.5844 154.411 97.6109 163.104C98.8317 163.546 100.169 163.546 101.389 163.104C125.416 154.411 145.104 134.054 145.104 107.792V74.3426C145.104 71.9898 143.729 69.8541 141.587 68.8804L101.983 50.8786Z" stroke="#0E76FD" stroke-width="10" stroke-linecap="round"/>
  <path d="M78.771 103.646L92.522 117.397C92.9324 117.807 93.6047 117.783 93.9848 117.345L120.229 87.0625" stroke="#0E76FD" stroke-width="10" stroke-linecap="round"/>
  </svg>

);

export const NetworkScaleIcon: React.FC<{ className?: string }> = ({
  className,
}) => (
  <svg width="50" height="50" viewBox="0 0 198 198" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M99 119.625C110.391 119.625 119.625 110.391 119.625 99C119.625 87.6091 110.391 78.375 99 78.375C87.6091 78.375 78.375 87.6091 78.375 99C78.375 110.391 87.6091 119.625 99 119.625Z" stroke="#0E76FD" stroke-width="10" stroke-linecap="round"/>
  <path d="M99 107.25C103.556 107.25 107.25 103.556 107.25 99C107.25 94.4437 103.556 90.75 99 90.75C94.4437 90.75 90.75 94.4437 90.75 99C90.75 103.556 94.4437 107.25 99 107.25Z" fill="#0E76FD"/>
  <path d="M99 45.375C105.835 45.375 111.375 39.8345 111.375 33C111.375 26.1655 105.835 20.625 99 20.625C92.1655 20.625 86.625 26.1655 86.625 33C86.625 39.8345 92.1655 45.375 99 45.375Z" stroke="#0E76FD" stroke-width="10" stroke-linecap="round"/>
  <path d="M165 86.625C171.835 86.625 177.375 81.0845 177.375 74.25C177.375 67.4155 171.835 61.875 165 61.875C158.165 61.875 152.625 67.4155 152.625 74.25C152.625 81.0845 158.165 86.625 165 86.625Z" stroke="#0E76FD" stroke-width="10" stroke-linecap="round"/>
  <path d="M165 152.625C171.835 152.625 177.375 147.085 177.375 140.25C177.375 133.415 171.835 127.875 165 127.875C158.165 127.875 152.625 133.415 152.625 140.25C152.625 147.085 158.165 152.625 165 152.625Z" stroke="#0E76FD" stroke-width="10" stroke-linecap="round"/>
  <path d="M99 177.375C105.835 177.375 111.375 171.835 111.375 165C111.375 158.165 105.835 152.625 99 152.625C92.1655 152.625 86.625 158.165 86.625 165C86.625 171.835 92.1655 177.375 99 177.375Z" stroke="#0E76FD" stroke-width="10" stroke-linecap="round"/>
  <path d="M33 152.625C39.8345 152.625 45.375 147.085 45.375 140.25C45.375 133.415 39.8345 127.875 33 127.875C26.1655 127.875 20.625 133.415 20.625 140.25C20.625 147.085 26.1655 152.625 33 152.625Z" stroke="#0E76FD" stroke-width="10" stroke-linecap="round"/>
  <path d="M33 86.625C39.8345 86.625 45.375 81.0845 45.375 74.25C45.375 67.4155 39.8345 61.875 33 61.875C26.1655 61.875 20.625 67.4155 20.625 74.25C20.625 81.0845 26.1655 86.625 33 86.625Z" stroke="#0E76FD" stroke-width="10" stroke-linecap="round"/>
  <path d="M99 45.375V78.375" stroke="#0E76FD" stroke-width="10" stroke-linecap="round"/>
  <path d="M152.625 82.5L119.625 90.75" stroke="#0E76FD" stroke-width="10" stroke-linecap="round"/>
  <path d="M152.625 132L119.625 111.375" stroke="#0E76FD" stroke-width="10" stroke-linecap="round"/>
  <path d="M99 152.625V119.625" stroke="#0E76FD" stroke-width="10" stroke-linecap="round"/>
  <path d="M45.375 132L78.375 111.375" stroke="#0E76FD" stroke-width="10" stroke-linecap="round"/>
  <path d="M45.375 82.5L78.375 90.75" stroke="#0E76FD" stroke-width="10" stroke-linecap="round"/>
  <path d="M99 37.125C101.278 37.125 103.125 35.2782 103.125 33C103.125 30.7218 101.278 28.875 99 28.875C96.7218 28.875 94.875 30.7218 94.875 33C94.875 35.2782 96.7218 37.125 99 37.125Z" fill="#0E76FD"/>
  <path d="M165 78.375C167.278 78.375 169.125 76.5282 169.125 74.25C169.125 71.9718 167.278 70.125 165 70.125C162.722 70.125 160.875 71.9718 160.875 74.25C160.875 76.5282 162.722 78.375 165 78.375Z" fill="#0E76FD"/>
  <path d="M165 144.375C167.278 144.375 169.125 142.528 169.125 140.25C169.125 137.972 167.278 136.125 165 136.125C162.722 136.125 160.875 137.972 160.875 140.25C160.875 142.528 162.722 144.375 165 144.375Z" fill="#0E76FD"/>
  <path d="M99 169.125C101.278 169.125 103.125 167.278 103.125 165C103.125 162.722 101.278 160.875 99 160.875C96.7218 160.875 94.875 162.722 94.875 165C94.875 167.278 96.7218 169.125 99 169.125Z" fill="#0E76FD"/>
  <path d="M33 144.375C35.2782 144.375 37.125 142.528 37.125 140.25C37.125 137.972 35.2782 136.125 33 136.125C30.7218 136.125 28.875 137.972 28.875 140.25C28.875 142.528 30.7218 144.375 33 144.375Z" fill="#0E76FD"/>
  <path d="M33 78.375C35.2782 78.375 37.125 76.5282 37.125 74.25C37.125 71.9718 35.2782 70.125 33 70.125C30.7218 70.125 28.875 71.9718 28.875 74.25C28.875 76.5282 30.7218 78.375 33 78.375Z" fill="#0E76FD"/>
  </svg>

);

export const GlobalAdoptionIcon: React.FC<{ className?: string }> = ({
  className,
}) => (
  <svg width="50" height="50" viewBox="0 0 208 208" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M104 182C147.078 182 182 147.078 182 104C182 60.9218 147.078 26 104 26C60.9218 26 26 60.9218 26 104C26 147.078 60.9218 182 104 182Z" stroke="#0E76FD" stroke-width="10"/>
  <path d="M104 182C123.146 182 138.667 147.078 138.667 104C138.667 60.9218 123.146 26 104 26C84.8543 26 69.3335 60.9218 69.3335 104C69.3335 147.078 84.8543 182 104 182Z" stroke="#0E76FD" stroke-width="10"/>
  <path d="M104 138.667C147.078 138.667 182 123.146 182 104C182 84.8541 147.078 69.3333 104 69.3333C60.9218 69.3333 26 84.8541 26 104C26 123.146 60.9218 138.667 104 138.667Z" stroke="#0E76FD" stroke-width="10"/>
  <path d="M104 114.833C109.983 114.833 114.833 109.983 114.833 104C114.833 98.0169 109.983 93.1667 104 93.1667C98.0168 93.1667 93.1665 98.0169 93.1665 104C93.1665 109.983 98.0168 114.833 104 114.833Z" fill="#0E76FD"/>
  <path d="M103.5 36C109.299 36 114 31.299 114 25.5C114 19.701 109.299 15 103.5 15C97.701 15 93 19.701 93 25.5C93 31.299 97.701 36 103.5 36Z" fill="#0E76FD"/>
  <path d="M183.5 115C189.299 115 194 110.299 194 104.5C194 98.701 189.299 94 183.5 94C177.701 94 173 98.701 173 104.5C173 110.299 177.701 115 183.5 115Z" fill="#0E76FD"/>
  <path d="M24.5 115C30.299 115 35 110.299 35 104.5C35 98.701 30.299 94 24.5 94C18.701 94 14 98.701 14 104.5C14 110.299 18.701 115 24.5 115Z" fill="#0E76FD"/>
  <path d="M104.5 194C110.299 194 115 189.299 115 183.5C115 177.701 110.299 173 104.5 173C98.701 173 94 177.701 94 183.5C94 189.299 98.701 194 104.5 194Z" fill="#0E76FD"/>
  </svg>

);

export const PredictionMarketsIcon: React.FC<{ className?: string }> = ({
  className,
}) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Outer target ring (dashed) */}
    <circle
      cx="24"
      cy="24"
      r="18"
      stroke="#0e76fd"
      strokeWidth="1.5"
      strokeDasharray="4 2"
      opacity="0.7"
    />
    {/* Inner probability ring */}
    <circle
      cx="24"
      cy="24"
      r="11"
      stroke="#0e76fd"
      strokeWidth="1"
      opacity="0.5"
    />
    {/* Central decision node */}
    <circle cx="24" cy="24" r="3.5" fill="#0e76fd" opacity="0.3" />
    <circle cx="24" cy="24" r="1.5" fill="#0e76fd" />

    {/* Upward outcome branch */}
    <path
      d="M24 20.5L28 16L31 20"
      stroke="#0e76fd"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <line
      x1="24"
      y1="20.5"
      x2="24"
      y2="24"
      stroke="#0e76fd"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    <circle cx="31" cy="20" r="2" fill="#0e76fd" opacity="0.8" />

    {/* Downward outcome branch */}
    <path
      d="M24 27.5L20 32L17 28"
      stroke="#0e76fd"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <line
      x1="24"
      y1="24"
      x2="24"
      y2="27.5"
      stroke="#0e76fd"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    <circle cx="17" cy="28" r="2" fill="#0e76fd" opacity="0.4" />

    {/* Horizontal probability dash */}
    <line
      x1="14"
      y1="24"
      x2="20"
      y2="24"
      stroke="#0e76fd"
      strokeWidth="1"
      strokeLinecap="round"
      opacity="0.6"
    />
    <line
      x1="28"
      y1="24"
      x2="34"
      y2="24"
      stroke="#0e76fd"
      strokeWidth="1"
      strokeLinecap="round"
      opacity="0.6"
    />

    {/* Peripheral polar nodes */}
    <circle cx="24" cy="6" r="1.5" fill="#0e76fd" opacity="0.5" />
    <circle cx="24" cy="42" r="1.5" fill="#0e76fd" opacity="0.5" />
    <circle cx="6" cy="24" r="1.5" fill="#0e76fd" opacity="0.5" />
    <circle cx="42" cy="24" r="1.5" fill="#0e76fd" opacity="0.5" />
  </svg>
);