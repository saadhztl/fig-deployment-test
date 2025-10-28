import { google } from 'googleapis';

export interface Cell {
  value: string | number | null;
  style: React.CSSProperties;
  rowSpan?: number;
  colSpan?: number;
  width?: string;
  height?: string;
}

interface GoogleSheetConfig {
  GOOGLE_PROJECT_ID: string;
  GOOGLE_PRIVATE_KEY: string;
  GOOGLE_CLIENT_EMAIL: string;
}

/**
 * Fetches a Google Sheet and parses it into a 2D array of Cells.
 */
export async function fetchSheetData(
  sheetName: string | null,
  sheetId: string | null,
  sheetRange: string | null,
  googleSheetConfig: GoogleSheetConfig
): Promise<(Cell | null)[][]> {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      project_id: googleSheetConfig.GOOGLE_PROJECT_ID,
      private_key: googleSheetConfig.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      client_email: googleSheetConfig.GOOGLE_CLIENT_EMAIL,
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });

  const sheets = google.sheets({ version: 'v4', auth });

  if (!sheetId) return [];

  const spreadsheetId: string = sheetId;

  const response = await sheets.spreadsheets.get({
    spreadsheetId,
    ranges: sheetRange ? [sheetRange] : sheetName ? [sheetName] : undefined,
    includeGridData: true,
  });

  const sheet = response.data.sheets?.[0];
  if (!sheet) return [];

  const grid = sheet.data?.[0].rowData || [];

  const merges = sheet.merges || [];
  const rowMetadata = sheet.data?.[0].rowMetadata || [];
  const colMetadata = sheet.data?.[0].columnMetadata || [];

  // differentiate between Hours and prices
  const firstRow = grid.find((f) => f.values?.map((v) => v.formattedValue));
  const firstIndex = firstRow && (grid.indexOf(firstRow) > 0 ? grid.indexOf(firstRow) + 1 : 0);

  const columnCount =
    (grid[firstIndex || 0].values?.filter((x) => x.formattedValue !== undefined) || []).length + 1;
  // Parse each cell
  const parsed: (Cell | null)[][] = grid.map((row, rowIndex) => {
    const cells: (Cell | null)[] = [];

    for (let colIndex = 0; colIndex < columnCount; colIndex++) {
      const cell = row.values?.[colIndex];

      if (!cell) {
        cells.push({
          value: '',
          style: {
            height: undefined,
            width: undefined,
          },
        });
        continue;
      }

      const fmt = cell.userEnteredFormat || {};
      const txt = fmt.textFormat || {};
      const bg = fmt.backgroundColor || {};

      const style: React.CSSProperties = {
        fontWeight: txt.bold ? 'bold' : undefined,
        fontStyle: txt.italic ? 'italic' : undefined,
        textDecoration: txt.underline ? 'underline' : undefined,
        textAlign: (fmt.horizontalAlignment || 'left') as React.CSSProperties['textAlign'],
        verticalAlign: fmt.verticalAlignment || 'middle',
        color: txt.foregroundColor
          ? `rgba(${Math.round((txt.foregroundColor.red || 0) * 255)}, 
                  ${Math.round((txt.foregroundColor.green || 0) * 255)}, 
                  ${Math.round((txt.foregroundColor.blue || 0) * 255)}, 
                  ${txt.foregroundColor.alpha ?? 1})`
          : undefined,
        backgroundColor:
          bg && (bg.red !== undefined || bg.green !== undefined || bg.blue !== undefined)
            ? `rgba(
                ${Math.round((bg.red ?? 0) * 255)},
                ${Math.round((bg.green ?? 0) * 255)},
                ${Math.round((bg.blue ?? 0) * 255)},
                ${bg.alpha ?? 1}
              )`
            : undefined,
        height: rowMetadata[rowIndex]?.pixelSize
          ? `${rowMetadata[rowIndex].pixelSize}px`
          : undefined,
        width: colMetadata[colIndex]?.pixelSize
          ? `${colMetadata[colIndex].pixelSize}px`
          : undefined,
      };
      cells.push({
        value: cell.formattedValue ?? '',
        style,
      });
    }
    return cells;
  });

  // Step 2: Apply merged cells
  merges.forEach((merge) => {
    const startRow = merge.startRowIndex ?? 0;
    const endRow = merge.endRowIndex ?? 0;
    const startCol = merge.startColumnIndex ?? 0;
    const endCol = merge.endColumnIndex ?? 0;

    const rowSpan = endRow - startRow;
    const colSpan = endCol - startCol;

    if (parsed[startRow]?.[startCol]) {
      parsed[startRow][startCol]!.rowSpan = rowSpan;
      parsed[startRow][startCol]!.colSpan = colSpan;
    }

    for (let r = startRow; r < endRow; r++) {
      for (let c = startCol; c < endCol; c++) {
        if (r === startRow && c === startCol) continue;
        if (parsed[r]) parsed[r][c] = null;
      }
    }
  });

  // Step 3: Remove fully empty trailing rows
  let lastNonEmptyRowIndex = parsed.length - 1;
  while (lastNonEmptyRowIndex >= 0) {
    const row = parsed[lastNonEmptyRowIndex];
    if (row.some((cell) => cell !== null && cell.value !== '')) break;
    lastNonEmptyRowIndex--;
  }

  return parsed.slice(0, lastNonEmptyRowIndex + 1);
}
