import { Injectable } from '@angular/core';
import * as pdfjslib from 'pdfjs-dist';
import { FileReaderService } from './file-reader.service';

pdfjslib.GlobalWorkerOptions.workerSrc = 'pdf.worker.js';

@Injectable({
  providedIn: 'root'
})
export class PdfReaderService {

  constructor(
    private fileReaderService: FileReaderService
  ) { }

  async getData(file: File) {
    const buffer = await this.fileReaderService.readAsArrayBuffer(file);
    return pdfjslib.getDocument({ data: buffer.data }).promise.then(pdf => this.getPageText(1, pdf));
  }

  private getPageText(pageNum: any, pdfDocumentInstance: any): Promise<string[]> {
    // Return a Promise that is solved once the text of the page is retrieven
    return new Promise((resolve, reject) => {
      pdfDocumentInstance.getPage(pageNum).then((pdfPage: any) => {
        // The main trick to obtain the text of the PDF page, use the getTextContent method
        pdfPage.getTextContent().then((textContent: any) => {
          const textItems = textContent.items;
          const data: any = {};
          // Concatenate the string of the item to the final string
          for (const item of textItems) {
            if ((item.str !== undefined) && (!item.hasEOL)) {
              const y: any = item.transform['5'];
              (data[y] = data[y] || []).push(item.str.trim());
            }
          }
          const result: string[] = [];
          Object.keys(data) // => array of y-positions (type: float)
            .sort((y1, y2) => parseFloat(y2) - parseFloat(y1)) // sort float positions
            .forEach((y) => {
              result.push((data[y] || []).join(';'))
            });
          // Solve promise with the text retrieven from the page
          resolve(result);
        });
      });
    });
  }

}
