import { Dispatch, SetStateAction } from "react";
import { USER_MODAL_TAB } from "../user/user-info-box";
import { ARTIST_MODAL_TAB } from "../artist/artist-form";

type ModalNavBarProps =
  | {
      type: "user";
      props: {
        currentTab: string;
        setCurrentTab: Dispatch<SetStateAction<USER_MODAL_TAB>>;
        modalNavArray: {
          label: string;
          value: USER_MODAL_TAB;
        }[];
      };
    }
  | {
      type: "artist";
      props: {
        currentTab: string;
        setCurrentTab: Dispatch<SetStateAction<ARTIST_MODAL_TAB>>;
        modalNavArray: {
          label: string;
          value: ARTIST_MODAL_TAB;
        }[];
      };
    };

const ModalTabNavBar = ({ type, props }: ModalNavBarProps) => {
  return (
    <div className="flex gap-2 rounded-xl bg-[#F6F7F8] p-2">
      {props.modalNavArray.map((nav) => (
        <button
          type="button"
          className={`h-[30px] w-full rounded-md heading-6 ${nav.value === props.currentTab ? "bg-white text-black" : "text-[#8B909C]"}`}
          key={nav.value}
          onClick={() =>
            type === "artist"
              ? props.setCurrentTab(nav.value as ARTIST_MODAL_TAB)
              : props.setCurrentTab(nav.value as USER_MODAL_TAB)
          }
        >
          {nav.label}
        </button>
      ))}
    </div>
  );
};
export default ModalTabNavBar;
