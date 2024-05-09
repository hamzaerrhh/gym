import QRCode from "qrcode";

const generate = async (url) => {
  const qrCodeUrl = await QRCode.toDataURL(url);
  return qrCodeUrl;
};

export default generate;
