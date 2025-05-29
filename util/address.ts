import { SERVICE_NAME } from "@/constants/service";

interface AddressData {
  address: string;
  zonecode: string;
}

export const handleSearchAddress = (
  onComplete: (data: AddressData) => void,
) => {
  const addressWidth = 400;
  const addressHeight = 500;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const daum = (window as any).daum;
  new daum.Postcode({
    width: addressWidth,
    height: addressHeight,
    oncomplete: function (data: AddressData) {
      onComplete(data);
    },
  }).open({
    left: window.innerWidth / 2,
    top: window.innerHeight / 2 - addressHeight / 2,
    popupTitle: SERVICE_NAME,
    popupKey: SERVICE_NAME,
  });
};
