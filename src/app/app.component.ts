import { Component } from '@angular/core';
import { PdfReaderService } from './services/pdf-reader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  csvText = '';
  private files: File[] = [];

  constructor(
    private pdfReaderService: PdfReaderService
  ) { }

  async convert() {
    const data = [];
    for (const file of this.files) {
      const item = await this.pdfReaderService.getData(file);
      data.push(item);
    }
    this.csvText = data.toString();
  }

  incomingFiles(event: any) {
    this.files = event.target.files;
  }

}
