import { Component } from '@angular/core';
import { PdfReaderService } from './services/pdf-reader.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  /** String with all csv content after the conversion */
  csvText = '';
  /** List with the csv data converted from pdf files */ 
  data: string[][] = [];
  /** Files selected in the input */
  files: File[] = [];
  /** Count of rows needed in the textarea*/
  textAreaRows = 0;

  constructor(
    /** Service responsible for convert pdf to csv */
    private pdfReaderService: PdfReaderService
  ) { }

  /** Action of the button Convert */
  async convert() {
    this.files.length > 0
    const dataStr = [];
    this.data = [];
    this.textAreaRows = 0;
    // Convert all the pdf files selected in the input
    for (const file of this.files) {
      // Get the data converted in csv pattern
      const item = await this.pdfReaderService.getData(file);
      // Add on the list the string resulted from the convertion
      this.data.push(item);
      dataStr.push(item.join('\n'));
      this.textAreaRows += item.length;
    }
    // Set Return all the data
    this.csvText = dataStr.toString();
    this.textAreaRows += 5;
  }

  /** Get the files selected on the input file */
  incomingFiles(event: any) {
    this.files = event.target.files;
    this.csvText = '';
  }

  save() {
    let wb = XLSX.utils.book_new();
    let ws_name = "SheetJS";
    for (const file of this.data) {
      let ws_data = [];
      for (const line of file) {
        ws_data.push(line.split(';'))
      }
      let ws = XLSX.utils.aoa_to_sheet(ws_data);
      XLSX.utils.book_append_sheet(wb, ws, ws_name);
    }
    /* Add the worksheet to the workbook */
    XLSX.writeFile(wb, 'teste.xlsx')
    console.log('Fez')
  }

}
