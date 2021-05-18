import { Component } from '@angular/core';
import { PdfReaderService } from './services/pdf-reader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  /** String with all csv content after the conversion */
  csvText = '';
  textAreaRows = 0;

  /** Files selected in the input */
  private files: File[] = [];

  constructor(
    /** Service responsible for convert pdf to csv */
    private pdfReaderService: PdfReaderService
  ) { }

  /** Action of the button Convert */
  async convert() {
    // Initialization of the list that will store all the csv data converted from pdf files
    const data = [];
    this.textAreaRows = 0;
    // Convert all the pdf files selected in the input
    for (const file of this.files) {
      // Get the data converted in csv pattern
      const item = await this.pdfReaderService.getData(file);
      console.log('item length: ' + item.length)
      // Add on the list the string resulted from the convertion
      data.push(item.join('\n'));
      this.textAreaRows += item.length;
    }
    // Set Return all the data
    this.csvText = data.toString();
    this.textAreaRows += 5;
  }

  /** Get the files selected on the input file */
  incomingFiles(event: any) {
    this.files = event.target.files;
  }

}
