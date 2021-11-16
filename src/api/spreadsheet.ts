import { GoogleSpreadsheet } from "google-spreadsheet";
import { Data } from "../type";

export const connect_gspread = async () => {
  const doc = new GoogleSpreadsheet(process.env.REACT_APP_SPREADSHEET_ID);
  const client_email = process.env.REACT_APP_CLIENT_EMAIL;
  const private_key = process.env.REACT_APP_PRIVATE_KEY;

  if (typeof client_email === "string" && typeof private_key === "string") {
    await doc.useServiceAccountAuth({
      client_email: client_email,
      private_key: private_key.replace(/\\n/g, "\n"),
    });

    await doc.loadInfo();
    // データベースのワークシートを取得
    const dbSheet = await doc.sheetsById[304741931];
    const shiftRows = await dbSheet.getRows();
    const shiftRowsNumb = shiftRows.length;

    const headers = shiftRows[0]._sheet.headerValues;
    const bottomRow = shiftRows[shiftRowsNumb - 1]._rawData;
    const oneFromBottomRow = shiftRows[shiftRowsNumb - 2]._rawData;

    const count = headers.length;
    const data: Data[] = [];

    for (let i = 1; i < count; i++) {
      data.push({
        keyword: headers[i],
        currentRank: bottomRow[i],
        preRank: oneFromBottomRow[i],
        url: "https://~~~",
      });
    }
    return data;
  } else {
    return;
  }
};
