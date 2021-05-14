import { Injectable } from '@angular/core';

export interface IFile {
  name: string;
  data: Uint8Array;
}

@Injectable({
  providedIn: 'root'
})
export class FileReaderService {

  constructor() { }

  readAsArrayBuffer(file: File): Promise<IFile> {
    // Create new file reader
    const fileReader = new FileReader();

    return new Promise((resolve, reject) => {

      fileReader.onerror = () => {
        fileReader.abort();
        reject(new DOMException('Problem parsing input file.'));
      };

      fileReader.onload = async (e) => {
        const name = file.name;
        const data = new Uint8Array(fileReader.result as any);
        resolve({ name, data });
      };

      // Read file as array buffer
      fileReader.readAsArrayBuffer(file);
    });
  }
}
